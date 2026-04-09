// rings.js - Full Lamen structure with all 72 angels, 22 major arcana,
// Hebrew letters, zodiac signs, planets, and angelic choirs.
// Colors follow the image palette exactly.

// ─── Color Palette (derived from the wheel image) ───────────────────────────
// Aries / Taurus region   : fiery reds (#c0392b, #e74c3c, #e67e22)
// Gemini / Cancer         : warm orange-gold (#f39c12, #f1c40f)
// Leo / Virgo             : yellow-green (#d4e157, #aed581)
// Libra / Scorpio         : teal/green (#26a69a, #2e7d32, #1b5e20)
// Sagittarius / Capricorn : blue-teal (#00acc1, #0077b6, #023e8a)
// Aquarius / Pisces       : violet-purple (#6a0dad, #7b1fa2, #8e24aa)
// Outer choirs            : match the broad color bands in the image

// ─── Helper: assign a zodiacal color to each of the 6-degree angel slices ───
// There are 72 angels, each spanning 5° out of 360°.
// Every zodiac sign covers 30°, giving 6 angels per sign.
const ZODIAC_COLORS = [
    // Aries (0-29) - crimson-red
    "#c0392b","#c0392b","#c0392b","#c0392b","#c0392b","#c0392b",
    // Taurus (30-59) - warm red-orange
    "#e74c3c","#e74c3c","#e74c3c","#e74c3c","#e74c3c","#e74c3c",
    // Gemini (60-89) - orange
    "#e67e22","#e67e22","#e67e22","#e67e22","#e67e22","#e67e22",
    // Cancer (90-119) - amber-gold
    "#f39c12","#f39c12","#f39c12","#f39c12","#f39c12","#f39c12",
    // Leo (120-149) - yellow
    "#f1c40f","#f1c40f","#f1c40f","#f1c40f","#f1c40f","#f1c40f",
    // Virgo (150-179) - yellow-green
    "#8dc63f","#8dc63f","#8dc63f","#8dc63f","#8dc63f","#8dc63f",
    // Libra (180-209) - green
    "#27ae60","#27ae60","#27ae60","#27ae60","#27ae60","#27ae60",
    // Scorpio (210-239) - teal
    "#1abc9c","#1abc9c","#1abc9c","#1abc9c","#1abc9c","#1abc9c",
    // Sagittarius (240-269) - blue-teal
    "#00acc1","#00acc1","#00acc1","#00acc1","#00acc1","#00acc1",
    // Capricorn (270-299) - deep blue
    "#0077b6","#0077b6","#0077b6","#0077b6","#0077b6","#0077b6",
    // Aquarius (300-329) - indigo-violet
    "#5c35a5","#5c35a5","#5c35a5","#5c35a5","#5c35a5","#5c35a5",
    // Pisces (330-359) - deep purple
    "#7b1fa2","#7b1fa2","#7b1fa2","#7b1fa2","#7b1fa2","#7b1fa2",
];

