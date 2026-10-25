// roseCross.js — Golden Dawn Rose Cross: 22 petals in three rings and the sigil-tracing method.
// Ring order and petal positions follow the Golden Dawn lamen: 3 mothers (inner), 7 doubles (middle),
// 12 simples (outer). Angles are in degrees, clockwise from the top. Each petal carries its King-scale
// color and, as on the lamen, its letter in the complementary color.

const ROSE_RINGS = [
  {
    id: 'mothers',
    label: 'Três mães',
    family: 'Letra mãe',
    attributionLabel: 'Elemento',
    inner: 18,
    outer: 40,
    offset: 0,
    letters: [
      ['Aleph', 'א', 'Ar', '#f2e38b', '#6b3fb0'],
      ['Shin', 'ש', 'Fogo', '#ef5b2a', '#1f9e5a'],
      ['Mem', 'מ', 'Água', '#2b5fd9', '#f28a1f'],
    ],
  },
  {
    id: 'doubles',
    label: 'Sete duplas',
    family: 'Letra dupla',
    attributionLabel: 'Planeta',
    inner: 40,
    outer: 66,
    offset: 360 / 14,
    letters: [
      ['Kaph', 'כ', 'Júpiter', '#7a3fc4', '#f5d33a'],
      ['Tav', 'ת', 'Saturno', '#3a2f8f', '#f2a93a'],
      ['Gimel', 'ג', 'Lua', '#2f7fd6', '#f28a1f'],
      ['Daleth', 'ד', 'Vênus', '#1f9e5a', '#d9302c'],
      ['Beth', 'ב', 'Mercúrio', '#f2c230', '#6b3fb0'],
      ['Resh', 'ר', 'Sol', '#f28a1f', '#2a5fd0'],
      ['Peh', 'פ', 'Marte', '#d9302c', '#1f9e5a'],
    ],
  },
  {
    id: 'simples',
    label: 'Doze simples',
    family: 'Letra simples',
    attributionLabel: 'Signo',
    inner: 66,
    outer: 96,
    offset: 0,
    letters: [
      ['Heh', 'ה', 'Áries', '#e0312b', '#2fb35e'],
      ['Qoph', 'ק', 'Peixes', '#b3205f', '#b5d33a'],
      ['Tzaddi', 'צ', 'Aquário', '#7b3fb8', '#f5d33a'],
      ['Ayin', 'ע', 'Capricórnio', '#40329a', '#f2a93a'],
      ['Samekh', 'ס', 'Sagitário', '#2a5fd0', '#f28a1f'],
      ['Nun', 'נ', 'Escorpião', '#1f8f8a', '#ea5a2a'],
      ['Lamed', 'ל', 'Libra', '#1f9e4f', '#d9302c'],
      ['Yod', 'י', 'Virgem', '#86b83a', '#a1307a'],
      ['Teth', 'ט', 'Leão', '#d8d03a', '#6b3fb0'],
      ['Cheth', 'ח', 'Câncer', '#f2b13a', '#4a3fc0'],
      ['Zayin', 'ז', 'Gêmeos', '#f28a2a', '#2a5fd0'],
      ['Vav', 'ו', 'Touro', '#ea5a2a', '#1f8f8a'],
    ],
  },
];

const HEBREW_VALUES = {
  'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9, 'י': 10, 'כ': 20,
  'ל': 30, 'מ': 40, 'נ': 50, 'ס': 60, 'ע': 70, 'פ': 80, 'צ': 90, 'ק': 100, 'ר': 200, 'ש': 300, 'ת': 400,
};

const FINAL_TO_REGULAR = { 'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ' };

export function polar(radius, angle) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return { x: radius * Math.cos(radians), y: radius * Math.sin(radians) };
}

export const ROSE_PETALS = ROSE_RINGS.flatMap((ring) => {
  const span = 360 / ring.letters.length;
  return ring.letters.map(([name, hebrew, attribution, color, letterColor], index) => {
    const angle = ring.offset + index * span;
    const center = polar((ring.inner + ring.outer) / 2, angle);
    return {
      name,
      hebrew,
      attribution,
      color,
      letterColor,
      ring: ring.id,
      ringLabel: ring.label,
      family: ring.family,
      attributionLabel: ring.attributionLabel,
      inner: ring.inner,
      outer: ring.outer,
      startAngle: angle - span / 2,
      endAngle: angle + span / 2,
      angle,
      x: center.x,
      y: center.y,
    };
  });
});

