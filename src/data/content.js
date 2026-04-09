// content.js — Full content data for all Lamen segments
// Built compactly via data arrays then expanded into contentData object.

const c = {};

// ─── ELEMENTS ────────────────────────────────────────────────────────────────
c.fire  = { title:"Elemento Fogo 🜂", subtitle:"Vontade · Energia · Transformação", description:"O Fogo representa a vontade pura, a energia criativa e o poder de transformação. Relaciona-se ao naipe de Bastões no Tarô e ao mundo de Atziluth na Árvore da Vida.", associations:{ Direção:"Sul", Cores:"Vermelho, Dourado", Arcanjo:"Michael", Qualidades:"Quente e Seco" }};
c.water = { title:"Elemento Água 🜄", subtitle:"Emoção · Intuição · Inconsciente", description:"A Água simboliza os reinos profundos da intuição e emoção. Corresponde ao naipe de Copas, a Briah na Cabala e às profundezas psíquicas.", associations:{ Direção:"Oeste", Cores:"Azul, Verde-mar", Arcanjo:"Gabriel", Qualidades:"Frio e Úmido" }};
c.air   = { title:"Elemento Ar 🜁", subtitle:"Intelecto · Comunicação · Razão", description:"O Ar governa o intelecto, a comunicação e o pensamento lógico. Relaciona-se ao naipe de Espadas e ao mundo de Yetzirah.", associations:{ Direção:"Leste", Cores:"Amarelo, Violeta", Arcanjo:"Raphael", Qualidades:"Quente e Úmido" }};
c.earth = { title:"Elemento Terra 🜃", subtitle:"Matéria · Estabilidade · Manifestação", description:"A Terra representa o mundo físico, a estabilidade e a manifestação concreta. Corresponde ao naipe de Ouros e ao mundo de Assiah.", associations:{ Direção:"Norte", Cores:"Verde, Marrom", Arcanjo:"Uriel", Qualidades:"Frio e Seco" }};

// ─── PLANETS ─────────────────────────────────────────────────────────────────
const planets = [
  ["saturn","♄ Saturno","Binah","Restrição · Tempo · Disciplina","Saturno governa a estrutura, os limites e a sabedoria através da experiência. Na Árvore da Vida, corresponde à Sephirah Binah.",{Sephirah:"Binah",Metal:"Chumbo",Dia:"Sábado",Cor:"Negro/Índigo"}],
  ["jupiter","♃ Júpiter","Chesed","Expansão · Abundância · Misericórdia","Júpiter é o grande benéfico, governando a expansão, a generosidade e a visão filosófica. Corresponde a Chesed.",{Sephirah:"Chesed",Metal:"Estanho",Dia:"Quinta-feira",Cor:"Azul"}],
  ["mars","♂ Marte","Geburah","Força · Coragem · Conflito","Marte representa a energia combativa, a coragem e a força de ação. Corresponde a Geburah na Árvore da Vida.",{Sephirah:"Geburah",Metal:"Ferro",Dia:"Terça-feira",Cor:"Vermelho"}],
  ["sun_p","☉ Sol","Tiphareth","Consciência · Beleza · Harmonia","O Sol é o centro da consciência, representando beleza, equilíbrio e iluminação espiritual. Corresponde a Tiphareth.",{Sephirah:"Tiphareth",Metal:"Ouro",Dia:"Domingo",Cor:"Dourado"}],
  ["venus","♀ Vênus","Netzach","Amor · Arte · Desejo","Vênus governa o amor, a beleza artística e os prazeres sensoriais. Corresponde a Netzach na Árvore da Vida.",{Sephirah:"Netzach",Metal:"Cobre",Dia:"Sexta-feira",Cor:"Verde"}],
  ["mercury","☿ Mercúrio","Hod","Comunicação · Magia · Intelecto","Mercúrio é o mensageiro, regendo a comunicação, a magia e a habilidade intelectual. Corresponde a Hod.",{Sephirah:"Hod",Metal:"Mercúrio",Dia:"Quarta-feira",Cor:"Laranja"}],
  ["moon_p","☽ Lua","Yesod","Inconsciente · Sonhos · Fundação","A Lua governa o inconsciente, os sonhos e os ciclos naturais. Corresponde a Yesod, o fundamento.",{Sephirah:"Yesod",Metal:"Prata",Dia:"Segunda-feira",Cor:"Violeta"}],
];
planets.forEach(([id,t,seph,sub,desc,assoc])=>{ c[id]={title:t,subtitle:sub,description:desc,associations:assoc}; });

