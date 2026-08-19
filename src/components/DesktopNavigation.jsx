import './DesktopNavigation.css';

function NavIcon({ name }) {
  const paths = {
    wheel: <><circle cx="12" cy="12" r="7.5" /><circle cx="12" cy="12" r="2" /><path d="M12 4.5V10m0 4v5.5M4.5 12H10m4 0h5.5" /></>,
    list: <><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.5" cy="6" r="1" /><circle cx="4.5" cy="12" r="1" /><circle cx="4.5" cy="18" r="1" /></>,
    tree: <><circle cx="12" cy="4.5" r="2" /><circle cx="6" cy="18.5" r="2" /><circle cx="18" cy="18.5" r="2" /><circle cx="12" cy="12" r="2" /><path d="M12 6.5V10m-1.5 3.5-3 3.5m6-3.5 3 3.5" /></>,
    oracle: <><circle cx="12" cy="12" r="7.5" /><path d="M12 2.5V6m0 12v3.5M2.5 12H6m12 0h3.5M7 7l2 2m6 6 2 2m0-10-2 2m-6 6-2 2" /></>,
    search: <><circle cx="10.5" cy="10.5" r="5.5" /><path d="m15 15 4.5 4.5" /></>,
    study: <><path d="M5 4.5h10.5A2.5 2.5 0 0 1 18 7v12H7.5A2.5 2.5 0 0 1 5 16.5v-12Z" /><path d="M8 8h7M8 11.5h7M7.5 19A2.5 2.5 0 0 1 5 16.5" /></>,
    angel: <><ellipse cx="12" cy="4.25" rx="3.5" ry="1.55" /><circle cx="12" cy="9" r="2.25" /><path d="M8.8 13.2C6 11.4 3.8 12.8 4.1 16.8c2.2-.1 3.9.65 5.15 2.2M15.2 13.2c2.8-1.8 5-0.4 4.7 3.6-2.2-.1-3.9.65-5.15 2.2M8.8 19c.35-3.75 1.4-5.7 3.2-5.7s2.85 1.95 3.2 5.7" /></>,
    saved: <path d="m12 3.8 2.5 5 5.5.8-4 3.9.95 5.5L12 16.4 7.05 19 8 13.5 4 9.6l5.5-.8L12 3.8Z" />,
    blog: <><path d="M6 4.5h12v15H6z" /><path d="M9 8h6M9 11.5h6M9 15h4" /></>,
    methodology: <><path d="M5 5.5h5.5A2.5 2.5 0 0 1 13 8v11H7.5A2.5 2.5 0 0 1 5 16.5v-11Z" /><path d="M19 5.5h-3A3 3 0 0 0 13 8v11h3.5a2.5 2.5 0 0 0 2.5-2.5v-11Z" /></>,
    help: <><circle cx="12" cy="12" r="8.5" /><path d="M9.8 9.2a2.35 2.35 0 1 1 3.25 2.18c-.72.32-1.05.82-1.05 1.62v.35" /><path d="M12 17.2h.01" /></>,
  };

  return (
    <svg className="desktop-nav-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function NavigationButton({ icon, label, description, active = false, badge, onClick }) {
  return (
    <button
      type="button"
      className={`desktop-nav-item ${active ? 'active' : ''}`}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
    >
      <span className="desktop-nav-item-icon"><NavIcon name={icon} /></span>
      <span className="desktop-nav-copy">
        <strong>{label}</strong>
        {description && <small>{description}</small>}
      </span>
      {badge > 0 && <b className="desktop-nav-badge">{badge}</b>}
    </button>
  );
}

export default function DesktopNavigation({
  view,
  savedCount,
  onViewChange,
  onSearch,
  onStudy,
  onAngelFinder,
  onSaved,
  onBlog,
  onMethodology,
  onTutorial,
}) {
  return (
    <aside className="desktop-navigation" aria-label="Navegação principal">
      <div className="desktop-brand">
        <img className="desktop-brand-mark" src="/favicon.svg" alt="" width="46" height="46" />
        <div>
          <strong className="brand-font">Hermetika</strong>
          <span>Enciclopédia hermética</span>
        </div>
      </div>

      <button type="button" className="desktop-search" onClick={onSearch}>
        <NavIcon name="search" />
        <span>Buscar na enciclopédia</span>
        <kbd>/</kbd>
      </button>

      <nav className="desktop-nav-sections">
        <section>
          <p>Explorar</p>
          <NavigationButton icon="wheel" label="Roda" description="Mapa de correspondências" active={view === 'wheel'} onClick={() => onViewChange('wheel')} />
          <NavigationButton icon="list" label="Catálogo" description="Navegação por categorias" active={view === 'list'} onClick={() => onViewChange('list')} />
          <NavigationButton icon="tree" label="Árvore da Vida" description="Esferas e caminhos" active={view === 'tree'} onClick={() => onViewChange('tree')} />
          <NavigationButton icon="oracle" label="Oráculo" description="Consulta simbólica" active={view === 'oracle'} onClick={() => onViewChange('oracle')} />
        </section>

        <section>
          <p>Biblioteca</p>
          <NavigationButton icon="study" label="Trilha de estudo" onClick={onStudy} />
          <NavigationButton icon="angel" label="Meu anjo" onClick={onAngelFinder} />
          <NavigationButton icon="saved" label="Salvos" badge={savedCount} onClick={onSaved} />
          <NavigationButton icon="blog" label="Blog" description="Ensaios e reflexões" active={view === 'blog'} onClick={onBlog} />
        </section>
      </nav>

      <div className="desktop-nav-footer">
        <button type="button" onClick={onMethodology}><NavIcon name="methodology" /> Metodologia</button>
        <button type="button" onClick={onTutorial}><NavIcon name="help" /> Tutorial</button>
      </div>
    </aside>
  );
}
