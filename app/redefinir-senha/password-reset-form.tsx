"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { PasswordField } from "@/app/components/auth/password-field";
import { PasswordRequirements, passwordMeetsRequirements } from "@/app/components/auth/password-requirements";
import { ApiError, resetPassword } from "@/app/components/premium/api";
import styles from "./password-reset.module.css";

export function PasswordResetForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [confirmationTouched, setConfirmationTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const confirmationError = confirmationTouched && confirmation !== password ? "As senhas não coincidem." : "";

  // O token já foi lido no servidor: tirá-lo da barra de endereços evita que
  // ele fique no histórico do navegador ou seja compartilhado por engano.
  useEffect(() => {
    if (!window.location.search) return;
    window.history.replaceState(null, "", window.location.pathname);
  }, []);
  const canSubmit = Boolean(token) && passwordMeetsRequirements(password) && confirmation === password && !busy;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setConfirmationTouched(true);
    setError(null);
    if (!canSubmit) return;
    setBusy(true);
    try {
      await resetPassword(token, password);
      setSuccess(true);
    } catch (reason) {
      if (reason instanceof ApiError && reason.status === 400) {
        setError("Este link é inválido, expirou ou já foi utilizado. Solicite um novo link.");
      } else {
        setError("Não foi possível redefinir sua senha agora. Tente novamente em instantes.");
      }
    } finally {
      setBusy(false);
    }
  }

  return <main className={styles.page}>
    <section aria-labelledby="reset-title" className={styles.panel}>
      <Link className={styles.brand} href="/">Terço Fiel</Link>
      {success ? <div aria-live="polite" className={styles.result} role="status">
        <p className={styles.eyebrow}>Senha atualizada</p>
        <h1 className={styles.title} id="reset-title">Sua nova senha está pronta</h1>
        <p className={styles.description}>Agora você já pode entrar novamente no site ou no aplicativo.</p>
        <Link className={styles.primaryLink} href="/?auth=login">Entrar na minha conta</Link>
      </div> : <>
        <p className={styles.eyebrow}>Segurança da conta</p>
        <h1 className={styles.title} id="reset-title">Crie uma nova senha</h1>
        <p className={styles.description}>Escolha uma senha com pelo menos 8 caracteres.</p>
        {!token ? <div className={styles.alert} role="alert">
          Este link não contém um token válido. Solicite uma nova redefinição na tela de entrada.
        </div> : <form aria-busy={busy} className={styles.form} noValidate onSubmit={submit}>
          <PasswordField autoComplete="new-password" disabled={busy} id="reset-password" label="Nova senha" onChange={(event) => setPassword(event.target.value)} value={password} />
          <PasswordRequirements password={password} />
          <PasswordField autoComplete="new-password" disabled={busy} error={confirmationError} id="reset-confirmation" label="Confirmar nova senha" onBlur={() => setConfirmationTouched(true)} onChange={(event) => setConfirmation(event.target.value)} value={confirmation} />
          {error && <p className={styles.alert} role="alert">{error}</p>}
          <button className={styles.submit} disabled={!canSubmit} type="submit">{busy ? "Salvando..." : "Salvar nova senha"}</button>
        </form>}
        <Link className={styles.backLink} href="/?auth=login">Voltar para entrar</Link>
      </>}
    </section>
  </main>;
}
