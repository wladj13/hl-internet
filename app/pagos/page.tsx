import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function PagosPage() {
  const supabase = await createClient()

  const { data: pagos } = await supabase
    .from('pagos')
    .select('*, clientes(nombre)')
    .order('fecha_pago', { ascending: false })

  const totalMes = pagos?.reduce((acc, p) => acc + p.monto, 0) ?? 0

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Pagos</h1>
          <p className="text-slate-500 text-sm mt-1">{pagos?.length ?? 0} pagos registrados</p>
        </div>
        <Link href="/pagos/nuevo" className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + Registrar pago
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Cliente</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Mes</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Fecha pago</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Método</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Monto</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Notas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pagos && pagos.length > 0 ? pagos.map((pago: any) => (
              <tr key={pago.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <Link href={`/clientes/${pago.cliente_id}`} className="text-sm font-medium text-sky-600 hover:underline">
                    {pago.clientes?.nombre ?? '—'}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{pago.mes_correspondiente}</td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {new Date(pago.fecha_pago).toLocaleDateString('es-VE')}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{pago.metodo}</td>
                <td className="px-6 py-4 text-sm font-semibold text-emerald-600">${pago.monto.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-slate-400">{pago.notas ?? '—'}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">
                  No hay pagos registrados. <Link href="/pagos/nuevo" className="text-sky-500 hover:underline">Registrar el primero</Link>
                </td>
              </tr>
            )}
          </tbody>
          {pagos && pagos.length > 0 && (
            <tfoot>
              <tr className="border-t border-slate-200 bg-slate-50">
                <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-slate-700">Total</td>
                <td className="px-6 py-3 text-sm font-bold text-emerald-600">${totalMes.toFixed(2)}</td>
                <td></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  )
}
