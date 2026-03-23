import { EstadoPago } from '@/lib/types'

const config: Record<EstadoPago, { label: string; className: string }> = {
  pagado: { 
    label: 'Pagado',   
    className: 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-[0_0_8px_rgba(16,185,129,0.1)]' 
  },
  pendiente: { 
    label: 'Pendiente', 
    className: 'bg-amber-50 text-amber-600 border-amber-100 shadow-[0_0_8px_rgba(245,158,11,0.1)]' 
  },
  vencido: { 
    label: 'Vencido',  
    className: 'bg-rose-50 text-rose-600 border-rose-100 shadow-[0_0_8px_rgba(244,63,94,0.1)]' 
  },
}

export default function EstadoBadge({ estado }: { estado: EstadoPago }) {
  const { label, className } = config[estado]
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${className}`}>
      {label}
    </span>
  )
}
