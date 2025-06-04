import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabase'

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        setIsAuthenticated(true)
      } else {
        navigate('/admin') // te redirige al login si no hay sesión
      }
    }

    checkSession()
  }, [])

  if (!isAuthenticated) return null // o spinner si querés

  return children
}
