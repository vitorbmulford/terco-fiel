import { GuidePage, type GuideFaq } from "@/app/components/content/guide-page";
import styles from "@/app/components/content/guide-page.module.css";
import { createPageMetadata } from "@/app/lib/site";

const path = "/terco-com-audio";
const description =
  "Reze o Terço com áudio no Terço Fiel: ouça online gratuitamente, controle a velocidade e continue com a tela bloqueada. Com Premium, baixe para ouvir offline.";

export const metadata = createPageMetadata({
  title: "Terço com áudio online e offline",
  description,
  path,
});

const faq: readonly GuideFaq[] = [
  {
    question: "O áudio continua com a tela bloqueada?",
    answer:
      "Sim. O Terço Fiel foi preparado para reprodução em segundo plano e controles do sistema, inclusive durante caminhadas e deslocamentos.",
  },
  {
    question: "É possível mudar a velocidade?",
    answer:
      "Sim. O controle de velocidade permite encontrar um ritmo confortável para acompanhar a oração ou aprender a pronúncia em latim.",
  },
  {
    question: "Funciona sem internet?",
    answer:
      "Com internet, os áudios do Terço e do Rosário podem ser ouvidos gratuitamente. O download para manter os áudios disponíveis sem conexão é um recurso Premium.",
  },
];

export default function AudioRosaryPage() {
  return (
    <GuidePage
      eyebrow="Oração guiada"
      title="Terço com áudio"
      description={description}
      path={path}
      faq={faq}
      related={[
        {
          href: "/misterio-do-dia",
          label: "Mistério certo para hoje",
          description: "Escolha o conjunto indicado e comece a acompanhar.",
        },
        {
          href: "/terco-em-latim",
          label: "Aprenda o latim",
          description: "Use tradução e áudio juntos para preservar o significado.",
        },
        {
          href: "/como-rezar-o-terco",
          label: "Entenda cada etapa",
          description: "Veja como o áudio acompanha as contas e as cinco dezenas.",
        },
      ]}
    >
      <section>
        <h2>Um apoio para manter o ritmo</h2>
        <p>
          O áudio pode conduzir quem ainda não conhece todas as orações, ajudar a
          manter a atenção e acompanhar quem reza caminhando, dirigindo ou no
          transporte. Ele serve à oração; não precisa substituir momentos de
          silêncio e contemplação.
        </p>
      </section>

      <section>
        <h2>Recursos disponíveis</h2>
        <ul>
          <li>Reprodução das orações durante o Terço guiado.</li>
          <li>Velocidades diferentes para acompanhar no seu ritmo.</li>
          <li>Controles de pausa e reprodução na tela bloqueada e no fone.</li>
          <li>Continuidade em segundo plano no iPhone e no Android.</li>
          <li>Áudio online gratuito; com Premium, download para ouvir offline.</li>
        </ul>
      </section>

      <section className={styles.callout}>
        <h2>Para uma oração mais atenta</h2>
        <p>
          Escolha uma velocidade em que seja possível pronunciar as palavras com
          clareza. Antes de cada dezena, faça uma breve pausa para contemplar o
          mistério e formular sua intenção.
        </p>
      </section>

      <section>
        <h2>Acessibilidade também é parte da oração</h2>
        <p>
          Além do áudio, o Terço Fiel oferece textos grandes, contraste cuidadoso,
          português e latim e um contador claro das contas. A experiência foi
          pensada para iniciantes, idosos e pessoas que preferem ler sem esforço.
        </p>
      </section>
    </GuidePage>
  );
}
