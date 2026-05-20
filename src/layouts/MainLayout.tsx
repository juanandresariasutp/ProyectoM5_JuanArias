import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b">
        <nav className="container mx-auto flex justify-between">
          <Link to="/" className="font-bold">E-Commerce</Link>
          <div>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/admin">Admin</Link>
          </div>
        </nav>
      </header>
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
      <footer className="p-4 border-t text-center">© Proyecto M5</footer>
    </div>
  )
}

export default MainLayout
