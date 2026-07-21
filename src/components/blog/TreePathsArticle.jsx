const references = [
  ['Sefer Yetzirah — texto hebraico e traduções', 'https://www.sefaria.org/Sefer_Yetzirah.1-6'],
  ['Sefer Yetzirah 1:1 — os 32 caminhos de sabedoria', 'https://www.sefaria.org/Sefer_Yetzirah.1.1'],
  ['The Ilanot Project — história dos diagramas cabalísticos', 'https://ilanot.haifa.ac.il/site/'],
];

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

export default function TreePathsArticle({ post }) {
  return (
    <>
      <p className="article-lead">
        A imagem moderna da Árvore da Vida, formada por dez sefirot conectadas por 22 caminhos,
        não surgiu pronta nos textos mais antigos da Cabala. O <i>Sefer Yetzirah</i> relaciona dez
        sefirot e 22 letras aos 32 caminhos da sabedoria, mas não apresenta claramente o conhecido
        diagrama hermético. A distribuição atual resultou de séculos de comentários, diagramas
        cabalísticos, Cabala cristã e sistematizações ocultistas.
      </p>

      <section id="imagem-eterna">
        <h2 className="brand-font">A imagem que parece eterna</h2>
        <p>Para muitos estudantes de Kabbalah Hermética, a Árvore da Vida é apresentada como um mapa antigo e praticamente imutável:</p>
        <ul className="article-check-list">
          <li>dez esferas e três pilares;</li>
          <li>22 caminhos;</li>
          <li>uma letra hebraica em cada caminho;</li>
          <li>uma carta do Tarot associada a cada letra;</li>
          <li>correspondências astrológicas, elementais e alquímicas.</li>
        </ul>
        <p>Essa estrutura é tão central no ocultismo moderno que pode parecer ter existido exatamente dessa forma desde o início da Cabala. Historicamente, porém, a situação é mais complexa.</p>
        <p>Os textos cabalísticos antigos falam sobre sefirot, letras, nomes divinos, emanação e criação, mas isso não significa que todos utilizassem o mesmo desenho ou uma única distribuição de caminhos.</p>
        <blockquote className="article-key-quote">Não. A Árvore da Vida nem sempre foi representada pelo mesmo diagrama de dez esferas e 22 caminhos que se tornou dominante na Kabbalah Hermética.</blockquote>
        <div className="article-numbered-callout">
          <span>Três estruturas a distinguir</span>
          <ol>
            <li>os 32 caminhos do <i>Sefer Yetzirah</i>;</li>
            <li>os diagramas cabalísticos das sefirot;</li>
            <li>os 22 caminhos da Árvore hermética moderna.</li>
          </ol>
        </div>
      </section>

      <section id="trinta-dois-caminhos">
        <h2 className="brand-font">Os 32 caminhos do Sefer Yetzirah</h2>
        <p>O <i>Sefer Yetzirah</i>, ou Livro da Formação, começa apresentando a criação por meio de 32 caminhos de sabedoria. Eles são compostos por dez <i>sefirot belimah</i> e 22 letras fundamentais, divididas em três mães, sete duplas e doze simples.</p>
        <blockquote className="article-formula">10 sefirot <span>+</span> 22 letras <span>=</span> 32 caminhos da sabedoria</blockquote>
        <p>Contudo, essa expressão não significa automaticamente dez círculos conectados por 22 linhas. No contexto do texto, os caminhos podem ser entendidos como princípios ou modalidades fundamentais da criação. As dez sefirot e as 22 letras constituem conjuntos complementares de sua cosmologia.</p>
        <p>As letras são forças linguísticas e formativas. As sefirot, nesse contexto antigo, possuem forte relação com número, medida, direção e estruturação do cosmos. A apresentação não corresponde diretamente ao sistema teosófico e gráfico desenvolvido posteriormente.</p>
      </section>

      <section id="livro-apresenta-arvore">
        <h2 className="brand-font">O livro apresenta uma Árvore da Vida?</h2>
        <p>O <i>Sefer Yetzirah</i> não oferece o conhecido desenho vertical com três pilares e 22 linhas determinadas. Ele apresenta relações numéricas, linguísticas e cosmológicas.</p>
        <p>Em uma de suas imagens mais importantes, as 22 letras aparecem dispostas como em um círculo, formando 231 combinações ou “portões” quando cada letra é ligada às demais. Essa imagem difere profundamente da Árvore hermética moderna.</p>
        <div className="article-math-card" aria-label="Cálculo dos 231 portões">
          <span>22 letras</span><b>22 × 21 ÷ 2</b><strong>= 231 portões</strong>
        </div>
        <p>O texto antigo já emprega imagens de ligação e combinação, mas não determina que cada letra deva ocupar uma das 22 linhas de um único diagrama sefirótico. A identidade entre “22 letras do alfabeto” e “22 linhas específicas ligando dez esferas” é uma interpretação posterior.</p>
      </section>

      <section id="sefirot">
        <h2 className="brand-font">O que são as sefirot?</h2>
        <p>A palavra <i>sefirah</i>, plural <i>sefirot</i>, recebeu diferentes interpretações ao longo da história da Cabala. No <i>Sefer Yetzirah</i>, as dez <i>sefirot belimah</i> aparecem associadas a número, dimensão, direção, medida e estrutura cósmica.</p>
        <p>Em sistemas posteriores, foram desenvolvidas como emanações, atributos ou modalidades pelas quais o infinito se revela e sustenta a criação. Mais tarde, estes nomes tornaram-se predominantes:</p>
        <ol className="article-sefirot-list">
          {['Kether', 'Chokmah', 'Binah', 'Chesed', 'Geburah', 'Tiphareth', 'Netzach', 'Hod', 'Yesod', 'Malkuth'].map((name, index) => <li key={name}><span>{index + 1}</span>{name}</li>)}
        </ol>
        <p>Possuir uma lista de dez sefirot não determina automaticamente como elas devem ser desenhadas ou conectadas. É possível organizar dez princípios de inúmeras maneiras. A forma do diagrama também é uma interpretação.</p>
      </section>

      <section id="outras-imagens">
        <h2 className="brand-font">Antes da Árvore, havia outras imagens</h2>
        <p>Os cabalistas empregaram diversas imagens para expressar as relações entre as sefirot:</p>
        <ul className="article-pill-list">
          <li>árvore</li><li>corpo humano</li><li>Adam Kadmon</li><li>luzes e recipientes</li><li>círculos concêntricos</li><li>linhas</li><li>palácios</li><li>nomes divinos</li><li>configurações antropomórficas</li>
        </ul>
        <p>A metáfora da árvore tornou-se especialmente importante porque representa raiz e manifestação, unidade e multiplicidade, fluxo descendente, retorno ascendente, relação entre níveis e crescimento orgânico.</p>
        <p>Contudo, nem toda referência cabalística a uma árvore implica o desenho moderno utilizado pela Golden Dawn. Um texto pode comparar as sefirot a galhos sem definir a posição exata de cada círculo e linha.</p>
      </section>

      <section id="primeiros-diagramas">
        <h2 className="brand-font">Os primeiros diagramas não eram iguais</h2>
        <p>Quando diagramas impressos das sefirot começaram a circular na Europa, não apresentavam uma única configuração. Alguns possuíam dez círculos, mas menos de 22 linhas; outros traziam distribuições, conexões, rodas, círculos concêntricos ou estruturas ligadas ao corpo de Adam Kadmon.</p>
        <p>Diagramas relacionados às obras de Johannes Reuchlin e Paolo Riccio possuíam dez esferas, mas apenas 17 conexões. Outros exemplos posteriores passaram a apresentar 21, 22 ou mais ligações, sem distribuição uniforme.</p>
        <div className="article-question-card"><span>O que isso demonstra?</span><p>A fórmula “dez esferas + exatamente 22 linhas” não era uma representação universal ou imutável.</p><p>A relação entre letras e caminhos ainda estava sendo construída.</p></div>
      </section>

      <section id="por-que-vinte-dois">
        <h2 className="brand-font">Por que justamente 22 caminhos?</h2>
        <p>A razão simbólica é clara: o alfabeto hebraico possui 22 letras. Se existem dez sefirot e 22 letras formando 32 caminhos, torna-se atraente representar as sefirot como círculos e as letras como linhas que as conectam.</p>
        <ArticleTable
          headers={['Estrutura', 'Representação']}
          rows={[
            ['Dez sefirot', 'Dez círculos'],
            ['22 letras', '22 linhas'],
            ['32 caminhos', 'Círculos e linhas juntos'],
          ]}
        />
        <p>Essa elegância simbólica não responde qual letra deve ligar quais duas sefirot. Existem muitas maneiras matematicamente possíveis de conectar dez pontos com 22 linhas. Mesmo depois de aceita a equivalência, ainda era necessário escolher a geometria.</p>
      </section>

      <section id="cordovero">
        <h2 className="brand-font">Moses Cordovero e a organização das sefirot</h2>
        <p>Moses Cordovero, um dos grandes sistematizadores da Cabala de Safed no século XVI, discutiu relações e caminhos entre as sefirot em obras como o <i>Pardes Rimonim</i>.</p>
        <p>Descrições atribuídas a diferentes obras e edições relacionadas a Cordovero nem sempre resultam na mesma configuração gráfica. Há registros de descrições envolvendo 22 ou 24 caminhos, dependendo das conexões contadas.</p>
        <p>Isso não significa que Cordovero estivesse simplesmente cometendo um erro. “Caminho” poderia designar fluxo, canal de influência, relação conceitual, conexão cosmológica ou percurso contemplativo. A contagem depende do que está sendo considerado um caminho.</p>
      </section>

      <section id="kircher">
        <h2 className="brand-font">A influência de Athanasius Kircher</h2>
        <p>No século XVII, o jesuíta Athanasius Kircher publicou no <i>Oedipus Aegyptiacus</i> um diagrama sefirótico que se tornaria extremamente influente no esoterismo ocidental.</p>
        <div className="correspondence-types">
          <article><span>10</span><h3>Esferas</h3><p>Organizadas em três colunas e acompanhadas por associações cosmológicas.</p></article>
          <article><span>22</span><h3>Caminhos</h3><p>Com letras hebraicas e características reconhecíveis por estudantes modernos.</p></article>
        </div>
        <p>Embora trabalhasse com fontes cabalísticas, seu projeto era profundamente sincrético: procurava harmonizar Cabala, cristianismo, filosofia antiga, hermetismo e conhecimentos de sua época.</p>
        <p>A versão de Kircher é frequentemente apontada como uma das principais ancestrais do diagrama adotado mais tarde pela Golden Dawn e por Aleister Crowley. A Árvore hermética é também resultado da Cabala cristã e do esoterismo europeu, não uma reprodução neutra de um diagrama judaico antigo.</p>
      </section>

      <section id="cabala-crista">
        <h2 className="brand-font">Cabala judaica e Cabala cristã</h2>
        <p>A Cabala cristã surgiu no Renascimento, quando pensadores cristãos passaram a estudar e reinterpretar fontes judaicas. Autores como Pico della Mirandola, Johannes Reuchlin e seus sucessores acreditavam que a Cabala poderia revelar verdades compatíveis com o cristianismo.</p>
        <p>Nesse processo, conceitos judaicos foram traduzidos para o latim, reorganizados, associados ao neoplatonismo, relacionados a nomes cristológicos e conectados ao hermetismo.</p>
        <p>A Árvore da Vida começou a funcionar não apenas como mapa de tradições judaicas, mas como estrutura universal da metafísica. Essa transformação preparou o caminho para seu uso posterior no ocultismo.</p>
      </section>

      <section id="golden-dawn">
        <h2 className="brand-font">A Golden Dawn e a consolidação dos 22 caminhos</h2>
        <p>No final do século XIX, a Ordem Hermética da Golden Dawn realizou uma das mais influentes sistematizações da Árvore. Vinculou cada caminho a letra hebraica, Arcano Maior, planeta, signo ou elemento, cor, experiência iniciática, símbolos, divindades e práticas de magia cerimonial.</p>
        <div className="article-role-grid">
          {['Mapa do universo', 'Mapa da consciência', 'Currículo iniciático', 'Chave do Tarot', 'Sistema astrológico', 'Índice de correspondências', 'Roteiro ritual'].map((role) => <span key={role}>{role}</span>)}
        </div>
        <p>A necessidade de coerência ritual ajudou a fixar uma distribuição específica das letras. A versão da Golden Dawn tornou-se tão influente que muitos autores passaram a tratá-la como “a” Árvore da Vida, ainda que seja uma construção particular do ocultismo moderno.</p>
      </section>

      <section id="numeracao">
        <h2 className="brand-font">Os caminhos são numerados de forma confusa</h2>
        <p>Na Kabbalah Hermética, é comum dizer que os caminhos possuem números de 11 a 32. Isso ocorre porque as dez sefirot são consideradas os caminhos de 1 a 10, enquanto as 22 letras ou linhas correspondem aos caminhos de 11 a 32.</p>
        <div className="dual-correspondence"><span><b>1–10</b><small>Sefirot</small></span><i>+</i><span><b>11–32</b><small>Letras e linhas</small></span><i>=</i><span><b>32</b><small>Caminhos</small></span></div>
        <p>Assim, o décimo primeiro caminho não é necessariamente a décima primeira linha desenhada: é o primeiro caminho alfabético depois das dez sefirot. Em obras herméticas, essa estrutura é combinada com os “32 Caminhos da Sabedoria”, que atribuem um tipo de inteligência a cada caminho e acrescentam outra camada interpretativa.</p>
      </section>

      <section id="tarot">
        <h2 className="brand-font">A relação com o Tarot também é posterior</h2>
        <p>O <i>Sefer Yetzirah</i> não menciona o Tarot. A associação entre 22 letras, 22 caminhos e 22 Arcanos Maiores foi desenvolvida no ocultismo europeu.</p>
        <p>A igualdade numérica torna a relação atraente, mas não demonstra origem histórica comum. Éliphas Lévi associou cartas e letras de uma maneira; a Golden Dawn adotou outra organização; Crowley manteve grande parte dela, mas reinterpretou atribuições.</p>
        <blockquote className="article-key-quote short">Os caminhos da Árvore hermética carregam também a história do Tarot ocultista.</blockquote>
      </section>

      <section id="arvores-judaicas">
        <h2 className="brand-font">Existe apenas uma Árvore da Vida na Cabala judaica?</h2>
        <p>Não. Mesmo dentro da tradição judaica existem diferentes diagramas, escolas e modos de representar as relações entre as sefirot.</p>
        <p>Na Cabala luriana, são fundamentais conceitos como <i>tzimtzum</i>, contração ou ocultação; <i>kav</i>, raio de luz; <i>igulim</i>, círculos; <i>yosher</i>, configuração linear ou antropomórfica; Adam Kadmon; <i>partzufim</i>; quebra dos recipientes; e <i>tikkun</i>, restauração.</p>
        <p>Uma árvore plana não representa completamente essa cosmologia. Diagramas cabalísticos chamados <i>ilanot</i>, plural de <i>ilan</i>, podiam ser longos, complexos e incluir múltiplas estruturas. A Árvore hermética é extremamente útil, mas constitui uma simplificação específica.</p>
      </section>

      <section id="daath">
        <h2 className="brand-font">E Daath?</h2>
        <p>Daath introduz outra dúvida: se existem dez sefirot, por que alguns diagramas mostram onze círculos?</p>
        <p>Daath significa conhecimento e aparece em determinadas interpretações como “não-sefirah”, posição funcional ou estado produzido pela relação entre princípios superiores. Na Kabbalah Hermética, costuma ser colocada no Abismo, entre a tríade superior e as sete sefirot inferiores, mas geralmente não é contada como décima primeira sefirah independente.</p>
        <div className="layer-note"><strong>Leitura simbólica</strong><p>Quando Daath é manifestada, Kether pode ser pensada como oculta; quando Kether é contada, Daath permanece como conhecimento implícito. A explicação varia conforme a escola.</p></div>
        <p>Sua presença mostra que a Árvore não deve ser lida como desenho material rígido. Ela é um mapa simbólico.</p>
      </section>

      <section id="falsos">
        <h2 className="brand-font">Então os 22 caminhos são falsos?</h2>
        <p>Não. Dizer que o diagrama moderno é uma construção histórica não significa considerá-lo inútil ou falso. Todo mapa é construído. Uma partitura musical também é uma construção, mas organiza sons e produz experiências significativas.</p>
        <p>Os 22 caminhos formam um sistema coerente na Kabbalah Hermética. Eles permitem organizar letras, relacionar astrologia e Tarot, estruturar meditações, comparar símbolos, descrever transformações da consciência e planejar um currículo iniciático.</p>
        <div className="article-question-card"><span>O problema começa quando se afirma que o sistema</span><p>aparece completo no <i>Sefer Yetzirah</i>;</p><p>foi utilizado por todos os cabalistas;</p><p>permaneceu inalterado durante milênios;</p><p>é a única forma legítima da Árvore.</p></div>
      </section>

      <section id="tres-niveis">
        <h2 className="brand-font">Três níveis de leitura</h2>
        <div className="study-layer-list">
          <article><span>01</span><div><h3>Nível histórico</h3><p><b>Quando este diagrama apareceu e quais autores contribuíram?</b> Distingue textos antigos, diagramas medievais, Cabala renascentista e ocultismo moderno.</p></div></article>
          <article><span>02</span><div><h3>Nível sistêmico</h3><p><b>Como as partes funcionam dentro da Kabbalah Hermética?</b> Observa a coerência entre letras, Tarot, astrologia e caminhos.</p></div></article>
          <article><span>03</span><div><h3>Nível contemplativo</h3><p><b>Que transformação este caminho simboliza?</b> Utiliza o diagrama como mapa da consciência e instrumento meditativo.</p></div></article>
        </div>
        <p>Os três níveis podem coexistir, desde que não sejam confundidos.</p>
      </section>

      <section id="mapa">
        <h2 className="brand-font">A Árvore como mapa, não como fotografia</h2>
        <p>A Árvore da Vida não deve ser tratada como uma fotografia literal do universo. Ela é um mapa simbólico. Todo mapa destaca relações e deixa outras de fora.</p>
        <ArticleTable
          headers={['Tipo de mapa', 'Relação destacada']}
          rows={[
            ['Político', 'Fronteiras'],
            ['Físico', 'Relevo'],
            ['Ferroviário', 'Conexões'],
            ['Climático', 'Temperaturas'],
            ['Árvore hermética', 'Caminhos entre centros simbólicos'],
          ]}
        />
        <p>Diferentes Árvores podem destacar emanação, criação, psicologia, linguagem, prática ritual, relações sefiróticas ou configurações divinas. A Árvore da Golden Dawn se parece especialmente com um mapa de transporte: enfatiza os caminhos que ligam centros simbólicos.</p>
      </section>

      <section id="conclusao">
        <h2 className="brand-font">Conclusão</h2>
        <p>A Árvore da Vida nem sempre teve a forma moderna de dez esferas conectadas por 22 caminhos. O <i>Sefer Yetzirah</i> apresenta dez sefirot e 22 letras como os 32 caminhos da sabedoria, mas não desenha necessariamente as letras como as linhas da Árvore hermética.</p>
        <div className="history-chain" aria-label="Desenvolvimento histórico simplificado">
          {['Sefer Yetzirah', 'Diagramas cabalísticos', 'Cabala cristã', 'Kircher', 'Golden Dawn', 'Kabbalah Hermética'].map((stage, index) => <span key={stage}>{stage}{index < 5 && <i>→</i>}</span>)}
        </div>
        <p>Ao longo dos séculos, cabalistas desenvolveram diferentes imagens das sefirot; surgiram diagramas com números variados de conexões; a Cabala cristã reorganizou símbolos; Kircher publicou uma estrutura influente; e a Golden Dawn integrou caminhos, Tarot, astrologia e iniciação.</p>
        <p>A Árvore moderna é simultaneamente herdeira de tradições cabalísticas, produto da transmissão histórica, síntese do esoterismo ocidental e ferramenta funcional da Kabbalah Hermética. Reconhecer sua história não diminui seu valor: permite utilizá-la com mais consciência.</p>
        <blockquote className="article-final-question">Em vez de perguntar apenas “esta é a verdadeira Árvore da Vida?”, pergunte: quem desenhou esta Árvore, quais relações ela pretende mostrar e para qual prática ela foi construída?</blockquote>
      </section>

      <section className="article-related" aria-labelledby="related-title">
        <span>Continue estudando</span>
        <h2 className="brand-font" id="related-title">Artigos relacionados</h2>
        <a href="/blog/letras-hebraicas-sefer-yetzirah-kabbalah-hermetica">Por que as letras hebraicas possuem associações diferentes?</a>
        <a href="/blog/quatro-arvores-da-vida-atziluth-briah-yetzirah-assiah">As quatro Árvores da Vida: Atziluth, Briah, Yetzirah e Assiah</a>
        <span className="article-related-upcoming">Em breve: O que são os 32 Caminhos da Sabedoria?</span>
        <span className="article-related-upcoming">Em breve: Por que os Arcanos Maiores foram associados às letras hebraicas?</span>
        <span className="article-related-upcoming">Em breve: Cabala, Kabbalah e Qabalah: qual é a diferença?</span>
      </section>

      <section className="article-references" aria-labelledby="tree-references-title">
        <span>Referências e leitura complementar</span>
        <h2 className="brand-font" id="tree-references-title">Fontes consultáveis</h2>
        <ol>{references.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{label}</a></li>)}</ol>
        <p>Nota editorial: o artigo distingue os 32 caminhos do texto antigo, os diagramas desenvolvidos em tradições judaicas e a configuração ritual consolidada pelo ocultismo moderno.</p>
      </section>

      <footer className="article-tags">
        <span>Categoria: <b>{post.category}</b></span>
        <div>{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </footer>
    </>
  );
}
