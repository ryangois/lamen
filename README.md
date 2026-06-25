# Lamen

Roda hermética interativa construída com React, Vite e Canvas.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Validação

```bash
npm run lint
npm run build
npm audit
```

O build de produção:

- separa o painel e seu conteúdo em um chunk carregado sob demanda;
- hospeda as fontes localmente;
- gera versões Brotli (`.br`) e Gzip (`.gz`) dos arquivos de código;
- inclui `public/_headers` com cache longo para assets versionados.

O provedor de hospedagem precisa servir automaticamente os arquivos pré-comprimidos
quando o navegador enviar `Accept-Encoding: br` ou `gzip`. Plataformas que comprimem
assets automaticamente podem ignorar os arquivos pré-gerados.

## Utilitário de SVG

```bash
npm run optimize:svgs
```

Esse comando recalcula os `viewBox` dos símbolos em `public/assets/zodiac`.