// ─── 22 HEBREW LETTERS / TAROT ──────────────────────────────────────────────
const hebrewTarot = [
  ["fool","א Aleph","0 · O Louco","Ar","O Louco representa o início absoluto, o espírito livre antes da manifestação. Aleph é o sopro vital, o princípio do ar.",{Letra:"א Aleph",Valor:"1",Tipo:"Mãe",Elemento:"Ar",Caminho:"Kether → Chokmah"}],
  ["magician","ב Beth","1 · O Mago","Mercúrio","O Mago canaliza a vontade divina para a manifestação. Beth é a casa do espírito.",{Letra:"ב Beth",Valor:"2",Tipo:"Dupla",Planeta:"Mercúrio",Caminho:"Kether → Binah"}],
  ["priestess","ג Gimel","2 · A Sacerdotisa","Lua","A Sacerdotisa guarda os mistérios do inconsciente. Gimel é o camelo que atravessa o abismo.",{Letra:"ג Gimel",Valor:"3",Tipo:"Dupla",Planeta:"Lua",Caminho:"Kether → Tiphareth"}],
  ["empress","ד Daleth","3 · A Imperatriz","Vênus","A Imperatriz é a mãe fértil, abundância e natureza. Daleth é a porta da criação.",{Letra:"ד Daleth",Valor:"4",Tipo:"Dupla",Planeta:"Vênus",Caminho:"Chokmah → Binah"}],
  ["emperor","ה He","4 · O Imperador","Áries","O Imperador é autoridade, estrutura e lei. He é a janela para o divino.",{Letra:"ה He",Valor:"5",Tipo:"Simples",Signo:"Áries ♈",Caminho:"Chokmah → Tiphareth"}],
  ["hierophant","ו Vav","5 · O Hierofante","Touro","O Hierofante é o mestre espiritual, tradição e sabedoria sagrada. Vav é o prego que une.",{Letra:"ו Vav",Valor:"6",Tipo:"Simples",Signo:"Touro ♉",Caminho:"Chokmah → Chesed"}],
  ["lovers","ז Zayin","6 · Os Amantes","Gêmeos","Os Amantes representam escolha, dualidade e união. Zayin é a espada da discriminação.",{Letra:"ז Zayin",Valor:"7",Tipo:"Simples",Signo:"Gêmeos ♊",Caminho:"Binah → Tiphareth"}],
  ["chariot","ח Cheth","7 · O Carro","Câncer","O Carro representa triunfo da vontade e movimento direcionado. Cheth é a cerca protetora.",{Letra:"ח Cheth",Valor:"8",Tipo:"Simples",Signo:"Câncer ♋",Caminho:"Binah → Geburah"}],
  ["strength","ט Teth","8 · A Força","Leão","A Força domina o instinto pela consciência superior. Teth é a serpente da sabedoria.",{Letra:"ט Teth",Valor:"9",Tipo:"Simples",Signo:"Leão ♌",Caminho:"Chesed → Geburah"}],
  ["hermit","י Yod","9 · O Eremita","Virgem","O Eremita busca a luz interior na solidão. Yod é a mão de Deus, a semente primordial.",{Letra:"י Yod",Valor:"10",Tipo:"Simples",Signo:"Virgem ♍",Caminho:"Chesed → Tiphareth"}],
  ["wheel","כ Kaph","10 · A Roda","Júpiter","A Roda da Fortuna gira os ciclos do destino. Kaph é a palma da mão que recebe.",{Letra:"כ Kaph",Valor:"20",Tipo:"Dupla",Planeta:"Júpiter",Caminho:"Chesed → Netzach"}],
  ["justice","ל Lamed","11 · A Justiça","Libra","A Justiça mantém o equilíbrio cósmico. Lamed é o aguilhão que impulsiona o aprendizado.",{Letra:"ל Lamed",Valor:"30",Tipo:"Simples",Signo:"Libra ♎",Caminho:"Geburah → Tiphareth"}],
  ["hanged","מ Mem","12 · O Enforcado","Água","O Enforcado é a rendição e a visão invertida. Mem é a água primordial da criação.",{Letra:"מ Mem",Valor:"40",Tipo:"Mãe",Elemento:"Água",Caminho:"Geburah → Hod"}],
  ["death","נ Nun","13 · A Morte","Escorpião","A Morte é transformação radical e renascimento. Nun é o peixe que nada nas profundezas.",{Letra:"נ Nun",Valor:"50",Tipo:"Simples",Signo:"Escorpião ♏",Caminho:"Tiphareth → Netzach"}],
  ["temperance","ס Samekh","14 · Temperança","Sagitário","Temperança é a arte da alquimia interior. Samekh é o suporte e a proteção divina.",{Letra:"ס Samekh",Valor:"60",Tipo:"Simples",Signo:"Sagitário ♐",Caminho:"Tiphareth → Yesod"}],
  ["devil","ע Ayin","15 · O Diabo","Capricórnio","O Diabo revela as ilusões materiais. Ayin é o olho que vê além da matéria.",{Letra:"ע Ayin",Valor:"70",Tipo:"Simples",Signo:"Capricórnio ♑",Caminho:"Tiphareth → Hod"}],
  ["tower","פ Pe","16 · A Torre","Marte","A Torre destrói estruturas falsas. Pe é a boca que pronuncia o verbo destruidor e criador.",{Letra:"פ Pe",Valor:"80",Tipo:"Dupla",Planeta:"Marte",Caminho:"Netzach → Hod"}],
  ["star","צ Tzaddi","17 · A Estrela","Aquário","A Estrela é esperança e inspiração cósmica. Tzaddi é o anzol que pesca a verdade.",{Letra:"צ Tzaddi",Valor:"90",Tipo:"Simples",Signo:"Aquário ♒",Caminho:"Netzach → Yesod"}],
  ["moon","ק Qoph","18 · A Lua","Peixes","A Lua ilumina os caminhos do inconsciente. Qoph é a parte posterior da cabeça, o oculto.",{Letra:"ק Qoph",Valor:"100",Tipo:"Simples",Signo:"Peixes ♓",Caminho:"Netzach → Malkuth"}],
  ["sun","ר Resh","19 · O Sol","Sol","O Sol brilha com consciência plena e vitalidade. Resh é a cabeça, o princípio solar.",{Letra:"ר Resh",Valor:"200",Tipo:"Dupla",Planeta:"Sol",Caminho:"Hod → Yesod"}],
  ["judgement","ש Shin","20 · O Julgamento","Fogo","O Julgamento é o despertar final do espírito. Shin é o dente de fogo, a trindade divina.",{Letra:"ש Shin",Valor:"300",Tipo:"Mãe",Elemento:"Fogo",Caminho:"Hod → Malkuth"}],
  ["world","ת Tav","21 · O Mundo","Saturno","O Mundo é a realização completa, a dança cósmica. Tav é a cruz, a marca final da criação.",{Letra:"ת Tav",Valor:"400",Tipo:"Dupla",Planeta:"Saturno",Caminho:"Yesod → Malkuth"}],
];
hebrewTarot.forEach(([id,t,sub,elem,desc,assoc])=>{ c[id]={title:t,subtitle:sub,description:desc,associations:assoc}; });

