import Link from "next/link";
import type { ReactNode } from "react";
import { StructuredData } from "@/app/components/seo/structured-data";
import { SiteFooter, SiteHeader } from "@/app/components/site/information-page";
import { CrossIcon } from "@/app/components/premium/icons";
import { absoluteUrl, siteName } from "@/app/lib/site";
import styles from "@/app/components/content/guide-page.module.css";

export type GuideFaq = {
  question: string;
  answer: string;
};

type RelatedGuide = {
  href: string;
  label: string;
  description: string;
};

type GuidePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  path: string;
  children: ReactNode;
  related: readonly RelatedGuide[];
  faq?: readonly GuideFaq[];
};

export function GuidePage({
  eyebrow,
  title,
  description,
  path,
  children,
  related,
  faq,
}: GuidePageProps) {
  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      mainEntityOfPage: absoluteUrl(path),
      author: { "@type": "Organization", name: siteName },
      publisher: { "@type": "Organization", name: siteName },
      inLanguage: "pt-BR",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: title,
          item: absoluteUrl(path),
        },
      ],
    },
  ];

  if (faq?.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return (
    <div className={styles.page}>
      <StructuredData data={schemas} />
      <SiteHeader />

      <main>
        <div className={styles.hero}>
          <div className={styles.heroCross} aria-hidden="true"><CrossIcon /></div>
          <div className={styles.heroInner}>
            <nav aria-label="Navegação estrutural" className={styles.breadcrumb}>
              <Link href="/">Início</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{title}</span>
            </nav>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1>{title}</h1>
            <p className={styles.introduction}>{description}</p>
          </div>
        </div>

        <article className={styles.article}>{children}</article>

        {faq?.length ? (
          <section aria-labelledby="faq-heading" className={styles.faq}>
            <h2 id="faq-heading">Perguntas frequentes</h2>
            <div className={styles.faqList}>
              {faq.map((item) => (
                <article key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section aria-labelledby="related-heading" className={styles.related}>
          <div className={styles.relatedInner}>
            <p className={styles.sectionLabel}>Próximos passos</p>
            <h2 id="related-heading">Continue sua oração</h2>
            <div className={styles.relatedList}>
              {related.map((guide) => (
                <Link href={guide.href} key={guide.href}>
                  <span className={styles.relatedNumber} aria-hidden="true">↗</span>
                  <span>
                    <strong>{guide.label}</strong>
                    <span>{guide.description}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
