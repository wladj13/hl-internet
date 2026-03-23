'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: string
    isUp: boolean
  }
  color?: string
}

export default function StatCard({ label, value, icon: Icon, trend, color = 'text-sky-600' }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="glass rounded-2xl p-5 border border-white/10"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
          
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
              <span>{trend.isUp ? '↑' : '↓'}</span>
              <span>{trend.value}</span>
              <span className="text-slate-400 font-normal ml-0.5">vs last month</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-xl bg-white/50 border border-white/20 ${color} shadow-sm`}>
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  )
}
