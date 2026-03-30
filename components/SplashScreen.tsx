'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wifi } from 'lucide-react'

export default function SplashScreen() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fcfcfd]"
        >
          <div className="relative mb-8">
            {/* Animated rings */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: [0, 0.4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 rounded-full bg-primary-indigo/20 blur-[10px]"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 2.2, opacity: [0, 0.2, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              className="absolute inset-0 rounded-full bg-primary-violet/10 blur-[15px]"
            />
            
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
              className="relative w-28 h-28 bg-gradient-to-br from-primary-indigo to-primary-violet rounded-[2.8rem] flex items-center justify-center text-white shadow-2xl shadow-primary-indigo/30"
            >
              <Wifi size={52} strokeWidth={2.5} />
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1, 
                    delay: i * 0.15 
                  }}
                  className="w-2 h-2 bg-primary-indigo rounded-full"
                />
              ))}
            </div>
            <p className="mt-6 text-[11px] font-black uppercase tracking-[0.3em] text-slate-800">HL Internet</p>
          </motion.div>

          <div className="absolute bottom-12 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
            Iniciando sistema v2
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
