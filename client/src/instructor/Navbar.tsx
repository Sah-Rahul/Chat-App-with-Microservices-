"use client";

import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getProfile } from "../Api/services/user.service";

interface NavbarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ collapsed, setCollapsed, setMobileOpen }: NavbarProps) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <header
      className={`
        fixed top-0 right-0 z-50 h-15
        flex items-center justify-between px-4 gap-4
        transition-all duration-300
        bg-white dark:bg-black
        border-b border-black/10 dark:border-white/5
        text-black dark:text-white
        ${collapsed ? "left-17.5" : "left-0 lg:left-60"}
      `}
    >
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
          onClick={() => setMobileOpen((p) => !p)}
        >
          <Menu size={20} />
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden cursor-pointer lg:flex w-8 h-8 rounded-lg items-center justify-center text-[#09b89b] hover:bg-black/5 dark:hover:bg-white/5"
        >
          {collapsed ? <ChevronRight size={21} /> : <ChevronLeft size={21} />}
        </button>

        <div className="hidden sm:flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-3 py-1.5 w-48 xl:w-64">
          <Search
            size={14}
            className="text-black/40 dark:text-white/40 shrink-0"
          />
          <input
            className="bg-transparent text-sm text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/30 outline-none w-full"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative w-8 h-8 rounded-lg text-black/50 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#09b89b] rounded-full" />
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-black/10 dark:border-white/10">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-[#09b89b] flex items-center justify-center shrink-0">
            {user?.avatar?.url ? (
              <img
                src={user.avatar.url}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-xs font-bold">
                {user?.firstName?.charAt(0)?.toUpperCase() || (
                  <User size={14} className="text-white" />
                )}
              </span>
            )}
          </div>

          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold text-black dark:text-white leading-none">
              {user?.firstName} {user?.lastName}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
