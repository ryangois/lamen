import { useRef } from 'react';
import { useDialogFocus } from '../hooks/useDialogFocus';
import './HelpModal.css';

const tutorialSections = [
  {
    icon: '⌕',
    title: 'Buscar',
    text: 'Pesquise nomes, hebraico, transliterações, Salmos, gematria, Tarot e correspondências. Use as sugestões para abrir uma ficha diretamente.',
  },
  {
    icon: '◎',
    title: 'Lâmen: Roda',
    text: 'Explore o mapa hermético visual e toque em qualquer setor. No celular, arraste e use a pinça; no computador, arraste e use a roda do mouse.',
  },
  {
    icon: '☷',
    title: 'Lâmen: Lista',
    text: 'Consulte o mesmo acervo como catálogo pesquisável, com filtros e acesso rápido a anjos, signos, planetas, coros e demais categorias.',
  },
  {
    icon: '✦',
    title: 'Árvore da Vida',
    text: 'Abra as dez Sephiroth, Daath e os 22 caminhos. Consulte cores, hebraico, gematria, Quatro Mundos, Tarot, fontes e versões do Sefer Yetzirah.',
  },
  {
    icon: 'אב',
    title: '231 Portais',
    text: 'No laboratório da Árvore, combine duas das 22 letras hebraicas e compare o portal direto, a inversão, os valores e os caminhos relacionados.',
  },
  {
    icon: '✺',
    title: 'Oráculo',
    text: 'Faça uma consulta simples ou uma tríade. Cada resultado pode ser aberto como ficha para aprofundar seus símbolos e correspondências.',
  },
  {
    icon: '✧',
    title: 'Meu anjo',
    text: 'Informe signo e grau para localizar um dos 72 quinários. O resultado mostra o anjo correspondente e permite abrir sua ficha completa.',
  },
  {
    icon: '◫',
    title: 'Fichas enciclopédicas',
    text: 'Navegue por Estudo, Relações, Prática e Fontes. As abas disponíveis mudam conforme o item e podem incluir Salmo, gematria, hebraico, Tarot e proveniência.',
  },
  {
    icon: '⇄',
    title: 'Comparar e estudar',
    text: 'Compare símbolos relacionados, use o estudo focado para reduzir distrações, avance entre fichas e registre notas privadas no navegador.',
  },
  {
    icon: '◈',
    title: 'Estudo',
    text: 'Siga uma trilha guiada em sete módulos. O progresso fica salvo neste dispositivo para que você possa retomar de onde parou.',
  },
  {
    icon: '★',
    title: 'Salvos',
    text: 'Crie coleções, consulte o histórico e compartilhe conjuntos. Exporte ou importe um backup de favoritos, coleções, progresso, histórico e notas.',
  },
  {
    icon: '↧',
    title: 'Instalar',
    text: 'Quando disponível, use “Instalar Lâmen” no menu para acessar o site como aplicativo. Seus dados continuam armazenados localmente no navegador.',
  },
];

export default function HelpModal({ onClose }) {
  const modalRef = useRef(null);
  useDialogFocus(modalRef, true);

  return (
    <div className="help-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        ref={modalRef}
        className="help-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-title"
        tabIndex="-1"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="help-heading">
          <div>
            <p className="help-eyebrow">Tutorial</p>
            <h2 className="brand-font" id="help-title">Como usar o Lâmen</h2>
            <p>Um guia para explorar o mapa, pesquisar correspondências e organizar seus estudos.</p>
          </div>
          <button type="button" className="help-close" onClick={onClose} aria-label="Fechar tutorial">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.5 6.5l11 11m0-11-11 11" />
            </svg>
          </button>
        </header>

        <div className="help-steps">
          {tutorialSections.map((section, index) => (
            <article key={section.title}>
              <div className="help-step-topline">
                <span aria-hidden="true">{section.icon}</span>
                <small>{String(index + 1).padStart(2, '0')}</small>
              </div>
              <h3>{section.title}</h3>
              <p>{section.text}</p>
            </article>
          ))}
        </div>

        <p className="help-note">
          <strong>Dica:</strong> pressione <kbd>/</kbd> para abrir a busca. Quando uma ficha estiver aberta,
          a URL aponta diretamente para ela e pode ser compartilhada. Todo conteúdo salvo por você permanece
          somente neste navegador, salvo quando você exporta ou compartilha algo.
        </p>
      </section>
    </div>
  );
}
