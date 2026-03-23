'use client'

import { loginCliente } from '@/lib/actions/portal'
import { motion } from 'framer-motion'
import { Wifi, User, Phone, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function PortalLoginPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true)
    // El form action se encargará del resto, pero podemos mostrar un estado de carga
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary-indigo via-slate-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary-violet/20 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-primary-indigo/20 blur-[120px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-indigo to-primary-violet rounded-[2rem] text-white shadow-2xl shadow-primary-indigo/30 mb-6"
          >
            <Wifi size={40} strokeWidth={2.5} />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">HL Internet</h1>
          <p className="text-slate-400 font-medium">Portal de Autogestión</p>
        </div>

        {/* Card */}
        <div className="glass-dark backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white leading-tight">Bienvenido</h2>
            <p className="text-slate-400 text-sm mt-2">Ingresa con tus datos de cliente</p>
          </div>

          {error === 'notfound' && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium"
            >
              Cédula o teléfono incorrectos. Por favor, verifica tus datos.
            </motion.div>
          )}
          {error === 'inactive' && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium"
            >
              Tu cuenta está inactiva temporalmente. Contacta a soporte.
            </motion.div>
          )}

          <form action={loginCliente} onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-1">Cédula de Identidad</label>
              <div className="relative group">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-indigo transition-colors" size={18} />
                <input
                  name="cedula"
                  type="text"
                  required
                  placeholder="V-12345678"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-indigo/50 focus:border-primary-indigo transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-1">Número de Teléfono</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-indigo transition-colors" size={18} />
                <input
                  name="telefono"
                  type="tel"
                  required
                  placeholder="0412 123 4567"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-indigo/50 focus:border-primary-indigo transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group mt-4 h-14"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-indigo to-primary-violet rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative h-full w-full bg-gradient-to-r from-primary-indigo to-primary-violet rounded-2xl flex items-center justify-center gap-2 text-white font-bold text-base hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Acceder al Portal</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </div>
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 font-medium">
            ¿Aún no eres cliente?{' '}
            <Link href="/portal/registro" className="text-primary-violet hover:text-white transition-colors font-bold">
              Regístrate aquí
            </Link>
          </p>

          <div className="mt-8 pt-8 border-t border-white/5 text-center flex flex-col gap-4">
            <Link href="/portal/ayuda" className="flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-primary-indigo transition-colors font-bold uppercase tracking-wider">
              <HelpCircle size={14} />
              ¿Necesitas ayuda? Ver manual
            </Link>
            
            <div className="flex gap-2">
              <a
                href="https://wa.me/584124009952"
                target="_blank"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all"
              >
                WhatsApp
              </a>
              <a
                href="https://t.me/+13815516550"
                target="_blank"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold hover:bg-sky-500/20 transition-all"
              >
                Telegram
              </a>
            </div>
          </div>
        </div>
        
        <p className="mt-10 text-center text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} HL Internet &bull; Conectividad Premium
        </p>
      </motion.div>
    </div>
  )
}
