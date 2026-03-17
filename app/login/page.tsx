import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default function LoginPage() {
  async function login(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    })
    if (!error) redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-sky-500 rounded-2xl text-white font-bold text-xl mb-4">HL</div>
          <h1 className="text-2xl font-bold text-slate-800">HL Internet</h1>
          <p className="text-slate-500 text-sm mt-1">Panel de gestión de clientes</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Iniciar sesión</h2>
          <form action={login} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Correo electrónico</label>
              <input
                name="email"
                type="email"
                required
                placeholder="usuario@hlinternet.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Contraseña</label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2.5 rounded-lg text-sm transition-colors mt-2"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
