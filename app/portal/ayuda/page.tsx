import Link from 'next/link'

const pasos = [
  {
    numero: '1',
    titulo: 'Crea tu cuenta',
    descripcion: 'Si es tu primera vez, ve a "Regístrate" en la pantalla de inicio. Ingresa tu nombre completo, número de cédula, teléfono y dirección. Tu cuenta quedará activa de inmediato.',
  },
  {
    numero: '2',
    titulo: 'Ingresa al portal',
    descripcion: 'Usa tu número de cédula (sin V-) y tu número de teléfono para iniciar sesión en el portal.',
  },
  {
    numero: '3',
    titulo: 'Revisa tu estado de pago',
    descripcion: 'Al ingresar verás el estado de tu pago del mes actual: Pagado, Pendiente o Vencido. También puedes ver tu historial completo de pagos.',
  },
  {
    numero: '4',
    titulo: 'Envía tu comprobante',
    descripcion: 'Si aún no has pagado, presiona "Enviar comprobante de pago". Selecciona el mes, la fecha en que realizaste el pago, el número de referencia (opcional) y toma una foto del comprobante de transferencia.',
  },
  {
    numero: '5',
    titulo: 'Espera la confirmación',
    descripcion: 'Un administrador revisará tu comprobante. Una vez aprobado, tu estado cambiará a "Pagado" y podrás descargar tu recibo desde el portal.',
  },
  {
    numero: '6',
    titulo: 'Descarga tu recibo',
    descripcion: 'Cuando tu pago esté confirmado, aparecerá el botón "Ver recibo de pago". Puedes imprimirlo o guardarlo como PDF desde tu navegador.',
  },
]

export default function AyudaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-sky-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">HL</div>
            <p className="font-semibold text-slate-800 text-sm">Manual de uso</p>
          </div>
          <Link href="/portal" className="text-sm text-slate-400 hover:text-slate-600">
            ← Volver
          </Link>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 py-6 space-y-4">

        <div className="bg-sky-500 rounded-2xl p-6 text-white">
          <h1 className="text-xl font-bold mb-1">¿Cómo usar el portal?</h1>
          <p className="text-sky-100 text-sm">Sigue estos pasos para gestionar tu servicio de internet fácilmente.</p>
        </div>

        {pasos.map((paso) => (
          <div key={paso.numero} className="bg-white rounded-2xl border border-slate-200 p-5 flex gap-4">
            <div className="shrink-0 w-9 h-9 bg-sky-50 border border-sky-200 rounded-xl flex items-center justify-center text-sky-600 font-bold text-sm">
              {paso.numero}
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-sm mb-1">{paso.titulo}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{paso.descripcion}</p>
            </div>
          </div>
        ))}

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="font-semibold text-slate-800 text-sm mb-3">¿Necesitas ayuda?</p>
          <div className="flex gap-3">
            <a
              href="https://wa.me/584124009952"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-2 text-sm text-emerald-600 font-medium bg-emerald-50 hover:bg-emerald-100 py-2.5 rounded-xl transition-colors"
            >
              📱 WhatsApp
            </a>
            <a
              href="https://t.me/+13815516550"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-2 text-sm text-sky-600 font-medium bg-sky-50 hover:bg-sky-100 py-2.5 rounded-xl transition-colors"
            >
              ✈️ Telegram
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
