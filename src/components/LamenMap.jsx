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

const FONT = { elements: 8, planets: 5.5, zodiac: 6.5, decanates: 4.2, angels: 3.2, archangels: 5, choirs: 5.5 };

// Pre-compute all segment geometry once
function buildGeometry() {
    let pid = 0;
    return ringStructure.map(ring => {
        const n = ring.segments.length;
        const slice = 360 / n;
        const thick = ring.outerRadius - ring.innerRadius;
        const isAngels = ring.ringId === 'angels';
        const useArc = !isAngels && n >= 9; // Only use textPath for dense rings that are NOT angels (angels use radial text)
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

            // Sub-label positions (angel layout)
            let subPos = null;
            let tpAngels = null;
            if (isAngels) {
                tpAngels = {
                    numPos: polar(0, 0, ring.innerRadius + 6, ma),     // 180
                    fullNamePos: polar(0, 0, ring.innerRadius + 40, ma), // 214
                    fullNameRot: ma + 90,                              // reads inwards radially
                    hebrewPos: polar(0, 0, ring.outerRadius - 24, ma),   // 248
                    lettersPos: polar(0, 0, ring.outerRadius - 10, ma),  // 262
                };
            } else if (seg.subLabel) {
                const sr = ring.innerRadius + thick * 0.78;
                const sp = polar(0, 0, sr, ma);
                subPos = { x: sp.x, y: sp.y, rot };
            }

            return { ...seg, d, tp, rot, pathId, arcD, isAngels, useArc, fs, subPos, tpAngels, flip };
        });

        return { ringId: ring.ringId, segs };
    });
}

