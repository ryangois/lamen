import { ringStructure } from './rings.js';
import {
  angelScripture,
  hebrewScriptureSource,
  scriptureSource,
  transliterateHebrew,
} from './scripture.js';
import { treePathProfiles } from './treeOfLife.js';

const content = {};

const sources = {
  exodus: {
    label: 'Êxodo 14:19-21 — base textual dos 72 tríplices',
    url: 'https://www.sefaria.org/Exodus.14.19-21',
  },
  shemPaper: {
    label: 'The Seventy-Two Angels of the Shemhamphorash — estudo e tabelas',
    url: 'https://utahsricf.org/wp-content/uploads/2015/10/SHEMHAMPHORASH-ASTROILOGY-PAPER-PRINT-VERSION-SRICF.pdf',
  },
  shemTable: {
    label: 'Occult Encyclopedia — nomes, coros e versos tradicionais',
    url: 'https://www.occult.live/index.php/Kabbalistic_angel',
  },
  dionysius: {
    label: 'Pseudo-Dionísio — The Celestial Hierarchy',
    url: 'https://sacred-texts.com/chr/dio/index.htm',
  },
  agrippa: {
    label: 'Agrippa — De Occulta Philosophia, Livro III',
    url: 'https://www.esotericarchives.com/agrippa/agripp3b.htm',
  },
  agrippaPlanets: {
    label: 'Agrippa — correspondências celestes e planetárias',
    url: 'https://www.esotericarchives.com/agrippa/agrippa2.htm',
  },
  nasa: {
    label: 'NASA Solar System Exploration — dados astronômicos',
    url: 'https://science.nasa.gov/solar-system/',
  },
};

const traditionNote = 'As correspondências abaixo pertencem a sistemas históricos de astrologia, Cabala hermética e magia cerimonial. Escolas diferentes podem usar grafias, regências e atribuições distintas.';

const treeSephirahDetails = {
  arc_metatron: ['Brilho branco; em escalas herméticas, branco puro e iridescência', 'Um antigo rei coroado visto de perfil', 'União com a fonte e percepção da unidade', 'Realização da Grande Obra', 'não se atribui vício direto; o risco simbólico é inflação espiritual', 'No Sepher Yetzirah, a primeira emanação é contemplada como sopro/espírito do Deus vivo, anterior à diferenciação plena.', 'כתר expressa coroa, culminação e princípio; sua soma é lida como síntese elevada no topo da Árvore.'],
  arc_raziel: ['Cinza luminoso, branco-azulado e pérola', 'Figura masculina barbada', 'Visão de Deus face a face em chave contemplativa', 'Devoção e abertura à sabedoria', 'impulso sem forma e excesso de força não estruturada', 'Chokmah corresponde à sabedoria dinâmica, o jorro primordial que antecede a forma.', 'חכמה reúne vida, contenção e abertura; sua leitura favorece sabedoria como potência ativa.'],
  arc_tzaphkiel: ['Preto, índigo escuro e carmesim profundo', 'Mulher madura entronizada', 'Visão da tristeza e da estrutura do tempo', 'Silêncio, compreensão e disciplina', 'avareza, rigidez e esterilidade interior', 'Binah é entendimento: a matriz que limita, mede e torna inteligível a emanação.', 'בינה sugere construção do entendimento; a palavra combina casa, vida e abertura formativa.'],
  arc_tzadkiel: ['Azul profundo e majestoso', 'Rei poderoso coroado e entronizado', 'Visão do amor e da ordem benevolente', 'Obediência à medida justa, generosidade e magnanimidade', 'hipocrisia, tirania benevolente e excesso', 'Chesed organiza expansão, lei, misericórdia e estabilidade das forças superiores.', 'חסד é misericórdia e graça; a gematria enfatiza fluxo, sustentação e vínculo ético.'],
  arc_kamael: ['Vermelho escarlate', 'Guerreiro poderoso em seu carro', 'Visão do poder e da severidade', 'Coragem e energia disciplinada', 'crueldade, destruição e violência sem propósito', 'Geburah é força, corte e juízo; equilibra a expansão com limite e correção.', 'גבורה indica força ou potência; sua leitura aponta para contenção ativa.'],
  arc_raphael: ['Amarelo dourado, ouro solar e rosa no centro', 'Criança, rei sacrificado ou deus ressuscitado', 'Visão da harmonia das coisas', 'Devoção à Grande Obra, beleza e integração', 'orgulho, vaidade e falsa centralidade', 'Tiphareth é beleza e mediação: o coração que reconcilia alto e baixo, rigor e misericórdia.', 'תפארת expressa beleza adornada; sua soma sugere integração complexa no centro da Árvore.'],
  arc_haniel: ['Verde esmeralda', 'Mulher bela e desnuda', 'Visão da beleza triunfante', 'Altruísmo, amor e criatividade', 'luxúria, vaidade e apego ao prazer', 'Netzach manifesta vitória, desejo, arte, afeto e persistência da força vital.', 'נצח combina duração e vitória; a leitura aponta para permanência do desejo refinado.'],
  arc_michael: ['Laranja e brilho mercurial', 'Hermafrodita ou figura intelectual radiante', 'Visão do esplendor', 'Veracidade, clareza e método', 'falsidade, manipulação e excesso de análise', 'Hod estrutura linguagem, símbolos, cálculo e o esplendor das formas mentais.', 'הוד significa esplendor; a gematria favorece leitura de linguagem, reflexo e precisão.'],
  arc_gabriel: ['Violeta, prata e azul lunar', 'Homem belo e forte, ou figura lunar portadora de imagens', 'Visão do mecanismo do universo', 'Independência, imaginação disciplinada e confiança', 'ociosidade, fantasia desordenada e instabilidade', 'Yesod é fundamento: recolhe imagens e padrões antes que desçam à manifestação.', 'יסוד é base e fundamento; a soma sustenta leitura de mediação, sonho e corpo sutil.'],
};

const hebrewGematriaValues = {
  א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9,
  י: 10, כ: 20, ך: 20, ל: 30, מ: 40, ם: 40, נ: 50, ן: 50,
  ס: 60, ע: 70, פ: 80, ף: 80, צ: 90, ץ: 90, ק: 100, ר: 200,
  ש: 300, ת: 400,
};

const gematriaRoots = {
  1: 'unidade, impulso inicial e direção da vontade',
  2: 'polaridade, vínculo e cooperação entre forças',
  3: 'formação, entendimento e expressão criativa',
  4: 'estrutura, estabilidade e manifestação concreta',
  5: 'movimento, correção, travessia e mudança',
  6: 'harmonia, beleza, cura e integração',
  7: 'busca interior, refinamento e vitória pela perseverança',
  8: 'ordem, linguagem, estratégia e circulação de forças',
  9: 'síntese, conclusão, compaixão e maturação espiritual',
};

function normalizeHebrewLetters(value = '') {
  return [...value.normalize('NFD').replace(/[\u0591-\u05C7]/g, '')]
    .filter((letter) => hebrewGematriaValues[letter])
    .join('');
}

function reduceGematria(value) {
  let current = Number(value || 0);
  while (current > 9) {
    current = String(current).split('').reduce((sum, digit) => sum + Number(digit), 0);
  }
  return current || 0;
}

function getGematriaBreakdown(value) {
  const letters = [...normalizeHebrewLetters(value)].map((letter) => ({
    letter,
    value: hebrewGematriaValues[letter],
  }));
  const total = letters.reduce((sum, item) => sum + item.value, 0);

  return {
    text: letters.map((item) => item.letter).join(''),
    value: total,
    root: reduceGematria(total),
    formula: letters.map((item) => `${item.letter}=${item.value}`).join(' + '),
    letters,
  };
}

