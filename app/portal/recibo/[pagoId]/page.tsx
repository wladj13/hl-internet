import { createAdminClient } from '@/lib/supabase/admin'
import { cookies } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import BtnImprimir from '@/components/BtnImprimir'
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  CheckCircle2, 
  Wifi, 
  Calendar, 
  User, 
  MapPin, 
  Zap,
  ShieldCheck,
  Hash,
  FileText
} from 'lucide-react'

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
    <div className="min-h-screen bg-[#fcfcfd]">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0; padding: 0; }
          .receipt-container { 
            box-shadow: none !important; 
            border: none !important; 
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
          }
          .receipt-header { border-radius: 0 !important; }
        }
      `}</style>

      {/* Toolbar */}
      <div className="no-print bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            href="/portal/inicio" 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm"
          >
            <ArrowLeft size={18} />
            <span>Volver</span>
          </Link>
          <div className="flex items-center gap-3">
            <BtnImprimir />
          </div>
        </div>
      </div>

      {/* Recibo */}
      <div className="flex items-start justify-center p-6 sm:p-10 pb-20">
        <div className="receipt-container bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden">

          {/* Header */}
          <div className="receipt-header bg-gradient-to-br from-slate-900 to-primary-indigo px-10 py-10 text-white relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <Wifi size={120} />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                      <Wifi size={24} className="text-white" />
                   </div>
                   <div className="text-3xl font-black tracking-tighter italic">HL INTERNET</div>
                </div>
                <div className="text-white/60 text-xs font-bold uppercase tracking-widest pl-1">Conectividad de alto rendimiento</div>
              </div>
              <div className="text-left sm:text-right">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 border border-white/10">
                   <Hash size={12} />
                   Referencia de Pago
                </div>
                <div className="text-3xl font-black tracking-tight leading-none italic">#{numeroRecibo}</div>
              </div>
            </div>
          </div>

          <div className="px-10 py-10 space-y-10">

            {/* Status Badge */}
            <div className="flex items-center justify-between bg-emerald-50/50 border border-emerald-100 rounded-[1.5rem] px-6 py-4">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <CheckCircle2 size={18} />
                 </div>
                 <div>
                    <span className="text-emerald-900 font-black text-sm uppercase tracking-wide">Pago Confirmado</span>
                    <p className="text-[10px] text-emerald-600 font-bold italic">Procesado exitosamente por administración</p>
                 </div>
              </div>
              <div className="hidden sm:block px-4 py-2 bg-emerald-100/50 rounded-xl text-emerald-600 font-black text-xs">
                 VERIFIED OK
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
               {/* Client Box */}
               <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                     <User size={12} />
                     Titular del Servicio
                  </div>
                  <div className="glass rounded-2xl p-5 border border-slate-100 space-y-3">
                     <div>
                        <p className="text-xs text-slate-400 font-bold mb-1">Nombre</p>
                        <p className="text-sm font-black text-slate-900">{cliente.nombre}</p>
                     </div>
                     <div>
                        <p className="text-xs text-slate-400 font-bold mb-1">Cédula</p>
                        <p className="text-sm font-black text-slate-900">{cliente.cedula}</p>
                     </div>
                     <div>
                        <p className="text-xs text-slate-400 font-bold mb-1">Dirección</p>
                        <p className="text-xs font-bold text-slate-600 leading-relaxed">{cliente.direccion}</p>
                     </div>
                  </div>
               </div>

               {/* Service Box */}
               <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                     <Zap size={12} />
                     Detalles del Servicio
                  </div>
                  <div className="glass rounded-2xl p-5 border border-slate-100 space-y-3">
                     <div className="flex justify-between items-center">
                        <p className="text-xs text-slate-400 font-bold">Plan</p>
                        <p className="text-sm font-black text-primary-indigo uppercase">{cliente.plan}</p>
                     </div>
                     <div className="flex justify-between items-center">
                        <p className="text-xs text-slate-400 font-bold">Mes pagado</p>
                        <p className="text-sm font-black text-slate-900">{pago.mes_correspondiente}</p>
                     </div>
                     <div className="flex justify-between items-center">
                        <p className="text-xs text-slate-400 font-bold">Fecha de pago</p>
                        <p className="text-sm font-black text-slate-900">{fechaPago}</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="border-t border-slate-100 pt-8">
               <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-10 bg-slate-50/50 rounded-[2rem] border border-slate-100">
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center">
                        <ShieldCheck size={32} className="text-primary-indigo opacity-80" />
                     </div>
                     <div>
                        <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Total Transacción</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{pago.metodo}</p>
                     </div>
                  </div>
                  <div className="text-center sm:text-right">
                     <div className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tighter leading-none italic">
                        ${pago.monto.toFixed(2)}
                     </div>
                     <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mt-2">DÉBITO PROCESADO</p>
                  </div>
               </div>
            </div>

            {pago.notas && (
              <div className="p-5 bg-amber-50/30 border border-amber-100 rounded-2xl">
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                   <FileText size={12} />
                   Observaciones
                </p>
                <p className="text-xs font-bold text-amber-900 leading-relaxed italic">"{pago.notas}"</p>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="bg-slate-900 px-10 py-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-indigo/20 to-primary-violet/20 opacity-30"></div>
            <div className="relative z-10 flex flex-col items-center gap-4">
               <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                  <Calendar size={14} className="text-slate-400" />
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Emitido el {fechaEmision}</p>
               </div>
               <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.4em] mt-2">HL INTERNET &bull; CONECTIVIDAD SIN LÍMITES</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
