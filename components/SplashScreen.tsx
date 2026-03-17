'use client'

import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 2200)
    const timer2 = setTimeout(() => setVisible(false), 2800)
    return () => { clearTimeout(timer1); clearTimeout(timer2) }
  }, [])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-50 bg-sky-500 flex flex-col items-center justify-center transition-opacity duration-600 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ transition: 'opacity 0.6s ease' }}
    >
      {/* Logo */}
      <div
        className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-sky-500 font-bold text-3xl shadow-2xl mb-6"
        style={{ animation: 'splashPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}
      >
        HL
      </div>

      {/* Texto */}
      <div
        className="text-center px-8"
        style={{ animation: 'splashFadeUp 0.5s ease 0.3s both' }}
      >
        <h1 className="text-white font-bold text-xl mb-2">HL Internet</h1>
        <p className="text-sky-100 text-sm leading-relaxed">
          Bienvenido al nuevo sistema<br />de pagos de HL Internet.
        </p>
      </div>

      {/* Barra de progreso */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-full">
        <div
          className="h-full bg-white"
          style={{ animation: 'splashProgress 2.2s linear forwards' }}
        />
      </div>

      <style>{`
        @keyframes splashPop {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes splashFadeUp {
          from { transform: translateY(16px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes splashProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  )
}
