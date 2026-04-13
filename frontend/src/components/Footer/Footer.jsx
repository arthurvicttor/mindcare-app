import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Serviço</h4>
          <ul>
            <li>
              <a href="#">Privacidade e cookies</a>
            </li>
            <li>
              <a href="#">Privacidade para profissionais</a>
            </li>
            <li>
              <a href="#">Sobre-nós</a>
            </li>
            <li>
              <a href="#">Contato</a>
            </li>
            <li>
              <a href="#">Vagas</a>
            </li>
            <li>
              <a href="#">Termos e Condições</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Pacientes</h4>
          <ul>
            <li>
              <a href="#">Especialistas</a>
            </li>
            <li>
              <a href="#">Clínicas</a>
            </li>
            <li>
              <a href="#">Planos de saúde</a>
            </li>
            <li>
              <a href="#">Pergunte ao especialista</a>
            </li>
            <li>
              <a href="#">Serviços</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Para especialistas</h4>
          <ul>
            <li>
              <a href="#">Preço</a>
            </li>
            <li>
              <a href="#">Soluções</a>
            </li>
            <li>
              <a href="#">Conteúdos</a>
            </li>
            <li>
              <a href="#">Termos de uso</a>
            </li>
            <li>
              <a href="#">Central de ajuda</a>
            </li>
          </ul>
        </div>
        <div className="footer-column company">
          <h4>Mindcare</h4>
          <p>
            Empresa fictícia LTDA <br />
            Rua: Exemplo, 123 São Paulo - SP
          </p>

          <div className="sociais">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Mindcare. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
