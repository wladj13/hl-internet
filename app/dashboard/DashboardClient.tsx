'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  TrendingUp, 
  CreditCard, 
  DollarSign, 
  Plus,
  ArrowRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react'
import StatCard from '@/components/StatCard'
import Link from 'next/link'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'

const data = [
  { name: 'Ene', income: 4000 },
  { name: 'Feb', income: 3200 },
  { name: 'Mar', income: 5100 },
  { name: 'Abr', income: 4800 },
  { name: 'May', income: 6200 },
  { name: 'Jun', income: 5800 },
  { name: 'Jul', income: 7400 },
]

export default function DashboardClient({ stats }: { stats: any }) {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Análisis General</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Observa el rendimiento de HL Internet este mes.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/clientes/nuevo" 
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm"
          >
            Nuevo Cliente
          </Link>
          <Link 
            href="/pagos/nuevo" 
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-indigo text-white text-sm font-bold hover:bg-primary-indigo/90 transition-all shadow-lg shadow-primary-indigo/20"
          >
            <Plus size={18} />
            <span>Registrar Pago</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Ingresos del mes" 
          value={`$${stats.montoCobrado.toLocaleString()}`} 
          icon={DollarSign}
          trend={{ value: '12%', isUp: true }}
          color="text-emerald-500"
        />
        <StatCard 
          label="Clientes Activos" 
          value={stats.totalClientes} 
          icon={Users}
          trend={{ value: '3', isUp: true }}
          color="text-primary-indigo"
        />
        <StatCard 
          label="Pagos Recibidos" 
          value={stats.clientesPagados} 
          icon={CheckCircle2}
          trend={{ value: '5%', isUp: true }}
          color="text-violet-500"
        />
        <StatCard 
          label="Monto Pendiente" 
          value={`$${(stats.totalEsperado - stats.montoCobrado).toLocaleString()}`} 
          icon={Clock}
          trend={{ value: '2%', isUp: false }}
          color="text-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Column */}
        <div className="lg:col-span-2 glass rounded-3xl p-6 lg:p-8 border border-white/10 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Flujo de Ingresos</h2>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Semestre Actual</p>
            </div>
            <select className="bg-slate-100/50 border-none text-xs font-bold rounded-lg px-3 py-1.5 outline-none ring-1 ring-slate-200">
              <option>Últimos 6 meses</option>
              <option>Este año</option>
            </select>
          </div>
          
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    padding: '12px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#4F46E5" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorIncome)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* List Column */}
        <div className="glass rounded-3xl border border-white/10 shadow-xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Últimos Pagos</h2>
            <Link href="/pagos" className="text-xs text-primary-indigo font-bold hover:underline">Ver todos</Link>
          </div>
          <div className="flex-1 overflow-auto divide-y divide-slate-100">
            {stats.ultimosPagos.map((pago: any) => (
              <motion.div 
                key={pago.id}
                whileHover={{ backgroundColor: 'rgba(79, 70, 229, 0.02)' }}
                className="p-4 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-none">{pago.clientes?.nombre}</p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-medium">{pago.metodo} · {pago.mes_correspondiente}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-emerald-600">${pago.monto}</p>
                  <p className="text-[10px] text-slate-400 mt-1 font-medium">{new Date(pago.fecha_pago).toLocaleDateString('es-VE')}</p>
                </div>
              </motion.div>
            ))}
            {stats.ultimosPagos.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-sm text-slate-400">No hay pagos registrados.</p>
              </div>
            )}
          </div>
          <div className="p-4 mt-auto">
            <Link 
              href="/pagos/nuevo" 
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-50 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-all border border-slate-200"
            >
              <Plus size={14} />
              Registrar Nuevo Pago
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
