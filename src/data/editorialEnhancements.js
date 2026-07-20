const SEPHIRAH_ESSENCES = {
  Kether: 'a unidade e a possibilidade ainda não diferenciada',
  Chokmah: 'o impulso vivo da sabedoria',
  Binah: 'a compreensão que delimita e dá forma',
  Chesed: 'a expansão ordenadora, generosa e estável',
  Geburah: 'o limite, o corte e a força corretiva',
  Tiphareth: 'a identidade solar capaz de integrar opostos',
  Netzach: 'o desejo, o afeto e a imaginação criativa',
  Hod: 'a linguagem, a análise e a organização simbólica',
  Yesod: 'o campo lunar das imagens, sonhos e automatismos',
  Malkuth: 'a experiência concreta, corporal e material',
};

export const SEPHIRAH_BIBLICAL_OCCURRENCES = {
  arc_metatron: {
    term: 'כתר',
    translation: 'coroa',
    occurrences: [
      {
        reference: 'Ester 1:11',
        excerpt: 'כֶּתֶר מַלְכוּת — coroa real',
        context: 'A coroa de Vasti é um emblema régio concreto. A leitura cabalística de Kether como primeira Sephirah é posterior a esse uso lexical.',
        url: 'https://www.sefaria.org/Esther.1.11',
      },
      {
        reference: 'Ester 2:17',
        excerpt: 'וַיָּשֶׂם כֶּתֶר־מַלְכוּת בְּרֹאשָׁהּ — pôs a coroa real sobre sua cabeça',
        context: 'A repetição no relato de Ester confirma o sentido régio e material de keter no livro.',
        url: 'https://www.sefaria.org/Esther.2.17',
      },
    ],
  },
  arc_raziel: {
    term: 'חכמה',
    translation: 'sabedoria, habilidade',
    occurrences: [
      {
        reference: 'Provérbios 3:13',
        excerpt: 'אַשְׁרֵי אָדָם מָצָא חָכְמָה — feliz quem encontrou sabedoria',
        context: 'A sabedoria é apresentada como bem desejável e modo de viver, não como posição de um diagrama.',
        url: 'https://www.sefaria.org/Proverbs.3.13',
      },
      {
        reference: 'Êxodo 31:3',
        excerpt: 'בְּחָכְמָה וּבִתְבוּנָה — com sabedoria e entendimento',
        context: 'Bezalel recebe sabedoria para o trabalho artístico do santuário; ḥokhmah também pode indicar habilidade técnica.',
        url: 'https://www.sefaria.org/Exodus.31.3',
      },
    ],
  },
  arc_tzaphkiel: {
    term: 'בינה',
    translation: 'entendimento, discernimento',
    occurrences: [
      {
        reference: '1 Crônicas 12:32',
        excerpt: 'יוֹדְעֵי בִינָה לָעִתִּים — conhecedores, com discernimento dos tempos',
        context: 'Binah descreve capacidade de compreender uma situação e agir de acordo com ela.',
        url: 'https://www.sefaria.org/I_Chronicles.12.32',
      },
      {
        reference: 'Provérbios 2:3',
        excerpt: 'לַבִּינָה תִתֵּן קוֹלֶךָ — ergueres tua voz ao entendimento',
        context: 'O poema convida o estudante a buscar entendimento ativamente, em paralelo à sabedoria.',
        url: 'https://www.sefaria.org/Proverbs.2.3',
      },
    ],
  },
  arc_tzadkiel: {
    term: 'חסד',
    translation: 'bondade, lealdade, misericórdia',
    occurrences: [
      {
        reference: 'Salmos 136:1',
        excerpt: 'כִּי לְעוֹלָם חַסְדּוֹ — pois sua bondade leal é para sempre',
        context: 'O refrão de todo o salmo celebra o ḥesed divino manifestado na criação e na história de Israel.',
        url: 'https://www.sefaria.org/Psalms.136.1',
      },
      {
        reference: 'Miqueias 6:8',
        excerpt: 'וְאַהֲבַת חֶסֶד — amar a bondade leal',
        context: 'Ḥesed aparece como exigência ética ao lado da justiça e da humildade, não apenas como atributo abstrato.',
        url: 'https://www.sefaria.org/Micah.6.8',
      },
    ],
  },
  arc_kamael: {
    term: 'גבורה',
    translation: 'força, poder, valentia',
    occurrences: [
      {
        reference: '1 Crônicas 29:11',
        excerpt: 'לְךָ ... הַגְּבוּרָה — tua é a força',
        context: 'Na oração de Davi, poder e majestade pertencem a Deus; o verso reúne vários termos depois usados na Árvore.',
        url: 'https://www.sefaria.org/I_Chronicles.29.11',
      },
      {
        reference: 'Salmos 145:11',
        excerpt: 'וּגְבוּרָתְךָ יְדַבֵּרוּ — falarão de tua força',
        context: 'A força divina é narrada por meio de feitos poderosos dentro de um salmo de louvor à realeza.',
        url: 'https://www.sefaria.org/Psalms.145.11',
      },
    ],
  },
  arc_raphael: {
    term: 'תפארת',
    translation: 'beleza, glória, esplendor',
    occurrences: [
      {
        reference: '1 Crônicas 29:11',
        excerpt: 'וְהַתִּפְאֶרֶת — e a glória',
        context: 'Tiferet integra uma sequência de louvor régio e cultual; aqui significa esplendor ou glória.',
        url: 'https://www.sefaria.org/I_Chronicles.29.11',
      },
      {
        reference: 'Isaías 60:19',
        excerpt: 'וֵאלֹהַיִךְ לְתִפְאַרְתֵּךְ — teu Deus será teu esplendor',
        context: 'Na visão de restauração de Sião, tiferet descreve beleza e honra recebidas de Deus.',
        url: 'https://www.sefaria.org/Isaiah.60.19',
      },
    ],
  },
  arc_haniel: {
    term: 'נצח',
    translation: 'permanência, perpetuidade, vitória',
    occurrences: [
      {
        reference: '1 Samuel 15:29',
        excerpt: 'נֵצַח יִשְׂרָאֵל — a Permanência/Glória de Israel',
        context: 'A expressão afirma a constância divina; traduções variam entre Glória, Força ou Eternidade de Israel.',
        url: 'https://www.sefaria.org/I_Samuel.15.29',
      },
      {
        reference: '1 Crônicas 29:11',
        excerpt: 'וְהַנֵּצַח — e a permanência/vitória',
        context: 'O termo integra a doxologia de Davi; traduções variam porque o campo semântico inclui duração, preeminência e vitória.',
        url: 'https://www.sefaria.org/I_Chronicles.29.11',
      },
    ],
  },
  arc_michael: {
    term: 'הוד',
    translation: 'majestade, esplendor',
    occurrences: [
      {
        reference: 'Jó 40:10',
        excerpt: 'הוֹד וְהָדָר תִּלְבָּשׁ — veste-te de majestade e esplendor',
        context: 'Hod pertence ao vocabulário poético da dignidade e do brilho; a associação a Mercúrio é hermética e posterior.',
        url: 'https://www.sefaria.org/Job.40.10',
      },
      {
        reference: '1 Crônicas 29:11',
        excerpt: 'וְהַהוֹד — e a majestade',
        context: 'Hod aparece junto de grandeza, força, beleza e permanência em uma fórmula de louvor.',
        url: 'https://www.sefaria.org/I_Chronicles.29.11',
      },
    ],
  },
  arc_gabriel: {
    term: 'יסוד',
    translation: 'fundamento, base',
    occurrences: [
      {
        reference: 'Provérbios 10:25',
        excerpt: 'וְצַדִּיק יְסוֹד עוֹלָם — o justo é fundamento duradouro',
        context: 'A imagem contrasta a instabilidade do perverso com a firmeza do justo.',
        url: 'https://www.sefaria.org/Proverbs.10.25',
      },
      {
        reference: 'Isaías 28:16',
        excerpt: 'יִסַּדְתִּי ... מוּסָד מוּסָּד — estabeleço ... um fundamento firme',
        context: 'O profeta usa formas da raiz Y-S-D para uma pedra de fundação testada; a imagem é arquitetônica e política.',
        url: 'https://www.sefaria.org/Isaiah.28.16',
      },
    ],
  },
  arc_sandalphon: {
    term: 'מלכות',
    translation: 'reino, realeza, soberania',
    occurrences: [
      {
        reference: 'Salmos 145:13',
        excerpt: 'מַלְכוּתְךָ מַלְכוּת כָּל־עֹלָמִים — teu reino é reino de todos os tempos',
        context: 'O salmo celebra a soberania divina como duradoura e presente em todas as gerações.',
        url: 'https://www.sefaria.org/Psalms.145.13',
      },
      {
        reference: 'Salmos 103:19',
        excerpt: 'וּמַלְכוּתוֹ בַּכֹּל מָשָׁלָה — sua soberania governa tudo',
        context: 'Malkhut designa o domínio divino universal dentro de um hino à compaixão e à realeza.',
        url: 'https://www.sefaria.org/Psalms.103.19',
      },
    ],
  },
};

