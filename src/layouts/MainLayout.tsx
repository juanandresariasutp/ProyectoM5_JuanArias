import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#10211f]">
      <Navbar />
      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
      <footer className="p-4 border-t border-black/10 text-center text-[#10211f]/55 bg-white/70 backdrop-blur mt-auto">
        © {new Date().getFullYear()} Creati Store
      </footer>
    </div>
  )
}

export default MainLayout
