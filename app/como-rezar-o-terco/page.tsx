import { GuidePage, type GuideFaq } from "@/app/components/content/guide-page";
import styles from "@/app/components/content/guide-page.module.css";
import { createPageMetadata } from "@/app/lib/site";

const path = "/como-rezar-o-terco";
const description =
  "Veja como rezar com o Terço Fiel passo a passo: orações iniciais, cinco mistérios, dezenas e encerramento.";

export const metadata = createPageMetadata({
  title: "Como rezar o Terço passo a passo",
  description,
  path,
});

const faq: readonly GuideFaq[] = [
  {
    question: "Quantas Ave-Marias tem um Terço?",
    answer:
      "As cinco dezenas somam cinquenta Ave-Marias. Na abertura, costumam ser rezadas mais três Ave-Marias pelas virtudes da fé, esperança e caridade.",
  },
  {
    question: "Preciso ter um terço físico?",
    answer:
      "Não é obrigatório. As contas ajudam a acompanhar a oração, e o aplicativo pode cumprir essa função mostrando cada etapa e contando as Ave-Marias.",
  },
  {
    question: "Qual mistério devo rezar?",
    answer:
      "A distribuição tradicional indica Gozosos na segunda e no sábado; Dolorosos na terça e na sexta; Gloriosos na quarta e no domingo; Luminosos na quinta.",
  },
];

export default function HowToPrayPage() {
  return (
    <GuidePage
      eyebrow="Passo a passo"
      title="Como rezar o Terço"
      description={description}
      path={path}
      faq={faq}
      related={[
        {
          href: "/misterio-do-dia",
          label: "Mistério do dia",
          description: "Comece pelo conjunto indicado para o dia da semana.",
        },
        {
          href: "/misterios-do-terco",
          label: "Os vinte mistérios",
          description: "Conheça os Gozosos, Luminosos, Dolorosos e Gloriosos.",
        },
        {
          href: "/terco-com-audio",
          label: "Terço com áudio",
          description: "Acompanhe a oração com ritmo guiado e controles acessíveis.",
        },
      ]}
    >
      <section>
        <h2>Antes de começar</h2>
        <p>
          Escolha uma intenção e um lugar em que seja possível rezar com alguma
          atenção. Não é necessário decorar tudo: leia as orações com calma e
          deixe que a sequência se torne familiar com o tempo.
        </p>
      </section>

      <section>
        <h2>A abertura do Terço</h2>
        <ol>
          <li>Na cruz, faça o Sinal da Cruz e reze o Credo.</li>
          <li>Na primeira conta maior, reze um Pai-Nosso.</li>
          <li>Nas três contas seguintes, reze três Ave-Marias.</li>
          <li>Antes da primeira dezena, reze o Glória ao Pai.</li>
        </ol>
      </section>

      <section>
        <h2>Como rezar cada dezena</h2>
        <ol>
          <li>Anuncie o mistério e contemple a passagem da vida de Cristo.</li>
          <li>Na conta maior, reze um Pai-Nosso.</li>
          <li>Nas dez contas menores, reze dez Ave-Marias.</li>
          <li>Conclua com o Glória e, conforme o costume, a oração de Fátima.</li>
          <li>Repita a sequência para os cinco mistérios.</li>
        </ol>
      </section>

      <section className={styles.callout}>
        <h2>O essencial é contemplar</h2>
        <p>
          As contas organizam a oração, mas não são uma corrida. Leia a introdução
          de cada mistério, peça uma virtude e, ao se distrair, retorne a Jesus com
          serenidade.
        </p>
      </section>

      <section>
        <h2>Encerramento</h2>
        <p>
          Depois do quinto mistério, costuma-se rezar a Salve-Rainha e as orações
          finais. Existem pequenas variações legítimas conforme a comunidade e a
          tradição local; elas não mudam o coração do Terço.
        </p>
      </section>
    </GuidePage>
  );
}