// ─── All 72 Angels of the Shem HaMephorash ───────────────────────────────────
const ANGELS_72 = [
    // 1–6 Aries / Metatron / Seraphins
    { n:1,  name:"VEHUIAH",  heb:"והויה" },
    { n:2,  name:"JELIEL",   heb:"ילייל" },
    { n:3,  name:"SITAEL",   heb:"סיטאל" },
    { n:4,  name:"ELEMIAH",  heb:"עלמיה" },
    { n:5,  name:"MAHASIAH", heb:"מהשיה" },
    { n:6,  name:"LELAHEL",  heb:"ללהל" },
    // 7–12 Taurus / Raziel / Cherubins
    { n:7,  name:"ACHAIAH",  heb:"אכאיה" },
    { n:8,  name:"CAHETEL",  heb:"כהתל" },
    { n:9,  name:"HAZIEL",   heb:"הזיאל" },
    { n:10, name:"ALADIAH",  heb:"אלדיה" },
    { n:11, name:"LAUVIAH",  heb:"לאוויה" },
    { n:12, name:"HAHAHIAH", heb:"ההעיה" },
    // 13–18 Gemini / Binael / Thrones
    { n:13, name:"YESALEL",  heb:"יזאלאל" },
    { n:14, name:"MEBAHEL",  heb:"מבהל" },
    { n:15, name:"HARIEL",   heb:"הריאל" },
    { n:16, name:"HEKAMIAH", heb:"הקמיה" },
    { n:17, name:"LAUVIAH",  heb:"לאויה" },
    { n:18, name:"CALIEL",   heb:"כלאל" },
    // 19–24 Cancer / Hesediel / Dominations
    { n:19, name:"LEUVIAH",  heb:"לוויה" },
    { n:20, name:"PAHALIAH", heb:"פהליה" },
    { n:21, name:"NELCHAEL", heb:"נלכאל" },
    { n:22, name:"YEIAYEL",  heb:"ייייאל" },
    { n:23, name:"MELAHEL",  heb:"מלהל" },
    { n:24, name:"HAHEUIAH", heb:"ההויה" },
    // 25–30 Leo / Khamael / Potencies
    { n:25, name:"NITH-HAIAH",heb:"נתהיה" },
    { n:26, name:"HAAIAH",   heb:"האאיה" },
    { n:27, name:"YERATEL",  heb:"יראתאל" },
    { n:28, name:"SEHEIAH",  heb:"שאהיה" },
    { n:29, name:"REIYEL",   heb:"ריייאל" },
    { n:30, name:"OMAEL",    heb:"אומאל" },
    // 31–36 Virgo / Raphael / Virtues
    { n:31, name:"LECABEL",  heb:"לכבאל" },
    { n:32, name:"VASARIAH", heb:"וסריה" },
    { n:33, name:"YEHUIAH",  heb:"יהויה" },
    { n:34, name:"LEHAHIAH", heb:"להחיה" },
    { n:35, name:"CHAVAKIAH",heb:"כווקיה" },
    { n:36, name:"MENADEL",  heb:"מנדאל" },
    // 37–42 Libra / Haniel / Principalities
    { n:37, name:"ANIEL",    heb:"אניאל" },
    { n:38, name:"HAAMIAH",  heb:"האמיה" },
    { n:39, name:"REHAEL",   heb:"ריהאל" },
    { n:40, name:"IEIAZEL",  heb:"ייזזל" },
    { n:41, name:"HAHAHEL",  heb:"ההחל" },
    { n:42, name:"MIKHAEL",  heb:"מיכאל" },
    // 43–48 Scorpio / Gabriel / Archangels
    { n:43, name:"VEULIAH",  heb:"וולייה" },
    { n:44, name:"YELAHIAH", heb:"ילהיה" },
    { n:45, name:"SEALIAH",  heb:"סאליה" },
    { n:46, name:"ARIEL",    heb:"אריאל" },
    { n:47, name:"ASALIAH",  heb:"עסליה" },
    { n:48, name:"MIHAEL",   heb:"מיהאל" },
    // 49–54 Sagittarius / Adnakhiel / Angels
    { n:49, name:"VEHUEL",   heb:"ויהואל" },
    { n:50, name:"DANIEL",   heb:"דניאל" },
    { n:51, name:"HAHASIAH", heb:"ההשיה" },
    { n:52, name:"IMAMIAH",  heb:"עממיה" },
    { n:53, name:"NANAEL",   heb:"נניאל" },
    { n:54, name:"NITHAEL",  heb:"ניתאל" },
    // 55–60 Capricorn / Tzaphkiel / Seraphins (2nd cycle)
    { n:55, name:"MEBAHIAH", heb:"מבהיה" },
    { n:56, name:"POYEL",    heb:"פוייאל" },
    { n:57, name:"NEMAMIAH", heb:"נממיה" },
    { n:58, name:"YEIALEL",  heb:"יילאל" },
    { n:59, name:"HARAHEL",  heb:"הרחאל" },
    { n:60, name:"MITZRAEL", heb:"מצראל" },
    // 61–66 Aquarius / Tzadkiel / Cherubins (2nd cycle)
    { n:61, name:"UMABEL",   heb:"אומבאל" },
    { n:62, name:"IAH-HEL",  heb:"יהאל" },
    { n:63, name:"ANAUEL",   heb:"ענואל" },
    { n:64, name:"MEHIEL",   heb:"מהיאל" },
    { n:65, name:"DAMABIAH", heb:"דמביה" },
    { n:66, name:"MANAKEL",  heb:"מנקאל" },
    // 67–72 Pisces / Kamael / Thrones (2nd cycle)
    { n:67, name:"EYAEL",    heb:"עיאל" },
    { n:68, name:"HABUHIAH", heb:"חבוהיה" },
    { n:69, name:"ROCHEL",   heb:"ראוחל" },
    { n:70, name:"JABAMIAH", heb:"יבמיה" },
    { n:71, name:"HAIAIEL",  heb:"ייאיאל" },
    { n:72, name:"MUMIAH",   heb:"מומיה" },
];

