function SafeLink({ href, children }) {
  const safeHref = /^https?:\/\//i.test(href || '') ? href : '#';
  return <a href={safeHref} target="_blank" rel="noreferrer">{children}</a>;
}

function renderBlock(block) {
  switch (block.type) {
    case 'lead':
      return <p className="article-lead">{block.text}</p>;
    case 'heading':
      return <h2 className="brand-font" id={block.anchor}>{block.text}</h2>;
    case 'paragraph':
      return <p>{block.text}</p>;
    case 'quote':
      return <blockquote className="article-key-quote">{block.text}</blockquote>;
    case 'list': {
      const List = block.ordered ? 'ol' : 'ul';
      return <List className="article-check-list">{(block.items || []).map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</List>;
    }
    case 'formula':
      return (
        <blockquote className="article-formula">
          {(block.items || []).map((item, index) => (
            <span className="article-formula-part" key={`${item}-${index}`}>
              {index > 0 && <i aria-hidden="true">→</i>}{item}
            </span>
          ))}
        </blockquote>
      );
    case 'table':
      return (
        <div className="article-table-wrap" tabIndex="0" role="region" aria-label={block.caption || 'Tabela editorial'}>
          <table>
            <thead><tr>{(block.headers || []).map((header, index) => <th key={`${header}-${index}`}>{header}</th>)}</tr></thead>
            <tbody>{(block.rows || []).map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      );
    case 'cards':
      return (
        <div className="four-stage-grid">
          {(block.items || []).map((item, index) => (
            <article key={`${item.title}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.text}</p></article>
          ))}
        </div>
      );
    case 'hebrew':
      return (
        <div className="world-language-card">
          <strong lang="he" dir="rtl">{block.hebrew}</strong>
          <div><span>Transliteração</span><p>{block.transliteration}</p></div>
          <div><span>Significado</span><p>{block.meaning}</p></div>
        </div>
      );
    case 'timeline':
      return <div className="history-chain">{(block.items || []).map((item, index) => <span key={`${item}-${index}`}>{item}{index < block.items.length - 1 && <i>→</i>}</span>)}</div>;
    case 'image':
      if (!block.url) return null;
      return (
        <figure className="article-editorial-image">
          <img src={block.url} alt={block.alt || ''} loading="lazy" decoding="async" />
          {(block.caption || block.credit) && <figcaption>{block.caption}{block.credit && <small>{block.credit}</small>}</figcaption>}
        </figure>
      );
    case 'references':
      return (
        <section className="article-references">
          <span>Referências e leitura complementar</span>
          <h2 className="brand-font">Fontes consultáveis</h2>
          <ol>{(block.items || []).map((item, index) => <li key={`${item.url}-${index}`}><SafeLink href={item.url}>{item.label}</SafeLink></li>)}</ol>
        </section>
      );
    default:
      return null;
  }
}

export default function ArticleRenderer({ blocks = [] }) {
  return blocks.map((block) => {
    const content = renderBlock(block);
    if (!content) return null;
    if (block.type === 'heading') return <section className="dynamic-article-section" key={block.id}>{content}</section>;
    return <div className={`dynamic-article-block block-${block.type}`} key={block.id}>{content}</div>;
  });
}

