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
].map((item) => {
  const content = getContent(item.id);
  return {
    ...item,
    content,
    searchable: normalize([
      content.title,
      content.subtitle,
      content.description,
      ...Object.keys(content.associations || {}),
      ...Object.values(content.associations || {}),
      ...(content.highlights || []),
      ...(content.history || []).flatMap((section) => section.paragraphs || []),
      ...(content.variations || []).flatMap((variation) => [variation.name, variation.description]),
    ].join(' ')),
  };
});

const searchItems = [
  ...flatItems,
  ...treeItems.filter((treeItem) => !flatItems.some((item) => item.id === treeItem.id)),
];

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
    return searchItems
      .filter((item) => item.searchable.includes(normalizedQuery))
      .sort((a, b) => scoreItem(a, normalizedQuery) - scoreItem(b, normalizedQuery))
      .slice(0, 40);
  }, [normalizedQuery]);

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
