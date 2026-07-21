export const blogPosts = [
  {
    slug: 'letras-hebraicas-sefer-yetzirah-kabbalah-hermetica',
    title: 'Por que as letras hebraicas possuem associações diferentes no Sefer Yetzirah e na Kabbalah Hermética?',
    excerpt: 'As correspondências variam porque o Sefer Yetzirah e a Kabbalah Hermética pertencem a contextos históricos, religiosos e operativos diferentes.',
    category: 'Kabbalah',
    tags: ['Letras hebraicas', 'Sefer Yetzirah', 'Árvore da Vida', 'Golden Dawn', 'Tarot', 'Cabala judaica', 'Qabalah Hermética'],
    publishedAt: '2026-07-20',
    readingTime: '22 min de leitura',
    description: 'Entenda por que as letras hebraicas recebem associações diferentes no Sefer Yetzirah e na Kabbalah Hermética, dos elementos ao Tarot e à Árvore da Vida.',
    featuredLetters: ['א', 'מ', 'ש'],
  },
];

export function getBlogPost(slug) {
  return blogPosts.find((post) => post.slug === slug) || null;
}
