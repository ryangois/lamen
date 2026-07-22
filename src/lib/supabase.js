import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL
  || import.meta.env.VITE_SUPABASE_URL
)?.trim();

const supabaseAnonKey = (
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  || import.meta.env.VITE_SUPABASE_ANON_KEY
)?.trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl
  && supabaseAnonKey
  && !supabaseUrl.includes('SEU-PROJETO')
  && !supabaseAnonKey.includes('SUA_CHAVE'),
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