const LETTER_ROWS = [
  ['Aleph', '𐤀', 'ʾ / pausa glotal; frequentemente não audível no hebraico moderno', null, 'Alef'],
  ['Beth', '𐤁', 'b com dagesh; v sem dagesh', null, 'Bet / Beit'],
  ['Gimel', '𐤂', 'g', null, 'Gimel / Gimmel'],
  ['Daleth', '𐤃', 'd', null, 'Dalet / Daleth'],
  ['Heh', '𐤄', 'h; pode marcar vogal no fim da palavra', null, 'He / Heh'],
  ['Vav', '𐤅', 'v no hebraico moderno; também marca o/u', null, 'Vav / Waw'],
  ['Zayin', '𐤆', 'z', null, 'Zayin / Zain'],
  ['Cheth', '𐤇', 'ḥ gutural; aproximação moderna: “rr” forte', null, 'Het / Heth / Cheth'],
  ['Teth', '𐤈', 't; historicamente consoante enfática', null, 'Tet / Teth'],
  ['Yod', '𐤉', 'y; também participa da marcação de i/e', null, 'Yod / Yodh'],
  ['Kaph', '𐤊', 'k com dagesh; kh sem dagesh', 'ך', 'Kaf / Kaph'],
  ['Lamed', '𐤋', 'l', null, 'Lamed'],
  ['Mem', '𐤌', 'm', 'ם', 'Mem'],
  ['Nun', '𐤍', 'n', 'ן', 'Nun'],
  ['Samekh', '𐤎', 's', null, 'Samekh / Samech'],
  ['Ayin', '𐤏', 'ʿ faríngeo; frequentemente não audível no hebraico moderno', null, 'Ayin'],
  ['Peh', '𐤐', 'p com dagesh; f sem dagesh', 'ף', 'Pe / Peh'],
  ['Tzaddi', '𐤑', 'ts', 'ץ', 'Tsadi / Tzaddi / Tzadi'],
  ['Qoph', '𐤒', 'k no hebraico moderno; historicamente q enfático', null, 'Qof / Qoph'],
  ['Resh', '𐤓', 'r; a realização varia entre comunidades', null, 'Resh'],
  ['Shin', '𐤔', 'sh com ponto à direita; s com ponto à esquerda', null, 'Shin / Sin'],
  ['Tav', '𐤕', 't; em tradições asquenazes sem dagesh pode soar s', null, 'Tav / Taw'],
];