// ─── ZODIAC ──────────────────────────────────────────────────────────────────
const zodiac = [
  ["aries","♈ Áries","Fogo Cardinal",{Elemento:"Fogo",Planeta:"Marte",Casa:"1ª",Qualidade:"Cardinal",Letras:"ה He / פ Pe / ו Vav"}],
  ["taurus","♉ Touro","Terra Fixo",{Elemento:"Terra",Planeta:"Vênus",Casa:"2ª",Qualidade:"Fixo",Letras:"ו Vav / ר Resh / ע Ayin"}],
  ["gemini","♊ Gêmeos","Ar Mutável",{Elemento:"Ar",Planeta:"Mercúrio",Casa:"3ª",Qualidade:"Mutável",Letras:"ז Zayin / ק Qoph / ה He"}],
  ["cancer","♋ Câncer","Água Cardinal",{Elemento:"Água",Planeta:"Lua",Casa:"4ª",Qualidade:"Cardinal",Letras:"ח Cheth / ש Shin / ו Vav"}],
  ["leo","♌ Leão","Fogo Fixo",{Elemento:"Fogo",Planeta:"Sol",Casa:"5ª",Qualidade:"Fixo",Letras:"ט Teth / ת Tav / ז Zayin"}],
  ["virgo","♍ Virgem","Terra Mutável",{Elemento:"Terra",Planeta:"Mercúrio",Casa:"6ª",Qualidade:"Mutável",Letras:"י Yod / א Aleph / ח Cheth"}],
  ["libra","♎ Libra","Ar Cardinal",{Elemento:"Ar",Planeta:"Vênus",Casa:"7ª",Qualidade:"Cardinal",Letras:"ל Lamed / ב Beth / ט Teth"}],
  ["scorpio","♏ Escorpião","Água Fixo",{Elemento:"Água",Planeta:"Marte/Plutão",Casa:"8ª",Qualidade:"Fixo",Letras:"נ Nun / ג Gimel / י Yod"}],
  ["sagittarius","♐ Sagitário","Fogo Mutável",{Elemento:"Fogo",Planeta:"Júpiter",Casa:"9ª",Qualidade:"Mutável",Letras:"ס Samekh / ד Daleth / ל Lamed"}],
  ["capricorn","♑ Capricórnio","Terra Cardinal",{Elemento:"Terra",Planeta:"Saturno",Casa:"10ª",Qualidade:"Cardinal",Letras:"ע Ayin / ה He / נ Nun"}],
  ["aquarius","♒ Aquário","Ar Fixo",{Elemento:"Ar",Planeta:"Saturno/Urano",Casa:"11ª",Qualidade:"Fixo",Letras:"צ Tzaddi / ו Vav / ס Samekh"}],
  ["pisces","♓ Peixes","Água Mutável",{Elemento:"Água",Planeta:"Júpiter/Netuno",Casa:"12ª",Qualidade:"Mutável",Letras:"ק Qoph / ז Zayin / ע Ayin"}],
];
zodiac.forEach(([id,t,sub,assoc])=>{ c[id]={title:t,subtitle:sub,description:`O signo de ${t.split(' ')[1]} é ${sub}. Governa a ${assoc.Casa} casa astrológica e é regido por ${assoc.Planeta}.`,associations:assoc}; });

