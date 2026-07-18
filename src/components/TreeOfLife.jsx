import { getContent } from '../data/content';
import { treePaths, treeSephiroth, treeSpecialNodes } from '../data/treeOfLife';
import TreeResearch from './TreeResearch';
import './TreeOfLife.css';

function activateByKeyboard(event, callback) {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  event.preventDefault();
  callback();
}

export default function TreeOfLife({
  activeSegmentId,
  onSegmentClick,
  researchOpen,
  onOpenResearch,
  onCloseResearch,
}) {
  const handleSelect = (id) => {
    onSegmentClick?.(id);
  };

  return (
    <section className="tree-shell" aria-labelledby="tree-title">
      <div className="tree-intro">
        <span className="eyebrow">Árvore da Vida</span>
        <h1 id="tree-title" className="brand-font">Esferas e caminhos clicáveis</h1>
        <p>
          Toque em uma Sephirah ou caminho para abrir as correspondências no painel,
          como na roda.
        </p>
        <button type="button" className="tree-research-launch" onClick={onOpenResearch}>
          <span aria-hidden="true">✦</span>
          231 Portais e árvores históricas
        </button>
      </div>

      <div className="tree-stage" aria-label="Árvore da Vida interativa">
        <svg className="tree-svg" viewBox="0 0 420 660" role="img" aria-labelledby="tree-svg-title">
          <title id="tree-svg-title">Árvore da Vida hermética com 10 esferas e 22 caminhos</title>

          <g className="tree-pillars" aria-hidden="true">
            <line x1="112" y1="118" x2="112" y2="470" />
            <line x1="210" y1="52" x2="210" y2="606" />
            <line x1="308" y1="118" x2="308" y2="470" />
          </g>

          <g className="tree-special-nodes">
            {treeSpecialNodes.map((node) => {
              const content = getContent(node.id);
              const isActive = activeSegmentId === node.id;

              return (
                <g
                  key={node.id}
                  className={`tree-node tree-node-special ${isActive ? 'active' : ''}`}
                  style={{ '--tree-node-color': node.color }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Abrir ${content.title}`}
                  onClick={() => handleSelect(node.id)}
                  onKeyDown={(event) => activateByKeyboard(event, () => handleSelect(node.id))}
                >
                  <circle className="tree-node-aura" cx={node.x} cy={node.y} r="30" />
                  <circle className="tree-node-disc" cx={node.x} cy={node.y} r="22" />
                  <text className="tree-node-name tree-node-daath" x={node.x} y={node.y + 4}>
                    {node.name}
                  </text>
                </g>
              );
            })}
          </g>

          <g className="tree-paths">
            {treePaths.map((path) => {
              const content = getContent(path.id);
              const isActive = activeSegmentId === path.id;

              return (
                <g
                  key={path.id}
                  className={`tree-path ${isActive ? 'active' : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Abrir caminho ${path.letter}: ${content.title}`}
                  onClick={() => handleSelect(path.id)}
                  onKeyDown={(event) => activateByKeyboard(event, () => handleSelect(path.id))}
                >
                  <line className="tree-path-hit" x1={path.x1} y1={path.y1} x2={path.x2} y2={path.y2} />
                  <line className="tree-path-line" x1={path.x1} y1={path.y1} x2={path.x2} y2={path.y2} />
                  <circle className="tree-path-label-bg" cx={path.labelX} cy={path.labelY} r="13" />
                  <text className="tree-path-label" x={path.labelX} y={path.labelY + 4}>
                    {path.hebrew}
                  </text>
                </g>
              );
            })}
          </g>

          <g className="tree-sephiroth">
            {treeSephiroth.map((sephirah) => {
              const content = getContent(sephirah.id);
              const isActive = activeSegmentId === sephirah.id;

              return (
                <g
                  key={sephirah.id}
                  className={`tree-node tree-node-${sephirah.pillar} ${isActive ? 'active' : ''}`}
                  style={{ '--tree-node-color': sephirah.color }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Abrir ${content.title}`}
                  onClick={() => handleSelect(sephirah.id)}
                  onKeyDown={(event) => activateByKeyboard(event, () => handleSelect(sephirah.id))}
                >
                  <circle className="tree-node-aura" cx={sephirah.x} cy={sephirah.y} r="35" />
                  <circle className="tree-node-disc" cx={sephirah.x} cy={sephirah.y} r="27" />
                  <text className="tree-node-number" x={sephirah.x} y={sephirah.y - 5}>
                    {sephirah.number}
                  </text>
                  <text className="tree-node-name" x={sephirah.x} y={sephirah.y + 12}>
                    {sephirah.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        <div className="tree-legend" aria-label="Legenda da Árvore">
          <span><i className="legend-dot severity"></i>Pilar da Severidade</span>
          <span><i className="legend-dot middle"></i>Pilar do Meio</span>
          <span><i className="legend-dot mercy"></i>Pilar da Misericórdia</span>
        </div>
      </div>
      {researchOpen && (
        <TreeResearch
          onClose={onCloseResearch}
          onOpenPath={(id) => {
            onCloseResearch();
            handleSelect(id);
          }}
        />
      )}
    </section>
  );
}
