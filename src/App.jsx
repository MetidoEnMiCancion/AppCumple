import { Routes, Route } from 'react-router-dom'
import AdminLogin from './Admin/pages/Login'
import AdminDashboard from './admin/pages/Dashboard'
import ProtectedRoute from './Admin/Components/ProtectedRoute'
import InvitadosPage from './admin/pages/InvitadosPage'
import AgregarInvitadoPage from './Admin/pages/AgregarInvitadoPage'

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
       <Route path="/admin/invitados" element={<InvitadosPage />} />
       <Route path="/admin/agregarinvitadopage" element={<AgregarInvitadoPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
