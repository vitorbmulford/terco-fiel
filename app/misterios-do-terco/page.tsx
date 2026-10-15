import { GuidePage } from "@/app/components/content/guide-page";
import { createPageMetadata } from "@/app/lib/site";

const path = "/misterios-do-terco";
const description =
  "Conheça os vinte mistérios do Terço Fiel: Gozosos, Luminosos, Dolorosos e Gloriosos, com os dias indicados para cada conjunto.";

export const metadata = createPageMetadata({
  title: "Mistérios do Terço: dias e significado",
  description,
  path,
});

const mysteryGroups = [
  {
    title: "Mistérios Gozosos",
    days: "Segunda-feira e sábado",
    meaning: "A alegria da Encarnação e da infância de Jesus.",
    mysteries: [
      "A Anunciação",
      "A Visitação",
      "O Nascimento de Jesus",
      "A Apresentação no Templo",
      "O Encontro no Templo",
    ],
  },
  {
    title: "Mistérios Luminosos",
    days: "Quinta-feira",
    meaning: "A luz da vida pública de Cristo.",
    mysteries: [
      "O Batismo de Jesus no Jordão",
      "As Bodas de Caná",
      "O Anúncio do Reino",
      "A Transfiguração",
      "A Instituição da Eucaristia",
    ],
  },
  {
    title: "Mistérios Dolorosos",
    days: "Terça-feira e sexta-feira",
    meaning: "A Paixão e a entrega de Nosso Senhor.",
    mysteries: [
      "A Agonia no Horto",
      "A Flagelação",
      "A Coroação de Espinhos",
      "O Caminho do Calvário",
      "A Crucificação e Morte",
    ],
  },
  {
    title: "Mistérios Gloriosos",
    days: "Quarta-feira e domingo",
    meaning: "A vitória da Ressurreição e a esperança da glória.",
    mysteries: [
      "A Ressurreição",
      "A Ascensão",
      "A Vinda do Espírito Santo",
      "A Assunção de Maria",
      "A Coroação de Maria",
    ],
  },
] as const;

export default function RosaryMysteriesPage() {
  return (
    <GuidePage
      eyebrow="Contemplação"
      title="Os mistérios do Terço"
      description={description}
      path={path}
      related={[
        {
          href: "/misterio-do-dia",
          label: "Qual é o mistério de hoje?",
          description: "Veja automaticamente o conjunto indicado para o dia.",
        },
        {
          href: "/como-rezar-o-terco",
          label: "Como rezar o Terço",
          description: "Entenda onde anunciar e contemplar cada mistério.",
        },
        {
          href: "/aprender-a-rezar",
          label: "Guia para iniciantes",
          description: "Descubra o sentido do Terço antes de começar.",
        },
      ]}
    >
      <section>
        <h2>O que são os mistérios?</h2>
        <p>
          Os mistérios são acontecimentos da vida de Jesus contemplados durante a
          oração. Eles organizam o Terço Fiel como um caminho pelo Evangelho: da
          Encarnação à vida pública, da Paixão à Ressurreição.
        </p>
      </section>

      {mysteryGroups.map((group) => (
        <section key={group.title}>
          <h2>{group.title}</h2>
          <p>
            <strong>{group.days}.</strong> {group.meaning}
          </p>
          <ol>
            {group.mysteries.map((mystery) => (
              <li key={mystery}>{mystery}</li>
            ))}
          </ol>
        </section>
      ))}
    </GuidePage>
  );
}
