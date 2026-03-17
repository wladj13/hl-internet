'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Plan } from '@/lib/types'

export async function crearCliente(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('clientes').insert({
    nombre: formData.get('nombre') as string,
    cedula: (formData.get('cedula') as string).trim(),
    telefono: (formData.get('telefono') as string).trim(),
    direccion: formData.get('direccion') as string,
    plan: formData.get('plan') as Plan,
    monto: parseFloat(formData.get('monto') as string),
    activo: true,
  })
  if (error) throw new Error(error.message)
  revalidatePath('/clientes')
}

export async function actualizarCliente(id: string, formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('clientes').update({
    nombre: formData.get('nombre') as string,
    direccion: formData.get('direccion') as string,
    plan: formData.get('plan') as Plan,
    monto: parseFloat(formData.get('monto') as string),
  }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/clientes')
  revalidatePath(`/clientes/${id}`)
}

export async function toggleClienteActivo(id: string, activo: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('clientes').update({ activo }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/clientes')
}

export async function eliminarCliente(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('clientes').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/clientes')
}
