# Hermetika

Enciclopédia hermética interativa que reúne os 72 anjos, signos, planetas, esferas, caminhos da Árvore da Vida, Tarot, Salmos, gematria e outras correspondências em uma experiência visual e pesquisável.

O projeto foi desenvolvido com React e Vite, funciona em celular e computador e pode ser instalado como aplicativo quando o navegador oferece suporte.

## Funcionalidades

### Hermetika em roda

- Mapa circular interativo com 72 anjos distribuídos em grupos de seis para cada signo.
- Anéis de signos, graus, planetas, elementos, modalidades, coros e arcanjos.
- Navegação por toque ou clique.
- Movimento e aproximação por arraste, pinça e roda do mouse.
- Abertura direta das fichas enciclopédicas a partir de qualquer setor.

### Hermetika em lista

- Visualização do mesmo acervo em formato de catálogo.
- Busca e filtros para encontrar anjos e correspondências.
- Alternativa mais direta à exploração visual da roda.

### Árvore da Vida

- Dez Sephiroth, Daath e os 22 caminhos clicáveis.
- Cores tradicionais, nomes hebraicos, transliterações e gematria.
- Correspondências planetárias, zodiacais, elementais e de Tarot.
- Textos e versões associadas ao Sefer Yetzirah.
- Leitura das Sephiroth nos Quatro Mundos.
- Comparação entre Tarot de Marselha, Rider–Waite–Smith e Thoth.
- Fontes e proveniência separadas por tradição.

### Laboratório dos 231 Portais

- Combinação interativa das 22 letras hebraicas em 231 pares distintos.
- Exibição do portal direto e de sua inversão.
- Soma gemátrica das letras selecionadas.
- Informações individuais de cada letra.
- Acesso aos caminhos relacionados.
- Galeria editorial de configurações históricas da Árvore da Vida.

### Oráculo

- Consulta de uma carta ou símbolo.
- Tiragem em tríade.
- Abertura dos resultados em fichas completas para aprofundamento.
- Histórico local das consultas acessadas.

### Meu anjo

- Localização de um dos 72 anjos por signo e grau.
- Divisão de cada signo em seis quinários.
- Resultado com acesso imediato à ficha do anjo.

### Busca universal

- Pesquisa por nomes, termos em hebraico e transliterações.
- Busca em Salmos, gematria, Tarot e correspondências.
- Sugestões durante a digitação.
- Atalho de teclado `/`.

### Blog

- Página editorial com índice de artigos.
- URLs próprias e metadados SEO para cada publicação.
- Sumário interno, progresso de leitura e compartilhamento.
- Tabelas e diagramas adaptados ao celular.
- Referências consultáveis e distinção entre camadas históricas.

### Fichas enciclopédicas

As fichas adaptam seu conteúdo ao tipo de símbolo e organizam as informações em quatro grupos:

- **Estudo:** “Em poucas palavras”, ocorrências no Tanakh, história, linha do tempo, tradição, versões textuais e Quatro Mundos.
- **Relações:** correspondências diretas e invertidas, relações internas, gematria, hebraico, iconografia comparada do Tarot e variações.
- **Prática:** Salmos contextualizados, objetivo, duração, pergunta, registro e conteúdo contemplativo responsável.
- **Fontes:** proveniência e referências consultadas.

Também incluem, conforme o item:

- navegação entre itens anteriores e posteriores;
- rede visual de símbolos relacionados;
- comparação lado a lado;
- estudo focado;
- notas privadas;
- favorito em uma ou mais coleções;
- compartilhamento por URL;
- gematria do nome completo e de formas abreviadas;
- análise de letras, raízes e equivalências numéricas.
- grafia quadrática e paleo-hebraica, sons, formas finais e ressalvas filológicas;
- síntese específica de “O que realmente varia” em cada caminho;
- transformação concreta entre as duas Sephiroth ligadas por cada caminho;
- linha do tempo da fonte antiga à síntese editorial da Hermetika.

### Estudo guiado

- Trilha introdutória em sete módulos.
- Acesso direto às fichas estudadas.
- Progresso armazenado localmente.

### Salvos e coleções