export const LETTER_DETAILS = Object.fromEntries(LETTER_ROWS.map(
  ([name, paleo, sound, finalForm, variants]) => [name, {
    paleo,
    sound,
    finalForm,
    variants,
    philology: 'O significado tradicional do nome da letra é uma camada interpretativa. Leituras pictográficas modernas não demonstram, por si, a etimologia de palavras hebraicas.',
    paleoNote: 'O glifo usa o bloco fenício do Unicode como representação tipográfica do paleo-hebraico; formas epigráficas e manuscritas variam.',
    sourceUrl: 'https://www.unicode.org/versions/Unicode16.0.0/core-spec/chapter-10/',
  }],
));

const PSALM_THEMES = {
  3: 'confiança em meio à ameaça e restauração da dignidade',
  6: 'lamento, fragilidade e pedido de cura',
  7: 'justiça diante de acusações e perseguição',
  8: 'majestade divina e dignidade humana na criação',
  9: 'justiça, refúgio e memória dos vulneráveis',
  16: 'confiança, herança e orientação',
  18: 'livramento, força e gratidão após o perigo',
  22: 'lamento extremo que se transforma em louvor',
  25: 'orientação, perdão e confiança',
  26: 'integridade, exame de consciência e culto',
  30: 'cura, reversão do luto e agradecimento',
  31: 'refúgio, angústia e entrega confiante',
  33: 'louvor ao criador, justiça e providência',
  34: 'gratidão pelo livramento e aprendizado do temor',
  35: 'pedido de defesa contra adversários injustos',
  37: 'paciência diante da injustiça e confiança no caminho reto',
  38: 'sofrimento, culpa e súplica por presença',
  40: 'espera, resgate e disposição para cumprir a vontade divina',
  54: 'socorro diante da violência e confiança no nome divino',
  71: 'proteção ao longo da vida e esperança na velhice',
  80: 'restauração comunitária sob a imagem da videira',
  88: 'lamento sem resolução fácil e experiência de abandono',
  90: 'brevidade humana, sabedoria e compaixão',
  91: 'abrigo, confiança e proteção em meio ao perigo',
  92: 'louvor sabático, justiça e florescimento dos justos',
  94: 'apelo ao juiz divino contra a opressão',
  95: 'convite ao louvor e advertência contra a dureza de coração',
  98: 'louvor universal pela justiça e salvação',
  100: 'gratidão comunitária e pertencimento',
  102: 'aflição individual, memória de Sião e esperança duradoura',
  103: 'misericórdia, cura, justiça e soberania',
  104: 'ordem, diversidade e sustento da criação',
  106: 'confissão histórica e fidelidade apesar das falhas coletivas',
  109: 'súplica de alguém acusado e cercado por hostilidade',
  110: 'realeza, autoridade e linguagem sacerdotal',
  113: 'louvor ao Deus elevado que ergue o necessitado',
  115: 'contraste entre ídolos inertes e confiança no Deus vivo',
  116: 'gratidão por ter sido ouvido e devolvido à vida',
  119: 'amor à Torá, aprendizado e perseverança',
  120: 'pedido de paz em ambiente de mentira e conflito',
  121: 'confiança no guardião de Israel durante a jornada',
  131: 'humildade, quietude interior e esperança',
  140: 'proteção contra violência, intriga e calúnia',
  145: 'louvor alfabético à bondade, justiça e realeza divina',
};

