"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useAuth } from "@/app/components/auth/auth-provider";
import { requestPasswordReset } from "@/app/components/premium/api";
import { PasswordField } from "./password-field";
import { PasswordRequirements, passwordMeetsRequirements } from "./password-requirements";
import styles from "./auth-modal.module.css";

export type AuthMode = "login" | "register" | "forgot";
const isEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);
const isName = (name: string) => {
  const normalized = name.trim().replace(/\s+/g, " ");
  return normalized.length >= 2 && normalized.length <= 120;
};

export function AuthModal({ mode, onClose, onModeChange }: { mode: AuthMode | null; onClose: () => void; onModeChange: (mode: AuthMode) => void }) {
  const { login, register } = useAuth();
  const dialogRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const nameId = useId();
  const emailId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [confirmationTouched, setConfirmationTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remember, setRemember] = useState(true);
  const [requestSent, setRequestSent] = useState(false);
  const [acceptedRequiredTerms, setAcceptedRequiredTerms] = useState(false);
  const [termsTouched, setTermsTouched] = useState(false);
  const registering = mode === "register";
  const recovering = mode === "forgot";
  const nameError = registering && nameTouched && !isName(name) ? "Informe seu nome (entre 2 e 120 caracteres)." : "";
  const emailError = emailTouched && !isEmail(email) ? "Digite um e-mail válido." : "";
  const passwordError = registering && password && !passwordMeetsRequirements(password) ? "Use pelo menos 8 caracteres." : "";
  const confirmationError = registering && confirmationTouched && confirmation && password !== confirmation ? "As senhas ainda não coincidem." : "";
  const canSubmit = isEmail(email)
    && (recovering || (password.length >= 8
      && (!registering || (isName(name) && passwordMeetsRequirements(password) && confirmation.length > 0 && password === confirmation && acceptedRequiredTerms))))
    && !busy;
  const termsError = registering && termsTouched && !acceptedRequiredTerms ? "Você precisa aceitar os Termos de Uso e a Política de Privacidade para criar sua conta." : "";

  useEffect(() => {
    if (!mode) return;
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const timer = window.setTimeout(() => (mode === "register" ? nameRef : emailRef).current?.focus(), 0);
    return () => window.clearTimeout(timer);
  }, [mode]);
  useEffect(() => { if (!mode) openerRef.current?.focus(); }, [mode]);
  useEffect(() => {
    if (!mode) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) {
        setError(null);
        setRequestSent(false);
        setEmailTouched(false);
        onClose();
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const elements = [...dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), [href]')];
      const first = elements[0];
      const last = elements.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [busy, mode, onClose]);

  if (!mode) return null;

  function closeModal() {
    setError(null);
    setRequestSent(false);
    setEmailTouched(false);
    onClose();
  }

  function changeMode(nextMode: AuthMode) {
    setError(null);
    setRequestSent(false);
    setEmailTouched(false);
    onModeChange(nextMode);
  }

  function switchMode() {
    setError(null);
    setNameTouched(false);
    setConfirmation("");
    setConfirmationTouched(false);
    changeMode(registering || recovering ? "login" : "register");
    setAcceptedRequiredTerms(false);
    setTermsTouched(false);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNameTouched(true);
    setEmailTouched(true);
    if (registering) setConfirmationTouched(true);
    if (registering) setTermsTouched(true);
    setError(null);
    if (!canSubmit) return;
    setBusy(true);
    try {
      if (recovering) {
        await requestPasswordReset(email.trim());
        setRequestSent(true);
      } else if (registering) await register(name.trim(), email.trim(), password);
      else await login(email.trim(), password, remember);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível continuar. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }

  return <div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget && !busy) closeModal(); }} role="presentation">
    <section aria-labelledby="auth-title" aria-modal="true" className={styles.dialog} ref={dialogRef} role="dialog">
      <div className={styles.topline}>
        <p className={styles.eyebrow}>Conta Terço Fiel</p>
        <button aria-label="Fechar autenticação" className={styles.close} disabled={busy} onClick={closeModal} type="button">×</button>
      </div>
      <h2 className={styles.title} id="auth-title">{recovering ? "Redefina sua senha" : registering ? "Crie sua conta" : "Entre na sua conta"}</h2>
      <p className={styles.description}>{recovering ? "Informe seu e-mail para receber um link seguro de redefinição." : registering ? "Uma única conta para acompanhar seu Premium no site e no aplicativo." : "Continue sua experiência de oração, com acesso ao seu Premium."}</p>
      {requestSent ? <div aria-live="polite" className={styles.notice} role="status">
        <h3 className={styles.noticeTitle}>Verifique seu e-mail</h3>
        <p className={styles.noticeText}>Se existir uma conta com este e-mail, enviaremos as instruções. O link é válido por 30 minutos. Não encontrou a mensagem? Verifique também a pasta de spam ou lixo eletrônico.</p>
        <button className={styles.submit} onClick={() => changeMode("login")} type="button">Voltar para entrar</button>
      </div> : <>
      <form aria-busy={busy} className={styles.form} noValidate onSubmit={submit}>
        {registering && <label className={styles.field} htmlFor={nameId}>
          Nome
          <input aria-describedby={nameError ? nameId + "-error" : undefined} aria-invalid={Boolean(nameError)} autoComplete="name" className={styles.input} disabled={busy} id={nameId} onBlur={() => setNameTouched(true)} onChange={(event) => setName(event.target.value)} ref={nameRef} type="text" value={name} />
          {nameError && <span className={styles.fieldError} id={nameId + "-error"} role="alert">{nameError}</span>}
        </label>}
        <label className={styles.field} htmlFor={emailId}>
          E-mail
          <input aria-describedby={emailError ? emailId + "-error" : undefined} aria-invalid={Boolean(emailError)} autoComplete="email" className={styles.input} disabled={busy} id={emailId} onBlur={() => setEmailTouched(true)} onChange={(event) => setEmail(event.target.value)} ref={emailRef} type="email" value={email} />
          {emailError && <span className={styles.fieldError} id={emailId + "-error"} role="alert">{emailError}</span>}
        </label>
        {!recovering && <PasswordField autoComplete={registering ? "new-password" : "current-password"} disabled={busy} error={passwordError} id="auth-password" key={registering ? "register-password" : "login-password"} label="Senha" onChange={(event) => setPassword(event.target.value)} value={password} />}
        {registering && <PasswordRequirements password={password} />}
        {registering && <PasswordField autoComplete="new-password" disabled={busy} error={confirmationError} id="auth-confirmation" key="register-confirmation" label="Confirmar senha" onBlur={() => setConfirmationTouched(true)} onChange={(event) => setConfirmation(event.target.value)} value={confirmation} />}
        {registering && <div className={styles.consentField}>
          <label className={styles.consent}>
            <input aria-describedby={termsError ? "terms-error" : undefined} aria-invalid={Boolean(termsError)} checked={acceptedRequiredTerms} disabled={busy} onBlur={() => setTermsTouched(true)} onChange={(event) => setAcceptedRequiredTerms(event.target.checked)} type="checkbox" />
            <span aria-hidden="true" className={styles.checkbox}>{acceptedRequiredTerms ? "✓" : ""}</span>
            <span>Li e concordo com os <a href="/termos-de-uso">Termos de Uso</a> e a <a href="/politica-de-privacidade">Política de Privacidade</a>.</span>
          </label>
          {termsError && <span className={styles.fieldError} id="terms-error" role="alert">{termsError}</span>}
        </div>}
        {!registering && !recovering && <div className={styles.formMeta}>
          <label className={styles.remember}><input checked={remember} disabled={busy} onChange={(event) => setRemember(event.target.checked)} type="checkbox" /><span aria-hidden="true" className={styles.checkbox}>{remember ? "✓" : ""}</span>Manter conectado</label>
          <a className={styles.forgot} href="/ajuda#acesso">Esqueci minha senha</a>
        </div>}
        {error && <p className={styles.alert} role="alert">{error}</p>}
        <button className={styles.submit} disabled={!canSubmit} type="submit">{busy && <span aria-hidden="true" className={styles.spinner} />}{busy ? (recovering ? "Enviando..." : registering ? "Criando conta..." : "Entrando...") : (recovering ? "Enviar instruções" : registering ? "Criar conta" : "Entrar")}</button>
      </form>
      <footer className={styles.footer}><p>{recovering ? "Lembrou sua senha?" : registering ? "Já possui uma conta?" : "Ainda não tem uma conta?"}<button className={styles.switch} disabled={busy} onClick={switchMode} type="button">{registering || recovering ? "Entrar" : "Criar conta"}</button></p></footer>
      </>}
    </section>
  </div>;
}
