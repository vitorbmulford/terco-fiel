"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/app/components/auth/auth-provider";
import { InformationPage } from "@/app/components/site/information-page";

export function AccountPage() {
  const { loading, openAuth, premiumActive, refreshEntitlements, token, user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function refresh() {
    setRefreshing(true);
    setMessage(null);
    try {
      const active = await refreshEntitlements();
      setMessage(active ? "Seu acesso Premium está ativo." : "Nenhum acesso Premium ativo foi encontrado para esta conta.");
    } catch {
      setMessage("Não foi possível atualizar agora. Tente novamente em instantes.");
    } finally {
      setRefreshing(false);
    }
  }

  return <InformationPage eyebrow="Conta" intro="Consulte o acesso Premium e encontre os documentos e orientações ligados à sua conta." title="Minha conta">
    {loading ? <p aria-live="polite">Verificando sua sessão…</p> : !user || !token ? <section className="accountEmpty"><h2>Entre para ver sua conta</h2><p>Use a conta usada na assinatura para consultar o Premium e atualizar seu status.</p><button onClick={() => openAuth("login")} type="button">Entrar</button></section> : <>
      <section className="accountCard"><h2>Dados da conta</h2><dl><div><dt>Nome</dt><dd>{user.name || "Não informado"}</dd></div><div><dt>E-mail</dt><dd>{user.email}</dd></div></dl></section>
      <section className="accountCard"><h2>Assinatura Premium</h2><p>{premiumActive ? "Premium ativo nesta conta." : "Você não possui um acesso Premium ativo nesta conta."}</p><button disabled={refreshing} onClick={() => void refresh()} type="button">{refreshing ? "Atualizando…" : "Atualizar status"}</button>{message && <p aria-live="polite" className="accountMessage">{message}</p>}<p className="accountHint">O pagamento é processado pela Stripe. Para dúvidas sobre uma cobrança específica, consulte a <Link href="/ajuda#pagamentos">Ajuda sobre pagamentos</Link>.</p></section>
      <section className="accountCard"><h2>Privacidade e documentos</h2><p>Você pode revisar as condições do serviço e como os dados necessários para sua conta e assinatura são tratados.</p><ul><li><Link href="/termos-de-uso">Termos de Uso</Link></li><li><Link href="/politica-de-privacidade">Política de Privacidade e compartilhamento de dados</Link></li><li><Link href="/ajuda">Central de Ajuda</Link></li></ul></section>
    </>}
  </InformationPage>;
}
