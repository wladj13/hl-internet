import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { subirComprobante } from '@/lib/actions/portal'
import Link from 'next/link'

export default async function PortalPagarPage() {
  const cookieStore = await cookies()
  if (!cookieStore.get('cliente_id')) redirect('/portal')

  const now = new Date()
  const mesActual = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const hoy = now.toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link href="/portal/inicio" className="text-slate-400 hover:text-slate-600 text-sm">← Volver</Link>
          <div className="w-px h-4 bg-slate-200"></div>
          <p className="font-semibold text-slate-800 text-sm">Enviar comprobante</p>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mt-2">
          <p className="text-slate-500 text-sm mb-6">
            Sube la foto de tu comprobante de transferencia y lo revisaremos a la brevedad.
          </p>

          <form action={subirComprobante} className="space-y-5">
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
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Número de referencia <span className="text-slate-400">(opcional)</span></label>
              <input
                name="referencia"
                type="text"
                placeholder="Ej: 000123456789"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Foto del comprobante</label>
              <input
                name="foto"
                type="file"
                accept="image/*"
                required
                capture="environment"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-sky-50 file:text-sky-700"
              />
              <p className="text-xs text-slate-400 mt-1.5">Puedes tomar una foto directamente con la cámara</p>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 rounded-xl text-sm transition-colors"
            >
              Enviar comprobante
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
