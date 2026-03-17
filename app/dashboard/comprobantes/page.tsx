import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function aprobar(id: string, clienteId: string, monto: number, mes: string, fecha: string) {
  'use server'
  const supabase = createAdminClient()
  await Promise.all([
    supabase.from('comprobantes').update({ estado: 'aprobado' }).eq('id', id),
    supabase.from('pagos').insert({
      cliente_id: clienteId,
      monto,
      fecha_pago: fecha,
      mes_correspondiente: mes,
      metodo: 'Transferencia',
      notas: `Aprobado desde comprobante`,
    }),
  ])
  redirect('/dashboard/comprobantes')
}

async function rechazar(id: string) {
  'use server'
  const supabase = createAdminClient()
  await supabase.from('comprobantes').update({ estado: 'rechazado' }).eq('id', id)
  redirect('/dashboard/comprobantes')
}

export default async function ComprobantesPage() {
  const supabase = createAdminClient()
  const { data: comprobantes } = await supabase
    .from('comprobantes')
    .select('*, clientes(nombre, monto)')
    .order('created_at', { ascending: false })

  const pendientes = comprobantes?.filter(c => c.estado === 'pendiente') ?? []
  const resto = comprobantes?.filter(c => c.estado !== 'pendiente') ?? []

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Comprobantes</h1>
        <p className="text-slate-500 text-sm mt-1">
          {pendientes.length} pendiente{pendientes.length !== 1 ? 's' : ''} de revisión
        </p>
      </div>

      {pendientes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">Por revisar</h2>
          <div className="space-y-4">
            {pendientes.map((c: any) => (
              <div key={c.id} className="bg-white rounded-xl border border-amber-200 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        Pendiente
                      </span>
                      <span className="text-xs text-slate-400">{new Date(c.created_at).toLocaleDateString('es-VE')}</span>
                    </div>
                    <p className="font-semibold text-slate-800">{c.clientes?.nombre}</p>
                    <p className="text-sm text-slate-500 mt-0.5">Mes: {c.mes_correspondiente} · Fecha pago: {new Date(c.fecha_pago).toLocaleDateString('es-VE')}</p>
                    {c.referencia && <p className="text-sm text-slate-500">Ref: {c.referencia}</p>}
                    <p className="text-sm font-semibold text-slate-800 mt-1">Monto: ${c.clientes?.monto?.toFixed(2)}</p>
                  </div>
                  <a href={c.foto_url} target="_blank" className="shrink-0">
                    <img src={c.foto_url} alt="comprobante" className="w-24 h-24 object-cover rounded-lg border border-slate-200 hover:opacity-80 transition-opacity" />
                  </a>
                </div>
                <div className="flex gap-2 mt-4">
                  <form action={aprobar.bind(null, c.id, c.cliente_id, c.clientes?.monto, c.mes_correspondiente, c.fecha_pago)}>
                    <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                      ✓ Aprobar
                    </button>
                  </form>
                  <form action={rechazar.bind(null, c.id)}>
                    <button type="submit" className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-red-200">
                      ✗ Rechazar
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {resto.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">Historial</h2>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Cliente</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Mes</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Estado</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Foto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {resto.map((c: any) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 text-sm font-medium text-slate-800">{c.clientes?.nombre}</td>
                    <td className="px-5 py-3 text-sm text-slate-600">{c.mes_correspondiente}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        c.estado === 'aprobado' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {c.estado === 'aprobado' ? 'Aprobado' : 'Rechazado'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <a href={c.foto_url} target="_blank" className="text-xs text-sky-600 hover:underline">Ver foto</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {comprobantes?.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
          No hay comprobantes enviados aún
        </div>
      )}
    </div>
  )
}
