"use client";

import { useAuth } from "@/app/components/auth/auth-provider";
import Link from "next/link";
import styles from "@/app/components/premium/premium.module.css";

function getDisplayName(name: string | null) {
  return name?.trim() || "Conta conectada";
}

function getInitials(name: string | null, email: string) {
  const words = (name?.trim() || email.split("@")[0])
    .split(/\s+/)
    .filter(Boolean);

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toLocaleUpperCase("pt-BR");
}

export function AccountControl() {
  const { user, premiumActive, loading, logout, openAuth } = useAuth();

  if (loading) {
    return (
      <span aria-live="polite" className={styles.accountLoading} role="status">
        <span aria-hidden="true" className={styles.accountLoadingIndicator} />
        <span className={styles.accountLoadingLabel}>Verificando sessão</span>
      </span>
    );
  }

  if (!user) {
    return <button className={styles.accountButton} onClick={() => openAuth("login")} type="button">Entrar</button>;
  }

  const displayName = getDisplayName(user.name);
  const initials = getInitials(user.name, user.email);

  return (
    <div className={styles.accountControl}>
      <Link className={styles.accountStatus} href="/conta">{premiumActive ? "Premium" : "Conta"}: {displayName}</Link>
      <button className={styles.accountButton} onClick={logout} type="button">Sair</button>

      <aside aria-label="Conta conectada" className={styles.mobileAccountCard}>
        <span aria-hidden="true" className={styles.accountAvatar}>{initials}</span>
        <Link className={styles.mobileAccountDetails} href="/conta">
          <span className={styles.mobileAccountState}>
            <span aria-hidden="true" className={styles.accountPresence} />
            {premiumActive ? "Premium ativo" : "Sessão ativa"}
          </span>
          <strong>{displayName}</strong>
          <span>{user.email}</span>
        </Link>
        <button className={styles.mobileLogoutButton} onClick={logout} type="button">Sair</button>
      </aside>
    </div>
  );
}
