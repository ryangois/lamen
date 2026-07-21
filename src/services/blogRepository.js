import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { sectionsFromBlocks } from '../data/articleBlocks';

const publicFields = 'id, slug, title, excerpt, content, category, tags, featured_letters, cover_image_url, cover_image_alt, seo_title, seo_description, reading_time, published_at, updated_at';

function mapPost(row) {
  if (!row) return null;
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

function toDatabase(post) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || '',
    content: post.content || [],
    status: post.status || 'draft',
    category: post.category || 'Kabbalah',
    tags: post.tags || [],
    featured_letters: post.featuredLetters || [],
    cover_image_url: post.coverImageUrl || null,
    cover_image_alt: post.coverImageAlt || null,
    seo_title: post.seoTitle || null,
    seo_description: post.description || null,
    reading_time: post.readingMinutes || 1,
    published_at: post.publishedAt || null,
  };
}

export async function fetchPublishedPosts() {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('blog_posts')
    .select(publicFields)
    .order('published_at', { ascending: false });
  if (error) throw error;
  return data.map(mapPost);
}

export async function fetchPublishedPost(slug) {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('blog_posts')
    .select(publicFields)
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return mapPost(data);
}

export async function signInAdmin(email, password) {
  if (!isSupabaseConfigured) throw new Error('Supabase ainda não foi configurado.');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOutAdmin() {
  if (supabase) await supabase.auth.signOut();
}

export async function getAdminSession() {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export function onAdminAuthChange(callback) {
  if (!isSupabaseConfigured) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
  return () => data.subscription.unsubscribe();
}

export async function fetchAdminProfile() {
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  const { data, error } = await supabase
    .from('blog_profiles')
    .select('id, display_name, role')
    .eq('id', authData.user.id)
    .single();
  if (error) throw error;
  if (!['author', 'editor', 'admin'].includes(data.role)) throw new Error('Este usuário não possui permissão editorial.');
  return data;
}

export async function fetchAdminPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data.map((row) => ({
    ...mapPost(row),
    status: row.status,
    authorId: row.author_id,
    createdAt: row.created_at,
  }));
}

export async function saveAdminPost(post, userId) {
  const payload = { ...toDatabase(post), author_id: post.authorId || userId };
  const query = post.id
    ? supabase.from('blog_posts').update(payload).eq('id', post.id)
    : supabase.from('blog_posts').insert(payload);
  const { data, error } = await query.select('*').single();
  if (error) throw error;
  return {
    ...mapPost(data),
    status: data.status,
    authorId: data.author_id,
    createdAt: data.created_at,
  };
}

export async function archiveAdminPost(postId) {
  const { error } = await supabase
    .from('blog_posts')
    .update({ status: 'archived' })
    .eq('id', postId);
  if (error) throw error;
}

export async function uploadBlogImage(file) {
  if (!file?.type?.startsWith('image/')) throw new Error('Escolha um arquivo de imagem.');
  if (file.size > 10 * 1024 * 1024) throw new Error('A imagem deve ter no máximo 10 MB.');
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from('blog-media').upload(path, file, {
    cacheControl: '31536000',
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;
  return supabase.storage.from('blog-media').getPublicUrl(path).data.publicUrl;
}

export { isSupabaseConfigured };
