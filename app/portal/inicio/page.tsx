import { createAdminClient } from '@/lib/supabase/admin'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { logoutCliente } from '@/lib/actions/portal'
import Link from 'next/link'
import EstadoBadge from '@/components/EstadoBadge'
import { EstadoPago } from '@/lib/types'

export default async function PortalInicioPage({
  searchParams,
}: {
  searchParams: Promise<{ enviado?: string }>
}) {
  const { enviado } = await searchParams
  const cookieStore = await cookies()
  const clienteId = cookieStore.get('cliente_id')?.value
  if (!clienteId) redirect('/portal')

  const supabase = createAdminClient()
  const now = new Date()
  const mesActual = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  const [{ data: cliente }, { data: pagos }, { data: comprobantes }] = await Promise.all([
    supabase.from('clientes').select('*').eq('id', clienteId).single(),
    supabase.from('pagos').select('*').eq('cliente_id', clienteId).order('fecha_pago', { ascending: false }),
    supabase.from('comprobantes').select('*').eq('cliente_id', clienteId).order('created_at', { ascending: false }),
  ])

  if (!cliente) redirect('/portal')

  const pagoEsteMes = pagos?.find(p => p.mes_correspondiente === mesActual)
  const comprobanteEsteMes = comprobantes?.find(c => c.mes_correspondiente === mesActual)

  let estado: EstadoPago = 'vencido'
  if (pagoEsteMes) estado = 'pagado'
  else if (now.getDate() <= 10) estado = 'pendiente'

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-sky-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">HL</div>
            <div>
              <p className="font-semibold text-slate-800 text-sm">{cliente.nombre}</p>
              <p className="text-xs text-slate-400">Plan {cliente.plan}</p>
            </div>
          </div>
          <form action={logoutCliente}>
            <button type="submit" className="text-xs text-slate-400 hover:text-red-500 transition-colors">
              Salir
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-4">

        {/* Alerta enviado */}
        {enviado && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3 items-center">
            <span className="text-emerald-500 text-xl">✅</span>
            <p className="text-emerald-800 text-sm font-medium">Comprobante enviado. Será revisado pronto.</p>
          </div>
        )}

        {/* Estado del mes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">Estado del mes</h2>
            <EstadoBadge estado={estado} />
          </div>
          <div className="space-y-3">
            {[
              { label: 'Mes actual', value: mesActual },
              { label: 'Plan', value: cliente.plan },
              { label: 'Monto mensual', value: `$${cliente.monto.toFixed(2)}` },
              { label: 'Fecha de pago', value: pagoEsteMes ? new Date(pagoEsteMes.fecha_pago).toLocaleDateString('es-VE') : '—' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-slate-500">{label}</span>
                <span className="font-medium text-slate-800">{value}</span>
              </div>
            ))}
          </div>

          {pagoEsteMes && (
            <div className="mt-5">
              <Link
                href={`/portal/recibo/${pagoEsteMes.id}`}
                className="block w-full text-center bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium py-2.5 rounded-xl text-sm transition-colors border border-emerald-200"
              >
                Ver recibo de pago
              </Link>
            </div>
          )}

          {!pagoEsteMes && (
            <div className="mt-5">
              {comprobanteEsteMes ? (
                <div className={`w-full text-center py-2.5 rounded-xl text-sm font-medium ${
                  comprobanteEsteMes.estado === 'pendiente' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                  comprobanteEsteMes.estado === 'rechazado' ? 'bg-red-50 text-red-700 border border-red-200' :
                  'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {comprobanteEsteMes.estado === 'pendiente' && '⏳ Comprobante en revisión'}
                  {comprobanteEsteMes.estado === 'rechazado' && '❌ Comprobante rechazado — vuelve a enviar'}
                  {comprobanteEsteMes.estado === 'aprobado' && '✅ Comprobante aprobado'}
                </div>
              ) : (
                <Link
                  href="/portal/pagar"
                  className="block w-full text-center bg-sky-500 hover:bg-sky-600 text-white font-medium py-2.5 rounded-xl text-sm transition-colors"
                >
                  Enviar comprobante de pago
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Historial */}
        <div className="bg-white rounded-2xl border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Historial de pagos</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {pagos && pagos.length > 0 ? pagos.map(p => (
              <div key={p.id} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-800">{p.mes_correspondiente}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{p.metodo} · {new Date(p.fecha_pago).toLocaleDateString('es-VE')}</p>
                </div>
                <p className="text-sm font-semibold text-emerald-600">${p.monto.toFixed(2)}</p>
              </div>
            )) : (
              <div className="px-5 py-8 text-center text-slate-400 text-sm">Sin pagos registrados aún</div>
            )}
          </div>
        </div>

        {/* Soporte */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-800 mb-3">Contactar soporte</h2>
          <div className="flex gap-3">
            <a
              href="https://wa.me/584124009952"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-2 text-sm text-emerald-600 font-medium bg-emerald-50 hover:bg-emerald-100 py-2.5 rounded-xl transition-colors"
            >
              📱 WhatsApp
            </a>
            <a
              href="https://t.me/+13815516550"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-2 text-sm text-sky-600 font-medium bg-sky-50 hover:bg-sky-100 py-2.5 rounded-xl transition-colors"
            >
              ✈️ Telegram
            </a>
          </div>
          <a
            href="tel:+584124009952"
            className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-600 font-medium bg-slate-50 hover:bg-slate-100 py-2.5 rounded-xl transition-colors w-full"
          >
            📞 Llamar: +58 412-4009952
          </a>
        </div>

      </div>
    </div>
  )
}
