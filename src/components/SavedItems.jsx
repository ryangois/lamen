import { useState } from 'react';
import { flatItems } from '../data/catalog';
import { getContent } from '../data/content';
import { treePaths, treeSephiroth, treeSpecialNodes } from '../data/treeOfLife';
import './SavedItems.css';

function itemsFromEntries(entries) {
  return entries
    .map((entry) => {
      const id = typeof entry === 'string' ? entry : entry.id;
      const viewedAt = typeof entry === 'string' ? null : entry.viewedAt;
      const catalogItem = flatItems.find((item) => item.id === id);
      if (catalogItem) return { ...catalogItem, viewedAt };

      const sephirah = treeSephiroth.find((item) => item.id === id);
      const special = treeSpecialNodes.find((item) => item.id === id);
      const path = treePaths.find((item) => item.id === id);
      if (!sephirah && !special && !path) return null;

      return {
        id,
        color: sephirah ? '#d4af37' : '#9ca8b9',
        categoryName: sephirah ? 'Árvore · Sephirah' : special ? 'Árvore · Não-esfera' : 'Árvore · Caminho',
        content: getContent(id),
        viewedAt,
      };
    })
    .filter(Boolean);
}

function formatViewedAt(value) {
  if (!value) return '';
  const elapsedMinutes = Math.max(0, Math.floor((Date.now() - value) / 60000));
  if (elapsedMinutes < 1) return 'agora';
  if (elapsedMinutes < 60) return `há ${elapsedMinutes} min`;
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) return `há ${elapsedHours} h`;
  const elapsedDays = Math.floor(elapsedHours / 24);
  return `há ${elapsedDays} ${elapsedDays === 1 ? 'dia' : 'dias'}`;
}

function normalizeSearch(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function filterAndSortItems(items, query, category, order) {
  const normalizedQuery = normalizeSearch(query.trim());
  return items
    .filter((item) => (
      (!normalizedQuery
        || normalizeSearch(`${item.content.title} ${item.content.subtitle || ''} ${item.categoryName}`)
          .includes(normalizedQuery))
      && (category === 'all' || item.categoryName === category)
    ))
    .sort((first, second) => (
      order === 'recent'
        ? (second.viewedAt || 0) - (first.viewedAt || 0)
        : first.content.title.localeCompare(second.content.title, 'pt-BR', { numeric: true })
    ));
}

function SavedGroup({ title, emptyText, items, onSelect, onClear }) {
  return (
    <section className="saved-group">
      <div className="saved-group-heading">
        <h3 className="brand-font">{title}</h3>
        {items.length > 0 && onClear && (
          <button type="button" onClick={onClear}>Limpar histórico</button>
        )}
      </div>
      {items.length > 0 ? (
        <div className="saved-list">
          {items.map((item) => (
            <button
              type="button"
              className="saved-card"
              onClick={() => onSelect(item.id)}
              key={item.id}
            >
              <span style={{ '--saved-color': item.color || '#d4af37' }}></span>
              <strong>{item.content.title}</strong>
              <small>
                {item.categoryName}
                {item.viewedAt && <time dateTime={new Date(item.viewedAt).toISOString()}> · {formatViewedAt(item.viewedAt)}</time>}
              </small>
            </button>
          ))}
        </div>
      ) : (
        <p className="saved-empty">{emptyText}</p>
      )}
    </section>
  );
}

export default function SavedItems({
  collections,
  recentEntries,
  onCreateCollection,
  onDeleteCollection,
  onClearHistory,
  onClose,
  onSelect,
}) {
  const [activeCollectionId, setActiveCollectionId] = useState(collections[0]?.id || 'favorites');
  const [newCollectionName, setNewCollectionName] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [order, setOrder] = useState('name');
  const activeCollection = collections.find((collection) => collection.id === activeCollectionId)
    || collections[0];
  const allFavorites = itemsFromEntries(activeCollection?.itemIds || []);
  const allRecent = itemsFromEntries(recentEntries);
  const categories = [...new Set([...allFavorites, ...allRecent].map((item) => item.categoryName))]
    .sort((first, second) => first.localeCompare(second, 'pt-BR'));
  const favorites = filterAndSortItems(allFavorites, query, category, order);
  const recent = filterAndSortItems(allRecent, query, category, order);
  const handleCreateCollection = (event) => {
    event.preventDefault();
    const id = onCreateCollection?.(newCollectionName);
    if (id) {
      setActiveCollectionId(id);
      setNewCollectionName('');
    }
  };

  const handleDeleteCollection = () => {
    onDeleteCollection?.(activeCollection.id);
    setActiveCollectionId('favorites');
  };

  return (
    <div className="saved-backdrop" role="presentation">
      <aside className="saved-panel" role="dialog" aria-modal="true" aria-labelledby="saved-title">
        <button type="button" className="saved-close" onClick={onClose} aria-label="Fechar salvos">&times;</button>
        <p className="saved-eyebrow">Minha seleção</p>
        <h2 className="brand-font" id="saved-title">Favoritos e histórico</h2>
        <p className="saved-intro">
          Guarde símbolos para estudar depois e retorne aos últimos pontos abertos na roda.
        </p>

        <div className="saved-filters" aria-label="Filtrar itens salvos">
          <label className="saved-search">
            <span>Buscar</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Nome, tema ou categoria"
            />
          </label>
          <label>
            <span>Categoria</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">Todas</option>
              {categories.map((item) => <option value={item} key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Ordem</span>
            <select value={order} onChange={(event) => setOrder(event.target.value)}>
              <option value="name">Nome</option>
              <option value="recent">Mais recentes</option>
            </select>
          </label>
          {(query || category !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('all');
              }}
            >
              Limpar filtros
            </button>
          )}
        </div>

        <section className="saved-group collection-manager">
          <div className="saved-group-heading">
            <h3 className="brand-font">Coleções</h3>
            {activeCollection?.id !== 'favorites' && (
              <button type="button" onClick={handleDeleteCollection}>Excluir coleção</button>
            )}
          </div>
          <div className="collection-tabs" role="tablist" aria-label="Coleções de favoritos">
            {collections.map((collection) => (
              <button
                type="button"
                role="tab"
                aria-selected={collection.id === activeCollection?.id}
                className={collection.id === activeCollection?.id ? 'active' : ''}
                onClick={() => setActiveCollectionId(collection.id)}
                key={collection.id}
              >
                {collection.name}
                <span>{collection.itemIds.length}</span>
              </button>
            ))}
          </div>
          <form className="collection-create" onSubmit={handleCreateCollection}>
            <input
              value={newCollectionName}
              onChange={(event) => setNewCollectionName(event.target.value)}
              maxLength="36"
              placeholder="Nova coleção"
              aria-label="Nome da nova coleção"
            />
            <button type="submit" disabled={!newCollectionName.trim()}>Criar</button>
          </form>
          <SavedGroup
            title={activeCollection?.name || 'Favoritos'}
            emptyText={allFavorites.length > 0
              ? 'Nenhum item desta coleção corresponde aos filtros.'
              : 'Esta coleção está vazia. Abra uma ficha, toque na estrela e escolha onde salvar.'}
            items={favorites}
            onSelect={onSelect}
          />
        </section>
        <SavedGroup
          title="Últimos abertos"
          emptyText={allRecent.length > 0
            ? 'Nenhum item do histórico corresponde aos filtros.'
            : 'Seu histórico aparece aqui conforme você explora o Lâmen.'}
          items={recent}
          onSelect={onSelect}
          onClear={onClearHistory}
        />
      </aside>
    </div>
  );
}