function buildHebrewWordGematria(label, hebrew, note) {
  const core = getGematriaBreakdown(hebrew);

  return {
    core,
    full: core,
    method: 'Mispar Hechrechi aplicado ao nome hebraico da esfera ou caminho. Letras finais mantêm o valor comum.',
    interpretations: [
      `${label} (${core.text}) soma ${core.value}, reduzido a ${core.root}.`,
      note || `A redução ${core.root} sugere ${gematriaRoots[core.root] || 'uma síntese simbólica própria do termo'}.`,
      `Fórmula: ${core.formula}.`,
    ],
  };
}

function tarotAssetKey(title) {
  const lookup = {
    'O Louco': ['00_Fool', '00'],
    'O Mago': ['01_Magician', '01'],
    'A Sacerdotisa': ['02_High_Priestess', '02'],
    'A Imperatriz': ['03_Empress', '03'],
    'O Imperador': ['04_Emperor', '04'],
    'O Hierofante': ['05_Hierophant', '05'],
    'Os Enamorados': ['06_Lovers', '06'],
    'O Carro': ['07_Chariot', '07'],
    'A Força': ['08_Strength', '08'],
    'O Eremita': ['09_Hermit', '09'],
    'A Roda da Fortuna': ['10_Wheel_of_Fortune', '10'],
    'A Justiça': ['11_Justice', '11'],
    'O Enforcado': ['12_Hanged_Man', '12'],
    'A Morte': ['13_Death', '13'],
    'A Temperança': ['14_Temperance', '14'],
    'O Diabo': ['15_Devil', '15'],
    'A Torre': ['16_Tower', '16'],
    'A Estrela': ['17_Star', '17'],
    'A Lua': ['18_Moon', '18'],
    'O Sol': ['19_Sun', '19'],
    'O Julgamento': ['20_Judgement', '20'],
    'O Mundo': ['21_World', '21'],
  };

  return lookup[title] || null;
}

function buildTarotDecks(path) {
  const keys = tarotAssetKey(path.tarot);
  if (!keys) return [];

  const [rws, marseille] = keys;

  return [
    {
      deck: 'Rider-Waite-Smith',
      title: path.tarot,
      image: `https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_${rws}.jpg`,
      source: 'Wikimedia Commons — Rider-Waite tarot deck',
      note: 'Imagem histórica em domínio público segundo a ficha do Commons; algumas recolorizações modernas podem ter restrições.',
    },
    {
      deck: 'Tarot de Marseille',
      title: path.tarot,
      image: `https://commons.wikimedia.org/wiki/Special:FilePath/T${marseille}_Tarot.png`,
      source: 'Wikimedia Commons — Tarot de Marseille',
      note: 'Imagem de baralhos antigos/derivados hospedados no Commons quando disponível.',
    },
    {
      deck: 'Thoth',
      title: path.tarot,
      image: '',
      source: 'Imagem não incluída por cautela de copyright',
      note: 'O deck Thoth de Crowley/Harris possui histórico de licenciamento moderno; mantive a associação sem incorporar imagem protegida.',
    },
  ];
}

function getAngelNameSuffix(name) {
  return name.replace(/[^A-Z]/gi, '').toUpperCase().endsWith('EL') ? 'אל' : 'יה';
}

function getGematriaTone(value) {
  if (value >= 500) return 'valor amplo, associado a síntese, maturidade e integração de muitas camadas simbólicas';
  if (value >= 300) return 'valor elevado, associado a consolidação, força espiritual e expressão coletiva';
  if (value >= 100) return 'valor intermediário, associado a construção, passagem do abstrato ao concreto e trabalho consciente';
  return 'valor concentrado, associado à raiz essencial do nome e ao impulso inicial de sua função';
}

function buildAngelGematria(segment, name) {
  const core = getGematriaBreakdown(segment.hebrew);
  const suffix = getAngelNameSuffix(name);
  const full = getGematriaBreakdown(`${segment.hebrew}${suffix}`);

  return {
    core,
    full,
    suffix,
    method: 'Mispar Hechrechi: א=1, ב=2 … י=10 … ק=100, ר=200, ש=300, ת=400; letras finais mantêm o mesmo valor das formas comuns.',
    interpretations: [
      `Tríplice ${core.text}: ${core.value}, reduzido a ${core.root}. Esta raiz sugere ${gematriaRoots[core.root]}.`,
      `Nome completo ${full.text}: ${full.value}, reduzido a ${full.root}. A leitura simbólica enfatiza ${gematriaRoots[full.root]}.`,
      `Como síntese, ${name} combina um núcleo de ${getGematriaTone(core.value)} com um nome completo de ${getGematriaTone(full.value)}.`,
    ],
  };
}

function add(id, data) {
  content[id] = {
    traditionNote,
    ...data,
  };
}

const elementProfiles = [
  {
    id: 'fire', symbol: '🜂', name: 'Fogo', direction: 'Sul', quality: 'Quente e seco',
    suit: 'Bastões', world: 'Atziluth', letter: 'Yod', archangel: 'Michael',
    colors: 'Vermelho, escarlate e dourado', virtues: 'Coragem, iniciativa, entusiasmo e transformação',
    shadow: 'Impulsividade, agressividade, exaustão e destruição sem propósito',
    description: 'O Fogo simboliza impulso, vontade e capacidade de transformar. Na leitura hermética, é a centelha que inicia a ação e converte intenção em movimento.',
  },
  {
    id: 'water', symbol: '🜄', name: 'Água', direction: 'Oeste', quality: 'Fria e úmida',
    suit: 'Copas', world: 'Briah', letter: 'Heh', archangel: 'Gabriel',
    colors: 'Azul, azul-marinho e verde-mar', virtues: 'Empatia, imaginação, receptividade e cura',
    shadow: 'Passividade, confusão emocional, fuga e excesso de absorção',
    description: 'A Água representa sentimento, memória, imaginação e receptividade. É associada ao fluxo psíquico, aos vínculos e à capacidade de adaptar-se sem perder profundidade.',
  },
  {
    id: 'air', symbol: '🜁', name: 'Ar', direction: 'Leste', quality: 'Quente e úmido',
    suit: 'Espadas', world: 'Yetzirah', letter: 'Vav', archangel: 'Raphael',
    colors: 'Amarelo, azul-claro e violeta', virtues: 'Clareza, comunicação, análise e mobilidade',
    shadow: 'Dispersão, frieza, ansiedade e intelectualização excessiva',
    description: 'O Ar corresponde ao pensamento, à linguagem e às relações entre ideias. Na tradição hermética, conecta, discrimina e torna comunicável aquilo que antes era apenas sensação.',
  },
  {
    id: 'earth', symbol: '🜃', name: 'Terra', direction: 'Norte', quality: 'Fria e seca',
    suit: 'Ouros', world: 'Assiah', letter: 'Heh final', archangel: 'Uriel ou Sandalphon',
    colors: 'Verde, marrom, preto e citrino', virtues: 'Estabilidade, paciência, execução e presença',
    shadow: 'Rigidez, materialismo, estagnação e medo de mudança',
    description: 'A Terra representa corpo, matéria, recursos e manifestação. Também se aproxima de Malkuth, a esfera em que as forças dos demais mundos recebem forma concreta.',
  },
];

elementProfiles.forEach((element) => add(element.id, {
  title: `${element.symbol} Elemento ${element.name}`,
  subtitle: element.virtues,
  description: element.description,
  highlights: [
    `Potencial: ${element.virtues}.`,
    `Desequilíbrio: ${element.shadow}.`,
  ],
  associations: {
    Direção: element.direction,
    Qualidades: element.quality,
    'Naipe do Tarot': element.suit,
    'Mundo cabalístico': element.world,
    'Letra do Tetragrammaton': element.letter,
    Arcanjo: element.archangel,
    Cores: element.colors,
  },
  sections: [
    {
      title: 'Leitura hermética',
      paragraphs: [
        `No ciclo dos quatro elementos, ${element.name} descreve uma modalidade fundamental de experiência e ação.`,
        `Sua expressão equilibrada favorece ${element.virtues.toLowerCase()}; em excesso ou carência, pode aparecer como ${element.shadow.toLowerCase()}.`,
      ],
    },
  ],
  sources: [sources.agrippaPlanets],
}));

