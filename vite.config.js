import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  // A integração oficial Supabase/Vercel cria variáveis NEXT_PUBLIC_.
  // Estes nomes expõem somente a URL e as chaves públicas ao navegador.
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  plugins: [
    react(),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
  ],
  build: {
    target: 'es2020',
    cssMinify: 'lightningcss',
  },
})
