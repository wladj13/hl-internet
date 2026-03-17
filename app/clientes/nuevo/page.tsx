import { crearCliente } from '@/lib/actions/clientes'
import { redirect } from 'next/navigation'
import Link from 'next/link'

async function action(formData: FormData) {
  'use server'
  await crearCliente(formData)
  redirect('/clientes')
}

export default function NuevoClientePage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/clientes" className="text-sm text-slate-500 hover:text-slate-700">← Volver a clientes</Link>
        <h1 className="text-2xl font-bold text-slate-800 mt-2">Nuevo cliente</h1>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-8 max-w-lg">
        <form action={action} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre completo</label>
            <input
              name="nombre"
              type="text"
              required
              placeholder="Juan Pérez"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Cédula de identidad</label>
            <input
              name="cedula"
              type="text"
              required
              placeholder="12345678"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Teléfono</label>
            <input
              name="telefono"
              type="tel"
              required
              placeholder="04121234567"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Dirección</label>
            <input
              name="direccion"
              type="text"
              required
              placeholder="Urb. Los Pinos, Casa #5"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Plan</label>
            <select
              name="plan"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white"
            >
              <option value="">Seleccionar plan...</option>
              <option value="Basico">Básico</option>
              <option value="Estandar">Estándar</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Monto mensual ($)</label>
            <input
              name="monto"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="15.00"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Link href="/clientes" className="flex-1 text-center py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              Cancelar
            </Link>
            <button
              type="submit"
              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
            >
              Guardar cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
