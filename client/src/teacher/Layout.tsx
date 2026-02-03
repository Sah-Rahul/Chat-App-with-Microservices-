"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Layers,
  ClipboardList,
  HelpCircle,
  CalendarCheck,
  Megaphone,
  CreditCard,
  Settings,
  Menu,
  Bell,
  UserCircle,
  MessagesSquare,
} from "lucide-react";

import logo from "../../public/images/logo.webp";
import userImg from "../../public/images/team1.png";

interface MenuItem {
  label: string;
  icon: React.ElementType;
  path: string;
}


export const teacherMenuItems: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/teacher/dashboard",
  },
  {
    icon: GraduationCap,
    label: "My Classes",
    path: "/teacher/classes",
  },
  {
    icon: ClipboardList,
    label: "Assignments",
    path: "/teacher/assignments",
  },
  {
    icon: CalendarCheck,
    label: "Attendance",
    path: "/teacher/attendance",
  },
  {
    icon: Layers,
    label: "Leave Management",
    path: "/teacher/leave",
  },
  {
    icon: MessagesSquare,
    label: "Chat",
    path: "/teacher/chat",
  },
  
  {
    icon: Megaphone,
    label: "Announcements",
    path: "/teacher/announcements",
  },
  {
    icon: Settings,
    label: "Profile & Settings",
    path: "/teacher/settings",
  },
];

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname();

  const sidebarWidth = collapsed ? 80 : 260;

  return (
    <TooltipProvider>
      <div className="flex">
        <aside
          className="fixed left-0 top-0 h-screen bg-white border-r z-50
                     flex flex-col transition-[width] duration-300 ease-in-out"
          style={{ width: sidebarWidth }}
        >
          <div className="h-16 flex items-center justify-center border-b shrink-0">
            {collapsed ? (
              <span className="font-bold text-sm">EDU</span>
            ) : (
              <Image
                src={logo}
                alt="logo"
                className="h-10 w-auto object-contain"
                priority
              />
            )}
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden py-3">
            {teacherMenuItems.map((item) => {
              const active = pathname === item.path;

              return (
                <Tooltip key={item.label} delayDuration={200}>
                  <TooltipTrigger asChild>
                    <Link href={item.path}>
                      <div
                        className={`mx-2 my-1 flex items-center gap-3 rounded-lg
                        px-3 py-2 cursor-pointer transition-colors duration-200
                        ${
                          active
                            ? "bg-[#62c9b8] text-black shadow"
                            : "hover:bg-[#0AB99D] hover:text-white"
                        }`}
                      >
                        <item.icon size={20} />
                        {!collapsed && (
                          <span className="whitespace-nowrap">
                            {item.label}
                          </span>
                        )}
                      </div>
                    </Link>
                  </TooltipTrigger>

                  {collapsed && (
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </div>

          <div className="border-t p-3 shrink-0">
            {collapsed ? (
              <div className="flex justify-center">
                <Image
                  src={userImg}
                  alt="user"
                  className="h-10 w-10 rounded-full"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Image
                  src={userImg}
                  alt="user"
                  className="h-12 w-12 rounded-full"
                />
                <div className="leading-tight">
                  <h4 className="font-semibold text-sm">Riya Sah</h4>
                  <p className="text-xs text-gray-500">
                    riyafamilyinfo@gmail.com
                  </p>
                </div>
              </div>
            )}
          </div>
        </aside>

        <div
          className="flex-1 min-h-screen bg-gray-100 transition-all duration-300"
          style={{ marginLeft: sidebarWidth }}
        >
          <header
            className="h-16 fixed top-0 right-0 bg-white border-b
                       flex items-center justify-between px-6 z-40
                       transition-all duration-300"
            style={{ left: sidebarWidth }}
          >
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 cursor-pointer rounded-md hover:bg-gray-100"
            >
              <Menu size={22} />
            </button>

            <div className="flex  items-center gap-4">
              <Bell size={20} className="cursor-pointer" />
              <div className="flex items-center gap-2 cursor-pointer">
                <UserCircle size={28} />
                <span className="text-sm font-medium">Admin</span>
              </div>
            </div>
          </header>

         <main
            className={`${pathname === "/teacher/chat" ? "pt-16 px-0" : "pt-20 px-6"}`}
          >
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TeacherLayout;
