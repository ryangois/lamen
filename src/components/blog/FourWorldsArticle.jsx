const references = [
  ['The Ilanot Project — diagramas e cosmologias cabalísticas', 'https://ilanot.haifa.ac.il/site/'],
  ['Sefer Yetzirah — texto hebraico e traduções', 'https://www.sefaria.org/Sefer_Yetzirah.1-6'],
  ['Liber 777 — correspondências herméticas', 'https://keepsilence.org/the-equinox/777/table-of-correspondences_low.pdf'],
];

const worlds = [
  ['Atziluth', 'Emanação', 'essência e potência divina', 'fogo, Paus, Yod'],
  ['Briah', 'Criação', 'ideia e concepção', 'água, Copas, Heh'],
  ['Yetzirah', 'Formação', 'imagem, relação e estrutura', 'ar, Espadas, Vav'],
  ['Assiah', 'Ação', 'realização e manifestação', 'terra, Discos, Heh final'],
];

function ArticleTable({ headers, rows }) {
  return (
    <div className="article-table-wrap" tabIndex="0" role="region" aria-label="Tabela comparativa">
      <table>
        <thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row) => <tr key={row.join('-')}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function WorldHeader({ hebrew, transliterations, meaning }) {
  return (
    <div className="world-language-card">
      <strong lang="he" dir="rtl">{hebrew}</strong>
      <div><span>Transliterações</span><p>{transliterations}</p></div>
      <div><span>Significado</span><p>{meaning}</p></div>
    </div>
  );
}

function FourStageCards({ stages }) {
  return (
    <div className="four-stage-grid">
      {stages.map(([world, text], index) => (
        <article key={world}><span>0{index + 1}</span><h3>{world}</h3><p>{text}</p></article>
      ))}
    </div>
  );
}

export default function FourWorldsArticle({ post }) {
  return (
    <>
      <p className="article-lead">
        Na Kabbalah, a criação não é compreendida apenas como divisão entre mundo espiritual e
        material. Ela se manifesta através de quatro grandes níveis: Atziluth, o Mundo da Emanação;
        Briah, o Mundo da Criação; Yetzirah, o Mundo da Formação; e Assiah, o Mundo da Ação. Na
        Kabbalah Hermética, cada mundo pode ser representado por uma Árvore da Vida completa,
        formando um sistema de quarenta manifestações sefiróticas.
      </p>

      <section id="uma-ou-quatro">
        <h2 className="brand-font">Uma Árvore ou quatro Árvores?</h2>
        <p>A Árvore da Vida costuma ser apresentada como um único diagrama de dez sefirot. Em muitos sistemas cabalísticos e herméticos, porém, essa estrutura se manifesta em quatro níveis ou mundos:</p>
        <FourStageCards stages={[
          ['Atziluth', 'Emanação'], ['Briah', 'Criação'], ['Yetzirah', 'Formação'], ['Assiah', 'Ação'],
        ]} />
        <p>Os quatro mundos são conhecidos pela sigla ABYA, formada pelas letras iniciais de seus nomes. Não devem ser entendidos simplesmente como lugares físicos empilhados no espaço.</p>
        <p>São graus de manifestação, níveis de consciência e maneiras pelas quais uma realidade passa da unidade potencial à expressão concreta.</p>
        <blockquote className="article-key-quote">Uma realidade é emanada, concebida, formada e finalmente realizada.</blockquote>
        <div className="article-math-card"><span>4 mundos</span><b>× 10 sefirot</b><strong>= 40 manifestações</strong></div>
        <p>Isso não significa que existam quarenta sefirot absolutamente independentes. Cada sefirah manifesta-se de maneira diferente em cada nível.</p>
      </section>

      <section id="mundo">
        <h2 className="brand-font">O que significa “mundo”?</h2>
        <p>A palavra hebraica para mundo é <i>olam</i>. No contexto cabalístico, um mundo não é necessariamente planeta, dimensão espacial ou universo paralelo: representa um grau de revelação ou ocultação.</p>
        <p>Quanto mais elevado o mundo, mais evidente é sua dependência da unidade divina. Quanto mais baixo, maior parece ser a autonomia das criaturas. Essa autonomia é relativa.</p>
        <p>Mesmo Assiah depende continuamente dos níveis superiores. Contudo, no mundo da ação a realidade parece fragmentada, material e separada de sua origem. As tradições cabalísticas descrevem os mundos como etapas do fluxo criador, de Atziluth a Assiah.</p>
      </section>

      <section id="metafora">
        <h2 className="brand-font">Uma metáfora: da ideia à construção</h2>
        <p>Imagine a criação de uma casa. Antes de qualquer desenho, existe uma intenção fundamental: “quero construir um lugar para habitar”. Depois, a intenção se torna projeto mental; recebe forma, medidas, materiais e organização; finalmente, trabalhadores constroem a casa.</p>
        <ArticleTable headers={['Mundo', 'Processo']} rows={[
          ['Atziluth', 'intenção ou princípio essencial'],
          ['Briah', 'concepção da ideia'],
          ['Yetzirah', 'formação do projeto'],
          ['Assiah', 'execução concreta'],
        ]} />
        <p>A analogia não é perfeita, mas mostra que os quatro mundos não são objetos separados. São etapas de uma única manifestação.</p>
      </section>

      <section id="atziluth">
        <h2 className="brand-font">Atziluth: o Mundo da Emanação</h2>
        <WorldHeader hebrew="אֲצִילוּת" transliterations="Atziluth, Atzilut, Atzilus" meaning="Emanação, proximidade ou nobreza" />
        <p>Atziluth é o mais elevado dos quatro mundos. Nele, a realidade ainda não se apresenta como criação plenamente separada de sua fonte: é o domínio da unidade divina e das potências arquetípicas.</p>
        <p>A palavra relaciona-se à emanação: algo procede de sua fonte sem tornar-se completamente exterior a ela. Uma metáfora tradicional é a relação entre o Sol, sua luz e o brilho que dele procede.</p>
        <p>Em Atziluth, as sefirot são compreendidas como modos da manifestação divina, não como criaturas independentes. Fontes cabalísticas e chassídicas distinguem essa unidade dos mundos criados inferiores.</p>
        <div className="layer-note"><strong>Atziluth na Kabbalah Hermética</strong><p>Fogo, espírito ou essência, arquétipos, vontade, nomes divinos, Paus, Yod e o nível mais elevado da manifestação.</p></div>
        <p>Essas correspondências pertencem à construção do esoterismo ocidental e não devem ser confundidas com todas as escolas judaicas. Atziluth não é a chama física, mas o princípio do fogo; não é uma decisão particular, mas a potência da vontade.</p>
      </section>

      <section id="briah">
        <h2 className="brand-font">Briah: o Mundo da Criação</h2>
        <WorldHeader hebrew="בְּרִיאָה" transliterations="Briah, Beriah, B’riah" meaning="Criação" />
        <p>Briah é o mundo no qual surge a primeira condição de alteridade ou existência criada. Se Atziluth é emanação divina, Briah é o nível em que a criação começa a ser concebida como algo distinto.</p>
        <p>Ainda é extremamente sutil. Não trata de formas materiais ou imagens detalhadas, mas de ideia essencial, conceito e estrutura inteligível. Alguns hermetistas o chamam de mundo arquetípico; outros reservam “arquetípico” para Atziluth, mostrando a importância de identificar a escola.</p>
        <div className="article-question-card"><span>Briah como consciência</span><p>Atziluth: impulso de comunicar.</p><p>Briah: ideia do que precisa ser comunicado.</p><p>Yetzirah: escolha das palavras.</p><p>Assiah: fala ou texto produzido.</p></div>
        <p>Na tradição hermética, Briah costuma ser associado a água, receptividade, criação intelectual, Arcanjos, Copas, primeira Heh do Tetragrammaton e ao nível da alma chamado Neshamah.</p>
      </section>

      <section id="yetzirah">
        <h2 className="brand-font">Yetzirah: o Mundo da Formação</h2>
        <WorldHeader hebrew="יְצִירָה" transliterations="Yetzirah, Yetsirah" meaning="Formação" />
        <p>Yetzirah é o mundo no qual a criação recebe forma definida. Em Briah existe a ideia; em Yetzirah aparecem organização, imagem, estrutura, proporção, relação, emoção e diferenciação.</p>
        <p>É importante não confundir o mundo de Yetzirah com o livro <i>Sefer Yetzirah</i>. O título significa Livro da Formação, mas o desenvolvimento sistemático dos quatro mundos pertence a camadas posteriores.</p>
        <p>Yetzirah é frequentemente relacionado ao mundo angélico. Em certas apresentações, o fluxo criador passa por ele e por suas ordens angélicas antes de alcançar Assiah.</p>
        <div className="layer-note"><strong>Yetzirah na Kabbalah Hermética</strong><p>Ar, pensamento formativo, linguagem, imagens, emoções, anjos, plano astral, Espadas, Vav e Ruach.</p></div>
        <p>Um ritual visualizado, símbolo imaginado, emoção estruturada ou forma-pensamento pode ser analisado como fenômeno de Yetzirah. Por isso ele ocupa posição central na magia cerimonial, como interface entre princípios superiores, consciência humana e manifestação concreta.</p>
      </section>

      <section id="assiah">
        <h2 className="brand-font">Assiah: o Mundo da Ação</h2>
        <WorldHeader hebrew="עֲשִׂיָּה" transliterations="Assiah, Asiyah" meaning="Ação ou realização" />
        <p>Assiah é o mundo no qual a criação alcança ação e manifestação concreta. Inclui o mundo físico, mas algumas interpretações distinguem uma dimensão espiritual de Assiah e o nível material mais denso.</p>
        <p>É o domínio da execução. Uma ideia só se torna plenamente atuante quando encontra corpo, gesto, palavra pronunciada, objeto, comportamento, acontecimento e consequência.</p>
        <div className="layer-note"><strong>Assiah na Kabbalah Hermética</strong><p>Terra, matéria, ação, corpos celestes e elementos, Ouros ou Discos, Heh final, Nephesh, experiência sensorial e resultado concreto.</p></div>
        <p>Se Atziluth é a vontade, Assiah é aquilo que efetivamente foi feito. Uma operação não se completa apenas porque foi idealizada ou visualizada: precisa produzir integração ou manifestação na vida.</p>
      </section>

      <section id="tabela">
        <h2 className="brand-font">Os quatro mundos em uma tabela</h2>
        <ArticleTable headers={['Mundo', 'Tradução', 'Função geral', 'Correspondência hermética comum']} rows={worlds} />
        <p>A tabela apresenta correspondências herméticas comuns. Não deve ser utilizada como se todas essas associações aparecessem juntas em um único texto judaico antigo.</p>
        <p>A teoria dos quatro mundos possui raízes cabalísticas; sua integração sistemática com Tarot, elementos e Tetragrammaton foi ampliada pelo esoterismo ocidental.</p>
      </section>

      <section id="tetragrammaton">
        <h2 className="brand-font">O Tetragrammaton e os quatro mundos</h2>
        <p>Na Kabbalah Hermética, os quatro mundos são frequentemente relacionados às letras do nome divino YHWH:</p>
        <div className="tetragrammaton-grid">
          <article><b lang="he">י</b><span>Yod</span><strong>Atziluth</strong><p>Ponto, semente e potência concentrada.</p></article>
          <article><b lang="he">ה</b><span>Heh</span><strong>Briah</strong><p>Expansão, receptividade e desenvolvimento.</p></article>
          <article><b lang="he">ו</b><span>Vav</span><strong>Yetzirah</strong><p>Gancho, conexão, organização e transmissão.</p></article>
          <article><b lang="he">ה</b><span>Heh final</span><strong>Assiah</strong><p>Manifestação do processo em nível concreto.</p></article>
        </div>
        <blockquote className="article-formula">ponto <span>→</span> expansão <span>→</span> formação <span>→</span> manifestação</blockquote>
      </section>

      <section id="quatro-arvores">
        <h2 className="brand-font">As quatro Árvores completas</h2>
        <p>Em vez de colocar apenas um mundo em cada grupo de sefirot, determinados sistemas imaginam uma Árvore completa em cada mundo. Existe Kether de Atziluth, Kether de Briah, Kether de Yetzirah e Kether de Assiah; o mesmo ocorre com todas as outras sefirot.</p>
        <div className="article-role-grid">{['4 Kethers', '4 Chokmahs', '4 Binahs', '4 Cheseds', '4 Geburahs', '4 Tiphareths', '4 Netzachs', '4 Hods', '4 Yesods', '4 Malkuths'].map((item) => <span key={item}>{item}</span>)}</div>
        <p>Não são quarenta princípios sem relação, mas dez princípios manifestando-se em quatro níveis.</p>
      </section>

      <section id="geburah">
        <h2 className="brand-font">Um exemplo: Geburah nos quatro mundos</h2>
        <p>Geburah representa força, rigor, limitação, julgamento e capacidade de cortar. Essa força aparece de modo diferente em cada mundo.</p>
        <FourStageCards stages={[
          ['Geburah de Atziluth', 'Princípio divino da força e da limitação; potência arquetípica que estabelece fronteiras.'],
          ['Geburah de Briah', 'Concepção do julgamento: critérios, decisões e distinções fundamentais.'],
          ['Geburah de Yetzirah', 'Forma emocional, imaginal ou psíquica: coragem, ira, disciplina, conflito ou defesa.'],
          ['Geburah de Assiah', 'Ação concreta: cortar, interromper, dizer não, defender-se, impor limite ou aplicar regra.'],
        ]} />
        <p>A mesma sefirah atravessa quatro graus de manifestação.</p>
      </section>

      <section id="tiphareth">
        <h2 className="brand-font">Outro exemplo: Tiphareth nos quatro mundos</h2>
        <p>Tiphareth está relacionada à beleza, harmonia, centro e integração.</p>
        <FourStageCards stages={[
          ['Tiphareth de Atziluth', 'Princípio da harmonia divina.'],
          ['Tiphareth de Briah', 'Compreensão do centro e da identidade essencial.'],
          ['Tiphareth de Yetzirah', 'Imagem interior do Self, do herói, do Sol ou do centro psíquico.'],
          ['Tiphareth de Assiah', 'Expressão concreta de equilíbrio, dignidade, coerência e propósito.'],
        ]} />
        <p>Não basta dizer que alguém “está em Tiphareth”. É preciso perguntar em qual mundo a experiência ocorre. Uma pessoa pode compreender intelectualmente o princípio sem expressá-lo no comportamento diário.</p>
      </section>

      <section id="conexoes">
        <h2 className="brand-font">Como as quatro Árvores se conectam?</h2>
        <p>Um modelo hermético conhecido coloca as quatro Árvores em sequência:</p>
        <div className="world-chain" aria-label="Encadeamento das quatro Árvores">
          <span>Malkuth de Atziluth <i>→</i> Kether de Briah</span>
          <span>Malkuth de Briah <i>→</i> Kether de Yetzirah</span>
          <span>Malkuth de Yetzirah <i>→</i> Kether de Assiah</span>
        </div>
        <p>O ponto mais baixo de um mundo torna-se origem do seguinte. Aquilo que é conclusão em um nível pode funcionar como princípio no nível abaixo. Uma concepção elevada em Briah pode ser apenas a semente inicial do trabalho formativo em Yetzirah.</p>
      </section>

      <section id="sobrepostas">
        <h2 className="brand-font">As quatro Árvores sobrepostas</h2>
        <p>Outro método não coloca as Árvores em longa cadeia, mas as sobrepõe. Cada sefirah contém aspectos atzilútico, briático, yetzirático e assiático.</p>
        <p>Essa abordagem mostra que os mundos não estão simplesmente “um em cima do outro”: coexistem em toda experiência. Ao escrever um texto, existe intenção, ideia, forma linguística e texto material. Os quatro mundos estão presentes no mesmo ato.</p>
      </section>

      <section id="ser-humano">
        <h2 className="brand-font">Os quatro mundos e o ser humano</h2>
        <ArticleTable headers={['Mundo', 'Aspecto humano']} rows={[
          ['Atziluth', 'essência espiritual e vontade'],
          ['Briah', 'consciência superior e compreensão'],
          ['Yetzirah', 'mente, emoção e imaginação'],
          ['Assiah', 'corpo, sentidos e ação'],
        ]} />
        <p>As relações variam conforme a escola e não são equivalências absolutamente fixas. Ainda assim, mostram que o ser humano não opera apenas racionalmente: uma ação pode nascer de vontade profunda, ideia, emoção ou hábito corporal. O trabalho iniciático busca alinhar esses níveis.</p>
      </section>

      <section id="oracao">
        <h2 className="brand-font">Os quatro mundos e a oração</h2>
        <p>Em algumas tradições judaicas, etapas da oração são compreendidas como ascensão através dos mundos. O praticante parte da consciência ligada à ação, atravessa formação e criação e aproxima-se da unidade relacionada a Atziluth. Depois, retorna à vida cotidiana.</p>
        <p>A ascensão não termina em fuga do mundo. Sua finalidade é trazer a consciência transformada de volta à ação.</p>
        <blockquote className="article-key-quote short">Subir a Árvore sem retornar a Malkuth deixa a obra incompleta.</blockquote>
      </section>

      <section id="magia">
        <h2 className="brand-font">Os quatro mundos e a magia</h2>
        <p>Na magia cerimonial, os mundos ajudam a compreender por que nem toda intenção se manifesta. Uma operação pode falhar em diferentes níveis:</p>
        <div className="study-layer-list">
          <article><span>01</span><div><h3>Falha em Atziluth</h3><p>A vontade está dividida ou não foi verdadeiramente definida; as motivações são contraditórias.</p></div></article>
          <article><span>02</span><div><h3>Falha em Briah</h3><p>A ideia é confusa; falta compreensão do objetivo ou de suas consequências.</p></div></article>
          <article><span>03</span><div><h3>Falha em Yetzirah</h3><p>Imagens, emoções e símbolos estão desorganizados; há ansiedade ou fantasia dispersa.</p></div></article>
          <article><span>04</span><div><h3>Falha em Assiah</h3><p>Não existe ação concreta; há rituais e visualizações, mas hábitos e decisões não mudam.</p></div></article>
        </div>
        <p>Essa análise impede que a magia seja reduzida a desejar algo intensamente. A manifestação exige coerência entre os quatro mundos.</p>
      </section>

      <section id="carreira">
        <h2 className="brand-font">Um exemplo prático: mudar de carreira</h2>
        <FourStageCards stages={[
          ['Atziluth', 'Reconhecer a vontade essencial de construir uma vida profissional coerente com capacidades e valores.'],
          ['Briah', 'Compreender área desejada, competências, riscos, objetivos e identidade profissional.'],
          ['Yetzirah', 'Formar plano de estudos, currículo, portfólio, contatos, cronograma e preparação emocional.'],
          ['Assiah', 'Estudar, candidatar-se, construir projetos, participar de entrevistas e reorganizar a rotina.'],
        ]} />
        <p>Sem Atziluth, a mudança perde propósito. Sem Briah, falta direção. Sem Yetzirah, falta organização. Sem Assiah, nada acontece.</p>
      </section>

      <section id="escala-moral">
        <h2 className="brand-font">Os quatro mundos não são uma escala moral</h2>
        <p>É inadequado supor que Atziluth seja “bom” e Assiah inferior ou ruim. Assiah não é um erro: a ação é a finalidade da manifestação. Uma ideia que nunca encontra corpo permanece incompleta.</p>
        <p>O problema não é estar em Assiah, mas acreditar que ele existe isoladamente de sua origem. Permanecer somente em estados espirituais elevados também pode tornar-se fuga.</p>
        <blockquote className="article-final-question">A luz deve chegar ao mundo da ação. Malkuth não é apenas uma prisão da qual escapar; é onde a Obra se torna verificável.</blockquote>
      </section>

      <section id="separados">
        <h2 className="brand-font">Os mundos estão separados?</h2>
        <p>Os mundos são distinguíveis, mas não completamente separados. Cada nível recebe influência do anterior e transmite algo ao seguinte; cada mundo pode conter reflexos dos demais.</p>
        <p>Em Assiah existe dimensão atzilútica como propósito, briática como ideia, yetzirática como organização e propriamente assiática como ação.</p>
        <ul className="article-pill-list"><li>uma escada</li><li>quatro camadas</li><li>quatro estados</li><li>graus de densidade</li><li>perspectivas da mesma realidade</li></ul>
        <p>Nenhuma imagem, sozinha, esgota o conceito.</p>
      </section>

      <section id="adam-kadmon">
        <h2 className="brand-font">Adam Kadmon é um quinto mundo?</h2>
        <p>Alguns sistemas falam em um nível anterior aos quatro mundos chamado Adam Kadmon, o Homem Primordial. Ele não deve ser confundido com o personagem bíblico Adão entendido literalmente.</p>
        <p>Adam Kadmon representa uma configuração primordial da manifestação, anterior ou superior a Atziluth em determinadas apresentações da Cabala luriana.</p>
        <div className="history-chain">{['Adam Kadmon', 'Atziluth', 'Briah', 'Yetzirah', 'Assiah'].map((stage, index) => <span key={stage}>{stage}{index < 4 && <i>→</i>}</span>)}</div>
        <p>Outros sistemas não o tratam como quinto mundo equivalente, mas como realidade primordial que precede os demais. A diferença mostra que os quatro mundos são centrais, porém não são o único modo cabalístico de descrever a manifestação.</p>
      </section>

      <section id="naipes">
        <h2 className="brand-font">As quatro Árvores e os naipes do Tarot</h2>
        <ArticleTable headers={['Mundo', 'Naipe']} rows={[
          ['Atziluth', 'Paus'], ['Briah', 'Copas'], ['Yetzirah', 'Espadas'], ['Assiah', 'Ouros ou Discos'],
        ]} />
        <p>Na Golden Dawn e em sistemas derivados, cada carta numerada pode ser lida como manifestação de uma sefirah em um mundo:</p>
        <ul className="article-check-list"><li>Ás de Paus: Kether em Atziluth;</li><li>Dois de Copas: Chokmah em Briah;</li><li>Três de Espadas: Binah em Yetzirah;</li><li>Dez de Discos: Malkuth em Assiah.</li></ul>
        <p>Essa organização é uma criação sofisticada da tradição hermética. Não deve ser projetada retroativamente sobre textos cabalísticos que não conheciam o Tarot moderno.</p>
      </section>

      <section id="corte">
        <h2 className="brand-font">As cartas da corte</h2>
        <ArticleTable headers={['Figura', 'Letra', 'Mundo']} rows={[
          ['Cavaleiro ou Rei', 'Yod', 'Atziluth'],
          ['Rainha', 'Heh', 'Briah'],
          ['Príncipe ou Cavaleiro', 'Vav', 'Yetzirah'],
          ['Princesa ou Pajem', 'Heh final', 'Assiah'],
        ]} />
        <p>Os títulos mudam entre baralhos. O Thoth usa Cavaleiro, Rainha, Príncipe e Princesa; o Rider–Waite–Smith usa Rei, Rainha, Cavaleiro e Pajem. É mais seguro compreender primeiro Yod–Heh–Vav–Heh do que memorizar títulos isolados.</p>
      </section>

      <section id="estudo">
        <h2 className="brand-font">Como utilizar os quatro mundos no estudo</h2>
        <p>Ao estudar qualquer símbolo, faça quatro perguntas:</p>
        <FourStageCards stages={[
          ['Atziluth', 'Qual é a essência ou vontade deste símbolo?'],
          ['Briah', 'Qual ideia ou princípio ele expressa?'],
          ['Yetzirah', 'Que imagens, emoções e relações ele produz?'],
          ['Assiah', 'Como ele aparece concretamente na vida?'],
        ]} />
        <p>Aplicado a Marte: potência primordial da força; princípio de decisão e separação; coragem, raiva, conflito e impulso; ação, corte, exercício, defesa ou confronto. Essa metodologia evita interpretações excessivamente abstratas.</p>
      </section>

      <section id="diario">
        <h2 className="brand-font">Como utilizar os mundos no diário mágico</h2>
        <div className="study-layer-list">
          <article><span>01</span><div><h3>Vontade</h3><p>Qual era a intenção real da prática?</p></div></article>
          <article><span>02</span><div><h3>Compreensão</h3><p>Que princípio, problema ou objetivo foi identificado?</p></div></article>
          <article><span>03</span><div><h3>Formação</h3><p>Quais símbolos, emoções, imagens e pensamentos apareceram?</p></div></article>
          <article><span>04</span><div><h3>Ação</h3><p>O que mudou concretamente depois da prática?</p></div></article>
        </div>
        <p>O formato ajuda a distinguir experiência espiritual de imaginação desorganizada e permite avaliar se a prática produz integração.</p>
      </section>

      <section id="conclusao">
        <h2 className="brand-font">Conclusão</h2>
        <p>Atziluth, Briah, Yetzirah e Assiah representam emanação, criação, formação e ação. Não são apenas lugares cósmicos distantes, mas padrões presentes em toda experiência.</p>
        <blockquote className="article-formula">Uma vontade emana <span>→</span> uma ideia é criada <span>→</span> uma forma é organizada <span>→</span> uma ação acontece</blockquote>
        <p>Na Kabbalah Hermética, cada mundo pode conter uma Árvore completa. As dez sefirot manifestam-se em quatro níveis, formando quarenta expressões interligadas.</p>
        <p>A estrutura explica por que uma mesma sefirah possui manifestações distintas, uma ideia pode não se tornar ação, a prática espiritual precisa alcançar a vida concreta e Tarot, elementos e Tetragrammaton foram relacionados aos mundos.</p>
        <p>A sequência não descreve apenas a descida da criação: oferece um método para ascensão da consciência e retorno consciente à ação.</p>
        <blockquote className="article-final-question">A Obra não termina em Atziluth. Ela precisa chegar a Assiah.</blockquote>
      </section>

      <section className="article-related" aria-labelledby="four-worlds-related-title">
        <span>Continue estudando</span>
        <h2 className="brand-font" id="four-worlds-related-title">Artigos relacionados</h2>
        <a href="/blog/arvore-da-vida-sempre-teve-22-caminhos">A Árvore da Vida sempre teve 22 caminhos?</a>
        <span className="article-related-upcoming">Em breve: As quatro letras do Tetragrammaton</span>
        <span className="article-related-upcoming">Em breve: As dez sefirot explicadas</span>
        <span className="article-related-upcoming">Em breve: Malkuth: matéria, manifestação e realização</span>
        <span className="article-related-upcoming">Em breve: Como estudar Kabbalah Hermética sem misturar tradições</span>
      </section>

      <section className="article-references" aria-labelledby="four-worlds-references-title">
        <span>Referências e leitura complementar</span>
        <h2 className="brand-font" id="four-worlds-references-title">Fontes consultáveis</h2>
        <ol>{references.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{label}</a></li>)}</ol>
        <p>Nota editorial: a teoria dos quatro mundos possui raízes cabalísticas; as relações sistemáticas com Tarot, naipes, elementos e níveis psicológicos pertencem a desenvolvimentos herméticos posteriores.</p>
      </section>

      <footer className="article-tags">
        <span>Categoria: <b>{post.category}</b></span>
        <div>{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </footer>
    </>
  );
}
