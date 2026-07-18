import { useMemo, useRef, useState } from 'react';
import { getContent } from '../data/content';
import { findGlossaryEntry, glossaryPattern } from '../data/glossary';
import { ringStructure } from '../data/rings';
import MiniContextMap from './MiniContextMap';
import ShareCard from './ShareCard';
import { useDialogFocus } from '../hooks/useDialogFocus';
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

const TAB_GROUPS = [
    { id: 'study', label: 'Estudo', tabs: ['summary', 'history', 'tradition'] },
    { id: 'correspondences', label: 'Relações', tabs: ['associations', 'relations', 'gematria', 'variations'] },
    { id: 'practice', label: 'Prática', tabs: ['psalm', 'practice', 'notes'] },
    { id: 'sources', label: 'Fontes', tabs: ['sources'] },
];

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

const BREADCRUMB_CATEGORIES = {
    Elemento: 'Elementos',
    Planeta: 'Planetas',
    Signo: 'Signos',
    Decanato: 'Decanatos',
    Anjo: '72 anjos',
    Coro: 'Coros angélicos',
    Sephirah: 'Sephiroth',
    Caminho: 'Caminhos',
    Daath: 'Não-esfera',
};

function getBreadcrumbs(activeSegmentId, content) {
    const category = content?.categoryLabel || 'Símbolo';
    const isTreeEntry = activeSegmentId?.startsWith('path_')
        || activeSegmentId?.startsWith('arc_');
    const parentCategory = category === 'Anjo'
        ? content?.relations?.find((item) => item.category === 'Signo')
        : category === 'Decanato'
            ? content?.relations?.find((item) => item.category === 'Signo')
            : null;

    return [
        { label: 'Enciclopédia' },
        { label: isTreeEntry ? 'Árvore da Vida' : 'Lâmen' },
        parentCategory && { label: parentCategory.label, id: parentCategory.id },
        { label: BREADCRUMB_CATEGORIES[category] || `${category}s` },
        { label: content?.title, current: true },
    ].filter(Boolean);
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

function ShareIcon() {
    return (
        <svg className="ui-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="18" cy="5" r="2.25" />
            <circle cx="6" cy="12" r="2.25" />
            <circle cx="18" cy="19" r="2.25" />
            <path d="M8.1 10.95l7.8-4.85M8.1 13.05l7.8 4.85" />
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
            width="400"
            height="650"
            loading="lazy"
            decoding="async"
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

function GlossaryText({ children, onTerm }) {
    if (typeof children !== 'string') return children;
    return children.split(glossaryPattern).map((part, index) => {
        const entry = findGlossaryEntry(part);
        return entry ? (
            <button
                type="button"
                className="glossary-term"
                onClick={() => onTerm(entry)}
                aria-label={`Abrir definição de ${entry.term}`}
                key={`${part}-${index}`}
            >
                {part}
            </button>
        ) : part;
    });
}

function InlineCitations({ sources, indexes }) {
    if (!indexes?.length || !sources?.length) return null;
    return (
        <sup className="inline-citations" aria-label="Fontes desta afirmação">
            {[...new Set(indexes)].map((sourceIndex) => {
                const source = sources[sourceIndex];
                return source ? (
                    <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        title={source.label}
                        aria-label={`Fonte ${sourceIndex + 1}: ${source.label}`}
                        key={`${source.url}-${sourceIndex}`}
                    >
                        {sourceIndex + 1}
                    </a>
                ) : null;
            })}
        </sup>
    );
}

export default function InfoPanel({
    activeSegmentId,
    onClose,
    isFavorite = false,
    favoriteCollections = [],
    onToggleCollection,
    onNavigateSegment,
    onCompare,
}) {
    const panelRef = useRef(null);
    const [tabState, setTabState] = useState({ segmentId: null, tab: 'summary' });
    const [psalmViewState, setPsalmViewState] = useState({ segmentId: null, view: 'portuguese' });
    const [notesBySegment, setNotesBySegment] = useState({});
    const [glossaryEntry, setGlossaryEntry] = useState(null);
    const [showCollectionPicker, setShowCollectionPicker] = useState(false);
    const [showShareCard, setShowShareCard] = useState(false);
    const content = activeSegmentId ? getContent(activeSegmentId) : null;
    useDialogFocus(panelRef, Boolean(activeSegmentId));
    const icon = ICONS[activeSegmentId] || '✦';
    const tabs = useMemo(() => [
        { id: 'summary', label: 'Resumo', available: true },
        { id: 'psalm', label: 'Salmo', available: Boolean(content?.psalm) },
        { id: 'gematria', label: 'Gematria', available: Boolean(content?.gematria) },
        { id: 'associations', label: 'Correspondências', available: Boolean(content?.associations || content?.highlights?.length) },
        { id: 'relations', label: 'Relações', available: Boolean(content?.relations?.length) },
        { id: 'practice', label: 'Prática', available: Boolean(content?.practice) },
        { id: 'history', label: 'História', available: Boolean(content?.history?.length) },
        { id: 'variations', label: 'Variações', available: Boolean(content?.variations?.length) },
        { id: 'tradition', label: 'Tradição', available: Boolean(content?.sections?.length || content?.traditionNote) },
        { id: 'notes', label: 'Notas', available: true },
        { id: 'sources', label: 'Fontes', available: Boolean(content?.sources?.length) },
    ].filter((tab) => tab.available), [content]);
    const neighbors = useMemo(() => getNeighborSegments(activeSegmentId), [activeSegmentId]);
    const breadcrumbs = useMemo(
        () => getBreadcrumbs(activeSegmentId, content),
        [activeSegmentId, content],
    );
    const neighborContent = useMemo(() => ({
        previous: neighbors.previous ? getContent(neighbors.previous.id) : null,
        next: neighbors.next ? getContent(neighbors.next.id) : null,
    }), [neighbors]);
    const activeTab = tabState.segmentId === activeSegmentId
        && tabs.some((tab) => tab.id === tabState.tab)
        ? tabState.tab
        : 'summary';
    const tabGroups = TAB_GROUPS
        .map((group) => ({
            ...group,
            availableTabs: group.tabs
                .map((tabId) => tabs.find((tab) => tab.id === tabId))
                .filter(Boolean),
        }))
        .filter((group) => group.availableTabs.length > 0);
    const activeTabGroup = tabGroups.find((group) => (
        group.availableTabs.some((tab) => tab.id === activeTab)
    )) || tabGroups[0];
    const psalmView = psalmViewState.segmentId === activeSegmentId ? psalmViewState.view : 'portuguese';
    const psalmText = {
        hebrew: content?.psalm?.hebrew,
        transliteration: content?.psalm?.transliteration,
        portuguese: content?.psalm?.text,
    }[psalmView] || content?.psalm?.text || content?.psalm?.hebrew;
    const psalmReference = psalmView === 'hebrew'
        ? content?.psalm?.hebrewReference || content?.psalm?.reference
        : content?.psalm?.reference;
    const noteValue = activeSegmentId
        ? notesBySegment[activeSegmentId]
            ?? window.localStorage.getItem(`lamen-note:${activeSegmentId}`)
            ?? ''
        : '';

    const handleNoteChange = (event) => {
        const value = event.target.value;
        setNotesBySegment((current) => ({ ...current, [activeSegmentId]: value }));
        if (value.trim()) {
            window.localStorage.setItem(`lamen-note:${activeSegmentId}`, value);
        } else {
            window.localStorage.removeItem(`lamen-note:${activeSegmentId}`);
        }
    };

    const handleTabKeyDown = (event) => {
        const availableTabs = activeTabGroup?.availableTabs || [];
        const currentIndex = availableTabs.findIndex((tab) => tab.id === activeTab);
        let nextIndex = currentIndex;
        if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % availableTabs.length;
        else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + availableTabs.length) % availableTabs.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = availableTabs.length - 1;
        else return;
        event.preventDefault();
        const nextTab = availableTabs[nextIndex];
        setTabState({ segmentId: activeSegmentId, tab: nextTab.id });
        window.requestAnimationFrame(() => document.getElementById(`tab-${nextTab.id}`)?.focus());
    };

    if (!activeSegmentId) return null;

    return (
        <aside
            ref={panelRef}
            className={`info-panel glass-panel ${activeSegmentId ? 'open' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="info-panel-title"
            tabIndex="-1"
        >
            <p className="sr-only" aria-live="polite">{content?.title} aberto.</p>
            <button className="close-btn" onClick={onClose} aria-label="Fechar painel">
                <CloseIcon />
            </button>

            {content && (
                <div className="content-container animate-fade-in">
                    {content.image ? (
                        <div className="image-wrapper">
                            <img
                                src={content.image}
                                alt={content.title}
                                className="panel-image"
                                width="900"
                                height="500"
                                loading="eager"
                                decoding="async"
                                fetchPriority="high"
                            />
                            <div className="image-overlay"></div>
                        </div>
                    ) : (
                        <div className="image-placeholder">{icon}</div>
                    )}

                    <div className="info-body">
                        <nav className="panel-breadcrumbs" aria-label="Localização na enciclopédia">
                            <ol>
                                {breadcrumbs.map((crumb, index) => (
                                    <li key={`${crumb.label}-${index}`}>
                                        {crumb.id ? (
                                            <button
                                                type="button"
                                                onClick={() => onNavigateSegment?.(crumb.id)}
                                            >
                                                {crumb.label}
                                            </button>
                                        ) : (
                                            <span aria-current={crumb.current ? 'page' : undefined}>
                                                {crumb.label}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </nav>
                        <div className="panel-title-row">
                            <h2 className="title brand-font" id="info-panel-title">{content.title}</h2>
                            <button
                                type="button"
                                className={`favorite-orb ${isFavorite ? 'active' : ''}`}
                                aria-label={isFavorite ? 'Gerenciar coleções' : 'Salvar em uma coleção'}
                                aria-pressed={isFavorite}
                                aria-expanded={showCollectionPicker}
                                onClick={() => setShowCollectionPicker((current) => !current)}
                            >
                                <StarIcon filled={isFavorite} />
                            </button>
                            <button
                                type="button"
                                className="compare-orb"
                                aria-label={`Comparar ${content.title} com outra ficha`}
                                onClick={onCompare}
                            >
                                <span aria-hidden="true">⇄</span>
                            </button>
                            <button
                                type="button"
                                className="share-orb"
                                aria-label={`Criar cartão visual de ${content.title}`}
                                onClick={() => setShowShareCard(true)}
                            >
                                <ShareIcon />
                            </button>
                            {showCollectionPicker && (
                                <div className="collection-picker">
                                    <strong>Salvar em</strong>
                                    {favoriteCollections.map((collection) => {
                                        const checked = collection.itemIds.includes(activeSegmentId);
                                        return (
                                            <label key={collection.id}>
                                                <input
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={() => onToggleCollection?.(collection.id)}
                                                />
                                                <span>{collection.name}</span>
                                                <small>{checked ? 'Salvo' : 'Adicionar'}</small>
                                            </label>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        {content.subtitle && <h4 className="subtitle brand-font">{content.subtitle}</h4>}
                        <MiniContextMap activeId={activeSegmentId} title={content.title} />
                        {content.evidence?.length > 0 && (
                            <div className="evidence-strip" aria-label="Classificação das informações">
                                {content.evidence.map((item) => (
                                    <span
                                        className={`evidence-badge ${item.level}`}
                                        title={item.description}
                                        key={`${item.level}-${item.label}`}
                                    >
                                        <i aria-hidden="true"></i>
                                        {item.label}
                                    </span>
                                ))}
                            </div>
                        )}
                        {content.pronunciation && (
                            <article className="pronunciation-card">
                                <span>Guia de leitura</span>
                                <strong lang="he" dir="rtl">{content.pronunciation.hebrew}</strong>
                                <div>
                                    <small>Transliteração</small>
                                    <b>{content.pronunciation.transliteration}</b>
                                </div>
                                <div>
                                    <small>Aproximação em português</small>
                                    <b>{content.pronunciation.guide}</b>
                                </div>
                                <p>{content.pronunciation.note}</p>
                            </article>
                        )}
                        {content.hebrewLetter && (
                            <article className="letter-class-card">
                                <div>
                                    <span>Sefer Yetzirah</span>
                                    <h3 className="brand-font">{content.hebrewLetter.classification}</h3>
                                    <p>{content.hebrewLetter.classMeaning}</p>
                                </div>
                                <div>
                                    <span>Forma final</span>
                                    <strong lang="he" dir="rtl">{content.hebrewLetter.finalForm || '—'}</strong>
                                    <small>{content.hebrewLetter.finalFormNote}</small>
                                </div>
                            </article>
                        )}
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

                        <div className="panel-tab-navigation">
                            <div className="panel-tab-groups" aria-label="Grupos da ficha">
                                {tabGroups.map((group) => (
                                    <button
                                        type="button"
                                        className={activeTabGroup?.id === group.id ? 'active' : ''}
                                        aria-pressed={activeTabGroup?.id === group.id}
                                        onClick={() => setTabState({
                                            segmentId: activeSegmentId,
                                            tab: group.availableTabs[0].id,
                                        })}
                                        key={group.id}
                                    >
                                        {group.label}
                                        <small>{group.availableTabs.length}</small>
                                    </button>
                                ))}
                            </div>
                            <div className="panel-tabs" role="tablist" aria-label={`Seções de ${activeTabGroup?.label}`}>
                                {activeTabGroup?.availableTabs.map((tab) => (
                                <button
                                    type="button"
                                    role="tab"
                                    id={`tab-${tab.id}`}
                                    aria-controls={`panel-${tab.id}`}
                                    aria-selected={activeTab === tab.id}
                                    tabIndex={activeTab === tab.id ? 0 : -1}
                                    className={activeTab === tab.id ? 'active' : ''}
                                    onClick={() => setTabState({ segmentId: activeSegmentId, tab: tab.id })}
                                    onKeyDown={handleTabKeyDown}
                                    key={tab.id}
                                >
                                    {tab.label}
                                </button>
                                ))}
                            </div>
                        </div>

                        <div
                            className="tab-content"
                            role="tabpanel"
                            id={`panel-${activeTab}`}
                            aria-labelledby={`tab-${activeTab}`}
                        >
                            {activeTab === 'summary' && (
                                <section className="tab-section">
                                    <p className="description">
                                        <GlossaryText onTerm={setGlossaryEntry}>{content.description}</GlossaryText>
                                        <InlineCitations
                                            sources={content.sources}
                                            indexes={content.citations?.description}
                                        />
                                    </p>

                                    {content.highlights?.length > 0 && (
                                        <ul className="highlights-list">
                                            {content.highlights.map((highlight, index) => (
                                                <li key={highlight}>
                                                    {highlight}
                                                    <InlineCitations
                                                        sources={content.sources}
                                                        indexes={content.citations?.highlights?.[index]}
                                                    />
                                                </li>
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

                                        {content.gematria.calculations?.length > 0 && (
                                            <section className="gematria-methods">
                                                <div>
                                                    <span>Métodos comparados</span>
                                                    <h4 className="brand-font">Quatro formas de calcular</h4>
                                                </div>
                                                <div className="gematria-method-grid">
                                                    {content.gematria.calculations.map((calculation) => (
                                                        <article key={calculation.id}>
                                                            <span>{calculation.label}</span>
                                                            <div>
                                                                <strong>{calculation.coreValue}</strong>
                                                                {calculation.fullValue !== undefined && (
                                                                    <>
                                                                        <small>→</small>
                                                                        <strong>{calculation.fullValue}</strong>
                                                                    </>
                                                                )}
                                                            </div>
                                                            <p>{calculation.note}</p>
                                                            {calculation.fullValue !== undefined && (
                                                                <small>Tríplice → nome completo</small>
                                                            )}
                                                        </article>
                                                    ))}
                                                </div>
                                                <p className="gematria-caution">
                                                    Valores iguais sugerem uma relação para estudo comparativo; não provam
                                                    equivalência histórica, teológica ou causal.
                                                </p>
                                            </section>
                                        )}
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

                            {activeTab === 'relations' && content.relations?.length > 0 && (
                                <section className="tab-section">
                                    <header className="relations-header">
                                        <span>Mapa de conexões</span>
                                        <h3 className="brand-font">Explore as relações desta ficha</h3>
                                        <p>
                                            Cada ligação abre a ficha correspondente sem sair do painel.
                                        </p>
                                    </header>
                                    <div className="relations-grid">
                                        {content.relations.map((item) => (
                                            <button
                                                type="button"
                                                onClick={() => onNavigateSegment?.(item.id)}
                                                key={item.id}
                                            >
                                                <span>{item.category}</span>
                                                <strong>{item.label}</strong>
                                                <small>{item.detail}</small>
                                                <b aria-hidden="true">→</b>
                                            </button>
                                        ))}
                                    </div>
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

                            {activeTab === 'history' && content.history?.length > 0 && (
                                <section className="tab-section history-timeline">
                                    {content.history.map((section, index) => (
                                        <article key={`${section.title}-${index}`}>
                                            <span>{String(index + 1).padStart(2, '0')}</span>
                                            <div>
                                                <h3 className="brand-font">{section.title}</h3>
                                                {section.paragraphs.map((paragraph) => (
                                                    <p key={paragraph}>{paragraph}</p>
                                                ))}
                                            </div>
                                        </article>
                                    ))}
                                </section>
                            )}

                            {activeTab === 'variations' && content.variations?.length > 0 && (
                                <section className="tab-section">
                                    <header className="variations-header">
                                        <span>Escolas e sistemas</span>
                                        <h3 className="brand-font">Variações de leitura</h3>
                                        <p>
                                            As diferenças abaixo ajudam a não misturar tradições como se fossem uma única fonte.
                                        </p>
                                    </header>
                                    <div className="variations-grid">
                                        {content.variations.map((variation, index) => (
                                            <article key={variation.name}>
                                                <span>{String(index + 1).padStart(2, '0')}</span>
                                                <h4>{variation.name}</h4>
                                                <p>{variation.description}</p>
                                            </article>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {activeTab === 'tradition' && (
                                <section className="tab-section">
                                    {content.sections?.map((section) => (
                                        <section className="info-section" key={section.title}>
                                            <h3 className="section-title brand-font">{section.title}</h3>
                                            {section.paragraphs?.map((paragraph, paragraphIndex) => (
                                                <p className="section-text" key={paragraph}>
                                                    <GlossaryText onTerm={setGlossaryEntry}>{paragraph}</GlossaryText>
                                                    <InlineCitations
                                                        sources={content.sources}
                                                        indexes={content.citations?.sections?.[
                                                            content.sections.indexOf(section)
                                                        ]?.[paragraphIndex]}
                                                    />
                                                </p>
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

                            {activeTab === 'notes' && (
                                <section className="tab-section">
                                    <article className="notes-card">
                                        <span>Caderno privado</span>
                                        <h3 className="brand-font">Suas notas sobre {content.title}</h3>
                                        <p>
                                            O texto fica salvo somente neste navegador e não é enviado nem compartilhado.
                                        </p>
                                        <label>
                                            <span>Observações, relações e perguntas</span>
                                            <textarea
                                                value={noteValue}
                                                onChange={handleNoteChange}
                                                placeholder="Escreva aqui sua leitura pessoal…"
                                                rows="8"
                                            />
                                        </label>
                                        <div>
                                            <small aria-live="polite">
                                                {noteValue ? 'Salvo automaticamente neste dispositivo' : 'Nenhuma nota salva'}
                                            </small>
                                            {noteValue && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        window.localStorage.removeItem(`lamen-note:${activeSegmentId}`);
                                                        setNotesBySegment((current) => ({
                                                            ...current,
                                                            [activeSegmentId]: '',
                                                        }));
                                                    }}
                                                >
                                                    Limpar nota
                                                </button>
                                            )}
                                        </div>
                                    </article>
                                </section>
                            )}

                            {activeTab === 'sources' && content.sources?.length > 0 && (
                                <section className="sources-section">
                                    <h3 className="section-title brand-font">Fontes e referências</h3>
                                    <p className="sources-intro">
                                        As etiquetas distinguem texto primário, edição histórica, acervo visual,
                                        referência científica e estudo secundário.
                                    </p>
                                    <div className="sources-list">
                                        {content.sources.map((source) => (
                                            <article key={source.url}>
                                                <div>
                                                    <span>{source.kind}</span>
                                                    <small>{source.tradition}</small>
                                                </div>
                                                <a href={source.url} target="_blank" rel="noreferrer">
                                                    {source.label}
                                                </a>
                                                <p>{source.note}</p>
                                            </article>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {glossaryEntry && (
                <aside className="glossary-popover" aria-live="polite" aria-label={`Definição: ${glossaryEntry.term}`}>
                    <button type="button" onClick={() => setGlossaryEntry(null)} aria-label="Fechar definição">×</button>
                    <span>{glossaryEntry.category}</span>
                    <h3 className="brand-font">{glossaryEntry.term}</h3>
                    <p>{glossaryEntry.definition}</p>
                </aside>
            )}
            {showShareCard && content && (
                <ShareCard content={content} onClose={() => setShowShareCard(false)} />
            )}
        </aside>
    );
}
