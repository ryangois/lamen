import { useMemo, useState } from 'react';
import { drawOracleItem, getOraclePool, oracleTypes } from '../data/oracle';
import './Oracle.css';

const DEFAULT_PROMPTS = [
  'Que força quer ser percebida agora?',
  'Qual símbolo pode orientar o próximo passo?',
  'Onde há excesso, falta ou passagem pedindo consciência?',
  'Qual chave abre uma leitura mais honesta do momento?',
];

function getPrompt(item) {
  return item?.content?.practice?.prompt
    || item?.content?.psalm?.meditation
    || DEFAULT_PROMPTS[Math.floor(Math.random() * DEFAULT_PROMPTS.length)];
}

export default function Oracle({ onSegmentClick }) {
  const [type, setType] = useState('all');
  const [result, setResult] = useState(null);
  const [prompt, setPrompt] = useState(DEFAULT_PROMPTS[0]);
  const poolSize = useMemo(() => getOraclePool(type).length, [type]);

  const handleDraw = () => {
    const next = drawOracleItem(type, result?.id);
    setResult(next);
    setPrompt(getPrompt(next));
  };

  const handleTypeChange = (nextType) => {
    setType(nextType);
    setResult(null);
    setPrompt(DEFAULT_PROMPTS[0]);
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
        <div className="oracle-controls" role="group" aria-label="Escolher tipo de sorteio">
          {oracleTypes.map((item) => (
            <button
              type="button"
              className={type === item.id ? 'active' : ''}
              onClick={() => handleTypeChange(item.id)}
              aria-pressed={type === item.id}
              key={item.id}
            >
              {item.label}
            </button>
          ))}
        </div>

        <article className={`oracle-card ${result ? 'revealed' : ''}`}>
          <div className="oracle-sigil" style={{ '--oracle-color': result?.color || '#d4af37' }}>
            <span>{result?.symbol || '✦'}</span>
          </div>
          <div className="oracle-card-copy">
            <span>{result?.typeLabel || `${poolSize} chaves disponíveis`}</span>
            <h2 className="brand-font">{result?.title || 'Respire e sorteie'}</h2>
            <p>{result?.subtitle || 'O oráculo não decide por você: ele oferece uma imagem para pensar melhor.'}</p>
          </div>

          <div className="oracle-reading">
            <small>Pergunta contemplativa</small>
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

        <div className="oracle-actions">
          <button type="button" className="oracle-draw" onClick={handleDraw}>
            {result ? 'Sortear outra chave' : 'Sortear chave'}
          </button>
          <button
            type="button"
            className="oracle-open"
            onClick={() => result && onSegmentClick?.(result.id)}
            disabled={!result}
          >
            Abrir ficha completa
          </button>
        </div>
      </div>
    </section>
  );
}