export function buildAngelPsalmContext(psalm, item) {
  if (!psalm?.reference) return null;
  const match = psalm.reference.match(/Salmos?\s+(\d+)/i);
  const number = Number(match?.[1]);
  const isGenesis = psalm.reference.startsWith('Gênesis');
  const theme = isGenesis
    ? 'a abertura da narrativa bíblica pela criação dos céus e da terra'
    : PSALM_THEMES[number] || 'oração, memória e confiança no contexto do Saltério';
  const angelName = item.title.replace(/^\d+\.\s*/, '');
  const angelTheme = item.subtitle || item.description?.split('.')[0]?.toLowerCase();

  return {
    psalmTheme: `O texto completo trabalha ${theme}.`,
    verseContext: isGenesis
      ? 'Esta associação excepcional usa Gênesis 1:1, não um Salmo; o verso funciona como fórmula de princípio e criação.'
      : `O verso foi retirado do Salmo ${number}. Ele deve ser lido dentro do movimento completo do poema, e não como frase isolada.`,
    associationReason: `Nas tabelas modernas do Shem, a linguagem deste verso foi aproximada de ${angelName} e do tema “${angelTheme}”. A relação é tradicional e contemplativa, não uma identificação declarada pelo próprio texto bíblico.`,
    nameDistinction: `O tríplice hebraico é uma sequência de três letras combinada a partir de Êxodo 14:19–21. “${angelName}” é um nome angelizado posterior, normalmente formado com terminações teofóricas como -el ou -iah; não é a vocalização original comprovada do tríplice.`,
  };
}

export function buildBrief(item, category) {
  const description = String(item.description || '').trim();
  const firstSentence = description.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim() || description;
  const categoryGuides = {
    Anjo: 'Leia seu Salmo, regência e nome hebraico como camadas tradicionais distintas.',
    Caminho: 'Este caminho descreve uma transformação entre duas Sephiroth e compara letra, astrologia e Tarot.',
    Sephirah: 'A ficha separa o sentido hebraico da palavra de suas leituras cabalísticas e herméticas.',
    'Não-esfera': 'Daath é tratado como conhecimento ou articulação, não como uma décima primeira esfera numerada.',
  };
  return `${firstSentence} ${categoryGuides[category] || 'Use as correspondências como mapa comparativo, não como uma origem histórica única.'}`.trim();
}

export function buildPathTransformation(item) {
  const from = item.associations?.De;
  const to = item.associations?.Para;
  if (!from || !to) return null;
  return {
    from,
    to,
    text: `${item.pronunciation?.transliteration || 'Este caminho'} conduz de ${from} a ${to}, partindo de ${SEPHIRAH_ESSENCES[from] || 'uma qualidade de origem'} e chegando a ${SEPHIRAH_ESSENCES[to] || 'uma qualidade de destino'}. A transformação não apaga a esfera de partida; ela traduz sua potência para o modo de operação da esfera de chegada.`,
  };
}

