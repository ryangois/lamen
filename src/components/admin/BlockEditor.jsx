import { useState } from 'react';
import { BLOCK_TYPES, createBlock, parseArticleText, slugify } from '../../data/articleBlocks';

function TextArea({ value, onChange, rows = 4, placeholder = '' }) {
  return <textarea value={value || ''} onChange={(event) => onChange(event.target.value)} rows={rows} placeholder={placeholder} />;
}

function BlockFields({ block, onChange, onUploadImage, uploading }) {
  if (['lead', 'paragraph', 'quote'].includes(block.type)) {
    return <TextArea value={block.text} onChange={(text) => onChange({ text })} rows={block.type === 'paragraph' ? 6 : 4} placeholder="Escreva o conteúdo…" />;
  }
  if (block.type === 'heading') {
    return (
      <div className="admin-field-grid">
        <label><span>Título</span><input value={block.text || ''} onChange={(event) => onChange({ text: event.target.value, anchor: slugify(event.target.value) })} /></label>
        <label><span>Âncora</span><input value={block.anchor || ''} onChange={(event) => onChange({ anchor: slugify(event.target.value) })} /></label>
      </div>
    );
  }
  if (block.type === 'list') {
    return (
      <>
        <label className="admin-inline-check"><input type="checkbox" checked={Boolean(block.ordered)} onChange={(event) => onChange({ ordered: event.target.checked })} /> Lista numerada</label>
        <TextArea value={(block.items || []).join('\n')} onChange={(value) => onChange({ items: value.split('\n').filter(Boolean) })} rows={6} placeholder="Um item por linha" />
      </>
    );
  }
  if (block.type === 'formula' || block.type === 'timeline') {
    return <TextArea value={(block.items || []).join('\n')} onChange={(value) => onChange({ items: value.split('\n').filter(Boolean) })} rows={5} placeholder="Uma etapa por linha" />;
  }
  if (block.type === 'table') {
    return (
      <div className="admin-field-stack">
        <label><span>Cabeçalhos separados por |</span><input value={(block.headers || []).join(' | ')} onChange={(event) => onChange({ headers: event.target.value.split('|').map((item) => item.trim()) })} /></label>
        <label><span>Linhas — uma por linha, colunas separadas por |</span><TextArea value={(block.rows || []).map((row) => row.join(' | ')).join('\n')} onChange={(value) => onChange({ rows: value.split('\n').filter(Boolean).map((row) => row.split('|').map((item) => item.trim())) })} rows={7} /></label>
      </div>
    );
  }
  if (block.type === 'cards') {
    return <TextArea value={(block.items || []).map((item) => `${item.title} | ${item.text}`).join('\n')} onChange={(value) => onChange({ items: value.split('\n').filter(Boolean).map((line) => { const [title, ...text] = line.split('|'); return { title: title.trim(), text: text.join('|').trim() }; }) })} rows={8} placeholder="Título | Explicação — um card por linha" />;
  }
  if (block.type === 'hebrew') {
    return (
      <div className="admin-field-grid three">
        <label><span>Hebraico</span><input dir="rtl" value={block.hebrew || ''} onChange={(event) => onChange({ hebrew: event.target.value })} /></label>
        <label><span>Transliteração</span><input value={block.transliteration || ''} onChange={(event) => onChange({ transliteration: event.target.value })} /></label>
        <label><span>Significado</span><input value={block.meaning || ''} onChange={(event) => onChange({ meaning: event.target.value })} /></label>
      </div>
    );
  }
  if (block.type === 'image') {
    return (
      <div className="admin-field-stack">
        <label><span>URL</span><input value={block.url || ''} onChange={(event) => onChange({ url: event.target.value })} /></label>
        <label className="admin-upload-button">{uploading ? 'Enviando…' : 'Enviar imagem'}<input type="file" accept="image/*" disabled={uploading} onChange={(event) => onUploadImage(event.target.files?.[0], block.id)} /></label>
        <div className="admin-field-grid">
          <label><span>Texto alternativo</span><input value={block.alt || ''} onChange={(event) => onChange({ alt: event.target.value })} /></label>
          <label><span>Crédito</span><input value={block.credit || ''} onChange={(event) => onChange({ credit: event.target.value })} /></label>
        </div>
        <label><span>Legenda</span><input value={block.caption || ''} onChange={(event) => onChange({ caption: event.target.value })} /></label>
      </div>
    );
  }
  if (block.type === 'references') {
    return <TextArea value={(block.items || []).map((item) => `${item.label} | ${item.url}`).join('\n')} onChange={(value) => onChange({ items: value.split('\n').filter(Boolean).map((line) => { const [label, ...url] = line.split('|'); return { label: label.trim(), url: url.join('|').trim() }; }) })} rows={7} placeholder="Nome da fonte | https://endereco" />;
  }
  return null;
}

