import { createAdminClient } from '@/lib/supabase/admin'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { logoutCliente } from '@/lib/actions/portal'
import Link from 'next/link'
import EstadoBadge from '@/components/EstadoBadge'
import { EstadoPago } from '@/lib/types'
import NotificacionComprobante from '@/components/NotificacionComprobante'
import { 
  Wifi, 
  User, 
  CreditCard, 
  History, 
  HelpCircle, 
  MessageSquare, 
  Phone,
  FileText,
  AlertCircle,
  Plus
} from 'lucide-react'
import PortalClient from './PortalClient'

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

  if (!cliente) redirect('/portal/reset')

  const pagoEsteMes = pagos?.find(p => p.mes_correspondiente === mesActual)
  const comprobanteEsteMes = comprobantes?.find(c => c.mes_correspondiente === mesActual)

  let estado: EstadoPago = 'vencido'
  if (pagoEsteMes) estado = 'pagado'
  else if (now.getDate() <= 10) estado = 'pendiente'

  return (
    <PortalClient 
      cliente={cliente}
      pagos={pagos || []}
      comprobanteEsteMes={comprobanteEsteMes}
      estado={estado}
      mesActual={mesActual}
      enviado={enviado === 'true'}
    />
  )
}