- Favoritos organizados em coleções personalizadas.
- Histórico dos itens visitados.
- Compartilhamento visual de coleções.
- Exportação e importação de backup.
- Backup de coleções, favoritos, histórico, progresso e notas.

### Aplicativo e privacidade

- Aplicativo web instalável (PWA).
- Service worker para melhorar o carregamento de recursos em produção.
- Conteúdo pessoal armazenado no próprio navegador.
- Nenhuma nota ou coleção é enviada automaticamente para um servidor.

## Navegação

O menu hambúrguer está disponível em celular e computador e reúne:

1. Buscar
2. Mapa
   - Roda
   - Lista
3. Árvore
   - Diagrama
   - 231 Portais
4. Oráculo
5. Meu anjo
6. Estudo
7. Tutorial
8. Metodologia
9. Blog
10. Salvos
11. Instalar Hermetika, quando permitido pelo navegador

O botão redondo com `?` abre o mesmo tutorial disponível no menu.

## Conteúdo e critérios editoriais

A Hermetika aproxima fontes judaicas, cabalísticas, cristãs, ocultistas e herméticas sem tratá-las como uma única tradição histórica.

As fichas procuram:

- distinguir fonte primária, comentário tradicional e síntese editorial;
- mostrar diferenças entre versões e sistemas;
- indicar a proveniência de correspondências;
- separar nomes hebraicos, transliterações e traduções;
- manter grafias e termos consistentes;
- identificar imagens históricas e reconstruções editoriais.

A página **Metodologia**, acessível pelo menu, define fonte primária, tradição interpretativa,
correspondência hermética, reconstrução histórica, síntese editorial e conteúdo contemplativo.

Entre as referências digitais utilizadas estão Sefaria, The Ilanot Project, British Museum e outros acervos indicados nas próprias fichas.

## Tecnologias

- React 19
- Vite 6
- Canvas
- CSS responsivo
- Fontes locais Cinzel e Inter
- PWA com service worker
- Compressão Brotli e Gzip no build

## Desenvolvimento local

Requisitos:

- Node.js recente
- npm

Instale as dependências e inicie o ambiente:

```bash
npm install
npm run dev
```

O endereço local será informado pelo Vite.

## Comandos

```bash
# Ambiente de desenvolvimento
npm run dev

# Testes de integridade dos dados
npm run test

# Análise de código
npm run lint

# Build de produção
npm run build

# Pré-visualização do build
npm run preview

# Recalcular viewBox dos símbolos SVG
npm run optimize:svgs
```

## Validação dos dados

Os testes verificam, entre outros pontos:

- presença dos 72 anjos e distribuição de seis por signo;
- distribuição dos anjos entre os nove coros;
- dez Sephiroth, Daath e 22 caminhos;
- integridade dos relacionamentos internos;
- cálculos de gematria;
- URLs das fontes;
- existência dos recursos visuais locais;
- distinção editorial entre Sephirah e Sephiroth;
- formação dos 231 portais;
- preenchimento das novas camadas de pesquisa.

## Build e hospedagem

O build de produção:

- separa componentes maiores em partes carregadas sob demanda;
- hospeda as fontes localmente;
- gera arquivos Brotli (`.br`) e Gzip (`.gz`);
- inclui regras de cache para recursos versionados;
- gera o service worker usado pela versão instalável.

O provedor de hospedagem deve servir os arquivos pré-comprimidos quando o navegador enviar `Accept-Encoding: br` ou `gzip`. Plataformas que já fazem compressão automática podem ignorar os arquivos pré-gerados.

## Estrutura principal

```text
src/
├── components/       Interface, mapas, fichas, busca e modais
├── data/             Catálogo, correspondências e conteúdo editorial
├── hooks/            Comportamentos reutilizáveis de interface
└── utils/            Backup, coleções e compartilhamento

public/
├── assets/           Símbolos, imagens e cartas armazenadas localmente
└── sw.js             Service worker

tests/
└── data-integrity.test.mjs
```

## Observação

O conteúdo tem finalidade educacional e comparativa. Correspondências esotéricas variam conforme autor, período e tradição; por isso, as fontes e divergências devem ser consultadas nas fichas.
