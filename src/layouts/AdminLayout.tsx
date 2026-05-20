import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <header className="p-4 border-b bg-gray-100">
        <div className="container mx-auto flex justify-between">
          <Link to="/admin" className="font-bold">Admin Panel</Link>
          <div>
            <Link to="/">Volver al sitio</Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
