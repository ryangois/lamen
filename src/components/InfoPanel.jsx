import React from 'react';
import { getContent } from '../data/content';
import './InfoPanel.css';

// Emoji icons for segments that don't have images yet
const ICONS = {
    fire:'🜂', water:'🜄', air:'🜁', earth:'🜃',
    saturn:'♄', jupiter:'♃', mars:'♂', sun_p:'☉', venus:'♀', mercury:'☿', moon_p:'☽',
    aries:'♈', taurus:'♉', gemini:'♊', cancer:'♋', leo:'♌', virgo:'♍',
    libra:'♎', scorpio:'♏', sagittarius:'♐', capricorn:'♑', aquarius:'♒', pisces:'♓',
};

export default function InfoPanel({ activeSegmentId, onClose }) {
    if (!activeSegmentId) return null;

    const content = getContent(activeSegmentId);
    const icon = ICONS[activeSegmentId] || '✦';

    return (
        <aside className={`info-panel glass-panel ${activeSegmentId ? 'open' : ''}`}>
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
                        <h2 className="title brand-font">{content.title}</h2>
                        {content.subtitle && <h4 className="subtitle brand-font">{content.subtitle}</h4>}
                        <div className="divider"></div>
                        <p className="description">{content.description}</p>

                        {content.highlights?.length > 0 && (
                            <ul className="highlights-list">
                                {content.highlights.map((highlight) => (
                                    <li key={highlight}>{highlight}</li>
                                ))}
                            </ul>
                        )}

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

                        {content.sources?.length > 0 && (
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
            )}
        </aside>
    );
}
