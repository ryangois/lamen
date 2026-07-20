import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { HEBREW_LETTERS, HISTORICAL_TREES, RESEARCH_SOURCES, getLetterGate } from '../data/researchData';
import { treePaths } from '../data/treeOfLife';
import { useDialogFocus } from '../hooks/useDialogFocus';
import './TreeResearch.css';

function HistoricalTreeSketch({ shape }) {
  return (
    <div className={`historical-tree-sketch shape-${shape}`} aria-hidden="true">
      {Array.from({ length: 10 }, (_, index) => <i key={index}></i>)}
    </div>
  );
}

export default function TreeResearch({ onClose, onOpenPath }) {
  const dialogRef = useRef(null);
  const [tab, setTab] = useState('gates');
  const [first, setFirst] = useState('א');
  const [second, setSecond] = useState('ב');
  useDialogFocus(dialogRef);
  const gate = getLetterGate(first, second);
  const firstPath = treePaths.find((path) => path.hebrew === first);
  const secondPath = treePaths.find((path) => path.hebrew === second);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return createPortal((
    <div className="tree-research-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        ref={dialogRef}
        className="tree-research-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tree-research-title"
        tabIndex="-1"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <span>Laboratório da Árvore</span>
            <h2 className="brand-font" id="tree-research-title">Letras e árvores históricas</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar laboratório">×</button>
        </header>

        <div className="tree-research-tabs" role="tablist" aria-label="Áreas do laboratório">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'gates'}
            className={tab === 'gates' ? 'active' : ''}
            onClick={() => setTab('gates')}
          >
            231 Portais
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'gallery'}
            className={tab === 'gallery' ? 'active' : ''}
            onClick={() => setTab('gallery')}
          >
            Galeria histórica
          </button>
        </div>

        <div className="tree-research-content">
          {tab === 'gates' ? (
            <section className="gates-lab">
              <header>
                <span>22 × 21 ÷ 2 = 231</span>
                <h3 className="brand-font">Combine duas letras</h3>
                <p>
                  O Sefer Yetzirah descreve as letras como pedras formativas e sua combinação como
                  “portais”. O número 231 corresponde aos pares possíveis de 22 letras distintas.
                </p>
              </header>
              <div className="gate-selectors">
                <label>
                  <span>Primeira letra</span>
                  <select value={first} onChange={(event) => setFirst(event.target.value)}>
                    {HEBREW_LETTERS.map((letter) => (
                      <option value={letter.hebrew} key={letter.hebrew}>
                        {letter.hebrew} · {letter.name} · {letter.value}
                      </option>
                    ))}
                  </select>
                </label>
                <b aria-hidden="true">↔</b>
                <label>
                  <span>Segunda letra</span>
                  <select value={second} onChange={(event) => setSecond(event.target.value)}>
                    {HEBREW_LETTERS.map((letter) => (
                      <option value={letter.hebrew} key={letter.hebrew}>
                        {letter.hebrew} · {letter.name} · {letter.value}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <article className="gate-result">
                <div>
                  <span lang="he" dir="rtl">{gate.pair}</span>
                  <i>↔</i>
                  <span lang="he" dir="rtl">{gate.reverse}</span>
                </div>
                <strong>Gematria combinada: {gate.value}</strong>
                <p>{gate.note}</p>
              </article>
              <div className="gate-letter-cards">
                {[gate.first, gate.second].map((letter, index) => {
                  const path = index === 0 ? firstPath : secondPath;
                  return (
                    <article key={`${letter.hebrew}-${index}`}>
                      <strong lang="he" dir="rtl">{letter.hebrew}</strong>
                      <div>
                        <span>{letter.name} · {letter.value}</span>
                        <p><b>Imagem:</b> {letter.image}</p>
                        <p>{letter.meaning}</p>
                        {path && (
                          <button type="button" onClick={() => onOpenPath(path.id)}>
                            Abrir caminho {path.number}
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
              <a href={RESEARCH_SOURCES.seferYetzirah} target="_blank" rel="noreferrer">
                Consultar o Sefer Yetzirah na Sefaria
              </a>
            </section>
          ) : (
            <section className="historical-gallery">
              <header>
                <span>Ilanot · mapas cabalísticos</span>
                <h3 className="brand-font">A Árvore nunca teve um único desenho</h3>
                <p>
                  Ilanot combinam texto e diagrama. Formato, região e escola alteram a forma de
                  representar Sephiroth, canais, mundos e partzufim.
                </p>
              </header>
              <div>
                {HISTORICAL_TREES.map((tree) => (
                  <article key={tree.id}>
                    <HistoricalTreeSketch shape={tree.shape} />
                    <span>{tree.period}</span>
                    <h4>{tree.title}</h4>
                    <small>{tree.region}</small>
                    <p>{tree.description}</p>
                    <a href={tree.url} target="_blank" rel="noreferrer">Abrir acervo acadêmico</a>
                  </article>
                ))}
              </div>
              <p className="tree-gallery-note">
                As miniaturas são esquemas editoriais da Hermetika, não reproduções dos manuscritos.
                Os links levam ao Ilanot Project, catálogo acadêmico desenvolvido na Universidade de Haifa.
              </p>
            </section>
          )}
        </div>
      </section>
    </div>
  ), document.body);
}
