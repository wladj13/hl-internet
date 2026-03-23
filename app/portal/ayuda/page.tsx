'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  UserPlus, 
  LogIn, 
  Activity, 
  UploadCloud, 
  CheckCircle2, 
  FileText,
  MessageCircle,
  Send,
  Wifi,
  ChevronRight
} from 'lucide-react'

const pasos = [
  {
    numero: '1',
    titulo: 'Crea tu cuenta',
    icon: UserPlus,
    descripcion: 'Si es tu primera vez, ve a "Regístrate" en la pantalla de inicio. Ingresa tu nombre completo, número de cédula, teléfono y dirección. Tu cuenta quedará activa de inmediato.',
    color: 'bg-blue-500'
  },
  {
    numero: '2',
    titulo: 'Ingresa al portal',
    icon: LogIn,
    descripcion: 'Usa tu número de cédula (sin V-) y tu número de teléfono para iniciar sesión en el portal.',
    color: 'bg-indigo-500'
  },
  {
    numero: '3',
    titulo: 'Revisa tu estado',
    icon: Activity,
    descripcion: 'Al ingresar verás el estado de tu pago del mes actual: Pagado, Pendiente o Vencido. También puedes ver tu historial completo de pagos.',
    color: 'bg-violet-500'
  },
  {
    numero: '4',
    titulo: 'Envía tu comprobante',
    icon: UploadCloud,
    descripcion: 'Si aún no has pagado, presiona "Enviar comprobante". Selecciona el mes, la fecha, y adjunta una imagen de tu transferencia para validación.',
    color: 'bg-fuchsia-500'
  },
  {
    numero: '5',
    titulo: 'Validación admin',
    icon: CheckCircle2,
    descripcion: 'Un administrador revisará tu comprobante. Una vez aprobado, tu estado cambiará a "Pagado" y recibirás tu recibo digital.',
    color: 'bg-emerald-500'
  },
  {
    numero: '6',
    titulo: 'Descarga tu recibo',
    icon: FileText,
    descripcion: 'Cuando tu pago esté confirmado, aparecerá el botón "Ver recibo". Puedes imprimirlo o guardarlo como PDF para tus registros.',
    color: 'bg-sky-500'
  },
]

export default function AyudaPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfd]">
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/portal" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm">
            <ArrowLeft size={18} />
            <span>Volver</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-indigo"></div>
            <p className="font-extrabold text-slate-900 text-sm tracking-tight">Manual de Ayuda</p>
          </div>
          <div className="w-10"></div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-10 space-y-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-primary-indigo to-primary-violet rounded-[2.5rem] p-8 text-white shadow-2xl overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-black tracking-tight mb-2 leading-none">¿Cómo usar el portal?</h1>
            <p className="text-white/70 text-sm font-medium leading-relaxed">Sigue estos pasos para gestionar tu servicio de internet como un experto.</p>
          </div>
        </motion.div>

        <div className="space-y-4">
          {pasos.map((paso, idx) => (
            <motion.div 
              key={paso.numero}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass rounded-3xl border border-white/20 p-5 flex gap-5 hover:border-primary-indigo/30 transition-all group"
            >
              <div className={`shrink-0 w-12 h-12 rounded-2xl ${paso.color}/10 flex items-center justify-center text-slate-800 transition-transform group-hover:scale-110`}>
                <paso.icon size={22} className="opacity-90" />
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-black text-slate-900 text-sm">{paso.numero}. {paso.titulo}</p>
                  <ChevronRight size={14} className="text-slate-300" />
                </div>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">{paso.descripcion}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="glass rounded-[2rem] border border-white/20 p-8 shadow-xl">
          <p className="font-black text-slate-900 text-lg mb-6 text-center">¿Aún tienes dudas?</p>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="https://wa.me/584124009952"
              target="_blank"
              className="flex flex-col items-center justify-center gap-3 py-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 transition-all font-black text-[10px] uppercase tracking-widest"
            >
              <MessageCircle size={24} />
              WhatsApp
            </a>
            <a
              href="https://t.me/+13815516550"
              target="_blank"
              className="flex flex-col items-center justify-center gap-3 py-6 rounded-2xl bg-sky-500/5 border border-sky-500/10 text-sky-600 hover:bg-sky-500/10 transition-all font-black text-[10px] uppercase tracking-widest"
            >
              <Send size={24} />
              Telegram
            </a>
          </div>
        </div>

        <div className="text-center pb-10 flex flex-col items-center gap-3">
           <Wifi size={24} className="text-slate-200" />
           <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]">HL Internet v2.0</p>
        </div>
      </div>
    </div>
  )
}
