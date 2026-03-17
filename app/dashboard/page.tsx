import { createClient } from '@/lib/supabase/server'
import EstadoBadge from '@/components/EstadoBadge'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const now = new Date()
  const mesActual = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  const [{ data: clientes }, { data: pagosEsteMes }, { data: ultimosPagos }] = await Promise.all([
    supabase.from('clientes').select('*').eq('activo', true),
    supabase.from('pagos').select('*').eq('mes_correspondiente', mesActual),
    supabase.from('pagos').select('*, clientes(nombre)').order('created_at', { ascending: false }).limit(5),
  ])

  const totalClientes = clientes?.length ?? 0
  const clientesPagados = pagosEsteMes?.length ?? 0
  const clientesPendientes = totalClientes - clientesPagados
  const montoCobrado = pagosEsteMes?.reduce((acc, p) => acc + p.monto, 0) ?? 0
  const montoPendiente = (clientes?.reduce((acc, c) => acc + c.monto, 0) ?? 0) - montoCobrado

  const stats = [
    { label: 'Clientes activos', value: totalClientes, icon: '👥', color: 'text-sky-600', bg: 'bg-sky-50' },
    { label: 'Pagados este mes', value: clientesPagados, icon: '✅', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pendientes', value: clientesPendientes, icon: '⏳', color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Cobrado este mes', value: `$${montoCobrado.toFixed(2)}`, icon: '💰', color: 'text-violet-600', bg: 'bg-violet-50' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">
          {now.toLocaleDateString('es-VE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${bg} ${color} text-xl mb-3`}>
              {icon}
            </div>
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
            <div className="text-xs text-slate-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Alerta pendientes */}
      {clientesPendientes > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-center gap-3">
          <span className="text-amber-500 text-xl">⚠️</span>
          <div>
            <p className="text-amber-800 font-medium text-sm">
              {clientesPendientes} cliente{clientesPendientes > 1 ? 's' : ''} sin pago este mes
            </p>
            <p className="text-amber-600 text-xs mt-0.5">
              Monto pendiente: <strong>${montoPendiente.toFixed(2)}</strong>
            </p>
          </div>
          <Link href="/clientes" className="ml-auto text-xs text-amber-700 font-medium hover:underline">
            Ver clientes →
          </Link>
        </div>
      )}

      {/* Ultimos pagos */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Últimos pagos registrados</h2>
          <Link href="/pagos/nuevo" className="text-xs bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-lg transition-colors">
            + Registrar pago
          </Link>
        </div>
        <div className="divide-y divide-slate-100">
          {ultimosPagos && ultimosPagos.length > 0 ? ultimosPagos.map((pago: any) => (
            <div key={pago.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-800">{pago.clientes?.nombre ?? '—'}</p>
                <p className="text-xs text-slate-400 mt-0.5">{pago.metodo} · {pago.mes_correspondiente}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-emerald-600">${pago.monto.toFixed(2)}</p>
                <p className="text-xs text-slate-400 mt-0.5">{new Date(pago.fecha_pago).toLocaleDateString('es-VE')}</p>
              </div>
            </div>
          )) : (
            <div className="px-6 py-8 text-center text-slate-400 text-sm">No hay pagos registrados aún</div>
          )}
        </div>
      </div>
    </div>
  )
}