const sphereProfiles = [
  {
    id: 'arc_metatron', archangel: 'Metatron', sephirah: 'Kether', hebrew: 'כתר', number: 1,
    meaning: 'Coroa', planet: 'Primum Mobile / unidade anterior às esferas', choir: 'Serafins',
    divineName: 'Eheieh', color: 'Branco brilhante', virtue: 'Unidade e vontade primordial',
    imbalance: 'Dissociação, inflação espiritual e abstração sem aterramento',
    description: 'Kether é a Coroa, o ponto de unidade no topo da Árvore da Vida. Na Cabala hermética, Metatron representa a mediação entre o ilimitado e a primeira formulação da vontade.',
  },
  {
    id: 'arc_raziel', archangel: 'Raziel', sephirah: 'Chokmah', hebrew: 'חכמה', number: 2,
    meaning: 'Sabedoria', planet: 'Zodíaco / esfera das estrelas fixas', choir: 'Querubins',
    divineName: 'Yah', color: 'Cinza luminoso', virtue: 'Sabedoria, dinamismo e revelação',
    imbalance: 'Força sem forma, precipitação e excesso de impulso',
    description: 'Chokmah é a Sabedoria, princípio expansivo e dinâmico. Raziel é associado aos mistérios da criação e à transmissão do conhecimento oculto.',
  },
  {
    id: 'arc_tzaphkiel', archangel: 'Tzaphkiel', sephirah: 'Binah', hebrew: 'בינה', number: 3,
    meaning: 'Entendimento', planet: 'Saturno', choir: 'Tronos',
    divineName: 'YHVH Elohim', color: 'Preto, índigo e carmesim', virtue: 'Compreensão, silêncio e estrutura',
    imbalance: 'Fatalismo, rigidez, isolamento e opressão',
    description: 'Binah é o Entendimento: delimita, organiza e dá forma. Tzaphkiel expressa contemplação, maturidade e a disciplina saturnina que torna a criação sustentável.',
  },
  {
    id: 'arc_tzadkiel', archangel: 'Tzadkiel', sephirah: 'Chesed', hebrew: 'חסד', number: 4,
    meaning: 'Misericórdia', planet: 'Júpiter', choir: 'Dominações',
    divineName: 'El', color: 'Azul', virtue: 'Generosidade, ordem e benevolência',
    imbalance: 'Excesso, paternalismo, complacência e autoridade inflada',
    description: 'Chesed é a esfera da Misericórdia, expansão e governo benevolente. Tzadkiel representa justiça temperada por compaixão e a capacidade de organizar recursos.',
  },
  {
    id: 'arc_kamael', archangel: 'Kamael', sephirah: 'Geburah', hebrew: 'גבורה', number: 5,
    meaning: 'Força ou Severidade', planet: 'Marte', choir: 'Potências',
    divineName: 'Elohim Gibor', color: 'Vermelho', virtue: 'Coragem, discernimento e contenção',
    imbalance: 'Crueldade, conflito, repressão e destruição',
    description: 'Geburah é Força, juízo e limite corretivo. Kamael simboliza a coragem de cortar excessos, proteger fronteiras e agir com precisão.',
  },
  {
    id: 'arc_raphael', archangel: 'Raphael', sephirah: 'Tiphareth', hebrew: 'תפארת', number: 6,
    meaning: 'Beleza', planet: 'Sol', choir: 'Virtudes',
    divineName: 'YHVH Eloah ve-Daath', color: 'Dourado e amarelo', virtue: 'Harmonia, integridade e cura',
    imbalance: 'Orgulho, culto à imagem e centralização excessiva',
    description: 'Tiphareth ocupa o centro equilibrador da Árvore. Raphael reúne beleza, consciência solar, cura e integração entre misericórdia e severidade.',
  },
  {
    id: 'arc_haniel', archangel: 'Haniel', sephirah: 'Netzach', hebrew: 'נצח', number: 7,
    meaning: 'Vitória ou Eternidade', planet: 'Vênus', choir: 'Principados',
    divineName: 'YHVH Tzabaoth', color: 'Verde e esmeralda', virtue: 'Amor, criatividade e constância afetiva',
    imbalance: 'Sedução, dependência, vaidade e desejo sem medida',
    description: 'Netzach é a Vitória, esfera de Vênus, desejo, arte e emoção. Haniel representa graça, magnetismo e a força de perseverar por aquilo que se ama.',
  },
  {
    id: 'arc_michael', archangel: 'Michael', sephirah: 'Hod', hebrew: 'הוד', number: 8,
    meaning: 'Esplendor', planet: 'Mercúrio', choir: 'Arcanjos',
    divineName: 'Elohim Tzabaoth', color: 'Laranja', virtue: 'Razão, linguagem e estratégia',
    imbalance: 'Racionalização, manipulação, duplicidade e excesso de análise',
    description: 'Hod é o Esplendor, esfera mercurial da linguagem, método e classificação. Michael, nessa atribuição hermética, ordena e defende por meio da inteligência.',
  },
  {
    id: 'arc_gabriel', archangel: 'Gabriel', sephirah: 'Yesod', hebrew: 'יסוד', number: 9,
    meaning: 'Fundamento', planet: 'Lua', choir: 'Anjos',
    divineName: 'Shaddai El Chai', color: 'Violeta e prata', virtue: 'Imaginação, memória e conexão',
    imbalance: 'Ilusão, instabilidade, projeção e fuga',
    description: 'Yesod é o Fundamento, esfera lunar das imagens, sonhos e padrões que antecedem a manifestação. Gabriel comunica, reflete e conduz conteúdos entre níveis.',
  },
];

sphereProfiles.forEach((sphere, index) => {
  const detail = treeSephirahDetails[sphere.id] || [];
  const [treeColor, magicalImage, spiritualExperience, treeVirtue, vice, yetzirah, gematriaNote] = detail;

  add(sphere.id, {
    title: `${sphere.archangel} · ${sphere.sephirah}`,
    subtitle: `${sphere.number}ª esfera — ${sphere.meaning}`,
    description: sphere.description,
    highlights: [
      `Virtude central: ${treeVirtue || sphere.virtue}.`,
      `Desequilíbrio simbólico: ${sphere.imbalance}.`,
      `Cor tradicional na Árvore: ${treeColor || sphere.color}.`,
    ],
    associations: {
      Sephirah: `${sphere.sephirah} (${sphere.hebrew})`,
      Número: sphere.number,
      Significado: sphere.meaning,
      'Cor padrão da Árvore': treeColor || sphere.color,
      'Imagem mágica': magicalImage || 'Imagem tradicional varia por escola',
      'Experiência espiritual': spiritualExperience || sphere.virtue,
      Virtude: treeVirtue || sphere.virtue,
      Vício: vice || sphere.imbalance,
      Esfera: sphere.planet,
      Arcanjo: sphere.archangel,
      Coro: sphere.choir,
      'Nome divino': sphere.divineName,
      'Nome hebraico': sphere.hebrew,
      'Anjos do Shem': `${index * 8 + 1}–${index * 8 + 8}`,
      'Sepher Yetzirah': yetzirah || 'Associação contemplativa por esfera conforme leituras herméticas posteriores.',
    },
    gematria: buildHebrewWordGematria(sphere.sephirah, sphere.hebrew, gematriaNote),
    sections: [
      {
        title: 'Função na Árvore da Vida',
        paragraphs: [
          `${sphere.sephirah} articula ${(treeVirtue || sphere.virtue).toLowerCase()} no esquema hermético da Árvore da Vida.`,
          `A esfera não deve ser entendida como lugar físico: é um mapa simbólico usado para contemplar relações entre consciência, ética, natureza e cosmologia.`,
        ],
      },
      {
        title: 'Sepher Yetzirah',
        paragraphs: [
          yetzirah || 'O Sepher Yetzirah fala das emanações e letras como estruturas simbólicas da criação; a associação detalhada por esfera é desenvolvida em leituras herméticas posteriores.',
        ],
      },
      {
        title: 'Arcanjo regente',
        paragraphs: [
          `${sphere.archangel} é associado a ${sphere.sephirah} e ao coro dos ${sphere.choir}. Grafias e regências variam entre fontes judaicas, cristãs e ordens herméticas.`,
        ],
      },
    ],
    sources: [sources.agrippa, sources.dionysius],
  });
});

