export const BLOCK_TYPES = [
  ['lead', 'Resumo de abertura'],
  ['heading', 'Título de seção'],
  ['paragraph', 'Parágrafo'],
  ['quote', 'Citação destacada'],
  ['list', 'Lista'],
  ['formula', 'Fórmula ou sequência'],
  ['table', 'Tabela'],
  ['cards', 'Cards comparativos'],
  ['hebrew', 'Hebraico e transliteração'],
  ['timeline', 'Linha histórica'],
  ['image', 'Imagem editorial'],
  ['references', 'Referências'],
];

const createId = () => `block-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export function slugify(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

export function createBlock(type = 'paragraph') {
  const base = { id: createId(), type };
  if (type === 'heading') return { ...base, text: 'Nova seção', anchor: 'nova-secao' };
  if (type === 'list') return { ...base, ordered: false, items: ['Novo item'] };
  if (type === 'formula') return { ...base, items: ['origem', 'formação', 'manifestação'] };
  if (type === 'table') return { ...base, headers: ['Coluna 1', 'Coluna 2'], rows: [['Conteúdo', 'Conteúdo']] };
  if (type === 'cards') return { ...base, items: [{ title: 'Conceito', text: 'Explicação do conceito.' }] };
  if (type === 'hebrew') return { ...base, hebrew: 'א', transliteration: 'Aleph', meaning: 'Unidade' };
  if (type === 'timeline') return { ...base, items: ['Origem', 'Desenvolvimento', 'Síntese'] };
  if (type === 'image') return { ...base, url: '', alt: '', caption: '', credit: '' };
  if (type === 'references') return { ...base, items: [{ label: 'Nome da fonte', url: 'https://' }] };
  return { ...base, text: '' };
}

export function parseArticleText(value = '') {
  const lines = value.replace(/\r/g, '').split('\n');
  const blocks = [];
  let paragraph = [];
  let list = [];

  const flushParagraph = () => {
    const text = paragraph.join(' ').trim();
    if (text) blocks.push({ ...createBlock(blocks.length ? 'paragraph' : 'lead'), text });
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) blocks.push({ ...createBlock('list'), items: list });
    list = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line || line === '---') {
      flushParagraph();
      flushList();
      return;
    }
    if (/^#{1,3}\s+/.test(line)) {
      flushParagraph();
      flushList();
      const text = line.replace(/^#{1,3}\s+/, '');
      blocks.push({ ...createBlock('heading'), text, anchor: slugify(text) });
      return;
    }
    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      list.push(line.replace(/^[-*]\s+/, ''));
      return;
    }
    if (/^>\s?/.test(line) || (/^[«“].*[»”]$/.test(line))) {
      flushParagraph();
      flushList();
      blocks.push({ ...createBlock('quote'), text: line.replace(/^>\s?/, '').replace(/^[«“]|[»”]$/g, '') });
      return;
    }
    paragraph.push(line);
  });

  flushParagraph();
  flushList();
  return blocks;
}

export function sectionsFromBlocks(blocks = []) {
  return blocks
    .filter((block) => block.type === 'heading' && block.text?.trim())
    .map((block) => [block.anchor || slugify(block.text), block.text.trim()]);
}

export function calculateReadingTime(blocks = []) {
  const words = blocks.reduce((total, block) => {
    const text = [
      block.text,
      block.hebrew,
      block.transliteration,
      block.meaning,
      block.caption,
      ...(block.items || []).flatMap((item) => (
        typeof item === 'string' ? [item] : [item.title, item.text, item.label]
      )),
      ...(block.headers || []),
      ...(block.rows || []).flat(),
    ].filter(Boolean).join(' ');
    return total + text.trim().split(/\s+/).filter(Boolean).length;
  }, 0);
  return Math.max(1, Math.ceil(words / 210));
}

export function validateBlocks(blocks) {
  if (!Array.isArray(blocks)) return ['O conteúdo precisa ser uma lista de blocos.'];
  const errors = [];
  blocks.forEach((block, index) => {
    if (!block?.id || !block?.type) errors.push(`Bloco ${index + 1} está incompleto.`);
    if (!BLOCK_TYPES.some(([type]) => type === block.type)) errors.push(`Tipo inválido no bloco ${index + 1}.`);
    if (block.type === 'heading' && !block.text?.trim()) errors.push(`Título vazio no bloco ${index + 1}.`);
    if (block.type === 'image' && block.url && !block.alt?.trim()) errors.push(`Imagem sem texto alternativo no bloco ${index + 1}.`);
  });
  return errors;
}

