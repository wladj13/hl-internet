'use client'

import { registrarCliente } from '@/lib/actions/portal'
import { motion } from 'framer-motion'
import { Wifi, User, Phone, MapPin, ArrowRight, ShieldCheck, CreditCard, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function PortalRegistroPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true)
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
        className="w-full max-w-lg relative z-10 py-10"
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
          <p className="text-slate-400 font-medium">Únete a la nueva era de conectividad</p>
        </div>

        {/* Card */}
        <div className="glass-dark backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white leading-tight">Nueva Cuenta</h2>
              <p className="text-slate-400 text-sm mt-2 font-medium">Plan Básico Residencial</p>
            </div>
            <div className="px-3 py-1 bg-primary-indigo/20 border border-primary-indigo/30 rounded-full text-primary-indigo text-[10px] font-black uppercase tracking-widest">
              $15.00 / mes
            </div>
          </div>

          {error === 'cedula' && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium"
            >
              Ya existe una cuenta registrada con esta cédula.
            </motion.div>
          )}
          {error === 'general' && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium"
            >
              Ocurrió un error inesperado. Por favor, intenta de nuevo.
            </motion.div>
          )}

          <form action={registrarCliente} onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-1">Nombre Completo</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-indigo transition-colors" size={18} />
                  <input
                    name="nombre"
                    type="text"
                    required
                    placeholder="Juan Pérez"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-indigo/50 focus:border-primary-indigo transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-1">Cédula</label>
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
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-1">Teléfono Móvil</label>
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

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-1">Dirección de Instalación</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-11 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-indigo transition-colors" size={18} />
                <textarea
                  name="direccion"
                  required
                  placeholder="Urb. Residencial, Calle 1, Casa #10"
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-indigo/50 focus:border-primary-indigo transition-all placeholder:text-slate-600 resize-none"
                />
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary-indigo/10 border border-primary-indigo/20 mb-6">
                <Sparkles className="text-primary-indigo shrink-0" size={20} />
                <p className="text-[10px] text-slate-300 font-medium leading-relaxed">
                  Al registrarte, podrás reportar tus pagos inmediatamente y ver el estado de tu conexión en tiempo real.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full relative group h-14"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-indigo to-primary-violet rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative h-full w-full bg-gradient-to-r from-primary-indigo to-primary-violet rounded-2xl flex items-center justify-center gap-2 text-white font-bold text-base hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Crear mi Cuenta</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </div>
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 font-medium">
            ¿Ya eres cliente?{' '}
            <Link href="/portal" className="text-primary-violet hover:text-white transition-colors font-bold">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
        
        <div className="mt-10 flex items-center justify-center gap-6 opacity-30">
          <Wifi size={24} className="text-white" />
          <ShieldCheck size={24} className="text-white" />
          <CreditCard size={24} className="text-white" />
        </div>
      </motion.div>
    </div>
  )
}
