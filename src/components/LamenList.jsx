import { useMemo, useState } from 'react';
import {
  catalog,
  CATEGORY_ICONS,
  choirs,
  elements,
  normalize,
  planets,
  sephiroth,
  signs,
} from '../data/catalog';
import './LamenList.css';

function SelectFilter({ label, value, onChange, options }) {
  return (
    <label>
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="all">Todos</option>
        {options.map((item) => <option value={item} key={item}>{item}</option>)}
      </select>
    </label>
  );
}

export default function LamenList({ onSegmentClick, activeSegmentId }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sign, setSign] = useState('all');
  const [choir, setChoir] = useState('all');
  const [planet, setPlanet] = useState('all');
  const [element, setElement] = useState('all');
  const [sephirah, setSephirah] = useState('all');

  const filteredCatalog = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    return catalog
      .filter((group) => category === 'all' || group.id === category)
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          const matchesQuery = !normalizedQuery || item.searchable.includes(normalizedQuery);
          const matchesSign = sign === 'all' || item.sign === sign;
          const matchesChoir = choir === 'all' || item.choir === choir;
          const matchesPlanet = planet === 'all' || item.planet === planet;
          const matchesElement = element === 'all' || item.element === element;
          const matchesSephirah = sephirah === 'all' || item.sephirah === sephirah;
          return matchesQuery
            && matchesSign
            && matchesChoir
            && matchesPlanet
            && matchesElement
            && matchesSephirah;
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [category, choir, element, planet, query, sephirah, sign]);

  const totalResults = filteredCatalog.reduce((total, group) => total + group.items.length, 0);
  const filtersActive = query
    || category !== 'all'
    || sign !== 'all'
    || choir !== 'all'
    || planet !== 'all'
    || element !== 'all'
    || sephirah !== 'all';

  const clearFilters = () => {
    setQuery('');
    setCategory('all');
    setSign('all');
    setChoir('all');
    setPlanet('all');
    setElement('all');
    setSephirah('all');
  };

  return (
    <section className="catalog-view" aria-label="Catálogo do Lamen">
      <div className="catalog-header">
        <div>
          <p className="catalog-eyebrow">Enciclopédia do Lamen</p>
          <h1 className="catalog-title brand-font">Explorar em lista</h1>
          <p className="catalog-intro">
            Pesquise os 149 símbolos e refine por signo, coro, planeta, elemento ou esfera.
          </p>
        </div>

        <div className="catalog-search">
          <label htmlFor="lamen-search">Buscar</label>
          <div className="search-field">
            <span aria-hidden="true">⌕</span>
            <input
              id="lamen-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Nome, número, planeta, salmo…"
            />
          </div>
        </div>
      </div>

      <div className="catalog-filters" aria-label="Filtros do catálogo">
        <label>
          <span>Categoria</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">Todas</option>
            {catalog.map((group) => (
              <option value={group.id} key={group.id}>{group.name}</option>
            ))}
          </select>
        </label>

        <SelectFilter label="Signo" value={sign} onChange={setSign} options={signs} />
        <SelectFilter label="Coro" value={choir} onChange={setChoir} options={choirs} />
        <SelectFilter label="Planeta" value={planet} onChange={setPlanet} options={planets} />
        <SelectFilter label="Elemento" value={element} onChange={setElement} options={elements} />
        <SelectFilter label="Sephirah" value={sephirah} onChange={setSephirah} options={sephiroth} />

        <div className="result-summary" aria-live="polite">
          <strong>{totalResults}</strong>
          <span>{totalResults === 1 ? 'resultado' : 'resultados'}</span>
          {filtersActive && (
            <button type="button" onClick={clearFilters}>Limpar filtros</button>
          )}
        </div>
      </div>

      <div className="catalog-content">
        {filteredCatalog.length > 0 ? filteredCatalog.map((group) => (
          <section className="catalog-group" key={group.id}>
            <div className="group-heading">
              <span className="group-icon" aria-hidden="true">{CATEGORY_ICONS[group.id]}</span>
              <span className="folder-copy">
                <strong className="brand-font">{group.name}</strong>
                <small>{group.items.length} {group.items.length === 1 ? 'item' : 'itens'}</small>
              </span>
              <span className="folder-count">{group.items.length}</span>
            </div>

            <div className="catalog-grid">
              {group.items.map((item) => (
                <button
                  type="button"
                  className={`catalog-card ${activeSegmentId === item.id ? 'active' : ''}`}
                  style={{ '--item-color': item.color || '#d4af37' }}
                  onClick={() => onSegmentClick(item.id)}
                  key={item.id}
                >
                  <span className="card-marker" aria-hidden="true"></span>
                  <span className="card-copy">
                    <strong>{item.content.title}</strong>
                    <small>{item.content.subtitle}</small>
                    {item.content.psalm && (
                      <em>{item.content.psalm.hebrewReference || item.content.psalm.reference}</em>
                    )}
                  </span>
                  <span className="card-arrow" aria-hidden="true">›</span>
                </button>
              ))}
            </div>
          </section>
        )) : (
          <div className="empty-results">
            <span aria-hidden="true">◇</span>
            <h2 className="brand-font">Nenhum símbolo encontrado</h2>
            <p>Tente outra busca ou remova algum filtro.</p>
            <button type="button" onClick={clearFilters}>Mostrar tudo</button>
          </div>
        )}
      </div>
    </section>
  );
}
