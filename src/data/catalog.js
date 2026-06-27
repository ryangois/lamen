import { getContent } from './content';
import { ringStructure } from './rings';

export const CATEGORY_NAMES = {
  elements: 'Elementos',
  planets: 'Planetas',
  zodiac: 'Signos',
  decanates: 'Decanatos',
  angels: '72 Anjos',
  archangels: 'Arcanjos e esferas',
  choirs: 'Coros angélicos',
};

export const CATEGORY_ICONS = {
  elements: '🜁',
  planets: '☉',
  zodiac: '♈',
  decanates: '✦',
  angels: '𓆩✧𓆪',
  archangels: '✥',
  choirs: '◈',
};

export const ZODIAC_NAMES = {
  aries: 'Áries',
  taurus: 'Touro',
  gemini: 'Gêmeos',
  cancer: 'Câncer',
  leo: 'Leão',
  virgo: 'Virgem',
  libra: 'Libra',
  scorpio: 'Escorpião',
  sagittarius: 'Sagitário',
  capricorn: 'Capricórnio',
  aquarius: 'Aquário',
  pisces: 'Peixes',
};

export const ZODIAC_ORDER = Object.keys(ZODIAC_NAMES);

export function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

export function slugify(value) {
  return normalize(value)
    .replace(/^\d+\s*[.)-]?\s*/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const catalog = ringStructure.map((ring) => ({
  id: ring.ringId,
  name: CATEGORY_NAMES[ring.ringId],
  items: ring.segments.map((segment) => {
    const content = getContent(segment.id);
    const associations = content.associations || {};
    const searchable = normalize([
      segment.id,
      segment.label,
      segment.subLabel,
      segment.letters,
      segment.hebrew,
      content.title,
      content.subtitle,
      content.description,
      content.psalm?.reference,
      content.psalm?.text,
      content.psalm?.title,
      content.psalm?.note,
      content.psalm?.meditation,
      content.psalm?.source,
      ...Object.keys(associations),
      ...Object.values(associations),
    ].join(' '));

    return {
      ...segment,
      category: ring.ringId,
      categoryName: CATEGORY_NAMES[ring.ringId],
      content,
      searchable,
      slug: slugify(content.title || segment.subLabel || segment.label || segment.id),
      sign: associations.Signo || ZODIAC_NAMES[segment.id] || '',
      choir: associations.Coro || '',
      planet: associations['Planeta do decanato'] || associations['Planeta regente'] || associations.Esfera || '',
      element: associations.Elemento || '',
      sephirah: associations.Sephirah || '',
      number: Number(associations.Número || segment.num || 0),
    };
  }),
}));

export const flatItems = catalog.flatMap((group) => group.items);

export const signs = [...new Set(flatItems.map((item) => item.sign).filter(Boolean))];
export const choirs = [...new Set(flatItems.map((item) => item.choir).filter(Boolean))];
export const planets = [...new Set(flatItems.map((item) => item.planet).filter(Boolean))];
export const elements = [...new Set(flatItems.map((item) => item.element).filter(Boolean))];
export const sephiroth = [...new Set(flatItems.map((item) => item.sephirah).filter(Boolean))];

export function findCatalogItem(idOrSlug) {
  if (!idOrSlug) return null;
  const key = normalize(idOrSlug);
  return flatItems.find((item) => item.id === idOrSlug || item.slug === key || normalize(item.content.title) === key) || null;
}

export function getAngelByNumber(number) {
  return flatItems.find((item) => item.category === 'angels' && item.number === number) || null;
}
