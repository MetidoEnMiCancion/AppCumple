import { supabase } from '../../services/supabase'
import { useNavigate } from 'react-router-dom'


export default function AdminDashboard() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Panel de Administración 🎉</h1>

        <p className="mb-6 text-gray-700">
          Bienvenido, organizá tu fiesta desde acá.
        </p>

        <div className="grid gap-4">
          <button 
          onClick={() => navigate('/admin/AgregarInvitadoPage')}
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
            🎟️ Ver invitados
          </button>
          <button 
          onClick={() => navigate('/admin/invitadosPage')}
          className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700">
            🪑 Organizar mesas
          </button>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            📋 Ver cronograma
          </button>
          <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
            🗺️ Mapa del salón
          </button>
          <button
            onClick={handleLogout}
            className="mt-6 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
          >
            🚪 Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}
