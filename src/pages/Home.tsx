import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Home: React.FC = () => {
  const { user } = useAuth()

  const highlights = [
    'Fotografía profesional',
    'Video y accesorios',
    'Tecnología Apple',
    'Productos para crear contenido'
  ]

  const stats = [
    { value: '3+', label: 'años vendiendo productos' },
    { value: '100+', label: 'opciones para explorar' },
    { value: '24/7', label: 'catálogo disponible' }
  ]

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white/80 backdrop-blur-xl px-5 py-10 sm:px-8 sm:py-14 shadow-[0_20px_80px_rgba(16,33,31,0.10)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(141,182,165,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(245,247,245,0.9),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.15),rgba(244,247,245,0.95))]" />

      <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs sm:text-sm uppercase tracking-[0.45em] text-[#3e6b5b] font-semibold">Creati Store</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#10211f] leading-[1.05]">
            Tecnología, fotografía y accesorios para crear mejor.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#10211f]/72 max-w-xl leading-relaxed">
            En Creati Store encuentras cámaras, lentes, periféricos, accesorios para contenido y equipos Apple seleccionados para que tu flujo creativo sea más cómodo, práctico y profesional.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {highlights.map(item => (
              <span
                key={item}
                className="rounded-full border border-black/5 bg-white/90 px-4 py-2 text-sm font-medium text-[#10211f] shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#3e6b5b] text-white font-semibold shadow-lg shadow-[#3e6b5b]/10 hover:opacity-95 transition-all"
            >
              Ver catálogo
            </Link>
            {!user ? (
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-black/10 bg-white text-[#10211f] font-semibold hover:bg-[#f5f7f5] hover:border-[#3e6b5b]/25 transition-all"
              >
                Crear cuenta / Iniciar sesión
              </Link>
            ) : (
              <Link
                to="/orders"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-black/10 bg-white text-[#10211f] font-semibold hover:bg-[#f5f7f5] hover:border-[#3e6b5b]/25 transition-all"
              >
                Ver mis órdenes
              </Link>
            )}
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {stats.map(stat => (
              <div key={stat.label} className="rounded-2xl border border-black/5 bg-white/90 p-4 shadow-[0_10px_30px_rgba(16,33,31,0.06)]">
                <div className="text-2xl font-semibold text-[#10211f]">{stat.value}</div>
                <div className="mt-1 text-sm text-[#5f6f6b]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[2rem] border border-black/5 bg-white/90 p-5 shadow-[0_20px_60px_rgba(16,33,31,0.08)]">
            <p className="text-xs uppercase tracking-[0.35em] text-[#3e6b5b] font-semibold mb-3">Qué puedes encontrar</p>
            <div className="grid grid-cols-2 gap-3">
              {['Cámaras', 'Lentes', 'Accesorios', 'Audio', 'Computadores', 'Celulares'].map(item => (
                <div key={item} className="rounded-2xl border border-black/5 bg-[#f8faf8] px-4 py-4 text-[#10211f] font-semibold text-sm sm:text-base text-center">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/5 bg-[#10211f] p-5 text-white shadow-[0_20px_60px_rgba(16,33,31,0.14)]">
            <p className="text-xs uppercase tracking-[0.35em] text-[#9fc1b3] font-semibold mb-3">Nuestra promesa</p>
            <p className="text-lg font-medium leading-relaxed text-white/90">
              Te ayudamos a elegir productos útiles, visualmente atractivos y listos para acompañar tu trabajo creativo, desde tu setup hasta tu próxima compra importante.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/90">Compra simple</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/90">Diseño claro</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/90">Experiencia mobile first</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