const ARCANA_VISUALS = {
  'O Louco': ['figura em deslocamento', 'bastão, trouxa e animal acompanhante', 'para o alto ou adiante', 'amarelo, branco e céu claro', 'o precipício e a rosa ganham destaque no RWS; o Thoth multiplica espirais e símbolos'],
  'O Mago': ['figura de pé diante de uma mesa', 'instrumentos do ofício e gesto de mediação', 'frontal e concentrado', 'vermelho, branco e amarelo', 'o RWS explicita os quatro naipes; o Thoth enfatiza movimento mercurial'],
  'A Sacerdotisa': ['figura sentada e velada', 'livro ou rolo, colunas e crescente lunar', 'frontal e interiorizado', 'azul, branco e prata', 'o RWS acrescenta B e J, véu e Torá; o Thoth transforma a figura em sacerdotisa lunar dinâmica'],
  'A Imperatriz': ['figura feminina entronizada', 'coroa, escudo e sinais de fertilidade', 'frontal ou levemente lateral', 'verde, vermelho e dourado', 'o RWS amplia paisagem e trigo; o Thoth combina símbolos venusianos e alquímicos'],
  'O Imperador': ['soberano sentado', 'cetro, trono e emblemas de autoridade', 'frontal e firme', 'vermelho, laranja e pedra', 'o RWS introduz cabeças de carneiro; o Thoth intensifica a geometria de Áries'],
  'O Hierofante': ['autoridade religiosa entronizada', 'báculo, bênção, chaves e assistentes', 'frontal', 'vermelho, branco e dourado', 'o RWS explicita as chaves; o Thoth reorganiza a cena em torno do pentagrama e da criança'],
  'Os Enamorados': ['casal ou cena de escolha', 'figuras humanas, mensageiro celeste e árvore', 'entre si ou para a figura superior', 'verde, amarelo e azul', 'Marselha mostra escolha relacional; RWS recria um Éden; Thoth apresenta casamento alquímico'],
  'O Carro': ['condutor sob dossel ou armadura', 'carro, cetro e forças pareadas', 'frontal', 'azul, vermelho e dourado', 'o RWS substitui cavalos por esfinges; o Thoth converte o carro em veículo graálico'],
  'A Força': ['figura humana com leão', 'leão, chapéu ou símbolo do infinito', 'para o animal', 'vermelho, branco e amarelo', 'a numeração passa de XI em Marselha para VIII no RWS; Thoth renomeia como Lust'],
  'O Eremita': ['figura solitária em pé', 'lanterna, bastão e manto', 'para baixo ou para a luz', 'cinza, azul e amarelo', 'o RWS enfatiza a lanterna; o Thoth inclui espermatozoide, ovo e Cérbero'],
  'A Roda da Fortuna': ['roda central em movimento', 'criaturas, letras e eixo', 'não há olhar dominante', 'azul, laranja e dourado', 'o RWS acrescenta TORA e seres alados; o Thoth torna explícitas forças zodiacais'],
  'A Justiça': ['figura sentada com balança e espada', 'balança, lâmina e trono', 'frontal', 'vermelho, verde e dourado', 'a numeração passa de VIII em Marselha para XI no RWS; Thoth renomeia como Adjustment'],
  'O Enforcado': ['figura suspensa por um pé', 'forca, halo e pernas cruzadas', 'sereno e invertido', 'azul, vermelho e amarelo', 'o RWS acrescenta halo; o Thoth acentua água, serpente e sacrifício'],
  'A Morte': ['esqueleto ou cavaleiro', 'foice, bandeira e figuras caídas', 'em avanço', 'preto, branco e vermelho', 'Marselha frequentemente omite o título; RWS cria procissão; Thoth enfatiza dança e transformação'],
  'A Temperança': ['figura alada vertendo líquido', 'dois vasos, água e caminho', 'para o fluxo entre os vasos', 'azul, branco e vermelho', 'RWS amplia paisagem solar; Thoth renomeia como Art e funde opostos alquímicos'],
  'O Diabo': ['figura central dominante', 'correntes, pedestal, casal ou criaturas', 'frontal', 'preto, vermelho e marrom', 'RWS cita a composição dos Enamorados; Thoth enfatiza bode, espiral e potência gerativa'],
  'A Torre': ['torre atingida e figuras em queda', 'raio, coroa, chamas e alvenaria', 'movimento descendente', 'preto, vermelho e amarelo', 'o RWS dramatiza o raio; o Thoth converte a cena em explosão geométrica'],
  'A Estrela': ['figura junto à água', 'estrelas, jarros e paisagem', 'para a água ou o céu', 'azul, amarelo e verde', 'RWS acrescenta oito estrelas e íbis; Thoth amplia espirais e fluxo cósmico'],
  'A Lua': ['paisagem noturna', 'lua, torres, animais e caminho', 'para a lua ou para o caminho', 'azul, amarelo e cinza', 'RWS explicita cão, lobo e lagostim; Thoth escurece a passagem entre torres'],
  'O Sol': ['crianças ou criança sob o sol', 'raios, muro, flores e estandarte', 'frontal e aberto', 'amarelo, vermelho e laranja', 'RWS usa uma criança sobre cavalo; Thoth organiza figuras gêmeas em composição radiante'],
  'O Julgamento': ['figuras que se erguem', 'anjo, trombeta, túmulos e bandeira', 'para o alto', 'azul, branco e vermelho', 'RWS mantém a ressurreição; Thoth renomeia como Aeon e substitui a cena cristã por iconografia thelêmica'],
  'O Mundo': ['figura central em mandorla', 'coroa vegetal, bastões e quatro seres', 'frontal', 'azul, verde e violeta', 'RWS explicita os quatro seres; Thoth renomeia como Universe e amplia a malha cósmica'],
};

