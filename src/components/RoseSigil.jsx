import { useMemo, useRef, useState } from 'react';
import { ROSE_NAME_PRESETS, ROSE_PETALS, ROSE_RING_SUMMARY, getPetalPath, polar, traceRoseSigil } from '../data/roseCross';
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

// Centre of the rose as described for the lamen: a white field (the reflected brightness of Kether)
// bearing the golden Cross of Six Squares, the red Rose of Five Petals at its crossing and four green
// rays issuing from the angles of the cross.
const SQUARE = 5.6;
const CROSS_SQUARES = [[0, -2], [0, -1], [0, 0], [0, 1], [-1, -1], [1, -1]];
const CROSSING = { x: 0, y: -SQUARE / 2 };

function RoseCenter() {
  const half = SQUARE / 2;
  const rays = [
    [half, -SQUARE, 1, -1],
    [-half, -SQUARE, -1, -1],
    [half, 0, 1, 1],
    [-half, 0, -1, 1],
  ];
  return (
    <g>
      <circle r="17.6" fill="#fbf8ef" stroke="rgba(13,16,23,0.55)" strokeWidth="0.5" />
      {rays.map(([x, y, dx, dy]) => (
        <polygon
          key={`${dx}${dy}`}
          points={`${x},${y} ${x + dx * 7.5 - dy * 1.6},${y + dy * 7.5 + dx * 1.6} ${x + dx * 7.5 + dy * 1.6},${y + dy * 7.5 - dx * 1.6}`}
          fill="#1f9e4f"
        />
      ))}
      {CROSS_SQUARES.map(([column, row]) => (
        <rect
          key={`${column}${row}`}
          x={column * SQUARE - half}
          y={row * SQUARE}
          width={SQUARE}
          height={SQUARE}
          fill="#e2b33c"
          stroke="#8a6414"
          strokeWidth="0.35"
        />
      ))}
      <g transform={`translate(${CROSSING.x} ${CROSSING.y})`} stroke="#851c25" strokeWidth="0.2">
        {Array.from({ length: 5 }, (_, index) => (
          <path key={index} transform={`rotate(${index * 72})`}
            d="M0 0 C-3.3 -1.1 -2.7 -4.3 0 -4.1 C2.7 -4.3 3.3 -1.1 0 0Z"
            fill="#cf263b" />
        ))}
        <circle r="0.85" fill="#f5d77a" />
      </g>
    </g>
  );
}

