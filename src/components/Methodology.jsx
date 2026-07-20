import { useRef } from 'react';
import { METHODOLOGY_SECTIONS, METHODOLOGY_SOURCES } from '../data/editorialEnhancements';
import { useDialogFocus } from '../hooks/useDialogFocus';
import './HelpModal.css';
import './Methodology.css';

export default function Methodology({ onClose }) {
  const modalRef = useRef(null);
  useDialogFocus(modalRef, true);

  return (
    <div className="help-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        ref={modalRef}
        className="help-modal methodology-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="methodology-title"
        tabIndex="-1"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="help-heading">
          <div>
            <p className="help-eyebrow">Nota metodológica</p>
            <h2 className="brand-font" id="methodology-title">Como a Hermetika organiza o conhecimento</h2>
            <p>
              A enciclopédia aproxima materiais judaicos, cabalísticos, cristãos, astrológicos e
              herméticos sem afirmar que tenham uma única origem ou a mesma autoridade.
            </p>
          </div>
          <button type="button" className="help-close" onClick={onClose} aria-label="Fechar metodologia">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.5 6.5l11 11m0-11-11 11" />
            </svg>
          </button>
        </header>

        <div className="methodology-grid">
          {METHODOLOGY_SECTIONS.map((section, index) => (
            <article key={section.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{section.title}</h3>
                <p>{section.text}</p>
              </div>
            </article>
          ))}
        </div>

        <section className="methodology-principles">
          <h3 className="brand-font">Regras editoriais</h3>
          <ul>
            <li>Uma ocorrência bíblica de uma palavra não é tratada automaticamente como referência à Sephirah posterior.</li>
            <li>Uma correspondência é acompanhada de tradição, período ou ressalva quando sua origem não é antiga.</li>
            <li>Grafias e transliterações alternativas são variantes, não personagens ou conceitos diferentes por padrão.</li>
            <li>Práticas são apresentadas como contemplação simbólica, nunca como diagnóstico, tratamento ou profecia.</li>
          </ul>
        </section>

        <section className="methodology-sources">
          <h3 className="brand-font">Pontos de partida</h3>
          <div>
            {METHODOLOGY_SOURCES.map((source) => (
              <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label}</a>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
