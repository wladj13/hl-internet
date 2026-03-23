import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import FormComprobante from '@/components/FormComprobante'
import { ArrowLeft, ShieldCheck, BadgeCheck } from 'lucide-react'

export default async function PortalPagarPage() {
  const cookieStore = await cookies()
  if (!cookieStore.get('cliente_id')) redirect('/portal')

  const now = new Date()
  const mesActual = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const hoy = now.toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-[#fcfcfd]">
      {/* Dynamic Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            href="/portal/inicio" 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm"
          >
            <ArrowLeft size={18} />
            <span>Volver</span>
          </Link>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-primary-indigo"></div>
             <p className="font-extrabold text-slate-900 text-sm tracking-tight">Reportar Pago</p>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 pt-10 pb-20 space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-indigo/5 text-primary-indigo rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <BadgeCheck size={12} />
            Seguridad SSL v2
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none mb-3">Envía tu recibo</h1>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            Completa los datos de tu transferencia para procesar tu pago lo más pronto posible.
          </p>
        </div>

        <div className="glass rounded-[2.5rem] p-8 border border-white/20 shadow-2xl">
          <FormComprobante mesActual={mesActual} hoy={hoy} />
        </div>

        <div className="flex flex-col items-center gap-6 pt-4 text-center">
          <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <ShieldCheck size={14} className="text-slate-300" />
            Tus datos están protegidos por encriptación
          </div>
          
          <div className="text-[10px] text-slate-300 font-medium max-w-[200px] leading-relaxed">
            HL Internet utiliza Supabase para el almacenamiento seguro de datos administrativos.
          </div>
        </div>
      </div>
    </div>
  )
}
