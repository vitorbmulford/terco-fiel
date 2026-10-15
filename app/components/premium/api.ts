export type SubscriptionApiPlan = {
  plan: "PREMIUM_MONTHLY" | "PREMIUM_YEARLY";
  amount: number;
  currency: "BRL";
  interval: "MONTH" | "YEAR";
};

export type AuthResponse = { userId: string; name: string | null; email: string; accessToken: string; tokenType: "Bearer"; expiresAt: string };
export type Account = Pick<AuthResponse, "userId" | "name" | "email">;
export type EntitlementResponse = { type: string; active: boolean; validUntil: string | null; updatedAt?: string | null };
export type EntitlementsResponse = EntitlementResponse[];
export type SubscriptionDetails = { plan: string; status: string; currentPeriodStart: string | null; currentPeriodEnd: string | null; cancelAtPeriodEnd: boolean };

export class ApiError extends Error {
  constructor(public readonly status: number, message: string) { super(message); this.name = "ApiError"; }
}

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080").replace(/\/$/, "");
const IS_NGROK_API = API_BASE_URL.includes(".ngrok-free.dev");

async function request<T>(path: string, init: RequestInit = {}, accessToken?: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(IS_NGROK_API ? { "ngrok-skip-browser-warning": "true" } : {}),
      ...init.headers,
    },
  });

  if (!response.ok) {
    let message = "Não foi possível concluir esta solicitação.";
    try {
      const body: unknown = await response.json();
      if (typeof body === "object" && body && "message" in body && typeof body.message === "string") message = body.message;
    } catch { /* The API may return an empty or non-JSON error body. */ }
    throw new ApiError(response.status, message);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const getPlans = () => request<SubscriptionApiPlan[]>("/subscription/plans");
export const register = (name: string, email: string, password: string) => request<AuthResponse>("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) });
export const login = (email: string, password: string) => request<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
export const requestPasswordReset = (email: string) => request<{ message: string }>("/auth/password/forgot", { method: "POST", body: JSON.stringify({ email }) });
export const resetPassword = (token: string, newPassword: string) => request<{ message: string }>("/auth/password/reset", { method: "POST", body: JSON.stringify({ token, newPassword }) });
export const getMe = (accessToken: string) => request<Account>("/me", {}, accessToken);
export const getEntitlements = (accessToken: string) => request<EntitlementsResponse>("/me/entitlements", {}, accessToken);
export const getSubscription = (accessToken: string) => request<SubscriptionDetails | undefined>("/me/subscription", {}, accessToken);
export const createCheckout = (plan: SubscriptionApiPlan["plan"], accessToken: string, trial = false) => request<{ checkoutUrl: string }>("/subscription/checkout", { method: "POST", body: JSON.stringify({ plan, trial }) }, accessToken);
export const createCustomerPortal = (accessToken: string) => request<{ portalUrl: string }>("/subscription/portal", { method: "POST" }, accessToken);

export function isPremiumActive(entitlements: EntitlementsResponse): boolean {
  return entitlements.some((entitlement) => entitlement.type === "PREMIUM" && entitlement.active);
}
