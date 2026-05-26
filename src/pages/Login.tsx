import { useLocation, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

type LoginLocationState = {
  from?: {
    pathname?: string
  }
}

type FirebaseAuthError = {
  code?: string
}

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

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
)

const Login: React.FC = () => {
  const location = useLocation()
  const [isRegistering, setIsRegistering] = useState(() => new URLSearchParams(location.search).get('mode') === 'register')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  const { login, register, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const from = (location.state as LoginLocationState | null)?.from?.pathname || '/'

  const handleGoogleLogin = async () => {
    setError(null)
    try {
      await loginWithGoogle()
      navigate(from, { replace: true })
    } catch (error: unknown) {
      const authError = error as FirebaseAuthError
      if (authError.code === 'auth/popup-closed-by-user') {
        setError('Cancelaste el inicio de sesión con Google.')
      } else {
        setError('Ocurrió un error al iniciar sesión con Google.')
      }
    }
  }

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
          navigate(from, { replace: true })
        }, 1500)
      } else {
        await login(email, password)
        navigate(from, { replace: true })
      }
    } catch (error: unknown) {
      const authError = error as FirebaseAuthError
      if (authError.code === 'auth/email-already-in-use') {
        setError('Este correo ya está registrado.')
      } else if (authError.code === 'auth/wrong-password' || authError.code === 'auth/user-not-found' || authError.code === 'auth/invalid-credential') {
        setError('Correo o contraseña incorrectos.')
      } else if (authError.code === 'auth/weak-password') {
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
    <div className="max-w-md mx-auto mt-10 bg-white/90 backdrop-blur-xl p-8 border border-black/5 rounded-[2rem] shadow-[0_20px_80px_rgba(16,33,31,0.10)] relative overflow-hidden text-[#10211f]">
      
      {/* Toast de Éxito */}
      {success && (
        <div className="absolute top-0 left-0 right-0 bg-[#3e6b5b] text-white text-center py-2 font-medium animate-pulse">
          {success}
        </div>
      )}

      <div className="mb-6 text-center mt-2">
        <p className="text-xs uppercase tracking-[0.35em] text-[#3e6b5b] mb-2">Creati Store</p>
        <h2 className="text-2xl font-semibold text-[#10211f]">
        {isRegistering ? 'Crear una cuenta' : 'Iniciar sesión'}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#5f6f6b] mb-1">Correo electrónico</label>
          <input 
            type="email"
            required
            className="w-full p-3 border border-black/10 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3e6b5b]/20 text-[#10211f] placeholder:text-[#5f6f6b]" 
            placeholder="tu@correo.com" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#5f6f6b] mb-1">Contraseña</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              required
              className="w-full p-3 pr-10 border border-black/10 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3e6b5b]/20 text-[#10211f] placeholder:text-[#5f6f6b]" 
              placeholder="******" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-[#5f6f6b] hover:text-[#10211f] focus:outline-none"
              title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        {isRegistering && (
          <div>
            <label className="block text-sm font-medium text-[#5f6f6b] mb-1">Confirmar Contraseña</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                required
                className="w-full p-3 pr-10 border border-black/10 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3e6b5b]/20 text-[#10211f] placeholder:text-[#5f6f6b]" 
                placeholder="******" 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#5f6f6b] hover:text-[#10211f] focus:outline-none"
                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          disabled={success !== null}
          className="w-full py-3 px-4 bg-[#3e6b5b] hover:opacity-95 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
        >
          {isRegistering ? 'Registrarse' : 'Ingresar'}
        </button>
      </form>

      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-black/5"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-[#5f6f6b]">O continuar con</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={success !== null}
        className="mt-4 w-full flex items-center justify-center py-3 px-4 border border-black/10 rounded-xl shadow-sm bg-white text-sm font-medium text-[#10211f] hover:bg-[#f5f7f5] transition-colors disabled:opacity-50"
      >
        <GoogleIcon />
        Google
      </button>

      <div className="mt-6 text-center text-sm text-[#5f6f6b] border-t border-black/5 pt-4">
        {isRegistering ? '¿Ya tienes una cuenta? ' : '¿No tienes cuenta? '}
        <button 
          type="button"
          onClick={toggleMode}
          disabled={success !== null}
          className="text-[#3e6b5b] hover:text-[#10211f] font-semibold"
        >
          {isRegistering ? 'Inicia sesión aquí' : 'Crea una aquí'}
        </button>
      </div>
    </div>
  )
}

export default Login