export const ROSE_RING_SUMMARY = ROSE_RINGS.map((ring) => ({
  id: ring.id,
  label: ring.label,
  attributionLabel: ring.attributionLabel,
  letters: ring.letters.map(([, hebrew]) => hebrew),
}));

export function getPetalPath(petal, gap = 0.9) {
  const start = petal.startAngle + gap;
  const end = petal.endAngle - gap;
  const largeArc = end - start > 180 ? 1 : 0;
  const outerStart = polar(petal.outer - 0.6, start);
  const outerEnd = polar(petal.outer - 0.6, end);
  const innerEnd = polar(petal.inner + 0.6, end);
  const innerStart = polar(petal.inner + 0.6, start);
  return [
    `M ${outerStart.x.toFixed(2)} ${outerStart.y.toFixed(2)}`,
    `A ${petal.outer - 0.6} ${petal.outer - 0.6} 0 ${largeArc} 1 ${outerEnd.x.toFixed(2)} ${outerEnd.y.toFixed(2)}`,
    `L ${innerEnd.x.toFixed(2)} ${innerEnd.y.toFixed(2)}`,
    `A ${petal.inner + 0.6} ${petal.inner + 0.6} 0 ${largeArc} 0 ${innerStart.x.toFixed(2)} ${innerStart.y.toFixed(2)}`,
    'Z',
  ].join(' ');
}

// Keeps only the 22 consonants (final forms folded into their regular shape) in reading order.
export function normalizeHebrewName(text = '') {
  return [...text]
    .map((char) => FINAL_TO_REGULAR[char] || char)
    .filter((char) => ROSE_PETALS.some((petal) => petal.hebrew === char))
    .join('');
}

// Builds the sigil: petal sequence, line points, start circle and finishing bar.
// A letter repeated in immediate succession is marked with a small loop. This is a convention of this
// tool: the sources consulted document the start circle and end bar, not a mark for doubled letters.
export function traceRoseSigil(text) {
  const letters = [...normalizeHebrewName(text)];
  const steps = letters.map((hebrew, index) => ({
    ...ROSE_PETALS.find((petal) => petal.hebrew === hebrew),
    order: index + 1,
    repeated: index > 0 && letters[index - 1] === hebrew,
  }));

  const points = steps.filter((step) => !step.repeated).map(({ x, y }) => ({ x, y }));
  const loops = steps.filter((step) => step.repeated).map(({ x, y, angle }) => ({ x, y, angle }));

  let bar = null;
  if (steps.length > 0) {
    const last = steps[steps.length - 1];
    const previous = points.length > 1 ? points[points.length - 2] : null;
    const dx = previous ? last.x - previous.x : 0;
    const dy = previous ? last.y - previous.y : 1;
    const length = Math.hypot(dx, dy) || 1;
    const nx = -dy / length;
    const ny = dx / length;
    bar = {
      x1: last.x + nx * 7.5,
      y1: last.y + ny * 7.5,
      x2: last.x - nx * 7.5,
      y2: last.y - ny * 7.5,
    };
  }

  return {
    letters: letters.join(''),
    steps,
    points,
    loops,
    start: steps[0] ? { x: steps[0].x, y: steps[0].y } : null,
    bar,
    value: steps.reduce((sum, step) => sum + (HEBREW_VALUES[step.hebrew] || 0), 0),
  };
}

export const ROSE_NAME_PRESETS = [
  { hebrew: 'אדני', label: 'Adonai' },
  { hebrew: 'יהוה', label: 'YHVH' },
  { hebrew: 'אהיה', label: 'Eheieh' },
  { hebrew: 'אלהים', label: 'Elohim' },
  { hebrew: 'שדי', label: 'Shaddai' },
  { hebrew: 'אגלא', label: 'AGLA' },
  { hebrew: 'מיכאל', label: 'Michael' },
  { hebrew: 'רפאל', label: 'Raphael' },
  { hebrew: 'גבריאל', label: 'Gabriel' },
];
