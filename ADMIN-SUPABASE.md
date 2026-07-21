# Configuração do Supabase e do admin editorial

Este guia coloca em funcionamento a área `/admin` implementada no Hermetika.

O código já contém:

- autenticação por e-mail e senha;
- papéis `viewer`, `author`, `editor` e `admin`;
- banco de posts em JSONB;
- rascunho, publicação e arquivamento;
- histórico automático de revisões;
- Storage para imagens;
- editor por blocos com importação de texto;
- pré-visualização com o mesmo renderer do blog;
- leitura pública dos posts publicados;
- fallback para os artigos estáticos quando o Supabase estiver indisponível.

## 1. Criar o projeto

1. Acesse [supabase.com/dashboard](https://supabase.com/dashboard).
2. Clique em **New project**.
3. Escolha a organização.
4. Use um nome como `hermetika-production`.
5. Crie e guarde uma senha forte para o banco.
6. Escolha a região mais próxima da maior parte do público.
7. Aguarde o projeto ficar disponível.

Não coloque a senha do banco, a chave `service_role` ou outros segredos no GitHub.

## 2. Executar a migration

O schema está em:

```text
supabase/migrations/202607210001_blog_admin.sql
```

### Pelo painel

1. Abra **SQL Editor** no Supabase.
2. Clique em **New query**.
3. Copie todo o conteúdo da migration.
4. Cole no editor.
5. Clique em **Run**.
6. Confirme que não houve erro.

A migration cria:

- `blog_profiles`;
- `blog_posts`;
- `blog_post_revisions`;
- `blog_redirects`;
- enums de status e papel;
- triggers de atualização e revisão;
- políticas de Row Level Security;
- bucket público `blog-media`;
- políticas de upload para editores.

### Pela CLI, opcional

Se futuramente o projeto utilizar Supabase CLI:

```bash
npx supabase login
npx supabase link --project-ref SEU_PROJECT_REF
npx supabase db push
```

O painel SQL é suficiente para a primeira configuração.

## 3. Criar o primeiro administrador

Execute a migration antes de criar o usuário. Assim o trigger criará automaticamente o perfil editorial.

1. Abra **Authentication > Users**.
2. Clique em **Add user**.
3. Escolha **Create new user**.
4. Informe seu e-mail e uma senha forte.
5. Marque o e-mail como confirmado, se essa opção aparecer.
6. Copie o UUID do usuário criado.
7. Volte ao **SQL Editor**.
8. Execute, substituindo o UUID:

```sql
update public.blog_profiles
set role = 'admin'
where id = 'UUID-DO-SEU-USUARIO';
```

9. Confirme:

```sql
select id, display_name, role
from public.blog_profiles;
```

O primeiro usuário deve aparecer como `admin`.

### Se o usuário foi criado antes da migration

Crie o perfil manualmente:

```sql
insert into public.blog_profiles (id, display_name, role)
values ('UUID-DO-SEU-USUARIO', 'Administrador', 'admin')
on conflict (id) do update set role = 'admin';
```

## 4. Obter URL e chave pública

1. Abra **Project Settings > API** ou **Settings > API Keys**.
2. Copie a **Project URL**.
3. Copie a chave **Publishable**. Em projetos que ainda exibem o modelo antigo, use a chave `anon public`.
4. Não copie a chave `service_role` para o frontend.

O navegador pode conhecer a chave publicável. A proteção real é feita pelas políticas RLS.

## 5. Configurar o ambiente local

Na raiz do projeto, copie:

```text
.env.example
```

para:

```text
.env.local
```

Preencha:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICAVEL
```

O `.gitignore` já ignora arquivos `*.local`, portanto `.env.local` não deve ser enviado ao GitHub.

Reinicie o ambiente:

```bash
npm run dev
```

Abra:

```text
http://localhost:5173/admin
```

Entre com o usuário administrador.

## 6. Primeiro teste

1. Clique em **Novo artigo**.
2. Preencha título, resumo e descrição SEO.
3. Clique em **Importar texto**.
4. Cole um artigo usando:
   - `##` para títulos;
   - `-` para listas;
   - `>` para citações.
5. Clique em **Converter em blocos**.
6. Confira a pré-visualização.
7. Salve como rascunho.
8. Edite novamente e clique em **Publicar**.
9. Abra o link público do artigo.
10. Confirme que ele também aparece em `/blog`.

Registros publicados ficam visíveis imediatamente. Registros com status `scheduled` tornam-se públicos automaticamente quando `published_at` chega ao horário definido.

## 7. Testar a segurança

Faça estes testes antes do lançamento:

1. Abra `/admin` em janela anônima: deve solicitar login.
2. Crie um usuário sem promover o papel: ele não deve acessar os posts.
3. Tente consultar um rascunho sem login: o banco não deve retorná-lo.
4. Publique um post: ele deve aparecer publicamente.
5. Arquive o post: ele deve desaparecer do blog público.
6. Faça upload de uma imagem com usuário editor.
7. Tente enviar arquivo sem autenticação: o Storage deve recusar.

## 8. Configurar na Vercel

1. Abra o projeto na Vercel.
2. Acesse **Settings > Environment Variables**.
3. Adicione:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

4. Marque os ambientes desejados:
   - Production;
   - Preview;
   - Development, se necessário.
5. Faça um novo deploy.
6. Abra `https://SEU-DOMINIO/admin`.

Como variáveis Vite são incorporadas durante o build, alterar uma variável exige novo deploy.

## 9. Configurar URLs no Supabase Auth

Em **Authentication > URL Configuration**:

### Durante os testes

```text
Site URL: http://localhost:5173
Redirect URLs:
http://localhost:5173/**
https://lamen-mu.vercel.app/**
```

### Depois do domínio próprio

```text
Site URL: https://hermetika.com.br
Redirect URLs:
https://hermetika.com.br/**
https://www.hermetika.com.br/**
```

Mantenha apenas URLs realmente utilizadas em produção.

## 10. Configurar domínio na Vercel

1. Registre o domínio escolhido.
2. Abra **Vercel > Project > Settings > Domains**.
3. Adicione o domínio raiz.
4. Adicione também `www`.
5. Siga os registros DNS apresentados pela Vercel.
6. Escolha um domínio principal.
7. Configure o outro para redirecionar permanentemente.
8. Aguarde DNS e SSL ficarem válidos.
9. Atualize as URLs do Supabase Auth.
10. Atualize canonical, Open Graph, `robots.txt`, sitemap e manifesto no projeto.

O blog deve permanecer em `/blog`, e o admin em `/admin`.

## 11. Papéis editoriais

### `viewer`

Usuário autenticado sem acesso editorial.

### `author`

Pode entrar no admin, criar e editar conteúdo. Na primeira versão, autores, editores e administradores compartilham as operações editoriais básicas.

### `editor`

Pode revisar e publicar conteúdo.

### `admin`

Pode administrar o conteúdo e gerenciar perfis editoriais.

Para alterar um papel:

```sql
update public.blog_profiles
set role = 'editor'
where id = 'UUID-DO-USUARIO';
```

## 12. Blocos disponíveis

- resumo de abertura;
- título de seção;
- parágrafo;
- citação destacada;
- lista simples ou numerada;
- fórmula ou sequência;
- tabela;
- cards comparativos;
- hebraico, transliteração e significado;
- linha histórica;
- imagem editorial;
- referências.

O editor e o blog público utilizam `ArticleRenderer`. Por isso os blocos têm o mesmo estilo nos dois locais.

## 13. Importação de textos

O importador reconhece uma estrutura Markdown simples:

```markdown
Resumo de abertura em um parágrafo.

## Nome da seção

Parágrafo da seção.

- primeiro item
- segundo item

> Citação importante.
```

Depois da importação, use os blocos especiais para transformar tabelas, fórmulas, hebraico e comparações.

## 14. Imagens

- limite configurado: 10 MB por arquivo;
- formatos: JPEG, PNG, WebP e AVIF;
- bucket: `blog-media`;
- leitura: pública;
- escrita e exclusão: somente editores autenticados;
- cada upload recebe um caminho novo e imutável.

Sempre informe texto alternativo, legenda e crédito quando aplicável.

SVG não é aceito pelo bucket público para reduzir o risco de conteúdo executável em imagens. Para imagens comuns, prefira WebP ou AVIF.

## 15. Revisões e recuperação

Antes de cada atualização, o banco grava automaticamente o estado anterior em `blog_post_revisions`.

Consulta básica:

```sql
select id, post_id, editor_id, created_at
from public.blog_post_revisions
order by created_at desc;
```

A interface de restauração visual pode ser adicionada em uma segunda etapa. Até lá, a recuperação pode ser feita pelo SQL Editor.

## 16. Backup

Antes do lançamento:

- exporte periodicamente `blog_posts`, `blog_post_revisions` e `blog_redirects`;
- mantenha as migrations no GitHub;
- mantenha cópias dos originais das imagens;
- considere o plano pago quando backups automáticos e disponibilidade se tornarem essenciais;
- teste a restauração, não apenas a criação do backup.

## 17. Limitação atual de SEO

Os posts do banco já funcionam no blog atual, porém o site continua sendo uma SPA Vite. Metadados e conteúdo são carregados pelo navegador.

Próxima fase recomendada:

1. migrar a camada de rotas para Next.js;
2. renderizar `/blog` e `/blog/[slug]` no servidor;
3. gerar metadados e Open Graph no HTML inicial;
4. gerar sitemap e RSS a partir do banco;
5. usar revalidação quando um post for publicado.

Essa fase melhora compartilhamento e indexação, mas não é necessária para começar a escrever e publicar pelo admin.

## 18. Solução de problemas

### “Supabase ainda não foi configurado”

- confirme `.env.local`;
- confirme os nomes das variáveis;
- reinicie `npm run dev`;
- na Vercel, faça novo deploy.

### “Acesso não autorizado”

- consulte `blog_profiles`;
- confirme o UUID;
- promova o usuário para `author`, `editor` ou `admin`;
- saia e entre novamente.

### O rascunho aparece no admin, mas não no blog

Esse é o comportamento correto. Publique o artigo e confirme `published_at`.

### O artigo publicado não aparece

Execute:

```sql
select slug, status, published_at
from public.blog_posts
order by updated_at desc;
```

Confirme `status = 'published'` e `published_at <= now()`.

### Upload recusado

- confirme o papel editorial;
- confirme tamanho e formato;
- confira se o bucket `blog-media` existe;
- confira as políticas de `storage.objects`.

### O site continua funcionando sem o Supabase

Sim. Os três artigos estáticos permanecem como fallback. Somente os novos posts do banco ficam temporariamente indisponíveis se o CMS estiver offline.
