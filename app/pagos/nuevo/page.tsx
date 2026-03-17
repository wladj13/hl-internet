import { createClient } from '@/lib/supabase/server'
import { registrarPago } from '@/lib/actions/pagos'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function NuevoPagoPage({
  searchParams,
}: {
  searchParams: Promise<{ cliente?: string }>
}) {
  const { cliente: clientePreseleccionado } = await searchParams
  const supabase = await createClient()
  const { data: clientes } = await supabase.from('clientes').select('id, nombre').eq('activo', true).order('nombre')

  const now = new Date()
  const mesActual = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const hoy = now.toISOString().split('T')[0]

  async function action(formData: FormData) {
    'use server'
    await registrarPago(formData)
    redirect('/pagos')
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/pagos" className="text-sm text-slate-500 hover:text-slate-700">← Volver a pagos</Link>
        <h1 className="text-2xl font-bold text-slate-800 mt-2">Registrar pago</h1>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-8 max-w-lg">
        <form action={action} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Cliente</label>
            <select
              name="cliente_id"
              required
              defaultValue={clientePreseleccionado ?? ''}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white"
            >
              <option value="">Seleccionar cliente...</option>
              {(clientes ?? []).map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Mes correspondiente</label>
            <input
              name="mes_correspondiente"
              type="month"
              required
              defaultValue={mesActual}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Fecha de pago</label>
            <input
              name="fecha_pago"
              type="date"
              required
              defaultValue={hoy}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Monto ($)</label>
            <input
              name="monto"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="15.00"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Método de pago</label>
            <select
              name="metodo"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white"
            >
              <option value="">Seleccionar método...</option>
              <option value="Transferencia">Transferencia bancaria</option>
              <option value="Pago Movil">Pago Móvil</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Zelle">Zelle</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Notas <span className="text-slate-400">(opcional)</span></label>
            <input
              name="notas"
              type="text"
              placeholder="Referencia, observaciones..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Link href="/pagos" className="flex-1 text-center py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              Cancelar
            </Link>
            <button
              type="submit"
              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
            >
              Guardar pago
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
