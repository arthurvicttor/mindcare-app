import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTerapeutas,
  getEstados,
  getCidadesPorEstado,
} from "../../../services/api";
import TerapeutaCard from "../../../components/TerapeutaCard/TerapeutaCard";
import "./Home.css";

function Home() {
  const [terapeutas, setTerapeutas] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [busca, setBusca] = useState("");
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  // Carrega terapeutas e estados
  useEffect(() => {
    async function carregar() {
      const dados = await getTerapeutas();
      setTerapeutas(dados);
      setFiltrados(dados);
      setLoading(false);
    }
    async function carregarEstados() {
      const dados = await getEstados();
      setEstados(dados);
    }
    carregar();
    carregarEstados();
  }, []);

  // Carrega cidades
  useEffect(() => {
    if (!estadoSelecionado) {
      setCidades([]);
      setCidadeSelecionada("");
      return;
    }
    async function carregarCidades() {
      const dados = await getCidadesPorEstado(estadoSelecionado);
      setCidades(dados);
      setCidadeSelecionada("");
    }
    carregarCidades();
  }, [estadoSelecionado]);

  // Aplica os filtros
  useEffect(() => {
    let resultado = terapeutas;

    if (busca.trim()) {
      const termo = busca.toLowerCase();
      resultado = resultado.filter(
        (t) =>
          t.nome.toLowerCase().includes(termo) ||
          t.especialidade.toLowerCase().includes(termo),
      );
    }

    if (estadoSelecionado) {
      resultado = resultado.filter((t) => t.estado === estadoSelecionado);
    }

    if (cidadeSelecionada) {
      resultado = resultado.filter((t) => t.cidade === cidadeSelecionada);
    }

    setFiltrados(resultado);
  }, [busca, estadoSelecionado, cidadeSelecionada, terapeutas]);

  function handlePesquisar(e) {
    e.preventDefault();
  }

  return (
    <div className="home">
      <header className="home-header">
        <div className="logo-section">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path
              d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z"
              fill="white"
            />
          </svg>
          <span className="logo-text">Mindcare</span>
        </div>

        <nav className={`nav-links ${menuAberto ? "aberto" : ""}`}>
          <a href="#especialistas">Especialistas</a>
          <a href="#teleconsulta">Teleconsulta</a>
          <a href="#clinicas">Clínicas</a>
          <a href="#login" className="login-btn">
            Entrar
          </a>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      <section className="home-hero">
        <h1 className="hero-title">
          Agende agora sua
          <br />
          consulta
        </h1>
        <p className="hero-subtitle">
          Cuidar da sua mente nunca foi tão simples. Conecte-se aos melhores
          terapeutas do país.
        </p>

        <div className="search-container">
          <form className="search-card" onSubmit={handlePesquisar}>
            <div className="input-group">
              <input
                type="text"
                className="input-field"
                placeholder="Especialidade, doença ou nome"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            <div className="input-group">
              <select
                className="input-field"
                value={estadoSelecionado}
                onChange={(e) => setEstadoSelecionado(e.target.value)}
              >
                <option value="">Selecione o estado</option>
                {estados.map((e) => (
                  <option key={e.id} value={e.sigla}>
                    {e.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <select
                className="input-field"
                value={cidadeSelecionada}
                onChange={(e) => setCidadeSelecionada(e.target.value)}
                disabled={!estadoSelecionado}
              >
                <option value="">
                  {estadoSelecionado
                    ? "Selecione a cidade"
                    : "Selecione o estado primeiro"}
                </option>
                {cidades.map((c) => (
                  <option key={c.id} value={c.nome}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </section>

      <section className="home-lista">
        {loading && <p className="home-loading">Carregando...</p>}

        {!loading && filtrados.length === 0 && (
          <p className="home-vazio">Nenhum terapeuta encontrado.</p>
        )}

        <div className="home-grid">
          {filtrados.map((t) => (
            <TerapeutaCard
              key={t.id}
              terapeuta={t}
              onVerPerfil={() => navigate(`/terapeuta/${t.slug}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
