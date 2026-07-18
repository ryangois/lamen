export const RESEARCH_SOURCES = {
  seferYetzirah: 'https://www.sefaria.org/Sefer_Yetzirah.1.1?lang=bi',
  sefariaMap: 'https://www.sefaria.org/static/files/Sefaria-Text-Map-June-2016.pdf',
  ilanotHistory: 'https://ilanot.haifa.ac.il/site/',
  ilanotGallery: 'https://ilanot.haifa.ac.il/site/?page_id=392',
  ilanotDatabase: 'https://ilanot.haifa.ac.il/Ilanot_Site/database.html',
  marseilleMuseum: 'https://www.britishmuseum.org/collection/object/P_1904-0511-47-1-78',
  riderWaiteMuseum: 'https://www.britishmuseum.org/collection/object/P_1982-U-4643-1-78',
  liber777: 'https://keepsilence.org/the-equinox/777/table-of-correspondences_low.pdf',
};

export const SEFER_YETZIRAH_VERSIONS = [
  {
    id: 'short',
    name: 'Versão Curta',
    hebrew: 'נוסח הקצר',
    period: 'família textual medieval',
    url: RESEARCH_SOURCES.sefariaMap,
    description: 'Forma concisa usada como testemunho importante para comparar a organização das dez sefirot belimah e das 22 letras.',
  },
  {
    id: 'long',
    name: 'Versão Longa',
    hebrew: 'נוסח הארוך',
    period: 'família textual medieval',
    url: RESEARCH_SOURCES.sefariaMap,
    description: 'Expande passagens e fórmulas encontradas na tradição curta; diferenças de redação impedem tratar o livro como um texto único e imóvel.',
  },
  {
    id: 'saadia',
    name: 'Versão Saadia (Rasag)',
    hebrew: 'נוסח רס״ג',
    period: 'século X',
    url: RESEARCH_SOURCES.sefariaMap,
    description: 'Associada ao comentário de Saadia Gaon e a uma organização própria do material, importante para a recepção filosófica judaica.',
  },
  {
    id: 'gra',
    name: 'Versão Gra',
    hebrew: 'נוסח הגר״א',
    period: 'recepção do Gaon de Vilna, século XVIII',
    url: RESEARCH_SOURCES.sefariaMap,
    description: 'Recensão influente em edições e comentários posteriores; não deve ser projetada automaticamente sobre testemunhos mais antigos.',
  },
];

export const FOUR_WORLDS = [
  {
    id: 'atziluth',
    name: 'Atziluth',
    hebrew: 'אצילות',
    label: 'Emanação',
    color: '#f4d36f',
    focus: 'Nomes divinos e princípio arquetípico',
  },
  {
    id: 'briah',
    name: 'Briah',
    hebrew: 'בריאה',
    label: 'Criação',
    color: '#c84d45',
    focus: 'Arcanjos e formulação criativa',
  },
  {
    id: 'yetzirah',
    name: 'Yetzirah',
    hebrew: 'יצירה',
    label: 'Formação',
    color: '#547bc4',
    focus: 'Coros angélicos e organização formativa',
  },
  {
    id: 'assiah',
    name: 'Assiah',
    hebrew: 'עשיה',
    label: 'Ação',
    color: '#4d9a68',
    focus: 'Esfera planetária, imagens e manifestação',
  },
];

export const HISTORICAL_TREES = [
  {
    id: 'classical',
    title: 'Ilan sefirotico clássico',
    period: 'séculos XIV–XVI',
    region: 'Península Ibérica e Itália',
    shape: 'tree',
    description: 'Medalhões e canais organizam nomes, atributos e relações das Sephiroth; o diagrama funciona como mapa de relações, não como retrato literal.',
    url: RESEARCH_SOURCES.ilanotHistory,
  },
  {
    id: 'shaarei-orah',
    title: 'Sha’arei Orah',
    period: 'obra do século XIII; impressão latina no século XVI',
    region: 'Espanha e Europa cristã',
    shape: 'columns',
    description: 'A tradição de Joseph Gikatilla organiza nomes divinos e Sephiroth; sua recepção impressa ajudou a circular imagens da árvore fora do manuscrito hebraico.',
    url: RESEARCH_SOURCES.ilanotGallery,
  },
  {
    id: 'chuppah',
    title: 'Ilan em forma de chuppah',
    period: 'século XVI',
    region: 'Itália',
    shape: 'canopy',
    description: 'Substitui a forma arbórea por um dossel nupcial: Tiphereth e Malkuth aparecem como noivo e noiva, mostrando que nem todo ilan possui o desenho hoje familiar.',
    url: RESEARCH_SOURCES.ilanotGallery,
  },
  {
    id: 'lurianic',
    title: 'Ilanot lurianos',
    period: 'séculos XVII–XIX',
    region: 'Europa, Norte da África e Oriente Médio',
    shape: 'circles',
    description: 'Diagramas extensos incorporam partzufim, mundos, contração, revestimento e outras estruturas da Cabala luriana; alguns rolos ultrapassam vários metros.',
    url: RESEARCH_SOURCES.ilanotDatabase,
  },
];

