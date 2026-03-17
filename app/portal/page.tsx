import { loginCliente } from '@/lib/actions/portal'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function PortalLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const cookieStore = await cookies()
  if (cookieStore.get('cliente_id')) redirect('/portal/inicio')
  const { error } = await searchParams

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-500 rounded-2xl text-white font-bold text-2xl mb-4 shadow-lg shadow-sky-200">HL</div>
          <h1 className="text-2xl font-bold text-slate-800">HL Internet</h1>
          <p className="text-slate-500 text-sm mt-1">Portal del cliente</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-1">Bienvenido</h2>
          <p className="text-slate-500 text-sm mb-6">Ingresa con tu cédula y teléfono</p>

          {error === 'notfound' && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
              Cédula o teléfono incorrectos. Verifica tus datos.
            </div>
          )}
          {error === 'inactive' && (
            <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-700">
              Tu cuenta está inactiva. Contacta a soporte.
            </div>
          )}

          <form action={loginCliente} className="space-y-4">
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
            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2.5 rounded-lg text-sm transition-colors mt-2"
            >
              Ingresar
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            ¿No tienes cuenta?{' '}
            <Link href="/portal/registro" className="text-sky-600 hover:text-sky-700 font-medium">
              Regístrate
            </Link>
          </p>

          <div className="mt-4 pt-5 border-t border-slate-100 text-center">
            <Link href="/portal/ayuda" className="text-xs text-sky-600 hover:text-sky-700 font-medium">
              ¿Cómo usar el portal? Ver manual
            </Link>
            <p className="text-xs text-slate-400 mt-3 mb-3">¿Problemas para ingresar? Contacta soporte</p>
            <div className="flex gap-2 justify-center">
              <a
                href="https://wa.me/13815516550"
                target="_blank"
                className="flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-medium bg-emerald-50 px-3 py-1.5 rounded-lg"
              >
                📱 WhatsApp
              </a>
              <a
                href="https://t.me/+13815516550"
                target="_blank"
                className="flex items-center gap-1.5 text-xs text-sky-600 hover:text-sky-700 font-medium bg-sky-50 px-3 py-1.5 rounded-lg"
              >
                ✈️ Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
