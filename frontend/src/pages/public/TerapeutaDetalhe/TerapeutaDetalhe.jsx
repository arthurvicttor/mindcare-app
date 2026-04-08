import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTerapeutaBySlug, getAgendamentosPorTerapeuta, createAgendamento } from '../../../services/api'
import './TerapeutaDetalhe.css'

const DIAS_SEMANA = {
  monday: 'Seg',
  tuesday: 'Ter',
  wednesday: 'Qua',
  thursday: 'Qui',
  friday: 'Sex',
  saturday: 'Sáb',
}

function gerarProximosDias(diasDisponiveis, quantidade = 14) {
  const dias = []
  const hoje = new Date()

  for (let i = 0; i < 60 && dias.length < quantidade; i++) {
    const data = new Date(hoje)
    data.setDate(hoje.getDate() + i)

    const diaSemana = data.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()

    if (diasDisponiveis.includes(diaSemana)) {
      dias.push(data)
    }
  }

  return dias
}

function formatarData(data) {
  return data.toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  })
}

function formatarDataISO(data) {
  return data.toISOString().split('T')[0]
}

function TerapeutaDetalhe() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [terapeuta, setTerapeuta] = useState(null)
  const [agendados, setAgendados] = useState([])
  const [loading, setLoading] = useState(true)

  const [diaSelecionado, setDiaSelecionado] = useState(null)
  const [horarioSelecionado, setHorarioSelecionado] = useState(null)
  const [etapa, setEtapa] = useState('calendario') // calendario | formulario | sucesso

  const [form, setForm] = useState({ nome: '', celular: '', motivo: '' })
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    async function carregar() {
      const dados = await getTerapeutaBySlug(slug)
      setTerapeuta(dados)

      const agendamentos = await getAgendamentosPorTerapeuta(dados.id)
      setAgendados(agendamentos)

      setLoading(false)
    }
    carregar()
  }, [slug])

  function horarioOcupado(data, horario) {
    const dataISO = formatarDataISO(data)
    return agendados.some(a => a.data === dataISO && a.horario === horario)
  }

  function handleSelecionarDia(dia) {
    setDiaSelecionado(dia)
    setHorarioSelecionado(null)
  }

  function handleSelecionarHorario(horario) {
    setHorarioSelecionado(horario)
  }

  function handleAvancar() {
    if (!diaSelecionado || !horarioSelecionado) return
    setEtapa('formulario')
  }

  async function handleAgendar(e) {
    e.preventDefault()
    setErro('')
    setEnviando(true)

    const resposta = await createAgendamento({
      nome: form.nome,
      celular: form.celular,
      motivo: form.motivo,
      data: formatarDataISO(diaSelecionado),
      horario: horarioSelecionado,
      terapeutaId: terapeuta.id
    })

    if (resposta.message && !resposta.id) {
      setErro(resposta.message)
      setEnviando(false)
      return
    }

    setEtapa('sucesso')
    setEnviando(false)
  }

  if (loading) return <p className="td-loading">Carregando...</p>
  if (!terapeuta) return <p className="td-loading">Terapeuta não encontrado.</p>

  const diasDisponiveis = gerarProximosDias(terapeuta.diasDisponiveis)

  return (
    <div className="td-container">

      {/* Header */}
      <header className="td-header">
        <button className="td-voltar" onClick={() => navigate('/')}>
          ← Voltar
        </button>
      </header>

      {/* Perfil */}
      <section className="td-perfil">
        <img src={terapeuta.foto} alt={terapeuta.nome} className="td-foto" />
        <div className="td-perfil-info">
          <h1 className="td-nome">{terapeuta.nome}</h1>
          <p className="td-especialidade">{terapeuta.especialidade}</p>
          <p className="td-crp">CRP {terapeuta.crp}</p>
          <div className="td-stats">
            <span>⭐ {terapeuta.avaliacao}</span>
            <span>📅 {terapeuta.consultas} consultas</span>
          </div>
        </div>
      </section>

      {/* Descrição */}
      <section className="td-secao">
        <h2 className="td-secao-titulo">Sobre</h2>
        <p className="td-descricao">{terapeuta.descricao}</p>
      </section>

      {/* Agendamento */}
      <section className="td-secao">
        <h2 className="td-secao-titulo">Agendar consulta</h2>

        {etapa === 'calendario' && (
          <>
            {/* Dias */}
            <p className="td-label">Escolha um dia</p>
            <div className="td-dias">
              {diasDisponiveis.map((dia, i) => (
                <button
                  key={i}
                  className={`td-dia ${diaSelecionado && formatarDataISO(diaSelecionado) === formatarDataISO(dia) ? 'selecionado' : ''}`}
                  onClick={() => handleSelecionarDia(dia)}
                >
                  {formatarData(dia)}
                </button>
              ))}
            </div>

            {/* Horários */}
            {diaSelecionado && (
              <>
                <p className="td-label">Escolha um horário</p>
                <div className="td-horarios">
                  {terapeuta.horarios.map(h => {
                    const ocupado = horarioOcupado(diaSelecionado, h)
                    return (
                      <button
                        key={h}
                        className={`td-horario ${horarioSelecionado === h ? 'selecionado' : ''} ${ocupado ? 'ocupado' : ''}`}
                        onClick={() => !ocupado && handleSelecionarHorario(h)}
                        disabled={ocupado}
                      >
                        {h}
                      </button>
                    )
                  })}
                </div>
              </>
            )}

            {horarioSelecionado && (
              <button className="td-btn-avancar" onClick={handleAvancar}>
                Continuar →
              </button>
            )}
          </>
        )}

        {/* Formulário */}
        {etapa === 'formulario' && (
          <form className="td-form" onSubmit={handleAgendar}>
            <p className="td-resumo">
              📅 {formatarData(diaSelecionado)} às {horarioSelecionado}
            </p>

            <div className="td-campo">
              <label>Seu nome completo</label>
              <input
                type="text"
                placeholder="João da Silva"
                value={form.nome}
                onChange={e => setForm(prev => ({ ...prev, nome: e.target.value }))}
                required
              />
            </div>

            <div className="td-campo">
              <label>Seu celular (WhatsApp)</label>
              <input
                type="text"
                placeholder="11999999999"
                value={form.celular}
                onChange={e => setForm(prev => ({ ...prev, celular: e.target.value }))}
                required
              />
            </div>

            <div className="td-campo">
              <label>Motivo da consulta</label>
              <textarea
                placeholder="Descreva brevemente o motivo..."
                value={form.motivo}
                onChange={e => setForm(prev => ({ ...prev, motivo: e.target.value }))}
                rows={3}
                required
              />
            </div>

            {erro && <p className="td-erro">{erro}</p>}

            <div className="td-form-acoes">
              <button
                type="button"
                className="td-btn-voltar"
                onClick={() => setEtapa('calendario')}
              >
                ← Voltar
              </button>
              <button type="submit" className="td-btn-agendar" disabled={enviando}>
                {enviando ? 'Agendando...' : 'Confirmar agendamento'}
              </button>
            </div>
          </form>
        )}

        {/* Sucesso */}
        {etapa === 'sucesso' && (
          <div className="td-sucesso">
            <p className="td-sucesso-icone">✅</p>
            <h3>Consulta agendada!</h3>
            <p>
              {formatarData(diaSelecionado)} às {horarioSelecionado} com {terapeuta.nome}
            </p>
            <button className="td-btn-agendar" onClick={() => navigate('/')}>
              Voltar para o início
            </button>
          </div>
        )}
      </section>

    </div>
  )
}

export default TerapeutaDetalhe