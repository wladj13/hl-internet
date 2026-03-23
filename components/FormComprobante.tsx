'use client'

import { useState, useRef } from 'react'
import { subirComprobante } from '@/lib/actions/portal'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, CreditCard, Image as ImageIcon, Check, Loader2, UploadCloud } from 'lucide-react'

export default function FormComprobante({ mesActual, hoy }: { mesActual: string; hoy: string }) {
  const [loading, setLoading] = useState(false)
  const [archivo, setArchivo] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    try {
      await subirComprobante(formData)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-2">
            <Calendar size={14} className="text-primary-indigo" />
            Mes a pagar
          </label>
          <input
            name="mes_correspondiente"
            type="month"
            required
            defaultValue={mesActual}
            className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-indigo/20 focus:border-primary-indigo transition-all outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-2">
            <Calendar size={14} className="text-primary-indigo" />
            Fecha del pago
          </label>
          <input
            name="fecha_pago"
            type="date"
            required
            defaultValue={hoy}
            max={hoy}
            className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-indigo/20 focus:border-primary-indigo transition-all outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-2">
          <CreditCard size={14} className="text-primary-indigo" />
          Número de referencia <span className="text-slate-400 font-normal lowercase">(opcional)</span>
        </label>
        <input
          name="referencia"
          type="text"
          placeholder="Ej: 000123456789"
          className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-indigo/20 focus:border-primary-indigo transition-all outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-2">
          <ImageIcon size={14} className="text-primary-indigo" />
          Comprobante de pago
        </label>
        <label className={`relative group flex flex-col items-center justify-center w-full h-44 rounded-[2rem] border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
          archivo ? 'border-primary-indigo/50 bg-primary-indigo/5' : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-primary-indigo/30'
        }`}>
          <input
            name="foto"
            type="file"
            accept="image/*"
            required
            className="hidden"
            onChange={(e) => setArchivo(e.target.files?.[0]?.name ?? null)}
          />
          
          <AnimatePresence mode="wait">
            {archivo ? (
              <motion.div 
                key="checked"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center px-6"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/20">
                  <Check size={24} />
                </div>
                <p className="text-sm font-bold text-slate-900 text-center truncate max-w-[250px]">{archivo}</p>
                <p className="text-[10px] text-primary-indigo font-bold mt-2 uppercase tracking-tight">Toca para cambiar</p>
              </motion.div>
            ) : (
              <motion.div 
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-white text-slate-400 flex items-center justify-center mb-4 shadow-sm border border-slate-100 group-hover:text-primary-indigo group-hover:scale-110 transition-all">
                  <UploadCloud size={24} />
                </div>
                <p className="text-sm font-bold text-slate-700">Adjuntar comprobante</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Imagen JPG o PNG</p>
              </motion.div>
            )}
          </AnimatePresence>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full relative group h-14"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-indigo to-primary-violet rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
        <div className="relative h-full w-full bg-gradient-to-r from-primary-indigo to-primary-violet rounded-2xl flex items-center justify-center gap-2 text-white font-bold text-base hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100">
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <span>Enviar reporte de pago</span>
              <Check size={18} />
            </>
          )}
        </div>
      </button>
    </form>
  )
}
