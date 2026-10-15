"use client";

import { useState } from "react";
import { useAuth } from "@/app/components/auth/auth-provider";
import { benefits, comingSoonBenefits, frequentlyAskedQuestions } from "@/app/components/premium/content";
import { ArrowUpRightIcon, BenefitIcon, PremiumSealIcon, RosaryIllustration } from "@/app/components/premium/icons";
import { SubscriptionPanelClient } from "@/app/components/premium/subscription-panel-client";
import { ApiError, createCustomerPortal, type EntitlementResponse, type SubscriptionDetails } from "@/app/components/premium/api";
import styles from "@/app/components/premium/premium.module.css";

function displayName(name: string | null | undefined) {
  const firstName = name?.trim().split(/\s+/)[0];
  return firstName || "você";
}

function formatDate(value: string | null) {
  if (!value || Number.isNaN(new Date(value).getTime())) return null;
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

function SalesExperience() {
  return (
    <main className={styles.main} id="premium">
      <div className={styles.introColumn}>
        <p className={styles.eyebrow}>Terço Fiel Premium</p>
        <h1>Proteja sua caminhada de oração</h1>
        <p className={styles.lead}>Guarde o que é seu, continue em outro aparelho e ouça seus áudios mesmo sem internet.</p>
        <aside className={styles.supportMessage}>
          <RosaryIllustration />
          <div><p>O Premium ajuda a manter o Terço Fiel gratuito para todos.</p><p>Terço, Rosário, meditações e áudios online continuam livres e completos, sempre.</p></div>
        </aside>
        <section aria-labelledby="benefits-heading" className={styles.benefits}>
          <div className={styles.benefitsHeading}><h2 id="benefits-heading">O que o Premium oferece</h2></div>
          <ul>
            {benefits.map((benefit) => <li key={benefit.label}><BenefitIcon paths={benefit.paths} /><span>{benefit.label}</span></li>)}
            {comingSoonBenefits.map((benefit) => <li className={styles.comingSoonBenefit} key={benefit.label}><BenefitIcon paths={benefit.paths} /><span>{benefit.label}</span></li>)}
          </ul>
          <p className={styles.formationNote}>Na Escola de oração, você escolhe o ritmo: abra as fontes completas para estudar mais a fundo ou siga a meditação diária, que reúne o essencial com clareza e fluidez.</p>
        </section>
      </div>
      <div className={styles.purchaseColumn}>
        <SubscriptionPanelClient />
        <section aria-labelledby="questions-heading" className={styles.questions} id="duvidas">
          <h2 id="questions-heading">Dúvidas</h2>
          {frequentlyAskedQuestions.map((item) => <article key={item.question}><h3>{item.question}</h3><p>{item.question === "Já assinei antes" ? <>Use <a href="#restaurar">Restaurar compra</a> no mesmo ID de loja, sem pagar novamente.</> : item.answer}</p></article>)}
        </section>
      </div>
    </main>
  );
}

function SubscriptionManagement() {
  const { logout, openAuth, token } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function openPortal() {
    if (!token) { openAuth("login"); return; }
    setBusy(true);
    setError(null);
    try {
      const { portalUrl } = await createCustomerPortal(token);
      window.location.assign(portalUrl);
    } catch (reason) {
      if (reason instanceof ApiError && reason.status === 401) {
        logout();
        openAuth("login");
      }
      setError(reason instanceof Error ? reason.message : "Não foi possível abrir o gerenciamento da assinatura.");
      setBusy(false);
    }
  }

  return <section className={styles.subscriptionManagement} aria-labelledby="management-title">
    <div>
      <p className={styles.eyebrow}>Assinatura</p>
      <h2 id="management-title">Gerencie seu Premium</h2>
      <p>Atualize o pagamento, consulte faturas ou cancele sua assinatura pelo portal seguro da Stripe.</p>
    </div>
    <div className={styles.managementAction}>
      <button disabled={busy} onClick={() => void openPortal()} type="button">{busy ? "Abrindo portal..." : "Gerenciar assinatura"}</button>
      {error && <p role="alert">{error}</p>}
    </div>
  </section>;
}

function PremiumExperience({ name, subscription, entitlement }: { name: string | null | undefined; subscription: SubscriptionDetails | null; entitlement: EntitlementResponse | null }) {
  const hasSubscriptionStart = Boolean(subscription?.currentPeriodStart);
  const hasSubscriptionEnd = Boolean(subscription?.currentPeriodEnd);
  const startDate = formatDate(subscription?.currentPeriodStart ?? entitlement?.updatedAt ?? null);
  const endDate = formatDate(subscription?.currentPeriodEnd ?? entitlement?.validUntil ?? null);
  return (
    <main className={styles.premiumExperience} id="premium">
      <section className={styles.premiumHero} aria-labelledby="premium-title">
        <div className={styles.premiumGlow} aria-hidden="true" />
        <div className={styles.premiumHeroCopy}>
          <p className={styles.premiumKicker}><span aria-hidden="true">✦</span> Terço Fiel Premium</p>
          <h1 id="premium-title">Tudo certo, {displayName(name)}.<br />Você é Premium.</h1>
          <p>Seu acesso está ativo. Sua caminhada está protegida e você já pode baixar áudios para rezar sem internet.</p>
          <a className={styles.premiumHeroLink} href="#seus-beneficios">Conhecer seus benefícios <ArrowUpRightIcon /></a>
        </div>
        <div className={styles.premiumSeal}>
          <div className={styles.premiumSealHalo} aria-hidden="true" />
          <PremiumSealIcon />
          <span>Premium</span>
          <strong>Ativo</strong>
        </div>
      </section>

      <section className={styles.premiumOverview} aria-label="Resumo da assinatura">
        <div className={styles.activeStatusCard}>
          <span className={styles.activeStatusDot} aria-hidden="true" />
          <div><p>Seu acesso</p><strong>Premium ativo</strong>{(startDate || endDate) && <div className={styles.subscriptionDates}>{startDate && <span><small>{hasSubscriptionStart ? "Premium ativado em" : "Ativado em"}</small>{startDate}</span>}{endDate && <span><small>{hasSubscriptionEnd && !subscription?.cancelAtPeriodEnd ? "Próxima renovação" : "Acesso até"}</small>{endDate}</span>}</div>}</div>
        </div>
        <p className={styles.premiumOverviewText}>Seu backup, sincronização, intenções salvas e downloads offline já estão disponíveis. Os Caminhos guiados chegarão em breve.</p>
      </section>

      <section className={styles.unlockedSection} id="seus-beneficios" aria-labelledby="unlocked-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>Seu espaço Premium</p><h2 id="unlocked-title">Recursos disponíveis hoje</h2><p>Proteção e continuidade para acompanhar sua oração onde você estiver.</p></div>
        <ul className={styles.unlockedGrid}>
          {benefits.map((benefit, index) => <li key={benefit.label} className={styles.unlockedCard}><span className={styles.unlockedNumber}>0{index + 1}</span><BenefitIcon paths={benefit.paths} /><div><strong>{benefit.label}</strong><span>{benefit.detail}</span></div><span className={styles.unlockedCheck} aria-hidden="true">✓</span></li>)}
        </ul>
      </section>

      <section className={styles.comingSoonSection} aria-labelledby="coming-soon-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>Seu espaço Premium</p><h2 id="coming-soon-title">Caminhos para aprofundar</h2><p>Percursos, novenas, formação e especiais litúrgicos para acompanhar os próximos passos da sua jornada.</p></div>
        <ul className={styles.unlockedGrid}>
          {comingSoonBenefits.map((benefit, index) => <li key={benefit.label} className={`${styles.unlockedCard} ${styles.comingSoonCard}`}><span className={styles.unlockedNumber}>0{index + 1}</span><BenefitIcon paths={benefit.paths} /><div><strong>{benefit.label}</strong><span>{benefit.detail}</span></div></li>)}
        </ul>
      </section>

      <section className={styles.premiumClosing} aria-labelledby="closing-title">
        <RosaryIllustration />
        <div><p className={styles.eyebrow}>Aproveite seu Premium</p><h2 id="closing-title">Sua jornada está guardada para seguir com você.</h2><p>Reze livremente hoje; quando trocar de aparelho, sua conta ajuda você a continuar de onde parou.</p></div>
      </section>
      {subscription && <SubscriptionManagement />}
    </main>
  );
}

export function PremiumContent() {
  const { loading, premiumActive, premiumEntitlement, subscription, user } = useAuth();
  if (loading) return <main className={styles.loadingExperience} aria-busy="true"><span /><span /><span /></main>;
  return premiumActive ? <PremiumExperience entitlement={premiumEntitlement} name={user?.name} subscription={subscription} /> : <SalesExperience />;
}
