import "./TerapeutaCard.css";

function TerapeutaCard({ terapeuta, onEditar, onDeletar }) {
  const { nome, especialidade, crp, avaliacao, consultas, disponivel, foto } =
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

      <div className="t-card-info">
        <h2 className="t-card-nome">{nome}</h2>
        <p className="t-card-especialidade">{especialidade}</p>
        <p className="t-card-crp">CRP {crp}</p>

        <div className="t-card-stats">
          <span>⭐ {avaliacao}</span>
          <span>📅 {consultas} consultas</span>
        </div>
      </div>

      <div className="t-card-acoes">
        <button className="btn-editar" onClick={onEditar}>
          Editar
        </button>
        <button className="btn-deletar" onClick={onDeletar}>
          Remover
        </button>
      </div>
    </div>
  );
}

export default TerapeutaCard;
