"use client";

import dynamic from "next/dynamic";

const SubscriptionPanel = dynamic(
  () => import("@/app/components/premium/subscription-panel").then((module) => module.SubscriptionPanel),
  {
    ssr: false,
    loading: () => <div aria-busy="true" />,
  },
);

export function SubscriptionPanelClient() {
  return <SubscriptionPanel />;
}
