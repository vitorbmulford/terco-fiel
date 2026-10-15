"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ApiError, getEntitlements, getMe, getSubscription, isPremiumActive, login as loginRequest, register as registerRequest, type Account, type AuthResponse, type EntitlementResponse, type SubscriptionDetails } from "@/app/components/premium/api";
import { AuthModal, type AuthMode } from "@/app/components/auth/auth-modal";

type AuthContextValue = {
  user: Account | null; token: string | null; premiumActive: boolean; premiumEntitlement: EntitlementResponse | null; subscription: SubscriptionDetails | null; loading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void; refreshEntitlements: () => Promise<boolean>;
  openAuth: (mode?: AuthMode, onAuthenticated?: () => void) => void;
};
const SESSION_KEY = "terco-fiel.session";
const PERSISTENT_SESSION_KEY = "terco-fiel.persistent-session";
const LEGACY_SESSION_KEY = "rosarium.session";
const LEGACY_PERSISTENT_SESSION_KEY = "rosarium.persistent-session";
const AuthContext = createContext<AuthContextValue | null>(null);

function readSession(): AuthResponse | null {
  try {
    const raw = window.localStorage.getItem(PERSISTENT_SESSION_KEY)
      ?? window.sessionStorage.getItem(SESSION_KEY)
      ?? window.localStorage.getItem(LEGACY_PERSISTENT_SESSION_KEY)
      ?? window.sessionStorage.getItem(LEGACY_SESSION_KEY);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || !("accessToken" in value) || !("email" in value) || !("userId" in value) || !("expiresAt" in value)) return null;
    const session = value as AuthResponse;
    if (Number.isNaN(Date.parse(session.expiresAt)) || Date.parse(session.expiresAt) <= Date.now()) {
      window.localStorage.removeItem(PERSISTENT_SESSION_KEY);
      window.sessionStorage.removeItem(SESSION_KEY);
      window.localStorage.removeItem(LEGACY_PERSISTENT_SESSION_KEY);
      window.sessionStorage.removeItem(LEGACY_SESSION_KEY);
      return null;
    }
    return session;
  } catch { return null; }
}

function messageFor(error: unknown, action: "login" | "register") {
  if (!(error instanceof ApiError)) return "Não foi possível conectar ao servidor. Tente novamente.";
  if (error.status === 400) return "Confira os dados informados e tente novamente.";
  if (error.status === 401) return "E-mail ou senha incorretos.";
  if (error.status === 409 && action === "register") return "Já existe uma conta com este e-mail. Entre para continuar.";
  if (error.status >= 500) return "Não foi possível concluir agora. Tente novamente em instantes.";
  return error.message || "Não foi possível concluir esta solicitação.";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Account | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [premiumActive, setPremiumActive] = useState(false);
  const [premiumEntitlement, setPremiumEntitlement] = useState<EntitlementResponse | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState<AuthMode | null>(null);
  const afterAuthentication = useRef<(() => void) | undefined>(undefined);

  const logout = useCallback(() => {
    window.sessionStorage.removeItem(SESSION_KEY);
    window.localStorage.removeItem(PERSISTENT_SESSION_KEY);
    window.sessionStorage.removeItem(LEGACY_SESSION_KEY);
    window.localStorage.removeItem(LEGACY_PERSISTENT_SESSION_KEY);
    setUser(null); setToken(null); setPremiumActive(false); setPremiumEntitlement(null); setSubscription(null);
  }, []);

  const refreshEntitlements = useCallback(async () => {
    if (!token) { setPremiumActive(false); setPremiumEntitlement(null); return false; }
    try {
      const entitlements = await getEntitlements(token);
      const active = isPremiumActive(entitlements);
      setPremiumActive(active);
      setPremiumEntitlement(entitlements.find((entitlement) => entitlement.type === "PREMIUM" && entitlement.active) ?? null);
      return active;
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) logout();
      throw error;
    }
  }, [logout, token]);

  const establishSession = useCallback(async (session: AuthResponse, persistent = true) => {
    const destination = persistent ? window.localStorage : window.sessionStorage;
    destination.setItem(persistent ? PERSISTENT_SESSION_KEY : SESSION_KEY, JSON.stringify(session));
    setUser({ userId: session.userId, name: session.name ?? null, email: session.email });
    setToken(session.accessToken);
    try {
      const [me, entitlements, currentSubscription] = await Promise.all([getMe(session.accessToken), getEntitlements(session.accessToken), getSubscription(session.accessToken)]);
      setUser(me);
      setPremiumActive(isPremiumActive(entitlements));
      setPremiumEntitlement(entitlements.find((entitlement) => entitlement.type === "PREMIUM" && entitlement.active) ?? null);
      setSubscription(currentSubscription ?? null);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        logout();
        throw new Error("Sua sessão expirou. Entre novamente.");
      }
    }
  }, [logout]);

  useEffect(() => { void Promise.resolve().then(async () => { try { const session = readSession(); if (session) await establishSession(session); } finally { setLoading(false); } }); }, [establishSession]);
  useEffect(() => { if (new URLSearchParams(window.location.search).get("auth") === "login") queueMicrotask(() => setModalMode("login")); }, []);

  const complete = useCallback(async (
    request: (email: string, password: string) => Promise<AuthResponse>,
    action: "login" | "register", email: string, password: string, persistent = true
  ) => {
    try {
      await establishSession(await request(email, password), persistent);
      setModalMode(null);
      const callback = afterAuthentication.current;
      afterAuthentication.current = undefined;
      callback?.();
    } catch (error) { throw new Error(messageFor(error, action)); }
  }, [establishSession]);

  const openAuth = useCallback((mode: AuthMode = "login", callback?: () => void) => {
    afterAuthentication.current = callback;
    setModalMode(mode);
  }, []);

  return <AuthContext.Provider value={{
    user, token, premiumActive, premiumEntitlement, subscription, loading, logout, refreshEntitlements, openAuth,
    login: (email, password, remember = true) => complete(loginRequest, "login", email, password, remember),
    register: (name, email, password) => complete(
      (registerEmail, registerPassword) => registerRequest(name, registerEmail, registerPassword),
      "register", email, password
    ),
  }}>{children}<AuthModal mode={modalMode} onClose={() => setModalMode(null)} onModeChange={setModalMode} /></AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  return context;
}
