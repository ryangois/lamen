import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { ringStructure } from '../data/rings';
import './LamenMap.css';

function polar(cx, cy, r, deg) {
    const rad = (deg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx, cy, ri, ro, s, e) {
    const s1 = polar(cx, cy, ro, s), e1 = polar(cx, cy, ro, e);
    const lg = e - s > 180 ? 1 : 0;
    if (ri === 0) return `M ${s1.x} ${s1.y} A ${ro} ${ro} 0 ${lg} 1 ${e1.x} ${e1.y} L ${cx} ${cy} Z`;
    const s2 = polar(cx, cy, ri, s), e2 = polar(cx, cy, ri, e);
    return `M ${s1.x} ${s1.y} A ${ro} ${ro} 0 ${lg} 1 ${e1.x} ${e1.y} L ${e2.x} ${e2.y} A ${ri} ${ri} 0 ${lg} 0 ${s2.x} ${s2.y} Z`;
}

const FONT = { elements: 8, planets: 5.5, zodiac: 6.5, decanates: 4, angels: 3.2, archangels: 4.8, choirs: 5.2 };

// Pre-compute all segment geometry once
function buildGeometry() {
    let pid = 0;
    return ringStructure.map(ring => {
        const n = ring.segments.length;
        const slice = 360 / n;
        const thick = ring.outerRadius - ring.innerRadius;
        const isAngels = ring.ringId === 'angels';
        const useArc = !isAngels && n >= 9;
        const fs = FONT[ring.ringId] || 5;

        const segs = ring.segments.map((seg, idx) => {
            const sa = idx * slice, ea = sa + slice, ma = sa + slice / 2;
            const mr = ring.innerRadius === 0 ? ring.outerRadius * 0.55 : ring.innerRadius + thick / 2;
            const d = arcPath(0, 0, ring.innerRadius, ring.outerRadius, sa, ea);
            const tp = polar(0, 0, mr, ma);
            const flip = ma > 90 && ma < 270;
            const rot = flip ? ma + 180 : ma;
            const pathId = `tp${++pid}`;

            let arcD = null;
            if (useArc) {
                const as_ = polar(0, 0, mr, sa + 0.5);
                const ae_ = polar(0, 0, mr, ea - 0.5);
                arcD = `M ${as_.x} ${as_.y} A ${mr} ${mr} 0 ${slice > 180 ? 1 : 0} 1 ${ae_.x} ${ae_.y}`;
            }

            // Sub-label position (angel full name)
            let subPos = null;
            if (isAngels && seg.subLabel) {
                const sr = ring.innerRadius + thick * 0.78;
                const sp = polar(0, 0, sr, ma);
                subPos = { x: sp.x, y: sp.y, rot: flip ? ma + 180 : ma };
            }

            return { ...seg, d, tp, rot, pathId, arcD, isAngels, useArc, fs, subPos, flip };
        });

        return { ringId: ring.ringId, segs };
    });
}

export default function LamenMap({ onSegmentClick, activeSegmentId }) {
    const svgRef = useRef(null);
    const [rotation, setRotation] = useState(0);
    const [scale, setScale] = useState(1);
    const isDragging = useRef(false);
    const dragStart = useRef({ angle: 0, rot: 0 });
    const pinchStart = useRef({ dist: 0, scale: 1 });
    const moveCount = useRef(0);

    const geometry = useMemo(buildGeometry, []);

    const getAngle = useCallback((x, y) => {
        const svg = svgRef.current;
        if (!svg) return 0;
        const r = svg.getBoundingClientRect();
        return Math.atan2(y - r.top - r.height / 2, x - r.left - r.width / 2) * 180 / Math.PI;
    }, []);

    // Mouse handlers
    const onMouseDown = useCallback((e) => {
        isDragging.current = true;
        moveCount.current = 0;
        dragStart.current = { angle: getAngle(e.clientX, e.clientY), rot: rotation };
    }, [rotation, getAngle]);

    const onMouseMove = useCallback((e) => {
        if (!isDragging.current) return;
        moveCount.current++;
        const a = getAngle(e.clientX, e.clientY);
        setRotation(dragStart.current.rot + (a - dragStart.current.angle));
    }, [getAngle]);

    const onMouseUp = useCallback(() => { isDragging.current = false; }, []);

    // Touch handlers (for drag + pinch zoom)
    const onTouchStart = useCallback((e) => {
        if (e.touches.length === 1) {
            isDragging.current = true;
            moveCount.current = 0;
            const t = e.touches[0];
            dragStart.current = { angle: getAngle(t.clientX, t.clientY), rot: rotation };
        } else if (e.touches.length === 2) {
            isDragging.current = false;
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            pinchStart.current = { dist: Math.hypot(dx, dy), scale };
        }
    }, [rotation, scale, getAngle]);

    const onTouchMoveHandler = useCallback((e) => {
        e.preventDefault();
        if (e.touches.length === 1 && isDragging.current) {
            const t = e.touches[0];
            const a = getAngle(t.clientX, t.clientY);
            moveCount.current++;
            setRotation(dragStart.current.rot + (a - dragStart.current.angle));
        } else if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const dist = Math.hypot(dx, dy);
            const ns = Math.max(0.5, Math.min(5, pinchStart.current.scale * (dist / pinchStart.current.dist)));
            setScale(ns);
        }
    }, [getAngle]);

    const onTouchEnd = useCallback(() => { isDragging.current = false; }, []);

    // Wheel zoom (desktop)
    const onWheelHandler = useCallback((e) => {
        e.preventDefault();
        setScale(s => Math.max(0.5, Math.min(5, s - e.deltaY * 0.002)));
    }, []);

    // Double click/tap → reset zoom
    const onDoubleClick = useCallback(() => setScale(1), []);

    // Attach non-passive listeners
    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;
        svg.addEventListener('wheel', onWheelHandler, { passive: false });
        svg.addEventListener('touchmove', onTouchMoveHandler, { passive: false });
        return () => {
            svg.removeEventListener('wheel', onWheelHandler);
            svg.removeEventListener('touchmove', onTouchMoveHandler);
        };
    }, [onWheelHandler, onTouchMoveHandler]);

    const handleSegClick = useCallback((id) => {
        if (moveCount.current < 3) onSegmentClick(id);
    }, [onSegmentClick]);

    const vb = 370 / scale;

    return (
        <svg
            ref={svgRef}
            className="lamen-svg"
            viewBox={`${-vb} ${-vb} ${vb * 2} ${vb * 2}`}
            xmlns="http://www.w3.org/2000/svg"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onDoubleClick={onDoubleClick}
            style={{ touchAction: 'none' }}
        >
            <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feComposite in="SourceGraphic" in2="b" operator="over" />
                </filter>
            </defs>

            <g transform={`rotate(${rotation})`} className="wheel-group">
                {geometry.map(({ ringId, segs }) => (
                    <g key={ringId}>
                        {segs.map((s, idx) => (
                            <g key={s.id + idx} onClick={() => handleSegClick(s.id)} className="seg-group">
                                <path d={s.d} fill={s.color || '#333'}
                                    className={`segment-path ${activeSegmentId === s.id ? 'active' : ''}`} />

                                {s.isAngels ? (
                                    /* Angel names: radial / vertical text */
                                    <text x={s.tp.x} y={s.tp.y}
                                        transform={`rotate(${s.rot},${s.tp.x},${s.tp.y})`}
                                        className="segment-text angel-text" fontSize={s.fs}>
                                        {s.label}
                                    </text>
                                ) : s.useArc ? (
                                    <>
                                        <path id={s.pathId} d={s.arcD} fill="none" stroke="none" />
                                        <text className="segment-text" fontSize={s.fs}>
                                            <textPath href={`#${s.pathId}`} startOffset="50%" textAnchor="middle">
                                                {s.label}
                                            </textPath>
                                        </text>
                                    </>
                                ) : (
                                    <text x={s.tp.x} y={s.tp.y}
                                        transform={`rotate(${s.rot},${s.tp.x},${s.tp.y})`}
                                        className="segment-text" fontSize={s.fs}>
                                        {s.label}
                                    </text>
                                )}

                                {s.subPos && (
                                    <text x={s.subPos.x} y={s.subPos.y}
                                        transform={`rotate(${s.subPos.rot},${s.subPos.x},${s.subPos.y})`}
                                        className="segment-text sub-label" fontSize={s.fs * 0.6}>
                                        {s.subLabel}
                                    </text>
                                )}
                            </g>
                        ))}
                    </g>
                ))}
                <circle cx={0} cy={0} r={4} fill="#d4af37" filter="url(#glow)" />
                <circle cx={0} cy={0} r={2} fill="#fff" />
            </g>
        </svg>
    );
}
