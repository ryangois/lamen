export const scriptureSource = {
  label: 'João Ferreira de Almeida, edição de 1911 — domínio público',
  url: 'https://github.com/BibliaJFAAL/JFAAL/tree/main/original',
};

export const hebrewScriptureSource = {
  label: 'Sefaria — Miqra according to the Masorah',
  url: 'https://www.sefaria.org/texts/Tanakh',
};

const transliterationMap = {
  א: '', ב: 'v', ג: 'g', ד: 'd', ה: 'h', ו: 'v', ז: 'z', ח: 'ch', ט: 't', י: 'y', כ: 'ch', ך: 'ch', ל: 'l', מ: 'm', ם: 'm', נ: 'n', ן: 'n', ס: 's', ע: '', פ: 'f', ף: 'f', צ: 'tz', ץ: 'tz', ק: 'q', ר: 'r', ש: 'sh', ת: 't',
  '\u05B0': 'e', '\u05B1': 'e', '\u05B2': 'a', '\u05B3': 'o', '\u05B4': 'i', '\u05B5': 'e', '\u05B6': 'e', '\u05B7': 'a', '\u05B8': 'a', '\u05B9': 'o', '\u05BB': 'u', '\u05C7': 'a',
};

function isCantillationMark(char) {
  const code = char.codePointAt(0);
  return (code >= 0x0591 && code <= 0x05AF)
    || code === 0x05BD
    || code === 0x05BF
    || code === 0x05C0
    || code === 0x05C4
    || code === 0x05C5;
}

