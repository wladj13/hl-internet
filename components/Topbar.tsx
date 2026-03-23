'use client'

import { Search, Bell, User, Menu } from 'lucide-react'

export default function Topbar() {
  return (
    <header className="h-16 glass sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between border-b border-white/10">
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
          <Menu size={20} />
        </button>
        
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full bg-slate-100/50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-indigo/20 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl relative transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>
        
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-none">Admin</p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">HL Internet</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-indigo to-primary-violet p-[2px] shadow-lg shadow-primary-indigo/20">
            <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center text-primary-indigo">
              <User size={18} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
