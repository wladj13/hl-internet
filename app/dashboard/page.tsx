import { createClient } from '@/lib/supabase/server'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()

  const now = new Date()
  const mesActual = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  const [{ data: clientes }, { data: pagosEsteMes }, { data: ultimosPagos }] = await Promise.all([
    supabase.from('clientes').select('*').eq('activo', true),
    supabase.from('pagos').select('*').eq('mes_correspondiente', mesActual),
    supabase.from('pagos').select('*, clientes(nombre)').order('created_at', { ascending: false }).limit(5),
  ])

  const totalClientes = clientes?.length ?? 0
  const clientesPagados = pagosEsteMes?.length ?? 0
  const clientesPendientes = totalClientes - clientesPagados
  const montoCobrado = pagosEsteMes?.reduce((acc, p) => acc + p.monto, 0) ?? 0
  const totalEsperado = clientes?.reduce((acc, c) => acc + (c.monto || 0), 0) ?? 0

  return (
    <DashboardClient 
      stats={{
        totalClientes,
        clientesPagados,
        clientesPendientes,
        montoCobrado,
        totalEsperado,
        ultimosPagos: ultimosPagos || []
      }}
    />
  )
}
