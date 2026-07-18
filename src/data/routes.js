import { ringStructure } from './rings';
import { treePaths, treeSephiroth, treeSpecialNodes } from './treeOfLife';

const ROUTE_CATEGORIES = {
  elements: 'elemento',
  planets: 'planeta',
  zodiac: 'signo',
  decanates: 'decanato',
  angels: 'anjo',
  archangels: 'sephirah',
  choirs: 'coro',
};

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

  const slug = slugify(title);
  return {
    id: segment.id,
    slug,
    category: ROUTE_CATEGORIES[ring.ringId],
    path: `/${ROUTE_CATEGORIES[ring.ringId]}/${slug}`,
  };
}));

const treeRouteItems = [
  ...treeSephiroth.map((item) => ({
    id: item.id,
    slug: slugify(item.name),
    category: 'sephirah',
    path: `/sephirah/${slugify(item.name)}`,
  })),
  ...treeSpecialNodes.map((item) => ({
    id: item.id,
    slug: slugify(item.name),
    category: 'nao-esfera',
    path: `/nao-esfera/${slugify(item.name)}`,
  })),
  ...treePaths.map((item) => ({
    id: item.id,
    slug: slugify(`${item.number} ${item.letter}`),
    category: 'caminho',
    path: `/caminho/${slugify(`${item.number} ${item.letter}`)}`,
  })),
];

const routeItems = [...ringRouteItems, ...treeRouteItems];

export function findRouteItem(idOrSlug) {
  if (!idOrSlug) return null;
  const path = String(idOrSlug).split('?')[0].replace(/\/+$/, '') || '/';
  const lastPart = path.split('/').filter(Boolean).at(-1) || path;
  const key = normalize(lastPart);
  return routeItems.find((item) => (
    item.id === idOrSlug
    || item.slug === key
    || item.path === path
  )) || null;
}

export function getRoutePath(idOrSlug) {
  return findRouteItem(idOrSlug)?.path || '/';
}
