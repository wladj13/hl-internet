import { EstadoPago } from '@/lib/types'

const config: Record<EstadoPago, { label: string; className: string }> = {
  pagado:   { label: 'Pagado',   className: 'bg-emerald-100 text-emerald-700' },
  pendiente:{ label: 'Pendiente',className: 'bg-amber-100 text-amber-700' },
  vencido:  { label: 'Vencido', className: 'bg-red-100 text-red-700' },
}

export default function EstadoBadge({ estado }: { estado: EstadoPago }) {
  const { label, className } = config[estado]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}
