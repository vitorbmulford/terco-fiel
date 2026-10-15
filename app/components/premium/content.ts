export type SubscriptionPlan = "annual" | "monthly";

export type Benefit = {
  label: string;
  detail: string;
  paths: readonly string[];
};

export type Plan = {
  id: SubscriptionPlan;
  name: string;
  price: string;
  interval: string;
  detail: string;
  secondaryDetail?: string;
  trialDetail: string;
};

export const benefits: readonly Benefit[] = [
  {
    label: "Backup privado da sua caminhada",
    detail: "Histórico, progresso, favoritos, preferências e lembretes protegidos na sua conta.",
    paths: ["M5.4 3.6 h9.2 v12.8 l-4.6 -3 l-4.6 3 z"],
  },
  {
    label: "Sincronização entre aparelhos",
    detail: "Continue sua jornada ao entrar na mesma conta em outro celular.",
    paths: ["M4 8 v4", "M7 6 v8", "M10 3.6 v12.8", "M13 6 v8", "M16 8 v4"],
  },
  {
    label: "Intenções salvas e recuperáveis",
    detail: "Suas intenções concluídas ficam no backup privado da conta, nunca públicas.",
    paths: ["M4 5.5 h12 v10.5 h-12 z", "M4 9 h12", "M7.5 3.5 v3", "M12.5 3.5 v3"],
  },
  {
    label: "Downloads dos áudios para ouvir offline",
    detail: "Baixe os áudios do Terço e do Rosário para rezar sem conexão.",
    paths: ["M10 3.6 v8.6", "M6.6 9 l3.4 3.4 l3.4 -3.4", "M4.6 15.6 h10.8"],
  },
  {
    label: "Escola de oração com São Tomás de Aquino",
    detail: "Citações completas da Bíblia, da Suma e de outras obras de São Tomás, e do Catecismo, em uma caminhada que também pode ser seguida com leveza pela meditação diária.",
    paths: ["M10 3.4 v13.2", "M6 7.2 h8"],
  },
 ] as const;

export const comingSoonBenefits: readonly Benefit[] = [
  {
    label: "Caminhos de oração de 7, 15 e 30 dias",
    detail: "Percursos para recomeçar, perseverar e aprofundar sua vida de oração.",
    paths: ["M4 5.5 h12 v10.5 h-12 z", "M4 9 h12", "M7.5 3.5 v3", "M12.5 3.5 v3"],
  },
  {
    label: "Novenas guiadas",
    detail: "Novenas marianas e outras devoções vividas com reflexão, áudio e prática diária.",
    paths: ["M10 16.5 a6.5 6.5 0 1 0 0 -13 a6.5 6.5 0 0 0 0 13", "M10 6.5 v3.8 l2.6 1.6"],
  },
  {
    label: "Preparação para confissão e consagração",
    detail: "Caminhos formativos para momentos importantes da vida cristã.",
    paths: ["M10 3.4 v13.2", "M6 7.2 h8"],
  },
  {
    label: "Via-Sacra e especiais litúrgicos",
    detail: "Conteúdos guiados para Quaresma, Semana Santa, Advento, Natal e outras ocasiões.",
    paths: ["M10 3.4 v13.2", "M6 7.2 h8"],
  },
  {
    label: "Histórico privado dos Caminhos concluídos",
    detail: "Acompanhe os percursos que você já viveu, preservados na sua conta.",
    paths: ["M10 3.4 v13.2", "M6 7.2 h8"],
  },
] as const;

export const plans: readonly Plan[] = [
  {
    id: "annual",
    name: "Premium anual",
    price: "R$ 59,90",
    interval: "/ ano",
    detail: "Menos de R$ 5 por mês",
    secondaryDetail: "Economize em relação ao mensal",
    trialDetail: "Cobrança anual de R$ 59,90",
  },
  {
    id: "monthly",
    name: "Premium mensal",
    price: "R$ 7,99",
    interval: "/ mês",
    detail: "Cancele quando quiser",
    trialDetail: "",
  },
] as const;

export const frequentlyAskedQuestions = [
  {
    question: "O Terço Fiel continua gratuito?",
    answer:
      "Sim. Terço, Rosário, meditações e áudios online continuam gratuitos. O Premium protege sua caminhada, sincroniza seus dados e libera downloads offline.",
  },
  {
    question: "Como cancelo?",
    answer:
      "Pelo portal de assinatura, quando quiser. O acesso permanece até o fim do período pago.",
  },
  {
    question: "Já assinei antes",
    answer: "Entre com a mesma conta usada na assinatura para consultar seu acesso Premium.",
  },
] as const;

export const legalLinks = [
  { href: "?auth=login", label: "Já sou assinante" },
  { href: "/termos-de-uso", label: "Termos de uso" },
  { href: "/politica-de-privacidade", label: "Política de privacidade" },
] as const;