const provenanceByCategory = {
  angel: [
    ['Base textual', 'Êxodo 14:19–21', 'Antiguidade bíblica', 'Judaica', 'Os tríplices derivam da combinação de três versos; vocalizações, terminações e personalidades angélicas são recepções posteriores.'],
    ['Nome convencional', 'Cabala cristã e tabelas do Shem', 'Idade Moderna', 'Cristã cabalística', 'As terminações -el e -iah e muitas grafias variam conforme manuscrito, língua e escola.'],
    ['Regências', 'Tabelas astrológicas e herméticas', 'séculos XIX–XX', 'Hermética', 'Graus, decanatos, coros e horários pertencem a sínteses posteriores, não ao texto de Êxodo.'],
  ],
  path: [
    ['Letra formativa', 'Sefer Yetzirah', 'Antiguidade tardia / início medieval', 'Judaica', 'As 22 letras integram os 32 caminhos com as dez sefirot belimah.'],
    ['Posição no diagrama', 'Árvores cabalísticas e ocultismo moderno', 'medieval–moderna', 'Judaica e hermética', 'A posição exata de cada letra entre duas Sephiroth depende do diagrama e da escola.'],
    ['Tarot e astrologia', 'Golden Dawn e Liber 777', 'séculos XIX–XX', 'Hermética', 'A ligação fixa letra–arcano–signo ou planeta é uma sistematização ocultista posterior.'],
  ],
  sephirah: [
    ['Termo inicial', 'Sefer Yetzirah', 'Antiguidade tardia / início medieval', 'Judaica', 'As sefirot belimah do texto antigo não devem ser identificadas sem ressalvas com todas as qualidades da Árvore posterior.'],
    ['Árvore diagramática', 'Ilanot cabalísticos', 'desde o século XIV', 'Judaica', 'Medalhões, canais e textos tornam visíveis relações teosóficas em diferentes formatos regionais.'],
    ['Cores e regências', 'Cabala hermética', 'séculos XIX–XX', 'Hermética', 'Cores em quatro escalas, planetas, arcanjos e Tarot são camadas editoriais de sistemas específicos.'],
  ],
  daath: [
    ['Conceito', 'Literatura cabalística posterior', 'medieval–moderna', 'Judaica', 'Daath funciona como conhecimento ou articulação, sem ser uma décima primeira Sephirah numerada.'],
    ['Abismo', 'Ocultismo moderno e Thelema', 'séculos XIX–XX', 'Hermética', 'Abismo, Choronzon e leituras iniciáticas pertencem a sistemas particulares.'],
  ],
  zodiac: [
    ['Signo e elemento', 'Astrologia helenística e medieval', 'Antiguidade–medieval', 'Astrológica', 'Triplicidades, modalidades e regências possuem história anterior à Cabala hermética.'],
    ['Letra e Tarot', 'Golden Dawn', 'século XIX', 'Hermética', 'Atribuições hebraicas e tarológicas são uma camada ocultista moderna.'],
  ],
  planet: [
    ['Regência astrológica', 'Astrologia tradicional', 'Antiguidade–medieval', 'Astrológica', 'Domicílios, exaltações, metais e dias resultam de transmissões históricas distintas.'],
    ['Sephirah e arcanjo', 'Cabala hermética', 'Idade Moderna–contemporânea', 'Hermética', 'A cadeia planeta–Sephirah–arcanjo varia entre tabelas e escolas.'],
    ['Dados físicos', 'Astronomia moderna', 'contemporânea', 'Científica', 'Períodos orbitais descrevem corpos físicos e são mantidos separados da interpretação simbólica.'],
  ],
  decan: [
    ['Divisão zodiacal', 'Tradições egípcia, helenística e medieval', 'Antiguidade–medieval', 'Astrológica', 'Cada signo é dividido em três faces de dez graus.'],
    ['Carta numerada', 'Golden Dawn', 'século XIX', 'Hermética', 'A ligação com Tarot menor e títulos esotéricos é uma síntese moderna.'],
  ],
  choir: [
    ['Hierarquia celeste', 'Pseudo-Dionísio', 'séculos V–VI', 'Cristã', 'As nove ordens são organizadas em três hierarquias.'],
    ['Sephirah e oito anjos', 'Cabala cristã e hermética', 'Idade Moderna–contemporânea', 'Hermética', 'A distribuição fixa dos 72 nomes entre os coros é posterior.'],
  ],
  element: [
    ['Qualidades', 'Filosofia natural e medicina tradicional', 'Antiguidade–medieval', 'Filosófica', 'Quente, frio, seco e úmido formam uma matriz histórica de qualidades.'],
    ['Direções e armas', 'Magia cerimonial', 'Idade Moderna–contemporânea', 'Hermética', 'Direções, arcanjos, naipes e cores mudam conforme o ritual e a ordem.'],
  ],
  symbol: [
    ['Síntese editorial', 'Fontes comparadas do Lâmen', 'contemporânea', 'Estudo comparado', 'A ficha aproxima sistemas sem afirmar que tenham uma única origem histórica.'],
  ],
};

