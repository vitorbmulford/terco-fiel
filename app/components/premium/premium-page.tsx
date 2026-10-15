import Link from "next/link";
import { RosaryMark } from "@/app/components/premium/icons";
import { PremiumContent } from "@/app/components/premium/premium-content";
import { PremiumHeaderControls, PremiumLegalLinks } from "@/app/components/premium/premium-header-controls";
import styles from "@/app/components/premium/premium.module.css";

export function PremiumPage() {
  const guides = [
    { href: "/aprender-a-rezar", title: "Aprender a rezar", description: "Um começo simples, acolhedor e fiel à Igreja." },
    { href: "/como-rezar-o-terco", title: "Como rezar o Terço", description: "A ordem completa das contas e orações." },
    { href: "/misterio-do-dia", title: "Mistério do dia", description: "Veja o que contemplar hoje." },
    { href: "/terco-em-latim", title: "Terço em latim", description: "Aprenda com tradução e compreensão." },
    { href: "/terco-com-audio", title: "Terço com áudio", description: "Acompanhe cada conta com áudio, gratuitamente e no seu ritmo." },
  ] as const;

  return (
    <div className={styles.page} id="terco">
      <div className={styles.contentFrame}>
        <header className={styles.header}>
          <a aria-label="Terço Fiel" className={styles.brand} href="#terco">
            <RosaryMark />
            <span>Terço Fiel</span>
          </a>
          <PremiumHeaderControls />
          <span className={styles.mobileTitle}>Terço Fiel Premium</span>
          <span className={styles.mobileSpacer} aria-hidden="true"><RosaryMark /></span>
        </header>

        <PremiumContent />

        <section aria-labelledby="guides-heading" className={styles.guides}>
          <div className={styles.guidesHeading}>
            <p>Guias e conteúdos gratuitos</p>
            <h2 id="guides-heading">Aprenda e reze com mais segurança</h2>
            <span>Encontre explicações para aprender a rezar e acompanhe o Terço com áudio sem custo.</span>
          </div>
          <div className={styles.guideList}>
            {guides.map((guide, index) => (
              <Link href={guide.href} key={guide.href}>
                <i aria-hidden="true">0{index + 1}</i>
                <span>
                  <strong>{guide.title}</strong>
                  <span>{guide.description}</span>
                </span>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <span>Terço Fiel</span>
          <PremiumLegalLinks />
        </footer>
      </div>
    </div>
  );
}
