"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/components/auth/auth-provider";
import { ApiError, createCheckout, getPlans, type SubscriptionApiPlan } from "@/app/components/premium/api";
import styles from "@/app/components/premium/premium.module.css";

function money(amount: number, interval: SubscriptionApiPlan["interval"]) {
  return `${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(amount)} / ${interval === "YEAR" ? "ano" : "mês"}`;
}

export function SubscriptionPanel() {
  const { loading: authLoading, logout, openAuth, premiumActive, refreshEntitlements, token } = useAuth();
  const [isHydrated, setIsHydrated] = useState(false);
  const [plans, setPlans] = useState<SubscriptionApiPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionApiPlan["plan"] | null>(null);
  const [trialSelected, setTrialSelected] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeCheckout, setResumeCheckout] = useState(false);

  useEffect(() => { void Promise.resolve().then(() => setIsHydrated(true)); }, []);
  useEffect(() => { if (!isHydrated) return; void getPlans().then((available) => { setPlans(available); const monthly = available.find((plan) => plan.plan === "PREMIUM_MONTHLY"); setSelectedPlan(monthly?.plan ?? available[0]?.plan ?? null); setTrialSelected(Boolean(monthly)); }).catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Não foi possível carregar os planos.")); }, [isHydrated]);
  const monthlyPlan = plans.find((plan) => plan.plan === "PREMIUM_MONTHLY") ?? null;
  const startCheckout = useCallback(async () => {
    if (!selectedPlan) return;
    if (!token) { openAuth("login", () => setResumeCheckout(true)); return; }
    setBusy(true); setError(null);
    try {
      const data = await createCheckout(selectedPlan, token, trialSelected);
      if (!data.checkoutUrl) throw new Error("O checkout não retornou uma URL de pagamento.");
      window.location.assign(data.checkoutUrl);
    } catch (reason) {
      if (reason instanceof ApiError && reason.status === 401) { logout(); openAuth("login", () => setResumeCheckout(true)); setError("Sua sessão expirou. Entre novamente."); }
      else setError(reason instanceof Error ? reason.message : "Não foi possível iniciar o checkout.");
      setBusy(false);
    }
  }, [logout, openAuth, selectedPlan, token, trialSelected]);

  const refreshStatus = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      await refreshEntitlements();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível atualizar o status da assinatura.");
    } finally {
      setBusy(false);
    }
  }, [refreshEntitlements]);

  useEffect(() => { if (resumeCheckout && token) queueMicrotask(() => { setResumeCheckout(false); void startCheckout(); }); }, [resumeCheckout, startCheckout, token]);

  return <section className={styles.subscriptionPanel} aria-labelledby="plan-heading">
    {premiumActive ? <div className={styles.activeSubscription}>
      <p className={styles.eyebrow}>Assinatura Premium</p>
      <h2>Seu Premium está ativo.</h2>
      <p>Seu backup, sincronização, intenções salvas e downloads offline já estão disponíveis para esta conta.</p>
      <div className={styles.activeSubscriptionActions}>
        <Link className={styles.subscriptionLink} href="/conta">Ver minha conta</Link>
        <button className={styles.textButton} disabled={busy} onClick={() => void refreshStatus()} type="button">{busy ? "Atualizando…" : "Atualizar status"}</button>
      </div>
    </div> : <>
      <fieldset className={styles.planFieldset} disabled={busy || !isHydrated || authLoading}><legend className={styles.eyebrow} id="plan-heading">Escolha como deseja começar</legend><div className={styles.planList}>{monthlyPlan && <button aria-pressed={trialSelected} className={`${styles.planCard} ${trialSelected ? styles.planCardSelected : ""}`} onClick={() => { setSelectedPlan(monthlyPlan.plan); setTrialSelected(true); setError(null); }} type="button"><span className={styles.planRadio} aria-hidden="true" /><span className={styles.planContent}><span className={styles.planTitleRow}><span className={styles.planName}>Teste grátis por 7 dias</span></span><span className={styles.price}>R$ 0,00 </span><span className={styles.planDetail}>Depois, {money(monthlyPlan.amount, monthlyPlan.interval)}, se não cancelar</span></span></button>}{plans.map((plan) => <button aria-pressed={!trialSelected && plan.plan === selectedPlan} className={`${styles.planCard} ${!trialSelected && plan.plan === selectedPlan ? styles.planCardSelected : ""}`} key={plan.plan} onClick={() => { setSelectedPlan(plan.plan); setTrialSelected(false); setError(null); }} type="button"><span className={styles.planRadio} aria-hidden="true" /><span className={styles.planContent}><span className={styles.planTitleRow}><span className={styles.planName}>{plan.interval === "YEAR" ? "Premium anual" : "Premium mensal"}</span>{plan.interval === "YEAR" && <span className={styles.valueBadge}>Melhor valor</span>}</span><span className={styles.price}>{money(plan.amount, plan.interval)}</span><span className={styles.planDetail}>{plan.interval === "YEAR" ? "Cobrança anual imediata" : "Cobrança mensal imediata"}</span></span></button>)}</div></fieldset>
      <button className={styles.subscribeButton} disabled={!isHydrated || !selectedPlan || busy || authLoading} onClick={() => void startCheckout()} type="button">{busy ? "Redirecionando..." : trialSelected ? "Iniciar 7 dias grátis" : "Continuar para pagamento"}</button>
    </>}
    {error && <p className={styles.errorMessage} role="alert">{error}</p>}
  </section>;
}
