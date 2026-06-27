import { useMemo, useState } from 'react';
import { getContent } from '../data/content';
import { ringStructure } from '../data/rings';
import './InfoPanel.css';

const ICONS = {
    fire: '🜂', water: '🜄', air: '🜁', earth: '🜃',
    saturn: '♄', jupiter: '♃', mars: '♂', sun_p: '☉', venus: '♀', mercury: '☿', moon_p: '☽',
    aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍',
    libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓',
};

const flatSegments = ringStructure.flatMap((ring) => (
    ring.segments.map((segment, index) => ({
        id: segment.id,
        ringId: ring.ringId,
        ringName: ring.ringId,
        index,
        total: ring.segments.length,
    }))
));

function getNeighborSegments(activeSegmentId) {
    const current = flatSegments.find((segment) => segment.id === activeSegmentId);
    if (!current) return { previous: null, next: null, position: null };

    const siblings = flatSegments.filter((segment) => segment.ringId === current.ringId);
    const previous = siblings[(current.index - 1 + siblings.length) % siblings.length];
    const next = siblings[(current.index + 1) % siblings.length];

    return {
        previous,
        next,
        position: `${current.index + 1}/${current.total}`,
    };
}

export default function InfoPanel({
    activeSegmentId,
    onClose,
    isFavorite = false,
    onToggleFavorite,
    onNavigateSegment,
}) {
    const [tabState, setTabState] = useState({ segmentId: null, tab: 'summary' });
    const [copyState, setCopyState] = useState({ segmentId: null, copied: false });
    const [psalmView, setPsalmView] = useState('hebrew');
    const content = activeSegmentId ? getContent(activeSegmentId) : null;
    const icon = ICONS[activeSegmentId] || '✦';
    const tabs = useMemo(() => [
        { id: 'summary', label: 'Resumo', available: true },
        { id: 'psalm', label: 'Salmo', available: Boolean(content?.psalm) },
        { id: 'associations', label: 'Correspondências', available: Boolean(content?.associations || content?.highlights?.length) },
        { id: 'tradition', label: 'Tradição', available: Boolean(content?.sections?.length || content?.traditionNote) },
        { id: 'sources', label: 'Fontes', available: Boolean(content?.sources?.length) },
    ].filter((tab) => tab.available), [content]);
    const neighbors = useMemo(() => getNeighborSegments(activeSegmentId), [activeSegmentId]);
    const neighborContent = useMemo(() => ({
        previous: neighbors.previous ? getContent(neighbors.previous.id) : null,
        next: neighbors.next ? getContent(neighbors.next.id) : null,
    }), [neighbors]);
    const activeTab = tabState.segmentId === activeSegmentId
        && tabs.some((tab) => tab.id === tabState.tab)
        ? tabState.tab
        : 'summary';
    const copied = copyState.segmentId === activeSegmentId && copyState.copied;
    const psalmText = {
        hebrew: content?.psalm?.hebrew,
        transliteration: content?.psalm?.transliteration,
        portuguese: content?.psalm?.text,
    }[psalmView] || content?.psalm?.hebrew || content?.psalm?.text;
    const psalmReference = psalmView === 'hebrew'
        ? content?.psalm?.hebrewReference || content?.psalm?.reference
        : content?.psalm?.reference;

    if (!activeSegmentId) return null;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopyState({ segmentId: activeSegmentId, copied: true });
        } catch {
            setCopyState({ segmentId: activeSegmentId, copied: false });
        }
    };

    return (
        <aside
            className={`info-panel glass-panel ${activeSegmentId ? 'open' : ''}`}
            aria-labelledby="info-panel-title"
        >
            <button className="close-btn" onClick={onClose} aria-label="Fechar painel">&times;</button>

            {content && (
                <div className="content-container animate-fade-in">
                    {content.image ? (
                        <div className="image-wrapper">
                            <img src={content.image} alt={content.title} className="panel-image" loading="lazy" />
                            <div className="image-overlay"></div>
                        </div>
                    ) : (
                        <div className="image-placeholder">{icon}</div>
                    )}

                    <div className="info-body">
                        <h2 className="title brand-font" id="info-panel-title">{content.title}</h2>
                        {content.subtitle && <h4 className="subtitle brand-font">{content.subtitle}</h4>}
                        <div className="panel-actions" aria-label="Ações da ficha">
                            <button
                                type="button"
                                className={`panel-action favorite-action ${isFavorite ? 'active' : ''}`}
                                onClick={onToggleFavorite}
                            >
                                <span className="action-icon" aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
                                <span className="action-copy">
                                    <strong>{isFavorite ? 'Salvo' : 'Salvar'}</strong>
                                    <small>{isFavorite ? 'Nos seus favoritos' : 'Guardar esta ficha'}</small>
                                </span>
                            </button>
                            <button
                                type="button"
                                className={`panel-action share-action ${copied ? 'active' : ''}`}
                                onClick={handleCopyLink}
                            >
                                <span className="action-icon" aria-hidden="true">{copied ? '✓' : '↗'}</span>
                                <span className="action-copy">
                                    <strong>{copied ? 'Copiado' : 'Compartilhar'}</strong>
                                    <small>{copied ? 'Link pronto' : 'Copiar link direto'}</small>
                                </span>
                            </button>
                        </div>
                        {neighbors.previous && neighbors.next && (
                            <nav className="panel-navigation" aria-label="Navegar por símbolos do mesmo anel">
                                <button
                                    type="button"
                                    className="nav-card nav-card-prev"
                                    onClick={() => onNavigateSegment?.(neighbors.previous.id)}
                                    aria-label={`Abrir anterior: ${neighborContent.previous?.title || 'item anterior'}`}
                                >
                                    <span className="nav-arrow" aria-hidden="true">←</span>
                                    <span className="nav-copy">
                                        <small>Anterior</small>
                                        <strong>{neighborContent.previous?.title || 'Anterior'}</strong>
                                    </span>
                                </button>
                                <span className="nav-position">{neighbors.position}</span>
                                <button
                                    type="button"
                                    className="nav-card nav-card-next"
                                    onClick={() => onNavigateSegment?.(neighbors.next.id)}
                                    aria-label={`Abrir próximo: ${neighborContent.next?.title || 'próximo item'}`}
                                >
                                    <span className="nav-copy">
                                        <small>Próximo</small>
                                        <strong>{neighborContent.next?.title || 'Próximo'}</strong>
                                    </span>
                                    <span className="nav-arrow" aria-hidden="true">→</span>
                                </button>
                            </nav>
                        )}
                        <div className="divider"></div>

                        <div className="panel-tabs" role="tablist" aria-label="Seções da ficha">
                            {tabs.map((tab) => (
                                <button
                                    type="button"
                                    role="tab"
                                    id={`tab-${tab.id}`}
                                    aria-controls={`panel-${tab.id}`}
                                    aria-selected={activeTab === tab.id}
                                    className={activeTab === tab.id ? 'active' : ''}
                                    onClick={() => setTabState({ segmentId: activeSegmentId, tab: tab.id })}
                                    key={tab.id}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div
                            className="tab-content"
                            role="tabpanel"
                            id={`panel-${activeTab}`}
                            aria-labelledby={`tab-${activeTab}`}
                        >
                            {activeTab === 'summary' && (
                                <section className="tab-section">
                                    <p className="description">{content.description}</p>

                                    {content.highlights?.length > 0 && (
                                        <ul className="highlights-list">
                                            {content.highlights.map((highlight) => (
                                                <li key={highlight}>{highlight}</li>
                                            ))}
                                        </ul>
                                    )}

                                    {content.psalm && (
                                        <article className="psalm-card compact">
                                            <div className="psalm-header">
                                                <span className="psalm-kicker">Salmo tradicional</span>
                                                <strong>{psalmReference}</strong>
                                            </div>
                                            {psalmText && (
                                                <blockquote dir={psalmView === 'hebrew' ? 'rtl' : 'ltr'}>
                                                    {psalmText}
                                                </blockquote>
                                            )}
                                            <p className="psalm-note">{content.psalm.meditation}</p>
                                        </article>
                                    )}
                                </section>
                            )}

                            {activeTab === 'psalm' && content.psalm && (
                                <section className="tab-section">
                                    <article className="psalm-card">
                                        <header className="psalm-header">
                                            <div>
                                                <span className="psalm-kicker">{content.psalm.title}</span>
                                                <h3 className="psalm-title brand-font">Texto do salmo</h3>
                                            </div>
                                            <strong className="psalm-reference">{psalmReference}</strong>
                                        </header>
                                        <div className="scripture-switcher" role="group" aria-label="Escolher forma do salmo">
                                            <button
                                                type="button"
                                                className={psalmView === 'hebrew' ? 'active' : ''}
                                                onClick={() => setPsalmView('hebrew')}
                                            >
                                                Hebraico
                                            </button>
                                            <button
                                                type="button"
                                                className={psalmView === 'transliteration' ? 'active' : ''}
                                                onClick={() => setPsalmView('transliteration')}
                                            >
                                                Transliterado
                                            </button>
                                            <button
                                                type="button"
                                                className={psalmView === 'portuguese' ? 'active' : ''}
                                                onClick={() => setPsalmView('portuguese')}
                                            >
                                                Português
                                            </button>
                                        </div>
                                        {psalmText && (
                                            <blockquote dir={psalmView === 'hebrew' ? 'rtl' : 'ltr'}>
                                                {psalmText}
                                            </blockquote>
                                        )}
                                        <p className="psalm-note">{content.psalm.note}</p>
                                    </article>
                                    <section className="info-section">
                                        <h3 className="section-title brand-font">Fonte do texto</h3>
                                        {content.psalm.hebrewSource && (
                                            <p className="section-text">{content.psalm.hebrewSource}</p>
                                        )}
                                        {content.psalm.source && (
                                            <p className="section-text">{content.psalm.source}</p>
                                        )}
                                    </section>
                                    <section className="info-section">
                                        <h3 className="section-title brand-font">Como usar</h3>
                                        <p className="section-text">
                                            Abra a referência em sua tradução bíblica de preferência e leia o verso junto
                                            das correspondências do anjo: signo, grau, coro, arcanjo, Sephirah e tema de
                                            contemplação.
                                        </p>
                                        <p className="tradition-note">{content.psalm.meditation}</p>
                                    </section>
                                </section>
                            )}

                            {activeTab === 'associations' && (
                                <section className="tab-section">
                                    {content.associations && (
                                        <div className="associations-grid">
                                            {Object.entries(content.associations).map(([key, value]) => (
                                                <div className="assoc-item" key={key}>
                                                    <span className="assoc-label">{key}</span>
                                                    <span className="assoc-value">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>
                            )}

                            {activeTab === 'tradition' && (
                                <section className="tab-section">
                                    {content.sections?.map((section) => (
                                        <section className="info-section" key={section.title}>
                                            <h3 className="section-title brand-font">{section.title}</h3>
                                            {section.paragraphs?.map((paragraph) => (
                                                <p className="section-text" key={paragraph}>{paragraph}</p>
                                            ))}
                                            {section.items?.length > 0 && (
                                                <ul className="section-list">
                                                    {section.items.map((item) => <li key={item}>{item}</li>)}
                                                </ul>
                                            )}
                                        </section>
                                    ))}

                                    {content.traditionNote && (
                                        <p className="tradition-note">{content.traditionNote}</p>
                                    )}
                                </section>
                            )}

                            {activeTab === 'sources' && content.sources?.length > 0 && (
                                <section className="sources-section">
                                    <h3 className="section-title brand-font">Fontes e referências</h3>
                                    <ul className="sources-list">
                                        {content.sources.map((source) => (
                                            <li key={source.url}>
                                                <a href={source.url} target="_blank" rel="noreferrer">
                                                    {source.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}
