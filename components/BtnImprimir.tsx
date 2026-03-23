'use client'

import { Printer } from 'lucide-react'

export default function BtnImprimir() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 bg-gradient-to-r from-primary-indigo to-primary-violet hover:scale-[1.02] active:scale-95 text-white text-xs font-black uppercase tracking-widest px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-primary-indigo/20 border border-white/10"
    >
      <Printer size={16} />
      <span>Imprimir / PDF</span>
    </button>
  )
}
