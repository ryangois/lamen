import React, { useEffect, useState } from 'react';
import { getContent } from '../data/content';
import './InfoPanel.css';

export default function InfoPanel({ activeSegmentId, onClose }) {
    const [content, setContent] = useState(null);

    useEffect(() => {
        if (activeSegmentId) {
            setContent(getContent(activeSegmentId));
        }
    }, [activeSegmentId]);

    if (!activeSegmentId) return null;

    return (
        <aside className={`info-panel glass-panel ${activeSegmentId ? 'open' : ''}`}>
            <button className="close-btn" onClick={onClose} aria-label="Close panel">
                &times;
            </button>

            {content && (
                <div className="content-container animate-fade-in">
                    {content.image && (
                        <div className="image-wrapper">
                            <img src={content.image} alt={content.title} className="panel-image" />
                            <div className="image-overlay"></div>
                        </div>
                    )}

                    <div className="info-body">
                        <h2 className="title brand-font">{content.title}</h2>
                        {content.subtitle && <h4 className="subtitle brand-font">{content.subtitle}</h4>}

                        <div className="divider"></div>

                        <p className="description">{content.description}</p>

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
                    </div>
                </div>
            )}
        </aside>
    );
}
