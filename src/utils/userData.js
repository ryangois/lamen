const COLLECTIONS_KEY = 'lamen-favorite-collections';
const RECENT_KEY = 'lamen-recent';
const FAVORITES_KEY = 'lamen-favorites';
const STUDY_KEY = 'lamen-study-progress';
const VIEW_KEY = 'lamen-view';
const NOTE_PREFIX = 'lamen-note:';

function readJson(key, fallback) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || '');
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function sanitizeCollections(value) {
  const collections = Array.isArray(value) ? value : [];
  const clean = collections
    .filter((collection) => collection && typeof collection.id === 'string' && typeof collection.name === 'string')
    .slice(0, 100)
    .map((collection) => ({
      id: collection.id.slice(0, 80),
      name: collection.name.trim().slice(0, 36) || 'Coleção',
      itemIds: [...new Set(Array.isArray(collection.itemIds) ? collection.itemIds.filter((id) => typeof id === 'string') : [])]
        .slice(0, 1000),
    }));

  if (!clean.some((collection) => collection.id === 'favorites')) {
    clean.unshift({ id: 'favorites', name: 'Favoritos', itemIds: [] });
  }
  return clean;
}

function sanitizeRecent(value) {
  return (Array.isArray(value) ? value : [])
    .map((entry) => (
      typeof entry === 'string'
        ? { id: entry, viewedAt: Date.now() }
        : entry
    ))
    .filter((entry) => entry && typeof entry.id === 'string')
    .slice(0, 100)
    .map((entry) => ({
      id: entry.id,
      viewedAt: Number.isFinite(entry.viewedAt) ? entry.viewedAt : Date.now(),
    }));
}

function collectNotes() {
  return Object.fromEntries(
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith(NOTE_PREFIX))
      .map((key) => [key.slice(NOTE_PREFIX.length), window.localStorage.getItem(key) || '']),
  );
}

export function createUserDataBackup() {
  return {
    format: 'lamen-backup',
    version: 1,
    exportedAt: new Date().toISOString(),
    collections: sanitizeCollections(readJson(COLLECTIONS_KEY, [])),
    recentEntries: sanitizeRecent(readJson(RECENT_KEY, [])),
    studyProgress: readJson(STUDY_KEY, {}),
    notes: collectNotes(),
    preferences: {
      view: window.localStorage.getItem(VIEW_KEY) || 'wheel',
    },
  };
}

export function downloadUserDataBackup() {
  const backup = createUserDataBackup();
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `lamen-backup-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function importUserDataBackup(file) {
  if (!file || file.size > 5_000_000) throw new Error('Arquivo de backup inválido ou muito grande.');
  const backup = JSON.parse(await file.text());
  if (backup?.format !== 'lamen-backup' || backup?.version !== 1) {
    throw new Error('Este arquivo não é um backup compatível do Lâmen.');
  }

  const collections = sanitizeCollections(backup.collections);
  const recentEntries = sanitizeRecent(backup.recentEntries);
  const favorites = [...new Set(collections.flatMap((collection) => collection.itemIds))];

  window.localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
  window.localStorage.setItem(RECENT_KEY, JSON.stringify(recentEntries));
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  window.localStorage.setItem(STUDY_KEY, JSON.stringify(backup.studyProgress || {}));

  if (['wheel', 'list', 'tree', 'oracle'].includes(backup.preferences?.view)) {
    window.localStorage.setItem(VIEW_KEY, backup.preferences.view);
  }

  Object.entries(backup.notes || {})
    .filter(([id, value]) => typeof id === 'string' && typeof value === 'string')
    .slice(0, 2000)
    .forEach(([id, value]) => {
      window.localStorage.setItem(`${NOTE_PREFIX}${id.slice(0, 120)}`, value.slice(0, 20000));
    });

  return { collections, recentEntries };
}
