import { flatItems } from '../data/catalog';
import { getContent } from '../data/content';
import { treePaths, treeSephiroth } from '../data/treeOfLife';
import './SavedItems.css';

function itemsFromIds(ids) {
  return ids
    .map((id) => {
      const catalogItem = flatItems.find((item) => item.id === id);
      if (catalogItem) return catalogItem;

      const sephirah = treeSephiroth.find((item) => item.id === id);
      const path = treePaths.find((item) => item.id === id);
      if (!sephirah && !path) return null;

      return {
        id,
        color: sephirah ? '#d4af37' : '#9ca8b9',
        categoryName: sephirah ? 'Árvore · Sephirah' : 'Árvore · Caminho',
        content: getContent(id),
      };
    })
    .filter(Boolean);
}

function SavedGroup({ title, emptyText, items, onSelect }) {
  return (
    <section className="saved-group">
      <h3 className="brand-font">{title}</h3>
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
              <small>{item.categoryName}</small>
            </button>
          ))}
        </div>
      ) : (
        <p className="saved-empty">{emptyText}</p>
      )}
    </section>
  );
}

export default function SavedItems({ favoriteIds, recentIds, onClose, onSelect }) {
  const favorites = itemsFromIds(favoriteIds);
  const recent = itemsFromIds(recentIds);

  return (
    <div className="saved-backdrop" role="presentation">
      <aside className="saved-panel" role="dialog" aria-modal="true" aria-labelledby="saved-title">
        <button type="button" className="saved-close" onClick={onClose} aria-label="Fechar salvos">&times;</button>
        <p className="saved-eyebrow">Minha seleção</p>
        <h2 className="brand-font" id="saved-title">Favoritos e histórico</h2>
        <p className="saved-intro">
          Guarde símbolos para estudar depois e retorne aos últimos pontos abertos na roda.
        </p>

        <SavedGroup
          title="Favoritos"
          emptyText="Nenhum favorito ainda. Abra uma ficha e toque na estrela."
          items={favorites}
          onSelect={onSelect}
        />
        <SavedGroup
          title="Últimos abertos"
          emptyText="Seu histórico aparece aqui conforme você explora o Lamen."
          items={recent}
          onSelect={onSelect}
        />
      </aside>
    </div>
  );
}
