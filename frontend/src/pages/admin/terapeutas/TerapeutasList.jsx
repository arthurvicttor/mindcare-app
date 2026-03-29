import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTerapeutas, deleteTerapeuta } from '../../../services/api'
import TerapeutaCardAdmin from '../../../components/TerapeutaCardAdmin/TerapeutaCardAdmin'
import './TerapeutasList.css'

function TerapeutasList() {
  const [terapeutas, setTerapeutas] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function carregar() {
      const dados = await getTerapeutas()
      setTerapeutas(dados)
      setLoading(false)
    }
    carregar()
  }, [])

  async function handleDeletar(id) {
    const confirmar = window.confirm('Remover este terapeuta?')
    if (!confirmar) return
    await deleteTerapeuta(id, token)
    setTerapeutas(prev => prev.filter(t => t.id !== id))
  }

  function handleSair() {
    localStorage.removeItem('token')
    localStorage.removeItem('adminLogado')
    navigate('/admin/login')
  }

  return (
    <div className="lista-container">
      <header className="lista-header">
        <h1>🧠 MindCare Admin</h1>
        <div className="lista-header-acoes">
          <button className="btn-novo" onClick={() => navigate('/admin/terapeutas/novo')}>
            + Novo Terapeuta
          </button>
          <button className="btn-sair" onClick={handleSair}>
            Sair
          </button>
        </div>
      </header>

      {loading && <p className="loading">Carregando...</p>}

      {!loading && terapeutas.length === 0 && (
        <p className="lista-vazia">Nenhum terapeuta cadastrado ainda.</p>
      )}

      <div className="cards-grid">
        {terapeutas.map(t => (
          <TerapeutaCardAdmin
            key={t.id}
            terapeuta={t}
            onEditar={() => navigate(`/admin/terapeutas/editar/${t.id}`)}
            onDeletar={() => handleDeletar(t.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default TerapeutasList