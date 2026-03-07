"use client";

import { useState } from "react";
import { Bell, ChevronLeft, ChevronRight, Menu, Moon, Search, Sun } from "lucide-react";

interface NavbarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ collapsed, setCollapsed, setMobileOpen }: NavbarProps) => {
  const [dark, setDark] = useState(true);

  return (
    <header
      className={`
        fixed top-0 right-0 z-10 h-15
        bg-[#0f1117] border-b border-white/5
        flex items-center justify-between px-4 gap-4
        transition-all duration-300
        ${collapsed ? "left-17.5" : "left-0 lg:left-60"}
      `}
    >
    
      <div className="flex items-center gap-3">
 
        <button
          className="lg:hidden text-white/60 hover:text-white"
          onClick={() => setMobileOpen((p) => !p)}
        >
          <Menu size={20} />
        </button>

        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex w-8 h-8 rounded-lg items-center justify-center text-[#09b89b] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          {collapsed ? <ChevronRight size={21} /> : <ChevronLeft size={21} />}
        </button>

        
        <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 w-48 xl:w-64">
          <Search size={14} className="text-white/40 shrink-0" />
          <input
            className="bg-transparent text-sm text-white placeholder:text-white/30 outline-none w-full"
            placeholder="Search..."
          />
        </div>
      </div>

      
      <div className="flex items-center gap-2">
        <button
          onClick={() => setDark(!dark)}
          className="w-8 h-8 rounded-lg text-white/50 hover:text-white hover:bg-white/5 flex items-center justify-center transition-colors"
        >
          {dark ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        <button className="relative w-8 h-8 rounded-lg text-white/50 hover:text-white hover:bg-white/5 flex items-center justify-center transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#09b89b] rounded-full" />
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-white/10">
          <div className="w-7 h-7 rounded-full bg-[#09b89b] flex items-center justify-center text-white text-xs font-semibold">
            A
          </div>
          <span className="hidden sm:block text-white/70 text-sm">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;