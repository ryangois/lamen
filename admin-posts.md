# Admin de posts e lançamento do Hermetika

Este documento define como transformar o blog atual em uma plataforma editorial administrável, mantendo nos novos artigos o mesmo padrão visual dos textos já publicados.

## Objetivo

O editor deve permitir publicar artigos sem editar JSX, executar comandos Git ou fazer deploy manual. Os posts precisam preservar automaticamente:

- tipografia, cores e espaçamento do Hermetika;
- sumário navegável;
- componentes editoriais responsivos;
- metadados de SEO e compartilhamento;
- categorias, tags, referências e artigos relacionados;
- rascunhos, revisões, agendamento e publicação.

## Estado atual

Atualmente, os metadados estão em `src/data/blogPosts.js`, enquanto os artigos completos estão em módulos JSX dentro de `src/components/blog`.

Essa estrutura produz páginas rápidas e permite carregar cada artigo separadamente, mas exige alterar o código, criar um commit e publicar uma nova versão para cada texto.

Os favoritos, notas, histórico e progresso de estudo dos leitores continuam armazenados localmente no navegador. A primeira versão do banco editorial não precisa alterar esse comportamento.

## Arquitetura recomendada

```text
Admin /admin
    │
    ├── Supabase Auth ─── autenticação dos editores
    │
    ├── Supabase Database
    │      ├── posts e metadados
    │      ├── conteúdo estruturado em JSONB
    │      ├── categorias e tags
    │      └── revisões e agendamentos
    │
    ├── Supabase Storage ─── capas e imagens
    │
    └── ArticleRenderer
           ├── pré-visualização no admin
           └── artigo público com o mesmo CSS
```

### Tecnologias

- **Supabase Postgres:** posts, metadados, categorias, tags e revisões.
- **Supabase Auth:** acesso restrito ao admin.
- **Supabase Storage:** imagens, capas e documentos.
- **Tiptap:** editor visual baseado em conteúdo JSON estruturado.
- **React:** componentes editoriais e pré-visualização.
- **Next.js, recomendado para a camada pública:** renderização dos posts, metadados, sitemap e atualização incremental.
- **Vercel:** hospedagem, domínio, SSL e deploy.

Referências oficiais:

