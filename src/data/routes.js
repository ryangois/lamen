import { ringStructure } from './rings';
import { treePaths, treeSephiroth, treeSpecialNodes } from './treeOfLife';

const ZODIAC_NAMES = {
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

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

function slugify(value) {
  return normalize(value)
    .replace(/^\d+\s*[.)-]?\s*/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const ringRouteItems = ringStructure.flatMap((ring) => ring.segments.map((segment) => {
  const title = segment.subLabel
    || ZODIAC_NAMES[segment.id]
    || segment.label
    || segment.id;

  return {
    id: segment.id,
    slug: slugify(title),
  };
}));

const treeRouteItems = [
  ...treeSephiroth.map((item) => ({
    id: item.id,
    slug: slugify(item.name),
  })),
  ...treeSpecialNodes.map((item) => ({
    id: item.id,
    slug: slugify(item.name),
  })),
  ...treePaths.map((item) => ({
    id: item.id,
    slug: slugify(`${item.number} ${item.letter}`),
  })),
];

const routeItems = [...ringRouteItems, ...treeRouteItems];

export function findRouteItem(idOrSlug) {
  if (!idOrSlug) return null;
  const key = normalize(idOrSlug);
  return routeItems.find((item) => item.id === idOrSlug || item.slug === key) || null;
}
