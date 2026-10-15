import { GuidePage, type GuideFaq } from "@/app/components/content/guide-page";
import styles from "@/app/components/content/guide-page.module.css";
import { createPageMetadata } from "@/app/lib/site";

export const revalidate = 3600;

const path = "/misterio-do-dia";
const description =
  "Veja qual mistério do Terço rezar hoje e consulte a distribuição dos mistérios Gozosos, Luminosos, Dolorosos e Gloriosos durante a semana.";

export const metadata = createPageMetadata({
  title: "Mistério do dia: o que rezar hoje",
  description,
  path,
});

const schedule = [
  { weekday: "Domingo", mystery: "Mistérios Gloriosos" },
  { weekday: "Segunda-feira", mystery: "Mistérios Gozosos" },
  { weekday: "Terça-feira", mystery: "Mistérios Dolorosos" },
  { weekday: "Quarta-feira", mystery: "Mistérios Gloriosos" },
  { weekday: "Quinta-feira", mystery: "Mistérios Luminosos" },
  { weekday: "Sexta-feira", mystery: "Mistérios Dolorosos" },
  { weekday: "Sábado", mystery: "Mistérios Gozosos" },
] as const;

const indexByEnglishWeekday: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function getTodayMystery() {
  const now = new Date();
  const englishWeekday = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "America/Sao_Paulo",
  }).format(now);
  const today = schedule[indexByEnglishWeekday[englishWeekday] ?? 0];
  const dateLabel = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    timeZone: "America/Sao_Paulo",
  }).format(now);

  return { ...today, dateLabel };
}

const faq: readonly GuideFaq[] = [
  {
    question: "Posso rezar outro mistério?",
    answer:
      "Sim. A distribuição semanal é uma orientação tradicional, não uma obrigação. Uma intenção, solenidade ou devoção pode levar você a contemplar outro conjunto.",
  },
  {
    question: "E nas festas litúrgicas?",
    answer:
      "É legítimo escolher mistérios relacionados à celebração do dia. A indicação semanal continua sendo um caminho simples para a oração cotidiana.",
  },
];

export default function DailyMysteryPage() {
  const today = getTodayMystery();

  return (
    <GuidePage
      eyebrow="Atualizado diariamente"
      title="Mistério do dia"
      description={description}
      path={path}
      faq={faq}
      related={[
        {
          href: "/misterios-do-terco",
          label: "Conheça os vinte mistérios",
          description: "Veja o significado e os cinco acontecimentos de cada conjunto.",
        },
        {
          href: "/como-rezar-o-terco",
          label: "Reze passo a passo",
          description: "Siga a ordem completa do Terço, da cruz ao encerramento.",
        },
        {
          href: "/terco-com-audio",
          label: "Acompanhe com áudio",
          description: "Reze caminhando, no transporte ou em um momento recolhido.",
        },
      ]}
    >
      <section className={styles.callout}>
        <h2>Hoje, {today.weekday.toLowerCase()}</h2>
        <p>
          Em {today.dateLabel}, a distribuição semanal indica os <strong>{today.mystery}</strong>.
        </p>
      </section>

      <section>
        <h2>Mistérios de cada dia da semana</h2>
        <table>
          <thead>
            <tr>
              <th scope="col">Dia</th>
              <th scope="col">Mistérios</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item) => (
              <tr key={item.weekday}>
                <td>{item.weekday}</td>
                <td>{item.mystery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Por que existe uma distribuição semanal?</h2>
        <p>
          Ela ajuda a percorrer regularmente toda a vida de Cristo. Ao longo da
          semana, o fiel contempla a alegria da Encarnação, a luz da vida pública,
          o amor da Paixão e a esperança da Ressurreição.
        </p>
      </section>
    </GuidePage>
  );
}
