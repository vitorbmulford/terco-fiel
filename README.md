# Terço Fiel — Premium

> **Marca e identificadores.** A marca pública do produto é **Terço Fiel**.
> Identificadores técnicos antigos (Terço Fiel, pacote
> `backsantoterco`, bundle ID, slug) permanecem por compatibilidade — renomeá-los
> apagaria dados de usuários e quebraria integrações.


Frontend Next.js para assinatura Premium via checkout hospedado da Stripe.

## Configuração

Crie um arquivo `.env.local` com as variáveis públicas abaixo:

```dotenv
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

O checkout é hospedado pela Stripe. O frontend não coleta dados de cartão nem possui chaves da Stripe; ele solicita ao backend autenticado uma Checkout Session e redireciona para a URL retornada.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

O backend precisa permitir a origem `http://localhost:3000` em `CORS_ALLOWED_ORIGINS`. A configuração que permite somente `http://localhost:5173` não atende este app Next.js.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