add('arc_sandalphon', {
  title: 'Sandalphon · Malkuth',
  subtitle: '10ª esfera — Reino',
  description: 'Malkuth é o Reino, a esfera da manifestação concreta. Na síntese hermética, Sandalphon é associado ao limiar entre o mundo espiritual e a experiência encarnada.',
  highlights: [
    'Virtude central: presença, aterramento e realização concreta.',
    'Desequilíbrio simbólico: inércia, materialismo estreito ou desconexão do sentido.',
  ],
  associations: {
    Sephirah: 'Malkuth (מלכות)',
    Número: 10,
    Significado: 'Reino',
    'Cor padrão da Árvore': 'Citrino, oliva, castanho avermelhado e preto',
    'Imagem mágica': 'Jovem mulher coroada e entronizada',
    'Experiência espiritual': 'Visão do Santo Anjo Guardião em chave de presença encarnada',
    Virtude: 'Discriminação, presença e realização concreta',
    Vício: 'Avareza, inércia e materialismo estreito',
    Esfera: 'Terra / mundo manifestado',
    Arcanjo: 'Sandalphon',
    Coro: 'Almas, elementos e presença angélica próxima da matéria',
    'Nome divino': 'Adonai ha-Aretz',
    'Nome hebraico': 'מלכות',
    'Anjos do Shem': 'síntese e aterramento das 72 forças',
    'Sepher Yetzirah': 'Malkuth recebe a operação das letras e sefirot como mundo formado, corpo, circunstância e presença.',
  },
  gematria: buildHebrewWordGematria('Malkuth', 'מלכות', 'מלכות soma a ideia de Reino: a força simbólica que recebe, sela e manifesta as demais emanações.'),
  sections: [
    {
      title: 'Função na Árvore da Vida',
      paragraphs: [
        'Malkuth recebe as emanações das demais esferas e as apresenta como corpo, natureza, tempo, circunstância e mundo vivido.',
        'Na prática contemplativa, é a esfera que pergunta como uma ideia, virtude ou visão se torna gesto, cuidado e presença real.',
      ],
    },
    {
      title: 'Sepher Yetzirah',
      paragraphs: [
        'Embora a linguagem do Sepher Yetzirah seja concisa e não use sempre o vocabulário hermético posterior, Malkuth pode ser contemplada como o campo onde número, letra e mundo formado se tornam experiência.',
      ],
    },
    {
      title: 'Arcanjo regente',
      paragraphs: [
        'Sandalphon aparece em tradições judaicas e herméticas como figura ligada à oração, à terra e à passagem entre mundos. Em alguns esquemas, Uriel também é relacionado a Malkuth.',
      ],
    },
  ],
  sources: [sources.agrippa, sources.dionysius],
});

treePathProfiles.forEach((path) => add(path.id, {
  title: `${path.number}. ${path.letter} · ${path.fromName}–${path.toName}`,
  subtitle: `${path.hebrew} · ${path.attribution} · ${path.tarot}`,
  description: `O caminho de ${path.letter} liga ${path.fromName} a ${path.toName}. Na Cabala hermética, é lido como uma via de ${path.meaning}.`,
  highlights: [
    `Ligação: ${path.fromName} ↔ ${path.toName}.`,
    `Atribuição: ${path.attribution}; arcano: ${path.tarot}.`,
  ],
  associations: {
    Caminho: path.number,
    Letra: `${path.letter} (${path.hebrew})`,
    'De': path.fromName,
    'Para': path.toName,
    Atribuição: path.attribution,
    Tarot: path.tarot,
    Função: path.meaning,
    'Nome hebraico': path.hebrew,
    'Sepher Yetzirah': `A letra ${path.letter} (${path.hebrew}) é contemplada como potência formativa; sua atribuição a ${path.attribution} segue a síntese hermética dos 22 caminhos.`,
  },
  tarotDecks: buildTarotDecks(path),
  gematria: buildHebrewWordGematria(path.letter, path.hebrew, `A letra ${path.letter} reduz sua força ao valor ${getGematriaBreakdown(path.hebrew).value}, usado como chave contemplativa do caminho ${path.number}.`),
  sections: [
    {
      title: 'Leitura do caminho',
      paragraphs: [
        `Entre ${path.fromName} e ${path.toName}, ${path.letter} descreve uma passagem simbólica: ${path.meaning}.`,
        'Os caminhos não são apenas linhas entre pontos; funcionam como operações de consciência, ligando qualidades que precisam conversar entre si.',
      ],
    },
    {
      title: 'Sepher Yetzirah',
      paragraphs: [
        `O Sepher Yetzirah apresenta as letras hebraicas como elementos formativos da criação. Aqui, ${path.letter} é lida como ponte entre ${path.fromName} e ${path.toName}.`,
        `A atribuição a ${path.attribution} e ao arcano ${path.tarot} pertence à tradição hermética posterior, especialmente à leitura dos 22 caminhos da Árvore.`,
      ],
    },
    {
      title: 'Uso contemplativo',
      paragraphs: [
        `Meditar este caminho é observar como ${path.attribution.toLowerCase()} e ${path.tarot} podem traduzir a relação entre as duas esferas.`,
      ],
    },
  ],
  sources: [sources.agrippa],
}));