// ─── 72 ANGELS ───────────────────────────────────────────────────────────────
const angelsData = [
  [1,"Vehuiah","והויה","Serafins","Metatron","0°-5° Áries","Vontade · Iniciativa"],
  [2,"Jeliel","ילייל","Serafins","Metatron","5°-10° Áries","Amor · Fidelidade"],
  [3,"Sitael","סיטאל","Serafins","Metatron","10°-15° Áries","Construção · Superação"],
  [4,"Elemiah","עלמיה","Serafins","Metatron","15°-20° Áries","Poder Divino · Viagem"],
  [5,"Mahasiah","מהשיה","Serafins","Metatron","20°-25° Áries","Retificação · Harmonia"],
  [6,"Lelahel","ללהל","Serafins","Metatron","25°-30° Áries","Luz · Cura"],
  [7,"Achaiah","אכאיה","Querubins","Raziel","0°-5° Touro","Paciência · Verdade"],
  [8,"Cahetel","כהתל","Querubins","Raziel","5°-10° Touro","Bênção · Agricultura"],
  [9,"Haziel","הזיאל","Querubins","Raziel","10°-15° Touro","Misericórdia · Perdão"],
  [10,"Aladiah","אלדיה","Querubins","Raziel","15°-20° Touro","Graça · Regeneração"],
  [11,"Lauviah I","לאוויה","Querubins","Raziel","20°-25° Touro","Vitória · Revelação"],
  [12,"Hahahiah","ההעיה","Querubins","Raziel","25°-30° Touro","Refúgio · Sonhos"],
  [13,"Yesalel","יזאלאל","Tronos","Binael","0°-5° Gêmeos","Fidelidade · Justiça"],
  [14,"Mebahel","מבהל","Tronos","Binael","5°-10° Gêmeos","Verdade · Liberdade"],
  [15,"Hariel","הריאל","Tronos","Binael","10°-15° Gêmeos","Purificação · Fé"],
  [16,"Hekamiah","הקמיה","Tronos","Binael","15°-20° Gêmeos","Lealdade · Liderança"],
  [17,"Lauviah II","לאויה","Tronos","Binael","20°-25° Gêmeos","Revelação · Alegria"],
  [18,"Caliel","כלאל","Tronos","Binael","25°-30° Gêmeos","Justiça Divina"],
  [19,"Leuviah","לוויה","Dominações","Tzadkiel","0°-5° Câncer","Memória · Inteligência"],
  [20,"Pahaliah","פהליה","Dominações","Tzadkiel","5°-10° Câncer","Redenção · Moral"],
  [21,"Nelchael","נלכאל","Dominações","Tzadkiel","10°-15° Câncer","Aprendizado · Ciência"],
  [22,"Yeiayel","ייייאל","Dominações","Tzadkiel","15°-20° Câncer","Fama · Renome"],
  [23,"Melahel","מלהל","Dominações","Tzadkiel","20°-25° Câncer","Cura · Plantas"],
  [24,"Haheuiah","ההויה","Dominações","Tzadkiel","25°-30° Câncer","Proteção · Exílio"],
  [25,"Nith-Haiah","נתהיה","Potências","Kamael","0°-5° Leão","Sabedoria · Magia"],
  [26,"Haaiah","האאיה","Potências","Kamael","5°-10° Leão","Política · Diplomacia"],
  [27,"Yeratel","יראתאל","Potências","Kamael","10°-15° Leão","Luz · Civilização"],
  [28,"Seheiah","שאהיה","Potências","Kamael","15°-20° Leão","Longevidade · Saúde"],
  [29,"Reiyel","ריייאל","Potências","Kamael","20°-25° Leão","Libertação · Verdade"],
  [30,"Omael","אומאל","Potências","Kamael","25°-30° Leão","Fertilidade · Paciência"],
  [31,"Lecabel","לכבאל","Virtudes","Raphael","0°-5° Virgem","Talento · Agricultura"],
  [32,"Vasariah","וסריה","Virtudes","Raphael","5°-10° Virgem","Justiça · Generosidade"],
  [33,"Yehuiah","יהויה","Virtudes","Raphael","10°-15° Virgem","Subordinação · Hierarquia"],
  [34,"Lehahiah","להחיה","Virtudes","Raphael","15°-20° Virgem","Obediência · Calma"],
  [35,"Chavakiah","כווקיה","Virtudes","Raphael","20°-25° Virgem","Reconciliação · Paz"],
  [36,"Menadel","מנדאל","Virtudes","Raphael","25°-30° Virgem","Trabalho · Vocação"],
  [37,"Aniel","אניאל","Principados","Haniel","0°-5° Libra","Coragem · Inspiração"],
  [38,"Haamiah","האמיה","Principados","Haniel","5°-10° Libra","Ritual · Culto"],
  [39,"Rehael","ריהאל","Principados","Haniel","10°-15° Libra","Cura · Saúde"],
  [40,"Ieiazel","ייזזל","Principados","Haniel","15°-20° Libra","Consolo · Alegria"],
  [41,"Hahahel","ההחל","Principados","Haniel","20°-25° Libra","Missão · Sacerdócio"],
  [42,"Mikhael","מיכאל","Principados","Haniel","25°-30° Libra","Ordem · Organização"],
  [43,"Veuliah","וולייה","Arcanjos","Michael","0°-5° Escorpião","Prosperidade · Elevação"],
  [44,"Yelahiah","ילהיה","Arcanjos","Michael","5°-10° Escorpião","Força Militar · Coragem"],
  [45,"Sealiah","סאליה","Arcanjos","Michael","10°-15° Escorpião","Motor · Vontade"],
  [46,"Ariel","אריאל","Arcanjos","Michael","15°-20° Escorpião","Revelação · Natureza"],
  [47,"Asaliah","עסליה","Arcanjos","Michael","20°-25° Escorpião","Contemplação · Verdade"],
  [48,"Mihael","מיהאל","Arcanjos","Michael","25°-30° Escorpião","Amor · Fecundidade"],
  [49,"Vehuel","ויהואל","Anjos","Gabriel","0°-5° Sagitário","Elevação · Grandeza"],
  [50,"Daniel","דניאל","Anjos","Gabriel","5°-10° Sagitário","Eloquência · Beleza"],
  [51,"Hahasiah","ההשיה","Anjos","Gabriel","10°-15° Sagitário","Medicina · Ciência"],
  [52,"Imamiah","עממיה","Anjos","Gabriel","15°-20° Sagitário","Viagem · Proteção"],
  [53,"Nanael","נניאל","Anjos","Gabriel","20°-25° Sagitário","Conhecimento · Meditação"],
  [54,"Nithael","ניתאל","Anjos","Gabriel","25°-30° Sagitário","Legitimidade · Estabilidade"],
  [55,"Mebahiah","מבהיה","Serafins","Metatron","0°-5° Capric.","Moral · Intelectual"],
  [56,"Poyel","פוייאל","Serafins","Metatron","5°-10° Capric.","Fortuna · Talento"],
  [57,"Nemamiah","נממיה","Serafins","Metatron","10°-15° Capric.","Prosperidade · Estratégia"],
  [58,"Yeialel","יילאל","Serafins","Metatron","15°-20° Capric.","Força Mental · Cura"],
  [59,"Harahel","הרחאל","Serafins","Metatron","20°-25° Capric.","Riqueza · Conhecimento"],
  [60,"Mitzrael","מצראל","Serafins","Metatron","25°-30° Capric.","Reparação · Cura"],
  [61,"Umabel","אומבאל","Querubins","Raziel","0°-5° Aquário","Amizade · Afinidades"],
  [62,"Iah-Hel","יהאל","Querubins","Raziel","5°-10° Aquário","Sabedoria · Retiro"],
  [63,"Anauel","ענואל","Querubins","Raziel","10°-15° Aquário","Unidade · Comunicação"],
  [64,"Mehiel","מהיאל","Querubins","Raziel","15°-20° Aquário","Inspiração · Escrita"],
  [65,"Damabiah","דמביה","Querubins","Raziel","20°-25° Aquário","Sabedoria · Oceanos"],
  [66,"Manakel","מנקאל","Querubins","Raziel","25°-30° Aquário","Conhecim. · Sonhos"],
  [67,"Eyael","עיאל","Tronos","Binael","0°-5° Peixes","Transformação · Ciência"],
  [68,"Habuhiah","חבוהיה","Tronos","Binael","5°-10° Peixes","Cura · Saúde"],
  [69,"Rochel","ראוחל","Tronos","Binael","10°-15° Peixes","Restituição · Achado"],
  [70,"Jabamiah","יבמיה","Tronos","Binael","15°-20° Peixes","Alquimia · Transmutação"],
  [71,"Haiaiel","ייאיאל","Tronos","Binael","20°-25° Peixes","Armas · Proteção"],
  [72,"Mumiah","מומיה","Tronos","Binael","25°-30° Peixes","Renascimento · Conclusão"],
];
angelsData.forEach(([n,name,heb,choir,arch,deg,kw])=>{
  c[`angel_${n}`]={
    title:`${n}. ${name} (${heb})`,
    subtitle:kw,
    description:`${name} é o ${n}º anjo do Shem HaMephorash, pertencente ao coro dos ${choir}, sob o Arcanjo ${arch}. Governa ${deg}.`,
    associations:{ Coro:choir, Arcanjo:arch, Graus:deg, "Letras Hebraicas":heb }
  };
});

