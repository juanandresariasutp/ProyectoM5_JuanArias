import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Catalog from '../pages/Catalog'
import ProductDetail from '../pages/ProductDetail'
import { useAuth } from '../contexts/AuthContext'
import AdminLayout from '../layouts/AdminLayout'

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth()
  if (loading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  return children
}

function RequireAdmin({ children }: { children: JSX.Element }) {
  const { user, role, loading } = useAuth()
  if (loading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  if (role !== 'admin') return <Navigate to="/" replace />
  return children
}

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin/*"
          element={<RequireAdmin><AdminLayout /></RequireAdmin>}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
