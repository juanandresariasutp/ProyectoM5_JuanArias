import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="text-center p-8">
      <h1 className="text-3xl font-bold">Bienvenido al e-commerce</h1>
      <p className="mt-4 mb-4">Esta es la página de inicio mínima para pruebas.</p>
      
      {user && (
        <div className="bg-gray-100 p-4 rounded inline-block">
          <p className="mb-2">Logueado como: <strong>{user.email}</strong></p>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}

export default Home
