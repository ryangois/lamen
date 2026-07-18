import { useMemo, useRef, useState } from 'react';
import { flatItems, normalize } from '../data/catalog';
import { getContent } from '../data/content';
import { treePaths, treeSephiroth, treeSpecialNodes } from '../data/treeOfLife';
import './GlobalSearch.css';

const treeItems = [
  ...treeSephiroth.map((item) => ({
    id: item.id,
    categoryName: 'Árvore · Sephirah',
    color: item.color,
  })),
  ...treeSpecialNodes.map((item) => ({
    id: item.id,
    categoryName: 'Árvore · Não-esfera',
    color: item.color,
  })),
  ...treePaths.map((item) => ({
    id: item.id,
    categoryName: 'Árvore · Caminho',
    color: '#d4af37',
  })),
].map((item) => ({ ...item, content: getContent(item.id) }));

const baseSearchItems = [
  ...flatItems,
  ...treeItems.filter((treeItem) => !flatItems.some((item) => item.id === treeItem.id)),
];

const SEARCH_ALIASES = [
  ['sephirah', 'sephiroth', 'sefirah', 'sefirot', 'sefira', 'esfera', 'emanacao'],
  ['anjo', 'anjos', 'angel', 'shem', 'nome angelico'],
  ['salmo', 'salmos', 'psalm', 'verso', 'versiculo'],
  ['tarot', 'arcano', 'arcanos', 'carta', 'rider waite', 'marselha', 'thoth'],
  ['gematria', 'valor numerico', 'numero hebraico'],
  ['hebraico', 'hebrew', 'letra hebraica', 'transliteracao'],
  ['arvore', 'arvore da vida', 'cabala', 'kabbalah', 'qabalah'],
  ['caminho', 'caminhos', 'path', 'sefer yetzirah'],
];

const STARTER_SUGGESTIONS = [
  'Salmos em hebraico',
  'Gematria',
  'Tarot de Marselha',
  'Tarot Thoth',
  'Sephiroth',
  'Anjos de Áries',
  'Planetas',
  'Sefer Yetzirah',
];

function flattenSearchValue(value, key = '') {
  if (value == null || ['image', 'url', 'sourceUrl'].includes(key)) return [];
  if (Array.isArray(value)) return value.flatMap((item) => flattenSearchValue(item, key));
  if (typeof value === 'object') {
    return Object.entries(value).flatMap(([childKey, childValue]) => [
      childKey,
      ...flattenSearchValue(childValue, childKey),
    ]);
  }
  return typeof value === 'string' || typeof value === 'number' ? [String(value)] : [];
}

function aliasesFor(text) {
  const normalizedText = normalize(text);
  return SEARCH_ALIASES
    .filter((group) => group.some((term) => normalizedText.includes(normalize(term))))
    .flat();
}

const searchItems = baseSearchItems.map((item) => {
  const contentTerms = flattenSearchValue(item.content);
  return {
    ...item,
    searchable: normalize([
      item.categoryName,
      ...contentTerms,
      ...aliasesFor(`${item.categoryName} ${contentTerms.join(' ')}`),
    ].join(' ')),
  };
});

function queryVariants(query) {
  const matchingGroup = SEARCH_ALIASES.find((group) => group.some((term) => normalize(term) === query));
  return matchingGroup ? matchingGroup.map(normalize) : [query];
}

function scoreItem(item, query) {
  const title = normalize(item.content.title);
  if (title === query) return 0;
  if (title.startsWith(query)) return 1;
  if (title.includes(query)) return 2;
  return 3;
}

export default function GlobalSearch({ onClose, onSelect }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const normalizedQuery = normalize(query.trim());
  const results = useMemo(() => {
    if (!normalizedQuery) return searchItems.slice(0, 12);
    const terms = normalizedQuery.split(/\s+/).filter(Boolean);
    return searchItems
      .filter((item) => terms.every((term) => (
        queryVariants(term).some((variant) => item.searchable.includes(variant))
      )))
      .sort((a, b) => scoreItem(a, normalizedQuery) - scoreItem(b, normalizedQuery))
      .slice(0, 40);
  }, [normalizedQuery]);
  const suggestions = useMemo(() => {
    if (!normalizedQuery) return STARTER_SUGGESTIONS.slice(0, 6);
    const matching = STARTER_SUGGESTIONS.filter((suggestion) => (
      normalize(suggestion).includes(normalizedQuery)
      || aliasesFor(suggestion).some((alias) => normalize(alias).includes(normalizedQuery))
    ));
    const resultSuggestions = results.slice(0, 4).map((item) => item.content.title);
    return [...new Set([...matching, ...resultSuggestions])]
      .filter((suggestion) => normalize(suggestion) !== normalizedQuery)
      .slice(0, 6);
  }, [normalizedQuery, results]);

  const groupedResults = Object.groupBy
    ? Object.groupBy(results, (item) => item.categoryName)
    : results.reduce((groups, item) => {
        groups[item.categoryName] = [...(groups[item.categoryName] || []), item];
        return groups;
      }, {});

  return (
    <div className="global-search-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="global-search-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="global-search-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <span>Busca universal</span>
            <h2 className="brand-font" id="global-search-title">Encontre qualquer símbolo</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar busca">×</button>
        </header>

        <label className="global-search-field">
          <span aria-hidden="true">⌕</span>
          <input
            ref={inputRef}
            type="search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Anjo, letra, salmo, planeta, conceito…"
            aria-label="Buscar em toda a enciclopédia"
          />
          <kbd>/</kbd>
        </label>

        <div className="global-search-summary" aria-live="polite">
          <span>{normalizedQuery ? `${results.length} resultados` : 'Sugestões para começar'}</span>
          <small>Anjos, Árvore, Tarot, signos, planetas e textos</small>
        </div>
        {suggestions.length > 0 && (
          <div className="global-search-suggestions" aria-label="Sugestões de busca">
            {suggestions.map((suggestion) => (
              <button type="button" onClick={() => setQuery(suggestion)} key={suggestion}>
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div className="global-search-results">
          {results.length > 0 ? Object.entries(groupedResults).map(([group, items]) => (
            <section key={group}>
              <h3>{group}</h3>
              <div>
                {items.map((item) => (
                  <button
                    type="button"
                    onClick={() => onSelect(item.id)}
                    style={{ '--search-color': item.color || '#d4af37' }}
                    key={item.id}
                  >
                    <span aria-hidden="true"></span>
                    <strong>{item.content.title}</strong>
                    <small>{item.content.subtitle || item.categoryName}</small>
                    <b aria-hidden="true">→</b>
                  </button>
                ))}
              </div>
            </section>
          )) : (
            <div className="global-search-empty">
              <span aria-hidden="true">◇</span>
              <strong>Nenhum resultado</strong>
              <p>Tente uma grafia alternativa, categoria ou palavra associada.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
