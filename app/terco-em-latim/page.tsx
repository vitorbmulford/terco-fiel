import { GuidePage, type GuideFaq } from "@/app/components/content/guide-page";
import styles from "@/app/components/content/guide-page.module.css";
import { createPageMetadata } from "@/app/lib/site";

const path = "/terco-em-latim";
const description =
  "Aprenda a rezar o Terço em latim com compreensão: comece pelo Sinal da Cruz e pela Ave-Maria, acompanhando a tradução em português.";

export const metadata = createPageMetadata({
  title: "Terço em latim com tradução",
  description,
  path,
});

const faq: readonly GuideFaq[] = [
  {
    question: "É obrigatório rezar o Terço em latim?",
    answer:
      "Não. O latim é uma riqueza da tradição da Igreja, mas o essencial é rezar com fé, atenção e compreensão.",
  },
  {
    question: "Como começar sem saber latim?",
    answer:
      "Comece por uma oração curta, leia a tradução e ouça a pronúncia. Use português e latim lado a lado até ganhar familiaridade.",
  },
  {
    question: "O significado das orações muda?",
    answer:
      "Não. Trata-se da mesma oração em outro idioma. A tradução ajuda você a conservar o sentido enquanto aprende as palavras latinas.",
  },
];

export default function RosaryInLatinPage() {
  return (
    <GuidePage
      eyebrow="Tradição da Igreja"
      title="Terço em latim"
      description={description}
      path={path}
      faq={faq}
      related={[
        {
          href: "/terco-com-audio",
          label: "Ouça e acompanhe",
          description: "Use o áudio e controle a velocidade para aprender com calma.",
        },
        {
          href: "/como-rezar-o-terco",
          label: "Ordem completa do Terço",
          description: "Aprenda primeiro a sequência das contas e orações.",
        },
        {
          href: "/aprender-a-rezar",
          label: "Comece em português",
          description: "Entenda o sentido da oração antes de acrescentar o latim.",
        },
      ]}
    >
      <section>
        <h2>Uma ponte para a tradição</h2>
        <p>
          O latim recorda a continuidade da fé e a unidade da Igreja. Ele pode
          favorecer reverência e recolhimento, mas não deve se tornar uma barreira
          para quem está começando. Compreender a oração vem primeiro.
        </p>
      </section>

      <section className={styles.callout}>
        <h2>Sinal da Cruz</h2>
        <p className={styles.prayer}>
          <strong>Latim</strong>{"\n"}
          In nomine Patris, et Filii, et Spiritus Sancti. Amen.
        </p>
        <p className={styles.prayer}>
          <strong>Português</strong>{"\n"}
          Em nome do Pai, e do Filho, e do Espírito Santo. Amém.
        </p>
      </section>

      <section>
        <h2>Ave-Maria em latim</h2>
        <p className={styles.prayer}>
          Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et
          benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ora pro
          nobis peccatoribus, nunc et in hora mortis nostrae. Amen.
        </p>
        <p>
          Leia uma frase por vez, compare com a Ave-Maria em português e dê atenção
          especial ao nome de Jesus, centro da oração.
        </p>
      </section>

      <section>
        <h2>Como aprender sem pressa</h2>
        <ol>
          <li>Comece pelo Sinal da Cruz.</li>
          <li>Depois, acompanhe uma Ave-Maria em latim com a tradução aberta.</li>
          <li>Ouça a pronúncia e repita em velocidade confortável.</li>
          <li>Alterne português e latim até poder rezar sem perder o sentido.</li>
        </ol>
      </section>
    </GuidePage>
  );
}