const THOTH_TITLE_BASE = {
  'The Fool': 'O Louco',
  'The Magus': 'O Mago',
  'The Priestess': 'A Sacerdotisa',
  'The Empress': 'A Imperatriz',
  'The Emperor': 'O Imperador',
  'The Hierophant': 'O Hierofante',
  'The Lovers': 'Os Enamorados',
  'The Chariot': 'O Carro',
  Lust: 'A Força',
  'The Hermit': 'O Eremita',
  Fortune: 'A Roda da Fortuna',
  Adjustment: 'A Justiça',
  'The Hanged Man': 'O Enforcado',
  Death: 'A Morte',
  Art: 'A Temperança',
  'The Devil': 'O Diabo',
  'The Tower': 'A Torre',
  'The Star': 'A Estrela',
  'The Moon': 'A Lua',
  'The Sun': 'O Sol',
  'The Aeon': 'O Julgamento',
  'The Universe': 'O Mundo',
};

export function buildTarotIconography(card, canonicalTitle) {
  const baseTitle = THOTH_TITLE_BASE[card.title] || canonicalTitle || card.title;
  const [posture, objects, gaze, colors, changes] = ARCANA_VISUALS[baseTitle] || [
    'figura e composição próprias deste Arcano',
    'emblemas do número, título e tradição do baralho',
    'direção a observar na imagem',
    'paleta varia conforme edição e conservação',
    'compare título, número e atribuição antes de interpretar',
  ];
  return { posture, objects, gaze, colors, changes };
}

export function buildVariationConclusion(item) {
  const attribution = item.associations?.Atribuição;
  const tarot = item.associations?.Tarot;
  if (item.categoryLabel !== 'Caminho') {
    return 'A principal diferença está na camada de interpretação: o termo ou símbolo permanece identificável, mas fontes judaicas, cristãs, astrológicas e herméticas lhe atribuem funções distintas.';
  }
  const special = {
    path_teth: 'Teth permanece ligado a Leão na Golden Dawn e no Thoth, mas o Arcano muda de Força VIII no RWS para Lust XI no Thoth; Marselha conserva La Force XI sem a mesma atribuição hebraica histórica.',
    path_lamed: 'Lamed permanece ligado a Libra na Golden Dawn e no Thoth, mas Justiça VIII em Marselha torna-se Justice XI no RWS e Adjustment VIII no Thoth.',
    path_heh: 'Golden Dawn e RWS ligam Heh ao Imperador e a Áries. Crowley preserva a carta, mas propõe a troca “Tzaddi não é a Estrela”, deslocando a letra em sua revisão do sistema.',
    path_tzaddi: 'Golden Dawn e RWS ligam Tzaddi à Estrela e a Aquário. No Thoth, Crowley propõe a troca Heh–Tzaddi, uma das divergências mais importantes do esquema.',
    path_samekh: 'Samekh permanece ligado a Sagitário nos sistemas Golden Dawn e Thoth, mas Temperança torna-se Arte, enfatizando a operação alquímica e a união consciente de opostos.',
  };
  return special[item.id] || `${item.pronunciation?.transliteration || 'A letra'} permanece associado a ${attribution} no esquema Golden Dawn e em grande parte do Thoth; o que mais varia é a iconografia e, em alguns casos, o título de ${tarot}, não a existência histórica de uma correspondência única em todas as escolas.`;
}

