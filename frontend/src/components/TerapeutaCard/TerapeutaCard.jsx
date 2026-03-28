import "./TerapeutaCard.css";

function TerapeutaCard({ terapeuta, onVerPerfil }) {
  const { nome, especialidade, avaliacao, consultas, disponivel, foto, descricao } =
    terapeuta;

  return (
    <div className="t-card">
      <div className="t-card-topo">
        <img src={foto} alt={nome} className="t-card-foto" />
        <span
          className={`t-card-badge ${disponivel ? "disponivel" : "indisponivel"}`}
        >
          {disponivel ? "Disponível" : "Indisponível"}
        </span>
      </div>

      <div className="t-card-body">
        <h2 className="t-card-nome">{nome}</h2>
        <p className="t-card-especialidade">{especialidade}</p>
        <p className="t-card-descricao">{descricao}</p>

        <div className="t-card-stats">
          <span>⭐ {avaliacao}</span>
          <span>📅 {consultas} consultas</span>
        </div>
      </div>

      <button className="t-card-btn" onClick={onVerPerfil } disabled={!disponivel}>
        {disponivel ? "Ver Perfil" : "Indisponível"}
      </button>
    </div>
  );
}

export default TerapeutaCard;
