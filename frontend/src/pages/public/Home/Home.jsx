import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTerapeutas } from "../../../services/api";
import TerapeutaCard from "../../../components/TerapeutaCard/TerapeutaCard";
import "./Home.css";

function Home() {
  const [terapeutas, setTerapeutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregar() {
      const dados = await getTerapeutas();
      setTerapeutas(dados);
      setLoading(false);
    }
    carregar();
  }, []);

  return (
    <div className="home">
      <header className="home-header">
        <h1>🧠 MindCare</h1>
      </header>

      <section className="home-hero">
        <h2>Cuide da sua mente</h2>
        <p>Encontre um terapeuta e agende sua consulta.</p>
      </section>

      <section className="home-lista">
        {loading && <p className="home-loading">Carregando...</p>}

        {!loading && terapeutas.length === 0 && (
          <p className="home-vazio">Nenhum terapeuta encontrado.</p>
        )}

        <div className="home-grid">
          {terapeutas.map((t) => (
            <TerapeutaCard
              key={t.id}
              terapeuta={t}
              onVerPerfil={() => navigate(`/terapeuta/${t.id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
