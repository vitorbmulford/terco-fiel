import type { Metadata } from "next";
import Link from "next/link";
import { InformationPage } from "@/app/components/site/information-page";

export const metadata: Metadata = { title: "Termos de Uso | Terço Fiel", description: "Termos de Uso do Terço Fiel." };

export default function TermsPage() {
  return <InformationPage eyebrow="Documento legal" intro="Estes Termos explicam as condições para usar o Terço Fiel e os recursos Premium." title="Termos de Uso">
    <p className="informationUpdated">Última atualização: 31 de agosto de 2026.</p>
    <section><h2>1. O Terço Fiel</h2><p>O Terço Fiel, oferecido pela <a href="https://bacanieskigroup.com/" rel="noreferrer" target="_blank">Bacanieski Group</a>, disponibiliza recursos digitais para a prática da oração do terço. Terço, Rosário, meditações e áudios online fazem parte da experiência gratuita. O Premium acrescenta backup privado e sincronização da caminhada, intenções salvas, downloads para ouvir offline e, quando publicados, Caminhos guiados de oração e formação.</p></section>
    <section><h2>2. Sua conta</h2><p>Para acessar recursos vinculados à conta ou contratar o Premium, você deve informar dados corretos, proteger sua senha e manter o acesso sob sua responsabilidade. Não compartilhe suas credenciais.</p></section>
    <section><h2>3. Assinatura Premium e pagamentos</h2><p>O Premium é uma assinatura recorrente. Antes da contratação, apresentamos o valor do plano, a periodicidade e as condições de renovação automática, quando aplicável. O pagamento é processado em checkout hospedado pela Stripe; o Terço Fiel não recebe nem armazena os dados completos do seu cartão.</p><p>O Premium fica vinculado à conta Terço Fiel usada na contratação. Após a confirmação do pagamento, o acesso é liberado para essa conta. Se a confirmação demorar, entre em Minha conta e atualize o status da assinatura.</p></section>
    <section><h2>4. Gerenciamento e cancelamento</h2><p>Você pode gerenciar ou cancelar a assinatura pelo portal do cliente da Stripe, acessível pelo botão Gerenciar conta ou Gerenciar assinatura na área Minha conta. Nesse portal, é possível consultar a assinatura, a forma de pagamento e as cobranças. Cancelar a assinatura não exclui sua conta Terço Fiel.</p><p>Se houver cancelamento, o acesso Premium permanece disponível até o fim do período já pago, quando essa informação estiver indicada na sua conta. Seus direitos previstos na legislação brasileira, inclusive eventual direito de arrependimento quando legalmente aplicável, são preservados.</p></section>
    <section><h2>5. Uso adequado</h2><p>Você pode usar os conteúdos para fins pessoais. Não é permitido copiar, redistribuir, explorar comercialmente ou tentar interferir no funcionamento do serviço sem autorização.</p></section>
    <section><h2>6. Privacidade</h2><p>O tratamento de dados necessário para disponibilizar sua conta, assinatura e recursos está descrito na <Link href="/politica-de-privacidade">Política de Privacidade</Link>.</p></section>
    <section><h2>7. Alterações</h2><p>Podemos atualizar estes Termos, os preços, as condições de planos e os conteúdos ou funcionalidades Premium para refletir mudanças no serviço ou exigências legais. Mudanças futuras serão comunicadas de forma adequada e não alteram retroativamente períodos já pagos nem direitos já adquiridos pelo consumidor. A versão vigente ficará publicada nesta página.</p></section>
    <section><h2>8. Contato</h2><p>Para informações institucionais e canais de contato, consulte o <a href="https://bacanieskigroup.com/" rel="noreferrer" target="_blank">site da Bacanieski Group</a>. Para questões de acesso ou cobrança, consulte também a <Link href="/ajuda#pagamentos">Central de Ajuda</Link>.</p></section>
  </InformationPage>;
}
