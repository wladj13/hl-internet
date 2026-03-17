'use client'

import { eliminarCliente } from '@/lib/actions/clientes'
import { useRouter } from 'next/navigation'

export default function BtnEliminarCliente({ id }: { id: string }) {
  const router = useRouter()

  async function handleEliminar() {
    if (!confirm('¿Eliminar este cliente?')) return
    await eliminarCliente(id)
    router.push('/clientes')
  }

  return (
    <button
      type="button"
      onClick={handleEliminar}
      className="w-full text-sm font-medium py-2.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
    >
      Eliminar cliente
    </button>
  )
}
