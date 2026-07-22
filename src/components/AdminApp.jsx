import { useEffect, useState } from 'react';
import {
  archiveAdminPost,
  fetchAdminPosts,
  fetchAdminProfile,
  getAdminSession,
  isSupabaseConfigured,
  onAdminAuthChange,
  saveAdminPost,
  signInAdmin,
  signInAdminWithMagicLink,
  signOutAdmin,
} from '../services/blogRepository';
import { createEmptyPost } from '../data/adminPost';
import PostEditor from './admin/PostEditor';
import './Admin.css';

function SetupRequired() {
  return (
    <main className="admin-gate">
      <section className="admin-gate-card">
        <span className="admin-mark">א</span>
        <p className="admin-eyebrow">Configuração necessária</p>
        <h1>Conecte o Supabase</h1>
        <p>O código do admin está pronto, mas as variáveis públicas do projeto ainda não foram configuradas.</p>
        <ol><li>Crie o projeto no Supabase.</li><li>Execute a migration em <code>supabase/migrations</code>.</li><li>Copie <code>.env.example</code> para <code>.env.local</code>.</li><li>Preencha URL e chave publicável.</li><li>Reinicie o servidor.</li></ol>
        <a href="https://github.com/ryangois/lamen/blob/main/ADMIN-SUPABASE.md" target="_blank" rel="noreferrer">Abrir guia de configuração</a>
        <a className="admin-muted-link" href="/">Voltar ao Hermetika</a>
      </section>
    </main>
  );
}

function Login({ onLogin, onMagicLink, loading, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const requestMagicLink = async () => {
    setMagicLinkSent(false);
    const sent = await onMagicLink(email);
    if (sent) setMagicLinkSent(true);
  };

  return (
    <main className="admin-gate">
      <form className="admin-gate-card" onSubmit={(event) => { event.preventDefault(); onLogin(email, password); }}>
        <span className="admin-mark">א</span>
        <p className="admin-eyebrow">Hermetika Editorial</p>
        <h1>Entrar no admin</h1>
        <label><span>E-mail</span><input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <label><span>Senha</span><input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
        {error && <div className="admin-alert error" role="alert">{error}</div>}
        {magicLinkSent && <div className="admin-alert success" role="status">Link enviado. Abra o e-mail neste dispositivo para entrar sem senha.</div>}
        <button type="submit" disabled={loading}>{loading ? 'Entrando…' : 'Entrar'}</button>
        <div className="admin-login-divider"><span>ou</span></div>
        <button type="button" className="admin-secondary" disabled={loading || !email} onClick={requestMagicLink}>Enviar link de acesso</button>
        <p className="admin-login-hint">O link mágico usa o mesmo e-mail cadastrado no Supabase e dispensa a senha.</p>
        <a className="admin-muted-link" href="/">Voltar ao Hermetika</a>
      </form>
    </main>
  );
}

function PostList({ posts, profile, onNew, onEdit, onArchive, onReload, onLogout, loading, notice }) {
  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <a href="/" className="admin-brand"><span>א</span><div><b>HERMETIKA</b><small>Editorial</small></div></a>
        <div><span>{profile.display_name || 'Editor'} · {profile.role}</span><button type="button" className="admin-ghost" onClick={onLogout}>Sair</button></div>
      </header>
      <section className="admin-dashboard">
        <header className="admin-dashboard-heading"><div><span>Conteúdo</span><h1>Posts do blog</h1><p>Rascunhos, publicações e artigos agendados.</p></div><button type="button" onClick={onNew}>+ Novo artigo</button></header>
        {notice && <div className="admin-alert success">{notice}</div>}
        <div className="admin-list-toolbar"><b>{posts.length} artigos</b><button type="button" className="admin-secondary" onClick={onReload} disabled={loading}>Atualizar</button></div>
        <div className="admin-post-list">
          {posts.length === 0 && !loading && <div className="admin-empty-blocks"><b>Nenhum artigo no banco.</b><p>Os artigos estáticos continuam visíveis no blog. Crie o primeiro post pelo admin.</p></div>}
          {posts.map((post) => (
            <article key={post.id}>
              <div><span className={`admin-status ${post.status}`}>{post.status}</span><h2>{post.title}</h2><p>/blog/{post.slug}</p></div>
              <div className="admin-post-meta"><span>{post.category}</span><span>{post.readingTime}</span><span>{post.updatedAt ? new Date(post.updatedAt).toLocaleDateString('pt-BR') : ''}</span></div>
              <div className="admin-post-actions"><button type="button" className="admin-secondary" onClick={() => onEdit(post)}>Editar</button><a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">Visualizar</a>{post.status !== 'archived' && <button type="button" className="admin-ghost danger" onClick={() => onArchive(post)}>Arquivar</button>}</div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function AdminApp() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const loadDashboard = async () => {
    setLoading(true);
    setError('');
    try {
      const [nextProfile, nextPosts] = await Promise.all([fetchAdminProfile(), fetchAdminPosts()]);
      setProfile(nextProfile);
      setPosts(nextPosts);
    } catch (loadError) {
      setError(loadError.message);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured) { setLoading(false); return undefined; }
    getAdminSession().then((nextSession) => { setSession(nextSession); setLoading(false); }).catch((nextError) => { setError(nextError.message); setLoading(false); });
    return onAdminAuthChange(setSession);
  }, []);

  useEffect(() => { if (session) loadDashboard(); else { setProfile(null); setPosts([]); } }, [session]);

  if (!isSupabaseConfigured) return <SetupRequired />;
  if (!session) return <Login loading={loading} error={error} onLogin={async (email, password) => { setLoading(true); setError(''); try { const data = await signInAdmin(email, password); setSession(data.session); } catch (loginError) { setError(loginError.message); } finally { setLoading(false); } }} onMagicLink={async (email) => { setLoading(true); setError(''); try { await signInAdminWithMagicLink(email); return true; } catch (magicLinkError) { setError(magicLinkError.message); return false; } finally { setLoading(false); } }} />;
  if (editing) return <PostEditor initialPost={editing} saving={loading} onCancel={() => setEditing(null)} onSave={async (post) => { setLoading(true); setError(''); try { const saved = await saveAdminPost(post, session.user.id); setNotice(saved.status === 'published' ? 'Artigo publicado.' : 'Rascunho salvo.'); setEditing(null); await loadDashboard(); } catch (saveError) { setError(saveError.message); throw saveError; } finally { setLoading(false); } }} />;
  if (!profile && error) return <main className="admin-gate"><section className="admin-gate-card"><span className="admin-mark">!</span><h1>Acesso não autorizado</h1><div className="admin-alert error">{error}</div><p>Confirme se o usuário recebeu o papel <code>admin</code>, <code>editor</code> ou <code>author</code> no Supabase.</p><button type="button" onClick={() => signOutAdmin()}>Sair</button></section></main>;
  if (!profile) return <main className="admin-gate"><div className="view-loading">Carregando admin…</div></main>;

  return <PostList posts={posts} profile={profile} loading={loading} notice={notice} onNew={() => setEditing(createEmptyPost())} onEdit={setEditing} onReload={loadDashboard} onLogout={() => signOutAdmin()} onArchive={async (post) => { if (!window.confirm(`Arquivar “${post.title}”?`)) return; try { await archiveAdminPost(post.id); setNotice('Artigo arquivado.'); await loadDashboard(); } catch (archiveError) { setError(archiveError.message); } }} />;
}
