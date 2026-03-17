'use client'

import { useFormStatus } from 'react-dom'

export default function BtnEnviarComprobante() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Enviando...
        </>
      ) : (
        'Enviar comprobante'
      )}
    </button>
  )
}