const planetProfiles = [
  {
    id: 'saturn', symbol: '♄', name: 'Saturno', sephirah: 'Binah', archangel: 'Tzaphkiel',
    weekday: 'Sábado', metal: 'Chumbo', color: 'Preto e índigo', letter: 'Tav', tarot: 'O Mundo',
    domiciles: 'Capricórnio e Aquário', exaltation: 'Libra', detriment: 'Câncer e Leão', fall: 'Áries',
    orbit: 'aprox. 29,45 anos', principle: 'Tempo, estrutura, limite, responsabilidade e maturidade',
    strengths: 'Disciplina, paciência, realismo e permanência',
    shadow: 'Medo, escassez, rigidez, pessimismo e isolamento',
  },
  {
    id: 'jupiter', symbol: '♃', name: 'Júpiter', sephirah: 'Chesed', archangel: 'Tzadkiel',
    weekday: 'Quinta-feira', metal: 'Estanho', color: 'Azul', letter: 'Kaph', tarot: 'A Roda da Fortuna',
    domiciles: 'Sagitário e Peixes', exaltation: 'Câncer', detriment: 'Gêmeos e Virgem', fall: 'Capricórnio',
    orbit: 'aprox. 11,86 anos', principle: 'Expansão, confiança, lei, filosofia e generosidade',
    strengths: 'Visão, esperança, crescimento, ensino e proteção',
    shadow: 'Exagero, dogmatismo, desperdício e promessas maiores que a capacidade',
  },
  {
    id: 'mars', symbol: '♂', name: 'Marte', sephirah: 'Geburah', archangel: 'Kamael',
    weekday: 'Terça-feira', metal: 'Ferro', color: 'Vermelho', letter: 'Peh', tarot: 'A Torre',
    domiciles: 'Áries e Escorpião', exaltation: 'Capricórnio', detriment: 'Libra e Touro', fall: 'Câncer',
    orbit: 'aprox. 687 dias', principle: 'Ação, desejo, disputa, corte e sobrevivência',
    strengths: 'Coragem, iniciativa, resistência, decisão e defesa',
    shadow: 'Violência, impaciência, hostilidade e ação sem estratégia',
  },
  {
    id: 'sun_p', symbol: '☉', name: 'Sol', sephirah: 'Tiphareth', archangel: 'Raphael',
    weekday: 'Domingo', metal: 'Ouro', color: 'Dourado e amarelo', letter: 'Resh', tarot: 'O Sol',
    domiciles: 'Leão', exaltation: 'Áries', detriment: 'Aquário', fall: 'Libra',
    orbit: 'a Terra completa sua órbita em aprox. 365,242 dias', principle: 'Identidade, vitalidade, centro, propósito e expressão',
    strengths: 'Criatividade, coerência, generosidade e liderança',
    shadow: 'Orgulho, autoritarismo, teatralidade e necessidade de validação',
  },
  {
    id: 'venus', symbol: '♀', name: 'Vênus', sephirah: 'Netzach', archangel: 'Haniel',
    weekday: 'Sexta-feira', metal: 'Cobre', color: 'Verde e rosa', letter: 'Daleth', tarot: 'A Imperatriz',
    domiciles: 'Touro e Libra', exaltation: 'Peixes', detriment: 'Escorpião e Áries', fall: 'Virgem',
    orbit: 'aprox. 224,7 dias', principle: 'Atração, valor, prazer, beleza, vínculo e conciliação',
    strengths: 'Afeto, diplomacia, criatividade, receptividade e senso estético',
    shadow: 'Complacência, ciúme, vaidade, dependência e hedonismo',
  },
  {
    id: 'mercury', symbol: '☿', name: 'Mercúrio', sephirah: 'Hod', archangel: 'Michael',
    weekday: 'Quarta-feira', metal: 'Mercúrio', color: 'Laranja e amarelo', letter: 'Beth', tarot: 'O Mago',
    domiciles: 'Gêmeos e Virgem', exaltation: 'Virgem', detriment: 'Sagitário e Peixes', fall: 'Peixes',
    orbit: 'aprox. 88 dias', principle: 'Linguagem, raciocínio, comércio, tradução e movimento',
    strengths: 'Curiosidade, adaptação, técnica, comunicação e análise',
    shadow: 'Dispersão, trapaça, nervosismo, superficialidade e excesso de cálculo',
  },
  {
    id: 'moon_p', symbol: '☽', name: 'Lua', sephirah: 'Yesod', archangel: 'Gabriel',
    weekday: 'Segunda-feira', metal: 'Prata', color: 'Prata, branco e violeta', letter: 'Gimel', tarot: 'A Sacerdotisa',
    domiciles: 'Câncer', exaltation: 'Touro', detriment: 'Capricórnio', fall: 'Escorpião',
    orbit: '27,3 dias siderais; 29,5 dias entre fases iguais', principle: 'Memória, hábito, corpo emocional, cuidado e imaginação',
    strengths: 'Intuição, acolhimento, sensibilidade, adaptação e vínculo',
    shadow: 'Oscilação, regressão, apego, projeção e reatividade',
  },
];

planetProfiles.forEach((planet) => add(planet.id, {
  title: `${planet.symbol} ${planet.name}`,
  subtitle: planet.principle,
  description: `Na astrologia tradicional, ${planet.name} simboliza ${planet.principle.toLowerCase()}. Na Cabala hermética corresponde a ${planet.sephirah}, sob a regência de ${planet.archangel}.`,
  highlights: [
    `Expressão construtiva: ${planet.strengths}.`,
    `Possível desequilíbrio: ${planet.shadow}.`,
  ],
  associations: {
    Sephirah: planet.sephirah,
    Arcanjo: planet.archangel,
    Dia: planet.weekday,
    Metal: planet.metal,
    Cores: planet.color,
    'Letra hebraica': planet.letter,
    'Arcano maior': planet.tarot,
    Domicílio: planet.domiciles,
    Exaltação: planet.exaltation,
    Detrimento: planet.detriment,
    Queda: planet.fall,
    'Ciclo astronômico': planet.orbit,
  },
  sections: [
    {
      title: 'Astrologia',
      paragraphs: [
        `${planet.name} encontra maior familiaridade simbólica em ${planet.domiciles} e é tradicionalmente exaltado em ${planet.exaltation}.`,
        `Dignidade não significa “bom” e debilidade não significa “mau”: são linguagens para descrever facilidade, tensão e contexto de expressão.`,
      ],
    },
    {
      title: 'Cabala e magia planetária',
      paragraphs: [
        `A cadeia ${planet.name} → ${planet.sephirah} → ${planet.archangel} conecta a esfera celeste a uma função da Árvore da Vida.`,
        `O dia, metal, cor e arcano são correspondências contemplativas históricas, não relações causais demonstradas pela ciência.`,
      ],
    },
    {
      title: 'Astronomia',
      paragraphs: [
        `${planet.name}: ${planet.orbit}. A astronomia descreve o corpo ou ciclo físico; a astrologia e a Cabala trabalham com seu uso simbólico.`,
      ],
    },
  ],
  sources: [sources.agrippa, sources.agrippaPlanets, sources.nasa],
}));

const zodiacProfiles = [
  ['aries', '♈', 'Áries', 'Fogo', 'Cardinal', 'Ativa', 'Marte', '', '1ª', 'O Imperador', 'Heh', 'Malchidael', 'Cabeça e face', '21 mar – 19 abr', 'iniciar, competir, afirmar', 'coragem, franqueza e impulso pioneiro', 'pressa, confronto e egocentrismo'],
  ['taurus', '♉', 'Touro', 'Terra', 'Fixa', 'Receptiva', 'Vênus', '', '2ª', 'O Hierofante', 'Vav', 'Asmodel', 'Pescoço e garganta', '20 abr – 20 mai', 'estabilizar, cultivar, conservar', 'constância, sensualidade e confiabilidade', 'teimosia, posse e resistência à mudança'],
  ['gemini', '♊', 'Gêmeos', 'Ar', 'Mutável', 'Ativa', 'Mercúrio', '', '3ª', 'Os Amantes', 'Zayin', 'Ambriel', 'Braços, mãos e pulmões', '21 mai – 20 jun', 'conectar, perguntar, traduzir', 'curiosidade, versatilidade e comunicação', 'dispersão, duplicidade e superficialidade'],
  ['cancer', '♋', 'Câncer', 'Água', 'Cardinal', 'Receptiva', 'Lua', '', '4ª', 'O Carro', 'Cheth', 'Muriel', 'Peito e estômago', '21 jun – 22 jul', 'nutrir, proteger, pertencer', 'memória, cuidado e percepção emocional', 'defensividade, apego e oscilação'],
  ['leo', '♌', 'Leão', 'Fogo', 'Fixa', 'Ativa', 'Sol', '', '5ª', 'A Força', 'Teth', 'Verchiel', 'Coração e coluna', '23 jul – 22 ago', 'criar, irradiar, liderar', 'generosidade, lealdade e expressão', 'orgulho, dramatização e centralização'],
  ['virgo', '♍', 'Virgem', 'Terra', 'Mutável', 'Receptiva', 'Mercúrio', '', '6ª', 'O Eremita', 'Yod', 'Hamaliel', 'Intestinos e digestão', '23 ago – 22 set', 'analisar, aperfeiçoar, servir', 'discernimento, habilidade e precisão', 'crítica, ansiedade e perfeccionismo'],
  ['libra', '♎', 'Libra', 'Ar', 'Cardinal', 'Ativa', 'Vênus', '', '7ª', 'A Justiça', 'Lamed', 'Zuriel', 'Rins e região lombar', '23 set – 22 out', 'equilibrar, relacionar, negociar', 'diplomacia, estética e reciprocidade', 'indecisão, agradabilidade excessiva e dependência'],
  ['scorpio', '♏', 'Escorpião', 'Água', 'Fixa', 'Receptiva', 'Marte', 'Plutão', '8ª', 'A Morte', 'Nun', 'Barchiel', 'Órgãos reprodutivos e eliminação', '23 out – 21 nov', 'aprofundar, transformar, regenerar', 'intensidade, lealdade e poder de recuperação', 'controle, obsessão e ressentimento'],
  ['sagittarius', '♐', 'Sagitário', 'Fogo', 'Mutável', 'Ativa', 'Júpiter', '', '9ª', 'A Temperança', 'Samekh', 'Advachiel', 'Quadris e coxas', '22 nov – 21 dez', 'explorar, compreender, ampliar', 'fé, humor, síntese e aventura', 'exagero, dogmatismo e imprudência'],
  ['capricorn', '♑', 'Capricórnio', 'Terra', 'Cardinal', 'Receptiva', 'Saturno', '', '10ª', 'O Diabo', 'Ayin', 'Hanael', 'Joelhos, ossos e pele', '22 dez – 19 jan', 'estruturar, realizar, responsabilizar', 'ambição, resistência e estratégia', 'frieza, dureza e identificação com status'],
  ['aquarius', '♒', 'Aquário', 'Ar', 'Fixa', 'Ativa', 'Saturno', 'Urano', '11ª', 'A Estrela', 'Tzaddi', 'Cambiel', 'Tornozelos e circulação', '20 jan – 18 fev', 'inovar, sistematizar, coletivizar', 'independência, visão social e inventividade', 'distanciamento, rebeldia automática e rigidez ideológica'],
  ['pisces', '♓', 'Peixes', 'Água', 'Mutável', 'Receptiva', 'Júpiter', 'Netuno', '12ª', 'A Lua', 'Qoph', 'Pés e sistema linfático', '19 fev – 20 mar', 'imaginar, dissolver, compadecer', 'empatia, inspiração e sensibilidade espiritual', 'evasão, confusão e limites frágeis'],
];

