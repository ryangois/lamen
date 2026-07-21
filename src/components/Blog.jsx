import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { blogPosts, getBlogPost } from '../data/blogPosts';
import './Blog.css';

const TreePathsArticle = lazy(() => import('./blog/TreePathsArticle'));
const FourWorldsArticle = lazy(() => import('./blog/FourWorldsArticle'));

const references = [
  ['Sefer Yetzirah — texto hebraico e traduções', 'https://www.sefaria.org/Sefer_Yetzirah.1-6'],
  ['Sefer Yetzirah 2:1 — três mães, sete duplas e doze simples', 'https://www.sefaria.org/Sefer_Yetzirah.2.1'],
  ['The Ilanot Project — história dos diagramas cabalísticos', 'https://ilanot.haifa.ac.il/site/'],
  ['Liber 777 — tabelas de correspondências herméticas', 'https://keepsilence.org/the-equinox/777/table-of-correspondences_low.pdf'],
  ['The Book of Thoth — teoria do Tarot', 'https://hermetic.com/crowley/book-of-thoth/theory'],
  ['British Museum — conjunto histórico Rider–Waite–Smith', 'https://www.britishmuseum.org/collection/object/P_1982-U-4643-1-78'],
];

function ensureMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  const created = !element;
  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    document.head.appendChild(element);
  }
  return { element, created };
}

function useBlogSeo(post) {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.head.querySelector('meta[name="description"]');
    const previousDescription = description?.content;
    const title = post ? `${post.title} — Hermetika` : 'Blog — Hermetika';
    const summary = post?.description || 'Ensaios da Hermetika sobre Kabbalah, Tarot, letras hebraicas e história das correspondências.';
    const canonicalUrl = `${window.location.origin}${post ? `/blog/${post.slug}` : '/blog'}`;

    document.title = title;
    if (description) description.content = summary;

    const socialMeta = [
      ['meta[property="og:title"]', { property: 'og:title' }, title],
      ['meta[property="og:description"]', { property: 'og:description' }, summary],
      ['meta[property="og:type"]', { property: 'og:type' }, post ? 'article' : 'website'],
      ['meta[property="og:url"]', { property: 'og:url' }, canonicalUrl],
      ['meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary'],
    ];
    const socialRecords = socialMeta.map(([selector, attributes, value]) => {
      const record = ensureMeta(selector, attributes);
      const previousContent = record.element.getAttribute('content');
      record.element.setAttribute('content', value);
      return { ...record, previousContent };
    });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    const canonicalCreated = !canonical;
    const previousCanonical = canonical?.getAttribute('href');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let structuredData = document.getElementById('hermetika-blog-jsonld');
    if (structuredData) structuredData.remove();
    if (post) {
      structuredData = document.createElement('script');
      structuredData.id = 'hermetika-blog-jsonld';
      structuredData.type = 'application/ld+json';
      structuredData.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: { '@type': 'Organization', name: 'Hermetika' },
        publisher: { '@type': 'Organization', name: 'Hermetika' },
        mainEntityOfPage: canonicalUrl,
        keywords: post.tags.join(', '),
      });
      document.head.appendChild(structuredData);
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
      document.getElementById('hermetika-blog-jsonld')?.remove();
      socialRecords.forEach(({ element, created, previousContent }) => {
        if (created) element.remove();
        else if (previousContent) element.setAttribute('content', previousContent);
      });
      if (canonicalCreated) canonical.remove();
      else if (previousCanonical) canonical.href = previousCanonical;
    };
  }, [post]);
}