// ─── Tarot / Hebrew Letter correspondence (22 Major Arcana) ─────────────────
// Colors follow the wheel's middle ring spectrum (warm → cool → violet).
const TAROT_SEGMENTS = [
    { id:"fool",        label:"0 · O LOUCO",       heb:"א", color:"#f9e900" },
    { id:"magician",    label:"1 · O MAGO",         heb:"ב", color:"#f1c40f" },
    { id:"priestess",   label:"2 · A SACERD.",      heb:"ג", color:"#3498db" },
    { id:"empress",     label:"3 · A IMPERATRIZ",   heb:"ד", color:"#27ae60" },
    { id:"emperor",     label:"4 · O IMPERADOR",    heb:"ה", color:"#c0392b" },
    { id:"hierophant",  label:"5 · O HIEROFANTE",   heb:"ו", color:"#e67e22" },
    { id:"lovers",      label:"6 · OS AMANTES",     heb:"ז", color:"#f39c12" },
    { id:"chariot",     label:"7 · O CARRO",        heb:"ח", color:"#e67e22" },
    { id:"strength",    label:"8 · A FORÇA",        heb:"ט", color:"#f1c40f" },
    { id:"hermit",      label:"9 · O EREMITA",      heb:"י", color:"#8dc63f" },
    { id:"wheel",       label:"10 · A RODA",        heb:"כ", color:"#2980b9" },
    { id:"justice",     label:"11 · A JUSTIÇA",     heb:"ל", color:"#27ae60" },
    { id:"hanged",      label:"12 · O ENFORCADO",   heb:"מ", color:"#1abc9c" },
    { id:"death",       label:"13 · A MORTE",       heb:"נ", color:"#2c3e50" },
    { id:"temperance",  label:"14 · TEMPERANÇA",    heb:"ס", color:"#16a085" },
    { id:"devil",       label:"15 · O DIABO",       heb:"ע", color:"#8e44ad" },
    { id:"tower",       label:"16 · A TORRE",       heb:"פ", color:"#c0392b" },
    { id:"star",        label:"17 · A ESTRELA",     heb:"צ", color:"#2980b9" },
    { id:"moon",        label:"18 · A LUA",         heb:"ק", color:"#8e44ad" },
    { id:"sun",         label:"19 · O SOL",         heb:"ר", color:"#f39c12" },
    { id:"judgement",   label:"20 · O JULGAMENTO",  heb:"ש", color:"#e74c3c" },
    { id:"world",       label:"21 · O MUNDO",       heb:"ת", color:"#1abc9c" },
];

// ─── Zodiac ring (12 segments) ───────────────────────────────────────────────
const ZODIAC_SEGMENTS = [
    { id:"aries",       label:"♈ ÁRIES",       color:"#c0392b" },
    { id:"taurus",      label:"♉ TOURO",        color:"#e74c3c" },
    { id:"gemini",      label:"♊ GÊMEOS",       color:"#e67e22" },
    { id:"cancer",      label:"♋ CÂNCER",       color:"#f39c12" },
    { id:"leo",         label:"♌ LEÃO",         color:"#f1c40f" },
    { id:"virgo",       label:"♍ VIRGEM",       color:"#8dc63f" },
    { id:"libra",       label:"♎ LIBRA",        color:"#27ae60" },
    { id:"scorpio",     label:"♏ ESCORPIÃO",    color:"#1abc9c" },
    { id:"sagittarius", label:"♐ SAGITÁRIO",    color:"#00acc1" },
    { id:"capricorn",   label:"♑ CAPRICÓRNIO",  color:"#0077b6" },
    { id:"aquarius",    label:"♒ AQUÁRIO",      color:"#5c35a5" },
    { id:"pisces",      label:"♓ PEIXES",       color:"#7b1fa2" },
];

