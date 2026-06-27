import { useCallback, useEffect, useMemo, useRef } from 'react';
import { ringStructure } from '../data/rings';
import './LamenMap.css';

const BASE_VIEW = { x: -370, y: -370, w: 740, h: 740 };
const FONT_SIZE = {
  elements: 8,
  planets: 5.5,
  zodiac: 6.5,
  decanates: 4.2,
  angels: 3.2,
  archangels: 5,
  choirs: 5.5,
};
const TAU = Math.PI * 2;

function normalizeAngle(angle) {
  return ((angle % 360) + 360) % 360;
}

function radians(degrees) {
  return (degrees - 90) * Math.PI / 180;
}

function pointAt(radius, degrees) {
  const angle = radians(degrees);
  return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
}

function makeGeometry() {
  return ringStructure.map((ring) => {
    const slice = 360 / ring.segments.length;
    return {
      ...ring,
      slice,
      segments: ring.segments.map((segment, index) => ({
        ...segment,
        start: index * slice,
        end: (index + 1) * slice,
        middle: index * slice + slice / 2,
      })),
    };
  });
}

function traceSegment(ctx, ring, segment) {
  ctx.beginPath();
  ctx.arc(0, 0, ring.outerRadius, radians(segment.start), radians(segment.end));
  if (ring.innerRadius > 0) {
    ctx.arc(0, 0, ring.innerRadius, radians(segment.end), radians(segment.start), true);
  } else {
    ctx.lineTo(0, 0);
  }
  ctx.closePath();
}

function fitFont(ctx, text, maxWidth, initialSize, weight = 600) {
  let size = initialSize;
  ctx.font = `${weight} ${size}px Cinzel, serif`;
  while (size > 2.4 && ctx.measureText(text).width > maxWidth) {
    size -= 0.25;
    ctx.font = `${weight} ${size}px Cinzel, serif`;
  }
}

function drawCenteredText(ctx, text, x, y, rotation, size, maxWidth, weight = 600) {
  if (!text) return;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation * Math.PI / 180);
  fitFont(ctx, text, maxWidth, size, weight);
  ctx.fillText(text, 0, 0);
  ctx.restore();
}

function drawArcText(ctx, text, radius, start, end, size) {
  if (!text) return;
  fitFont(ctx, text, radius * (end - start) * Math.PI / 180 * 0.92, size);
  const chars = [...text];
  const widths = chars.map((char) => ctx.measureText(char).width);
  const totalAngle = widths.reduce((sum, width) => sum + width / radius, 0);
  let angle = ((start + end) / 2) * Math.PI / 180 - totalAngle / 2;

  chars.forEach((char, index) => {
    const charAngle = widths[index] / radius;
    angle += charAngle / 2;
    const position = pointAt(radius, angle * 180 / Math.PI);
    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.rotate(angle);
    ctx.fillText(char, 0, 0);
    ctx.restore();
    angle += charAngle / 2;
  });
}

