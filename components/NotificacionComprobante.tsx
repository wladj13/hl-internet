'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, X } from 'lucide-react'

interface Props {
  comprobanteId: string
  estado: 'aprobado' | 'rechazado'
  mes: string
}

export default function NotificacionComprobante({ comprobanteId, estado, mes }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const key = `notif_${comprobanteId}`
    if (!localStorage.getItem(key)) setVisible(true)
  }, [comprobanteId])

  function cerrar() {
    localStorage.setItem(`notif_${comprobanteId}`, '1')
    setVisible(false)
  }

  if (!visible) return null

  const aprobado = estado === 'aprobado'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`relative overflow-hidden rounded-[2rem] p-6 border shadow-2xl backdrop-blur-xl ${
            aprobado 
              ? 'bg-emerald-50/80 border-emerald-500/20 text-emerald-900' 
              : 'bg-rose-50/80 border-rose-500/20 text-rose-900'
          }`}
        >
          {/* Decorative background circle */}
          <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 ${
            aprobado ? 'bg-emerald-500' : 'bg-rose-500'
          }`}></div>

          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="flex gap-4 items-start">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                aprobado 
                  ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                  : 'bg-rose-500 text-white shadow-rose-500/20'
              }`}>
                {aprobado ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
              </div>
              <div className="pt-0.5">
                <p className="font-black text-sm uppercase tracking-tight">
                  {aprobado ? '¡Pago Confirmado!' : 'Pago Rechazado'}
                </p>
                <p className="text-xs mt-1 font-medium opacity-80 leading-relaxed">
                  {aprobado
                    ? `Tu comprobante del mes ${mes} fue validado con éxito. Ya puedes acceder a tu recibo digital.`
                    : `Lamentablemente tu comprobante del mes ${mes} no pudo ser validado. Por favor, verifica los datos y envía uno nuevo.`}
                </p>
              </div>
            </div>
            <button 
              onClick={cerrar} 
              className={`p-2 rounded-xl transition-all hover:scale-110 active:scale-95 ${
                aprobado 
                  ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20' 
                  : 'bg-rose-500/10 text-rose-600 hover:bg-rose-500/20'
              }`}
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
