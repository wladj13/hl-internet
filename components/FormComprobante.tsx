'use client'

import { useState, useRef } from 'react'
import { subirComprobante } from '@/lib/actions/portal'

export default function FormComprobante({ mesActual, hoy }: { mesActual: string; hoy: string }) {
  const [loading, setLoading] = useState(false)
  const [archivo, setArchivo] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await subirComprobante(formData)
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Mes a pagar</label>
        <input
          name="mes_correspondiente"
          type="month"
          required
          defaultValue={mesActual}
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Fecha en que realizaste el pago</label>
        <input
          name="fecha_pago"
          type="date"
          required
          defaultValue={hoy}
          max={hoy}
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Número de referencia <span className="text-slate-400">(opcional)</span>
        </label>
        <input
          name="referencia"
          type="text"
          placeholder="Ej: 000123456789"
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Comprobante de pago</label>
        <label className={`flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
          archivo ? 'border-sky-400 bg-sky-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
        }`}>
          <input
            name="foto"
            type="file"
            accept="image/*"
            required
            className="hidden"
            onChange={(e) => setArchivo(e.target.files?.[0]?.name ?? null)}
          />
          {archivo ? (
            <>
              <span className="text-2xl mb-1">✅</span>
              <p className="text-sm font-medium text-sky-700 text-center px-4 truncate max-w-full">{archivo}</p>
              <p className="text-xs text-sky-500 mt-1">Toca para cambiar</p>
            </>
          ) : (
            <>
              <span className="text-2xl mb-1">📎</span>
              <p className="text-sm font-medium text-slate-600">Toca para adjuntar imagen</p>
              <p className="text-xs text-slate-400 mt-1">JPG, PNG desde tu galería</p>
            </>
          )}
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Enviando...
          </>
        ) : (
          'Enviar comprobante'
        )}
      </button>
    </form>
  )
}
