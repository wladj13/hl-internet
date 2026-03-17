import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import FormComprobante from '@/components/FormComprobante'

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
            Adjunta la imagen de tu comprobante de transferencia y lo revisaremos a la brevedad.
          </p>
          <FormComprobante mesActual={mesActual} hoy={hoy} />
        </div>
      </div>
    </div>
  )
}
