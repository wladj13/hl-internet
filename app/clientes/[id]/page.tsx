import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import EstadoBadge from '@/components/EstadoBadge'
import { toggleClienteActivo } from '@/lib/actions/clientes'
import BtnEliminarCliente from '@/components/BtnEliminarCliente'
import { EstadoPago } from '@/lib/types'

export default async function ClienteDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const now = new Date()
  const mesActual = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  const [{ data: cliente }, { data: pagos }, { data: pagoMesActual }] = await Promise.all([
    supabase.from('clientes').select('*').eq('id', id).single(),
    supabase.from('pagos').select('*').eq('cliente_id', id).order('fecha_pago', { ascending: false }),
    supabase.from('pagos').select('id').eq('cliente_id', id).eq('mes_correspondiente', mesActual),
  ])

  if (!cliente) notFound()

  let estado: EstadoPago = 'vencido'
  if (pagoMesActual && pagoMesActual.length > 0) estado = 'pagado'
  else if (now.getDate() <= 10) estado = 'pendiente'

  async function toggleActivo() {
    'use server'
    await toggleClienteActivo(id, !cliente!.activo)
    redirect(`/clientes/${id}`)
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/clientes" className="text-sm text-slate-500 hover:text-slate-700">← Volver a clientes</Link>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-lg">
              {cliente.nombre.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{cliente.nombre}</h1>
              <p className="text-slate-500 text-sm">{cliente.direccion}</p>
            </div>
          </div>
          <EstadoBadge estado={estado} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Info */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Información</h2>
          <div className="space-y-3">
            {[
              { label: 'Cédula', value: cliente.cedula },
              { label: 'Teléfono', value: cliente.telefono },
              { label: 'Plan', value: cliente.plan },
              { label: 'Monto mensual', value: `$${cliente.monto.toFixed(2)}` },
              { label: 'Estado', value: cliente.activo ? 'Activo' : 'Inactivo' },
              { label: 'Registro', value: new Date(cliente.created_at).toLocaleDateString('es-VE') },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-slate-500">{label}</span>
                <span className="font-medium text-slate-800">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2">
            <Link
              href={`/pagos/nuevo?cliente=${id}`}
              className="w-full block text-center bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
            >
              Registrar pago
            </Link>
            <form action={toggleActivo}>
              <button
                type="submit"
                className="w-full text-sm font-medium py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                {cliente.activo ? 'Desactivar cliente' : 'Activar cliente'}
              </button>
            </form>
            <BtnEliminarCliente id={id} />
          </div>
        </div>

        {/* Historial */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Historial de pagos</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {pagos && pagos.length > 0 ? pagos.map(pago => (
              <div key={pago.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-800">{pago.mes_correspondiente}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{pago.metodo} · {new Date(pago.fecha_pago).toLocaleDateString('es-VE')}</p>
                  {pago.notas && <p className="text-xs text-slate-500 mt-1">{pago.notas}</p>}
                </div>
                <p className="text-sm font-semibold text-emerald-600">${pago.monto.toFixed(2)}</p>
              </div>
            )) : (
              <div className="px-6 py-8 text-center text-slate-400 text-sm">Sin pagos registrados</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
