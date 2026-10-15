import type { Metadata } from "next";
import Link from "next/link";
import { InformationPage } from "@/app/components/site/information-page";

export const metadata: Metadata = { title: "Ajuda | Terço Fiel", description: "Dúvidas sobre conta, Premium e pagamentos no Terço Fiel." };

const questions = [
  ["O Terço Fiel continua gratuito?", "Sim. Terço, Rosário, meditações e áudios online continuam livres. O Premium protege sua caminhada na conta, sincroniza seus dados, salva intenções e libera downloads para ouvir offline."],
  ["O que já está incluído no Premium?", "Hoje, o Premium inclui backup e sincronização da sua caminhada, intenções salvas e recuperáveis e downloads dos áudios do Terço e do Rosário para ouvir offline. Caminhos guiados, novenas e formações serão adicionados quando estiverem prontos."],
  ["Como assino o Premium?", "Escolha um plano na página inicial e siga para o checkout hospedado pela Stripe. Antes de pagar, você verá o valor, a periodicidade e as condições de renovação automática, quando aplicável."],
  ["Preciso de ajuda para entrar na conta.", "Por segurança, a recuperação de senha ainda não é oferecida neste site. Use o canal de suporte do aplicativo Terço Fiel para receber orientação sobre o acesso à sua conta."],
  ["Paguei, mas meu Premium ainda não apareceu.", "Entre com a mesma conta usada na contratação e abra Minha conta. Use Atualizar status; a confirmação pode levar alguns instantes após o checkout. Se o pagamento já tiver sido confirmado e o acesso não aparecer, entre em contato com o suporte informando o e-mail da conta e a data da cobrança."],
  ["Como gerencio ou cancelo o Premium?", "Entre em Minha conta e use o botão Gerenciar conta ou Gerenciar assinatura. Ele abre o portal do cliente da Stripe, onde você pode consultar a assinatura, a forma de pagamento, as cobranças e cancelar a renovação. O cancelamento da assinatura não exclui sua conta Terço Fiel."],
  ["Posso restaurar uma compra?", "O Premium é vinculado diretamente à conta Terço Fiel usada na contratação. Entre nessa mesma conta para consultar seu acesso e atualizar o status."],
  ["Como tiro uma dúvida de cobrança?", "Use o botão Gerenciar conta ou Gerenciar assinatura para consultar a cobrança no portal da Stripe. Para suporte, informe o e-mail da conta e a data da cobrança pelo canal de suporte do Terço Fiel."],
  ["Como meus dados são tratados?", "Consulte a Política de Privacidade para entender os dados necessários, a finalidade do tratamento e o compartilhamento ligado ao checkout."],
];

export default function HelpPage() {
  return <InformationPage eyebrow="Central de ajuda" intro="Respostas diretas para sua conta, assinatura e privacidade." title="Como podemos ajudar?">
    <div className="helpList">
      {questions.map(([question, answer], index) => <section id={index === 4 ? "pagamentos" : index === 2 ? "acesso" : undefined} key={question}><h2>{question}</h2><p>{answer}</p></section>)}
    </div>
    <p className="helpCallout">Você também pode consultar <Link href="/termos-de-uso">Termos de Uso</Link>, <Link href="/politica-de-privacidade">Política de Privacidade</Link> ou <Link href="/conta">Minha conta</Link>.</p>
  </InformationPage>;
}
