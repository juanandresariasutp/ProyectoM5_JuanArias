import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
      <footer className="p-4 border-t text-center text-gray-500 bg-white shadow-sm mt-auto">
        © {new Date().getFullYear()} Proyecto M5 - E-commerce
      </footer>
    </div>
  )
}

export default MainLayout