export function buildProvenance(category, sources = []) {
  const entries = provenanceByCategory[category] || provenanceByCategory.symbol;
  return entries.map(([layer, source, period, tradition, note], index) => ({
    layer,
    source,
    period,
    tradition,
    note,
    url: sources[index % Math.max(sources.length, 1)]?.url || null,
  }));
}

export function buildFourWorlds(associations = {}) {
  const expressions = {
    atziluth: associations['Nome divino'] || 'Princípio divino correspondente',
    briah: associations.Arcanjo || 'Potência criativa ou arquetípica',
    yetzirah: associations.Coro || 'Ordem angélica e formação psíquica',
    assiah: associations.Esfera || associations.Planeta || 'Imagem material e experiência concreta',
  };
  return FOUR_WORLDS.map((world) => ({ ...world, expression: expressions[world.id] }));
}

export const HEBREW_LETTERS = [
  ['Aleph', 'א', 1, 'boi, força e sopro', 'Representa a origem silenciosa, a unidade e a potência anterior à forma.'],
  ['Beth', 'ב', 2, 'casa e interior', 'Expressa receptividade, morada e o espaço delimitado no qual algo pode tomar forma.'],
  ['Gimel', 'ג', 3, 'camelo e travessia', 'Evoca movimento, passagem, troca e a capacidade de atravessar uma distância.'],
  ['Daleth', 'ד', 4, 'porta e passagem', 'Indica limiar, abertura e a transição consciente entre um estado e outro.'],
  ['Heh', 'ה', 5, 'janela, sopro e revelação', 'Associa-se à expressão do alento, à abertura da percepção e ao que se torna visível.'],
  ['Vav', 'ו', 6, 'gancho e ligação', 'Simboliza união, continuidade e a força que conecta partes antes separadas.'],
  ['Zayin', 'ז', 7, 'arma e corte', 'Representa discernimento, foco e a separação necessária para realizar uma escolha.'],
  ['Cheth', 'ח', 8, 'cerca, recinto e vida', 'Evoca proteção, limite vital e a organização de uma força dentro de um campo.'],
  ['Teth', 'ט', 9, 'recipiente e potência recolhida', 'Sugere gestação, energia contida e uma qualidade interior ainda não revelada.'],
  ['Yod', 'י', 10, 'mão e ponto seminal', 'É lida como semente do ato, concentração de potência e começo presente no detalhe.'],
  ['Kaph', 'כ', 20, 'palma da mão e capacidade', 'Expressa receber, conter, moldar e responder aos ciclos ou circunstâncias.'],
  ['Lamed', 'ל', 30, 'aguilhão e aprendizado', 'Representa estudo, direção e o impulso que conduz à correção e ao equilíbrio.'],
  ['Mem', 'מ', 40, 'água e profundidade', 'Simboliza fluxo, matriz, interioridade e transformação por imersão.'],
  ['Nun', 'נ', 50, 'peixe, broto e continuidade', 'Evoca continuidade da vida, queda e renovação, movimento entre ocultação e emergência.'],
  ['Samekh', 'ס', 60, 'apoio e sustentação', 'Expressa amparo, equilíbrio e a estrutura que permite atravessar uma mudança sem dispersão.'],
  ['Ayin', 'ע', 70, 'olho e percepção', 'Relaciona-se ao ato de ver, à consciência das aparências e ao exame dos vínculos materiais.'],
  ['Peh', 'פ', 80, 'boca e expressão', 'Representa palavra, exteriorização e o poder criativo ou destrutivo daquilo que é pronunciado.'],
  ['Tzaddi', 'צ', 90, 'gancho, justiça e retidão', 'Evoca alinhamento, integridade e a aspiração de ajustar conduta e ideal.'],
  ['Qoph', 'ק', 100, 'nuca, horizonte e imitação', 'Sugere limiar do inconsciente, imagens refletidas e padrões que pedem reconhecimento.'],
  ['Resh', 'ר', 200, 'cabeça e princípio', 'Associa-se à consciência, liderança, começo renovado e irradiação da identidade.'],
  ['Shin', 'ש', 300, 'dente e fogo', 'Representa transformação, intensidade e o fogo que consome uma forma para renovar sua energia.'],
  ['Tav', 'ת', 400, 'marca, sinal e selo', 'Expressa conclusão, limite, compromisso e a fixação de uma potência no mundo manifestado.'],
].map(([name, hebrew, value, image, meaning]) => ({ name, hebrew, value, image, meaning }));

