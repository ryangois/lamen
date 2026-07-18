import { useState } from 'react';
import './StudyPath.css';

const MODULES = [
  {
    id: 'elements',
    number: '01',
    title: 'Elementos',
    description: 'Aprenda as quatro qualidades fundamentais antes de combinar símbolos.',
    startId: 'fire',
    count: 4,
  },
  {
    id: 'planets',
    number: '02',
    title: 'Planetas',
    description: 'Reconheça funções, dignidades, metais, dias e relações com a Árvore.',
    startId: 'saturn',
    count: 7,
  },
  {
    id: 'zodiac',
    number: '03',
    title: 'Signos',
    description: 'Combine elemento, modalidade, regência, decanatos e graus.',
    startId: 'aries',
    count: 12,
  },
  {
    id: 'sephiroth',
    number: '04',
    title: 'Sephiroth',
    description: 'Percorra as dez esferas, virtudes, desequilíbrios e regências.',
    startId: 'arc_metatron',
    count: 10,
  },
  {
    id: 'paths',
    number: '05',
    title: 'Caminhos',
    description: 'Estude as 22 letras, conexões, Arcanos e variações entre escolas.',
    startId: 'path_aleph',
    count: 22,
  },
  {
    id: 'angels',
    number: '06',
    title: '72 Anjos',
    description: 'Integre nomes, graus, coros, Salmos, gematria e temas contemplativos.',
    startId: 'angel_VHV',
    count: 72,
  },
  {
    id: 'tarot',
    number: '07',
    title: 'Tarot',
    description: 'Compare Arcanos Maiores, cartas dos decanatos e sistemas visuais.',
    startId: 'dec_0_0',
    count: 36,
  },
];

function readProgress() {
  try {
    const saved = JSON.parse(window.localStorage.getItem('lamen-study-progress') || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function StudyPath({ onClose, onOpen }) {
  const [completed, setCompleted] = useState(readProgress);
  const completedCount = MODULES.filter((module) => completed.includes(module.id)).length;
  const progress = Math.round((completedCount / MODULES.length) * 100);

  const toggleModule = (id) => {
    setCompleted((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      window.localStorage.setItem('lamen-study-progress', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="study-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="study-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="study-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <span>Trilha guiada</span>
            <h2 className="brand-font" id="study-title">Do fundamento à síntese</h2>
            <p>Sete módulos em uma ordem que evita misturar sistemas antes da base.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar trilha de estudo">×</button>
        </header>

        <section className="study-progress" aria-label={`${progress}% da trilha concluída`}>
          <div>
            <strong>{completedCount}/{MODULES.length}</strong>
            <span>módulos concluídos</span>
          </div>
          <div className="study-progress-track">
            <span style={{ '--study-progress': `${progress}%` }}></span>
          </div>
          <b>{progress}%</b>
        </section>

        <div className="study-modules">
          {MODULES.map((module) => {
            const done = completed.includes(module.id);
            return (
              <article className={done ? 'completed' : ''} key={module.id}>
                <span>{done ? '✓' : module.number}</span>
                <div>
                  <small>{module.count} fichas</small>
                  <h3 className="brand-font">{module.title}</h3>
                  <p>{module.description}</p>
                  <div>
                    <button type="button" onClick={() => onOpen(module.startId)}>
                      Explorar módulo <span aria-hidden="true">→</span>
                    </button>
                    <button type="button" onClick={() => toggleModule(module.id)}>
                      {done ? 'Reabrir módulo' : 'Marcar concluído'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
