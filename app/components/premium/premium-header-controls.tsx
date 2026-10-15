"use client";

import Link from "next/link";
import { useAuth } from "@/app/components/auth/auth-provider";
import { AccountControl } from "@/app/components/auth/account-control";
import { legalLinks } from "@/app/components/premium/content";
import styles from "@/app/components/premium/premium.module.css";

export function PremiumHeaderControls() {
  const { premiumActive } = useAuth();

  return <>
    <nav aria-label="Navegação principal" className={styles.desktopNavigation}>
      {premiumActive ? <>
        <Link href="/aprender-a-rezar">Aprender</Link>
        <Link href="/misterios-do-terco">Mistérios</Link>
        <a href="#premium">Seu Premium</a>
        <a href="#seus-beneficios">Benefícios</a>
      </> : <>
        <Link href="/aprender-a-rezar">Aprender</Link>
        <Link href="/misterios-do-terco">Mistérios</Link>
        <a href="#premium">Premium</a>
        <a href="#duvidas">Dúvidas</a>
      </>}
    </nav>
    <AccountControl />
  </>;
}

export function PremiumLegalLinks() {
  const { premiumActive } = useAuth();
  const links = premiumActive ? legalLinks.filter((link) => link.href !== "?auth=login") : legalLinks;

  return <nav aria-label="Informações legais">
    {links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
  </nav>;
}
