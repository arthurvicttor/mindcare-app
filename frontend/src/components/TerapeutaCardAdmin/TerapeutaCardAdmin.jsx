import "./TerapeutaCardAdmin.css";

function TerapeutaCardAdmin({ terapeuta, onEditar, onDeletar }) {
  const {
    nome,
    especialidade,
    crp,
    avaliacao,
    consultas,
    disponivel,
    foto,
  } = terapeuta;

  return (
    <div className="ta-card">
      <div className="ta-card-topo">
        <img src={foto} alt={nome} className="ta-card-foto" />

        <div className="ta-card-info">
          <h2 className="ta-card-nome">{nome}</h2>
          <p className="ta-card-crp">CRP: {crp}</p>
          <p className="ta-card-especialidade">{especialidade}</p>
          <span
            className={`t-card-badge ${disponivel ? "disponivel" : "indisponivel"}`}
          >
            {disponivel ? "Disponível" : "Indisponível"}
          </span>
        </div>
      </div>
      <div className="ta-card-middle">
    
        <div className="ta-card-stats">
          <span>⭐ {avaliacao}</span>
          <span>📅 {consultas} consultas</span>
        </div>
      </div>

      <div className="ta-card-acoes">
        <button className="ta-btn-editar" onClick={onEditar}>
          Editar
        </button>
        <button className="ta-btn-deletar" onClick={onDeletar}>
          Remover
        </button>
      </div>
    </div>
  );
}

export default TerapeutaCardAdmin;