// ─── CHOIRS ──────────────────────────────────────────────────────────────────
const choirs = [
  ["serafins","Serafins · Metatron","1º Coro Angélico","Os Serafins são os anjos mais próximos do trono divino. Cantam incessantemente o louvor a Deus. Metatron é o Arcanjo regente.",{Arcanjo:"Metatron",Sephirah:"Kether",Anjos:"1–6, 55–60",Elemento:"Fogo Sagrado"}],
  ["querubins","Querubins · Raziel","2º Coro Angélico","Os Querubins guardam os segredos da criação e os mistérios divinos. Raziel é o Arcanjo dos segredos.",{Arcanjo:"Raziel",Sephirah:"Chokmah",Anjos:"7–12, 61–66",Elemento:"Sabedoria Estelar"}],
  ["tronos","Tronos · Binael","3º Coro Angélico","Os Tronos sustentam a justiça divina e o equilíbrio cósmico. Binael (Tzaphkiel) é o Arcanjo regente.",{Arcanjo:"Binael/Tzaphkiel",Sephirah:"Binah",Anjos:"13–18, 67–72",Elemento:"Compreensão"}],
  ["dominacoes","Dominações · Tzadkiel","4º Coro Angélico","As Dominações organizam as tarefas dos anjos inferiores e mantêm a ordem cósmica.",{Arcanjo:"Tzadkiel",Sephirah:"Chesed",Anjos:"19–24",Elemento:"Misericórdia"}],
  ["potencias","Potências · Kamael","5º Coro Angélico","As Potências combatem as forças do mal e protegem a ordem divina. Kamael é o guerreiro celestial.",{Arcanjo:"Kamael",Sephirah:"Geburah",Anjos:"25–30",Elemento:"Severidade"}],
  ["virtudes","Virtudes · Raphael","6º Coro Angélico","As Virtudes concedem milagres e bênçãos. Raphael é o curador divino.",{Arcanjo:"Raphael",Sephirah:"Tiphareth",Anjos:"31–36",Elemento:"Beleza/Cura"}],
  ["principados","Principados · Haniel","7º Coro Angélico","Os Principados protegem nações e comunidades. Haniel governa a graça e a beleza.",{Arcanjo:"Haniel",Sephirah:"Netzach",Anjos:"37–42",Elemento:"Vitória"}],
  ["arcanjos","Arcanjos · Michael","8º Coro Angélico","Os Arcanjos são mensageiros divinos de grande poder. Michael lidera contra as trevas.",{Arcanjo:"Michael",Sephirah:"Hod",Anjos:"43–48",Elemento:"Esplendor"}],
  ["anjos","Anjos · Gabriel","9º Coro Angélico","Os Anjos são os mensageiros mais próximos da humanidade. Gabriel traz revelações e proteção.",{Arcanjo:"Gabriel",Sephirah:"Yesod",Anjos:"49–54",Elemento:"Fundamento"}],
];
choirs.forEach(([id,t,sub,desc,assoc])=>{ c[id]={title:t,subtitle:sub,description:desc,associations:assoc}; });

