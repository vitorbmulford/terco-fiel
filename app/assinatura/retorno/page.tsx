import type { Metadata } from "next";
import { PaymentReturn } from "@/app/components/premium/payment-return";

export const metadata: Metadata = {
  title: "Confirmar assinatura",
  description: "Confirmação segura da assinatura Terço Fiel Premium.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function SubscriptionReturnPage() { return <PaymentReturn />; }
