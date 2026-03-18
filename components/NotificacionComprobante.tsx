'use client'

import { useEffect, useState } from 'react'

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
    <div className={`rounded-2xl p-4 border ${aprobado ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3 items-start">
          <span className="text-2xl shrink-0">{aprobado ? '✅' : '❌'}</span>
          <div>
            <p className={`font-semibold text-sm ${aprobado ? 'text-emerald-800' : 'text-red-800'}`}>
              {aprobado ? '¡Tu pago fue confirmado!' : 'Comprobante rechazado'}
            </p>
            <p className={`text-xs mt-0.5 ${aprobado ? 'text-emerald-700' : 'text-red-700'}`}>
              {aprobado
                ? `Tu pago del mes ${mes} fue aprobado. Ya puedes ver tu recibo.`
                : `Tu comprobante del mes ${mes} fue rechazado. Por favor envía uno nuevo.`}
            </p>
          </div>
        </div>
        <button onClick={cerrar} className={`shrink-0 text-lg leading-none ${aprobado ? 'text-emerald-400 hover:text-emerald-600' : 'text-red-400 hover:text-red-600'}`}>
          ×
        </button>
      </div>
    </div>
  )
}
