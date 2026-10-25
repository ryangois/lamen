import { useMemo, useRef, useState } from 'react';
import { ROSE_NAME_PRESETS, ROSE_PETALS, ROSE_RING_SUMMARY, getPetalPath, traceRoseSigil } from '../data/roseCross';
import { RESEARCH_SOURCES } from '../data/researchData';
import { ringStructure } from '../data/rings';
import { treePaths } from '../data/treeOfLife';
import './RoseSigil.css';

const SIGIL_COLOR = '#f5d77a';

// The 72 names receive -yah (יה) or -el (אל), as in the Shem haMephorash tradition.
const angelNames = ringStructure
  .find((ring) => ring.ringId === 'angels')
  .segments.map((angel) => ({
    id: angel.id,
    label: `${angel.num}. ${angel.subLabel.charAt(0)}${angel.subLabel.slice(1).toLowerCase()}`,
    hebrew: `${angel.hebrew}${angel.subLabel.endsWith('EL') ? 'אל' : 'יה'}`,
  }));

function downloadSvg(svg, fileName) {
  const markup = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([`<?xml version="1.0" encoding="UTF-8"?>\n${markup}`], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.svg`;
  link.click();
  URL.revokeObjectURL(url);
}

// Draws the rose (optional) and the sigil. The same drawing serves the screen and both SVG downloads,
// so every color lives in attributes rather than CSS.
function SigilSvg({ sigil, orderByLetter, showRose, transparent = false, onAddLetter, className, titleId, svgRef }) {
  const polyline = sigil.points.map(({ x, y }) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
  const interactive = Boolean(onAddLetter);

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="-104 -104 208 208"
      width="1040"
      height="1040"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>
        {sigil.steps.length
          ? `Sigilo de ${sigil.letters} traçado na rosa da Rosa-Cruz`
          : 'Rosa da Rosa-Cruz com as 22 letras hebraicas'}
      </title>
      {!showRose && !transparent && <rect x="-104" y="-104" width="208" height="208" fill="#0d1017" />}
      {showRose && (
        <g>
          <circle r="100" fill="#0d1017" stroke="rgba(245,215,122,0.35)" strokeWidth="0.8" />
          {ROSE_PETALS.map((petal) => {
            const orders = orderByLetter.get(petal.hebrew);
            const active = Boolean(orders);
            const addLetter = () => onAddLetter(petal.hebrew);
            return (
              <g
                key={petal.hebrew}
                className={interactive ? 'rose-petal' : undefined}
                {...(interactive && {
                  role: 'button',
                  tabIndex: 0,
                  'aria-label': `Acrescentar ${petal.name} (${petal.attribution})`,
                  onClick: addLetter,
                  onKeyDown: (event) => {
                    if (event.key !== 'Enter' && event.key !== ' ') return;
                    event.preventDefault();
                    addLetter();
                  },
                })}
              >
                <path
                  d={getPetalPath(petal)}
                  fill={petal.color}
                  fillOpacity={active ? 0.95 : 0.32}
                  stroke={active ? SIGIL_COLOR : 'rgba(255,255,255,0.18)'}
                  strokeWidth={active ? 1.1 : 0.5}
                />
                {orders && (
                  <text
                    x={petal.x + 6.5}
                    y={petal.y - 6}
                    textAnchor="middle"
                    fontSize="4.6"
                    fontWeight="800"
                    fill="#111318"
                    fontFamily="Inter, sans-serif"
                  >
                    {orders.join('·')}
                  </text>
                )}
              </g>
            );
          })}
          <g stroke="rgba(245,215,122,0.55)" strokeWidth="2.4" strokeLinecap="round">
            <line x1="0" y1="-11" x2="0" y2="11" />
            <line x1="-8" y1="-4" x2="8" y2="-4" />
          </g>
        </g>
      )}

      {showRose && sigil.points.length > 1 && (
        <polyline
          points={polyline}
          fill="none"
          stroke="#111318"
          strokeWidth="4.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />
      )}
      {sigil.points.length > 1 && (
        <polyline
          points={polyline}
          fill="none"
          stroke={SIGIL_COLOR}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {sigil.loops.map((loop, index) => {
        const radians = ((loop.angle - 90) * Math.PI) / 180;
        return (
          <circle
            key={`loop-${index}`}
            cx={loop.x + Math.cos(radians) * 4.5}
            cy={loop.y + Math.sin(radians) * 4.5}
            r="3.4"
            fill="none"
            stroke={SIGIL_COLOR}
            strokeWidth="1.8"
          />
        );
      })}
      {sigil.start && (
        <circle
          cx={sigil.start.x}
          cy={sigil.start.y}
          r={showRose ? 8 : 5.5}
          fill={showRose ? 'rgba(13,16,23,0.35)' : 'none'}
          stroke={SIGIL_COLOR}
          strokeWidth="2.6"
        />
      )}
      {sigil.bar && (
        <line
          x1={sigil.bar.x1}
          y1={sigil.bar.y1}
          x2={sigil.bar.x2}
          y2={sigil.bar.y2}
          stroke={SIGIL_COLOR}
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      )}
      {showRose && (
        <g
          pointerEvents="none"
          fontWeight="700"
          textAnchor="middle"
          fontFamily="'SBL Hebrew', 'Noto Serif Hebrew', 'Times New Roman', serif"
          paintOrder="stroke"
          strokeWidth="2.2"
          strokeLinejoin="round"
        >
          {ROSE_PETALS.map((petal) => {
            const active = orderByLetter.has(petal.hebrew);
            return (
              <text
                key={petal.hebrew}
                x={petal.x}
                y={petal.y}
                dy="0.35em"
                fontSize={petal.ring === 'simples' ? 12 : 11}
                fill={active ? '#111318' : '#f4efe1'}
                stroke={active ? 'rgba(255,240,200,0.7)' : 'rgba(13,16,23,0.6)'}
              >
                {petal.hebrew}
              </text>
            );
          })}
        </g>
      )}
    </svg>
  );
}

export default function RoseSigil({ onOpenPath }) {
  const tracesRef = useRef(null);
  const roseRef = useRef(null);
  const [name, setName] = useState('אדני');
  const [showRose, setShowRose] = useState(true);
  const sigil = useMemo(() => traceRoseSigil(name), [name]);
  const orderByLetter = useMemo(() => {
    const map = new Map();
    sigil.steps.forEach((step) => {
      map.set(step.hebrew, [...(map.get(step.hebrew) || []), step.order]);
    });
    return map;
  }, [sigil]);
  const ignored = name.replace(/\s/g, '').length > sigil.letters.length;

  return (
    <section className="rose-sigil-lab">
      <header>
        <span>Golden Dawn · Rosa-Cruz</span>
        <h3 className="brand-font">Trace um nome na rosa</h3>
        <p>
          A rosa central do lamen da Rosa-Cruz dá uma pétala a cada uma das 22 letras, em três anéis
          segundo o Sefer Yetzirah: três mães, sete duplas e doze simples. Seguir as letras de um nome
          pelas pétalas produz uma figura linear — o círculo marca o início e a barra curta, o fim.
        </p>
      </header>

      <div className="rose-sigil-input">
        <label>
          <span>Nome em hebraico</span>
          <input
            type="text"
            lang="he"
            dir="rtl"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Digite ou toque nas pétalas"
            autoComplete="off"
            spellCheck="false"
          />
        </label>
        <div className="rose-sigil-input-actions">
          <button
            type="button"
            onClick={() => setName((current) => [...current.trimEnd()].slice(0, -1).join(''))}
            disabled={!name}
            aria-label="Apagar última letra"
          >
            ⌫
          </button>
          <button type="button" onClick={() => setName('')} disabled={!name}>Limpar</button>
        </div>
      </div>

      <div className="rose-sigil-presets" aria-label="Nomes de exemplo">
        {ROSE_NAME_PRESETS.map((preset) => (
          <button
            type="button"
            key={preset.hebrew}
            className={sigil.letters === preset.hebrew ? 'active' : ''}
            onClick={() => setName(preset.hebrew)}
          >
            <b lang="he" dir="rtl">{preset.hebrew}</b>
            {preset.label}
          </button>
        ))}
        <select
          value=""
          onChange={(event) => event.target.value && setName(event.target.value)}
          aria-label="Usar o nome de um dos 72 anjos"
        >
          <option value="">72 anjos…</option>
          {angelNames.map((angel) => (
            <option key={angel.id} value={angel.hebrew}>{angel.label} · {angel.hebrew}</option>
          ))}
        </select>
      </div>
      {ignored && (
        <p className="rose-sigil-warning">
          Apenas as 22 letras hebraicas entram no traçado; formas finais contam como a letra comum, e
          sinais, vogais e caracteres latinos são ignorados.
        </p>
      )}

      <div className="rose-sigil-stage">
        <SigilSvg
          sigil={sigil}
          orderByLetter={orderByLetter}
          showRose={showRose}
          onAddLetter={(hebrew) => setName((current) => current + hebrew)}
          className={`rose-sigil-svg ${showRose ? '' : 'sigil-only'}`}
          titleId="rose-sigil-title"
        />
        {sigil.steps.length > 0 && (
          <div className="rose-sigil-legend" aria-label="Legenda do sigilo">
            <span><svg viewBox="-8 -8 16 16" aria-hidden="true"><circle r="5" fill="none" stroke={SIGIL_COLOR} strokeWidth="2.4" /></svg>Início</span>
            <span><svg viewBox="-8 -8 16 16" aria-hidden="true"><line x1="-7" y1="0" x2="2" y2="0" stroke={SIGIL_COLOR} strokeWidth="2" /><line x1="3" y1="-6" x2="3" y2="6" stroke={SIGIL_COLOR} strokeWidth="3" strokeLinecap="round" /></svg>Fim</span>
            <span><svg viewBox="-8 -8 16 16" aria-hidden="true"><circle r="3.4" fill="none" stroke={SIGIL_COLOR} strokeWidth="1.6" /><circle cx="0" cy="5" r="1.6" fill={SIGIL_COLOR} /></svg>Letra repetida</span>
          </div>
        )}

        <div className="rose-sigil-toolbar">
          <button type="button" onClick={() => setShowRose((current) => !current)}>
            {showRose ? 'Ver só o sigilo' : 'Mostrar a rosa'}
          </button>
          <button
            type="button"
            disabled={!sigil.steps.length}
            onClick={() => downloadSvg(tracesRef.current, `sigilo-${sigil.letters}`)}
          >
            Baixar só o traço
          </button>
          <button
            type="button"
            disabled={!sigil.steps.length}
            onClick={() => downloadSvg(roseRef.current, `sigilo-${sigil.letters}-com-rosa`)}
          >
            Baixar com a rosa
          </button>
        </div>
        <div className="rose-sigil-export" aria-hidden="true">
          <SigilSvg sigil={sigil} orderByLetter={orderByLetter} showRose={false} transparent svgRef={tracesRef} />
          <SigilSvg sigil={sigil} orderByLetter={orderByLetter} showRose svgRef={roseRef} />
        </div>
      </div>

      {sigil.steps.length > 0 ? (
        <article className="rose-sigil-result">
          <div>
            <strong lang="he" dir="rtl">{sigil.letters}</strong>
            <span>Gematria {sigil.value} · {sigil.steps.length} {sigil.steps.length === 1 ? 'letra' : 'letras'}</span>
          </div>
          <ol>
            {sigil.steps.map((step, index) => {
              const path = treePaths.find((entry) => entry.hebrew === step.hebrew);
              const isFirst = index === 0;
              const isLast = index === sigil.steps.length - 1;
              return (
                <li key={`${step.hebrew}-${step.order}`} style={{ '--petal-color': step.color }}>
                  <b>{step.order}</b>
                  <strong lang="he" dir="rtl">{step.hebrew}</strong>
                  <div>
                    <span>
                      {step.name} · {step.family}
                      {isFirst && ' · início (círculo)'}
                      {isLast && !isFirst && ' · fim (barra)'}
                      {step.repeated && ' · repetida (laço)'}
                    </span>
                    <small>{step.attributionLabel}: {step.attribution}</small>
                  </div>
                  {path && (
                    <button type="button" onClick={() => onOpenPath(path.id)}>
                      Caminho {path.number}
                    </button>
                  )}
                </li>
              );
            })}
          </ol>
        </article>
      ) : (
        <p className="rose-sigil-empty">Digite um nome ou toque nas pétalas para começar o traçado.</p>
      )}

      <div className="rose-sigil-rings">
        {ROSE_RING_SUMMARY.map((ring) => (
          <article key={ring.id}>
            <span>{ring.label}</span>
            <strong lang="he" dir="rtl">{ring.letters.join(' ')}</strong>
            <small>{ring.attributionLabel}s</small>
          </article>
        ))}
      </div>

      <p className="tree-gallery-note">
        O hebraico é lido da direita para a esquerda, e o traçado segue essa ordem. As cores das pétalas
        seguem a escala do Rei da Golden Dawn; a posição das letras reproduz a rosa do lamen. O método
        está documentado no material da Ordem, publicado por Israel Regardie; a rosa como “gerador” é
        uma leitura moderna desse procedimento, não um termo histórico.
      </p>
      <a href={RESEARCH_SOURCES.seferYetzirah} target="_blank" rel="noreferrer">
        Consultar o Sefer Yetzirah na Sefaria
      </a>
    </section>
  );
}
