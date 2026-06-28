import { useMemo, useState } from 'react';
import { getAngelByNumber, ZODIAC_NAMES, ZODIAC_ORDER } from '../data/catalog';
import './AngelFinder.css';

function angelFromSignDegree(signId, degree) {
  const signIndex = ZODIAC_ORDER.indexOf(signId);
  if (signIndex < 0) return null;
  const angelOffset = Math.min(5, Math.max(0, Math.floor(Number(degree || 0) / 5)));
  return getAngelByNumber(signIndex * 6 + angelOffset + 1);
}

export default function AngelFinder({ onClose, onSelectAngel }) {
  const [manualSign, setManualSign] = useState('aries');
  const [manualDegree, setManualDegree] = useState('');

  const result = useMemo(() => {
    const degree = Number(manualDegree || 0);
    const angel = angelFromSignDegree(manualSign, degree);
    return angel ? { signId: manualSign, degree, angel } : null;
  }, [manualDegree, manualSign]);

  return (
    <div className="angel-finder-backdrop" role="presentation">
      <section className="angel-finder" role="dialog" aria-modal="true" aria-labelledby="angel-finder-title">
        <button className="finder-close" type="button" onClick={onClose} aria-label="Fechar Meu Anjo">&times;</button>

        <p className="finder-eyebrow">Mapa pessoal</p>
        <h2 className="brand-font" id="angel-finder-title">Qual é meu anjo?</h2>
        <p className="finder-intro">
          Escolha seu signo e informe o grau dentro dele para encontrar a correspondência
          angelical entre os 72 quinários.
        </p>

        <div className="finder-grid">
          <label className="finder-field">
            <span>Signo</span>
            <select value={manualSign} onChange={(event) => setManualSign(event.target.value)}>
              {ZODIAC_ORDER.map((signId) => (
                <option value={signId} key={signId}>{ZODIAC_NAMES[signId]}</option>
              ))}
            </select>
          </label>
          <label className="finder-field">
            <span>Grau no signo</span>
            <input
              type="number"
              min="0"
              max="29.99"
              step="0.1"
              value={manualDegree}
              onChange={(event) => setManualDegree(event.target.value)}
              placeholder="0 a 29.9"
            />
          </label>
        </div>

        {result ? (
          <article className="finder-result">
            <span className="result-number">{result.angel.number}</span>
            <div>
              <h3 className="brand-font">{result.angel.content.title}</h3>
              <p>{result.angel.content.subtitle}</p>
              <dl>
                <div>
                  <dt>Signo</dt>
                  <dd>{ZODIAC_NAMES[result.signId]}</dd>
                </div>
                <div>
                  <dt>Grau estimado</dt>
                  <dd>{Number(result.degree || 0).toFixed(1)}°</dd>
                </div>
                <div>
                  <dt>Coro</dt>
                  <dd>{result.angel.choir}</dd>
                </div>
                <div>
                  <dt>Arcanjo</dt>
                  <dd>{result.angel.content.associations?.Arcanjo}</dd>
                </div>
              </dl>
              <button
                type="button"
                className="open-angel-btn"
                onClick={() => {
                  onSelectAngel(result.angel.id);
                  onClose();
                }}
              >
                Abrir ficha completa
              </button>
            </div>
          </article>
        ) : (
          <div className="finder-empty">
            Escolha uma data para revelar a correspondência angelical.
          </div>
        )}

        <p className="finder-note">
          Nota: cada signo foi dividido em seis quinários de 5°. Use o grau solar real
          para uma correspondência mais precisa.
        </p>
      </section>
    </div>
  );
}
