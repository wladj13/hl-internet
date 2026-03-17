import { createClient } from '@/lib/supabase/server'
import EstadoBadge from '@/components/EstadoBadge'
import Link from 'next/link'
import { EstadoPago } from '@/lib/types'

export default async function ClientesPage() {
  const supabase = await createClient()

  const now = new Date()
  const mesActual = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  const [{ data: clientes }, { data: pagosEsteMes }] = await Promise.all([
    supabase.from('clientes').select('*').order('nombre'),
    supabase.from('pagos').select('cliente_id').eq('mes_correspondiente', mesActual),
  ])

  const pagadosSet = new Set(pagosEsteMes?.map(p => p.cliente_id) ?? [])

  const clientesConEstado = (clientes ?? []).map(c => {
    let estado: EstadoPago = 'vencido'
    if (pagadosSet.has(c.id)) estado = 'pagado'
    else if (now.getDate() <= 10) estado = 'pendiente'
    return { ...c, estado }
  })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Clientes</h1>
          <p className="text-slate-500 text-sm mt-1">{clientesConEstado.length} clientes registrados</p>
        </div>
        <Link href="/clientes/nuevo" className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + Nuevo cliente
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Cliente</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Dirección</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Plan</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Monto</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Estado</th>
              <th className="px-6 py-3.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clientesConEstado.map(c => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${c.activo ? 'bg-sky-500' : 'bg-slate-300'}`}>
                      {c.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{c.nombre}</p>
                      {!c.activo && <p className="text-xs text-slate-400">Inactivo</p>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{c.direccion}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{c.plan}</td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-800">${c.monto.toFixed(2)}</td>
                <td className="px-6 py-4"><EstadoBadge estado={c.estado} /></td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/clientes/${c.id}`} className="text-xs text-sky-600 hover:text-sky-800 font-medium">
                    Ver →
                  </Link>
                </td>
              </tr>
            ))}
            {clientesConEstado.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">
                  No hay clientes registrados. <Link href="/clientes/nuevo" className="text-sky-500 hover:underline">Agregar el primero</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
