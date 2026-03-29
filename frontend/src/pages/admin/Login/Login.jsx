import { useState } from "react";
import "./Login.css";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Tentando logar no Admin:", { usuario, senha });
    // Aqui vai a lógica para entrar no painel depois
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        {/* Título igual ao da foto que você mandou */}
        <h1 className="admin-login-title">Acesso Admin</h1>
        <p className="admin-login-subtitle">Acesso Administrativo Mindcare</p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="input-group">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          {/* Botão igual ao da foto, mas com a cor da Mindcare */}
          <button type="submit" className="admin-login-btn">
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
