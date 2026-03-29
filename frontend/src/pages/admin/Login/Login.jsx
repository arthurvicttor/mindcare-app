import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../../services/api";
import "./Login.css";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro("");
    setLoading(true);

    const dados = await loginAdmin(usuario, senha);

    if (dados.token) {
      localStorage.setItem("adminLogado", "true");
      localStorage.setItem("token", dados.token);
      navigate("/admin");
    } else {
      setErro("Email ou senha inválidos");
    }

    setLoading(false);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h1 className="admin-login-title">Acesso Admin</h1>
        <p className="admin-login-subtitle">Acesso Administrativo Mindcare</p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="input-group">
            <label htmlFor="usuario">Usuário</label>
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

          {erro && <p className="login-erro">{erro}</p>}

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;