export default function LamenMap({ onSegmentClick, activeSegmentId }) {
    const svgRef = useRef(null);
    const [rotation, setRotation] = useState(0);
    
    // ViewBox state for pan and targeted zoom
    const vbRef = useRef({ x: -370, y: -370, w: 740, h: 740 });
    const [vbState, setVbState] = useState(vbRef.current);
    const updateVb = useCallback((newVb) => {
        vbRef.current = newVb;
        setVbState(newVb);
    }, []);

    // Using refs for interactive values to avoid re-renders during drag
    const isDragging = useRef(false);
    const dragStart = useRef({ angle: 0, rot: 0 });
    const pinchStart = useRef({ dist: 0, w: 740, h: 740, sx: 0, sy: 0, pcx: 0, pcy: 0 });
    const hasDragged = useRef(false);
    const moveCount = useRef(0);

    const geometry = useMemo(buildGeometry, []);

    const getAngle = useCallback((x, y) => {
        const svg = svgRef.current;
        if (!svg) return 0;
        const r = svg.getBoundingClientRect();
        const vb = vbRef.current;
        // Find position of the wheel origin (0,0) on the screen
        const cx = r.left + (-vb.x / vb.w) * r.width;
        const cy = r.top + (-vb.y / vb.h) * r.height;
        return Math.atan2(y - cy, x - cx) * 180 / Math.PI;
    }, []);

    // Mouse handlers
    const onMouseDown = useCallback((e) => {
        isDragging.current = true;
        moveCount.current = 0;
        hasDragged.current = false;
        dragStart.current = { angle: getAngle(e.clientX, e.clientY), rot: rotation };
    }, [rotation, getAngle]);

    const onMouseMove = useCallback((e) => {
        if (!isDragging.current) return;
        moveCount.current++;
        const a = getAngle(e.clientX, e.clientY);
        const delta = a - dragStart.current.angle;
        if (Math.abs(delta) > 1) hasDragged.current = true;
        setRotation(dragStart.current.rot + delta);
    }, [getAngle]);

    const onMouseUp = useCallback(() => { isDragging.current = false; }, []);

    // Touch handlers (for drag + pinch zoom)
    const onTouchStart = useCallback((e) => {
        if (e.touches.length === 1) {
            isDragging.current = true;
            moveCount.current = 0;
            hasDragged.current = false;
            const t = e.touches[0];
            dragStart.current = { angle: getAngle(t.clientX, t.clientY), rot: rotation };
        } else if (e.touches.length === 2) {
            isDragging.current = false; // Disable single-finger drag on pinch
            const t1 = e.touches[0];
            const t2 = e.touches[1];
            const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
            
            const pcx = (t1.clientX + t2.clientX) / 2;
            const pcy = (t1.clientY + t2.clientY) / 2;
            
            const svg = svgRef.current;
            const r = svg.getBoundingClientRect();
            const vb = vbRef.current;
            
            const sx = vb.x + (pcx - r.left) / r.width * vb.w;
            const sy = vb.y + (pcy - r.top) / r.height * vb.h;

            pinchStart.current = { dist, w: vb.w, h: vb.h, sx, sy, pcx, pcy };
        }
    }, [rotation, getAngle]);

    const onTouchMoveHandler = useCallback((e) => {
        if (e.touches.length === 1 && isDragging.current) {
            const t = e.touches[0];
            const a = getAngle(t.clientX, t.clientY);
            const delta = a - dragStart.current.angle;
            if (Math.abs(delta) > 1) hasDragged.current = true;
            moveCount.current++;
            setRotation(dragStart.current.rot + delta);
            e.preventDefault(); // Prevent page scroll during drag
        } else if (e.touches.length === 2) {
            e.preventDefault();
            const t1 = e.touches[0];
            const t2 = e.touches[1];
            const newDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
            const { dist, w, h, sx, sy } = pinchStart.current;
            
            const newCx = (t1.clientX + t2.clientX) / 2;
            const newCy = (t1.clientY + t2.clientY) / 2;

            const zoomRatio = dist / newDist;
            let newW = w * zoomRatio;
            let newH = h * zoomRatio;

            const maxW = 740 / 0.5; // max zoom out (scale 0.5)
            const minW = 740 / 6;   // max zoom in (scale 6)

            if (newW > maxW) newW = maxW;
            if (newW < minW) newW = minW;
            if (newH > maxW) newH = maxW;
            if (newH < minW) newH = minW;

            const svg = svgRef.current;
            const r = svg.getBoundingClientRect();

            const newX = sx - (newCx - r.left) / r.width * newW;
            const newY = sy - (newCy - r.top) / r.height * newH;

            updateVb({ x: newX, y: newY, w: newW, h: newH });
        }
    }, [getAngle, updateVb]);

    const onTouchEnd = useCallback(() => { 
        isDragging.current = false; 
    }, []);

    // Wheel zoom (desktop) targeted at cursor
    const onWheelHandler = useCallback((e) => {
        e.preventDefault();
        const svg = svgRef.current;
        if (!svg) return;
        const r = svg.getBoundingClientRect();
        const vb = vbRef.current;
        
        const sx = vb.x + (e.clientX - r.left) / r.width * vb.w;
        const sy = vb.y + (e.clientY - r.top) / r.height * vb.h;

        const zoomFactor = e.deltaY > 0 ? 1.1 : 1/1.1;
        let newW = vb.w * zoomFactor;
        let newH = vb.h * zoomFactor;

        const maxW = 740 / 0.8; 
        const minW = 740 / 6;

        if (newW > maxW) newW = maxW;
        if (newW < minW) newW = minW;
        if (newH > maxW) newH = maxW;
        if (newH < minW) newH = minW;

        const newX = sx - (e.clientX - r.left) / r.width * newW;
        const newY = sy - (e.clientY - r.top) / r.height * newH;

        updateVb({ x: newX, y: newY, w: newW, h: newH });
    }, [updateVb]);

    // Background handler (Reset zoom/pan to center)
    const onBgClick = useCallback((e) => {
        if (e.target === svgRef.current || e.target.id === 'lamen-bg') {
            updateVb({ x: -370, y: -370, w: 740, h: 740 });
        }
    }, [updateVb]);

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
        if (!hasDragged.current && moveCount.current < 5) onSegmentClick(id);
    }, [onSegmentClick]);

    return (
        <svg
            ref={svgRef}
            id="lamen-svg"
            className="lamen-svg"
            viewBox={`${vbState.x} ${vbState.y} ${vbState.w} ${vbState.h}`}
            xmlns="http://www.w3.org/2000/svg"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onClick={onBgClick}
            style={{ touchAction: 'none' }}
        >
            <defs>
                <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Background for clicking outside segments */}
            <rect 
                id="lamen-bg" 
                x={vbState.x} y={vbState.y} width={vbState.w} height={vbState.h} 
                fill="transparent" 
                style={{ pointerEvents: 'all' }}
            />

            <g transform={`rotate(${rotation})`} className="wheel-group">
                {geometry.map(({ ringId, segs }) => (
                    <g key={ringId} className="ring-group">
                        {segs.map((s, idx) => (
                            <g 
                                key={s.id + idx} 
                                onClick={(e) => { e.stopPropagation(); handleSegClick(s.id); }} 
                                style={{ cursor: 'pointer' }}
                                className="seg-group"
                            >
                                <path 
                                    d={s.d} 
                                    fill={s.color || '#333'} 
                                    className={`segment-path ${activeSegmentId === s.id ? 'active' : ''}`} 
                                />

                                {s.isAngels ? (
                                    <g className="angel-text-group">
                                        <text 
                                            x={s.tpAngels.numPos.x} y={s.tpAngels.numPos.y}
                                            transform={`rotate(${s.rot},${s.tpAngels.numPos.x},${s.tpAngels.numPos.y})`}
                                            className="segment-text angel-num" 
                                            fontSize={s.fs * 0.9}
                                        >
                                            {s.num}
                                        </text>
                                        <text 
                                            x={s.tpAngels.fullNamePos.x} y={s.tpAngels.fullNamePos.y}
                                            transform={`rotate(${s.tpAngels.fullNameRot},${s.tpAngels.fullNamePos.x},${s.tpAngels.fullNamePos.y})`}
                                            className="segment-text angel-fullname" 
                                            fontSize={s.fs * 1.05}
                                        >
                                            {s.subLabel}
                                        </text>
                                        <text 
                                            x={s.tpAngels.hebrewPos.x} y={s.tpAngels.hebrewPos.y}
                                            transform={`rotate(${s.rot},${s.tpAngels.hebrewPos.x},${s.tpAngels.hebrewPos.y})`}
                                            className="segment-text angel-hebrew" 
                                            fontSize={s.fs * 1.15}
                                        >
                                            {s.hebrew}
                                        </text>
                                        <text 
                                            x={s.tpAngels.lettersPos.x} y={s.tpAngels.lettersPos.y}
                                            transform={`rotate(${s.rot},${s.tpAngels.lettersPos.x},${s.tpAngels.lettersPos.y})`}
                                            className="segment-text angel-letters" 
                                            fontSize={s.fs * 0.9}
                                        >
                                            {s.letters}
                                        </text>
                                    </g>
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
                                    <text 
                                        x={s.tp.x} y={s.tp.y}
                                        transform={`rotate(${s.rot},${s.tp.x},${s.tp.y})`}
                                        className="segment-text" 
                                        fontSize={s.fs}
                                    >
                                        {s.label}
                                    </text>
                                )}

                                {s.subPos && (
                                    <text 
                                        x={s.subPos.x} y={s.subPos.y}
                                        transform={`rotate(${s.subPos.rot},${s.subPos.x},${s.subPos.y})`}
                                        className="segment-text sub-label" 
                                        fontSize={s.isAngels ? s.fs * 0.9 : s.fs * 0.62}
                                    >
                                        {s.subLabel}
                                    </text>
                                )}
                            </g>
                        ))}
                    </g>
                ))}
                
                <circle cx={0} cy={0} r={5} fill="#d4af37" filter="url(#glow-effect)" />
                <circle cx={0} cy={0} r={2} fill="#fff" />
            </g>
        </svg>
    );
}
