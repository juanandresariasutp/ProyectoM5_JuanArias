import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Home: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="text-center py-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
        Bienvenido a Nuestro E-commerce
      </h1>
      <p className="mt-4 mb-8 text-lg text-gray-600 max-w-2xl mx-auto">
        Explora nuestros productos, añade los que más te gusten al carrito, y finaliza tu compra en unos pocos clics.
      </p>
      
      <div className="flex justify-center gap-4">
        <Link 
          to="/catalog"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
        >
          Ver Catálogo
        </Link>
        {!user && (
          <Link 
            to="/login"
            className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-md shadow hover:bg-gray-200 transition"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </div>
  )
}

export default Home
