import "./TerapeutaCard.css";

function TerapeutaCard({ terapeuta, onVerPerfil }) {
  const { nome, especialidade, avaliacao, consultas, disponivel, foto, descricao } = terapeuta;

  return (
    <div className="t-card">
      <div className="t-card-topo">
        <div className="t-card-foto-wrapper">
          <img src={foto} alt={nome} className="t-card-foto" />
          {disponivel && (
            <span className="t-card-check">✓</span>
          )}
        </div>

        <div className="t-card-info">
          <h2 className="t-card-nome">{nome}</h2>
          <p className="t-card-especialidade">{especialidade}</p>
          <p className="t-card-descricao">{descricao}</p>
          <div className="t-card-avaliacao">
            {'★'.repeat(Math.round(avaliacao))}{'☆'.repeat(5 - Math.round(avaliacao))}
            <span className="t-card-opinoes">{consultas} consultas</span>
          </div>
        </div>
      </div>

      <div className="t-card-rodape">
        <button
          className="t-card-btn"
          onClick={onVerPerfil}
          disabled={!disponivel}
        >
          {disponivel ? 'Ver perfil' : 'Indisponível'}
        </button>
      </div>
    </div>
  );
}

export default TerapeutaCard;