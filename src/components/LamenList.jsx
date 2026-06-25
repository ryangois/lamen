import { useMemo, useState } from 'react';
import { getContent } from '../data/content';
import { ringStructure } from '../data/rings';
import './LamenList.css';

const CATEGORY_NAMES = {
  elements: 'Elementos',
  planets: 'Planetas',
  zodiac: 'Signos',
  decanates: 'Decanatos',
  angels: '72 Anjos',
  archangels: 'Arcanjos e esferas',
  choirs: 'Coros angélicos',
};

const CATEGORY_ICONS = {
  elements: '🜁',
  planets: '☉',
  zodiac: '♈',
  decanates: '✦',
  angels: '𓆩✧𓆪',
  archangels: '✥',
  choirs: '◈',
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

const CHOIR_NAMES = {
  serafins: 'Serafins',
  querubins: 'Querubins',
  tronos: 'Tronos',
  dominacoes: 'Dominações',
  potencias: 'Potências',
  virtudes: 'Virtudes',
  principados: 'Principados',
  arcanjos: 'Arcanjos',
  anjos: 'Anjos',
};

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

const catalog = ringStructure.map((ring) => ({
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
      ...Object.keys(associations),
      ...Object.values(associations),
    ].join(' '));

    return {
      ...segment,
      category: ring.ringId,
      content,
      searchable,
      sign: associations.Signo || ZODIAC_NAMES[segment.id] || '',
      choir: associations.Coro || CHOIR_NAMES[segment.id] || '',
    };
  }),
}));

const signs = [...new Set(
  catalog.flatMap((category) => category.items.map((item) => item.sign).filter(Boolean)),
)];

const choirs = [...new Set(
  catalog.flatMap((category) => category.items.map((item) => item.choir).filter(Boolean)),
)];

export default function LamenList({ onSegmentClick, activeSegmentId }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sign, setSign] = useState('all');
  const [choir, setChoir] = useState('all');

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
          return matchesQuery && matchesSign && matchesChoir;
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [category, choir, query, sign]);

  const totalResults = filteredCatalog.reduce((total, group) => total + group.items.length, 0);
  const filtersActive = query || category !== 'all' || sign !== 'all' || choir !== 'all';

  const clearFilters = () => {
    setQuery('');
    setCategory('all');
    setSign('all');
    setChoir('all');
  };

  return (
    <section className="catalog-view" aria-label="Catálogo do Lamen">
      <div className="catalog-header">
        <div>
          <p className="catalog-eyebrow">Enciclopédia do Lamen</p>
          <h1 className="catalog-title brand-font">Explorar em lista</h1>
          <p className="catalog-intro">
            Pesquise os 149 símbolos e abra qualquer item para ver suas correspondências.
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

        <label>
          <span>Signo</span>
          <select value={sign} onChange={(event) => setSign(event.target.value)}>
            <option value="all">Todos</option>
            {signs.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
        </label>

        <label>
          <span>Coro</span>
          <select value={choir} onChange={(event) => setChoir(event.target.value)}>
            <option value="all">Todos</option>
            {choirs.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
        </label>

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
              <h2 className="brand-font">{group.name}</h2>
              <span>{group.items.length}</span>
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
