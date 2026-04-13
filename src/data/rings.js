// rings.js — 7 rings of the Lamen wheel
// Colors per zodiac sign (spectrum from the image)
const ZC=["#c0392b","#e74c3c","#e67e22","#f39c12","#f1c40f","#8dc63f","#27ae60","#1abc9c","#00acc1","#0077b6","#5c35a5","#7b1fa2"];

// 72 Angels [number, name, hebrew]
const A=[
[1,"VHV","והו"],[2,"ILI","ילי"],[3,"SIT","סיט"],[4,"OLM","עלמ"],[5,"MHSh","מהש"],[6,"LLH","ללה"],
[7,"AKA","אכא"],[8,"KHT","כהת"],[9,"HZI","הזי"],[10,"ALD","אלד"],[11,"LAV","לאו"],[12,"HHO","ההע"],
[13,"IZL","יזל"],[14,"MBH","מבה"],[15,"HRI","הרי"],[16,"HQM","הקמ"],[17,"LAV","לאו"],[18,"KLI","כלי"],
[19,"LVV","לוו"],[20,"PHL","פהל"],[21,"NLK","נלכ"],[22,"III","ייי"],[23,"MLH","מלה"],[24,"ChHV","חהו"],
[25,"NThH","נתה"],[26,"HAA","האא"],[27,"IRTh","ירת"],[28,"ShAH","שאה"],[29,"RII","ריי"],[30,"AVM","אום"],
[31,"LKB","לכב"],[32,"VShR","ושר"],[33,"IChV","יחו"],[34,"LHCh","להח"],[35,"KVQ","כוק"],[36,"MND","מנד"],
[37,"ANI","אני"],[38,"ChOM","חעמ"],[39,"RHO","רהע"],[40,"IIZ","ייז"],[41,"HHH","ההה"],[42,"MIK","מיכ"],
[43,"VVL","וול"],[44,"ILH","ילה"],[45,"SAL","סאל"],[46,"ORI","ערי"],[47,"OShL","עשל"],[48,"MIH","מיה"],
[49,"VHV","והו"],[50,"DNI","דני"],[51,"HChSh","החש"],[52,"OMM","עמם"],[53,"NNA","ננא"],[54,"NITh","נית"],
[55,"MBH","מבה"],[56,"PVI","פוי"],[57,"NMM","נמם"],[58,"IIL","ייל"],[59,"HRCh","הרח"],[60,"MTzR","מצר"],
[61,"VMB","ומב"],[62,"IHH","יהה"],[63,"ONV","ענו"],[64,"MChI","מחי"],[65,"DMB","דמב"],[66,"MNQ","מנק"],
[67,"AIO","איע"],[68,"ChBV","חבו"],[69,"RAH","ראה"],[70,"IBM","יבמ"],[71,"HII","היי"],[72,"MVM","מום"]
];

// Angel full names for labels
const AN=[
"VEHUIAH","JELIEL","SITAEL","ELEMIAH","MAHASIAH","LELAHEL",
"ACHAIAH","CAHETEL","HAZIEL","ALADIAH","LAUVIAH","HAHAHIAH",
"YESALEL","MEBAHEL","HARIEL","HEKAMIAH","LAUVIAH","CALIEL",
"LEUVIAH","PAHALIAH","NELCHAEL","YEIAYEL","MELAHEL","HAHEUIAH",
"NITH-HAIAH","HAAIAH","YERATEL","SEHEIAH","REIYEL","OMAEL",
"LECABEL","VASARIAH","YEHUIAH","LEHAHIAH","CHAVAKIAH","MENADEL",
"ANIEL","HAAMIAH","REHAEL","IEIAZEL","HAHAHEL","MIKHAEL",
"VEULIAH","YELAHIAH","SEALIAH","ARIEL","ASALIAH","MIHAEL",
"VEHUEL","DANIEL","HAHASIAH","IMAMIAH","NANAEL","NITHAEL",
"MEBAHIAH","POYEL","NEMAMIAH","YEIALEL","HARAHEL","MITZRAEL",
"UMABEL","IAH-HEL","ANAUEL","MEHIEL","DAMABIAH","MANAKEL",
"EYAEL","HABUHIAH","ROCHEL","JABAMIAH","HAIAIEL","MUMIAH"
];

// 36 Decanate minor arcana cards (3 per zodiac sign)
const DC=[
["2·Bastões","3·Bastões","4·Bastões"],
["5·Ouros","6·Ouros","7·Ouros"],
["8·Espadas","9·Espadas","10·Espadas"],
["2·Copas","3·Copas","4·Copas"],
["5·Bastões","6·Bastões","7·Bastões"],
["8·Ouros","9·Ouros","10·Ouros"],
["2·Espadas","3·Espadas","4·Espadas"],
["5·Copas","6·Copas","7·Copas"],
["8·Bastões","9·Bastões","10·Bastões"],
["2·Ouros","3·Ouros","4·Ouros"],
["5·Espadas","6·Espadas","7·Espadas"],
["8·Copas","9·Copas","10·Copas"],
];

// Slightly darken/lighten per decanate
function shade(hex,amt){
  let r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
  r=Math.min(255,Math.max(0,r+amt));g=Math.min(255,Math.max(0,g+amt));b=Math.min(255,Math.max(0,b+amt));
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}

