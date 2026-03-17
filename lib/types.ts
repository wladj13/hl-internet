export type Plan = 'Basico' | 'Estandar' | 'Premium'

export type EstadoPago = 'pagado' | 'pendiente' | 'vencido'

export interface Cliente {
  id: string
  nombre: string
  direccion: string
  plan: Plan
  monto: number
  activo: boolean
  created_at: string
}

export interface Pago {
  id: string
  cliente_id: string
  monto: number
  fecha_pago: string
  mes_correspondiente: string
  metodo: string
  notas: string | null
  created_at: string
  clientes?: Cliente
}

export interface ClienteConEstado extends Cliente {
  estado: EstadoPago
  ultimo_pago: string | null
}
