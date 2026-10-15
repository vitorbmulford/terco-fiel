import Link from "next/link";
import type { ReactNode } from "react";
import { AccountControl } from "@/app/components/auth/account-control";
import { RosaryMark } from "@/app/components/premium/icons";
import styles from "@/app/components/premium/premium.module.css";

export function SiteHeader() {
  return <header className={styles.header}>
    <Link aria-label="Terço Fiel" className={styles.brand} href="/">
      <RosaryMark />
      <span>Terço Fiel</span>
    </Link>
    <nav aria-label="Navegação principal" className={styles.desktopNavigation}>
      <Link href="/#premium">Premium</Link>
      <Link href="/ajuda">Ajuda</Link>
      <Link href="/conta">Minha conta</Link>
    </nav>
    <AccountControl />
    <span className={styles.mobileTitle}>Terço Fiel</span>
    <Link aria-label="Voltar à página inicial" className={styles.mobileSpacer} href="/"><RosaryMark /></Link>
  </header>;
}

export function SiteFooter() {
  return <footer className={styles.footer}>
    <span>Terço Fiel</span>
    <nav aria-label="Informações legais">
      <Link href="/ajuda">Ajuda</Link>
      <Link href="/termos-de-uso">Termos de uso</Link>
      <Link href="/politica-de-privacidade">Política de privacidade</Link>
    </nav>
  </footer>;
}

export function InformationPage({ children, eyebrow, title, intro }: { children: ReactNode; eyebrow: string; title: string; intro: string }) {
  return <div className={`${styles.page} ${styles.informationPage}`}>
    <SiteHeader />
    <main className={styles.informationMain}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1>{title}</h1>
      <p className={styles.informationLead}>{intro}</p>
      <div className={styles.informationContent}>{children}</div>
    </main>
    <SiteFooter />
  </div>;
}
