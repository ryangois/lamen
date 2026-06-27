import './HelpModal.css';

export default function HelpModal({ onClose }) {
  return (
    <div className="help-backdrop" role="presentation">
      <section className="help-modal" role="dialog" aria-modal="true" aria-labelledby="help-title">
        <button type="button" className="help-close" onClick={onClose} aria-label="Fechar ajuda">&times;</button>
        <p className="help-eyebrow">Guia rápido</p>
        <h2 className="brand-font" id="help-title">Como usar o Lamen</h2>

        <div className="help-steps">
          <article>
            <span>◎</span>
            <h3>Roda</h3>
            <p>Arraste para girar. Use a roda do mouse ou pinça no celular para aproximar os anéis.</p>
          </article>
          <article>
            <span>☷</span>
            <h3>Lista</h3>
            <p>Use a lista para buscar nomes, planetas, signos, coros, salmos e correspondências.</p>
          </article>
          <article>
            <span>✦</span>
            <h3>Meu anjo</h3>
            <p>Calcule por data aproximada ou informe signo e grau para uma correspondência mais precisa.</p>
          </article>
          <article>
            <span>★</span>
            <h3>Salvos</h3>
            <p>Toque na estrela dentro de uma ficha para guardar favoritos e retomar estudos depois.</p>
          </article>
        </div>

        <p className="help-note">
          Dica: quando uma ficha está aberta, o link da página já aponta diretamente para ela.
          Copie a URL para compartilhar um anjo, signo, esfera ou planeta específico.
        </p>
      </section>
    </div>
  );
}
