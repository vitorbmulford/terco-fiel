# SEO e ASO — Terço Fiel

Documento operacional do site e das fichas de loja. Não contém estimativas de
volume sem fonte nem promessas de funcionalidades futuras.

## Posicionamento

**Terço Fiel** é um aplicativo católico focado na oração do terço: oração guiada,
mistério do dia, áudio em segundo plano e offline, português e latim, arte sacra,
leitura acessível, lembretes e orientação para iniciantes.

Diferenciação principal: foco e serenidade. O produto não tenta ser uma plataforma
religiosa genérica; ajuda o fiel a começar e concluir o Terço sem se perder.

## Mapa de intenção e palavras-chave

| Intenção | Palavra-chave principal | Apoio semântico | URL | Funil |
| --- | --- | --- | --- | --- |
| Encontrar o produto | Terço Fiel | app católico, oração guiada | `/` | Comercial |
| Começar | aprender a rezar o terço | terço para iniciantes, por que Maria | `/aprender-a-rezar` | Informacional |
| Executar a oração | como rezar o terço | passo a passo, contas, dezenas | `/como-rezar-o-terco` | Informacional |
| Entender a contemplação | mistérios do terço | gozosos, luminosos, dolorosos, gloriosos | `/misterios-do-terco` | Informacional |
| Rezar hoje | mistério do dia | mistério de hoje, mistérios da semana | `/misterio-do-dia` | Recorrente |
| Buscar tradição | terço em latim | ave-maria em latim, tradução | `/terco-em-latim` | Informacional/comercial |
| Buscar conveniência | terço com áudio | tela bloqueada, segundo plano, offline | `/terco-com-audio` | Comercial |

Não criar páginas adicionais até haver conteúdo realmente distinto. Variações como
“terça-feira mistério” devem ser respondidas pela página canônica do mistério do dia,
sem gerar sete páginas quase iguais.

## Indexação e metadata

| Rota | Indexar | Canonical | Observação |
| --- | --- | --- | --- |
| `/` e seis guias | Sim, só em produção | A própria rota | Entram no sitemap |
| `/redefinir-senha` | Não | Nenhum | Token e fluxo privado |
| `/assinatura/retorno` | Não | Nenhum | Estado transitório de pagamento |
| Preview/local | Não | `SITE_URL` nunca deve ser localhost | `robots.txt`, metadata e `X-Robots-Tag` bloqueiam |

Configuração:

- `SITE_URL`: origem canônica, sem caminho. Trocar para o domínio próprio quando existir.
- `SEO_INDEXING_ENABLED=true`: somente no projeto Vercel de produção.
- `GOOGLE_SITE_VERIFICATION` e `BING_SITE_VERIFICATION`: opcionais.
- `robots.ts`: bloqueia tudo fora de produção e aponta o sitemap em produção.
- `sitemap.ts`: contém apenas páginas públicas; `lastModified` representa a revisão real.
- `opengraph-image.tsx`: imagem social 1200 x 630, sem métricas ou avaliações inventadas.
- JSON-LD: `Organization`, `WebSite`, `SoftwareApplication`, `Article`, breadcrumbs e FAQ onde visível.

## Conteúdo e revisão pastoral

O texto dos guias foi derivado do conteúdo catequético existente no app. Antes da
publicação definitiva, uma pessoa responsável pela revisão doutrinal deve validar
especialmente fórmulas de oração, explicações sobre intercessão, sacramentos e
distribuição litúrgica dos mistérios. Não publicar autoria clerical que não exista.

## Apple App Store

**Nome (25/30 caracteres)**  
`Terço Fiel`

**Subtítulo (25/30 caracteres)**  
`Áudio, latim e arte sacra`

**Texto promocional (137/170 caracteres)**  
`Reze com constância e recolhimento. Acompanhe o mistério do dia, ouça as orações, use português ou latim e ajuste a leitura ao seu ritmo.`

**Palavras-chave (91/100 bytes em UTF-8)**  
`oração,católico,mistérios,ave-maria,guiado,contas,lembrete,offline,português,iniciante`

**Descrição**

> Terço Fiel ajuda você a rezar com calma, clareza e fidelidade.
>
> Acompanhe cada oração e cada conta sem se perder. O app mostra o mistério indicado
> para o dia, apresenta textos em português e latim e oferece uma experiência de
> leitura confortável para diferentes idades.
>
> REZE NO SEU RITMO
> • Terço Fiel guiado, conta por conta
> • Mistérios Gozosos, Luminosos, Dolorosos e Gloriosos
> • Mistério indicado para cada dia da semana
> • Áudio com controle de velocidade
> • Reprodução em segundo plano e na tela bloqueada
> • Áudio disponível para uso offline
>
> COMPREENSÃO E ACESSIBILIDADE
> • Orações em português e latim
> • Tamanhos de texto ajustáveis
> • Contador claro das contas e do progresso
> • Guia acolhedor para quem está aprendendo
> • Lembretes no horário e nos dias escolhidos
>
> O Terço Fiel essencial permanece gratuito. A assinatura Premium acrescenta
> conteúdos de aprofundamento e ajuda a manter o projeto.

## Google Play

**Título (25/30 caracteres)**  
`Terço Fiel`

**Descrição curta (71/80 caracteres)**  
`Reze com o Terço Fiel: áudio, mistérios do dia, latim e letras grandes.`

**Descrição completa**  
Usar a mesma descrição da App Store, sem o texto promocional. No primeiro parágrafo,
manter “Terço Fiel”, “áudio”, “mistério do dia” e “latim” em linguagem natural.
Não repetir palavras em listas artificiais nem citar concorrentes.

## Capturas das lojas

Ordem recomendada, sempre mostrando a interface real:

1. `O mistério certo para hoje`
2. `Reze conta por conta sem se perder`
3. `Acompanhe com áudio, até com a tela bloqueada`
4. `Português e latim lado a lado`
5. `Letras grandes e leitura confortável`
6. `Aprenda a rezar com calma`
7. `Prepare o áudio e reze offline`
8. `Lembretes no seu horário`

## Eventos de produto

Medir somente ações necessárias ao funil, sem texto de intenções, orações, e-mail ou
outro dado religioso/sensível:

- visualização da página Premium;
- abertura de login/cadastro;
- início do checkout por plano;
- retorno do checkout por estado genérico;
- abertura de cada guia público;
- clique futuro para App Store ou Google Play.

## Pendências manuais

1. Definir domínio próprio e atualizar `SITE_URL`, Vercel, Search Console e Bing.
2. Ativar `SEO_INDEXING_ENABLED=true` apenas depois de validar a produção.
3. Enviar `/sitemap.xml` ao Google Search Console e Bing Webmaster Tools.
4. Adicionar URLs reais das lojas quando os aplicativos forem publicados.
5. Atualizar nome e descrição exibidos no produto/checkout da Stripe para Terço Fiel.
6. Revisar a ficha das lojas a cada versão; não anunciar recurso ainda indisponível.
7. Validar JSON-LD no Rich Results Test após o deploy público.
