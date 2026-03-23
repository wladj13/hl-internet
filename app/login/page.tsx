'use client'

import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'
import { motion } from 'framer-motion'
import { Wifi, ArrowRight, Lock, Mail } from 'lucide-react'
import { useState } from 'react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError('Credenciales inválidas. Inténtalo de nuevo.')
      setLoading(false)
    } else {
      redirect('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary-indigo via-slate-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary-violet/20 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary-indigo/20 blur-[120px] rounded-full"></div>
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
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-indigo to-primary-violet rounded-[2rem] text-white font-bold text-3xl mb-6 shadow-2xl shadow-primary-indigo/40"
          >
            <Wifi size={40} strokeWidth={2.5} />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">HL Internet</h1>
          <p className="text-slate-400 font-medium">Accede a tu panel administrativo</p>
        </div>

        {/* Card */}
        <div className="glass-dark backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">Bienvenido</h2>
            <p className="text-slate-400 text-sm mt-1">Ingresa tus credenciales para continuar</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Correo Electrónico</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-indigo transition-colors" size={18} />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="admin@hlinternet.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-indigo/50 focus:border-primary-indigo transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Contraseña</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-indigo transition-colors" size={18} />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••••••"
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
              <div className="relative h-full w-full bg-gradient-to-r from-primary-indigo to-primary-violet rounded-2xl flex items-center justify-center gap-2 text-white font-bold text-base hover:scale-[1.02] transition-transform active:scale-95">
                {loading ? (
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Entrar al sistema</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </div>
            </button>
          </form>
        </div>
        
        <p className="mt-10 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} HL Internet. Todos los derechos reservados.
        </p>
      </motion.div>
    </div>
  )
}
