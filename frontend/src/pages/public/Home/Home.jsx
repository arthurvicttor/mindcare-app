import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTerapeutas } from "../../../services/api";
import TerapeutaCard from "../../../components/TerapeutaCard/TerapeutaCard";
import Header from "../../../components/Header/Header";
import "./Home.css";

function Home() {

  const [terapeutas, setTerapeutas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  const [menuAberto, setMenuAberto] = useState(false);
  
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

        <div className="logo-section">
         
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" fill="white"/>
          </svg>
          <span className="logo-text">Mindcare</span>
        </div>

    
        <nav className={`nav-links ${menuAberto ? 'aberto' : ''}`}>
          <a href="#especialistas">Especialistas</a>
          <a href="#teleconsulta">Teleconsulta</a>
          <a href="#clinicas">Clínicas</a>
          <a href="#login" className="login-btn">Entrar</a>
        </nav>

 
        <button 
          className="menu-toggle" 
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

      </header>

 
      <section className="home-hero">
        
        <h1 className="hero-title">
          Agende agora sua<br />consulta
        </h1>
        <p className="hero-subtitle">
        Cuidar da sua mente nunca foi tão simples. Conecte-se aos melhores terapeutas do país.
        </p>

        <div className="search-container">
          <div className="search-card">
            
       
            <div className="input-group">
              <input
                type="text"
                className="input-field"
                placeholder="especialidade, doença ou nome"
              />
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>

       
            <div className="input-group">
              <input
                type="text"
                className="input-field"
                placeholder="cidade ou região"
              />
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>

           
            <button className="search-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Pesquisar
            </button>
            
          </div>
        </div>
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