// Draws the rose (optional) and the sigil. The same drawing serves the screen and both SVG downloads,
// so every color lives in attributes rather than CSS.
function SigilSvg({ sigil, orderByLetter, showRose, showTrace = true, showLetters = true, transparent = false, onAddLetter, className, titleId, svgRef }) {
  const linePoints = sigil.points.map((point) => ({ ...point }));
  // Start the first segment at the circle's edge, leaving its interior clear.
  if (linePoints.length > 1) {
    const [first, next] = linePoints;
    const distance = Math.hypot(next.x - first.x, next.y - first.y);
    const radius = Math.min(showRose ? 6 : 5.5, distance / 2);
    first.x += (next.x - first.x) / distance * radius;
    first.y += (next.y - first.y) / distance * radius;
  }
  const polyline = linePoints.map(({ x, y }) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
  const xs = sigil.points.map(({ x }) => x);
  const ys = sigil.points.map(({ y }) => y);
  const minX = xs.length ? Math.min(...xs) : -86;
  const maxX = xs.length ? Math.max(...xs) : 86;
  const minY = ys.length ? Math.min(...ys) : -86;
  const maxY = ys.length ? Math.max(...ys) : 86;
  const viewExtent = showRose ? 104 : Math.max(24, (maxX - minX) / 2 + 18, (maxY - minY) / 2 + 18);
  const viewX = (showRose ? 0 : (minX + maxX) / 2) - viewExtent;
  const viewY = (showRose ? 0 : (minY + maxY) / 2) - viewExtent;
  const interactive = Boolean(onAddLetter);

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox={`${viewX} ${viewY} ${viewExtent * 2} ${viewExtent * 2}`}
      width="1040"
      height="1040"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>
        {sigil.steps.length && showTrace
          ? `Sigilo de ${sigil.letters} traçado na rosa da Rosa-Cruz`
          : 'Rosa da Rosa-Cruz com as 22 letras hebraicas'}
      </title>
      {!showRose && !transparent && <rect x={viewX} y={viewY} width={viewExtent * 2} height={viewExtent * 2} fill="#0d1017" />}
      {showRose && (
        <g>
          <circle r="100" fill="#0d1017" stroke="rgba(245,215,122,0.35)" strokeWidth="0.8" />
          {ROSE_PETALS.map((petal) => {
            const orders = orderByLetter.get(petal.hebrew);
            const active = showTrace && Boolean(orders);
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
                  fillOpacity={showTrace && sigil.steps.length && !active ? 0.62 : 1}
                  stroke={active ? '#ffffff' : 'rgba(13,16,23,0.55)'}
                  strokeWidth={active ? 1.4 : 0.5}
                />
              </g>
            );
          })}
          <RoseCenter />
        </g>
      )}

      <g display={showTrace ? undefined : 'none'} pointerEvents="none">
      {showRose && sigil.points.length > 1 && (
        <polyline
          points={polyline}
          fill="none"
          stroke="#111318"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
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
          r={showRose ? 6 : 5.5}
          fill="none"
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
      </g>
      {showRose && showLetters && (
        <g
          pointerEvents="none"
          fontWeight="700"
          textAnchor="middle"
          fontFamily="'SBL Hebrew', 'Noto Serif Hebrew', 'Times New Roman', serif"
          paintOrder="stroke"
          strokeWidth="1.4"
          strokeLinejoin="round"
        >
          {ROSE_PETALS.map((petal) => (
            <text
              key={petal.hebrew}
              x={petal.x}
              y={petal.y}
              dy="0.35em"
              fontSize={petal.ring === 'simples' ? 12.5 : 11.5}
              fill={petal.letterColor}
              stroke="rgba(13,16,23,0.45)"
            >
              {petal.hebrew}
            </text>
          ))}
        </g>
      )}
      {showRose && showTrace && showLetters && ROSE_PETALS.filter((petal) => orderByLetter.has(petal.hebrew)).map((petal) => {
        const label = orderByLetter.get(petal.hebrew).join('·');
        const offset = polar(Math.min(petal.outer - 6, (petal.inner + petal.outer) / 2 + 7), petal.angle + (petal.ring === 'mothers' ? 30 : 9));
        return (
          <g key={`order-${petal.hebrew}`} pointerEvents="none">
            <rect
              x={offset.x - (2.6 + label.length * 1.35)}
              y={offset.y - 3.4}
              width={5.2 + label.length * 2.7}
              height="6.8"
              rx="3.4"
              fill={SIGIL_COLOR}
              stroke="#111318"
              strokeWidth="0.5"
            />
            <text
              x={offset.x}
              y={offset.y}
              dy="0.36em"
              textAnchor="middle"
              fontSize="4.8"
              fontWeight="800"
              fill="#111318"
              fontFamily="Inter, sans-serif"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function RoseSigil({ onOpenPath }) {
  const tracesRef = useRef(null);
  const roseRef = useRef(null);
  const [name, setName] = useState('אדני');
  const [showRose, setShowRose] = useState(true);
  const [showTrace, setShowTrace] = useState(true);
  const [showLetters, setShowLetters] = useState(true);
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
        <p>Digite um nome em hebraico ou toque nas pétalas para traçar seu sigilo.</p>
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
          showTrace={!showRose || showTrace}
          showLetters={showLetters}
          onAddLetter={(hebrew) => setName((current) => current + hebrew)}
          className={`rose-sigil-svg ${showRose ? '' : 'sigil-only'}`}
          titleId="rose-sigil-title"
        />
        {sigil.steps.length > 0 && (!showRose || showTrace) && (
          <div className="rose-sigil-legend" aria-label="Legenda do sigilo">
            <span><svg viewBox="-8 -8 16 16" aria-hidden="true"><circle r="5" fill="none" stroke={SIGIL_COLOR} strokeWidth="2.4" /></svg>Início</span>
            <span><svg viewBox="-8 -8 16 16" aria-hidden="true"><line x1="-7" y1="0" x2="2" y2="0" stroke={SIGIL_COLOR} strokeWidth="2" /><line x1="3" y1="-6" x2="3" y2="6" stroke={SIGIL_COLOR} strokeWidth="3" strokeLinecap="round" /></svg>Fim</span>
            <span><svg viewBox="-8 -8 16 16" aria-hidden="true"><circle r="3.4" fill="none" stroke={SIGIL_COLOR} strokeWidth="1.6" /><circle cx="0" cy="5" r="1.6" fill={SIGIL_COLOR} /></svg>Letra repetida (convenção da Hermetika)</span>
          </div>
        )}

        <details className="rose-options">
          <summary>Opções de visualização e exportação</summary>
        <div className="rose-sigil-toolbar">
          <button type="button" onClick={() => setShowRose((current) => !current)}>
            {showRose ? 'Ver só o sigilo' : 'Mostrar a rosa'}
          </button>
          {showRose && <button type="button" aria-pressed={!showTrace} onClick={() => setShowTrace((current) => !current)}>
            {showTrace ? 'Ver rosa sem traçado' : 'Mostrar traçado'}
          </button>}
          {showRose && <button type="button" aria-pressed={!showLetters} onClick={() => setShowLetters((current) => !current)}>
            {showLetters ? 'Ocultar letras e números' : 'Mostrar letras e números'}
          </button>}
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
        {showRose && <details className="rose-center-detail">
          <summary>Ver cruz central ampliada</summary>
          <svg viewBox="-19 -19 38 38" width="200" height="200" role="img" aria-label="Cruz dourada de seis quadrados, rosa vermelha de cinco pétalas e quatro raios verdes sobre campo branco">
            <RoseCenter />
          </svg>
        </details>}
        </details>
      </div>
      <details className="rose-presets-details">
        <summary>Escolher nome de exemplo ou anjo</summary>
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
      </details>
      <details className="rose-sigil-howto">
        <summary>Como usar</summary>
        <ol>
          <li>
            <b>Escreva o nome em hebraico.</b> Digite no campo, toque nas pétalas na ordem das letras ou
            escolha um nome divino ou um dos 72 anjos. Só as 22 consoantes contam: vogais e sinais são
            ignorados, e as formas finais (ך ם ן ף ץ) valem como a letra comum.
          </li>
          <li>
            <b>Siga a ordem de leitura.</b> O hebraico é lido da direita para a esquerda, e o traçado
            parte da primeira letra lida. Os números nas pétalas mostram a ordem.
          </li>
          <li>
            <b>Leia as marcas.</b> O círculo fica na pétala da primeira letra; a linha passa pela pétala de
            cada letra seguinte; a barra curta, perpendicular ao último trecho, fecha na última letra.
          </li>
          <li>
            <b>Estude as correspondências.</b> A lista abaixo da rosa mostra, letra a letra, a família, o
            elemento, planeta ou signo e o caminho da Árvore da Vida correspondente.
          </li>
          <li>
            <b>Guarde o sigilo.</b> “Baixar só o traço” gera o sigilo isolado, com fundo transparente;
            “Baixar com a rosa” mantém a rosa ao fundo, para conferir de onde vem cada traço.
          </li>
        </ol>
        <p>
          <b>Para que servia.</b> Na Golden Dawn, o lamen da Rosa-Cruz era usado sobre o peito nas
          operações importantes e descrito nos rituais como chave dos sigilos. A rosa servia para extrair
          os sigilos de nomes divinos, angélicos e de inteligências, usados em talismãs e no trabalho
          ritual. Regardie sugeria copiar os sigilos em papel vegetal e sobrepô-los à rosa para
          reconhecer o nome de origem. Aqui, o gerador é uma ferramenta de estudo dessa tradição.
        </p>
      </details>
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
        As pétalas seguem a escala do Rei da Golden Dawn, com cada letra na cor complementar, e o centro
        reproduz o campo branco com a Cruz Dourada de seis quadrados, a Rosa Vermelha de cinco pétalas e
        os quatro raios verdes. A posição das letras segue a rosa do lamen publicada por Israel Regardie;
        há quem aponte que Tav e Kaph estão trocados nessa versão. O círculo inicial e a barra final
        vêm das descrições do método. O laço para uma letra repetida em sequência é uma convenção desta
        ferramenta: não o encontramos documentado nas fontes consultadas. Chamar a rosa de “gerador” é
        uma leitura moderna do procedimento, não um termo histórico.
      </p>
      <a href={RESEARCH_SOURCES.seferYetzirah} target="_blank" rel="noreferrer">
        Consultar o Sefer Yetzirah na Sefaria
      </a>
    </section>
  );
}
