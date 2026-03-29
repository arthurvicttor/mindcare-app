import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTerapeutas, deleteTerapeuta } from "../../../services/api";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import TerapeutaCardAdmin from "../../../components/TerapeutaCardAdmin/TerapeutaCardAdmin";
import "./TerapeutasList.css";

function TerapeutasList() {
  const [terapeutas, setTerapeutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    carregarTerapeutas();
  }, []);

  async function carregarTerapeutas() {
    setLoading(true);
    const dados = await getTerapeutas();
    setTerapeutas(dados);
    setLoading(false);
  }

  async function handleDeletar(id) {
    const confirmar = window.confirm("Remover este terapeuta?");
    if (!confirmar) return;
    await deleteTerapeuta(id);
    setTerapeutas((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="lista-container">
      <HeaderAdmin
        titulo="🧠 MindCare"
        textoBotao="+ Novo Terapeuta"
        onBotaoClick={() => navigate("/terapeutas/novo")}
      />

      {loading && <p className="loading">Carregando...</p>}

      <div className="cards-grid">
        {terapeutas.map((t) => (
          <TerapeutaCardAdmin
            key={t.id}
            terapeuta={t}
            onEditar={() => navigate(`/terapeutas/editar/${t.id}`)}
            onDeletar={() => handleDeletar(t.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default TerapeutasList;
