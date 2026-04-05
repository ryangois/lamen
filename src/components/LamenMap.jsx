import React from 'react';
import { ringStructure } from '../data/rings';
import './LamenMap.css';

// Math utility to convert polar angles to cartesian coordinates for SVG paths
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

// Generate the 'd' attribute for SVG path donut or wedge slices
function describeArc(x, y, innerRadius, outerRadius, startAngle, endAngle) {
    const startOuter = polarToCartesian(x, y, outerRadius, endAngle);
    const endOuter = polarToCartesian(x, y, outerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    if (innerRadius === 0) {
        return [
            "M", startOuter.x, startOuter.y,
            "A", outerRadius, outerRadius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
            "L", x, y,
            "Z"
        ].join(" ");
    }

    const startInner = polarToCartesian(x, y, innerRadius, endAngle);
    const endInner = polarToCartesian(x, y, innerRadius, startAngle);

    return [
        "M", startOuter.x, startOuter.y,
        "A", outerRadius, outerRadius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
        "L", endInner.x, endInner.y,
        "A", innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
        "Z"
    ].join(" ");
}

export default function LamenMap({ onSegmentClick, activeSegmentId }) {
    // Center of our SVG viewBox
    const cx = 0;
    const cy = 0;

    return (
        <svg
            className="lamen-svg animate-fade-in spin-slow"
            viewBox="-350 -350 700 700"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {ringStructure.map((ring, ringIdx) => {
                const sliceAngle = 360 / ring.segments.length;

                return (
                    <g key={`ring-${ring.ringId}-${ringIdx}`} className="ring-group">
                        {ring.segments.map((segment, segIdx) => {
                            const startAngle = segIdx * sliceAngle;
                            const endAngle = (segIdx + 1) * sliceAngle;

                            const d = describeArc(cx, cy, ring.innerRadius, ring.outerRadius, startAngle, endAngle);

                            // Calculate text positioning in the middle of the slice
                            const midAngle = startAngle + (sliceAngle / 2);
                            const midRadius = ring.innerRadius === 0
                                ? ring.outerRadius * 0.6
                                : ring.innerRadius + (ring.outerRadius - ring.innerRadius) / 2;

                            const textPos = polarToCartesian(cx, cy, midRadius, midAngle);

                            // We rotate the text based on its angle so it reads radially.
                            // If it's on bottom half, we might flip it to keep it readable, but for now radial is okay.
                            // A slight adjustment so it aligns well:
                            let textRotation = midAngle;
                            if (midAngle > 90 && midAngle < 270) {
                                // optionally flip: textRotation += 180;
                            }

                            const isActive = activeSegmentId === segment.id;

                            return (
                                <g key={`seg-${segment.id}`} onClick={() => onSegmentClick(segment.id)}>
                                    <path
                                        d={d}
                                        fill={segment.color || 'rgba(0,0,0,0.5)'}
                                        className={`segment-path ${isActive ? 'active' : ''}`}
                                    />
                                    <text
                                        x={textPos.x}
                                        y={textPos.y}
                                        transform={`rotate(${textRotation}, ${textPos.x}, ${textPos.y})`}
                                        className="segment-text"
                                    >
                                        {segment.label}
                                    </text>
                                </g>
                            );
                        })}
                    </g>
                );
            })}

            {/* Center glowing dot or aesthetic emblem */}
            <circle cx={cx} cy={cy} r={3} fill="#fff" filter="url(#glow-effect)" />
        </svg>
    );
}
