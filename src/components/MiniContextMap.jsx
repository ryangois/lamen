import { ringStructure } from '../data/rings';
import { treePaths, treeSephiroth, treeSpecialNodes } from '../data/treeOfLife';
import './MiniContextMap.css';

const ringLabels = {
    elements: 'Elementos',
    planets: 'Planetas',
    zodiac: 'Signos',
    decanates: 'Decanatos',
    angels: '72 anjos',
    archangels: 'Sephiroth',
    choirs: 'Coros',
};

function TreeMiniMap({ activeId, title }) {
    const nodes = [...treeSephiroth, ...treeSpecialNodes];
    const activePath = treePaths.find((path) => path.id === activeId);

    return (
        <figure className="mini-context-map tree-mini-map">
            <figcaption>
                <span>Posição na Árvore</span>
                <strong>{title}</strong>
            </figcaption>
            <svg viewBox="65 20 290 610" role="img" aria-label={`Posição de ${title} na Árvore da Vida`}>
                {treePaths.map((path) => (
                    <line
                        className={path.id === activeId ? 'active' : ''}
                        x1={path.x1}
                        y1={path.y1}
                        x2={path.x2}
                        y2={path.y2}
                        key={path.id}
                    />
                ))}
                {nodes.map((node) => (
                    <circle
                        className={`${node.id === activeId ? 'active' : ''} ${node.nonSphere ? 'hidden-node' : ''}`}
                        cx={node.x}
                        cy={node.y}
                        r={node.id === activeId ? 17 : 10}
                        style={{ '--node-color': node.color }}
                        key={node.id}
                    />
                ))}
                {activePath && (
                    <circle className="path-marker" cx={activePath.labelX} cy={activePath.labelY} r="9" />
                )}
            </svg>
        </figure>
    );
}

function RingMiniMap({ activeId, title }) {
    const ringIndex = ringStructure.findIndex((ring) => (
        ring.segments.some((segment) => segment.id === activeId)
    ));
    if (ringIndex < 0) return null;

    const ring = ringStructure[ringIndex];
    const segmentIndex = ring.segments.findIndex((segment) => segment.id === activeId);
    const segment = ring.segments[segmentIndex];
    const angle = ((segmentIndex + 0.5) / ring.segments.length) * Math.PI * 2 - Math.PI / 2;
    const radius = 18 + ringIndex * 8;
    const markerX = 70 + Math.cos(angle) * radius;
    const markerY = 70 + Math.sin(angle) * radius;

    return (
        <figure className="mini-context-map ring-mini-map">
            <figcaption>
                <span>Posição no lâmen · {ringLabels[ring.ringId]}</span>
                <strong>{segmentIndex + 1} de {ring.segments.length}</strong>
            </figcaption>
            <svg viewBox="0 0 140 140" role="img" aria-label={`Posição de ${title} no lâmen`}>
                {ringStructure.map((item, index) => (
                    <circle
                        className={index === ringIndex ? 'active-ring' : ''}
                        cx="70"
                        cy="70"
                        r={18 + index * 8}
                        key={item.ringId}
                    />
                ))}
                <line x1="70" y1="70" x2={markerX} y2={markerY} />
                <circle
                    className="ring-marker"
                    cx={markerX}
                    cy={markerY}
                    r="6"
                    style={{ '--marker-color': segment.color || '#d4af37' }}
                />
                <circle className="ring-center" cx="70" cy="70" r="3" />
            </svg>
        </figure>
    );
}

export default function MiniContextMap({ activeId, title }) {
    const isTreeEntry = activeId.startsWith('path_') || activeId.startsWith('arc_');
    return isTreeEntry
        ? <TreeMiniMap activeId={activeId} title={title} />
        : <RingMiniMap activeId={activeId} title={title} />;
}
