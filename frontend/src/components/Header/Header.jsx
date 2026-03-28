import "./Header.css";

function Header({ titulo, textoBotao, onBotaoClick }) {
  return (
    <header className="header">
      <h1 className="header-titulo">{titulo}</h1>

      {textoBotao && (
        <button className="header-btn" onClick={onBotaoClick}>
          {textoBotao}
        </button>
      )}
    </header>
  );
}

export default Header;