export default function LamenMap({ onSegmentClick, activeSegmentId }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const sizeRef = useRef({ width: 1, height: 1, dpr: 1 });
  const viewportRef = useRef({ ...BASE_VIEW });
  const rotationRef = useRef(0);
  const pointersRef = useRef(new Map());
  const gestureRef = useRef(null);
  const draggedRef = useRef(false);
  const lowDetailRef = useRef(false);
  const hoveredRef = useRef(null);
  const imagesRef = useRef(new Map());
  const activeIdRef = useRef(activeSegmentId);
  const geometry = useMemo(() => makeGeometry(), []);

  useEffect(() => {
    activeIdRef.current = activeSegmentId;
  }, [activeSegmentId]);

  const getTransform = useCallback(() => {
    const { width, height } = sizeRef.current;
    const view = viewportRef.current;
    const scale = Math.min(width / view.w, height / view.h);
    return {
      scale,
      x: (width - view.w * scale) / 2 - view.x * scale,
      y: (height - view.h * scale) / 2 - view.y * scale,
    };
  }, []);

  const clientToWorld = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const transform = getTransform();
    return {
      x: (clientX - rect.left - transform.x) / transform.scale,
      y: (clientY - rect.top - transform.y) / transform.scale,
    };
  }, [getTransform]);

  const getScreenAngle = useCallback((clientX, clientY) => {
    const world = clientToWorld(clientX, clientY);
    return Math.atan2(world.y, world.x) * 180 / Math.PI;
  }, [clientToWorld]);

  const hitTest = useCallback((clientX, clientY) => {
    const point = clientToWorld(clientX, clientY);
    const radius = Math.hypot(point.x, point.y);
    const screenAngle = normalizeAngle(Math.atan2(point.y, point.x) * 180 / Math.PI + 90);
    const angle = normalizeAngle(screenAngle - rotationRef.current);
    const ring = geometry.find(
      (candidate) => radius >= candidate.innerRadius && radius <= candidate.outerRadius,
    );
    if (!ring) return null;
    return ring.segments[Math.min(ring.segments.length - 1, Math.floor(angle / ring.slice))] || null;
  }, [clientToWorld, geometry]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height, dpr } = sizeRef.current;
    const transform = getTransform();
    const lowDetail = lowDetailRef.current;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(transform.x, transform.y);
    ctx.scale(transform.scale, transform.scale);
    ctx.rotate(rotationRef.current * Math.PI / 180);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';

    geometry.forEach((ring) => {
      ring.segments.forEach((segment) => {
        const active = activeIdRef.current === segment.id;
        const hovered = hoveredRef.current === segment.id && !lowDetail;
        traceSegment(ctx, ring, segment);
        ctx.fillStyle = segment.color || '#333';
        ctx.fill();
        ctx.lineWidth = active ? 2 : hovered ? 1.25 : 0.35;
        ctx.strokeStyle = active ? '#fff' : hovered ? '#d4af37' : 'rgba(0, 0, 0, 0.55)';
        if (active || hovered) {
          ctx.save();
          ctx.shadowColor = active ? 'rgba(255,255,255,.65)' : 'rgba(212,175,55,.7)';
          ctx.shadowBlur = active ? 8 : 5;
          ctx.stroke();
          ctx.restore();
        } else {
          ctx.stroke();
        }
      });
    });

    ctx.fillStyle = '#fff';
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.lineWidth = 0.45;

    geometry.forEach((ring) => {
      if (lowDetail && (ring.ringId === 'angels' || ring.ringId === 'decanates')) return;
      const thickness = ring.outerRadius - ring.innerRadius;
      const middleRadius = ring.innerRadius === 0
        ? ring.outerRadius * 0.55
        : ring.innerRadius + thickness / 2;
      const size = FONT_SIZE[ring.ringId] || 5;

      ring.segments.forEach((segment) => {
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,.9)';
        ctx.shadowBlur = 1.2;
        ctx.fillStyle = segment.textColor || '#fff';

        if (ring.ringId === 'zodiac' && segment.image) {
          const image = imagesRef.current.get(segment.image);
          if (image?.complete && image.naturalWidth) {
            const position = pointAt(middleRadius, segment.middle);
            const dimension = 28 * (segment.scale || 1);
            ctx.save();
            ctx.translate(position.x, position.y);
            ctx.rotate(segment.middle * Math.PI / 180);
            ctx.filter = 'invert(1) brightness(2)';
            ctx.drawImage(image, -dimension / 2, -dimension / 2, dimension, dimension);
            ctx.restore();
          }
        } else if (ring.ringId === 'angels') {
          const num = pointAt(ring.innerRadius + 6, segment.middle);
          const name = pointAt(ring.innerRadius + 40, segment.middle);
          const hebrew = pointAt(ring.outerRadius - 24, segment.middle);
          const letters = pointAt(ring.outerRadius - 10, segment.middle);
          drawCenteredText(ctx, String(segment.num), num.x, num.y, segment.middle, size * 0.9, 8, 800);
          drawCenteredText(ctx, segment.subLabel, name.x, name.y, segment.middle + 90, size, 70, 500);
          drawCenteredText(ctx, segment.hebrew, hebrew.x, hebrew.y, segment.middle, size * 1.15, 12, 400);
          drawCenteredText(ctx, segment.letters, letters.x, letters.y, segment.middle, size * 0.9, 12, 800);
        } else if (ring.segments.length >= 9) {
          drawArcText(ctx, segment.label, middleRadius, segment.start + 0.5, segment.end - 0.5, size);
        } else {
          const position = pointAt(middleRadius, segment.middle);
          const maxWidth = Math.max(16, middleRadius * ring.slice * Math.PI / 180 * 0.8);
          drawCenteredText(
            ctx,
            segment.label,
            position.x,
            position.y,
            segment.middle,
            size,
            maxWidth,
          );
        }
        ctx.restore();
      });
    });

    ctx.save();
    ctx.rotate(-rotationRef.current * Math.PI / 180);
    ctx.fillStyle = '#d4af37';
    ctx.shadowColor = 'rgba(212, 175, 55, .8)';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, TAU);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(0, 0, 2, 0, TAU);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }, [geometry, getTransform]);

  const requestDraw = useCallback(() => {
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      draw();
    });
  }, [draw]);

  useEffect(() => {
    requestDraw();
  }, [activeSegmentId, requestDraw]);

  useEffect(() => {
    const uniqueImages = new Set(
      geometry.flatMap((ring) => ring.segments.map((segment) => segment.image).filter(Boolean)),
    );
    uniqueImages.forEach((source) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = source;
      image.onload = requestDraw;
      imagesRef.current.set(source, image);
    });
    document.fonts?.ready.then(requestDraw);
  }, [geometry, requestDraw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { width: rect.width, height: rect.height, dpr };
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      requestDraw();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    return () => observer.disconnect();
  }, [requestDraw]);

  const startLowDetail = useCallback(() => {
    lowDetailRef.current = true;
    canvasRef.current?.classList.add('is-dragging');
  }, []);

  const stopLowDetail = useCallback(() => {
    lowDetailRef.current = false;
    canvasRef.current?.classList.remove('is-dragging');
    requestDraw();
  }, [requestDraw]);

  const onPointerDown = useCallback((event) => {
    const canvas = canvasRef.current;
    canvas?.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    draggedRef.current = false;

    if (pointersRef.current.size === 1) {
      gestureRef.current = {
        type: 'rotate',
        angle: getScreenAngle(event.clientX, event.clientY),
        rotation: rotationRef.current,
        startX: event.clientX,
        startY: event.clientY,
      };
    } else if (pointersRef.current.size === 2) {
      const [first, second] = [...pointersRef.current.values()];
      const centerX = (first.x + second.x) / 2;
      const centerY = (first.y + second.y) / 2;
      const anchor = clientToWorld(centerX, centerY);
      gestureRef.current = {
        type: 'pinch',
        distance: Math.hypot(first.x - second.x, first.y - second.y),
        view: { ...viewportRef.current },
        anchor,
      };
      startLowDetail();
    }
  }, [clientToWorld, getScreenAngle, startLowDetail]);

  const onPointerMove = useCallback((event) => {
    if (!pointersRef.current.has(event.pointerId)) {
      const hovered = hitTest(event.clientX, event.clientY)?.id || null;
      if (hoveredRef.current !== hovered) {
        hoveredRef.current = hovered;
        requestDraw();
      }
      return;
    }

    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const gesture = gestureRef.current;
    if (!gesture) return;

    if (gesture.type === 'rotate' && pointersRef.current.size === 1) {
      const distance = Math.hypot(event.clientX - gesture.startX, event.clientY - gesture.startY);
      if (distance > 3) {
        draggedRef.current = true;
        startLowDetail();
      }
      rotationRef.current = gesture.rotation
        + getScreenAngle(event.clientX, event.clientY)
        - gesture.angle;
      requestDraw();
    } else if (gesture.type === 'pinch' && pointersRef.current.size === 2) {
      const [first, second] = [...pointersRef.current.values()];
      const distance = Math.hypot(first.x - second.x, first.y - second.y);
      const ratio = gesture.distance / Math.max(distance, 1);
      const width = Math.min(1480, Math.max(740 / 6, gesture.view.w * ratio));
      const height = width;
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const centerX = (first.x + second.x) / 2 - rect.left;
      const centerY = (first.y + second.y) / 2 - rect.top;
      const scale = Math.min(rect.width / width, rect.height / height);
      const offsetX = (rect.width - width * scale) / 2;
      const offsetY = (rect.height - height * scale) / 2;
      viewportRef.current = {
        x: gesture.anchor.x - (centerX - offsetX) / scale,
        y: gesture.anchor.y - (centerY - offsetY) / scale,
        w: width,
        h: height,
      };
      draggedRef.current = true;
      requestDraw();
    }
  }, [getScreenAngle, hitTest, requestDraw, startLowDetail]);

  const endPointer = useCallback((event) => {
    const wasSinglePointer = pointersRef.current.size === 1;
    if (wasSinglePointer && !draggedRef.current) {
      const segment = hitTest(event.clientX, event.clientY);
      if (segment) onSegmentClick(segment.id);
      else viewportRef.current = { ...BASE_VIEW };
    }

    pointersRef.current.delete(event.pointerId);
    if (pointersRef.current.size === 0) {
      gestureRef.current = null;
      stopLowDetail();
    }
  }, [hitTest, onSegmentClick, stopLowDetail]);

  const zoomFromCenter = useCallback((factor) => {
    const current = viewportRef.current;
    const width = Math.min(925, Math.max(740 / 6, current.w * factor));
    viewportRef.current = {
      x: current.x + (current.w - width) / 2,
      y: current.y + (current.h - width) / 2,
      w: width,
      h: width,
    };
    requestDraw();
  }, [requestDraw]);

  const onKeyDown = useCallback((event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      rotationRef.current += event.key === 'ArrowLeft' ? -5 : 5;
      requestDraw();
    } else if (event.key === '+' || event.key === '=') {
      event.preventDefault();
      zoomFromCenter(1 / 1.12);
    } else if (event.key === '-' || event.key === '_') {
      event.preventDefault();
      zoomFromCenter(1.12);
    } else if (event.key === '0') {
      event.preventDefault();
      viewportRef.current = { ...BASE_VIEW };
      rotationRef.current = 0;
      requestDraw();
    }
  }, [requestDraw, zoomFromCenter]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const onWheel = (event) => {
      event.preventDefault();
      const anchor = clientToWorld(event.clientX, event.clientY);
      const current = viewportRef.current;
      const factor = event.deltaY > 0 ? 1.1 : 1 / 1.1;
      const width = Math.min(925, Math.max(740 / 6, current.w * factor));
      const height = width;
      const scaleX = width / current.w;
      const scaleY = height / current.h;
      viewportRef.current = {
        x: anchor.x - (anchor.x - current.x) * scaleX,
        y: anchor.y - (anchor.y - current.y) * scaleY,
        w: width,
        h: height,
      };
      startLowDetail();
      requestDraw();
      window.clearTimeout(canvas._detailTimer);
      canvas._detailTimer = window.setTimeout(stopLowDetail, 100);
    };
    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      canvas.removeEventListener('wheel', onWheel);
      window.clearTimeout(canvas._detailTimer);
    };
  }, [clientToWorld, requestDraw, startLowDetail, stopLowDetail]);

  useEffect(() => () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="lamen-canvas"
      tabIndex={0}
      aria-label="Roda interativa do Lamen. Arraste para girar e use a roda do mouse ou pinça para ampliar. Pelo teclado, use setas para girar, mais e menos para zoom, e zero para resetar."
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
      onKeyDown={onKeyDown}
      onPointerLeave={() => {
        if (pointersRef.current.size === 0 && hoveredRef.current) {
          hoveredRef.current = null;
          requestDraw();
        }
      }}
    />
  );
}
