"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ApiError } from "@/app/components/premium/api";
import { useAuth } from "@/app/components/auth/auth-provider";
import styles from "@/app/components/premium/premium.module.css";

const POLL_INTERVAL_MS = 1_500;
const MAX_POLL_ATTEMPTS = 10;

function wait(milliseconds: number) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

export function PaymentReturn() {
  const { loading, premiumActive, refreshEntitlements, token, openAuth } = useAuth();
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((reason: unknown) => {
    if (reason instanceof ApiError && reason.status === 401) {
      openAuth("login");
      setError("Sua sessão expirou. Entre novamente para conferir a assinatura.");
      return;
    }
    setError("Ainda não foi possível consultar o pagamento. Tente novamente em instantes.");
  }, [openAuth]);

  const checkOnce = useCallback(async () => {
    if (!token) return false;
    setChecking(true);
    setError(null);
    try {
      return await refreshEntitlements();
    } catch (reason) {
      handleError(reason);
      return false;
    } finally {
      setChecking(false);
    }
  }, [handleError, refreshEntitlements, token]);

  useEffect(() => {
    if (loading || !token || premiumActive) return;
    let cancelled = false;

    async function poll() {
      setChecking(true);
      setError(null);
      try {
        for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS && !cancelled; attempt += 1) {
          if (await refreshEntitlements()) return;
          await wait(POLL_INTERVAL_MS);
        }
      } catch (reason) {
        if (!cancelled) handleError(reason);
      } finally {
        if (!cancelled) setChecking(false);
      }
    }

    void poll();
    return () => { cancelled = true; };
  }, [handleError, loading, premiumActive, refreshEntitlements, token]);

  let content;
  if (loading || checking) {
    content = <>
      <p className={styles.confirmationEyebrow}>Assinatura Premium</p>
      <h1>Estamos confirmando seu pagamento...</h1>
      <p>A confirmação pode levar alguns instantes.</p>
    </>;
  } else if (premiumActive) {
    content = <>
      <p className={styles.confirmationEyebrow}>Assinatura Premium</p>
      <h1>Seu Premium está ativo.</h1>
      <p>Seu backup privado, sincronização, intenções salvas e downloads offline já estão liberados para sua conta.</p>
      <Link className={styles.confirmButton} href="/">Voltar ao Terço Fiel</Link>
    </>;
  } else if (!token) {
    content = <>
      <p className={styles.confirmationEyebrow}>Assinatura Premium</p>
      <h1>Entre para acompanhar a confirmação.</h1>
      <p>Use a conta usada na assinatura para consultar seu acesso Premium.</p>
      <button className={styles.confirmButton} onClick={() => openAuth("login")} type="button">Entrar</button>
    </>;
  } else {
    content = <>
      <p className={styles.confirmationEyebrow}>Assinatura Premium</p>
      <h1>Estamos confirmando seu pagamento...</h1>
      <p>O pagamento ainda está sendo processado. Atualize em alguns instantes para consultar seu acesso.</p>
      <button className={styles.confirmButton} onClick={() => void checkOnce()} type="button">Atualizar status</button>
    </>;
  }

  return <main className={styles.returnPage}>
    <section className={styles.returnCard} aria-live="polite">
      {content}
      {error && <p className={styles.errorMessage} role="alert">{error}</p>}
      {!premiumActive && token && !checking && <Link className={styles.returnLink} href="/">Voltar</Link>}
    </section>
  </main>;
}