export function buildInverseCorrespondences(item) {
  const associations = item.associations || {};
  const entries = [];
  if (associations.Esfera || associations.Planeta) {
    const planet = associations.Esfera || associations.Planeta;
    const subject = associations.Sephirah?.split(' (')[0]
      || item.title.replace(/^\d+\.\s*/, '').split(' · ').at(-1);
    entries.push({
      label: `Como ${subject} modifica ${planet}`,
      text: `${planet} deixa de ser apenas um astro ou regência e passa a operar pelo vocabulário desta ficha: ${item.subtitle || item.description?.split('.')[0]}.`,
    });
  }
  if (associations.Atribuição && item.categoryLabel === 'Caminho') {
    entries.push({
      label: `Como o caminho modifica ${associations.Atribuição}`,
      text: `${associations.Atribuição} é lido como processo de passagem entre ${associations.De} e ${associations.Para}, enfatizando ${associations.Função || item.subtitle}.`,
    });
  }
  if (associations.Signo) {
    entries.push({
      label: `Como esta ficha colore ${associations.Signo}`,
      text: `O signo é recortado pelo grau, pelo decanato e pelo tema específico desta entrada; isso é mais preciso do que tratar todo o signo como uma qualidade uniforme.`,
    });
  }
  return entries;
}

export function buildAssociationTimeline(item) {
  const category = item.categoryLabel;
  const subject = item.title.replace(/^\d+\.\s*/, '');
  const ancient = category === 'Anjo'
    ? 'Êxodo 14:19–21 fornece os três versos usados para combinar os 72 tríplices; ainda não apresenta esta personalidade angelical.'
    : category === 'Caminho'
      ? 'O Sefer Yetzirah organiza 22 letras formativas, mas não traz o arranjo moderno completo de letras, Tarot e canais da Árvore.'
      : category === 'Sephirah'
        ? 'O termo hebraico aparece em usos bíblicos comuns; o Sefer Yetzirah fala em dez sefirot belimah sem reproduzir toda a Árvore posterior.'
        : 'As bases antigas pertencem a contextos próprios e não formam ainda a tabela hermética moderna.';
  return [
    ['Fonte judaica antiga', 'Antiguidade', ancient],
    ['Cabala medieval', 'séculos XII–XVI', `${subject} passa a integrar sistemas cabalísticos mais desenvolvidos, com vocabulários e diagramas que variam entre autores.`],
    ['Renascimento cristão', 'séculos XV–XVII', 'Autores cristãos traduzem, reorganizam e aproximam materiais cabalísticos de angelologia, filosofia e magia renascentista.'],
    ['Golden Dawn', 'fim do século XIX', 'A ordem sistematiza cores, astrologia, Tarot, letras e posições na Árvore em uma tabela operacional influente.'],
    ['Crowley e Thoth', 'século XX', 'Crowley preserva grande parte da estrutura, altera títulos e algumas atribuições e a expressa na arte de Frieda Harris.'],
    ['Síntese da Hermetika', 'presente', 'A ficha compara as camadas, sinaliza divergências e separa fonte textual, recepção histórica e proposta contemplativa.'],
  ].map(([stage, period, text]) => ({ stage, period, text }));
}

const SEPHIRAH_SPELLINGS = {
  arc_metatron: ['Kether', 'Keter'],
  arc_raziel: ['Chokmah', 'Hokhmah', 'Chochmah'],
  arc_tzaphkiel: ['Binah', 'Bina'],
  arc_tzadkiel: ['Chesed', 'Ḥesed', 'Hesed'],
  arc_kamael: ['Geburah', 'Gevurah'],
  arc_raphael: ['Tiphareth', 'Tiferet', 'Tifereth'],
  arc_haniel: ['Netzach', 'Netsaḥ', 'Netzah'],
  arc_michael: ['Hod'],
  arc_gabriel: ['Yesod', 'Yesōd'],
  arc_sandalphon: ['Malkuth', 'Malkhut', 'Malchut'],
  arc_daath: ['Daath', 'Daʿat', 'Daat'],
};

