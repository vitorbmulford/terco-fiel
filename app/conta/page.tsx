import type { Metadata } from "next";
import { AccountPage } from "@/app/components/account/account-page";

export const metadata: Metadata = { title: "Minha conta | Terço Fiel", description: "Conta, assinatura e privacidade no Terço Fiel." };

export default function AccountRoute() {
  return <AccountPage />;
}
