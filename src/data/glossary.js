export const glossaryEntries = [
  {
    term: 'Sephirah',
    aliases: ['Sephirah', 'Sephiroth', 'Sefirah', 'Sefirot'],
    category: 'Cabala',
    definition: 'Cada uma das dez numerações ou emanações da Árvore da Vida. “Sephiroth” é uma forma plural usada em muitos textos ocidentais.',
  },
  {
    term: 'Sefirot belimah',
    aliases: ['sefirot belimah', 'sefirot de nada'],
    category: 'Sefer Yetzirah',
    definition: 'Expressão hebraica do Sefer Yetzirah para as dez Sephiroth “sem coisa” ou “de nada”, anterior às correspondências herméticas modernas.',
  },
  {
    term: 'Quinário',
    aliases: ['quinário', 'quinários', 'quinância', 'quinâncias'],
    category: 'Astrologia',
    definition: 'Divisão de cinco graus do zodíaco. No sistema dos 72 anjos, cada signo contém seis quinários.',
  },
  {
    term: 'Decanato',
    aliases: ['decanato', 'decanatos'],
    category: 'Astrologia',
    definition: 'Divisão de dez graus de um signo. Cada signo possui três decanatos, associados aqui a planetas e cartas numeradas do Tarot.',
  },
  {
    term: 'Gematria',
    aliases: ['gematria'],
    category: 'Língua hebraica',
    definition: 'Conjunto de métodos que atribuem valores numéricos às letras hebraicas para comparação e interpretação de palavras.',
  },
  {
    term: 'Mispar Hechrechi',
    aliases: ['Mispar Hechrechi'],
    category: 'Gematria',
    definition: 'Método padrão em que as letras recebem valores de 1 a 400, mantendo formas finais com o valor da letra comum.',
  },
  {
    term: 'Mispar Gadol',
    aliases: ['Mispar Gadol'],
    category: 'Gematria',
    definition: 'Método no qual as cinco formas finais podem receber os valores 500, 600, 700, 800 e 900.',
  },
  {
    term: 'Tríplice',
    aliases: ['tríplice', 'tríplices'],
    category: '72 nomes',
    definition: 'Grupo de três letras extraído da combinação tradicional dos versículos de Êxodo 14:19–21.',
  },
  {
    term: 'Coro angélico',
    aliases: ['coro', 'coros', 'coro angélico', 'coros angélicos'],
    category: 'Angelologia',
    definition: 'Ordem da hierarquia celeste. A ligação dos nove coros com Sephiroth e grupos de oito anjos é uma síntese posterior.',
  },
  {
    term: 'Arcanjo',
    aliases: ['arcanjo', 'arcanjos'],
    category: 'Angelologia',
    definition: 'Nome dado a mensageiros ou regentes angélicos de alta função; suas atribuições variam entre fontes religiosas e herméticas.',
  },
  {
    term: 'Polaridade',
    aliases: ['polaridade', 'polaridades'],
    category: 'Astrologia',
    definition: 'Classificação dos signos como ativos ou receptivos. Não descreve gênero, valor moral nem personalidade isoladamente.',
  },
  {
    term: 'Regência',
    aliases: ['regência', 'regente', 'regentes'],
    category: 'Astrologia',
    definition: 'Relação simbólica pela qual um planeta governa um signo, decanato, dia ou hora segundo uma tradição específica.',
  },
  {
    term: 'Dignidade',
    aliases: ['dignidade', 'dignidades', 'domicílio', 'exaltação', 'detrimento', 'queda'],
    category: 'Astrologia',
    definition: 'Condição tradicional que descreve maior familiaridade ou tensão na expressão de um planeta; não significa simplesmente bom ou mau.',
  },
  {
    term: 'Abismo',
    aliases: ['Abismo'],
    category: 'Cabala hermética',
    definition: 'Imagem do limiar entre a tríade superna e as esferas abaixo. Em sistemas herméticos, Daath costuma marcar essa passagem.',
  },
  {
    term: 'Arcano',
    aliases: ['arcano', 'arcanos', 'Arcano Maior', 'Arcanos Maiores'],
    category: 'Tarot',
    definition: 'Carta do Tarot. “Arcanos Maiores” designa o conjunto de 22 trunfos relacionado às letras hebraicas por escolas ocultistas modernas.',
  },
];

const aliases = glossaryEntries
  .flatMap((entry) => entry.aliases.map((alias) => ({ alias, entry })))
  .sort((a, b) => b.alias.length - a.alias.length);

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const glossaryPattern = new RegExp(
  `(${aliases.map(({ alias }) => escapeRegExp(alias)).join('|')})`,
  'giu',
);

export function findGlossaryEntry(value) {
  const normalized = String(value || '').toLocaleLowerCase('pt-BR');
  return aliases.find(({ alias }) => alias.toLocaleLowerCase('pt-BR') === normalized)?.entry || null;
}
