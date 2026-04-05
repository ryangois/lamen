// This file defines the geometry of the rings.
// In a full application, you would generate this algorithmically or transcribe all entries.
// We are providing a representative structure here.

export const ringStructure = [
    // Ring 0: Inner Elements (4 segments)
    {
        ringId: "elements",
        innerRadius: 0,
        outerRadius: 60,
        segments: [
            { id: "fire", label: "🜂 Fire", color: "#e63946" },
            { id: "water", label: "🜄 Water", color: "#1d3557" },
            { id: "air", label: "🜁 Air", color: "#ffb703" },
            { id: "earth", label: "🜃 Earth", color: "#2a9d8f" }
        ]
    },
    // Ring 1: Hebrew Letters / Simple Associations
    {
        ringId: "hebrew",
        innerRadius: 65,
        outerRadius: 105,
        segments: [
            { id: "aleph", label: "א (Aleph)", color: "#111" },
            { id: "beth", label: "ב (Beth)", color: "#1a1a2e" },
            { id: "gimel", label: "ג (Gimel)", color: "#111" },
            { id: "daleth", label: "ד (Daleth)", color: "#1a1a2e" },
            { id: "he", label: "ה (He)", color: "#111" },
            { id: "vav", label: "ו (Vav)", color: "#1a1a2e" },
            { id: "zayin", label: "ז (Zayin)", color: "#111" },
            { id: "cheth", label: "ח (Cheth)", color: "#1a1a2e" }
        ]
    },
    // Ring 2: Tarot Cards snippet (e.g. out of 22)
    {
        ringId: "tarot",
        innerRadius: 110,
        outerRadius: 160,
        segments: [
            { id: "fool", label: "0 - O LOUCO", color: "#ffd166" },
            { id: "magician", label: "1 - O MAGO", color: "#ef476f" },
            { id: "priestess", label: "2 - A SACERDOTISA", color: "#118ab2" },
            { id: "empress", label: "3 - A IMPERATRIZ", color: "#06d6a0" },
            { id: "emperor", label: "4 - O IMPERADOR", color: "#c1121f" },
            { id: "hierophant", label: "5 - O HIEROFANTE", color: "#e36414" },
            { id: "lovers", label: "6 - OS AMANTES", color: "#8338ec" },
            { id: "chariot", label: "7 - O CARRO", color: "#3a86ff" },
            { id: "justice", label: "8 - A JUSTIÇA", color: "#38b000" },
            { id: "hermit", label: "9 - O EREMITA", color: "#6a4c93" },
            { id: "wheel", label: "10 - A RODA", color: "#0077b6" },
            { id: "strength", label: "11 - A FORÇA", color: "#fca311" },
        ]
    },
    // Ring 3: Angels of shem hamephorash (Snippet 1-12 out of 72)
    {
        ringId: "angels",
        innerRadius: 165,
        outerRadius: 280,
        segments: Array.from({ length: 24 }).map((_, i) => {
            const demoNames = [
                "VEHUIAH", "JELIEL", "SITAEL", "ELEMIAH", "MAHASIAH",
                "LELAHEL", "ACHAIAH", "CAHETEL", "HAZIEL", "ALADIAH",
                "LAUVIAH", "HAHAHIAH", "YESALEL", "MEBAHEL", "HARIEL",
                "HEKAMIAH", "LAUVIAH", "CALIEL", "LEUVIAH", "PAHALIAH",
                "NELCHAEL", "YEIAYEL", "MELAHEL", "HAHEUIAH"
            ];
            // Colors cycling through warm/cool
            const colors = ["#d90429", "#fb8500", "#ffb703", "#023047", "#219ebc", "#8ecae6", "#502f4c", "#9b5de5", "#f15bb5", "#00bbf9"];
            return {
                id: `angel_${i + 1}`,
                label: `${i + 1} - ${demoNames[i]}`,
                color: colors[i % colors.length]
            };
        })
    },
    // Ring 4: Choirs (Outer ring)
    {
        ringId: "choirs",
        innerRadius: 285,
        outerRadius: 310,
        segments: [
            { id: "seraphings", label: "SERAFINS", color: "#ddd" },
            { id: "querubins", label: "QUERUBINS", color: "#ccc" },
            { id: "tronos", label: "TRONOS", color: "#bbb" },
            { id: "dominacoes", label: "DOMINAÇÕES", color: "#3a0ca3" },
            { id: "potencias", label: "POTÊNCIAS", color: "#d90429" },
            { id: "virtudes", label: "VIRTUDES", color: "#ffff3f" },
            { id: "principados", label: "PRINCIPADOS", color: "#06d6a0" },
            { id: "arcanjos", label: "ARCANJOS", color: "#ff9e00" },
            { id: "anjos", label: "ANJOS", color: "#9b5de5" }
        ]
    }
];
