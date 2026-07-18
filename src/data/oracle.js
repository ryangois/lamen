import { flatItems } from './catalog';
import { getContent } from './content';
import { treePaths, treeSephiroth, treeSpecialNodes } from './treeOfLife';

const TYPE_LABELS = {
  all: 'Tudo',
  angels: 'Anjos',
  tree: 'Árvore',
  paths: 'Caminhos',
  planets: 'Planetas',
  zodiac: 'Signos',
};

function fromCatalogItem(item) {
  const associations = item.content.associations || {};

  return {
    id: item.id,
    type: item.category,
    typeLabel: item.categoryName,
    title: item.content.title,
    subtitle: item.content.subtitle || item.content.description,
    color: item.color || '#d4af37',
    symbol: item.label || item.letters || item.content.associations?.Letra || '✦',
    keywords: [
      associations.Signo,
      associations.Coro,
      associations.Sephirah,
      associations.Elemento,
      associations.Esfera,
    ].filter(Boolean),
    content: item.content,
  };
}

function fromTreeNode(node, typeLabel = 'Árvore · Sephirah') {
  const content = getContent(node.id);

  return {
    id: node.id,
    type: node.nonSphere ? 'tree' : 'tree',
    typeLabel: node.nonSphere ? 'Árvore · Não-esfera' : typeLabel,
    title: content.title,
    subtitle: content.subtitle || content.description,
    color: node.color || '#d4af37',
    symbol: node.nonSphere ? '◇' : String(node.number),
    keywords: [node.name, node.hebrew, node.title].filter(Boolean),
    content,
  };
}

function fromTreePath(path) {
  const content = getContent(path.id);

  return {
    id: path.id,
    type: 'paths',
    typeLabel: 'Árvore · Caminho',
    title: content.title,
    subtitle: `${path.hebrew} · ${path.attribution} · ${path.tarot}`,
    color: '#d4af37',
    symbol: path.hebrew,
    keywords: [path.letter, path.attribution, path.tarot, path.fromName, path.toName],
    content,
  };
}

export const oracleTypes = [
  { id: 'all', label: TYPE_LABELS.all },
  { id: 'angels', label: TYPE_LABELS.angels },
  { id: 'tree', label: TYPE_LABELS.tree },
  { id: 'paths', label: TYPE_LABELS.paths },
  { id: 'planets', label: TYPE_LABELS.planets },
  { id: 'zodiac', label: TYPE_LABELS.zodiac },
];

export const oracleItems = [
  ...flatItems.map(fromCatalogItem),
  ...treeSephiroth.map((node) => fromTreeNode(node)),
  ...treeSpecialNodes.map((node) => fromTreeNode(node)),
  ...treePaths.map(fromTreePath),
];

export function getOraclePool(type = 'all') {
  if (type === 'all') return oracleItems;
  if (type === 'tree') return oracleItems.filter((item) => item.type === 'tree');
  return oracleItems.filter((item) => item.type === type);
}

export function drawOracleItem(type = 'all', previousId = null) {
  const pool = getOraclePool(type);
  if (pool.length === 0) return null;
  const candidates = pool.length > 1 ? pool.filter((item) => item.id !== previousId) : pool;
  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index];
}