export const HEBREW_ROOTS_BY_ID = {
  arc_metatron: { root: 'כ־ת־ר', transliteration: 'K–T–R', note: 'Campo lexical de coroa e coroar.' },
  arc_raziel: { root: 'ח־כ־ם', transliteration: 'Ḥ–K–M', note: 'Campo lexical de sabedoria e ser sábio.' },
  arc_tzaphkiel: { root: 'ב־י־ן', transliteration: 'B–Y–N', note: 'Campo lexical de discernir e compreender.' },
  arc_tzadkiel: { root: 'ח־ס־ד', transliteration: 'Ḥ–S–D', note: 'Campo lexical de bondade, lealdade e misericórdia.' },
  arc_kamael: { root: 'ג־ב־ר', transliteration: 'G–B–R', note: 'Campo lexical de força, potência e prevalecer.' },
  arc_raphael: { root: 'פ־א־ר', transliteration: 'P–ʾ–R', note: 'Campo lexical de beleza, glória e ornamentação.' },
  arc_haniel: { root: 'נ־צ־ח', transliteration: 'N–Ṣ–Ḥ', note: 'Campo lexical de duração, vitória e permanência.' },
  arc_michael: { root: 'ה־ו־ד', transliteration: 'H–W–D', note: 'Nome ligado a esplendor ou majestade; a análise histórica da raiz exige contexto filológico.' },
  arc_gabriel: { root: 'י־ס־ד', transliteration: 'Y–S–D', note: 'Campo lexical de fundar, estabelecer e assentar uma base.' },
  arc_sandalphon: { root: 'מ־ל־ך', transliteration: 'M–L–K', note: 'Campo lexical de reinar, rei e reino.' },
  arc_daath: { root: 'י־ד־ע', transliteration: 'Y–D–ʿ', note: 'Campo lexical de conhecer, perceber e reconhecer.' },
};

export function getLetterGate(first, second) {
  const left = HEBREW_LETTERS.find((letter) => letter.hebrew === first) || HEBREW_LETTERS[0];
  const right = HEBREW_LETTERS.find((letter) => letter.hebrew === second) || HEBREW_LETTERS[1];
  return {
    first: left,
    second: right,
    pair: `${left.hebrew}${right.hebrew}`,
    reverse: `${right.hebrew}${left.hebrew}`,
    value: left.value + right.value,
    note: left.hebrew === right.hebrew
      ? 'Os 231 Portais usam pares de letras distintas; escolha outra letra para formar um portal.'
      : 'O par e sua inversão são apresentados como exercício combinatório. Não equivalem automaticamente a uma raiz ou palavra hebraica.',
  };
}
