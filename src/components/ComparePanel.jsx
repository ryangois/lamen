import { useMemo, useState } from 'react';
import { contentData } from '../data/content';
import './ComparePanel.css';

const comparisonOptions = Object.entries(contentData)
  .map(([id, content]) => ({
    id,
    title: content.title,
    category: content.categoryLabel || 'Símbolo',
  }))
  .sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));

function ComparisonSelect({ label, value, onChange }) {
  const groups = Object.groupBy
    ? Object.groupBy(comparisonOptions, (item) => item.category)
    : comparisonOptions.reduce((result, item) => {
        result[item.category] = [...(result[item.category] || []), item];
        return result;
      }, {});

  return (
    <label>
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {Object.entries(groups).map(([category, items]) => (
          <optgroup label={category} key={category}>
            {items.map((item) => (
              <option value={item.id} key={item.id}>{item.title}</option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  );
}

export default function ComparePanel({ initialId, onClose, onOpen }) {
  const initialContent = contentData[initialId];
  const suggestedId = initialContent?.relations?.[0]?.id
    || comparisonOptions.find((item) => item.id !== initialId)?.id;
  const [leftId, setLeftId] = useState(initialId || comparisonOptions[0].id);
  const [rightId, setRightId] = useState(suggestedId);
  const left = contentData[leftId];
  const right = contentData[rightId];
  const rows = useMemo(() => {
    const keys = [...new Set([
      ...Object.keys(left?.associations || {}),
      ...Object.keys(right?.associations || {}),
    ])];
    return keys
      .map((key) => ({
        key,
        left: left?.associations?.[key] || '—',
        right: right?.associations?.[key] || '—',
      }))
      .sort((a, b) => {
        const aShared = a.left !== '—' && a.right !== '—';
        const bShared = b.left !== '—' && b.right !== '—';
        return Number(bShared) - Number(aShared);
      })
      .slice(0, 18);
  }, [left, right]);

  return (
    <div className="compare-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="compare-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <span>Estudo comparado</span>
            <h2 className="brand-font" id="compare-title">Compare duas fichas</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar comparação">×</button>
        </header>

        <div className="compare-selectors">
          <ComparisonSelect label="Primeira ficha" value={leftId} onChange={setLeftId} />
          <button
            type="button"
            className="compare-swap"
            onClick={() => {
              setLeftId(rightId);
              setRightId(leftId);
            }}
            aria-label="Trocar a ordem das fichas"
          >
            ⇄
          </button>
          <ComparisonSelect label="Segunda ficha" value={rightId} onChange={setRightId} />
        </div>

        <div className="compare-content">
          <div className="compare-headings">
            {[{ id: leftId, content: left }, { id: rightId, content: right }].map((item) => (
              <article key={item.id}>
                <span>{item.content.categoryLabel}</span>
                <h3 className="brand-font">{item.content.title}</h3>
                <p>{item.content.subtitle}</p>
                <button type="button" onClick={() => onOpen(item.id)}>Abrir ficha</button>
              </article>
            ))}
          </div>

          <section className="compare-descriptions">
            <article><p>{left.description}</p></article>
            <article><p>{right.description}</p></article>
          </section>

          <div className="compare-table" role="table" aria-label="Correspondências comparadas">
            {rows.map((row) => (
              <div role="row" key={row.key}>
                <strong role="rowheader">{row.key}</strong>
                <span role="cell">{row.left}</span>
                <span role="cell">{row.right}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