- [Supabase Database](https://supabase.com/docs/guides/database/overview)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Tiptap e conteúdo JSON](https://tiptap.dev/docs/editor/core-concepts/introduction)
- [Extensões do Tiptap](https://tiptap.dev/docs/editor/core-concepts/extensions)
- [Next.js: metadados dinâmicos](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js: Incremental Static Regeneration](https://nextjs.org/docs/app/guides/incremental-static-regeneration)
- [Vercel: domínio personalizado](https://vercel.com/docs/domains/working-with-domains/add-a-domain)

## Como o autor escreverá

O fluxo esperado em `/admin` é:

1. Entrar com e-mail e senha.
2. Abrir **Posts** e selecionar **Novo artigo**.
3. Preencher título, slug, resumo, categoria, tags e descrição SEO.
4. Escrever diretamente ou colar um texto completo.
5. Organizar o texto com blocos editoriais.
6. Conferir a pré-visualização desktop e mobile.
7. Salvar como rascunho, agendar ou publicar.

O admin deve oferecer salvamento automático e avisar claramente se houver alterações ainda não salvas.

## Como manter o mesmo visual

O conteúdo não deve salvar cores, margens ou estilos livres. Ele deve salvar apenas a estrutura semântica do artigo.

O editor e a página pública utilizarão o mesmo `ArticleRenderer`. Assim, um bloco `quote` sempre será desenhado como a citação dourada do Hermetika, independentemente do artigo em que aparecer.

| Bloco do admin | Componente público | Resultado |
|---|---|---|
| Título de seção | `SectionHeading` | Título Cinzel e entrada no sumário |
| Parágrafo | `Paragraph` | Texto editorial padronizado |
| Lista | `List` | Lista simples ou numerada |
| Citação | `KeyQuote` | Card dourado de destaque |
| Fórmula | `FormulaBlock` | Sequência ou equação simbólica |
| Tabela | `ResponsiveTable` | Tabela com adaptação mobile |
| Comparação | `ComparisonCards` | Dois ou mais cards comparativos |
| Quatro etapas | `FourStageGrid` | Atziluth, Briah, Yetzirah e Assiah |
| Hebraico | `HebrewCard` | Escrita RTL, transliteração e significado |
| Linha histórica | `Timeline` | Sequência cronológica |
| Matemática | `MathCard` | Exemplo como `10 + 22 = 32` |
| Referências | `References` | Fontes externas e notas editoriais |
| Relacionados | `RelatedPosts` | Links internos para outros artigos |
| Imagem | `EditorialImage` | Imagem, legenda, crédito e texto alternativo |

### Regras editoriais

- Não aceitar scripts ou HTML arbitrário.
- Validar o JSON do artigo antes de salvar e publicar.
- Gerar IDs únicos e estáveis para as seções.
- Montar o sumário automaticamente a partir dos títulos.
- Exigir texto alternativo e crédito nas imagens.
- Distinguir visualmente fonte primária, interpretação histórica e síntese hermética.
- Calcular o tempo estimado de leitura automaticamente, permitindo ajuste manual.
- Gerar o slug a partir do título, mas permitir edição antes da primeira publicação.
- Após publicar, mudanças de slug devem criar redirecionamento permanente.

## Estrutura do banco de dados

### `posts`

| Campo | Tipo sugerido | Uso |
|---|---|---|
| `id` | `uuid` | Identificador interno |
| `slug` | `text unique` | URL pública |
| `title` | `text` | Título principal |
| `excerpt` | `text` | Resumo do card no índice |
| `content` | `jsonb` | Documento estruturado do Tiptap |
| `status` | `enum` | `draft`, `scheduled`, `published`, `archived` |
| `category_id` | `uuid` | Categoria principal |
| `author_id` | `uuid` | Autor ou editor responsável |
| `cover_image` | `text` | Caminho da capa no Storage |
| `seo_title` | `text` | Título específico para busca |
| `seo_description` | `text` | Descrição para busca e compartilhamento |
| `reading_time` | `integer` | Minutos estimados |
| `published_at` | `timestamptz` | Publicação ou agendamento |
| `created_at` | `timestamptz` | Criação |
| `updated_at` | `timestamptz` | Última alteração |

### Tabelas complementares

- `categories`
- `tags`
- `post_tags`
- `post_revisions`
- `authors`
- `admin_roles`
- `redirects`

`post_revisions` deve guardar snapshots do conteúdo e dos metadados. Isso permite comparar versões e restaurar uma publicação sem depender exclusivamente dos backups da plataforma.

## Segurança

As tabelas expostas pela API devem ter Row Level Security habilitado.

Políticas esperadas:

- visitantes podem ler somente posts com `status = 'published'` e data válida;
- autores podem criar e editar seus próprios rascunhos;
- editores podem revisar e publicar;
- administradores podem gerenciar usuários, taxonomia e configurações;
- a chave `service_role` nunca deve ser enviada ao navegador;
- uploads devem aceitar somente tipos e tamanhos autorizados;
- a área administrativa deve possuir proteção contra tentativas repetidas de acesso.

Para um único autor inicial, as permissões podem começar com apenas os papéis `admin` e `public`, mantendo o banco preparado para expansão.

## Imagens

As imagens devem ser armazenadas no Supabase Storage, não dentro do campo JSON nem diretamente no banco.

Cada imagem editorial deve registrar:

- arquivo original;
- versão otimizada;
- largura e altura;
- texto alternativo;
- legenda;
- autoria ou instituição;
- fonte e licença;
- data de upload.

Evitar sobrescrever um arquivo mantendo a mesma URL. Uma nova versão deve receber um novo caminho para impedir conteúdo antigo no cache da CDN.

## SEO e renderização

O site atual é uma SPA construída com Vite. Os metadados do blog são adicionados no navegador, depois do carregamento do JavaScript.

Isso funciona para navegação, mas o estado ideal para um blog voltado à descoberta orgânica é entregar no HTML inicial:

- título e descrição;
- URL canônica;
- Open Graph e Twitter Cards;
- dados estruturados `Article`;
- corpo principal do artigo;
- links internos;
- imagem de compartilhamento.

### Estratégia recomendada

1. Manter Roda, Lista, Árvore e Oráculo como componentes interativos.
2. Migrar a camada de rotas e as páginas editoriais para Next.js.
3. Buscar os posts publicados no Supabase no servidor.
4. Gerar metadados por slug.
5. Usar ISR ou revalidação sob demanda quando um post for publicado.
6. Gerar `sitemap.xml`, feed RSS e páginas de categoria automaticamente.

A migração não exige reescrever os diagramas. Os componentes atuais podem continuar sendo carregados como componentes de cliente.

## Domínio dedicado

Prioridade sugerida, sujeita à disponibilidade e à verificação da marca:

1. `hermetika.com.br`
2. `hermetika.app`
3. `hermetika.digital`
4. `estudohermetika.com.br`

Estrutura recomendada:

```text
hermetika.com.br/
hermetika.com.br/blog
hermetika.com.br/blog/:slug
hermetika.com.br/arvore
hermetika.com.br/oraculo
hermetika.com.br/admin
```

Manter o blog em `/blog`, em vez de um subdomínio, concentra conteúdo, links e autoridade no domínio principal.

Ao configurar o domínio:

1. Adicionar domínio raiz e `www` na Vercel.
2. Escolher apenas um como canônico.
3. Redirecionar o outro permanentemente.
4. Redirecionar `lamen-mu.vercel.app` para o novo domínio.
5. Preservar caminhos antigos durante os redirecionamentos.
6. Atualizar canonical, Open Graph, sitemap, robots, manifesto e URLs do Supabase Auth.
7. Verificar SSL e propagação DNS.
8. Registrar o site no Google Search Console e Bing Webmaster Tools.

Antes da compra, verificar a disponibilidade do domínio e pesquisar o nome no INPI.

## Custos de referência

Valores consultados em julho de 2026 e sujeitos a mudança.

### Início

- Vercel Hobby: US$ 0/mês para projeto pessoal.
- Supabase Free: US$ 0/mês.
- Domínio: valor anual conforme extensão e registrador.

O plano gratuito do Supabase informa 500 MB de banco, 1 GB de Storage e 50 mil usuários ativos mensais incluídos. É suficiente para começar o blog e validar o admin.

### Produção com planos pagos

- Vercel Pro: a partir de US$ 20/mês.
- Supabase Pro: a partir de US$ 25/mês.

Referências:

- [Preços do Supabase](https://supabase.com/pricing)
- [Preços da Vercel](https://vercel.com/pricing)

Não é necessário contratar ambos os planos pagos no primeiro dia. A mudança deve ocorrer quando tráfego, necessidade de backups, colaboração e disponibilidade justificarem o custo.

## Recursos do admin

### Primeira versão

- login e logout;
- lista de posts;
- pesquisa e filtros;
- criar, editar e duplicar artigo;
- rascunho e publicação;
- editor por blocos;
- geração e validação de slug;
- categorias e tags;
- upload de capa e imagens;
- pré-visualização desktop e mobile;
- SEO e imagem de compartilhamento;
- salvamento automático;
- confirmação antes de sair com alterações pendentes.

### Segunda versão

- agendamento;
- histórico de revisões;
- comparação e restauração de versões;
- autores, revisores e permissões;
- biblioteca de mídia;
- redirecionamentos;
- sugestões de links internos;
- relatório de links quebrados;
- análise de acessibilidade;
- feed RSS;
- métricas dos artigos;
- newsletter.

### Modelos editoriais

O botão **Novo artigo** pode começar com modelos:

- ensaio histórico;
- comparação entre tradições;
- ficha de letra hebraica;
- ficha de sefirah;
- ficha de caminho;
- estudo de anjo;
- guia contemplativo;
- bibliografia comentada.

Os modelos preenchem uma estrutura inicial, mas não bloqueiam a edição.

## Migração dos artigos atuais

1. Definir o schema JSON do editor.
2. Implementar o `ArticleRenderer`.
3. Recriar no renderer todos os componentes usados nos artigos atuais.
4. Converter os três artigos JSX para JSON.
5. Comparar visualmente as versões antiga e nova.
6. Publicar os registros no Supabase preservando os slugs.
7. Remover o conteúdo duplicado do bundle somente após validar produção.

Os slugs atuais devem ser preservados para evitar perda de links:

- `letras-hebraicas-sefer-yetzirah-kabbalah-hermetica`
- `arvore-da-vida-sempre-teve-22-caminhos`
- `quatro-arvores-da-vida-atziluth-briah-yetzirah-assiah`

## Plano de lançamento

### Conteúdo mínimo

- cinco a dez artigos permanentes;
- página Sobre;
- metodologia editorial;
- página de fontes e licenças;
- política de privacidade;
- tutorial das ferramentas;
- imagens próprias para compartilhamento.

### Integração entre blog e aplicativo

Cada artigo deve terminar com ações contextuais, por exemplo:

- **Explore esta letra na Árvore**;
- **Abra o caminho correspondente**;
- **Compare as cartas do Tarot**;
- **Descubra seu anjo**;
- **Salve esta correspondência**.

O blog deve funcionar como porta de entrada para Roda, Árvore, Oráculo e fichas, e não como uma área isolada.

### Sequência recomendada

1. Escolher e registrar o domínio.
2. Criar o Supabase e as migrações do banco.
3. Implementar autenticação e permissões.
4. Criar o `ArticleRenderer` e o editor por blocos.
5. Construir a área administrativa.
6. Migrar os artigos existentes.
7. Implementar SEO renderizado no servidor.
8. Configurar domínio, redirects, sitemap e ferramentas de busca.
9. Publicar o conjunto inicial de artigos.
10. Lançar e acompanhar erros, desempenho e termos pesquisados.

## Decisão recomendada

Para o Hermetika, a solução com melhor equilíbrio entre autonomia, consistência visual e possibilidade de crescimento é:

> Admin próprio em React com Tiptap, conteúdo JSONB no Supabase, imagens no Supabase Storage, autenticação com Supabase Auth e páginas públicas renderizadas por Next.js na Vercel.

Essa abordagem permite escrever sem código, mantém todos os posts visualmente consistentes, suporta futuras contas de leitores e oferece uma base adequada para SEO e crescimento editorial.
