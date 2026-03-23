'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  FileText, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Wifi
} from 'lucide-react'
import { useState } from 'react'
import { logout } from '@/lib/actions/auth'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/clientes', label: 'Clientes', icon: Users },
  { href: '/pagos', label: 'Pagos', icon: CreditCard },
  { href: '/dashboard/comprobantes', label: 'Facturación', icon: FileText },
  { href: '/configuracion', label: 'Configuración', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {/* Sidebar desktop */}
      <motion.aside 
        animate={{ width: isCollapsed ? '80px' : '260px' }}
        className="hidden lg:flex min-h-screen glass-dark flex-col relative z-50 border-r border-white/5"
      >
        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-12 w-6 h-6 rounded-full bg-primary-indigo text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div className="p-6 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-indigo to-primary-violet rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-indigo/30">
              <Wifi size={22} strokeWidth={2.5} />
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <div className="font-bold text-white tracking-tight">HL Internet</div>
                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">WISP Admin</div>
              </motion.div>
            )}
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1.5 focus:outline-none">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
            return (
              <Link key={href} href={href} className="block relative focus:outline-none group">
                <div
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    active 
                      ? 'bg-white/10 text-white' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <Icon size={20} className={active ? 'text-primary-violet' : 'group-hover:text-slate-200'} />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="whitespace-nowrap"
                    >
                      {label}
                    </motion.span>
                  )}
                </div>
                {active && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-violet rounded-r-full shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="px-3 py-6 border-t border-white/5">
          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all group"
            >
              <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
              {!isCollapsed && <span>Cerrar sesión</span>}
            </button>
          </form>
        </div>
      </motion.aside>

      {/* Nav inferior móvil (Glassmorphism) */}
      <nav className="lg:hidden fixed bottom-6 left-6 right-6 z-40 glass rounded-2xl border border-white/20 flex shadow-2xl">
        {navItems.slice(0, 4).map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-all ${
                active ? 'text-primary-indigo' : 'text-slate-400'
              }`}
            >
              <Icon size={22} />
              <span className="text-[10px] font-medium uppercase tracking-tighter">{label}</span>
              {active && (
                <motion.div 
                  layoutId="active-dot" 
                  className="w-1 h-1 bg-primary-indigo rounded-full mt-0.5" 
                />
              )}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
