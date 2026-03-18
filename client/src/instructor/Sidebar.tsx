"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Tag,
  Users,
  GraduationCap,
  Settings,
  FileText,
  MessageSquare,
  LogOut,
  FileTextIcon,
  Newspaper,
  UserPenIcon,
} from "lucide-react";

const NAV_ITEMS = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    badge: null,
    href: "/instructor",
  },

  {
    icon: BookOpen,
    label: "Courses",
    badge: null,
    href: "/instructor/course",
  },
  { icon: Users, label: "Students", badge: null, href: "/instructor/students" },
  {
    icon: Users,
    label: "Request",
    badge: null,
    href: "/instructor/request",
  },
  {
    icon: FileText,
    label: "Reports",
    badge: null,
    href: "/instructor/reports",
  },
  {
    icon: UserPenIcon,
    label: "Profile",
    href: "/instructor/profile",
  },
  {
    icon: Newspaper,
    label: "Blogs",
    href: "/instructor/blogs",
  },
];

const BOTTOM_ITEMS = [
  { icon: Settings, label: "Settings", href: "/instructor/settings" },
  { icon: LogOut, label: "Logout", href: "/logout" },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (val: boolean) => void;
}

const Sidebar = ({ collapsed, mobileOpen, setMobileOpen }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-30 flex flex-col
          border-r border-black/10 dark:border-white/5
          bg-white dark:bg-black 
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-17.5" : "w-60"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex items-center gap-3 px-4 h-15 border-b border-black/10 dark:border-white/5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#09b89b] flex items-center justify-center shrink-0">
            <GraduationCap size={16} className="text-white" />
          </div>

          {!collapsed && (
            <span className="font-semibold text-sm tracking-wide truncate text-black dark:text-white">
              Educate
            </span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-0.5">
          {NAV_ITEMS.map(({ icon: Icon, label, badge, href }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? label : undefined}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                  transition-colors duration-150 relative group
                  ${
                    isActive
                      ? "bg-[#09b89b]/20 text-[#09b89b]"
                      : "text-black/60 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                  }
                `}
              >
                <Icon size={17} className="shrink-0" />

                {!collapsed && (
                  <>
                    <span className="truncate flex-1 text-left">{label}</span>

                    {badge && (
                      <span className="ml-auto text-[10px] bg-[#09b89b] text-black font-semibold rounded-full px-1.5 py-0.5 leading-none">
                        {badge}
                      </span>
                    )}
                  </>
                )}

                {collapsed && badge && (
                  <span className="absolute top-1 right-1 min-w-4 h-4 bg-[#09b89b] text-black text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
                    {badge}
                  </span>
                )}

                {collapsed && (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-[#1e2130] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-white/10">
                    {label}
                    {badge ? ` (${badge})` : ""}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-2 pb-4 space-y-0.5 border-t border-black/10 dark:border-white/5 pt-3 shrink-0">
          {BOTTOM_ITEMS.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              title={collapsed ? label : undefined}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-black/60 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors group relative"
            >
              <Icon size={17} className="shrink-0" />

              {!collapsed && <span className="truncate">{label}</span>}

              {collapsed && (
                <span className="absolute left-full ml-2 px-2 py-1 bg-[#1e2130] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-white/10">
                  {label}
                </span>
              )}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
