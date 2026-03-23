'use client'

import { motion } from 'framer-motion'
import { 
  Wifi, 
  User, 
  CreditCard, 
  History, 
  MessageSquare, 
  Phone,
  FileText,
  AlertCircle,
  Plus,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  LogOut,
  Clock
} from 'lucide-react'
import Link from 'next/link'
import EstadoBadge from '@/components/EstadoBadge'
import { logoutCliente } from '@/lib/actions/portal'
import NotificacionComprobante from '@/components/NotificacionComprobante'

export default function PortalClient({ 
  cliente, 
  pagos, 
  comprobanteEsteMes, 
  estado, 
  mesActual, 
  enviado 
}: any) {
  return (
    <div className="min-h-screen bg-[#fcfcfd] pb-24">
      {/* Premium Header */}
      <div className="h-48 bg-gradient-to-br from-primary-indigo to-primary-violet pt-8 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-20 -mt-20"></div>
        
        <div className="max-w-lg mx-auto flex items-start justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/10">
              <Wifi size={28} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest leading-none">Mi Cuenta</p>
              <h1 className="text-xl font-extrabold text-white mt-1">{cliente.nombre}</h1>
              <p className="text-white/60 text-[10px] font-medium mt-1 uppercase tracking-tighter">Plan de Internet: {cliente.plan}</p>
            </div>
          </div>
          
          <form action={logoutCliente}>
            <button className="p-2.5 glass rounded-xl text-white/80 hover:text-white transition-colors">
              <LogOut size={18} />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 -mt-10 relative z-20 space-y-6">
        {/* Notificaciones */}
        {comprobanteEsteMes && (comprobanteEsteMes.estado === 'aprobado' || comprobanteEsteMes.estado === 'rechazado') && (
          <NotificacionComprobante
            comprobanteId={comprobanteEsteMes.id}
            estado={comprobanteEsteMes.estado}
            mes={mesActual}
          />
        )}

        {enviado && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl p-5 border border-emerald-500/20 bg-emerald-50/50 flex gap-4 items-center"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
              <Plus size={20} />
            </div>
            <div>
              <p className="text-emerald-900 text-sm font-bold">Comprobante enviado</p>
              <p className="text-emerald-700 text-xs mt-0.5">Estamos validando tu pago, te avisaremos pronto.</p>
            </div>
          </motion.div>
        )}

        {/* Global Alert */}
        {estado === 'vencido' && !comprobanteEsteMes && (
          <div className="glass rounded-3xl p-5 border border-rose-500/20 bg-rose-50/50 flex gap-4 items-start shadow-xl shadow-rose-500/5">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-500 flex items-center justify-center shrink-0 border border-rose-200">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-rose-900 text-sm font-bold">Pago Pendiente</p>
              <p className="text-rose-700 text-xs mt-0.5 font-medium leading-relaxed">
                Tu servicio vence pronto. Por favor envía tu comprobante para evitar cortes el próximo <strong>día 5</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Main Card: Estado actual */}
        <div className="glass rounded-[2.5rem] p-8 border border-white/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Wifi size={120} />
          </div>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary-indigo animate-pulse"></div>
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Resumen Actual</h2>
            </div>
            <EstadoBadge estado={estado} />
          </div>

          <div className="grid grid-cols-2 gap-y-6">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Mes de servicio</p>
              <p className="text-lg font-bold text-slate-900 mt-1">{mesActual}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Monto a pagar</p>
              <p className="text-lg font-extrabold text-primary-indigo mt-1">${cliente.monto.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Día de pago</p>
              <p className="text-sm font-bold text-slate-700 mt-1">Antes del 05</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Plan Contratado</p>
              <p className="text-sm font-bold text-slate-700 mt-1">{cliente.plan}</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100/50">
            {estado === 'pagado' ? (
              <Link
                href={`/portal/recibo/${pagos[0]?.id}`}
                className="w-full h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center gap-3 text-emerald-600 font-bold text-sm hover:scale-[1.02] transition-transform shadow-lg shadow-emerald-500/5"
              >
                <FileText size={18} />
                Descargar Recibo
              </Link>
            ) : comprobanteEsteMes ? (
               <div className="w-full h-14 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center gap-2 text-amber-600 font-bold text-sm">
                  <Clock size={18} />
                  <span>Comprobante en Revisión</span>
               </div>
            ) : (
              <Link
                href="/portal/pagar"
                className="w-full relative group h-14"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-indigo to-primary-violet rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative h-full w-full bg-gradient-to-r from-primary-indigo to-primary-violet rounded-2xl flex items-center justify-center gap-3 text-white font-bold text-sm hover:scale-[1.01] active:scale-[0.98] transition-all">
                  <CreditCard size={18} />
                  <span>Informar mi Pago</span>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Historial Card */}
        <div className="glass rounded-[2rem] border border-white/20 shadow-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History size={16} className="text-primary-indigo" />
              <h3 className="text-sm font-bold text-slate-800">Pagos Recientes</h3>
            </div>
          </div>
          <div className="divide-y divide-slate-100/50">
            {pagos.slice(0, 3).map((p: any) => (
              <div key={p.id} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                    <FileText size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">{p.mes_correspondiente}</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">{new Date(p.fecha_pago).toLocaleDateString('es-VE')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-emerald-600">${p.monto.toFixed(2)}</p>
                  <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">{p.metodo}</p>
                </div>
              </div>
            ))}
          </div>
          {pagos.length > 3 && (
             <Link href="/portal/historial" className="block text-center py-4 bg-slate-50/50 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest hover:text-primary-indigo transition-colors border-t border-slate-100">
               Ver historial completo
             </Link>
          )}
        </div>

        {/* Support Card */}
        <div className="glass rounded-[2rem] p-6 border border-white/10 shadow-lg">
          <h3 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2">
            <MessageSquare size={16} className="text-primary-indigo" />
            Centro de Ayuda
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://wa.me/584124009952"
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 hover:scale-[1.02] transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/10 mb-1">
                <MessageSquare size={18} fill="currentColor" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider">WhatsApp</span>
            </a>
            <a
              href="https://t.me/+13815516550"
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-sky-50 border border-sky-100 text-sky-700 hover:scale-[1.02] transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/10 mb-1">
                <Wifi size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider">Telegram</span>
            </a>
          </div>
          <a
            href="tel:+584124009952"
            className="w-full mt-3 flex items-center justify-center gap-3 py-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-all font-bold text-xs"
          >
            <Phone size={16} />
            Llamada Directa
          </a>
        </div>
      </div>
    </div>
  )
}
