import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const EyeSlashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
)

const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          setError('Las contraseñas no coinciden.')
          return
        }
        await register(email, password)
        setSuccess('¡Cuenta creada con éxito! Redirigiendo...')
        setTimeout(() => {
          navigate('/')
        }, 1500)
      } else {
        await login(email, password)
        navigate('/')
      }
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Este correo ya está registrado.')
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('Correo o contraseña incorrectos.')
      } else if (err.code === 'auth/weak-password') {
        setError('La contraseña debe tener al menos 6 caracteres.')
      } else {
        setError('Ocurrió un error. Inténtalo de nuevo.')
      }
    }
  }

  const toggleMode = () => {
    setIsRegistering(!isRegistering)
    setError(null)
    setSuccess(null)
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-lg shadow-sm relative overflow-hidden">
      
      {/* Toast de Éxito */}
      {success && (
        <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-2 font-medium animate-pulse">
          {success}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 mt-2">
        {isRegistering ? 'Crear una cuenta' : 'Iniciar sesión'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
          <input 
            type="email"
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" 
            placeholder="tu@correo.com" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              required
              className="w-full p-2 pr-10 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" 
              placeholder="******" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700 focus:outline-none"
              title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        {isRegistering && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                required
                className="w-full p-2 pr-10 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" 
                placeholder="******" 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700 focus:outline-none"
                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          disabled={success !== null}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {isRegistering ? 'Registrarse' : 'Ingresar'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600 border-t pt-4">
        {isRegistering ? '¿Ya tienes una cuenta? ' : '¿No tienes cuenta? '}
        <button 
          type="button"
          onClick={toggleMode}
          disabled={success !== null}
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          {isRegistering ? 'Inicia sesión aquí' : 'Crea una aquí'}
        </button>
      </div>
    </div>
  )
}

export default Login