const decanCards = [
  ['2 de Bastões', '3 de Bastões', '4 de Bastões'],
  ['5 de Ouros', '6 de Ouros', '7 de Ouros'],
  ['8 de Espadas', '9 de Espadas', '10 de Espadas'],
  ['2 de Copas', '3 de Copas', '4 de Copas'],
  ['5 de Bastões', '6 de Bastões', '7 de Bastões'],
  ['8 de Ouros', '9 de Ouros', '10 de Ouros'],
  ['2 de Espadas', '3 de Espadas', '4 de Espadas'],
  ['5 de Copas', '6 de Copas', '7 de Copas'],
  ['8 de Bastões', '9 de Bastões', '10 de Bastões'],
  ['2 de Ouros', '3 de Ouros', '4 de Ouros'],
  ['5 de Espadas', '6 de Espadas', '7 de Espadas'],
  ['8 de Copas', '9 de Copas', '10 de Copas'],
];

const decanPlanets = [
  ['Marte', 'Sol', 'Vênus'], ['Mercúrio', 'Lua', 'Saturno'],
  ['Júpiter', 'Marte', 'Sol'], ['Vênus', 'Mercúrio', 'Lua'],
  ['Saturno', 'Júpiter', 'Marte'], ['Sol', 'Vênus', 'Mercúrio'],
  ['Lua', 'Saturno', 'Júpiter'], ['Marte', 'Sol', 'Vênus'],
  ['Mercúrio', 'Lua', 'Saturno'], ['Júpiter', 'Marte', 'Sol'],
  ['Vênus', 'Mercúrio', 'Lua'], ['Saturno', 'Júpiter', 'Marte'],
];

zodiacProfiles.forEach((profile, signIndex) => {
  const [id, symbol, name, element, modality, polarity, ruler, modernRuler, house, tarot, letter, angel, body, dates, verbs, strengths, shadow] = profile;
  const modern = modernRuler ? `${ruler} (tradicional); ${modernRuler} (moderno)` : ruler;
  add(id, {
    title: `${symbol} ${name}`,
    subtitle: `${element} · ${modality} · polaridade ${polarity.toLowerCase()}`,
    description: `${name} combina o elemento ${element} com a modalidade ${modality.toLowerCase()}. Sua dinâmica procura ${verbs}.`,
    highlights: [
      `Potenciais: ${strengths}.`,
      `Desequilíbrios: ${shadow}.`,
    ],
    associations: {
      Elemento: element,
      Modalidade: modality,
      Polaridade: polarity,
      Regente: modern,
      'Casa associada': house,
      'Arcano maior': tarot,
      'Letra hebraica': letter,
      'Anjo do signo em Agrippa': angel,
      'Região corporal tradicional': body,
      'Período tropical aproximado': dates,
    },
    sections: [
      {
        title: 'Estrutura do signo',
        paragraphs: [
          `${element} descreve a substância simbólica do signo; a modalidade ${modality.toLowerCase()} descreve como essa energia começa, mantém ou adapta processos.`,
          `A associação com a ${house} casa é uma convenção moderna do “zodíaco natural” e não substitui a leitura das casas reais de um mapa natal.`,
        ],
      },
      {
        title: 'Três decanatos',
        items: decanCards[signIndex].map((card, index) => `${index * 10}°–${(index + 1) * 10}°: ${card}, regido por ${decanPlanets[signIndex][index]}`),
      },
      {
        title: 'Tarot e Cabala hermética',
        paragraphs: [
          `${tarot} e a letra ${letter} são atribuições da tradição hermética moderna. Agrippa registra ${angel} como inteligência associada ao signo.`,
        ],
      },
    ],
    sources: [sources.agrippa, sources.shemPaper],
  });
});

const cardEsotericTitles = [
  ['Domínio', 'Virtude estabelecida', 'Conclusão'],
  ['Dificuldade material', 'Sucesso material', 'Sucesso não realizado'],
  ['Força abreviada', 'Crueldade', 'Ruína'],
  ['Amor', 'Abundância', 'Luxo'],
  ['Conflito', 'Vitória', 'Valor'],
  ['Prudência', 'Ganho material', 'Riqueza'],
  ['Paz restaurada', 'Dor', 'Trégua'],
  ['Perda no prazer', 'Prazer', 'Êxito ilusório'],
  ['Rapidez', 'Grande força', 'Opressão'],
  ['Mudança harmoniosa', 'Obras materiais', 'Poder terreno'],
  ['Derrota', 'Sucesso conquistado', 'Esforço instável'],
  ['Êxito abandonado', 'Felicidade material', 'Êxito aperfeiçoado'],
];

const numberSephiroth = {
  2: 'Chokmah', 3: 'Binah', 4: 'Chesed', 5: 'Geburah',
  6: 'Tiphareth', 7: 'Netzach', 8: 'Hod', 9: 'Yesod', 10: 'Malkuth',
};

decanCards.forEach((cards, signIndex) => cards.forEach((card, decanIndex) => {
  const zodiac = zodiacProfiles[signIndex];
  const signName = zodiac[2];
  const element = zodiac[3];
  const planet = decanPlanets[signIndex][decanIndex];
  const number = Number(card.match(/\d+/)?.[0]);
  const degrees = `${decanIndex * 10}°–${(decanIndex + 1) * 10}° de ${signName}`;
  const firstAngel = signIndex * 6 + decanIndex * 2 + 1;
  add(`dec_${signIndex}_${decanIndex}`, {
    title: card,
    subtitle: `${cardEsotericTitles[signIndex][decanIndex]} · ${degrees}`,
    description: `Este decanato combina ${signName}, ${planet} e o ${card}. Na leitura hermética, o número ${number} relaciona a carta a ${numberSephiroth[number]}.`,
    associations: {
      Signo: signName,
      Elemento: element,
      Graus: degrees,
      'Planeta regente': planet,
      'Naipe e carta': card,
      Sephirah: numberSephiroth[number],
      'Anjos do quinário': `${firstAngel} e ${firstAngel + 1}`,
      Decanato: `${decanIndex + 1}º`,
    },
    sections: [
      {
        title: 'Síntese',
        paragraphs: [
          `${planet} modifica a expressão de ${signName} neste trecho do zodíaco, enquanto o ${card} oferece sua imagem oracular.`,
          `O título “${cardEsotericTitles[signIndex][decanIndex]}” resume uma leitura tradicional da carta, não uma previsão fixa.`,
        ],
      },
    ],
    sources: [sources.shemPaper, sources.agrippaPlanets],
  });
}));

