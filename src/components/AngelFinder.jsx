import { useMemo, useState } from 'react';
import { getAngelByNumber, ZODIAC_NAMES, ZODIAC_ORDER } from '../data/catalog';
import './AngelFinder.css';

const SIGN_WINDOWS = [
  ['capricorn', 1, 1, 19],
  ['aquarius', 1, 20, 49],
  ['pisces', 2, 19, 78],
  ['aries', 3, 20, 108],
  ['taurus', 4, 20, 139],
  ['gemini', 5, 21, 170],
  ['cancer', 6, 21, 201],
  ['leo', 7, 23, 233],
  ['virgo', 8, 23, 264],
  ['libra', 9, 23, 295],
  ['scorpio', 10, 23, 325],
  ['sagittarius', 11, 22, 355],
  ['capricorn', 12, 22, 385],
];

function dayOfYear(month, day) {
  const monthLengths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return monthLengths.slice(0, month - 1).reduce((sum, length) => sum + length, 0) + day;
}

function resolveDateSign(dateValue) {
  if (!dateValue) return null;
  const [, monthValue, dayValue] = dateValue.split('-').map(Number);
  const day = dayOfYear(monthValue, dayValue);
  const normalizedDay = day < 20 ? day + 366 : day;

  for (let index = 0; index < SIGN_WINDOWS.length - 1; index += 1) {
    const [signId,, , start] = SIGN_WINDOWS[index];
    const [, , , nextStart] = SIGN_WINDOWS[index + 1];
    if (normalizedDay >= start && normalizedDay < nextStart) {
      const degree = Math.min(29.99, ((normalizedDay - start) / (nextStart - start)) * 30);
      return { signId, degree };
    }
  }

  return { signId: 'capricorn', degree: 0 };
}

function angelFromSignDegree(signId, degree) {
  const signIndex = ZODIAC_ORDER.indexOf(signId);
  if (signIndex < 0) return null;
  const angelOffset = Math.min(5, Math.max(0, Math.floor(Number(degree || 0) / 5)));
  return getAngelByNumber(signIndex * 6 + angelOffset + 1);
}

export default function AngelFinder({ onClose, onSelectAngel }) {
  const [birthDate, setBirthDate] = useState('');
  const [manualSign, setManualSign] = useState('aries');
  const [manualDegree, setManualDegree] = useState('');
  const [mode, setMode] = useState('date');

  const result = useMemo(() => {
    const dateSign = mode === 'date' ? resolveDateSign(birthDate) : null;
    const signId = mode === 'manual' ? manualSign : dateSign?.signId;
    const degree = mode === 'manual' ? Number(manualDegree || 0) : dateSign?.degree;
    const angel = signId ? angelFromSignDegree(signId, degree) : null;
    return signId && angel ? { signId, degree, angel } : null;
  }, [birthDate, manualDegree, manualSign, mode]);

  return (
    <div className="angel-finder-backdrop" role="presentation">
      <section className="angel-finder" role="dialog" aria-modal="true" aria-labelledby="angel-finder-title">
        <button className="finder-close" type="button" onClick={onClose} aria-label="Fechar Meu Anjo">&times;</button>

        <p className="finder-eyebrow">Mapa pessoal</p>
        <h2 className="brand-font" id="angel-finder-title">Qual é meu anjo?</h2>
        <p className="finder-intro">
          Informe sua data de nascimento para uma leitura tropical aproximada, ou use signo e grau
          quando quiser uma correspondência mais precisa dentro dos 72 quinários.
        </p>

        <div className="finder-mode" role="tablist" aria-label="Modo de cálculo">
          <button type="button" className={mode === 'date' ? 'active' : ''} onClick={() => setMode('date')}>
            Por data
          </button>
          <button type="button" className={mode === 'manual' ? 'active' : ''} onClick={() => setMode('manual')}>
            Por signo e grau
          </button>
        </div>

        {mode === 'date' ? (
          <label className="finder-field">
            <span>Data de nascimento</span>
            <input type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} />
          </label>
        ) : (
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
        )}

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
          Nota: datas tropicais variam levemente por ano, horário e fuso. Para máxima precisão,
          use o grau solar real no modo “signo e grau”.
        </p>
      </section>
    </div>
  );
}
