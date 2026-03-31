import React, { useState } from 'react';
import './Header.css'; 

function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  // Função para fechar o menu 
  const fecharMenu = () => setMenuAberto(false);

  return (
    <header className="header">
      
      <div className="logo-section">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" fill="white"/>
        </svg>
        <span className="logo-text">Mindcare</span>
      </div>

      <nav className={`nav-links ${menuAberto ? 'aberto' : ''}`}>
        <a href="#especialistas" onClick={fecharMenu}>Especialistas</a>
        <a href="#teleconsulta" onClick={fecharMenu}>Teleconsulta</a>
        <a href="#clinicas" onClick={fecharMenu}>Clínicas</a>
        <a href="#login" className="login-btn" onClick={fecharMenu}>Entrar</a>
      </nav>

      <button 
        className="menu-toggle" 
        onClick={() => setMenuAberto(!menuAberto)}
        aria-label="Menu"
      >
        {menuAberto ? (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        )}
      </button>

    </header>
  );
}

export default Header;