// ─── DECANATE MINOR ARCANA ───────────────────────────────────────────────────
const signs=["Áries","Touro","Gêmeos","Câncer","Leão","Virgem","Libra","Escorpião","Sagitário","Capricórnio","Aquário","Peixes"];
const dcCards=[
["2·Bastões","3·Bastões","4·Bastões"],["5·Ouros","6·Ouros","7·Ouros"],
["8·Espadas","9·Espadas","10·Espadas"],["2·Copas","3·Copas","4·Copas"],
["5·Bastões","6·Bastões","7·Bastões"],["8·Ouros","9·Ouros","10·Ouros"],
["2·Espadas","3·Espadas","4·Espadas"],["5·Copas","6·Copas","7·Copas"],
["8·Bastões","9·Bastões","10·Bastões"],["2·Ouros","3·Ouros","4·Ouros"],
["5·Espadas","6·Espadas","7·Espadas"],["8·Copas","9·Copas","10·Copas"],
];
const dcPlanets=[
["Marte","Sol","Vênus"],["Mercúrio","Lua","Saturno"],
["Júpiter","Marte","Sol"],["Vênus","Mercúrio","Lua"],
["Saturno","Júpiter","Marte"],["Sol","Vênus","Mercúrio"],
["Lua","Saturno","Júpiter"],["Marte","Sol","Vênus"],
["Mercúrio","Lua","Saturno"],["Júpiter","Marte","Sol"],
["Vênus","Mercúrio","Lua"],["Saturno","Júpiter","Marte"],
];
dcCards.forEach((cards,si)=>cards.forEach((card,di)=>{
  const deg=`${di*10}°–${(di+1)*10}° ${signs[si]}`;
  c[`dec_${si}_${di}`]={title:card,subtitle:`Decanato de ${signs[si]}`,
    description:`${card} corresponde ao ${di+1}º decanato de ${signs[si]} (${deg}), regido por ${dcPlanets[si][di]}.`,
    associations:{Signo:signs[si],Graus:deg,"Planeta Regente":dcPlanets[si][di],Decanato:`${di+1}º`}};
}));

