// This file holds the display content for the items.
// When a segment is clicked, the App fetches from here based on its 'id'.

export const contentData = {
    // Elements
    "fire": {
        title: "The Element of Fire",
        subtitle: "Will, Energy, Transformation",
        image: "https://images.unsplash.com/photo-1543081977-802521d96001?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Fire is the element of transformation, passion, and personal power. It relates to the suite of Wands in Taro and the realm of Atziluth in the Kabbalistic Tree of Life.",
        associations: {
            "Direction": "South",
            "Colors": "Red, Gold, Orange",
            "Archangel": "Michael",
            "Qualities": "Hot and Dry"
        }
    },
    "water": {
        title: "The Element of Water",
        subtitle: "Emotion, Intuition, Unconscious",
        image: "https://images.unsplash.com/photo-1518381832049-5a82200ae30c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Water symbolizes the deep realms of intuition and emotion. It corresponds to the suit of Cups, Briah in Kabbalah, and the emotional, psychic depths of our nature.",
        associations: {
            "Direction": "West",
            "Colors": "Blue, Sea Green",
            "Archangel": "Gabriel",
            "Qualities": "Cold and Wet"
        }
    },

    // Hebrew Letters
    "aleph": {
        title: "Aleph (א)",
        subtitle: "The Fool / Air",
        image: "https://images.unsplash.com/photo-1444491741275-3747c5361dbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Aleph is the first letter of the Hebrew alphabet. It represents the vital breath, the primordial nothingness, and corresponds to the element of Air and The Fool card in tarot.",
        associations: {
            "Value": "1",
            "Meaning": "Ox",
            "Element": "Air"
        }
    },

    // Tarot
    "fool": {
        title: "0 - O Louco",
        subtitle: "The Spirit inside the Aether",
        image: "https://images.unsplash.com/photo-1516981879613-9f5da904015f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "O Louco (The Fool) represents new beginnings, spontaneity, and free spirit. It corresponds to the Hebrew letter Aleph and the element of Air in Hermetic Qabalah.",
        associations: {
            "Planet": "Uranus",
            "Hebrew Letter": "Aleph",
            "Element": "Air"
        }
    },

    // Angels
    "angel_1": {
        title: "1. Vehuiah (והויה)",
        subtitle: "Exalted God Above All Creatures",
        image: "https://images.unsplash.com/photo-1508210459528-7fd8bb0296ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Vehuiah is the 1st angel of the Shem HaMephorash, belonging to the choir of Seraphim. He aids in undertaking and executing the most difficult tasks. Grants willpower and divine energy.",
        associations: {
            "Choir": "Seraphim",
            "Archangel": "Metatron",
            "Planet": "Mars & Uranus",
            "Degree": "0° - 5° Aries"
        }
    }
};

export function getContent(id) {
    // If the specific id exists, return it, otherwise return a default template.
    return contentData[id] || {
        title: `Mystery of ${id.toUpperCase()}`,
        subtitle: "Information is currently sealed.",
        image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "The texts related to this facet of the Lamen have not yet been transcribed. The ancient knowledge here waits for realization.",
        associations: {
            "Status": "Pending translation",
            "Note": "You can add this content easily in content.js by defining the key '" + id + "'."
        }
    };
}
