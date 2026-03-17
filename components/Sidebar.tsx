'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/lib/actions/auth'

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/clientes', label: 'Clientes', icon: '👥' },
  { href: '/pagos', label: 'Pagos', icon: '💳' },
  { href: '/dashboard/comprobantes', label: 'Comprobantes', icon: '🧾' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex w-64 min-h-screen bg-white border-r border-slate-200 flex-col">
        <div className="px-6 py-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-sky-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">HL</div>
            <div>
              <div className="font-bold text-slate-800 text-sm">HL Internet</div>
              <div className="text-xs text-slate-400">Panel de gestión</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map(({ href, label, icon }) => {
            const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{icon}</span>
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="px-3 py-4 border-t border-slate-200">
          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <span>🚪</span>
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Header móvil */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">HL</div>
          <span className="font-bold text-slate-800 text-sm">HL Internet</span>
        </div>
        <form action={logout}>
          <button type="submit" className="text-xs text-slate-400 hover:text-red-500 transition-colors">
            Salir
          </button>
        </form>
      </header>

      {/* Nav inferior móvil */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 flex">
        {nav.map(({ href, label, icon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 text-xs font-medium transition-colors ${
                active ? 'text-sky-600' : 'text-slate-400'
              }`}
            >
              <span className="text-lg leading-none">{icon}</span>
              <span className="leading-none">{label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
