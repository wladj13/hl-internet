'use client'

export default function BtnImprimir() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
    >
      Imprimir / Guardar PDF
    </button>
  )
}