// ─── ARCHANGEL REGENTS ───────────────────────────────────────────────────────
const arcs=[
["arc_metatron","Metatron","Anjo da Presença","Metatron é o arcanjo mais elevado, o chanceler celestial. Registra todos os atos no Livro da Vida.",{Sephirah:"Kether",Coro:"Serafins",Anjos:"1–8",Título:"Anjo da Face de Deus"}],
["arc_raziel","Raziel","Segredos de Deus","Raziel guarda os segredos da criação. Seu livro contém todo o conhecimento celestial.",{Sephirah:"Chokmah",Coro:"Querubins",Anjos:"9–16",Título:"Anjo dos Mistérios"}],
["arc_tzaphkiel","Tzaphkiel","Contemplação de Deus","Tzaphkiel governa a compreensão profunda e a forma primordial.",{Sephirah:"Binah",Coro:"Tronos",Anjos:"17–24",Título:"Vigilante de Deus"}],
["arc_tzadkiel","Tzadkiel","Justiça de Deus","Tzadkiel é o arcanjo da misericórdia, bondade e abundância divina.",{Sephirah:"Chesed",Coro:"Dominações",Anjos:"25–32",Título:"Retidão de Deus"}],
["arc_kamael","Kamael","Severidade de Deus","Kamael é o guerreiro celestial que executa a justiça divina com precisão.",{Sephirah:"Geburah",Coro:"Potências",Anjos:"33–40",Título:"Aquele que vê Deus"}],
["arc_raphael","Raphael","Cura de Deus","Raphael é o curador divino, guia de viajantes e protetor da saúde.",{Sephirah:"Tiphareth",Coro:"Virtudes",Anjos:"41–48",Título:"Medicina de Deus"}],
["arc_haniel","Haniel","Graça de Deus","Haniel governa a beleza, o amor e a harmonia nas esferas celestiais.",{Sephirah:"Netzach",Coro:"Principados",Anjos:"49–56",Título:"Alegria de Deus"}],
["arc_michael","Michael","Quem é como Deus","Michael é o líder dos exércitos celestiais, protetor supremo contra as trevas.",{Sephirah:"Hod",Coro:"Arcanjos",Anjos:"57–64",Título:"Príncipe dos Arcanjos"}],
["arc_gabriel","Gabriel","Força de Deus","Gabriel é o mensageiro divino, portador de revelações e anunciações sagradas.",{Sephirah:"Yesod",Coro:"Anjos",Anjos:"65–72",Título:"Heraldo de Deus"}],
];
arcs.forEach(([id,t,sub,desc,assoc])=>{c[id]={title:t,subtitle:sub,description:desc,associations:assoc};});

export const contentData = c;

export function getContent(id) {
    return contentData[id] || {
        title: id.replace(/_/g,' ').toUpperCase(),
        subtitle: "Dados em tradução",
        description: "O conteúdo para este segmento do Lamen ainda está sendo compilado. O conhecimento antigo aguarda manifestação.",
        associations: { Status:"Pendente", Nota:`Defina a chave '${id}' em content.js.` }
    };
}
