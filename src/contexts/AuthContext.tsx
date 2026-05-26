import { createContext } from 'react'
import type { User } from 'firebase/auth'

export type AuthContextType = {
  user: User | null
  role: string | null
  loading: boolean
  register: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)