const psalmRefs = [
  'Salmos 3:3', 'Salmos 22:19', 'Salmos 91:2', 'Salmos 6:4', 'Salmos 34:4', 'Salmos 9:11',
  'Salmos 103:8', 'Salmos 95:6', 'Salmos 25:6', 'Salmos 33:22', 'Salmos 18:46', 'Salmos 110:1',
  'Salmos 98:4', 'Salmos 9:9', 'Salmos 94:22', 'Salmos 88:1', 'Salmos 8:9', 'Salmos 35:24',
  'Salmos 40:1', 'Salmos 120:1-2', 'Salmos 31:14', 'Salmos 121:5', 'Salmos 121:8', 'Salmos 33:18',
  'Salmos 9:1', 'Salmos 119:145', 'Salmos 140:1', 'Salmos 71:12', 'Salmos 54:4', 'Salmos 71:5',
  'Salmos 71:16', 'Salmos 33:4', 'Salmos 94:11', 'Salmos 131:3', 'Salmos 116:1', 'Salmos 26:8',
  'Salmos 80:3', 'Salmos 91:9', 'Salmos 30:10', 'Salmos 88:14', 'Salmos 120:2', 'Salmos 121:7',
  'Salmos 88:13', 'Salmos 119:108', 'Salmos 94:18', 'Salmos 145:9', 'Salmos 92:5', 'Salmos 98:2',
  'Salmos 145:3', 'Salmos 145:8', 'Salmos 104:31', 'Salmos 7:17', 'Salmos 119:75', 'Salmos 103:19',
  'Salmos 102:12', 'Salmos 145:14', 'Salmos 115:11', 'Salmos 6:3', 'Salmos 113:3', 'Salmos 145:17',
  'Salmos 113:2', 'Salmos 119:159', 'Salmos 100:2', 'Salmos 33:18', 'Salmos 90:13', 'Salmos 38:21',
  'Salmos 37:4', 'Salmos 106:1', 'Salmos 16:5', 'Gênesis 1:1', 'Salmos 109:30', 'Salmos 116:7',
];

const ruddCounterparts = [
  'Bael', 'Agares', 'Vassago', 'Samigina', 'Marbas', 'Valefor', 'Amon', 'Barbatos',
  'Paimon', 'Buer', 'Gusion', 'Sitri', 'Beleth', 'Leraje', 'Eligos', 'Zepar',
  'Botis', 'Bathin', 'Sallos', 'Purson', 'Morax', 'Ipos', 'Aim', 'Naberius',
  'Glasya-Labolas', 'Bune', 'Ronove', 'Berith', 'Astaroth', 'Forneus', 'Foras', 'Asmoday',
  'Gaap', 'Furfur', 'Marchosias', 'Stolas', 'Phenex', 'Halphas', 'Malphas', 'Raum',
  'Focalor', 'Vepar', 'Sabnock', 'Shax', 'Vine', 'Bifrons', 'Vual', 'Haagenti',
  'Crocell', 'Furcas', 'Balam', 'Alloces', 'Caim', 'Murmur', 'Orobas', 'Gremory',
  'Ose', 'Amy', 'Orias', 'Vapula', 'Zagan', 'Valac', 'Andras', 'Haures',
  'Andrealphus', 'Kimaris', 'Amdusias', 'Belial', 'Decarabia', 'Seere', 'Dantalion', 'Andromalius',
];

const angelThemes = [
  'vontade, iniciativa e realização', 'amor, fidelidade e pacificação', 'proteção, construção e palavra honrada',
  'viagens, descoberta de adversários e iniciativa profissional', 'aprendizado, retificação e convivência pacífica',
  'luz, cura, arte e reconhecimento', 'paciência, estudo e compreensão da natureza', 'gratidão, agricultura e abundância',
  'misericórdia, reconciliação e cumprimento de promessas', 'regeneração, saúde e superação de faltas ocultas',
  'vitória, talento e proteção contra tempestades', 'refúgio interior, sonhos e discrição',
  'amizade, memória e fidelidade nos vínculos', 'justiça, liberdade e defesa dos oprimidos',
  'purificação, ciência e integridade moral', 'lealdade, coragem e liderança responsável',
  'revelação por sonhos, música e filosofia', 'verdade, justiça e auxílio rápido',
  'memória, inteligência e resignação consciente', 'vocação, ética e disciplina espiritual',
  'matemática, astronomia e superação de enganos', 'renome, comércio, diplomacia e viagens',
  'plantas medicinais, coragem e segurança no caminho', 'proteção, misericórdia e verdade',
  'sabedoria, mistérios e contemplação', 'política, diplomacia e busca imparcial da verdade',
  'propagação do conhecimento, cultura e libertação', 'saúde, longevidade e prevenção de acidentes',
  'libertação, zelo e defesa da verdade', 'paciência, fecundidade e ciências da vida',
  'agricultura, matemática, geometria e talento prático', 'justiça, memória e eloquência',
  'discernimento de deslealdades e organização', 'calma, obediência consciente e confiança',
  'reconciliação, heranças e acordos', 'trabalho, subsistência e libertação de acusações',
  'coragem, ciência, arte e segredos da natureza', 'ritual, integridade e proteção contra fraude',
  'cura, longevidade e vínculos familiares', 'consolo, literatura, arte e libertação',
  'missão, coragem moral e dedicação', 'ordem, estratégia, viagens e percepção de conspirações',
  'prosperidade, libertação e valor', 'coragem, aprendizagem e êxito em empreendimentos úteis',
  'motivação, recuperação e elevação dos abatidos', 'revelação, natureza e descoberta do oculto',
  'contemplação, justiça e conhecimento secreto', 'paz conjugal, fecundidade e inspiração',
  'elevação, generosidade, literatura e diplomacia', 'eloquência, justiça, decisão e consolo',
  'medicina, física, química e investigação', 'resiliência, trabalho, viagem e libertação',
  'meditação, abstração e conhecimento superior', 'legitimidade, longevidade, escrita e reputação',
  'moral, boas obras e compensação', 'fortuna, modéstia, filosofia e realização de pedidos',
  'estratégia, liderança e prosperidade', 'força mental, cura e trabalho com metais',
  'livros, finanças, fecundidade e aprendizagem', 'reparação, saúde psíquica e longevidade',
  'amizade, afinidade e viagem', 'sabedoria, retiro, filosofia e serenidade',
  'comércio, comunicação, engenho e recuperação', 'escrita, ensino, oratória e proteção',
  'oceanos, fontes, navegação e sabedoria', 'sonhos, serenidade, vegetação e equilíbrio',
  'transformação, consolação e ciências ocultas', 'saúde, agricultura e fecundidade',
  'restituição, objetos perdidos e investigação', 'alquimia, regeneração e progresso espiritual',
  'proteção, coragem e libertação da opressão', 'conclusão, renascimento, medicina e longevidade',
];

const angelSegments = ringStructure.find((ring) => ring.ringId === 'angels').segments;

