import './HeroIntro.css';

export default function HeroIntro({ onExploreWheel, onExploreList, onOpenAngelFinder }) {
  return (
    <section className="hero-intro" aria-labelledby="hero-title">
      <p className="hero-eyebrow">Lamen hermético interativo</p>
      <h1 className="brand-font" id="hero-title">72 anjos, signos, esferas e planetas em um só mapa</h1>
      <p>
        Explore a roda como um talismã visual ou use a lista como uma enciclopédia pesquisável
        de correspondências herméticas.
      </p>
      <div className="hero-actions">
        <button type="button" onClick={onExploreWheel}>Entrar na roda</button>
        <button type="button" onClick={onExploreList}>Explorar em lista</button>
        <button type="button" onClick={onOpenAngelFinder}>Descobrir meu anjo</button>
      </div>
    </section>
  );
}
