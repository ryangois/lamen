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
    gates: <><circle cx="9.25" cy="12" r="5.25" /><circle cx="14.75" cy="12" r="5.25" /><path d="M12 4v2m0 12v2" /></>,
    oracle: <><circle cx="12" cy="12" r="7.5" /><path d="M12 2.5V6m0 12v3.5M2.5 12H6m12 0h3.5M7 7l2 2m6 6 2 2m0-10-2 2m-6 6-2 2" /></>,
    angel: <><ellipse cx="12" cy="4.25" rx="3.5" ry="1.55" /><circle cx="12" cy="9" r="2.25" /><path d="M8.8 13.2C6 11.4 3.8 12.8 4.1 16.8c2.2-.1 3.9.65 5.15 2.2M15.2 13.2c2.8-1.8 5-0.4 4.7 3.6-2.2-.1-3.9.65-5.15 2.2M8.8 19c.35-3.75 1.4-5.7 3.2-5.7s2.85 1.95 3.2 5.7" /></>,
    saved: <path d="m12 3.8 2.5 5 5.5.8-4 3.9.95 5.5L12 16.4 7.05 19 8 13.5 4 9.6l5.5-.8L12 3.8Z" />,
    study: <><path d="M5 4.5h10.5A2.5 2.5 0 0 1 18 7v12H7.5A2.5 2.5 0 0 1 5 16.5v-12Z" /><path d="M8 8h7M8 11.5h7M7.5 19A2.5 2.5 0 0 1 5 16.5" /></>,
    tutorial: <><circle cx="12" cy="12" r="8.5" /><path d="M9.8 9.2a2.35 2.35 0 1 1 3.25 2.18c-.72.32-1.05.82-1.05 1.62v.35" /><path d="M12 17.2h.01" /></>,
    methodology: <><path d="M5 5.5h5.5A2.5 2.5 0 0 1 13 8v11H7.5A2.5 2.5 0 0 1 5 16.5v-11Z" /><path d="M19 5.5h-3A3 3 0 0 0 13 8v11h3.5a2.5 2.5 0 0 0 2.5-2.5v-11Z" /></>,
    blog: <><path d="M6 4.5h12v15H6z" /><path d="M9 8h6M9 11.5h6M9 15h4" /></>,
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
  blog: 'Blog',
};

export default function MobileNavigation({
  open,
  view,
  treeSection,
  savedCount,
  onOpen,
  onClose,
  onViewChange,
  onTreeSectionChange,
  onSearch,
  onStudy,
  onTutorial,
  onMethodology,
  onBlog,
  onAngelFinder,
  onSaved,
  canInstall,
  onInstall,
}) {
  const drawerRef = useRef(null);
  const [lamenExpanded, setLamenExpanded] = useState(['wheel', 'list'].includes(view));
  const [treeExpanded, setTreeExpanded] = useState(view === 'tree');
  useDialogFocus(drawerRef, open);

  const chooseView = (nextView) => {
    onViewChange(nextView);
    onClose();
  };

  const chooseTreeSection = (section) => {
    onTreeSectionChange(section);
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
        <div
          className="mobile-brand"
          aria-label={`Hermetika · ${view === 'tree' ? (treeSection === 'gates' ? '231 Portais' : 'Diagrama') : viewNames[view]}`}
        >
          <strong className="brand-font">Hermetika</strong>
          <span>{view === 'tree' ? (treeSection === 'gates' ? '231 Portais' : 'Diagrama') : viewNames[view]}</span>
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
                <h2 className="brand-font" id="mobile-menu-title">Hermetika</h2>
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
                  <span><strong>Mapa</strong><small>Explorar a roda ou o catálogo</small></span>
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

              <section className={`mobile-tree-group ${treeExpanded ? 'expanded' : ''}`}>
                <button
                  type="button"
                  className={view === 'tree' ? 'active' : ''}
                  aria-expanded={treeExpanded}
                  aria-controls="mobile-tree-views"
                  onClick={() => setTreeExpanded((current) => !current)}
                >
                  <span className="mobile-item-icon"><MenuIcon name="tree" /></span>
                  <span><strong>Árvore</strong><small>Diagrama e combinações hebraicas</small></span>
                  <MenuIcon name="chevron" />
                </button>
                {treeExpanded && (
                  <div id="mobile-tree-views">
                    <button
                      type="button"
                      className={view === 'tree' && treeSection === 'diagram' ? 'active' : ''}
                      aria-current={view === 'tree' && treeSection === 'diagram' ? 'page' : undefined}
                      onClick={() => chooseTreeSection('diagram')}
                    >
                      <MenuIcon name="tree" />
                      Diagrama
                    </button>
                    <button
                      type="button"
                      className={view === 'tree' && treeSection === 'gates' ? 'active' : ''}
                      aria-current={view === 'tree' && treeSection === 'gates' ? 'page' : undefined}
                      onClick={() => chooseTreeSection('gates')}
                    >
                      <MenuIcon name="gates" />
                      231 Portais
                    </button>
                  </div>
                )}
              </section>
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
              <button type="button" onClick={() => runAndClose(onMethodology)}>
                <span className="mobile-item-icon"><MenuIcon name="methodology" /></span>
                <span><strong>Metodologia</strong><small>Fontes, camadas e critérios editoriais</small></span>
              </button>
              <button
                type="button"
                className={view === 'blog' ? 'active' : ''}
                aria-current={view === 'blog' ? 'page' : undefined}
                onClick={() => runAndClose(onBlog)}
              >
                <span className="mobile-item-icon"><MenuIcon name="blog" /></span>
                <span><strong>Blog</strong><small>Ensaios, fontes e história das correspondências</small></span>
              </button>
              <button type="button" onClick={() => runAndClose(onSaved)}>
                <span className="mobile-item-icon"><MenuIcon name="saved" /></span>
                <span><strong>Salvos</strong><small>Coleções e histórico</small></span>
                {savedCount > 0 && <b className="mobile-saved-count">{savedCount}</b>}
              </button>
              {canInstall && (
                <button type="button" className="mobile-install-item" onClick={() => runAndClose(onInstall)}>
                  <span className="mobile-item-icon"><MenuIcon name="install" /></span>
                  <span><strong>Instalar Hermetika</strong><small>Usar como aplicativo neste dispositivo</small></span>
                </button>
              )}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
