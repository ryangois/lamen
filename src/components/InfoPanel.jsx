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

function CloseIcon() {
    return (
        <svg className="ui-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.75 6.75L17.25 17.25M17.25 6.75L6.75 17.25" />
        </svg>
    );
}

function StarIcon({ filled = false }) {
    return (
        <svg className="ui-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
                className={filled ? 'star-fill' : ''}
                d="M12 3.85l2.45 4.95 5.46.8-3.95 3.85.93 5.44L12 16.32l-4.89 2.57.93-5.44L4.09 9.6l5.46-.8L12 3.85z"
            />
        </svg>
    );
}

function ArrowIcon({ direction = 'right' }) {
    return (
        <svg className="ui-icon" viewBox="0 0 24 24" aria-hidden="true">
            {direction === 'left' ? (
                <path d="M14.5 6.5L9 12l5.5 5.5M9.75 12H20" />
            ) : (
                <path d="M9.5 6.5L15 12l-5.5 5.5M4 12h10.25" />
            )}
        </svg>
    );
}

function TarotCardArtwork({ card }) {
    const [failed, setFailed] = useState(false);

    if (card.visual) {
        const visual = (
            <div
                className="thoth-reference-card"
                style={{ '--thoth-accent': card.visual.accent }}
                aria-label={`${card.deck}: ${card.title}, ${card.visual.attribution}`}
            >
                <span className="thoth-card-number">{card.visual.number}</span>
                <span className="thoth-card-letter" lang="he" dir="rtl">{card.visual.letter}</span>
                <span className="thoth-card-attribution">{card.visual.attribution}</span>
                <strong>{card.title}</strong>
                <small>THOTH · CORRESPONDÊNCIA</small>
            </div>
        );

        return card.sourceUrl ? (
            <a
                className="tarot-image-link"
                href={card.sourceUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Abrir edição oficial de ${card.deck}`}
            >
                {visual}
            </a>
        ) : visual;
    }

    if (!card.image || failed) {
        return (
            <div className="tarot-placeholder" aria-label={`${card.deck}: ${card.title}`}>
                {card.variant && <small>{card.variant}</small>}
                <span>{card.title}</span>
                {failed && <small>Imagem temporariamente indisponível</small>}
            </div>
        );
    }

    const image = (
        <img
            src={card.image}
            alt={`${card.deck}: ${card.title}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
        />
    );

    if (!card.sourceUrl) return image;

    return (
        <a
            className="tarot-image-link"
            href={card.sourceUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Abrir fonte da imagem de ${card.deck}`}
        >
            {image}
        </a>
    );
}

export default function InfoPanel({
    activeSegmentId,
    onClose,
    isFavorite = false,
    onToggleFavorite,
    onNavigateSegment,
}) {
    const [tabState, setTabState] = useState({ segmentId: null, tab: 'summary' });
    const [psalmViewState, setPsalmViewState] = useState({ segmentId: null, view: 'portuguese' });
    const content = activeSegmentId ? getContent(activeSegmentId) : null;
    const icon = ICONS[activeSegmentId] || '✦';
    const tabs = useMemo(() => [
        { id: 'summary', label: 'Resumo', available: true },
        { id: 'psalm', label: 'Salmo', available: Boolean(content?.psalm) },
        { id: 'gematria', label: 'Gematria', available: Boolean(content?.gematria) },
        { id: 'associations', label: 'Correspondências', available: Boolean(content?.associations || content?.highlights?.length) },
        { id: 'practice', label: 'Prática', available: Boolean(content?.practice) },
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
    const psalmView = psalmViewState.segmentId === activeSegmentId ? psalmViewState.view : 'portuguese';
    const psalmText = {
        hebrew: content?.psalm?.hebrew,
        transliteration: content?.psalm?.transliteration,
        portuguese: content?.psalm?.text,
    }[psalmView] || content?.psalm?.text || content?.psalm?.hebrew;
    const psalmReference = psalmView === 'hebrew'
        ? content?.psalm?.hebrewReference || content?.psalm?.reference
        : content?.psalm?.reference;

    if (!activeSegmentId) return null;

    return (
        <aside
            className={`info-panel glass-panel ${activeSegmentId ? 'open' : ''}`}
            aria-labelledby="info-panel-title"
        >
            <button className="close-btn" onClick={onClose} aria-label="Fechar painel">
                <CloseIcon />
            </button>

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
                        <div className="panel-title-row">
                            <h2 className="title brand-font" id="info-panel-title">{content.title}</h2>
                            <button
                                type="button"
                                className={`favorite-orb ${isFavorite ? 'active' : ''}`}
                                aria-label={isFavorite ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
                                aria-pressed={isFavorite}
                                onClick={onToggleFavorite}
                            >
                                <StarIcon filled={isFavorite} />
                            </button>
                        </div>
                        {content.subtitle && <h4 className="subtitle brand-font">{content.subtitle}</h4>}
                        {neighbors.previous && neighbors.next && (
                            <nav className="panel-navigation" aria-label="Navegar por símbolos do mesmo anel">
                                <button
                                    type="button"
                                    className="nav-card nav-card-prev"
                                    onClick={() => onNavigateSegment?.(neighbors.previous.id)}
                                    aria-label={`Abrir anterior: ${neighborContent.previous?.title || 'item anterior'}`}
                                >
                                    <span className="nav-arrow" aria-hidden="true">
                                        <ArrowIcon direction="left" />
                                    </span>
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
                                    <span className="nav-arrow" aria-hidden="true">
                                        <ArrowIcon direction="right" />
                                    </span>
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
                                        <label className="scripture-select">
                                            <span>Idioma do texto</span>
                                            <select
                                                value={psalmView}
                                                onChange={(event) => setPsalmViewState({
                                                    segmentId: activeSegmentId,
                                                    view: event.target.value,
                                                })}
                                                aria-label="Escolher idioma do salmo"
                                            >
                                                <option value="portuguese">Português</option>
                                                <option value="hebrew">Hebraico</option>
                                                <option value="transliteration">Transliteração</option>
                                            </select>
                                        </label>
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

                            {activeTab === 'gematria' && content.gematria && (
                                <section className="tab-section">
                                    <article className="gematria-card">
                                        <header className="gematria-header">
                                            <span>Gematria hebraica</span>
                                            <h3 className="brand-font">Valores do nome</h3>
                                            <p>{content.gematria.method}</p>
                                        </header>

                                        <div className={`gematria-grid ${content.gematria.mode === 'single' ? 'single' : ''}`}>
                                            {(content.gematria.mode === 'single'
                                                ? [[content.gematria.label || 'Nome hebraico', content.gematria.core]]
                                                : [
                                                    ['Tríplice', content.gematria.core],
                                                    ['Nome completo', content.gematria.full],
                                                ]).map(([label, item]) => (
                                                    <section className="gematria-value" key={label}>
                                                        <div>
                                                            <span>{label}</span>
                                                            <strong dir="rtl">{item.text}</strong>
                                                        </div>
                                                        <b>{item.value}</b>
                                                        <small>Redução: {item.root}</small>
                                                        <p>{item.formula}</p>
                                                        <div className="gematria-letters" dir="rtl" aria-label={`${label}: letras e valores`}>
                                                            {item.letters.map((letter, index) => (
                                                                <span key={`${label}-${letter.letter}-${index}`}>
                                                                    <b>{letter.letter}</b>
                                                                    <small>{letter.value}</small>
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </section>
                                                ))}
                                        </div>

                                        <section className="gematria-interpretation">
                                            <h4 className="brand-font">Interpretação simbólica</h4>
                                            <ul>
                                                {content.gematria.interpretations.map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ul>
                                        </section>
                                    </article>
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
                                    {content.tarotDecks?.length > 0 && (
                                        <section className="tarot-gallery" aria-label="Cartas de Tarot associadas">
                                            <header>
                                                <span>Tarot comparado</span>
                                                <h3 className="brand-font">Marselha, Rider-Waite e Thoth</h3>
                                            </header>
                                            <div className="tarot-grid">
                                                {content.tarotDecks.map((card) => (
                                                    <article className="tarot-card" key={card.deck}>
                                                        <TarotCardArtwork key={card.image} card={card} />
                                                        <strong>{card.deck}</strong>
                                                        <span className="tarot-card-title">{card.title}</span>
                                                        <small>
                                                            {card.sourceUrl ? (
                                                                <a href={card.sourceUrl} target="_blank" rel="noreferrer">
                                                                    {card.source}
                                                                </a>
                                                            ) : card.source}
                                                        </small>
                                                        <p>{card.note}</p>
                                                    </article>
                                                ))}
                                            </div>
                                        </section>
                                    )}
                                </section>
                            )}

                            {activeTab === 'practice' && content.practice && (
                                <section className="tab-section">
                                    <article className="practice-card">
                                        <span>Integração</span>
                                        <h3 className="brand-font">Prática contemplativa</h3>
                                        <div>
                                            <small>Pergunta</small>
                                            <p>{content.practice.prompt}</p>
                                        </div>
                                        <div>
                                            <small>Meditação</small>
                                            <p>{content.practice.meditation}</p>
                                        </div>
                                        <div>
                                            <small>Integração</small>
                                            <p>{content.practice.integration}</p>
                                        </div>
                                    </article>
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
