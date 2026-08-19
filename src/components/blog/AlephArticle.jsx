const references = [
  ['Sefer Yetzirah, versão do Gra 2:2 — Aleph como sopro do ar mediador', 'https://www.sefaria.org/Sefer_Yetzirah_Gra_Version.2.2'],
  ['Sefer Yetzirah 2:6 — Aleph no Mundo, no Ano e na Pessoa', 'https://www.sefaria.org/Sefer_Yetzirah.2.6'],
  ['Gênesis 1:1 — texto hebraico e tradução', 'https://mechon-mamre.org/p/pt/pt0101.htm'],
  ['Unicode Consortium — bloco Hebrew, U+05D0 HEBREW LETTER ALEF', 'https://www.unicode.org/charts/PDF/U0590.pdf'],
  ['Gesenius — A Hebrew and English Lexicon of the Old Testament, verbete Aleph (Library of Congress)', 'https://www.loc.gov/resource/gdcmassbookdig.hebrewenglishlex00gese/'],
  ['Aleister Crowley — 777 Revised, tabelas de correspondências para Aleph, Ar e o Louco', 'https://hermetic.com/_media/93beast.fea.st/files/section1/777/liber_777_revised.pdf'],
  ['Zohar, Introdução 6–7 — a escolha de Bet e a função de Aleph', 'https://www.sefaria.org/Zohar%2C_Introduction.6.22'],
  ['Zohar, Bereshit 12 — Aleph como unidade entre alto e baixo', 'https://www.sefaria.org/Zohar%2C_Bereshit.12'],
  ['Tikkunei Zohar 20b — Aleph como Yod–Vav–Yod e valor 26', 'https://www.sefaria.org/Tikkunei_Zohar.20b'],
  ['Ohr Zarua, volume I, Alpha Beta 4 — permutação de אלף em פלא', 'https://www.sefaria.org/Ohr_Zarua%2C_Volume_I%2C_Alpha_Beta.4'],
  ['Ensinamento atribuído a Menachem Mendel de Rimanov sobre o Aleph de Anokhi', 'https://voices.sefaria.org/sheets/486431'],
  ['Frater Achad — Q.B.L., capítulo 3: Aleph, caminho 11 e Inteligência Cintilante', 'https://hermetic.com/achad/qbl/qbl-chapter-3'],
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

export default function AlephArticle({ post }) {
  return (
    <>
      <p className="article-lead">
        Aleph, א, ocupa a primeira posição do alfabeto hebraico e vale 1. No <i>Sefer Yetzirah</i>, é uma das três
        letras-mães e representa o sopro que equilibra a água de Mem e o fogo de Shin. A associação com o Louco e
        com o caminho entre Kether e Chokmah é uma construção posterior da Kabbalah Hermética — camadas que
        precisam ser distinguidas, não fundidas em uma única origem.
      </p>

      <section id="dados-essenciais">
        <h2 className="brand-font">Dados essenciais</h2>
        <ArticleTable
          headers={['Campo', 'Informação']}
          rows={[
            ['Letra', 'א'],
            ['Nome hebraico', 'אָלֶף'],
            ['Transliterações', 'Aleph, Alef'],
            ['Posição', '1ª letra'],
            ['Valor gemátrico', '1'],
            ['Som histórico', 'oclusiva glotal, convencionalmente transliterada ʾ'],
            ['Classe no Sefer Yetzirah', 'uma das três letras-mães: א מ ש'],
            ['Forma final', 'não possui'],
            ['Nome tradicional', 'associado a boi ou gado'],
          ]}
        />
        <p>Aleph não possui forma final; portanto, não deve aparecer acompanhada de um card de “forma final” em nenhuma ficha.</p>
      </section>

      <section id="letra-nome-som">
        <h2 className="brand-font">A letra, o nome e o som</h2>
        <p>Aleph é uma consoante, embora para muitos falantes modernos pareça silenciosa. Em reconstruções do hebraico antigo, costuma representar uma oclusão glotal — o breve fechamento da glote também percebido entre vogais em algumas línguas.</p>
        <p>No hebraico israelense contemporâneo, esse som frequentemente enfraquece na fala cotidiana, e Aleph passa a funcionar como suporte gráfico para uma vogal. Isso não significa que a letra “seja uma vogal”: sua realização fonética mudou, mas a escrita conserva distinções históricas.</p>
        <p>O nome pode ser transliterado como <b>Aleph</b> ou <b>Alef</b>. “Aleph” preserva uma grafia tradicional muito usada em estudos religiosos e esotéricos; “Alef” se aproxima da transliteração moderna simplificada.</p>
      </section>

      <section id="boi-forma-quadratica">
        <h2 className="brand-font">Do boi à forma quadrática</h2>
        <p>O nome da letra é tradicionalmente relacionado a uma palavra semítica para boi ou gado. A linhagem gráfica costuma ser descrita como a transformação de um sinal antigo semelhante a uma cabeça de boi, transmitido por alfabetos semíticos do noroeste, pelo fenício e pelo paleo-hebraico até formas aramaicas que contribuíram para a escrita hebraica quadrática.</p>
        <p>Essa história precisa de um cuidado importante: a forma moderna א não é um desenho secreto de um boi, nem cada traço preserva necessariamente uma doutrina espiritual antiga. A relação histórica entre nome, sinal e objeto não autoriza concluir que toda palavra iniciada por Aleph carregue “força bovina”, liderança ou poder — leituras desse tipo podem servir como imaginação contemplativa, mas devem ser identificadas como interpretações posteriores, não como resultados da linguística histórica.</p>
      </section>

      <section id="sefer-yetzirah">
        <h2 className="brand-font">Aleph no Sefer Yetzirah</h2>
        <p>O <i>Sefer Yetzirah</i> divide as 22 letras em três mães, sete duplas e doze simples. Aleph pertence ao primeiro grupo, junto de Mem e Shin. Na versão do Gra, Aleph é descrita como o sopro do ar que decide ou equilibra entre a água de Mem e o fogo de Shin, ocupando a posição mediadora.</p>
        <blockquote className="article-key-quote">Aleph não destrói os opostos: ela cria a condição na qual água e fogo podem integrar uma ordem.</blockquote>
        <p>Em outra passagem, o texto afirma que Aleph reina sobre o <i>ruach</i> e sela manifestações correspondentes no Mundo, no Ano e na Pessoa:</p>
        <div className="article-threefold">
          <article><span lang="he" dir="rtl">עולם</span><strong>Olam</strong><p>ar ou vento</p></article>
          <article><span lang="he" dir="rtl">שנה</span><strong>Shanah</strong><p>condição temperada ou intermediária</p></article>
          <article><span lang="he" dir="rtl">נפש</span><strong>Nefesh</strong><p>peito ou torso</p></article>
        </div>
        <p>Essa tríade pertence à cosmologia do <i>Sefer Yetzirah</i>. O texto não menciona o Tarot, o Louco ou a disposição moderna dos caminhos da Golden Dawn.</p>
      </section>

      <section id="ar-sopro-espirito">
        <h2 className="brand-font">Ar, sopro e espírito</h2>
        <p>A palavra hebraica <i>ruach</i> pode significar vento, sopro ou espírito conforme o contexto. Essa amplitude ajuda a explicar por que Aleph recebeu leituras tão ricas: o ar é invisível, mas percebido por seus efeitos; o sopro permite a voz; a respiração sustenta a vida.</p>
        <p>Ainda assim, os sentidos não devem ser fundidos automaticamente. Quando uma tradução traz “Espírito”, enfatiza uma dimensão teológica; quando traz “ar” ou “vento”, destaca a cosmologia elemental — a escolha da tradução já constitui uma interpretação. Na estrutura das três mães, Aleph é sobretudo a mediação entre os polos de água e fogo; a associação hermética posterior com o elemento Ar preserva parte dessa função, mas a integra a um sistema ocidental de quatro ou cinco elementos.</p>
      </section>

      <section id="gematria">
        <h2 className="brand-font">Gematria: 1 e 111</h2>
        <blockquote className="article-formula">א <span>=</span> 1</blockquote>
        <p>Quando o nome da letra é escrito por extenso, אלף, o resultado muda:</p>
        <ArticleTable headers={['Letra', 'Valor']} rows={[['א', '1'], ['ל', '30'], ['ף', '80'], ['Total', '111']]} />
        <blockquote className="article-formula">אלף <span>=</span> 1 + 30 + 80 <span>=</span> 111</blockquote>
        <p>Os valores 1 e 111 não são intercambiáveis: o primeiro é o valor da letra isolada; o segundo é o valor do nome <b>Aleph</b> escrito por extenso. Em leitura simbólica, 1 pode representar unidade, princípio ou singularidade; 111 pode ser visto como a expansão do ponto inicial pelo próprio nome da letra — uma interpretação gemátrica, não uma tradução lexical obrigatória.</p>
      </section>

      <section id="genesis">
        <h2 className="brand-font">Aleph na abertura do Gênesis</h2>
        <p>A primeira letra da Torá não é Aleph, mas Bet, em בְּרֵאשִׁית, <i>Bereshit</i>. Aleph, porém, aparece logo no primeiro versículo em palavras como אֱלֹהִים, <i>Elohim</i>, e na partícula אֵת, <i>et</i>:</p>
        <blockquote className="article-key-quote" lang="he" dir="rtl">בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ</blockquote>
        <p>O dado textual é simples: Aleph ocorre no versículo, mas não abre a Torá. Comentários posteriores construíram leituras simbólicas sobre a escolha de Bet como letra inicial; essas leituras pertencem à recepção do texto, não a uma explicação linguística demonstrável para sua redação.</p>
      </section>

      <section id="zohar-segredo">
        <h2 className="brand-font">O segredo de Aleph e Bet no Zohar</h2>
        <p>O <i>Zohar</i> narra as letras apresentando-se diante do Criador em ordem inversa, cada uma defendendo por que deveria iniciar a criação. Bet é escolhida por iniciar <i>berakhah</i>, “bênção”, e passa a abrir <i>Bereshit</i>. Aleph, ao contrário das demais, permanece fora e não reivindica a posição; quando é chamada, explica que viu as outras letras saírem sem obter o que pediam e que, depois da concessão feita a Bet, não seria correto retirar dela o presente.</p>
        <p>O texto responde a essa reserva conferindo a Aleph outra dignidade: embora o mundo seja criado com Bet, Aleph será a primeira das letras, dará início aos cálculos e representará a unidade.</p>
        <ul className="article-check-list">
          <li><b>ordem textual:</b> a Torá começa com Bet, não com Aleph;</li>
          <li><b>ordem numérica:</b> Aleph conserva o valor 1 e inicia a contagem;</li>
          <li><b>ordem ética e mística:</b> sua precedência é associada à discrição, porque não tenta tomar de Bet a função recebida.</li>
        </ul>
        <p>A leitura da atitude de Aleph como humildade é uma interpretação narrativa do <i>Zohar</i>; não é uma explicação linguística para a ordem do alfabeto, nem aparece dessa maneira no <i>Sefer Yetzirah</i>.</p>
      </section>

      <section id="unidade">
        <h2 className="brand-font">Unidade acima e abaixo</h2>
        <p>Em outra passagem, o <i>Zohar</i> descreve Aleph como princípio no qual dependem realidades superiores e inferiores. Apesar da multiplicidade de formas ou graus, a letra continua chamada “um”. O ponto superior é relacionado ao pensamento oculto; a barra intermediária, aos graus que se estendem a partir desse princípio; a estrutura completa, à ligação entre alto e baixo.</p>
        <ArticleTable
          headers={['Parte contemplada', 'Leitura cabalística possível']}
          rows={[
            ['ponto ou Yod superior', 'pensamento oculto, fonte ou realidade superior'],
            ['traço diagonal semelhante a Vav', 'canal, extensão e ligação'],
            ['ponto ou Yod inferior', 'realidade recebida, mundo inferior ou humanidade'],
            ['figura completa', 'unidade que mantém distintos e conectados o alto e o baixo'],
          ]}
        />
        <p>Essa não é uma descrição paleográfica da origem de א; é uma leitura mística da forma quadrática da letra, transformada em diagrama de relações. O símbolo não afirma que os dois níveis sejam idênticos — a diagonal mantém uma relação entre eles.</p>
      </section>

      <section id="yod-vav-yod">
        <h2 className="brand-font">Yod–Vav–Yod: a forma que vale 26</h2>
        <p>O <i>Tikkunei Zohar</i> apresenta explicitamente uma leitura de Aleph como composição de Yod superior (י = 10), Vav intermediário (ו = 6) e Yod inferior (י = 10):</p>
        <blockquote className="article-formula">י + ו + י <span>=</span> 10 + 6 + 10 <span>=</span> 26</blockquote>
        <p>Vinte e seis também é o valor do Tetragrammaton — יהוה = 10 + 5 + 6 + 5 = 26. Nessa leitura, a própria forma de Aleph contém uma alusão ao Nome divino: o ponto superior, o canal intermediário e o ponto inferior expressam uma unidade que se comunica entre níveis.</p>
        <ArticleTable
          headers={['Método', 'Resultado']}
          rows={[['Aleph isolada — א', '1'], ['nome por extenso — אלף', '111'], ['leitura gráfica Yod–Vav–Yod — יוי', '26']]}
        />
        <p>O valor 26 não é a gematria ordinária da letra א; é o resultado de uma decomposição mística de sua forma, documentada no <i>Tikkunei Zohar</i>.</p>
      </section>

      <section id="elef-ensino">
        <h2 className="brand-font">Aleph, Elef, ensino e maravilha</h2>
        <p>As consoantes אלף permitem uma rede de palavras e jogos interpretativos: <b>Aleph</b> (nome da letra), <b>elef</b> — אֶלֶף (mil), formas da raiz אלף (aprender, ensinar, habituar), <b>aluf</b> — אַלּוּף (chefe ou mestre) e <b>pele</b> — פֶּלֶא (maravilha, as mesmas três letras em outra ordem). O <i>Ohr Zarua</i> já explora a reversão de אלף para פלא, ligando Aleph ao que é maravilhoso ou oculto; textos chassídicos posteriores desenvolvem o mesmo jogo, no qual a sabedoria ainda não comunicada é <i>pele</i>, mistério, e ao tornar-se ensinamento aprendido aparece como <i>Aleph</i>.</p>
        <p>Essas relações não têm todas o mesmo estatuto: algumas pertencem à história lexical da raiz; outras são permutações homiléticas. Uma anagramação pode produzir uma meditação tradicionalmente importante sem provar que duas palavras compartilham uma única etimologia.</p>
        <blockquote className="article-key-quote">Aleph vale um, mas seu nome consonantal também pode ser lido como <i>elef</i>, mil: a unidade contém a possibilidade da multiplicidade sem deixar de ser unidade.</blockquote>
        <p>Essa frase é uma síntese contemplativa — o número 1.000 pertence à palavra <i>elef</i>, não ao valor gemátrico ordinário de א.</p>
      </section>

      <section id="anokhi-sinai">
        <h2 className="brand-font">O Aleph de Anokhi e o silêncio do Sinai</h2>
        <p>O primeiro termo dos Dez Mandamentos, אָנֹכִי, <i>Anokhi</i>, “Eu”, começa com Aleph. Uma tradição chassídica atribuída a Menachem Mendel de Rimanov ensina que, no Sinai, Israel teria ouvido diretamente apenas o Aleph de <i>Anokhi</i>: como Aleph pode ser quase inaudível, a revelação seria figurada como o limiar anterior à fala articulada — abertura para a palavra, não uma palavra comum.</p>
        <p>Essa interpretação é poderosa, mas tardia; deve ser apresentada como ensinamento chassídico, não como sentido literal de Êxodo nem como doutrina explicitamente formulada no <i>Sefer Yetzirah</i>. Em leitura contemplativa, o “silêncio de Aleph” não é ausência vazia: é a atenção necessária antes que a linguagem adquira forma.</p>
      </section>

      <section id="arvore-hermetica">
        <h2 className="brand-font">Da letra-mãe à Árvore hermética</h2>
        <p>Na Kabbalah Hermética consolidada pela Golden Dawn, as 22 letras foram distribuídas pelas 22 linhas de uma forma específica da Árvore da Vida. Aleph passou a corresponder ao caminho que une Kether (Coroa) a Chokmah (Sabedoria); como as dez sefirot são numeradas de 1 a 10, Aleph recebe o número de caminho 11, o primeiro caminho alfabético depois das dez sefirot.</p>
        <p>Essa distribuição não está desenhada no <i>Sefer Yetzirah</i>; pertence à história dos diagramas cabalísticos, da Cabala cristã e da sistematização ocultista moderna. Hermeticamente, a ligação entre Kether e Chokmah descreve a passagem do ponto mais abstrato da unidade para o primeiro impulso dinâmico da manifestação — Aleph, como ar móvel e mediador, torna-se uma imagem apropriada para esse começo que ainda não está fixado em forma.</p>
      </section>

      <section id="caminho-11">
        <h2 className="brand-font">Os segredos herméticos do caminho 11</h2>
        <p>Em sistemas derivados da Golden Dawn, o caminho de Aleph é chamado de <b>Inteligência Cintilante</b> — designação da tradição hermética dos “32 Caminhos da Sabedoria” aplicada ao diagrama da Árvore, que não deve ser atribuída sem qualificação ao corpo simples do <i>Sefer Yetzirah</i>. “Cintilante” sugere o primeiro lampejo depois da unidade de Kether: Chokmah é o impulso inicial da sabedoria, ainda anterior à análise e à forma de Binah.</p>
        <p>O encontro entre o número 0 do Louco e o valor 1 de Aleph produz um paradoxo tipicamente hermético — 0 como potencial não delimitado, 1 como primeiro ponto reconhecível, e a passagem simbólica do não manifestado ao primeiro sinal de manifestação. Essa fórmula é uma leitura ocultista, não aritmética histórica do alfabeto.</p>
        <p>As tabelas da Golden Dawn e de <i>Liber 777</i> também atribuem quatro cores a Aleph, uma para cada mundo cabalístico:</p>
        <ArticleTable
          headers={['Escala', 'Mundo', 'Cor atribuída a Aleph']}
          rows={[
            ['Rei', 'Atziluth', 'amarelo-claro brilhante'],
            ['Rainha', 'Briah', 'azul-celeste'],
            ['Príncipe', 'Yetzirah', 'verde-esmeralda azulado'],
            ['Princesa', 'Assiah', 'esmeralda salpicado de ouro'],
          ]}
        />
        <p>Essas cores não vêm do <i>Zohar</i> nem do <i>Sefer Yetzirah</i>: são parte de um sistema ritual moderno destinado a fazer uma mesma força aparecer em quatro graus de manifestação. As mesmas tabelas também aproximam Aleph de adaga ou leque, águia, boi e ser humano, topázio e calcedônia, gálbano e divindades do vento de culturas diferentes — método sincrético que documenta como o ocultismo moderno construiu sua linguagem ritual, sem demonstrar uma origem universal comum a essas tradições.</p>
      </section>

      <section id="aleph-louco">
        <h2 className="brand-font">Aleph e o Louco</h2>
        <p>A Golden Dawn associou Aleph ao Arcano 0, o Louco, e ao elemento Ar, reunindo três ideias: Aleph como primeira letra, Ar como movimento e abertura, e o Louco como potência ainda não delimitada por uma identidade estável. Essa associação é influente, mas posterior — o <i>Sefer Yetzirah</i> não conhecia o Tarot moderno e não afirma que Aleph seja uma carta.</p>
        <ArticleTable
          headers={['Sistema', 'Forma principal']}
          rows={[
            ['Sefer Yetzirah', 'Aleph como letra-mãe e sopro do ar entre água e fogo'],
            ['Golden Dawn', 'Aleph, Ar, caminho 11 e o Louco'],
            ['Rider–Waite–Smith', 'Arcano 0, viajante diante do limite, rosa, bastão e cão'],
            ['Thoth', 'Atu 0, energia expansiva, movimento espiral e símbolos de potencial criador'],
            ['Tarot de Marselha', 'Le Mat, viajante errante; em muitos exemplares tradicionais, sem número impresso'],
          ]}
        />
      </section>

      <section id="iconografia-louco">
        <h2 className="brand-font">Iconografia comparada do Louco</h2>
        <p><b>Tarot de Marselha:</b> Le Mat aparece em deslocamento, carregando um fardo ou bastão; um animal toca ou rasga sua roupa. A imagem enfatiza errância, marginalidade e movimento fora da ordem numerada — em muitos baralhos históricos, a carta não traz o zero impresso.</p>
        <p><b>Rider–Waite–Smith:</b> o Louco recebe explicitamente o número 0. A figura está próxima de um precipício, voltada para o alto, com bagagem, rosa e cão, tornando visível a tensão entre abertura confiante e falta de atenção ao limite.</p>
        <p><b>Thoth:</b> o Louco de Crowley e Frieda Harris é mais denso e espiralado, suspenso em um campo de energia com símbolos animais, vegetais e criativos — sugerindo potência vital anterior à organização, e não apenas uma viagem.</p>
        <p>As três imagens compartilham mobilidade e indeterminação, mas não contam exatamente a mesma história; a correspondência Aleph–Ar organiza a leitura hermética de RWS e Thoth com mais clareza do que explica historicamente o surgimento de Le Mat.</p>
      </section>

      <section id="o-que-varia">
        <h2 className="brand-font">O que realmente varia</h2>
        <p>Aleph permanece a primeira letra e conserva valor 1 nos sistemas considerados. Sua classificação como letra-mãe e sua relação com ar ou sopro pertencem ao <i>Sefer Yetzirah</i>. O que varia é a ampliação desse núcleo:</p>
        <ul className="article-check-list">
          <li>o caminho Kether–Chokmah depende do diagrama hermético adotado;</li>
          <li>o Louco depende da associação ocultista entre letras e Arcanos Maiores;</li>
          <li>o número 0 pertence à história moderna do Tarot e não aparece da mesma maneira em todos os baralhos;</li>
          <li>o valor 26 vem da decomposição mística Yod–Vav–Yod, não da gematria ordinária de א;</li>
          <li>humildade, silêncio no Sinai e unidade entre alto e baixo pertencem a textos e comentários judaicos de períodos distintos;</li>
          <li>as quatro cores, instrumentos, perfumes e divindades comparadas pertencem à sistematização da Golden Dawn e de <i>Liber 777</i>.</li>
        </ul>
        <blockquote className="article-key-quote">O núcleo antigo é Aleph como sopro mediador. O sistema hermético transforma esse núcleo em um caminho iniciático do indeterminado para o primeiro movimento da sabedoria.</blockquote>
      </section>

      <section id="linha-historica">
        <h2 className="brand-font">Linha histórica</h2>
        <div className="history-chain" aria-label="Linha histórica de Aleph">
          {['Alfabetos semíticos antigos', 'Hebraico bíblico', 'Sefer Yetzirah', 'Zohar e Tikkunei Zohar', 'Ensinamentos chassídicos', 'Cabala cristã e ocultismo europeu', 'Golden Dawn', 'Crowley e escolas posteriores'].map((stage, index) => <span key={stage}>{stage}{index < 7 && <i>→</i>}</span>)}
        </div>
        <p>O nome e a linhagem gráfica de Aleph são relacionados ao boi por alfabetos semíticos antigos; o hebraico bíblico já a usa como consoante de valor 1; o <i>Sefer Yetzirah</i> a classifica como letra-mãe; o <i>Zohar</i> e o <i>Tikkunei Zohar</i> a relacionam à unidade e à forma Yod–Vav–Yod; comentários chassídicos desenvolvem jogos como Aleph–<i>pele</i> e o silêncio no Sinai; a Cabala cristã e o ocultismo europeu comparam alfabetos, sefirot e astrologia; a Golden Dawn liga Aleph sistematicamente ao Ar, ao Louco e ao caminho 11; Crowley e escolas posteriores reinterpretam o conjunto por novas imagens e práticas.</p>
      </section>

      <section id="interpretacao-editorial">
        <h2 className="brand-font">Interpretação editorial do Hermetika</h2>
        <p>Aleph pode ser lida como o intervalo vivo entre opostos: não apenas o primeiro ponto de uma sequência, mas o espaço respirável no qual uma sequência se torna possível. Entre a expansão do fogo e a condensação da água, o ar não escolhe um extremo — ele circula. Entre Kether e Chokmah, a unidade deixa de ser apenas repouso e começa a mover-se; no Louco, esse movimento ainda não assumiu destino definitivo.</p>
        <p>Essa leitura reúne dados do <i>Sefer Yetzirah</i> e do sistema hermético, mas é uma síntese editorial contemporânea — não deve ser atribuída literalmente a uma única fonte antiga.</p>
      </section>

      <section id="pratica-contemplativa">
        <h2 className="brand-font">Prática contemplativa</h2>
        <div className="article-question-card">
          <span>Objetivo</span>
          <p>Observar como a respiração pode simbolizar mediação entre impulso e contenção.</p>
        </div>
        <ol className="article-pill-list" style={{ display: 'block' }}>
          <li>Sente-se de forma confortável, sem forçar a postura.</li>
          <li>Observe três ciclos naturais de respiração.</li>
          <li>Visualize א apenas como foco gráfico, sem tentar produzir visões ou efeitos extraordinários.</li>
          <li>Ao inspirar, reconheça uma força de expansão; ao expirar, reconheça uma força de recolhimento.</li>
          <li>No breve intervalo natural, pergunte: “O que pode unir estes dois movimentos sem apagar nenhum deles?”</li>
          <li>Registre uma frase no caderno.</li>
        </ol>
        <p><b>Duração sugerida:</b> 7 minutos. <b>Pergunta para reflexão:</b> em qual situação atual preciso mediar dois extremos, em vez de escolher imediatamente um deles?</p>
        <p>Esta é uma prática simbólica de atenção e registro. Não substitui orientação médica ou psicológica, não produz diagnóstico e não deve ser tratada como método profético.</p>
      </section>

      <section id="conclusao">
        <h2 className="brand-font">Conclusão</h2>
        <p>Aleph reúne camadas que precisam ser distinguidas para serem bem compreendidas. Linguisticamente, é a primeira consoante do alfabeto hebraico e vale 1; seu nome por extenso, אלף, vale 111; na leitura gráfica do <i>Tikkunei Zohar</i>, Yod–Vav–Yod vale 26. No <i>Sefer Yetzirah</i>, é uma das três mães e representa o sopro que equilibra água e fogo. O <i>Zohar</i> amplia a letra como imagem de unidade, discrição e ligação entre alto e baixo. Na Kabbalah Hermética, esse conjunto foi novamente reorganizado em torno do elemento Ar, do Louco, do caminho entre Kether e Chokmah e de correspondências rituais.</p>
        <p>Não existe contradição em estudar essas camadas juntas, desde que sua história seja identificada. Aleph não “sempre significou” tudo isso — ela se tornou o centro de um conjunto crescente de interpretações.</p>
        <blockquote className="article-final-question">Talvez sua imagem mais útil seja justamente essa: não uma resposta fixa, mas o primeiro sopro que permite à pergunta começar.</blockquote>
      </section>

      <section className="article-references" aria-labelledby="article-references-title">
        <span>Referências e leitura complementar</span>
        <h2 className="brand-font" id="article-references-title">Fontes consultáveis</h2>
        <ol>{references.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{label}</a></li>)}</ol>
        <p>Nota editorial: fontes primárias (Sefer Yetzirah, Zohar, Tikkunei Zohar, Gênesis), tradição chassídica e sistematização hermética (Golden Dawn, Crowley) designam camadas históricas diferentes e não devem ser lidas como uma única tradição contínua.</p>
      </section>

      <footer className="article-tags">
        <span>Categoria: <b>{post.category}</b></span>
        <div>{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </footer>
    </>
  );
}
