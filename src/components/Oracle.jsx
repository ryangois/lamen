import { useMemo, useState } from 'react';
import { drawOracleItem, getOraclePool, oracleTypes } from '../data/oracle';
import './Oracle.css';

const DEFAULT_PROMPTS = [
  'Que força quer ser percebida agora?',
  'Qual símbolo pode orientar o próximo passo?',
  'Onde há excesso, falta ou passagem pedindo consciência?',
  'Qual chave abre uma leitura mais honesta do momento?',
];

const SPREAD_POSITIONS = ['Situação', 'Desafio', 'Conselho'];

function getPrompt(item) {
  return item?.content?.practice?.prompt
    || item?.content?.psalm?.meditation
    || DEFAULT_PROMPTS[Math.floor(Math.random() * DEFAULT_PROMPTS.length)];
}

export default function Oracle({ onSegmentClick }) {
  const [type, setType] = useState('all');
  const [mode, setMode] = useState('single');
  const [results, setResults] = useState([]);
  const poolSize = useMemo(() => getOraclePool(type).length, [type]);
  const activeType = oracleTypes.find((item) => item.id === type) || oracleTypes[0];
  const result = results[0]?.item || null;
  const prompt = results[0]?.prompt || DEFAULT_PROMPTS[0];

  const handleDraw = () => {
    if (mode === 'single') {
      const next = drawOracleItem(type, result?.id);
      setResults(next ? [{ item: next, prompt: getPrompt(next) }] : []);
      return;
    }

    const previousIds = new Set(results.map((entry) => entry.item.id));
    const available = getOraclePool(type).filter((item) => !previousIds.has(item.id));
    const pool = available.length >= 3 ? available : getOraclePool(type);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
    setResults(shuffled.map((item) => ({ item, prompt: getPrompt(item) })));
  };

  const handleTypeChange = (nextType) => {
    setType(nextType);
    setResults([]);
  };

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    setResults([]);
  };

  return (
    <section className="oracle-shell" aria-labelledby="oracle-title">
      <div className="oracle-hero">
        <span className="oracle-eyebrow">Oráculo hermético</span>
        <h1 id="oracle-title" className="brand-font">Sorteie uma chave do Lamen</h1>
        <p>
          Formule uma pergunta, escolha o campo simbólico e sorteie um anjo,
          caminho, esfera ou correspondência para contemplação.
        </p>
      </div>

      <div className="oracle-board">
        <div className="oracle-mode-switch" role="group" aria-label="Escolher formato do oráculo">
          <button
            type="button"
            className={mode === 'single' ? 'active' : ''}
            aria-pressed={mode === 'single'}
            onClick={() => handleModeChange('single')}
          >
            <span aria-hidden="true">✦</span>
            Uma chave
          </button>
          <button
            type="button"
            className={mode === 'triad' ? 'active' : ''}
            aria-pressed={mode === 'triad'}
            onClick={() => handleModeChange('triad')}
          >
            <span aria-hidden="true">✦ ✦ ✦</span>
            Três chaves
          </button>
        </div>

        <div className="oracle-controls-heading">
          <div>
            <span>Campo do sorteio</span>
            <strong>{activeType.label}</strong>
          </div>
          <small>{poolSize} {poolSize === 1 ? 'chave' : 'chaves'}</small>
        </div>

        <div className="oracle-controls" role="group" aria-label="Escolher tipo de sorteio">
          {oracleTypes.map((item) => (
            <button
              type="button"
              className={type === item.id ? 'active' : ''}
              onClick={() => handleTypeChange(item.id)}
              aria-pressed={type === item.id}
              key={item.id}
            >
              <span aria-hidden="true">{type === item.id ? '✦' : '◇'}</span>
              {item.label}
            </button>
          ))}
        </div>

        {mode === 'single' ? (
          <article
            className={`oracle-card ${result ? 'revealed' : 'is-empty'}`}
            aria-live="polite"
            aria-atomic="true"
          >
          <div className="oracle-card-topline">
            <span>{result ? 'Chave sorteada' : 'Pronto para sortear'}</span>
            <small>{activeType.label}</small>
          </div>

          <div className="oracle-sigil" style={{ '--oracle-color': result?.color || '#d4af37' }}>
            <span>{result?.symbol || '✦'}</span>
          </div>
          <div className="oracle-card-copy">
            <span>{result?.typeLabel || `${poolSize} chaves disponíveis`}</span>
            <h2 className="brand-font">{result?.title || 'Respire e sorteie'}</h2>
            <p>{result?.subtitle || 'O oráculo não decide por você: ele oferece uma imagem para pensar melhor.'}</p>
          </div>

          <div className="oracle-reading">
            <small><span aria-hidden="true">✦</span> Pergunta contemplativa</small>
            <p>{prompt}</p>
          </div>

          {result?.keywords?.length > 0 && (
            <div className="oracle-tags" aria-label="Palavras-chave">
              {result.keywords.slice(0, 5).map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
          )}
          </article>
        ) : (
          <section className={`oracle-spread ${results.length ? 'revealed' : 'is-empty'}`} aria-live="polite">
            {results.length ? results.map(({ item, prompt: itemPrompt }, index) => (
              <article className="oracle-spread-card" key={item.id}>
                <div className="oracle-spread-position">
                  <span>{index + 1}</span>
                  <strong>{SPREAD_POSITIONS[index]}</strong>
                </div>
                <div className="oracle-spread-sigil" style={{ '--oracle-color': item.color || '#d4af37' }}>
                  {item.symbol || '✦'}
                </div>
                <small>{item.typeLabel}</small>
                <h2 className="brand-font">{item.title}</h2>
                <p>{item.subtitle}</p>
                <blockquote>{itemPrompt}</blockquote>
                <button type="button" onClick={() => onSegmentClick?.(item.id)}>
                  Abrir ficha <span aria-hidden="true">→</span>
                </button>
              </article>
            )) : SPREAD_POSITIONS.map((position, index) => (
              <article className="oracle-spread-card placeholder" key={position}>
                <div className="oracle-spread-position">
                  <span>{index + 1}</span>
                  <strong>{position}</strong>
                </div>
                <div className="oracle-spread-sigil">✦</div>
                <h2 className="brand-font">Aguardando</h2>
                <p>Esta posição será revelada junto das outras duas.</p>
              </article>
            ))}
          </section>
        )}

        <div className={`oracle-actions ${mode === 'single' && result ? 'has-result' : ''}`}>
          <button
            type="button"
            className="oracle-draw"
            onClick={handleDraw}
            aria-label={`${results.length ? 'Sortear novamente' : 'Sortear'} ${mode === 'triad' ? 'três chaves' : 'uma chave'} em ${activeType.label}`}
          >
            <span aria-hidden="true">✦</span>
            {results.length
              ? `Sortear ${mode === 'triad' ? 'outras três chaves' : 'outra chave'}`
              : `Sortear ${mode === 'triad' ? 'três chaves' : 'chave'}`}
          </button>
          {mode === 'single' && result && (
            <button
              type="button"
              className="oracle-open"
              onClick={() => onSegmentClick?.(result.id)}
            >
              Abrir ficha completa
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