export default function BlockEditor({ blocks, onChange, onUploadImage, uploading }) {
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState('');

  const updateBlock = (id, patch) => onChange(blocks.map((block) => block.id === id ? { ...block, ...patch } : block));
  const moveBlock = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const importArticle = () => {
    const parsed = parseArticleText(importText);
    if (!parsed.length) return;
    onChange(blocks.length ? [...blocks, ...parsed] : parsed);
    setImportText('');
    setImportOpen(false);
  };

  return (
    <section className="block-editor" aria-labelledby="block-editor-title">
      <header>
        <div><span>Conteúdo estruturado</span><h2 id="block-editor-title">Blocos do artigo</h2></div>
        <button type="button" className="admin-secondary" onClick={() => setImportOpen((current) => !current)}>Importar texto</button>
      </header>

      {importOpen && (
        <div className="admin-import-panel">
          <p>Cole o artigo. Títulos iniciados por <code>##</code>, listas com <code>-</code> e citações com <code>&gt;</code> serão reconhecidos.</p>
          <TextArea value={importText} onChange={setImportText} rows={12} placeholder="Cole o texto completo aqui…" />
          <div><button type="button" onClick={importArticle}>Converter em blocos</button><button type="button" className="admin-ghost" onClick={() => setImportOpen(false)}>Cancelar</button></div>
        </div>
      )}

      <div className="admin-block-toolbar">
        {BLOCK_TYPES.map(([type, label]) => <button type="button" key={type} onClick={() => onChange([...blocks, createBlock(type)])}>+ {label}</button>)}
      </div>

      <div className="admin-block-list">
        {blocks.length === 0 && <div className="admin-empty-blocks"><b>O artigo ainda está vazio.</b><p>Importe um texto ou escolha um bloco acima.</p></div>}
        {blocks.map((block, index) => (
          <article className="admin-content-block" key={block.id}>
            <header>
              <select value={block.type} onChange={(event) => onChange(blocks.map((item) => item.id === block.id ? createBlock(event.target.value) : item))}>
                {BLOCK_TYPES.map(([type, label]) => <option value={type} key={type}>{label}</option>)}
              </select>
              <div>
                <button type="button" aria-label="Mover bloco para cima" disabled={index === 0} onClick={() => moveBlock(index, -1)}>↑</button>
                <button type="button" aria-label="Mover bloco para baixo" disabled={index === blocks.length - 1} onClick={() => moveBlock(index, 1)}>↓</button>
                <button type="button" aria-label="Duplicar bloco" onClick={() => onChange([...blocks.slice(0, index + 1), { ...block, id: createBlock(block.type).id }, ...blocks.slice(index + 1)])}>⧉</button>
                <button type="button" className="danger" aria-label="Excluir bloco" onClick={() => onChange(blocks.filter((item) => item.id !== block.id))}>×</button>
              </div>
            </header>
            <BlockFields block={block} onChange={(patch) => updateBlock(block.id, patch)} onUploadImage={onUploadImage} uploading={uploading === block.id} />
          </article>
        ))}
      </div>
    </section>
  );
}
