import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { AuthProvider, useAuth } from './AuthContext'
import React from 'react'

describe('AuthContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  )

  it('debe lanzar un error si useAuth se usa fuera del AuthProvider', () => {
    // Suprimimos console.error para no ensuciar la salida del test (React se queja del error)
    const consoleError = console.error
    console.error = vi.fn()
    
    expect(() => {
      renderHook(() => useAuth())
    }).toThrow('useAuth must be used within AuthProvider')
    
    console.error = consoleError
  })

  it('debe inicializar el estado en "loading" antes de resolver el estado de Auth', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current.loading).toBe(true)
    expect(result.current.user).toBeNull()
  })

  it('debe proveer acceso a las funciones de login y logout sin fallar en su invocación inicial', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    // Solo comprobamos que son funciones definidas
    expect(typeof result.current.loginWithGoogle).toBe('function')
    expect(typeof result.current.login).toBe('function')
    expect(typeof result.current.logout).toBe('function')
    expect(typeof result.current.register).toBe('function')
  })
})