angelSegments.forEach((segment, index) => {
  const number = index + 1;
  const signIndex = Math.floor(index / 6);
  const withinSign = index % 6;
  const startDegree = withinSign * 5;
  const endDegree = startDegree + 5;
  const sign = zodiacProfiles[signIndex];
  const decanIndex = Math.floor(withinSign / 2);
  const card = decanCards[signIndex][decanIndex];
  const planet = decanPlanets[signIndex][decanIndex];
  const sphereIndex = Math.floor(index / 8);
  const sphere = sphereProfiles[sphereIndex];
  const pair = number % 2 ? number + 1 : number - 1;
  const quinance = number % 2 ? 'primeira quinância do decanato' : 'segunda quinância do decanato';
  const name = segment.subLabel
    .toLowerCase()
    .replace(/(^|-)(\p{L})/gu, (_, prefix, letter) => `${prefix}${letter.toUpperCase()}`);
  const gematria = buildAngelGematria(segment, name);

  add(segment.id, {
    title: `${number}. ${name}`,
    subtitle: angelThemes[index],
    description: `${name} é um dos 72 nomes angélicos formados, na tradição cabalística e cristã cabalista, a partir de Êxodo 14:19-21. Seu tríplice ${segment.hebrew} ocupa ${startDegree}°–${endDegree}° de ${sign[2]}.`,
    psalm: {
      reference: psalmRefs[index],
      hebrewReference: angelScripture[segment.id]?.hebrewReference,
      hebrew: angelScripture[segment.id]?.hebrew,
      transliteration: transliterateHebrew(angelScripture[segment.id]?.hebrew),
      text: angelScripture[segment.id]?.text,
      source: scriptureSource.label,
      hebrewSource: hebrewScriptureSource.label,
      title: `Salmo tradicional de ${name}`,
      note: `Este é o verso salmódico tradicionalmente associado a ${name} nas tabelas do Shem HaMephorash. Use a referência para leitura, oração, meditação ou estudo comparado entre traduções bíblicas.`,
      meditation: `Tema de contemplação: ${angelThemes[index]}.`,
    },
    gematria,
    highlights: [
      `Campo contemplativo: ${angelThemes[index]}.`,
      `Verso tradicional: ${psalmRefs[index]}.`,
      `Gematria: tríplice ${gematria.core.value}; nome completo ${gematria.full.value}.`,
      `Par do decanato: anjo ${pair}; carta ${card}.`,
    ],
    associations: {
      Número: number,
      Nome: name,
      'Tríplice hebraico': segment.hebrew,
      Transliteração: segment.letters,
      'Gematria do tríplice': gematria.core.value,
      'Gematria do nome completo': gematria.full.value,
      Signo: sign[2],
      Graus: `${startDegree}°–${endDegree}°`,
      Quinância: quinance,
      Decanato: `${decanIndex + 1}º de ${sign[2]}`,
      'Carta do decanato': card,
      'Planeta do decanato': planet,
      Coro: sphere.choir,
      Arcanjo: sphere.archangel,
      Sephirah: sphere.sephirah,
      'Verso tradicional': psalmRefs[index],
      'Par angélico': `Anjo ${pair}`,
      'Contraparte em Thomas Rudd': ruddCounterparts[index],
    },
    sections: [
      {
        title: 'Influência tradicional',
        paragraphs: [
          `Textos esotéricos posteriores relacionam ${name} a ${angelThemes[index]}. Essa linguagem pode ser usada como tema de contemplação, oração, escrita reflexiva ou estudo histórico.`,
          `O equilíbrio desse campo pede a expressão consciente das qualidades indicadas, evitando transformar uma virtude em rigidez, fuga, domínio ou grandiosidade.`,
        ],
      },
      {
        title: 'Posição no sistema',
        paragraphs: [
          `${name} pertence ao coro dos ${sphere.choir}, associado a ${sphere.sephirah} e ao arcanjo ${sphere.archangel}. No zodíaco quinário, ocupa ${startDegree}°–${endDegree}° de ${sign[2]}.`,
          `Com o anjo ${pair}, completa o decanato de ${card}, regido por ${planet}. A associação por graus é mais precisa que calendários populares de “anjo do nascimento”, pois datas de ingresso solar variam por ano e fuso.`,
        ],
      },
      {
        title: 'Origem do nome',
        paragraphs: [
          'Os 72 tríplices são obtidos dispondo os três versículos de Êxodo 14:19-21 em direções alternadas e combinando uma letra de cada linha.',
          `As terminações que tornam o tríplice pronunciável como nome angélico foram desenvolvidas na Cabala cristã. A forma exibida na roda preserva o núcleo de três letras: ${segment.hebrew}.`,
        ],
      },
      {
        title: 'Camadas posteriores',
        paragraphs: [
          `A correspondência com ${ruddCounterparts[index]} pertence ao sistema de Thomas Rudd e à recepção goética moderna; não faz parte do texto bíblico nem da formulação judaica original dos 72 nomes.`,
        ],
      },
    ],
    sources: [sources.exodus, sources.shemPaper, sources.shemTable, hebrewScriptureSource, scriptureSource],
  });
});

const choirDescriptions = [
  ['serafins', 'Serafins', 'ardor, purificação e proximidade da fonte divina', 'primeira ordem da primeira tríade'],
  ['querubins', 'Querubins', 'conhecimento, plenitude de sabedoria e guarda do sagrado', 'segunda ordem da primeira tríade'],
  ['tronos', 'Tronos', 'estabilidade, receptividade ao juízo e contemplação', 'terceira ordem da primeira tríade'],
  ['dominacoes', 'Dominações', 'governo, liberdade interior e ordenação das funções', 'primeira ordem da segunda tríade'],
  ['potencias', 'Potências', 'coragem, contenção e resistência às forças desagregadoras', 'segunda ordem da segunda tríade'],
  ['virtudes', 'Virtudes', 'força realizadora, milagres e transmissão de potência', 'terceira ordem da segunda tríade'],
  ['principados', 'Principados', 'orientação de comunidades, povos e responsabilidades coletivas', 'primeira ordem da terceira tríade'],
  ['arcanjos', 'Arcanjos', 'mensagens de alcance coletivo e mediação de grandes tarefas', 'segunda ordem da terceira tríade'],
  ['anjos', 'Anjos', 'mensagens, cuidado e mediação mais próxima da vida humana', 'terceira ordem da terceira tríade'],
];

choirDescriptions.forEach(([id, name, functionText, triad], index) => {
  const sphere = sphereProfiles[index];
  add(id, {
    title: `${name} · ${sphere.archangel}`,
    subtitle: `${triad} — ${sphere.sephirah}`,
    description: `Na hierarquia atribuída a Pseudo-Dionísio, os ${name} representam ${functionText}. Na síntese hermética desta roda, correspondem a ${sphere.sephirah} e a ${sphere.archangel}.`,
    highlights: [
      `Função simbólica: ${functionText}.`,
      `Anjos do Shem: ${index * 8 + 1}–${index * 8 + 8}.`,
    ],
    associations: {
      Ordem: `${index + 1}ª`,
      Tríade: triad,
      Sephirah: sphere.sephirah,
      Arcanjo: sphere.archangel,
      Esfera: sphere.planet,
      'Nome divino': sphere.divineName,
      'Anjos do Shem': `${index * 8 + 1}–${index * 8 + 8}`,
      Qualidade: sphere.virtue,
    },
    sections: [
      {
        title: 'Hierarquia celeste',
        paragraphs: [
          `Os ${name} integram a ${triad}. Pseudo-Dionísio apresenta as ordens como modos de participação e transmissão da luz divina, não como uma burocracia material do céu.`,
          'A associação direta entre cada coro, uma Sephirah e um arcanjo é uma síntese posterior desenvolvida em correntes cristãs cabalistas e herméticas.',
        ],
      },
    ],
    sources: [sources.dionysius, sources.agrippa, sources.shemTable],
  });
});

export const contentData = content;

export function getContent(id) {
  return contentData[id] || {
    title: id.replace(/_/g, ' ').toUpperCase(),
    subtitle: 'Conteúdo em preparação',
    description: 'Este segmento ainda não possui uma ficha editorial.',
    associations: { Status: 'Pendente', Chave: id },
    sources: [],
    traditionNote,
  };
}
