'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function registrarPago(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('pagos').insert({
    cliente_id: formData.get('cliente_id') as string,
    monto: parseFloat(formData.get('monto') as string),
    fecha_pago: formData.get('fecha_pago') as string,
    mes_correspondiente: formData.get('mes_correspondiente') as string,
    metodo: formData.get('metodo') as string,
    notas: formData.get('notas') as string || null,
  })
  if (error) throw new Error(error.message)
  revalidatePath('/pagos')
  revalidatePath('/dashboard')
}

export async function eliminarPago(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('pagos').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/pagos')
  revalidatePath('/dashboard')
}