export function buildSpellingVariants(id, item) {
  if (SEPHIRAH_SPELLINGS[id]) {
    return {
      forms: SEPHIRAH_SPELLINGS[id],
      note: 'As formas refletem convenções acadêmicas, modernas e ocultistas. A grafia não muda automaticamente o termo hebraico de origem.',
    };
  }
  if (item.categoryLabel === 'Caminho') {
    const letterName = item.pronunciation?.transliteration;
    const detail = LETTER_DETAILS[letterName];
    return detail ? {
      forms: detail.variants.split(/\s*\/\s*/),
      note: 'A transliteração varia conforme idioma, tradição de pronúncia e preferência editorial.',
    } : null;
  }
  if (item.categoryLabel === 'Anjo') {
    return {
      forms: [item.title.replace(/^\d+\.\s*/, ''), item.pronunciation?.transliteration].filter(Boolean),
      note: 'A primeira forma é o nome angelizado convencional; a segunda identifica o tríplice consonantal. Elas não são equivalentes filologicamente.',
    };
  }
  return null;
}

export function buildResponsiblePractice(item) {
  const subject = item.title.replace(/^\d+\.\s*/, '');
  return {
    ...item.practice,
    prompt: item.practice.prompt?.replace(item.title, subject),
    meditation: item.practice.meditation?.replace(item.title, subject),
    integration: item.practice.integration?.replace(item.title, subject),
    objective: `Observar com atenção o tema de ${subject} e traduzi-lo em uma reflexão concreta, sem buscar previsão ou diagnóstico.`,
    duration: '5–10 minutos; encerre antes se houver desconforto.',
    journal: `Anote a imagem ou palavra que mais chamou atenção, a emoção percebida e uma ação verificável para revisar depois.`,
    disclaimer: 'Prática simbólica e educativa. Não substitui cuidado médico ou psicológico, orientação religiosa qualificada nem deve ser usada como profecia ou garantia de acontecimentos.',
  };
}

export const METHODOLOGY_SECTIONS = [
  {
    title: 'Fonte primária',
    text: 'Texto, objeto ou testemunho histórico apresentado diretamente — por exemplo, um verso do Tanakh, uma passagem do Sefer Yetzirah ou uma carta histórica preservada em acervo. A fonte é citada sem afirmar que já contenha todas as leituras posteriores.',
  },
  {
    title: 'Tradição interpretativa',
    text: 'Leitura desenvolvida por uma comunidade, comentador ou escola ao longo do tempo. Ela pode ser coerente e influente sem ser o sentido lexical mais antigo.',
  },
  {
    title: 'Correspondência hermética',
    text: 'Relação sistemática entre letra, planeta, signo, Tarot, cor, anjo ou esfera. Muitas tabelas usadas hoje foram consolidadas entre o Renascimento e as ordens ocultistas modernas.',
  },
  {
    title: 'Reconstrução histórica',
    text: 'Hipótese apoiada por comparação de textos, edições, imagens e contextos. Quando a documentação não permite certeza, a Hermetika usa linguagem de probabilidade e registra divergências.',
  },
  {
    title: 'Síntese editorial',
    text: 'Resumo produzido pela Hermetika para tornar materiais de épocas e escolas diferentes navegáveis. Não é apresentado como citação nem como doutrina de uma tradição específica.',
  },
  {
    title: 'Conteúdo contemplativo',
    text: 'Perguntas e exercícios de observação destinados ao estudo pessoal. São propostas simbólicas, não médicas, proféticas ou substitutas de acompanhamento profissional.',
  },
];

export const METHODOLOGY_SOURCES = [
  {
    label: 'Sefaria — Tanakh e Sefer Yetzirah',
    url: 'https://www.sefaria.org/texts/Tanakh',
  },
  {
    label: 'Unicode — escrita fenícia e paleo-hebraica',
    url: 'https://www.unicode.org/versions/Unicode16.0.0/core-spec/chapter-10/',
  },
  {
    label: 'British Museum — acervo histórico de Tarot',
    url: 'https://www.britishmuseum.org/collection/object/P_1904-0511-47-1-78',
  },
  {
    label: 'Ilanot — mapas cabalísticos históricos',
    url: 'https://ilanot.haifa.ac.il/site/',
  },
];
