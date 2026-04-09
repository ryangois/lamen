import React from 'react';
import { ringStructure } from '../data/rings';
import './LamenMap.css';

function polarToCartesian(cx, cy, r, angleDeg) {
    const rad = (angleDeg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx, cy, ri, ro, startAngle, endAngle) {
    const s1 = polarToCartesian(cx, cy, ro, startAngle);
    const e1 = polarToCartesian(cx, cy, ro, endAngle);
    const large = endAngle - startAngle > 180 ? 1 : 0;

    if (ri === 0) {
        return `M ${s1.x} ${s1.y} A ${ro} ${ro} 0 ${large} 1 ${e1.x} ${e1.y} L ${cx} ${cy} Z`;
    }

    const s2 = polarToCartesian(cx, cy, ri, startAngle);
    const e2 = polarToCartesian(cx, cy, ri, endAngle);
    return `M ${s1.x} ${s1.y} A ${ro} ${ro} 0 ${large} 1 ${e1.x} ${e1.y} L ${e2.x} ${e2.y} A ${ri} ${ri} 0 ${large} 0 ${s2.x} ${s2.y} Z`;
}

// Unique path id used for textPath curved labels
let _pathCounter = 0;
function nextId() { return `tp-${++_pathCounter}`; }

export default function LamenMap({ onSegmentClick, activeSegmentId }) {
    const cx = 0, cy = 0;

    // Reset counter each render so IDs stay stable
    _pathCounter = 0;

    return (
        <svg
            className="lamen-svg animate-fade-in spin-slow"
            viewBox="-370 -370 740 740"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-strong" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {ringStructure.map((ring, ringIdx) => {
                const total = ring.segments.length;
                const slice = 360 / total;
                const ringThickness = ring.outerRadius - ring.innerRadius;
                const isAngelsRing = ring.ringId === 'angels';
                const isChorirRing = ring.ringId === 'choirs';

                return (
                    <g key={`ring-${ring.ringId}`} className="ring-group">
                        {ring.segments.map((seg, idx) => {
                            const startAngle = idx * slice;
                            const endAngle = startAngle + slice;
                            const midAngle = startAngle + slice / 2;
                            const midR = ring.innerRadius === 0
                                ? ring.outerRadius * 0.55
                                : ring.innerRadius + ringThickness / 2;

                            const d = describeArc(cx, cy, ring.innerRadius, ring.outerRadius, startAngle, endAngle);
                            const isActive = activeSegmentId === seg.id;

                            // For curved text (angels & choirs outer arcs)
                            const useArcText = isAngelsRing || isChorirRing;
                            const arcTextId = useArcText ? nextId() : null;
                            const arcR = midR;
                            const arcStart = polarToCartesian(cx, cy, arcR, startAngle + 1);
                            const arcEnd = polarToCartesian(cx, cy, arcR, endAngle - 1);
                            const arcLarge = slice > 180 ? 1 : 0;
                            const arcPath = `M ${arcStart.x} ${arcStart.y} A ${arcR} ${arcR} 0 ${arcLarge} 1 ${arcEnd.x} ${arcEnd.y}`;

                            // For straight radial text (inner rings)
                            const textPos = polarToCartesian(cx, cy, midR, midAngle);
                            const flip = midAngle > 90 && midAngle < 270;
                            const textRot = flip ? midAngle + 180 : midAngle;

                            // Font sizes
                            const fontSize = isAngelsRing ? 4.8 : isChorirRing ? 5.5 : ring.ringId === 'zodiac' ? 7 : 5.5;

                            return (
                                <g key={`seg-${seg.id}-${idx}`} onClick={() => onSegmentClick(seg.id)} style={{ cursor: 'pointer' }}>
                                    <path
                                        d={d}
                                        fill={seg.color || '#333'}
                                        className={`segment-path ${isActive ? 'active' : ''}`}
                                    />

                                    {useArcText ? (
                                        <>
                                            <defs>
                                                <path id={arcTextId} d={arcPath} />
                                            </defs>
                                            <text className="segment-text" fontSize={fontSize}>
                                                <textPath href={`#${arcTextId}`} startOffset="50%" textAnchor="middle">
                                                    {seg.label}
                                                </textPath>
                                            </text>
                                            {/* Hebrew sub-label for angels ring */}
                                            {isAngelsRing && seg.subLabel && (() => {
                                                const hebR = ring.innerRadius + ringThickness * 0.72;
                                                const hebId = `heb-${arcTextId}`;
                                                const hs = polarToCartesian(cx, cy, hebR, startAngle + 1);
                                                const he = polarToCartesian(cx, cy, hebR, endAngle - 1);
                                                const hp = `M ${hs.x} ${hs.y} A ${hebR} ${hebR} 0 ${arcLarge} 1 ${he.x} ${he.y}`;
                                                return (
                                                    <>
                                                        <defs><path id={hebId} d={hp} /></defs>
                                                        <text className="segment-text heb-text" fontSize={4}>
                                                            <textPath href={`#${hebId}`} startOffset="50%" textAnchor="middle">
                                                                {seg.subLabel}
                                                            </textPath>
                                                        </text>
                                                    </>
                                                );
                                            })()}
                                        </>
                                    ) : (
                                        <text
                                            x={textPos.x}
                                            y={textPos.y}
                                            transform={`rotate(${textRot}, ${textPos.x}, ${textPos.y})`}
                                            className="segment-text"
                                            fontSize={fontSize}
                                        >
                                            {seg.label}
                                        </text>
                                    )}
                                </g>
                            );
                        })}
                    </g>
                );
            })}

            {/* Center star / emblem */}
            <circle cx={cx} cy={cy} r={4} fill="#d4af37" filter="url(#glow-strong)" />
            <circle cx={cx} cy={cy} r={2} fill="#fff" />
        </svg>
    );
}
