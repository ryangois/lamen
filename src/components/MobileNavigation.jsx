import { useRef, useState } from 'react';
import { useDialogFocus } from '../hooks/useDialogFocus';
import './MobileNavigation.css';

function MenuIcon({ name }) {
  const paths = {
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="M6.5 6.5l11 11m0-11-11 11" />,
    search: <><circle cx="10.5" cy="10.5" r="5.5" /><path d="m15 15 4.5 4.5" /></>,
    wheel: <><circle cx="12" cy="12" r="7.5" /><circle cx="12" cy="12" r="2" /><path d="M12 4.5v5.5m0 4v5.5M4.5 12H10m4 0h5.5" /></>,
    list: <><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.5" cy="6" r="1" /><circle cx="4.5" cy="12" r="1" /><circle cx="4.5" cy="18" r="1" /></>,
    tree: <><circle cx="12" cy="4.5" r="2" /><circle cx="6" cy="18.5" r="2" /><circle cx="18" cy="18.5" r="2" /><circle cx="12" cy="12" r="2" /><path d="M12 6.5V10m-1.5 3.5-3 3.5m6-3.5 3 3.5" /></>,
    oracle: <><circle cx="12" cy="12" r="7.5" /><path d="M12 2.5V6m0 12v3.5M2.5 12H6m12 0h3.5M7 7l2 2m6 6 2 2m0-10-2 2m-6 6-2 2" /></>,
    angel: <><path d="M12 5.5c2-3 5.5-2.5 6.5.5.9 2.7-1 5.7-6.5 8.5C6.5 11.7 4.6 8.7 5.5 6 6.5 3 10 2.5 12 5.5Z" /><path d="M9.5 17.5h5M12 14.5v5" /></>,
    saved: <path d="m12 3.8 2.5 5 5.5.8-4 3.9.95 5.5L12 16.4 7.05 19 8 13.5 4 9.6l5.5-.8L12 3.8Z" />,
    study: <><path d="M5 4.5h10.5A2.5 2.5 0 0 1 18 7v12H7.5A2.5 2.5 0 0 1 5 16.5v-12Z" /><path d="M8 8h7M8 11.5h7M7.5 19A2.5 2.5 0 0 1 5 16.5" /></>,
    tutorial: <><circle cx="12" cy="12" r="8.5" /><path d="M9.8 9.2a2.35 2.35 0 1 1 3.25 2.18c-.72.32-1.05.82-1.05 1.62v.35" /><path d="M12 17.2h.01" /></>,
    install: <><path d="M12 3v12m-4-4 4 4 4-4" /><path d="M5 18.5h14" /></>,
    chevron: <path d="m8.5 10 3.5 3.5 3.5-3.5" />,
  };

  return (
    <svg className="mobile-menu-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const viewNames = {
  wheel: 'Roda',
  list: 'Lista',
  tree: 'Árvore',
  oracle: 'Oráculo',
};

export default function MobileNavigation({
  open,
  view,
  savedCount,
  onOpen,
  onClose,
  onViewChange,
  onSearch,
  onStudy,
  onTutorial,
  onAngelFinder,
  onSaved,
  canInstall,
  onInstall,
}) {
  const drawerRef = useRef(null);
  const [lamenExpanded, setLamenExpanded] = useState(['wheel', 'list'].includes(view));
  useDialogFocus(drawerRef, open);

  const chooseView = (nextView) => {
    onViewChange(nextView);
    onClose();
  };

  const runAndClose = (action) => {
    onClose();
    action();
  };

  return (
    <>
      <header className="mobile-topbar" aria-label="Navegação principal">
        <button
          type="button"
          className="mobile-topbar-button"
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="mobile-navigation-drawer"
          onClick={onOpen}
        >
          <MenuIcon name="menu" />
        </button>
        <div className="mobile-brand" aria-label={`Lâmen · ${viewNames[view]}`}>
          <strong className="brand-font">Lâmen</strong>
          <span>{viewNames[view]}</span>
        </div>
        <button
          type="button"
          className="mobile-topbar-button"
          aria-label="Buscar na enciclopédia"
          onClick={onSearch}
        >
          <MenuIcon name="search" />
        </button>
      </header>

      {open && (
        <div className="mobile-drawer-backdrop" onMouseDown={onClose} role="presentation">
          <aside
            ref={drawerRef}
            className="mobile-drawer"
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            tabIndex="-1"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="mobile-drawer-header">
              <div>
                <span>Navegação</span>
                <h2 className="brand-font" id="mobile-menu-title">Lâmen</h2>
              </div>
              <button type="button" onClick={onClose} aria-label="Fechar menu">
                <MenuIcon name="close" />
              </button>
            </div>

            <nav className="mobile-drawer-nav" aria-label="Seções do site">
              <button
                type="button"
                className="mobile-search-item"
                onClick={() => runAndClose(onSearch)}
              >
                <span className="mobile-item-icon"><MenuIcon name="search" /></span>
                <span><strong>Buscar</strong><small>Anjos, símbolos e correspondências</small></span>
              </button>

              <section className={`mobile-lamen-group ${lamenExpanded ? 'expanded' : ''}`}>
                <button
                  type="button"
                  className={['wheel', 'list'].includes(view) ? 'active' : ''}
                  aria-expanded={lamenExpanded}
                  aria-controls="mobile-lamen-views"
                  onClick={() => setLamenExpanded((current) => !current)}
                >
                  <span className="mobile-item-icon"><MenuIcon name="wheel" /></span>
                  <span><strong>Lâmen</strong><small>Explorar o mapa hermético</small></span>
                  <MenuIcon name="chevron" />
                </button>
                {lamenExpanded && (
                  <div id="mobile-lamen-views">
                    <button
                      type="button"
                      className={view === 'wheel' ? 'active' : ''}
                      aria-current={view === 'wheel' ? 'page' : undefined}
                      onClick={() => chooseView('wheel')}
                    >
                      <MenuIcon name="wheel" />
                      Roda
                    </button>
                    <button
                      type="button"
                      className={view === 'list' ? 'active' : ''}
                      aria-current={view === 'list' ? 'page' : undefined}
                      onClick={() => chooseView('list')}
                    >
                      <MenuIcon name="list" />
                      Lista
                    </button>
                  </div>
                )}
              </section>

              <button
                type="button"
                className={view === 'tree' ? 'active' : ''}
                aria-current={view === 'tree' ? 'page' : undefined}
                onClick={() => chooseView('tree')}
              >
                <span className="mobile-item-icon"><MenuIcon name="tree" /></span>
                <span><strong>Árvore</strong><small>Sephiroth e 22 caminhos</small></span>
              </button>
              <button
                type="button"
                className={view === 'oracle' ? 'active' : ''}
                aria-current={view === 'oracle' ? 'page' : undefined}
                onClick={() => chooseView('oracle')}
              >
                <span className="mobile-item-icon"><MenuIcon name="oracle" /></span>
                <span><strong>Oráculo</strong><small>Consulta simples ou tríade</small></span>
              </button>
              <button type="button" onClick={() => runAndClose(onAngelFinder)}>
                <span className="mobile-item-icon"><MenuIcon name="angel" /></span>
                <span><strong>Meu anjo</strong><small>Descobrir por signo e grau</small></span>
              </button>
              <button type="button" onClick={() => runAndClose(onStudy)}>
                <span className="mobile-item-icon"><MenuIcon name="study" /></span>
                <span><strong>Estudo</strong><small>Trilha guiada em sete módulos</small></span>
              </button>
              <button type="button" onClick={() => runAndClose(onTutorial)}>
                <span className="mobile-item-icon"><MenuIcon name="tutorial" /></span>
                <span><strong>Tutorial</strong><small>Conheça todas as funcionalidades</small></span>
              </button>
              <button type="button" onClick={() => runAndClose(onSaved)}>
                <span className="mobile-item-icon"><MenuIcon name="saved" /></span>
                <span><strong>Salvos</strong><small>Coleções e histórico</small></span>
                {savedCount > 0 && <b className="mobile-saved-count">{savedCount}</b>}
              </button>
              {canInstall && (
                <button type="button" className="mobile-install-item" onClick={() => runAndClose(onInstall)}>
                  <span className="mobile-item-icon"><MenuIcon name="install" /></span>
                  <span><strong>Instalar Lâmen</strong><small>Usar como aplicativo neste dispositivo</small></span>
                </button>
              )}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
