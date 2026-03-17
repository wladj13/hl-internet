import { createAdminClient } from '@/lib/supabase/admin'
import { cookies } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import BtnImprimir from '@/components/BtnImprimir'

export default async function ReciboPage({ params }: { params: Promise<{ pagoId: string }> }) {
  const { pagoId } = await params
  const cookieStore = await cookies()
  const clienteId = cookieStore.get('cliente_id')?.value
  if (!clienteId) redirect('/portal')

  const supabase = createAdminClient()

  const [{ data: pago }, { data: cliente }] = await Promise.all([
    supabase.from('pagos').select('*').eq('id', pagoId).eq('cliente_id', clienteId).single(),
    supabase.from('clientes').select('*').eq('id', clienteId).single(),
  ])

  if (!pago || !cliente) notFound()

  const numeroRecibo = pagoId.split('-')[0].toUpperCase()
  const fechaEmision = new Date().toLocaleDateString('es-VE', { day: '2-digit', month: 'long', year: 'numeric' })
  const fechaPago = new Date(pago.fecha_pago).toLocaleDateString('es-VE', { day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
        }
      `}</style>

      {/* Toolbar */}
      <div className="no-print bg-slate-800 text-white px-6 py-3 flex items-center justify-between">
        <a href="/portal/inicio" className="text-sm text-slate-300 hover:text-white">← Volver al portal</a>
        <BtnImprimir />
      </div>

      {/* Recibo */}
      <div className="min-h-screen bg-slate-100 flex items-start justify-center p-6 pt-10">
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

          {/* Header */}
          <div className="bg-sky-500 px-8 py-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">HL Internet</div>
                <div className="text-sky-100 text-sm mt-0.5">Proveedor de servicios de internet</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-sky-200 uppercase tracking-wide">Recibo</div>
                <div className="text-xl font-bold">#{numeroRecibo}</div>
              </div>
            </div>
          </div>

          <div className="px-8 py-6 space-y-6">

            {/* Estado */}
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
              <span className="text-emerald-800 font-medium text-sm">Pago confirmado</span>
              <span className="text-emerald-600 font-bold text-lg">✓</span>
            </div>

            {/* Datos del cliente */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Datos del cliente</p>
              <div className="space-y-2">
                {[
                  { label: 'Nombre', value: cliente.nombre },
                  { label: 'Cédula', value: cliente.cedula },
                  { label: 'Dirección', value: cliente.direccion },
                  { label: 'Plan', value: cliente.plan },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-medium text-slate-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100" />

            {/* Detalle del pago */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Detalle del pago</p>
              <div className="space-y-2">
                {[
                  { label: 'Mes correspondiente', value: pago.mes_correspondiente },
                  { label: 'Fecha de pago', value: fechaPago },
                  { label: 'Método', value: pago.metodo },
                  ...(pago.notas ? [{ label: 'Notas', value: pago.notas }] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-medium text-slate-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100" />

            {/* Monto */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Total pagado</span>
              <span className="text-2xl font-bold text-emerald-600">${pago.monto.toFixed(2)}</span>
            </div>

          </div>

          {/* Footer */}
          <div className="bg-slate-50 border-t border-slate-100 px-8 py-4 text-center">
            <p className="text-xs text-slate-400">Emitido el {fechaEmision} · HL Internet</p>
          </div>

        </div>
      </div>
    </>
  )
}
