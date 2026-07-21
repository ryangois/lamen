import { useMemo, useState } from 'react';
import { calculateReadingTime, slugify, validateBlocks } from '../../data/articleBlocks';
import { createEmptyPost } from '../../data/adminPost';
import { uploadBlogImage } from '../../services/blogRepository';
import ArticleRenderer from '../blog/ArticleRenderer';
import BlockEditor from './BlockEditor';
import '../Blog.css';

export default function PostEditor({ initialPost, onSave, onCancel, saving }) {
  const [post, setPost] = useState(() => ({ ...createEmptyPost(), ...initialPost }));
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(null);
  const readingTime = useMemo(() => calculateReadingTime(post.content), [post.content]);

  const update = (patch) => setPost((current) => ({ ...current, ...patch }));
  const handleTitle = (title) => update({ title, slug: post.id ? post.slug : slugify(title), seoTitle: post.seoTitle || title });

  const handleUpload = async (file, blockId) => {
    if (!file) return;
    setUploading(blockId);
    setError('');
    try {
      const url = await uploadBlogImage(file);
      update({ content: post.content.map((block) => block.id === blockId ? { ...block, url } : block) });
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setUploading(null);
    }
  };

  const handleCoverUpload = async (file) => {
    if (!file) return;
    setUploading('cover');
    setError('');
    try {
      update({ coverImageUrl: await uploadBlogImage(file) });
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setUploading(null);
    }
  };

  const submit = async (status) => {
    const errors = validateBlocks(post.content);
    if (!post.title.trim()) errors.unshift('Informe o título.');
    if (!post.slug.trim()) errors.unshift('Informe o slug.');
    if (!post.excerpt.trim()) errors.push('Informe o resumo do card.');
    if (!post.description.trim()) errors.push('Informe a descrição de SEO.');
    if (status === 'published' && post.content.length === 0) errors.push('Adicione conteúdo antes de publicar.');
    if (status === 'scheduled' && (!post.publishedAt || new Date(post.publishedAt) <= new Date())) errors.push('Escolha uma data futura para agendar.');
    if (errors.length) {
      setError(errors.join(' '));
      return;
    }
    setError('');
    try {
      await onSave({
        ...post,
        status,
        readingMinutes: readingTime,
        publishedAt: status === 'published'
          ? (!post.publishedAt || new Date(post.publishedAt) > new Date() ? new Date().toISOString() : post.publishedAt)
          : post.publishedAt,
      });
    } catch (saveError) {
      setError(saveError.message || 'Não foi possível salvar o artigo.');
    }
  };

  return (
    <div className="admin-editor-page">
      <header className="admin-editor-header">
        <div><button type="button" className="admin-back" onClick={onCancel}>← Posts</button><span>{post.id ? 'Editar artigo' : 'Novo artigo'}</span><h1>{post.title || 'Artigo sem título'}</h1></div>
        <div className="admin-editor-actions">
          <button type="button" className="admin-secondary" disabled={saving} onClick={() => submit('draft')}>Salvar rascunho</button>
          <button type="button" className="admin-secondary" disabled={saving || !post.publishedAt} onClick={() => submit('scheduled')}>Agendar</button>
          <button type="button" disabled={saving} onClick={() => submit('published')}>{saving ? 'Salvando…' : 'Publicar'}</button>
        </div>
      </header>

      {error && <div className="admin-alert error" role="alert">{error}</div>}

      <div className="admin-editor-layout">
        <div className="admin-editor-form">
          <section className="admin-form-card">
            <span>Identidade do artigo</span>
            <label><b>Título</b><input value={post.title} onChange={(event) => handleTitle(event.target.value)} maxLength="180" /></label>
            <div className="admin-field-grid">
              <label><b>Slug</b><input value={post.slug} onChange={(event) => update({ slug: slugify(event.target.value) })} /></label>
              <label><b>Categoria</b><input value={post.category} onChange={(event) => update({ category: event.target.value })} /></label>
            </div>
            <label><b>Resumo do card</b><textarea rows="3" value={post.excerpt} onChange={(event) => update({ excerpt: event.target.value })} /></label>
            <div className="admin-field-grid">
              <label><b>Tags</b><input value={post.tags.join(', ')} onChange={(event) => update({ tags: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })} placeholder="Kabbalah, Tarot, História" /></label>
              <label><b>Letras em destaque</b><input value={post.featuredLetters.join(' ')} onChange={(event) => update({ featuredLetters: event.target.value.split(/\s+/).filter(Boolean) })} placeholder="א מ ש" /></label>
            </div>
          </section>

          <section className="admin-form-card">
            <span>Busca e compartilhamento</span>
            <label><b>Título SEO</b><input value={post.seoTitle} onChange={(event) => update({ seoTitle: event.target.value })} maxLength="70" /></label>
            <label><b>Descrição SEO</b><textarea rows="3" value={post.description} onChange={(event) => update({ description: event.target.value })} maxLength="180" /></label>
            <div className="admin-field-grid">
              <label><b>Publicar ou agendar em</b><input type="datetime-local" value={post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 16) : ''} onChange={(event) => update({ publishedAt: event.target.value ? new Date(event.target.value).toISOString() : null })} /></label>
              <label><b>Imagem de capa</b><input value={post.coverImageUrl} onChange={(event) => update({ coverImageUrl: event.target.value })} placeholder="URL ou envie abaixo" /></label>
            </div>
            <div className="admin-cover-tools">
              <label className="admin-upload-button">{uploading === 'cover' ? 'Enviando…' : 'Enviar capa'}<input type="file" accept="image/*" disabled={uploading === 'cover'} onChange={(event) => handleCoverUpload(event.target.files?.[0])} /></label>
              <label><b>Texto alternativo da capa</b><input value={post.coverImageAlt} onChange={(event) => update({ coverImageAlt: event.target.value })} /></label>
            </div>
            <small>{post.description.length}/180 caracteres · {readingTime} min de leitura calculados</small>
          </section>

          <BlockEditor blocks={post.content} onChange={(content) => update({ content })} onUploadImage={handleUpload} uploading={uploading} />
        </div>

        <aside className="admin-live-preview">
          <header><span>Pré-visualização</span><small>Mesmo renderer do blog</small></header>
          <div className="article-body admin-preview-body">
            <ArticleRenderer blocks={post.content} />
            {post.content.length === 0 && <div className="admin-preview-empty">O conteúdo aparecerá aqui.</div>}
          </div>
        </aside>
      </div>
    </div>
  );
}
