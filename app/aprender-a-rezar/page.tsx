import { GuidePage, type GuideFaq } from "@/app/components/content/guide-page";
import styles from "@/app/components/content/guide-page.module.css";
import { createPageMetadata } from "@/app/lib/site";

const path = "/aprender-a-rezar";
const description =
  "Entenda o que é o Terço, por que rezamos com Maria e como começar sem pressa, mesmo sem conhecer as orações de cor.";

export const metadata = createPageMetadata({
  title: "Aprender a rezar o Terço",
  description,
  path,
});

const faq: readonly GuideFaq[] = [
  {
    question: "Preciso rezar o Terço inteiro de uma vez?",
    answer:
      "Não. Para quem está começando, uma dezena rezada com atenção já é um bom primeiro passo. A constância pode crescer aos poucos.",
  },
  {
    question: "E se eu me distrair durante a oração?",
    answer:
      "Volte com calma ao mistério contemplado. Distrações acontecem; o importante é retornar a Deus sem irritação e continuar.",
  },
  {
    question: "O Terço substitui a Missa?",
    answer:
      "Não. O Terço é uma devoção preciosa, mas a Eucaristia, a Missa dominical e os sacramentos têm primazia na vida cristã.",
  },
  {
    question: "Tenho que rezar em latim?",
    answer:
      "Não. O latim é uma riqueza da tradição, mas a oração precisa ser compreendida. Comece em português e aprenda o latim gradualmente, se desejar.",
  },
];

export default function LearnToPrayPage() {
  return (
    <GuidePage
      eyebrow="Guia para iniciantes"
      title="Aprender a rezar o Terço"
      description={description}
      path={path}
      faq={faq}
      related={[
        {
          href: "/como-rezar-o-terco",
          label: "Como rezar, passo a passo",
          description: "Veja a ordem das orações e das contas, do início ao fim.",
        },
        {
          href: "/misterio-do-dia",
          label: "Mistério do dia",
          description: "Descubra qual conjunto de mistérios a tradição indica para hoje.",
        },
        {
          href: "/terco-em-latim",
          label: "Terço em latim",
          description: "Aproxime-se do latim com tradução e sem deixar de compreender.",
        },
      ]}
    >
      <section>
        <h2>O que é o Terço?</h2>
        <p>
          O Terço é uma oração cristã simples e profunda. Enquanto rezamos o
          Pai-Nosso, a Ave-Maria e o Glória, contemplamos acontecimentos da vida
          de Jesus: sua Encarnação, vida pública, Paixão e glória.
        </p>
        <p>
          Maria não ocupa o lugar de Cristo. Rezamos com ela para aprender a
          olhar para Jesus, guardar sua Palavra e responder a Deus com fé.
        </p>
      </section>

      <section>
        <h2>Comece em três passos</h2>
        <ol>
          <li>
            <strong>Entenda o sentido.</strong> O centro de cada mistério é a vida
            de Cristo; as orações dão ritmo à contemplação.
          </li>
          <li>
            <strong>Aprenda a ordem.</strong> As contas conduzem cada oração para
            que você não precise se preocupar em contar ou decorar tudo.
          </li>
          <li>
            <strong>Reze uma dezena.</strong> Comece com um Pai-Nosso, dez
            Ave-Marias e o Glória, meditando um único mistério.
          </li>
        </ol>
      </section>

      <section className={styles.callout}>
        <h2>Uma intenção simples</h2>
        <p>
          Antes do Sinal da Cruz, faça alguns segundos de silêncio e diga
          interiormente: “Senhor, ofereço este Terço por...”. Apresente uma pessoa,
          uma necessidade, a Igreja, a família ou uma ação de graças.
        </p>
      </section>

      <section>
        <h2>Por que repetir Ave-Marias?</h2>
        <p>
          A repetição não é vazia quando nasce do amor. Ela cria um ritmo sereno
          para permanecer no mistério, desacelerar e deixar a oração passar da
          boca ao coração. Se perceber que está correndo, recomece a próxima conta
          com calma.
        </p>
      </section>
    </GuidePage>
  );
}
