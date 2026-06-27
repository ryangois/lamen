import { useMemo, useState } from 'react';
import { getContent } from '../data/content';
import './InfoPanel.css';

const ICONS = {
    fire: '🜂', water: '🜄', air: '🜁', earth: '🜃',
    saturn: '♄', jupiter: '♃', mars: '♂', sun_p: '☉', venus: '♀', mercury: '☿', moon_p: '☽',
    aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍',
    libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓',
};

export default function InfoPanel({
    activeSegmentId,
    onClose,
    isFavorite = false,
    onToggleFavorite,
}) {
    const [tabState, setTabState] = useState({ segmentId: null, tab: 'summary' });
    const content = activeSegmentId ? getContent(activeSegmentId) : null;
    const icon = ICONS[activeSegmentId] || '✦';
    const tabs = useMemo(() => [
        { id: 'summary', label: 'Resumo', available: true },
        { id: 'associations', label: 'Correspondências', available: Boolean(content?.associations || content?.highlights?.length) },
        { id: 'tradition', label: 'Tradição', available: Boolean(content?.sections?.length || content?.traditionNote) },
        { id: 'sources', label: 'Fontes', available: Boolean(content?.sources?.length) },
    ].filter((tab) => tab.available), [content]);
    const activeTab = tabState.segmentId === activeSegmentId
        && tabs.some((tab) => tab.id === tabState.tab)
        ? tabState.tab
        : 'summary';

    if (!activeSegmentId) return null;

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
                            <button type="button" onClick={onToggleFavorite}>
                                <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
                                {isFavorite ? 'Favorito salvo' : 'Salvar favorito'}
                            </button>
                        </div>
                        <div className="divider"></div>

                        <div className="panel-tabs" role="tablist" aria-label="Seções da ficha">
                            {tabs.map((tab) => (
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={activeTab === tab.id}
                                    className={activeTab === tab.id ? 'active' : ''}
                                    onClick={() => setTabState({ segmentId: activeSegmentId, tab: tab.id })}
                                    key={tab.id}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="tab-content" role="tabpanel">
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