function BlogIndex({ onOpenPost }) {
  return (
    <section className="blog-index" aria-labelledby="blog-index-title">
      <header className="blog-index-hero">
        <div>
          <span>Biblioteca editorial</span>
          <h1 className="brand-font" id="blog-index-title">Blog Hermetika</h1>
          <p>Ensaios para separar fontes, tradições e interpretações sem perder a riqueza dos símbolos.</p>
        </div>
        <div className="blog-hero-sigil" aria-hidden="true">א</div>
      </header>

      <div className="blog-index-heading">
        <span>Publicações</span>
        <h2 className="brand-font">Artigos recentes</h2>
      </div>

      <div className="blog-post-grid">
        {blogPosts.map((post) => (
          <article className="blog-post-card" key={post.slug}>
            <div className="blog-card-letters" lang="he" dir="rtl" aria-hidden="true">
              {post.featuredLetters.map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}
            </div>
            <div className="blog-card-meta">
              <span>{post.category}</span>
              <small>{post.readingTime}</small>
            </div>
            <h2 className="brand-font">{post.title}</h2>
            <p>{post.excerpt}</p>
            <div className="blog-card-tags">
              {post.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <button type="button" onClick={() => onOpenPost(post.slug)}>
              Ler artigo <span aria-hidden="true">→</span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function ArticleTable({ headers, rows }) {
  return (
    <div className="article-table-wrap" tabIndex="0" role="region" aria-label="Tabela comparativa">
      <table>
        <thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('-')}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HebrewLettersArticle({ post }) {
  return (
    <>
      <p className="article-lead">
        As correspondências das letras hebraicas variam porque o <i>Sefer Yetzirah</i> e a
        Kabbalah Hermética pertencem a contextos históricos, religiosos e operativos diferentes.
        O primeiro apresenta uma cosmologia baseada nas letras, nos números e na criação; a segunda
        transformou esse material em um amplo sistema envolvendo Árvore da Vida, astrologia, Tarot,
        alquimia e magia cerimonial.
      </p>

      <section id="um-alfabeto">
        <h2 className="brand-font">Um mesmo alfabeto, diferentes mapas do universo</h2>
        <p>Quem começa a estudar as letras hebraicas pelo ocultismo ocidental logo encontra um problema: uma letra pode aparecer associada a um planeta, signo, elemento ou caminho da Árvore da Vida em determinada tabela, mas receber uma correspondência diferente em outro livro.</p>
        <p>Em alguns sistemas, Tav está ligada a Saturno; em outros, também representa a Terra. Shin corresponde ao fogo, mas pode ainda aparecer como símbolo do Espírito. Certas atribuições planetárias das sete letras duplas mudam entre versões e comentaristas do <i>Sefer Yetzirah</i>.</p>
        <p>Isso não acontece simplesmente porque alguém “errou” a tabela. As divergências existem porque aquilo que chamamos genericamente de Kabbalah reúne tradições diferentes, produzidas em épocas distintas e organizadas com finalidades igualmente distintas.</p>
        <div className="article-numbered-callout">
          <span>Três camadas iniciais</span>
          <ol>
            <li>o <i>Sefer Yetzirah</i>;</li>
            <li>a Cabala judaica e seus comentaristas;</li>
            <li>a Kabbalah ou Qabalah Hermética.</li>
          </ol>
        </div>
      </section>

      <section id="sefer-yetzirah">
        <h2 className="brand-font">O que é o Sefer Yetzirah?</h2>
        <p>O <i>Sefer Yetzirah</i>, ou Livro da Formação, é um dos textos fundamentais da antiga especulação mística judaica. Ele descreve a criação por meio de 32 caminhos de sabedoria, constituídos pelas dez sefirot e pelas 22 letras do alfabeto hebraico.</p>
        <ArticleTable
          headers={['Classe', 'Letras', 'Correspondência geral']}
          rows={[
            ['Três mães', 'א מ ש', 'princípios elementares'],
            ['Sete duplas', 'ב ג ד כ פ ר ת', 'planetas e estruturas setenárias'],
            ['Doze simples', 'ה ו ז ח ט י ל נ ס ע צ ק', 'signos do Zodíaco e estruturas duodenárias'],
          ]}
        />
        <p>Essa divisão é explicitamente encontrada nas versões tradicionais do texto. As letras não são tratadas apenas como sinais utilizados para escrever palavras: são apresentadas como potências formativas por meio das quais o cosmos é estruturado.</p>
        <div className="article-threefold">
          <article><span lang="he" dir="rtl">עולם</span><strong>Olam</strong><p>mundo ou espaço</p></article>
          <article><span lang="he" dir="rtl">שנה</span><strong>Shanah</strong><p>ano ou tempo</p></article>
          <article><span lang="he" dir="rtl">נפש</span><strong>Nefesh</strong><p>alma, pessoa ou organismo</p></article>
        </div>
        <p>Uma mesma letra pode, portanto, manifestar-se simultaneamente em uma região do universo, em um momento do ciclo temporal e em uma função do corpo humano.</p>
      </section>

      <section id="tres-maes">
        <h2 className="brand-font">As três letras-mães</h2>
        <p>As três mães — Aleph, Mem e Shin — formam uma estrutura de polaridade e equilíbrio.</p>
        <div className="mother-letter-grid">
          <article><b lang="he">א</b><div><span>Aleph</span><h3>Ar e mediação</h3><p>Representa o ar, o sopro ou o princípio mediador. Permanece entre a água de Mem e o fogo de Shin.</p></div></article>
          <article><b lang="he">מ</b><div><span>Mem</span><h3>Água</h3><p>Representa a profundidade, a passividade e o princípio de formação material.</p></div></article>
          <article><b lang="he">ש</b><div><span>Shin</span><h3>Fogo</h3><p>Representa atividade, calor e movimento ascendente.</p></div></article>
        </div>
        <div className="polarity-diagram" aria-label="Shin fogo, Aleph ar mediador, Mem água">
          <span><b>ש</b><small>Fogo</small></span><i>—</i><span className="center"><b>א</b><small>Ar</small></span><i>—</i><span><b>מ</b><small>Água</small></span>
        </div>
        <p>A lógica não é apenas a de três elementos isolados. Mem e Shin constituem polos opostos, enquanto Aleph atua como princípio reconciliador. Aleph não elimina os contrários: permite que coexistam dentro de uma ordem.</p>
      </section>

      <section id="sete-duplas">
        <h2 className="brand-font">As sete letras duplas</h2>
        <p>As letras ב ג ד כ פ ר ת são chamadas de duplas. O texto associa sua duplicidade a pares de qualidades; tradições linguísticas também observaram pronúncias distintas em parte desse grupo conforme a presença ou ausência de dagesh.</p>
        <p>No plano cosmológico, elas foram relacionadas aos sete planetas tradicionais, aos sete dias, às sete aberturas da cabeça e a pares de condições da existência.</p>
        <div className="planet-row" aria-label="Sete astros tradicionais">
          {['Saturno', 'Júpiter', 'Marte', 'Sol', 'Vênus', 'Mercúrio', 'Lua'].map((planet, index) => <span key={planet}><b>{index + 1}</b>{planet}</span>)}
        </div>
        <p>O problema aparece quando tentamos determinar qual planeta corresponde a cada letra. Nem todas as recensões e comentários apresentam a mesma ordem. Uma tabela baseada em Saadia Gaon pode divergir daquela baseada no texto do Gaon de Vilna ou em uma reconstrução ocultista posterior. O grupo permanece o mesmo, mas sua distribuição interna pode mudar.</p>
      </section>

      <section id="doze-simples">
        <h2 className="brand-font">As doze letras simples</h2>
        <p>As doze letras restantes são associadas aos doze signos do Zodíaco, aos doze meses e a determinadas atividades ou estruturas do organismo humano.</p>
        <blockquote className="article-formula">12 letras <span>→</span> 12 signos <span>→</span> 12 meses <span>→</span> 12 funções humanas</blockquote>
        <p>A relação entre os grupos é estável como princípio geral, mas a correspondência individual pode sofrer alterações conforme a edição utilizada. O texto não propõe simplesmente uma tabela astrológica: apresenta linguagem, tempo, corpo e cosmos como expressões de uma mesma arquitetura.</p>
      </section>

      <section id="versoes">
        <h2 className="brand-font">Não existe uma única versão do Sefer Yetzirah</h2>
        <p>Uma das principais causas das divergências é a própria transmissão do texto. O <i>Sefer Yetzirah</i> chegou até nós em diferentes famílias textuais:</p>
        <ul className="article-pill-list"><li>versão curta</li><li>versão longa</li><li>versão de Saadia</li><li>versão do Gra, o Gaon de Vilna</li></ul>
        <p>As diferenças incluem extensão, organização dos capítulos, redação de passagens e ordem de determinadas correspondências. Duas pessoas podem afirmar seguir o <i>Sefer Yetzirah</i> e, ainda assim, utilizar tabelas diferentes.</p>
        <div className="article-question-card"><span>Antes de comparar</span><p>Qual versão do texto está sendo utilizada?</p><p>A correspondência vem do texto ou do comentário de um autor posterior?</p></div>
      </section>

      <section id="arvore-da-vida">
        <h2 className="brand-font">O Sefer Yetzirah já possuía a Árvore da Vida?</h2>
        <p>Não da maneira como ela costuma aparecer nos livros herméticos modernos. O texto fala em dez sefirot e 22 letras, formando os 32 caminhos de sabedoria. Isso não significa que apresente explicitamente o conhecido diagrama com dez esferas ligadas por 22 linhas.</p>
        <p>A imagem moderna da Árvore da Vida foi desenvolvida por tradições cabalísticas posteriores e sua configuração não permaneceu absolutamente uniforme. A Kabbalah Hermética herdou uma forma específica e passou a considerar cada linha como um caminho correspondente a letra hebraica, Arcano Maior, princípio astrológico, experiência iniciática, cores, símbolos, divindades e instrumentos mágicos.</p>
        <blockquote className="article-key-quote">O Sefer Yetzirah fornece as dez sefirot e as 22 letras; a Kabbalah Hermética transforma essa estrutura em um mapa iniciático muito mais amplo.</blockquote>
      </section>

      <section id="kabbalah-hermetica">
        <h2 className="brand-font">O nascimento da Kabbalah Hermética</h2>
        <p>A Kabbalah Hermética foi formada pela combinação de Cabala judaica, Cabala cristã renascentista, hermetismo, neoplatonismo, astrologia, alquimia, Tarot e magia cerimonial. Seu objetivo não era apenas interpretar textos judaicos: ocultistas europeus procuravam construir uma linguagem universal do simbolismo.</p>
        <p>Uma letra hebraica passou a conectar um caminho entre duas sefirot, uma carta do Tarot, planeta ou signo, cor, arma mágica, divindade, perfume, experiência espiritual e etapa de iniciação. A letra deixava de ser somente um elemento da linguagem criadora e se tornava um núcleo de correspondências.</p>
      </section>

      <section id="golden-dawn">
        <h2 className="brand-font">A influência da Golden Dawn</h2>
        <p>A Ordem Hermética da Golden Dawn desempenhou papel decisivo na organização desse sistema. Não criou todas as associações do nada: recebeu materiais da Cabala cristã, do ocultismo francês, da astrologia, da alquimia e de interpretações anteriores das letras.</p>
        <p>Sua contribuição principal foi sistematizar essas camadas em um mapa ritual. Os dez centros representam as sefirot; os 22 caminhos são ligados às letras e aos Arcanos Maiores. Para o sistema funcionar, as correspondências precisavam ser coerentes entre si.</p>
        <div className="article-question-list">
          <p>Em qual caminho da Árvore a letra se encontra?</p><p>Qual Arcano expressa esse caminho?</p><p>Esse Arcano possui correspondência zodiacal, planetária ou elemental?</p><p>Como essa força será trabalhada ritualmente?</p>
        </div>
        <p>Quando as fontes antigas não ofereciam resposta única, os hermetistas escolhiam a distribuição que melhor preservava a coerência de seu próprio sistema.</p>
      </section>

      <section id="tav">
        <h2 className="brand-font">Por que Tav pode ser Saturno e Terra?</h2>
        <p>Tav é um bom exemplo de sobreposição. Como integrante das sete letras duplas, pode receber uma associação planetária — frequentemente Saturno em tabelas herméticas. Na estrutura da Golden Dawn, Tav também está associada ao caminho do Arcano XXI, O Universo ou O Mundo.</p>
        <div className="dual-correspondence"><span><b lang="he">ת</b><small>Tav</small></span><i>→</i><span><b>♄</b><small>Saturno</small></span><em>e</em><span><b>🜃</b><small>Terra</small></span></div>
        <p>Saturno representa limite, estrutura, condensação e fronteira da manifestação. A Terra representa o resultado material desse processo. Dentro da lógica hermética, as duas correspondências ocupam níveis diferentes de uma mesma cadeia simbólica; não precisam ser consideradas idênticas.</p>
      </section>

      <section id="shin">
        <h2 className="brand-font">Por que Shin pode ser fogo e Espírito?</h2>
        <p>Shin é uma das três letras-mães e, no <i>Sefer Yetzirah</i>, representa claramente o fogo. A magia cerimonial ocidental, porém, desenvolveu sistemas baseados em cinco elementos: fogo, água, ar, terra e Espírito.</p>
        <p>A divisão original das letras-mães não oferecia uma letra exclusiva para o Espírito nem outra para a Terra. Em determinados contextos, Shin continua representando fogo e recebe ainda o Espírito; Tav pode representar a Terra. São atribuições suplementares destinadas a integrar as letras ao sistema ritual dos cinco elementos.</p>
        <div className="layer-note"><strong>Camada antiga</strong><p>Shin como fogo pertence à estrutura das três mães.</p><strong>Expansão hermética</strong><p>Shin como Espírito integra a letra ao esquema ocidental dos cinco elementos.</p></div>
      </section>

      <section id="camadas">
        <h2 className="brand-font">A diferença entre correspondência textual e derivada</h2>
        <div className="correspondence-types">
          <article><span>01</span><h3>Correspondência textual</h3><p>Aparece diretamente em uma versão determinada do <i>Sefer Yetzirah</i> ou em outro texto tradicional.</p><b>Exemplo: Mem → água</b></article>
          <article><span>02</span><h3>Correspondência derivada</h3><p>É construída por interpretação, analogia ou integração com outro sistema.</p><b>Exemplo: Mem → O Enforcado → Geburah–Hod</b></article>
        </div>
        <p>A segunda associação não está necessariamente errada; pertence a uma camada histórica diferente. O erro ocorre quando uma correspondência hermética moderna é apresentada como se estivesse explicitamente escrita no texto antigo.</p>
      </section>

      <section id="tarot">
        <h2 className="brand-font">O caso do Tarot</h2>
        <p>A associação sistemática entre as 22 letras e os 22 Arcanos Maiores não pertence ao núcleo original do <i>Sefer Yetzirah</i>. Foi desenvolvida no ocultismo europeu e recebeu diferentes arranjos. Éliphas Lévi propôs uma estrutura; a Golden Dawn reorganizou e consolidou correspondências; Aleister Crowley manteve grande parte desse sistema, mas introduziu interpretações próprias.</p>
        <blockquote className="article-key-quote short">“Tzaddi não é a Estrela.”</blockquote>
        <p>No Livro de Thoth, Crowley modificou a relação entre O Imperador e A Estrela para preservar uma lógica particular de seu sistema thelêmico. Nem mesmo a Kabbalah Hermética é uniforme: Lévi, Golden Dawn, Crowley, Paul Foster Case, Dion Fortune e escolas contemporâneas recebem estruturas anteriores e também as reorganizam.</p>
      </section>

      <section id="linguagens">
        <h2 className="brand-font">As correspondências funcionam como linguagens</h2>
        <p>Dentro de uma língua, uma palavra possui sentido pelas relações que mantém com outras palavras. Algo semelhante ocorre com uma correspondência esotérica: uma letra recebe sentido por sua posição dentro de um conjunto.</p>
        <p>No <i>Sefer Yetzirah</i>, Aleph deve ser compreendida por sua relação com Mem, Shin, o ar, o equilíbrio, o mundo, o ano e a alma. Na Golden Dawn, também se relaciona ao caminho da Árvore, ao Louco, ao elemento ar, às cores e às práticas meditativas correspondentes.</p>
        <p>Mudar uma peça pode alterar todo o conjunto. Por isso, misturar tabelas de tradições diferentes sem compreender suas estruturas costuma gerar contradições.</p>
      </section>

      <section id="qual-sistema">
        <h2 className="brand-font">Qual sistema está correto?</h2>
        <p>A pergunta mais útil não é “qual tabela é a verdadeira?”, mas:</p>
        <ul className="article-check-list">
          <li>Qual é a fonte dessa atribuição?</li><li>A correspondência aparece no texto ou em um comentário?</li><li>Qual versão do <i>Sefer Yetzirah</i> está sendo utilizada?</li><li>O autor pertence à Cabala judaica, cristã ou hermética?</li><li>A tabela foi construída para história, meditação ou ritual?</li><li>O autor segue Golden Dawn, Crowley ou outro sistema?</li><li>As correspondências são coerentes dentro da tradição escolhida?</li>
        </ul>
        <p>Uma atribuição pode ser inadequada como descrição histórica do <i>Sefer Yetzirah</i>, mas coerente dentro de um ritual da Golden Dawn. O problema não é utilizar uma interpretação posterior; é não identificar que ela é posterior.</p>
      </section>

      <section id="metodo">
        <h2 className="brand-font">Como estudar sem se perder</h2>
        <p>Uma metodologia segura organiza as correspondências em camadas.</p>
        <div className="study-layer-list">
          <article><span>01</span><div><h3>O alfabeto</h3><p>Nome, forma, valor, pronúncia, função linguística e significado tradicional.</p></div></article>
          <article><span>02</span><div><h3>O Sefer Yetzirah</h3><p>Classe da letra, correspondência geral, Mundo, Ano, Alma e versão consultada.</p></div></article>
          <article><span>03</span><div><h3>A Cabala judaica posterior</h3><p>Comentários, interpretações meditativas, palavras bíblicas e desenvolvimentos sefiroticos.</p></div></article>
          <article><span>04</span><div><h3>A Kabbalah Hermética</h3><p>Caminho, Arcano, atribuição da Golden Dawn, cores, alquimia e uso ritual.</p></div></article>
          <article><span>05</span><div><h3>Sistemas autorais</h3><p>Alterações de Crowley, Paul Foster Case, Dion Fortune, Israel Regardie e autores contemporâneos.</p></div></article>
        </div>
      </section>

      <section id="comparacao">
        <h2 className="brand-font">Comparação resumida</h2>
        <ArticleTable
          headers={['Sefer Yetzirah', 'Kabbalah Hermética']}
          rows={[
            ['Texto místico judaico antigo', 'Sistema esotérico ocidental moderno'],
            ['Letras como forças formadoras', 'Letras como chaves de correspondências'],
            ['Mundo, Ano e Alma', 'Árvore, Tarot, astrologia, alquimia e ritual'],
            ['Três mães, sete duplas e doze simples', '22 letras distribuídas pelos caminhos'],
            ['Diferentes recensões manuscritas', 'Diferentes escolas ocultistas'],
            ['Ênfase cosmológica e contemplativa', 'Ênfase também mágica e iniciática'],
            ['Não apresenta o Tarot', 'Integra os 22 Arcanos Maiores'],
            ['Não apresenta necessariamente a Árvore moderna', 'Utiliza a Árvore como mapa central'],
          ]}
        />
      </section>

      <section id="conclusao">
        <h2 className="brand-font">Conclusão</h2>
        <p>As associações diferem porque atravessaram séculos de transmissão, comentário e reconstrução. O <i>Sefer Yetzirah</i> apresenta as letras como forças pelas quais a criação é formada. A Cabala judaica posterior desenvolveu novas interpretações; a Cabala cristã inseriu o material no pensamento renascentista; a Kabbalah Hermética reuniu letras, sefirot, astrologia, Tarot, alquimia e magia cerimonial em um sistema iniciático integrado.</p>
        <div className="history-chain" aria-label="Linha histórica simplificada">
          {['Sefer Yetzirah', 'Comentários judaicos', 'Cabala medieval', 'Cabala cristã', 'Ocultismo europeu', 'Golden Dawn', 'Thelema e escolas modernas'].map((stage, index) => <span key={stage}>{stage}{index < 6 && <i>→</i>}</span>)}
        </div>
        <p>Cada etapa preservou elementos anteriores, mas introduziu novas perguntas. No <i>Sefer Yetzirah</i>, a letra é potência da linguagem criadora. Na Kabbalah Hermética, ela também se torna porta para um caminho da Árvore, uma carta do Tarot, uma força astrológica e uma experiência iniciática.</p>
        <blockquote className="article-final-question">Quando duas tabelas divergem, pergunte: de qual tradição essa correspondência veio, em qual época foi organizada e para qual finalidade está sendo utilizada?</blockquote>
        <p>Essa pergunta transforma uma aparente contradição em oportunidade de compreender como os sistemas esotéricos foram construídos.</p>
      </section>

      <section className="article-references" aria-labelledby="article-references-title">
        <span>Referências e leitura complementar</span>
        <h2 className="brand-font" id="article-references-title">Fontes consultáveis</h2>
        <ol>{references.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{label}</a></li>)}</ol>
        <p>Nota editorial: “Sefer Yetzirah”, “Cabala judaica” e “Kabbalah Hermética” designam camadas históricas diferentes. As referências permitem conferir o texto e a proveniência das correspondências.</p>
      </section>

      <footer className="article-tags">
        <span>Categoria: <b>{post.category}</b></span>
        <div>{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </footer>
    </>
  );
}

function BlogArticle({ post, onBack }) {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [shareFeedback, setShareFeedback] = useState('');

  const handleScroll = () => {
    const element = scrollRef.current;
    if (!element) return;
    const maximum = element.scrollHeight - element.clientHeight;
    setProgress(maximum > 0 ? Math.min(100, (element.scrollTop / maximum) * 100) : 0);
  };

  const handleShare = async () => {
    const payload = { title: post.title, text: post.excerpt, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(payload);
      else await navigator.clipboard.writeText(window.location.href);
      setShareFeedback(navigator.share ? 'Compartilhado' : 'Link copiado');
      window.setTimeout(() => setShareFeedback(''), 1800);
    } catch (error) {
      if (error?.name !== 'AbortError') setShareFeedback('Não foi possível compartilhar');
    }
  };

  const articleComponents = {
    'arvore-da-vida-sempre-teve-22-caminhos': TreePathsArticle,
    'quatro-arvores-da-vida-atziluth-briah-yetzirah-assiah': FourWorldsArticle,
  };
  const ArticleContent = articleComponents[post.slug] || HebrewLettersArticle;

  return (
    <div className="blog-article-scroll" ref={scrollRef} onScroll={handleScroll}>
      <div className="reading-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      <article className="blog-article">
        <nav className="article-breadcrumbs" aria-label="Navegação estrutural">
          <button type="button" onClick={onBack}>Blog</button><span>›</span><span>{post.category}</span>
        </nav>

        <header className="article-header">
          <span className="article-category">{post.category}</span>
          <h1 className="brand-font">{post.title}</h1>
          <p>{post.description}</p>
          <div className="article-byline">
            <div><span className="article-author-mark" aria-hidden="true">א</span><span><b>Hermetika Editorial</b><small>20 de julho de 2026 · {post.readingTime}</small></span></div>
            <button type="button" onClick={handleShare} aria-label="Compartilhar artigo">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.2"/><circle cx="6" cy="12" r="2.2"/><circle cx="18" cy="19" r="2.2"/><path d="m8 11 7.8-4.7M8 13l7.8 4.7"/></svg>
              {shareFeedback || 'Compartilhar'}
            </button>
          </div>
        </header>

        <div className="article-layout">
          <aside className="article-toc">
            <span>Neste artigo</span>
            <ol>{post.sections.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ol>
          </aside>
          <div className="article-body">
            <Suspense fallback={<div className="article-loading">Preparando artigo…</div>}>
              <ArticleContent post={post} />
            </Suspense>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function Blog({ slug, onOpenPost, onBack }) {
  const post = useMemo(() => (slug ? getBlogPost(slug) : null), [slug]);
  useBlogSeo(post);

  if (slug && !post) {
    return (
      <section className="blog-not-found">
        <span>404</span><h1 className="brand-font">Artigo não encontrado</h1>
        <p>O endereço pode ter mudado ou o artigo ainda não foi publicado.</p>
        <button type="button" onClick={onBack}>Voltar ao Blog</button>
      </section>
    );
  }

  return (
    <div className="blog-view">
      {post ? <BlogArticle post={post} onBack={onBack} /> : <BlogIndex onOpenPost={onOpenPost} />}
    </div>
  );
}
