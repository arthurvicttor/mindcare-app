import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import "./Header.css";

function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  // Função para fechar o menu
  const fecharMenu = () => setMenuAberto(false);

  return (
    <header className="header">
      <div className="logo-section">
        <img src={logo} alt="Logo Mindcare" className="logo-image" />
        <span className="logo-text">Mindcare</span>
      </div>

      <nav className={`nav-links ${menuAberto ? "aberto" : ""}`}>
        <NavLink to="/admin" className="login-btn" onClick={fecharMenu}>
          Entrar
        </NavLink>
      </nav>

      <button
        className="menu-toggle"
        onClick={() => setMenuAberto(!menuAberto)}
        aria-label="Menu"
      >
        {menuAberto ? (
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
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
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
        )}
      </button>
    </header>
  );
}

export default Header;
