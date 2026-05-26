import React, { useEffect, useState } from 'react'
import { auth, db } from '../lib/firebase'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup
} from 'firebase/auth'
import type { User } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { AuthContext } from '../contexts/AuthContext'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null)
	const [role, setRole] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, async (u) => {
			setUser(u)
			if (u) {
				const ref = doc(db, 'users', u.uid)
				const snap = await getDoc(ref)
				if (snap.exists()) {
					const data = snap.data() as any
					setRole(data.role ?? 'customer')
				} else {
					await setDoc(ref, { role: 'customer', email: u.email })
					setRole('customer')
				}
			} else {
				setRole(null)
			}
			setLoading(false)
		})
		return () => unsub()
	}, [])

	const register = async (email: string, password: string) => {
		const cred = await createUserWithEmailAndPassword(auth, email, password)
		await setDoc(doc(db, 'users', cred.user.uid), { email, role: 'customer' })
	}

	const login = async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password)
	}

	const loginWithGoogle = async () => {
		const provider = new GoogleAuthProvider()
		await signInWithPopup(auth, provider)
	}

	const logout = async () => {
		await signOut(auth)
	}

	return (
		<AuthContext.Provider value={{ user, role, loading, register, login, loginWithGoogle, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
