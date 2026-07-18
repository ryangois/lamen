import './ResearchPanels.css';

export function ProvenancePanel({ items }) {
  return (
    <section className="research-panel provenance-panel">
      <header>
        <span>Camadas históricas</span>
        <h3 className="brand-font">Proveniência das associações</h3>
        <p>Cada linha distingue a base antiga de recepções medievais, herméticas e editoriais.</p>
      </header>
      <div className="provenance-timeline">
        {items.map((item, index) => (
          <article key={`${item.layer}-${item.source}`}>
            <b>{String(index + 1).padStart(2, '0')}</b>
            <div>
              <span>{item.period} · {item.tradition}</span>
              <h4>{item.layer}</h4>
              {item.url ? (
                <a href={item.url} target="_blank" rel="noreferrer">{item.source}</a>
              ) : (
                <strong>{item.source}</strong>
              )}
              <p>{item.note}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="research-caution">
        Proveniência indica quando e em qual ambiente uma relação é documentada; não declara que todas
        as escolas adotem a mesma correspondência.
      </p>
    </section>
  );
}

export function TextWitnessesPanel({ versions }) {
  return (
    <section className="research-panel textual-panel">
      <header>
        <span>Crítica textual</span>
        <h3 className="brand-font">Versões do Sefer Yetzirah</h3>
        <p>
          O livro chegou por famílias textuais distintas. “Versão” aqui significa recensão ou organização
          do texto, não simples tradução.
        </p>
      </header>
      <div className="textual-grid">
        {versions.map((version) => (
          <article key={version.id}>
            <div>
              <span>{version.period}</span>
              <strong lang="he" dir="rtl">{version.hebrew}</strong>
            </div>
            <h4>{version.name}</h4>
            <p>{version.description}</p>
            <a href={version.url} target="_blank" rel="noreferrer">Ver catálogo textual da Sefaria</a>
          </article>
        ))}
      </div>
      <p className="research-caution">
        Os “Trinta e Dois Caminhos de Sabedoria” numerados como inteligências são um apêndice transmitido
        em edições ocidentais; não são frases literais do corpo antigo do Sefer Yetzirah.
      </p>
    </section>
  );
}

export function FourWorldsPanel({ worlds, title }) {
  return (
    <section className="research-panel worlds-panel">
      <header>
        <span>Quatro Mundos</span>
        <h3 className="brand-font">{title} em quatro níveis</h3>
        <p>Uma leitura hermética em cascata, do princípio arquetípico à experiência concreta.</p>
      </header>
      <div className="worlds-stack">
        {worlds.map((world, index) => (
          <article style={{ '--world-color': world.color }} key={world.id}>
            <b>{index + 1}</b>
            <div>
              <span>{world.label}</span>
              <h4>{world.name} <i lang="he" dir="rtl">{world.hebrew}</i></h4>
              <p>{world.focus}</p>
              <strong>{world.expression}</strong>
            </div>
          </article>
        ))}
      </div>
      <p className="research-caution">
        A distribuição fixa de nomes divinos, arcanjos, coros e imagens pelos quatro mundos segue
        sínteses cabalísticas e herméticas posteriores.
      </p>
    </section>
  );
}

export function TarotComparisonPanel({ cards }) {
  return (
    <section className="research-panel tarot-comparison-panel">
      <header>
        <span>Leitura visual</span>
        <h3 className="brand-font">O que muda entre os baralhos</h3>
        <p>Compare título, época, linguagem visual e mudanças de sistema antes de interpretar a carta.</p>
      </header>
      <div className="tarot-comparison-table">
        {cards.map((card) => (
          <article key={card.deck}>
            <span>{card.period}</span>
            <h4>{card.deck}</h4>
            <strong>{card.title}</strong>
            <p>{card.visualLanguage}</p>
            <small>{card.difference}</small>
            {card.sourceUrl && (
              <a href={card.sourceUrl} target="_blank" rel="noreferrer">Consultar fonte do baralho</a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export function HebrewAnalysisPanel({ analysis, value, onNavigate }) {
  return (
    <section className="research-panel hebrew-analysis-panel">
      <header>
        <span>Análise hebraica</span>
        <h3 className="brand-font">Estrutura letra por letra</h3>
        <p>{analysis.morphologyNote}</p>
      </header>
      <div className="hebrew-word-summary">
        <strong lang="he" dir="rtl">{analysis.text}</strong>
        <div>
          <span>{analysis.letterCount} {analysis.letterCount === 1 ? 'letra' : 'letras'}</span>
          <b>Valor padrão {value}</b>
        </div>
      </div>
      {analysis.lexicalRoot && (
        <article className="hebrew-root-card">
          <span>Raiz lexical</span>
          <strong lang="he" dir="rtl">{analysis.lexicalRoot.root}</strong>
          <b>{analysis.lexicalRoot.transliteration}</b>
          <p>{analysis.lexicalRoot.note}</p>
        </article>
      )}
      <div className="hebrew-letter-analysis">
        {analysis.letters.map((letter, index) => (
          <article key={`${letter.letter}-${index}`}>
            <strong lang="he" dir="rtl">{letter.letter}</strong>
            <div>
              <span>{letter.name} · {letter.value}</span>
              <p><b>Imagem:</b> {letter.image}</p>
              <p>{letter.meaning}</p>
            </div>
          </article>
        ))}
      </div>
      <section className="equal-gematria">
        <h4 className="brand-font">Mesmo valor dentro do Lâmen</h4>
        {analysis.equals.length ? (
          <div>
            {analysis.equals.map((item) => (
              <button type="button" onClick={() => onNavigate?.(item.id)} key={item.id}>
                <span lang="he" dir="rtl">{item.text}</span>
                <strong>{item.title}</strong>
                <small>{item.category} · {item.value}</small>
              </button>
            ))}
          </div>
        ) : (
          <p>Nenhuma outra entrada atual possui exatamente o mesmo valor padrão.</p>
        )}
      </section>
      <p className="research-caution">
        Igualdade numérica cria uma pista comparativa, não prova parentesco etimológico, histórico ou teológico.
      </p>
    </section>
  );
}

export function RelationNetwork({ title, relations, onNavigate }) {
  const visibleRelations = relations.slice(0, 8);
  const nodes = visibleRelations.map((relation, index) => {
    const angle = (-Math.PI / 2) + ((Math.PI * 2 * index) / visibleRelations.length);
    return {
      ...relation,
      x: 50 + Math.cos(angle) * 39,
      y: 50 + Math.sin(angle) * 38,
    };
  });
  return (
    <section className="relation-network" aria-label={`Mapa visual de relações de ${title}`}>
      <div className="relation-network-canvas">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {nodes.map((node) => (
            <line x1="50" y1="50" x2={node.x} y2={node.y} key={`line-${node.id}`} />
          ))}
        </svg>
        <div className="relation-network-center">
          <span>Ficha atual</span>
          <strong>{title}</strong>
        </div>
        {nodes.map((relation) => (
            <button
              type="button"
              style={{
                '--node-x': `${relation.x}%`,
                '--node-y': `${relation.y}%`,
              }}
              onClick={() => onNavigate?.(relation.id)}
              key={relation.id}
            >
              <span>{relation.category}</span>
              <strong>{relation.label}</strong>
            </button>
        ))}
      </div>
      {relations.length > visibleRelations.length && (
        <small>Mais {relations.length - visibleRelations.length} relações aparecem na lista detalhada abaixo.</small>
      )}
    </section>
  );
}
