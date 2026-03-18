'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function registrarCliente(formData: FormData) {
  const cedula = (formData.get('cedula') as string).trim()
  const telefono = (formData.get('telefono') as string).trim()
  const nombre = (formData.get('nombre') as string).trim()
  const direccion = (formData.get('direccion') as string).trim()

  const supabase = createAdminClient()

  const { data: existente } = await supabase
    .from('clientes')
    .select('id')
    .eq('cedula', cedula)
    .single()

  if (existente) redirect('/portal/registro?error=cedula')

  const { data: cliente, error } = await supabase
    .from('clientes')
    .insert({ nombre, cedula, telefono, direccion, plan: 'Basico', monto: 15.00, activo: true })
    .select('id')
    .single()

  if (error || !cliente) redirect('/portal/registro?error=general')

  const cookieStore = await cookies()
  cookieStore.set('cliente_id', cliente.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  await notificarTelegram(
    `🆕 <b>Nuevo cliente registrado</b>\n\n` +
    `👤 Nombre: ${nombre}\n` +
    `🪪 Cédula: ${cedula}\n` +
    `📞 Teléfono: ${telefono}\n` +
    `🏠 Dirección: ${direccion}\n` +
    `📦 Plan: Básico · $15.00/mes`
  )

  redirect('/portal/inicio')
}

export async function loginCliente(formData: FormData) {
  const cedula = (formData.get('cedula') as string).trim()
  const telefono = (formData.get('telefono') as string).trim()

  const supabase = createAdminClient()
  const { data: cliente } = await supabase
    .from('clientes')
    .select('id, nombre, activo')
    .eq('cedula', cedula)
    .eq('telefono', telefono)
    .single()

  if (!cliente) redirect('/portal?error=notfound')
  if (!cliente.activo) redirect('/portal?error=inactive')

  const cookieStore = await cookies()
  cookieStore.set('cliente_id', cliente.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  redirect('/portal/inicio')
}

export async function logoutCliente() {
  const cookieStore = await cookies()
  cookieStore.delete('cliente_id')
  redirect('/portal')
}

async function notificarTelegram(mensaje: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: mensaje, parse_mode: 'HTML' }),
  })
}

export async function subirComprobante(formData: FormData) {
  const cookieStore = await cookies()
  const clienteId = cookieStore.get('cliente_id')?.value
  if (!clienteId) redirect('/portal')

  const supabase = createAdminClient()
  const foto = formData.get('foto') as File
  const mes = formData.get('mes_correspondiente') as string
  const fecha = formData.get('fecha_pago') as string
  const referencia = formData.get('referencia') as string

  const ext = foto.name.split('.').pop()
  const fileName = `${clienteId}/${mes}-${Date.now()}.${ext}`

  const arrayBuffer = await foto.arrayBuffer()
  const { error: uploadError } = await supabase.storage
    .from('comprobantes')
    .upload(fileName, arrayBuffer, { contentType: foto.type })

  if (uploadError) throw new Error(uploadError.message)

  const { data: { publicUrl } } = supabase.storage
    .from('comprobantes')
    .getPublicUrl(fileName)

  const [{ data: cliente }, { data: existente }] = await Promise.all([
    supabase.from('clientes').select('nombre, cedula').eq('id', clienteId).single(),
    supabase.from('comprobantes').select('id').eq('cliente_id', clienteId).eq('mes_correspondiente', mes).in('estado', ['pendiente', 'aprobado']).maybeSingle(),
  ])

  if (existente) redirect('/portal/inicio?enviado=1')

  await supabase.from('comprobantes').insert({
    cliente_id: clienteId,
    mes_correspondiente: mes,
    fecha_pago: fecha,
    foto_url: publicUrl,
    referencia: referencia || null,
    estado: 'pendiente',
  })

  await notificarTelegram(
    `💰 <b>Nuevo comprobante de pago</b>\n\n` +
    `👤 Cliente: ${cliente?.nombre ?? 'Desconocido'}\n` +
    `🪪 Cédula: ${cliente?.cedula ?? '-'}\n` +
    `📅 Mes: ${mes}\n` +
    `📆 Fecha de pago: ${fecha}\n` +
    `🔖 Referencia: ${referencia || 'No indicada'}`
  )

  redirect('/portal/inicio?enviado=1')
}
