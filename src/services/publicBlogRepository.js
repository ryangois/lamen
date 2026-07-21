import { sectionsFromBlocks } from '../data/articleBlocks';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
const configured = Boolean(
  supabaseUrl
  && supabaseAnonKey
  && !supabaseUrl.includes('SEU-PROJETO')
  && !supabaseAnonKey.includes('SUA_CHAVE'),
);

function mapPost(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || '',
    content: row.content || [],
    category: row.category || 'Kabbalah',
    tags: row.tags || [],
    featuredLetters: row.featured_letters || [],
    coverImageUrl: row.cover_image_url || '',
    coverImageAlt: row.cover_image_alt || '',
    seoTitle: row.seo_title || '',
    description: row.seo_description || row.excerpt || '',
    readingMinutes: row.reading_time || 1,
    readingTime: `${row.reading_time || 1} min de leitura`,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    sections: sectionsFromBlocks(row.content || []),
    source: 'supabase',
  };
}

export async function fetchPublishedPosts() {
  if (!configured) return [];
  const fields = 'id,slug,title,excerpt,content,category,tags,featured_letters,cover_image_url,cover_image_alt,seo_title,seo_description,reading_time,published_at,updated_at';
  const endpoint = new URL(`${supabaseUrl}/rest/v1/blog_posts`);
  endpoint.searchParams.set('select', fields);
  endpoint.searchParams.set('order', 'published_at.desc');
  const response = await fetch(endpoint, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
  });
  if (!response.ok) throw new Error(`Não foi possível carregar o CMS (${response.status}).`);
  return (await response.json()).map(mapPost);
}

