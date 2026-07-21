import { lazy, Suspense } from 'react';
import App from './App.jsx';

const AdminApp = lazy(() => import('./components/AdminApp.jsx'));

export default function RootApp() {
  const isAdminRoute = window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/');
  if (!isAdminRoute) return <App />;
  return (
    <Suspense fallback={<div className="view-loading">Carregando admin…</div>}>
      <AdminApp />
    </Suspense>
  );
}