// ─── Planet / Inner ring (7 classical + 3 outer) ────────────────────────────
const PLANET_SEGMENTS = [
    { id:"saturn",   label:"♄ SATURNO",  color:"#5c35a5" },
    { id:"jupiter",  label:"♃ JÚPITER",  color:"#2980b9" },
    { id:"mars",     label:"♂ MARTE",    color:"#c0392b" },
    { id:"sun_p",    label:"☉ SOL",      color:"#f39c12" },
    { id:"venus",    label:"♀ VÊNUS",    color:"#27ae60" },
    { id:"mercury",  label:"☿ MERCÚRIO", color:"#f1c40f" },
    { id:"moon_p",   label:"☽ LUA",      color:"#8e44ad" },
];

// ─── Inner Elements (triangle-based, 3 alchemical principles) ───────────────
const ELEMENT_SEGMENTS = [
    { id:"fire",    label:"▲ FOGO",    color:"#c0392b" },
    { id:"water",   label:"▽ ÁGUA",    color:"#2980b9" },
    { id:"air",     label:"△ AR",      color:"#f1c40f" },
    { id:"earth",   label:"▼ TERRA",   color:"#27ae60" },
];

// ─── Choirs of Angels (9 orders + archangel-level labels) ───────────────────
// Image shows a broad outer ring with colored bands:
//   Grey-white = Serafins / Metatron  |  Orange = Arcanjos / Michael
//   Purple = Anjos / Gabriel          |  Dark grey = Querubins / Raziel
//   Black = Tronos / Binael           |  Blue/Indigo = Dominações / Tzadkiel
//   Red = Potências / Kamael          |  Yellow = Virtudes / Raphael
//   Green = Principados / Haniel
const CHOIR_SEGMENTS = [
    { id:"serafins",    label:"SERAFINS · METATRON",      color:"#bdc3c7" },
    { id:"querubins",   label:"QUERUBINS · RAZIEL",        color:"#7f8c8d" },
    { id:"tronos",      label:"TRONOS · BINAEL",           color:"#2c3e50" },
    { id:"dominacoes",  label:"DOMINAÇÕES · TZADKIEL",     color:"#34495e" },
    { id:"potencias",   label:"POTÊNCIAS · KAMAEL",        color:"#c0392b" },
    { id:"virtudes",    label:"VIRTUDES · RAPHAEL",        color:"#f39c12" },
    { id:"principados", label:"PRINCIPADOS · HANIEL",      color:"#27ae60" },
    { id:"arcanjos",    label:"ARCANJOS · MICHAEL",        color:"#e67e22" },
    { id:"anjos",       label:"ANJOS · GABRIEL",           color:"#8e44ad" },
];

// ─── Exported Ring Structure ─────────────────────────────────────────────────
export const ringStructure = [
    // Ring 0 — Innermost: 4 Elements (triangle symbols)
    {
        ringId: "elements",
        innerRadius: 0,
        outerRadius: 52,
        segments: ELEMENT_SEGMENTS,
    },

    // Ring 1 — Planets (7 classical planets)
    {
        ringId: "planets",
        innerRadius: 55,
        outerRadius: 87,
        segments: PLANET_SEGMENTS,
    },

    // Ring 2 — Tarot Major Arcana + Hebrew letters (22 cards)
    {
        ringId: "tarot",
        innerRadius: 91,
        outerRadius: 148,
        segments: TAROT_SEGMENTS,
    },

    // Ring 3 — Zodiac (12 signs)
    {
        ringId: "zodiac",
        innerRadius: 152,
        outerRadius: 185,
        segments: ZODIAC_SEGMENTS,
    },

    // Ring 4 — 72 Angels of Shem HaMephorash
    {
        ringId: "angels",
        innerRadius: 189,
        outerRadius: 295,
        segments: ANGELS_72.map((angel, i) => ({
            id: `angel_${angel.n}`,
            label: `${angel.n}·${angel.name}`,
            subLabel: angel.heb,
            color: ZODIAC_COLORS[i],
        })),
    },

    // Ring 5 — Outermost: 9 Angelic Choirs
    {
        ringId: "choirs",
        innerRadius: 299,
        outerRadius: 330,
        segments: CHOIR_SEGMENTS,
    },
];
