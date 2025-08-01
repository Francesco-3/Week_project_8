import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() !== '') {
      navigate(`/details/${encodeURIComponent(input.trim())}`)
    }
  }

  return (
    <main className="d-flex justify-content-center align-items-center bg-dark text-white" style={{ minHeight: '100vh' }}>
      <form onSubmit={handleSubmit} className="text-center">
        <h1 className="mb-4"><i className="bi bi-cloud-sun"></i> Weather App</h1>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Inserisci il nome di una città"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </main>
  )
}