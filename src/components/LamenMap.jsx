import React from 'react';
import { ringStructure } from '../data/rings';
import './LamenMap.css';

function polar(cx, cy, r, deg) {
    const rad = (deg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arc(cx, cy, ri, ro, s, e) {
    const s1 = polar(cx, cy, ro, s), e1 = polar(cx, cy, ro, e);
    const lg = e - s > 180 ? 1 : 0;
    if (ri === 0) return `M ${s1.x} ${s1.y} A ${ro} ${ro} 0 ${lg} 1 ${e1.x} ${e1.y} L ${cx} ${cy} Z`;
    const s2 = polar(cx, cy, ri, s), e2 = polar(cx, cy, ri, e);
    return `M ${s1.x} ${s1.y} A ${ro} ${ro} 0 ${lg} 1 ${e1.x} ${e1.y} L ${e2.x} ${e2.y} A ${ri} ${ri} 0 ${lg} 0 ${s2.x} ${s2.y} Z`;
}

// Font sizes per ring
const FONT = { elements:8, planets:5.5, zodiac:6.5, decanates:4.2, angels:3.5, archangels:5, choirs:5.5 };

let _pid = 0;

export default function LamenMap({ onSegmentClick, activeSegmentId }) {
    _pid = 0;
    const cx = 0, cy = 0;

    return (
        <svg className="lamen-svg animate-fade-in spin-slow" viewBox="-370 -370 740 740" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="b" /><feComposite in="SourceGraphic" in2="b" operator="over" />
                </filter>
                <filter id="glow2" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" result="b" /><feComposite in="SourceGraphic" in2="b" operator="over" />
                </filter>
            </defs>

            {ringStructure.map((ring) => {
                const n = ring.segments.length;
                const slice = 360 / n;
                const thick = ring.outerRadius - ring.innerRadius;
                const fs = FONT[ring.ringId] || 5;
                const useArc = n >= 9; // use curved text for dense rings

                return (
                    <g key={ring.ringId} className="ring-group">
                        {ring.segments.map((seg, idx) => {
                            const sa = idx * slice, ea = sa + slice;
                            const ma = sa + slice / 2;
                            const mr = ring.innerRadius === 0 ? ring.outerRadius * 0.55 : ring.innerRadius + thick / 2;
                            const d = arc(cx, cy, ring.innerRadius, ring.outerRadius, sa, ea);
                            const isActive = activeSegmentId === seg.id;
                            const pid = `p${++_pid}`;

                            // Arc path for curved text
                            const as_ = polar(cx, cy, mr, sa + 0.5);
                            const ae_ = polar(cx, cy, mr, ea - 0.5);
                            const arcD = `M ${as_.x} ${as_.y} A ${mr} ${mr} 0 ${slice > 180 ? 1 : 0} 1 ${ae_.x} ${ae_.y}`;

                            // Radial text position
                            const tp = polar(cx, cy, mr, ma);
                            const flip = ma > 90 && ma < 270;
                            const rot = flip ? ma + 180 : ma;

                            return (
                                <g key={seg.id + idx} onClick={() => onSegmentClick(seg.id)} style={{cursor:'pointer'}}>
                                    <path d={d} fill={seg.color || '#333'} className={`segment-path ${isActive ? 'active' : ''}`} />

                                    {useArc ? (
                                        <>
                                            <path id={pid} d={arcD} fill="none" stroke="none" />
                                            <text className="segment-text" fontSize={fs}>
                                                <textPath href={`#${pid}`} startOffset="50%" textAnchor="middle">{seg.label}</textPath>
                                            </text>
                                            {/* Sub-label for angels (full name) */}
                                            {seg.subLabel && (() => {
                                                const sr = ring.innerRadius + thick * 0.75;
                                                const sid = `s${_pid}`;
                                                const ss = polar(cx, cy, sr, sa + 0.5);
                                                const se = polar(cx, cy, sr, ea - 0.5);
                                                const sd = `M ${ss.x} ${ss.y} A ${sr} ${sr} 0 0 1 ${se.x} ${se.y}`;
                                                return (<>
                                                    <path id={sid} d={sd} fill="none" stroke="none" />
                                                    <text className="segment-text sub-label" fontSize={fs * 0.7}>
                                                        <textPath href={`#${sid}`} startOffset="50%" textAnchor="middle">{seg.subLabel}</textPath>
                                                    </text>
                                                </>);
                                            })()}
                                        </>
                                    ) : (
                                        <text x={tp.x} y={tp.y} transform={`rotate(${rot},${tp.x},${tp.y})`} className="segment-text" fontSize={fs}>
                                            {seg.label}
                                        </text>
                                    )}
                                </g>
                            );
                        })}
                    </g>
                );
            })}

            <circle cx={cx} cy={cy} r={4} fill="#d4af37" filter="url(#glow2)" />
            <circle cx={cx} cy={cy} r={2} fill="#fff" />
        </svg>
    );
}