export function transliterateHebrew(value = '') {
  return [...String(value)]
    .filter((char) => !isCantillationMark(char))
    .map((char, index, chars) => {
      if (char === 'ׁ' || char === 'ׂ' || char === 'ּ') return '';
      if (char === '־') return '-';
      if (char === '׃') return '';
      if (char === '\u05D5' && chars[index + 1] === '\u05BC') return 'u';
      if (char === '\u05D5' && chars[index + 1] === '\u05B9') return 'o';
      if (char === 'ש') return chars[index + 1] === 'ׂ' ? 's' : 'sh';
      if (char === 'ב') return chars[index + 1] === 'ּ' ? 'b' : 'v';
      if (char === 'כ' || char === 'ך') return chars[index + 1] === 'ּ' ? 'k' : 'ch';
      if (char === 'פ' || char === 'ף') return chars[index + 1] === 'ּ' ? 'p' : 'f';
      return transliterationMap[char] ?? char;
    })
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

export const angelScripture = {
  angel_1: { reference: "Salmos 3:3", hebrewReference: "תהילים ג׳:ד׳", hebrew: "וְאַתָּ֣ה יְ֭הֹוָה מָגֵ֣ן בַּעֲדִ֑י כְּ֝בוֹדִ֗י וּמֵרִ֥ים רֹאשִֽׁי׃", text: "3. Porém tu, Senhor, és um escudo para mim, a minha gloria, e o que exalta a minha cabeça." },
  angel_2: { reference: "Salmos 22:19", hebrewReference: "תהילים כ״ב:כ׳", hebrew: "וְאַתָּ֣ה יְ֭הֹוָה אַל־תִּרְחָ֑ק אֱ֝יָלוּתִ֗י לְעֶזְרָ֥תִי חֽוּשָׁה׃", text: "19. Mas tu, Senhor, não te alongues de mim: força minha, apressa-te em soccorrer-me." },
  angel_3: { reference: "Salmos 91:2", hebrewReference: "תהילים צ״א:ב׳", hebrew: "אֹמַ֗ר לַ֭יהֹוָה מַחְסִ֣י וּמְצוּדָתִ֑י אֱ֝לֹהַ֗י אֶבְטַח־בּֽוֹ׃", text: "2. Direi do Senhor: Elle é o meu Deus, o meu refugio, a minha fortaleza, e n’elle confiarei." },
  angel_4: { reference: "Salmos 6:4", hebrewReference: "תהילים ו׳:ה׳", hebrew: "שׁוּבָ֣ה יְ֭הֹוָה חַלְּצָ֣ה נַפְשִׁ֑י ה֝וֹשִׁיעֵ֗נִי לְמַ֣עַן חַסְדֶּֽךָ׃", text: "4. Volta-te, Senhor, livra a minha alma: salva-me por tua benignidade." },
  angel_5: { reference: "Salmos 34:4", hebrewReference: "תהילים ל״ד:ה׳", hebrew: "דָּרַ֣שְׁתִּי אֶת־יְהֹוָ֣ה וְעָנָ֑נִי וּמִכׇּל־מְ֝גוּרוֹתַ֗י הִצִּילָֽנִי׃", text: "4. Busquei ao Senhor, e elle me respondeu: livrou-me de todos os meus temores." },
  angel_6: { reference: "Salmos 9:11", hebrewReference: "תהילים ט׳:י״ב", hebrew: "זַמְּר֗וּ לַ֭יהֹוָה יֹשֵׁ֣ב צִיּ֑וֹן הַגִּ֥ידוּ בָ֝עַמִּ֗ים עֲלִֽילוֹתָֽיו׃", text: "11. Cantae louvores ao Senhor, que habita em Sião; annunciae entre os povos os seus feitos." },
  angel_7: { reference: "Salmos 103:8", hebrewReference: "תהילים ק״ג:ח׳", hebrew: "רַח֣וּם וְחַנּ֣וּן יְהֹוָ֑ה אֶ֖רֶךְ אַפַּ֣יִם וְרַב־חָֽסֶד׃", text: "8. Misericordioso e piedoso é o Senhor; longanimo e grande em benignidade." },
  angel_8: { reference: "Salmos 95:6", hebrewReference: "תהילים צ״ה:ו׳", hebrew: "בֹּ֭אוּ נִשְׁתַּחֲוֶ֣ה וְנִכְרָ֑עָה נִ֝בְרְכָ֗ה לִֽפְנֵי־יְהֹוָ֥ה עֹשֵֽׂנוּ׃", text: "6. Ó, vinde, adoremos e prostremo-nos: ajoelhemos diante do Senhor que nos creou." },
  angel_9: { reference: "Salmos 25:6", hebrewReference: "תהילים כ״ה:ו׳", hebrew: "זְכֹר־רַחֲמֶ֣יךָ יְ֭הֹוָה וַחֲסָדֶ֑יךָ כִּ֖י מֵעוֹלָ֣ם הֵֽמָּה׃", text: "6. Lembra-te, Senhor, das tuas misericordias e das tuas benignidades, porque são desde a eternidade." },
  angel_10: { reference: "Salmos 33:22", hebrewReference: "תהילים ל״ג:כ״ב", hebrew: "יְהִי־חַסְדְּךָ֣ יְהֹוָ֣ה עָלֵ֑ינוּ כַּ֝אֲשֶׁ֗ר יִחַ֥לְנוּ לָֽךְ׃ פ", text: "22. Seja a tua misericordia, Senhor, sobre nós, como em ti esperamos." },
  angel_11: { reference: "Salmos 18:46", hebrewReference: "תהילים י״ח:מ״ז", hebrew: "חַי־יְ֭הֹוָה וּבָר֣וּךְ צוּרִ֑י וְ֝יָר֗וּם אֱלוֹהֵ֥י יִשְׁעִֽי׃", text: "46. O Senhor vive: e bemdito seja o meu rochedo, e exaltado seja o Deus da minha salvação." },
  angel_12: { reference: "Salmos 110:1", hebrewReference: "תהילים ק״י:ב׳", hebrew: "מַטֵּֽה־עֻזְּךָ֗ יִשְׁלַ֣ח יְ֭הֹוָה מִצִּיּ֑וֹן רְ֝דֵ֗ה בְּקֶ֣רֶב אֹיְבֶֽיךָ׃", text: "1. Disse o Senhor ao meu Senhor: Assenta-te á minha mão direita, até que ponha aos teus inimigos por escabello dos teus pés." },
  angel_13: { reference: "Salmos 98:4", hebrewReference: "תהילים צ״ח:ה׳", hebrew: "זַמְּר֣וּ לַיהֹוָ֣ה בְּכִנּ֑וֹר בְּ֝כִנּ֗וֹר וְק֣וֹל זִמְרָֽה׃", text: "4. Exultae no Senhor, toda a terra; exclamae e alegrae-vos de prazer, e cantae louvores." },
  angel_14: { reference: "Salmos 9:9", hebrewReference: "תהילים ט׳:י׳", hebrew: "וִ֘יהִ֤י יְהֹוָ֣ה מִשְׂגָּ֣ב לַדָּ֑ךְ מִ֝שְׂגָּ֗ב לְעִתּ֥וֹת בַּצָּרָֽה׃", text: "9. O Senhor será tambem um alto refugio para o opprimido; um alto refugio em tempos de angustia." },
  angel_15: { reference: "Salmos 94:22", hebrewReference: "תהילים צ״ד:כ״ב", hebrew: "וַיְהִ֬י יְהֹוָ֣ה לִ֣י לְמִשְׂגָּ֑ב וֵ֝אלֹהַ֗י לְצ֣וּר מַחְסִֽי׃", text: "22. Mas o Senhor é a minha defeza; e o meu Deus é a rocha do meu refugio." },
  angel_16: { reference: "Salmos 88:1", hebrewReference: "תהילים פ״ח:ב׳", hebrew: "יְ֭הֹוָה אֱלֹהֵ֣י יְשׁוּעָתִ֑י יוֹם־צָעַ֖קְתִּי בַלַּ֣יְלָה נֶגְדֶּֽךָ׃", text: "1. Senhor Deus da minha salvação, diante de ti tenho clamado de dia e de noite." },
  angel_17: { reference: "Salmos 8:9", hebrewReference: "תהילים ח׳:י׳", hebrew: "יְהֹוָ֥ה אֲדֹנֵ֑ינוּ מָה־אַדִּ֥יר שִׁ֝מְךָ֗ בְּכׇל־הָאָֽרֶץ׃ פ", text: "9. Ó Senhor, nosso Senhor, quão admiravel é o teu nome sobre toda a terra!" },
  angel_18: { reference: "Salmos 35:24", hebrewReference: "תהילים ל״ה:כ״ה", hebrew: "אַל־יֹאמְר֣וּ בְ֭לִבָּם הֶאָ֣ח נַפְשֵׁ֑נוּ אַל־יֹ֝אמְר֗וּ בִּֽלַּעֲנֽוּהוּ׃", text: "24. Julga-me segundo a tua justiça, Senhor Deus meu, e não deixes que se alegrem de mim." },
  angel_19: { reference: "Salmos 40:1", hebrewReference: "תהילים מ׳:ב׳", hebrew: "קַוֺּ֣ה קִוִּ֣יתִי יְהֹוָ֑ה וַיֵּ֥ט אֵ֝לַ֗י וַיִּשְׁמַ֥ע שַׁוְעָתִֽי׃", text: "1. Esperei com paciencia ao Senhor, e elle se inclinou para mim, e ouviu o meu clamor." },
  angel_20: { reference: "Salmos 120:1-2", hebrewReference: "תהילים ק״כ:ב׳-ג׳", hebrew: "יְֽהֹוָ֗ה הַצִּ֣ילָה נַ֭פְשִׁי מִשְּׂפַת־שֶׁ֑קֶר מִלָּשׁ֥וֹן רְמִיָּֽה׃ מַה־יִּתֵּ֣ן לְ֭ךָ וּמַה־יֹּסִ֥יף לָ֗ךְ לָשׁ֥וֹן רְמִיָּֽה׃", text: "1. Na minha angustia clamei ao Senhor, e me ouviu. 2. Senhor, livra a minha alma dos labios mentirosos e da lingua enganadora." },
  angel_21: { reference: "Salmos 31:14", hebrewReference: "תהילים ל״א:ט״ו", hebrew: "וַאֲנִ֤י ׀ עָלֶ֣יךָ בָטַ֣חְתִּי יְהֹוָ֑ה אָ֝מַ֗רְתִּי אֱלֹהַ֥י אָֽתָּה׃", text: "14. Mas eu confiei em ti, Senhor: e disse: Tu és o meu Deus." },
  angel_22: { reference: "Salmos 121:5", hebrewReference: "תהילים קכ״א:ה׳", hebrew: "יְהֹוָ֥ה שֹׁמְרֶ֑ךָ יְהֹוָ֥ה צִ֝לְּךָ֗ עַל־יַ֥ד יְמִינֶֽךָ׃", text: "5. O Senhor é quem te guarda: o Senhor é a tua sombra á tua direita." },
  angel_23: { reference: "Salmos 121:8", hebrewReference: "תהילים קכ״א:ח׳", hebrew: "יְֽהֹוָ֗ה יִשְׁמׇר־צֵאתְךָ֥ וּבוֹאֶ֑ךָ מֵ֝עַתָּ֗ה וְעַד־עוֹלָֽם׃ פ", text: "8. O Senhor guardará a tua entrada e a tua saida, desde agora e para sempre." },
  angel_24: { reference: "Salmos 33:18", hebrewReference: "תהילים ל״ג:י״ח", hebrew: "הִנֵּ֤ה עֵ֣ין יְ֭הֹוָה אֶל־יְרֵאָ֑יו לַֽמְיַחֲלִ֥ים לְחַסְדּֽוֹ׃", text: "18. Eis que os olhos do Senhor estão sobre os que o temem, sobre os que esperam na sua misericordia;" },
  angel_25: { reference: "Salmos 9:1", hebrewReference: "תהילים ט׳:ב׳", hebrew: "אוֹדֶ֣ה יְ֭הֹוָה בְּכׇל־לִבִּ֑י אֲ֝סַפְּרָ֗ה כׇּל־נִפְלְאוֹתֶֽיךָ׃", text: "1. Eu te louvarei, Senhor, com todo o meu coração; contarei todas as tuas maravilhas." },
  angel_26: { reference: "Salmos 119:145", hebrewReference: "תהילים קי״ט:קמ״ה", hebrew: "קָרָ֣אתִי בְכׇל־לֵ֭ב עֲנֵ֥נִי יְהֹוָ֗ה חֻקֶּ֥יךָ אֶצֹּֽרָה׃", text: "145. Clamei de todo o meu coração; escuta-me, Senhor, e guardarei os teus estatutos." },
  angel_27: { reference: "Salmos 140:1", hebrewReference: "תהילים ק״מ:ב׳", hebrew: "חַלְּצֵ֣נִי יְ֭הֹוָה מֵאָדָ֣ם רָ֑ע מֵאִ֖ישׁ חֲמָסִ֣ים תִּנְצְרֵֽנִי׃", text: "1. Livra-me, ó Senhor, do homem mau: guarda-me do homem violento;" },
  angel_28: { reference: "Salmos 71:12", hebrewReference: "תהילים ע״א:י״ב", hebrew: "אֱ֭לֹהִים אַל־תִּרְחַ֣ק מִמֶּ֑נִּי אֱ֝לֹהַ֗י לְעֶזְרָ֥תִי (חישה) [חֽוּשָׁה]׃", text: "12. Ó Deus, não te alongues de mim: meu Deus, apressa-te em ajudar-me." },
  angel_29: { reference: "Salmos 54:4", hebrewReference: "תהילים נ״ד:ה׳", hebrew: "כִּ֤י זָרִ֨ים ׀ קָ֤מוּ עָלַ֗י וְֽ֭עָרִיצִים בִּקְשׁ֣וּ נַפְשִׁ֑י לֹ֤א שָׂ֨מוּ אֱלֹהִ֖ים לְנֶגְדָּ֣ם סֶֽלָה׃", text: "4. Eis que Deus é o meu ajudador, o Senhor está com aquelles que susteem a minha alma." },
  angel_30: { reference: "Salmos 71:5", hebrewReference: "תהילים ע״א:ה׳", hebrew: "כִּֽי־אַתָּ֥ה תִקְוָתִ֑י אֲדֹנָ֥י יֱ֝הֹוִ֗ה מִבְטַחִ֥י מִנְּעוּרָֽי׃", text: "5. Pois tu és a minha esperança. Senhor Deus; tu és a minha confiança desde a minha mocidade." },
  angel_31: { reference: "Salmos 71:16", hebrewReference: "תהילים ע״א:ט״ז", hebrew: "אָב֗וֹא בִּ֭גְבֻרוֹת אֲדֹנָ֣י יֱהֹוִ֑ה אַזְכִּ֖יר צִדְקָתְךָ֣ לְבַדֶּֽךָ׃", text: "16. Sairei na força do Senhor Deus, farei menção da tua justiça, e só d’ella." },
  angel_32: { reference: "Salmos 33:4", hebrewReference: "תהילים ל״ג:ד׳", hebrew: "כִּֽי־יָשָׁ֥ר דְּבַר־יְהֹוָ֑ה וְכׇל־מַ֝עֲשֵׂ֗הוּ בֶּאֱמוּנָֽה׃", text: "4. Porque a palavra do Senhor é recta, e todas as suas obras são fieis." },
  angel_33: { reference: "Salmos 94:11", hebrewReference: "תהילים צ״ד:י״א", hebrew: "יְֽהֹוָ֗ה יֹ֭דֵעַ מַחְשְׁב֣וֹת אָדָ֑ם כִּי־הֵ֥מָּה הָֽבֶל׃", text: "11. O Senhor conhece os pensamentos do homem, que são vaidade." },
  angel_34: { reference: "Salmos 131:3", hebrewReference: "תהילים קל״א:ג׳", hebrew: "יַחֵ֣ל יִ֭שְׂרָאֵל אֶל־יְהֹוָ֑ה מֵ֝עַתָּ֗ה וְעַד־עוֹלָֽם׃ פ", text: "3. Espere Israel no Senhor, desde agora e para sempre." },
  angel_35: { reference: "Salmos 116:1", hebrewReference: "תהילים קט״ז:א׳", hebrew: "אָ֭הַבְתִּי כִּי־יִשְׁמַ֥ע ׀ יְהֹוָ֑ה אֶת־ק֝וֹלִ֗י תַּחֲנוּנָֽי׃", text: "1. Amo ao Senhor, porque elle ouviu a minha voz e a minha supplica." },
  angel_36: { reference: "Salmos 26:8", hebrewReference: "תהילים כ״ו:ח׳", hebrew: "יְֽהֹוָ֗ה אָ֭הַבְתִּי מְע֣וֹן בֵּיתֶ֑ךָ וּ֝מְק֗וֹם מִשְׁכַּ֥ן כְּבוֹדֶֽךָ׃", text: "8. Senhor, eu tenho amado a habitação da tua casa e o logar onde permanece a tua gloria." },
  angel_37: { reference: "Salmos 80:3", hebrewReference: "תהילים פ׳:ד׳", hebrew: "אֱלֹהִ֥ים הֲשִׁיבֵ֑נוּ וְהָאֵ֥ר פָּ֝נֶ֗יךָ וְנִוָּשֵֽׁעָה׃", text: "3. Faze-nos voltar, ó Deus, e faze resplandecer o teu rosto, e seremos salvos." },
  angel_38: { reference: "Salmos 91:9", hebrewReference: "תהילים צ״א:ט׳", hebrew: "כִּֽי־אַתָּ֣ה יְהֹוָ֣ה מַחְסִ֑י עֶ֝לְי֗וֹן שַׂ֣מְתָּ מְעוֹנֶֽךָ׃", text: "9. Porque tu, ó Senhor, és o meu refugio: no Altissimo fizeste a tua habitação." },
  angel_39: { reference: "Salmos 30:10", hebrewReference: "תהילים ל׳:י״א", hebrew: "שְׁמַע־יְהֹוָ֥ה וְחׇנֵּ֑נִי יְ֝הֹוָ֗ה הֱֽיֵה־עֹזֵ֥ר לִֽי׃", text: "10. Ouve, Senhor, e tem piedade de mim, Senhor; sê o meu auxilio." },
  angel_40: { reference: "Salmos 88:14", hebrewReference: "תהילים פ״ח:ט״ו", hebrew: "לָמָ֣ה יְ֭הֹוָה תִּזְנַ֣ח נַפְשִׁ֑י תַּסְתִּ֖יר פָּנֶ֣יךָ מִמֶּֽנִּי׃", text: "14. Senhor, porque rejeitas a minha alma? porque escondes de mim a tua face?" },
  angel_41: { reference: "Salmos 120:2", hebrewReference: "תהילים ק״כ:ג׳", hebrew: "מַה־יִּתֵּ֣ן לְ֭ךָ וּמַה־יֹּסִ֥יף לָ֗ךְ לָשׁ֥וֹן רְמִיָּֽה׃", text: "2. Senhor, livra a minha alma dos labios mentirosos e da lingua enganadora." },
  angel_42: { reference: "Salmos 121:7", hebrewReference: "תהילים קכ״א:ז׳", hebrew: "יְֽהֹוָ֗ה יִשְׁמׇרְךָ֥ מִכׇּל־רָ֑ע יִ֝שְׁמֹ֗ר אֶת־נַפְשֶֽׁךָ׃", text: "7. O Senhor te guardará de todo o mal: guardará a tua alma." },
  angel_43: { reference: "Salmos 88:13", hebrewReference: "תהילים פ״ח:י״ד", hebrew: "וַאֲנִ֤י ׀ אֵלֶ֣יךָ יְהֹוָ֣ה שִׁוַּ֑עְתִּי וּ֝בַבֹּ֗קֶר תְּֽפִלָּתִ֥י תְקַדְּמֶֽךָּ׃", text: "13. Eu, porém, Senhor, tenho clamado a ti, e de madrugada te esperará a minha oração." },
  angel_44: { reference: "Salmos 119:108", hebrewReference: "תהילים קי״ט:ק״ח", hebrew: "נִדְב֣וֹת פִּ֭י רְצֵה־נָ֣א יְהֹוָ֑ה וּֽמִשְׁפָּטֶ֥יךָ לַמְּדֵֽנִי׃", text: "108. Acceita, eu te rogo, as offerendas voluntarias da minha bocca, ó Senhor; ensina-me os teus juizos." },
  angel_45: { reference: "Salmos 94:18", hebrewReference: "תהילים צ״ד:י״ח", hebrew: "אִם־אָ֭מַרְתִּי מָ֣טָה רַגְלִ֑י חַסְדְּךָ֥ יְ֝הֹוָ֗ה יִסְעָדֵֽנִי׃", text: "18. Quando eu disse: O meu pé vacilla; a tua benignidade, Senhor, me susteve." },
  angel_46: { reference: "Salmos 145:9", hebrewReference: "תהילים קמ״ה:י׳", hebrew: "יוֹד֣וּךָ יְ֭הֹוָה כׇּל־מַעֲשֶׂ֑יךָ וַ֝חֲסִידֶ֗יךָ יְבָרְכֽוּכָה׃", text: "9. O Senhor é bom para todos, e as suas misericordias são sobre todas as suas obras." },
  angel_47: { reference: "Salmos 92:5", hebrewReference: "תהילים צ״ב:ו׳", hebrew: "מַה־גָּדְל֣וּ מַעֲשֶׂ֣יךָ יְהֹוָ֑ה מְ֝אֹ֗ד עָמְק֥וּ מַחְשְׁבֹתֶֽיךָ׃", text: "5. Quão grandes são, Senhor, as tuas obras! mui profundos são os teus pensamentos." },
  angel_48: { reference: "Salmos 98:2", hebrewReference: "תהילים צ״ח:ג׳", hebrew: "זָ֘כַ֤ר חַסְדּ֨וֹ ׀ וֶ֥אֱֽמוּנָתוֹ֮ לְבֵ֢ית יִשְׂרָ֫אֵ֥ל רָא֥וּ כׇל־אַפְסֵי־אָ֑רֶץ אֵ֝֗ת יְשׁוּעַ֥ת אֱלֹהֵֽינוּ׃", text: "2. O Senhor fez notoria a sua salvação, manifestou a sua justiça perante os olhos das nações." },
  angel_49: { reference: "Salmos 145:3", hebrewReference: "תהילים קמ״ה:ד׳", hebrew: "דּ֣וֹר לְ֭דוֹר יְשַׁבַּ֣ח מַעֲשֶׂ֑יךָ וּגְב֖וּרֹתֶ֣יךָ יַגִּֽידוּ׃", text: "3. Grande é o Senhor, e muito digno de louvor, e a sua grandeza inexcrutavel." },
  angel_50: { reference: "Salmos 145:8", hebrewReference: "תהילים קמ״ה:ט׳", hebrew: "טוֹב־יְהֹוָ֥ה לַכֹּ֑ל וְ֝רַחֲמָ֗יו עַל־כׇּל־מַעֲשָֽׂיו׃", text: "8. Piedoso e benigno é o Senhor, soffredor e de grande misericordia." },
  angel_51: { reference: "Salmos 104:31", hebrewReference: "תהילים ק״ד:ל״א", hebrew: "יְהִ֤י כְב֣וֹד יְהֹוָ֣ה לְעוֹלָ֑ם יִשְׂמַ֖ח יְהֹוָ֣ה בְּמַעֲשָֽׂיו׃", text: "31. A gloria do Senhor durará para sempre: o Senhor se alegrará nas suas obras." },
  angel_52: { reference: "Salmos 7:17", hebrewReference: "תהילים ז׳:י״ח", hebrew: "אוֹדֶ֣ה יְהֹוָ֣ה כְּצִדְק֑וֹ וַ֝אֲזַמְּרָ֗ה שֵֽׁם־יְהֹוָ֥ה עֶלְיֽוֹן׃ פ", text: "17. Eu louvarei ao Senhor segundo a sua justiça, e cantarei louvores ao nome do Senhor altissimo." },
  angel_53: { reference: "Salmos 119:75", hebrewReference: "תהילים קי״ט:ע״ה", hebrew: "יָדַ֣עְתִּי יְ֭הֹוָה כִּי־צֶ֣דֶק מִשְׁפָּטֶ֑יךָ וֶ֝אֱמוּנָ֗ה עִנִּיתָֽנִי׃", text: "75. Bem sei eu, ó Senhor, que os teus juizos são justos, e que segundo a tua fidelidade me affligiste." },
  angel_54: { reference: "Salmos 103:19", hebrewReference: "תהילים ק״ג:י״ט", hebrew: "יְֽהֹוָ֗ה בַּ֭שָּׁמַיִם הֵכִ֣ין כִּסְא֑וֹ וּ֝מַלְכוּת֗וֹ בַּכֹּ֥ל מָשָֽׁלָה׃", text: "19. O Senhor tem estabelecido o seu throno nos céus, e o seu reino domina sobre tudo." },
  angel_55: { reference: "Salmos 102:12", hebrewReference: "תהילים ק״ב:י״ג", hebrew: "וְאַתָּ֣ה יְ֭הֹוָה לְעוֹלָ֣ם תֵּשֵׁ֑ב וְ֝זִכְרְךָ֗ לְדֹ֣ר וָדֹֽר׃", text: "12. Mas tu, Senhor, permanecerás para sempre, e a tua memoria de geração em geração." },
  angel_56: { reference: "Salmos 145:14", hebrewReference: "תהילים קמ״ה:ט״ו", hebrew: "עֵֽינֵי־כֹ֭ל אֵלֶ֣יךָ יְשַׂבֵּ֑רוּ וְאַתָּ֤ה נֽוֹתֵן־לָהֶ֖ם אֶת־אׇכְלָ֣ם בְּעִתּֽוֹ׃", text: "14. O Senhor sustenta a todos os que caem, e levanta a todos os abatidos." },
  angel_57: { reference: "Salmos 115:11", hebrewReference: "תהילים קט״ו:י״א", hebrew: "יִרְאֵ֣י יְ֭הֹוָה בִּטְח֣וּ בַיהֹוָ֑ה עֶזְרָ֖ם וּמָגִנָּ֣ם הֽוּא׃", text: "11. Vós, os que temeis ao Senhor, confiae no Senhor: elle é o seu auxilio e o seu escudo." },
  angel_58: { reference: "Salmos 6:3", hebrewReference: "תהילים ו׳:ד׳", hebrew: "וְ֭נַפְשִׁי נִבְהֲלָ֣ה מְאֹ֑ד (ואת) [וְאַתָּ֥ה] יְ֝הֹוָ֗ה עַד־מָתָֽי׃", text: "3. Até a minha alma está perturbada; mas tu, Senhor, até quando?" },
  angel_59: { reference: "Salmos 113:3", hebrewReference: "תהילים קי״ג:ג׳", hebrew: "מִמִּזְרַח־שֶׁ֥מֶשׁ עַד־מְבוֹא֑וֹ מְ֝הֻלָּ֗ל שֵׁ֣ם יְהֹוָֽה׃", text: "3. Desde o nascimento do sol até ao occaso, seja louvado o nome do Senhor." },
  angel_60: { reference: "Salmos 145:17", hebrewReference: "תהילים קמ״ה:י״ח", hebrew: "קָר֣וֹב יְ֭הֹוָה לְכׇל־קֹרְאָ֑יו לְכֹ֤ל אֲשֶׁ֖ר יִקְרָאֻ֣הוּ בֶאֱמֶֽת׃", text: "17. Justo é o Senhor em todos os seus caminhos, e sancto em todas as suas obras." },
  angel_61: { reference: "Salmos 113:2", hebrewReference: "תהילים קי״ג:ב׳", hebrew: "יְהִ֤י שֵׁ֣ם יְהֹוָ֣ה מְבֹרָ֑ךְ מֵ֝עַתָּ֗ה וְעַד־עוֹלָֽם׃", text: "2. Seja bemdito o nome do Senhor, desde agora para sempre." },
  angel_62: { reference: "Salmos 119:159", hebrewReference: "תהילים קי״ט:קנ״ט", hebrew: "רְ֭אֵה כִּי־פִקּוּדֶ֣יךָ אָהָ֑בְתִּי יְ֝הֹוָ֗ה כְּֽחַסְדְּךָ֥ חַיֵּֽנִי׃", text: "159. Considera como amo os teus preceitos: vivifica-me, ó Senhor, segundo a tua benignidade." },
  angel_63: { reference: "Salmos 100:2", hebrewReference: "תהילים ק׳:ג׳", hebrew: "דְּע֗וּ כִּֽי־יְהֹוָה֮ ה֤וּא אֱלֹ֫הִ֥ים הֽוּא־עָ֭שָׂנוּ (ולא) [וְל֣וֹ] אֲנַ֑חְנוּ עַ֝מּ֗וֹ וְצֹ֣אן מַרְעִיתֽוֹ׃", text: "2. Servi ao Senhor com alegria; e entrae diante d’elle com canto." },
  angel_64: { reference: "Salmos 33:18", hebrewReference: "תהילים ל״ג:י״ח", hebrew: "הִנֵּ֤ה עֵ֣ין יְ֭הֹוָה אֶל־יְרֵאָ֑יו לַֽמְיַחֲלִ֥ים לְחַסְדּֽוֹ׃", text: "18. Eis que os olhos do Senhor estão sobre os que o temem, sobre os que esperam na sua misericordia;" },
  angel_65: { reference: "Salmos 90:13", hebrewReference: "תהילים צ׳:י״ג", hebrew: "שׁוּבָ֣ה יְ֭הֹוָה עַד־מָתָ֑י וְ֝הִנָּחֵ֗ם עַל־עֲבָדֶֽיךָ׃", text: "13. Volta-te para nós, Senhor: até quando? e aplaca-te para com os teus servos." },
  angel_66: { reference: "Salmos 38:21", hebrewReference: "תהילים ל״ח:כ״ב", hebrew: "אַל־תַּעַזְבֵ֥נִי יְהֹוָ֑ה אֱ֝לֹהַ֗י אַל־תִּרְחַ֥ק מִמֶּֽנִּי׃", text: "21. Não me desampares, Senhor, meu Deus, não te alongues de mim." },
  angel_67: { reference: "Salmos 37:4", hebrewReference: "תהילים ל״ז:ד׳", hebrew: "וְהִתְעַנַּ֥ג עַל־יְהֹוָ֑ה וְיִֽתֶּן־לְ֝ךָ֗ מִשְׁאֲלֹ֥ת לִבֶּֽךָ׃", text: "4. Deleita-te tambem no Senhor, e te concederá os desejos do teu coração." },
  angel_68: { reference: "Salmos 106:1", hebrewReference: "תהילים ק״ו:א׳", hebrew: "הַ֥לְלוּ־יָ֨הּ ׀ הוֹד֣וּ לַיהֹוָ֣ה כִּי־ט֑וֹב כִּ֖י לְעוֹלָ֣ם חַסְדּֽוֹ׃", text: "1. Louvae ao Senhor. Louvae ao Senhor, porque elle é bom, porque a sua misericordia dura para sempre." },
  angel_69: { reference: "Salmos 16:5", hebrewReference: "תהילים ט״ז:ה׳", hebrew: "יְֽהֹוָ֗ה מְנָת־חֶלְקִ֥י וְכוֹסִ֑י אַ֝תָּ֗ה תּוֹמִ֥יךְ גּוֹרָלִֽי׃", text: "5. O Senhor é a porção da minha herança e do meu calix: tu sustentas a minha sorte." },
  angel_70: { reference: "Gênesis 1:1", hebrewReference: "בראשית א׳:א׳", hebrew: "בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ׃", text: "1. No principio creou Deus os céus e a terra." },
  angel_71: { reference: "Salmos 109:30", hebrewReference: "תהילים ק״ט:ל״א", hebrew: "כִּֽי־יַ֭עֲמֹד לִימִ֣ין אֶבְי֑וֹן לְ֝הוֹשִׁ֗יעַ מִשֹּׁפְטֵ֥י נַפְשֽׁוֹ׃ פ", text: "30. Louvarei grandemente ao Senhor com a minha bocca: louval-o-hei entre a multidão." },
  angel_72: { reference: "Salmos 116:7", hebrewReference: "תהילים קט״ז:ז׳", hebrew: "שׁוּבִ֣י נַ֭פְשִׁי לִמְנוּחָ֑יְכִי כִּֽי־יְ֝הֹוָ֗ה גָּמַ֥ל עָלָֽיְכִי׃", text: "7. Alma minha, volta para o teu repouso, pois o Senhor te fez bem." },
};