export const ringStructure = [
  // Ring 0 — Center: 4 Elements
  { ringId:"elements", innerRadius:0, outerRadius:48, segments:[
    {id:"fire",label:"▲ FOGO",color:"#c0392b"},
    {id:"water",label:"▽ ÁGUA",color:"#2980b9"},
    {id:"air",label:"△ AR",color:"#f1c40f"},
    {id:"earth",label:"▼ TERRA",color:"#27ae60"},
  ]},

  // Ring 1 — 7 Planets
  { ringId:"planets", innerRadius:52, outerRadius:82, segments:[
    {id:"saturn",label:"♄ SATURNO",color:"#2c3e50"},
    {id:"jupiter",label:"♃ JÚPITER",color:"#2980b9"},
    {id:"mars",label:"♂ MARTE",color:"#c0392b"},
    {id:"sun_p",label:"☉ SOL",color:"#f39c12"},
    {id:"venus",label:"♀ VÊNUS",color:"#27ae60"},
    {id:"mercury",label:"☿ MERCÚRIO",color:"#f1c40f"},
    {id:"moon_p",label:"☽ LUA",color:"#8e44ad"},
  ]},

  // Ring 2 — 12 Zodiac (with major arcana association)
  { ringId:"zodiac", innerRadius:86, outerRadius:128, segments:[
    {id:"aries",image:"/assets/zodiac/aries-svgrepo-com.svg",color:ZC[0], scale: 1.6},
    {id:"taurus",image:"/assets/zodiac/taurus-svgrepo-com.svg",color:ZC[1], scale: 0.6},
    {id:"gemini",image:"/assets/zodiac/gemini-svgrepo-com.svg",color:ZC[2], scale: 0.65},
    {id:"cancer",image:"/assets/zodiac/cancer-svgrepo-com.svg",color:ZC[3], scale: 0.5},
    {id:"leo",image:"/assets/zodiac/leo-svgrepo-com.svg",color:ZC[4], scale: 1.45},
    {id:"virgo",image:"/assets/zodiac/virgo-svgrepo-com.svg",color:ZC[5], scale: 1.25},
    {id:"libra",image:"/assets/zodiac/libra-svgrepo-com.svg",color:ZC[6], scale: 0.5},
    {id:"scorpio",image:"/assets/zodiac/scorpio-svgrepo-com.svg",color:ZC[7], scale: 0.65},
    {id:"sagittarius",image:"/assets/zodiac/sagittarius-svgrepo-com.svg",color:ZC[8], scale: 0.55},
    {id:"capricorn",image:"/assets/zodiac/capricorn-svgrepo-com.svg",color:ZC[9], scale: 1.5},
    {id:"aquarius",image:"/assets/zodiac/aquarius-svgrepo-com.svg",color:ZC[10], scale: 0.6},
    {id:"pisces",image:"/assets/zodiac/pisces-svgrepo-com.svg",color:ZC[11], scale: 0.55},
  ]},

  // Ring 3 — 36 Decanate cards (minor arcana)
  { ringId:"decanates", innerRadius:132, outerRadius:170, segments:
    DC.flatMap((cards,si)=>cards.map((lbl,di)=>({
      id:`dec_${si}_${di}`, label:lbl, color:shade(ZC[si],[-15,0,15][di])
    })))
  },

  // Ring 4 — 72 Angels of the Shem HaMephorash
  { ringId:"angels", innerRadius:174, outerRadius:272, segments:
    A.map((a,i)=>({
      id:`angel_${a[0]}`, num:a[0], letters:a[1], hebrew:a[2], subLabel:AN[i], color:ZC[Math.floor(i/6)]
    }))
  },

  // Ring 5 — 9 Archangel Regents
  { ringId:"archangels", innerRadius:276, outerRadius:298, segments:[
    {id:"arc_metatron",label:"METATRON",color:"#bdc3c7"},
    {id:"arc_raziel",label:"RAZIEL",color:"#95a5a6"},
    {id:"arc_tzaphkiel",label:"TZAPHKIEL",color:"#607d8b"},
    {id:"arc_tzadkiel",label:"TZADKIEL",color:"#1a237e"},
    {id:"arc_kamael",label:"KAMAEL",color:"#b71c1c"},
    {id:"arc_raphael",label:"RAPHAEL",color:"#f9a825"},
    {id:"arc_haniel",label:"HANIEL",color:"#2e7d32"},
    {id:"arc_michael",label:"MICHAEL",color:"#e65100"},
    {id:"arc_gabriel",label:"GABRIEL",color:"#6a1b9a"},
  ]},

  // Ring 6 — 9 Angelic Choirs (outermost)
  { ringId:"choirs", innerRadius:302, outerRadius:335, segments:[
    {id:"serafins",label:"SERAFINS",color:"#cfd8dc"},
    {id:"querubins",label:"QUERUBINS",color:"#90a4ae"},
    {id:"tronos",label:"TRONOS",color:"#546e7a"},
    {id:"dominacoes",label:"DOMINAÇÕES",color:"#283593"},
    {id:"potencias",label:"POTÊNCIAS",color:"#c62828"},
    {id:"virtudes",label:"VIRTUDES",color:"#fdd835"},
    {id:"principados",label:"PRINCIPADOS",color:"#388e3c"},
    {id:"arcanjos",label:"ARCANJOS",color:"#ef6c00"},
    {id:"anjos",label:"ANJOS",color:"#7b1fa2"},
  ]},
];
