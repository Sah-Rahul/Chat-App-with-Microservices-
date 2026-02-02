"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  FolderTree,
  ClipboardList,
  BookOpen,
  CheckSquare,
  HelpCircle,
  FileBadge,
  CalendarCheck,
  Megaphone,
  Star,
  Bell,
  ShoppingCart,
  CreditCard,
  BarChart3,
  Settings,
  Menu,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
import logo from "../../public/images/logo.webp";
import userImg from "../../public/images/team1.png";

interface MenuItem {
  label: string;
  icon: React.ElementType;
  path: string;
  active: boolean;
}

const menuItems: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/admin/dashboard",
    active: true,
  },
    {
    icon: BarChart3,
    label: "Analytics",
    path: "/admin/analytics",
    active: false,
  },
  {
    icon: FolderTree,
    label: "Categories",
    path: "/admin/categories",
    active: false,
  },
  { icon: Users, label: "Students", path: "/admin/students", active: false },
  {
    icon: GraduationCap,
    label: "Teachers",
    path: "/admin/teachers",
    active: false,
  },
  { icon: Layers, label: "Courses", path: "/admin/courses", active: false },
  
  {
    icon: ClipboardList,
    label: "Enrollments",
    path: "/admin/enrollments",
    active: false,
  },
  { icon: BookOpen, label: "Lessons", path: "/admin/lessons", active: false },
  {
    icon: CheckSquare,
    label: "Assignments",
    path: "/admin/assignments",
    active: false,
  },
  { icon: HelpCircle, label: "Quizzes", path: "/admin/quizzes", active: false },
  {
    icon: FileBadge,
    label: "Certificates",
    path: "/admin/certificates",
    active: false,
  },
  {
    icon: CalendarCheck,
    label: "Attendance",
    path: "/admin/attendance",
    active: false,
  },
  {
    icon: Megaphone,
    label: "Announcements",
    path: "/admin/announcements",
    active: false,
  },
  {
    icon: Star,
    label: "Reviews / Ratings",
    path: "/admin/reviews",
    active: false,
  },
  {
    icon: Bell,
    label: "Notifications",
    path: "/admin/notifications",
    active: false,
  },
  { icon: ShoppingCart, label: "Orders", path: "/admin/orders", active: false },
  {
    icon: CreditCard,
    label: "Payments",
    path: "/admin/payments",
    active: false,
  },

  { icon: Settings, label: "Settings", path: "/admin/settings", active: false },
];

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/users": "Users",
  "/admin/orders": "Orders",
  "/admin/products": "Products",
  "/admin/category": "Category",
  "/admin/calendar": "Calendar",
  "/admin/profile": "Profile",
  "/admin/settings": "Settings",
};

const SidebarMenu = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 80 : 260;

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const pageTitle = pageTitles[pathname] ?? "Admin Panel";

  return (
    <TooltipProvider>
      <div className="flex">
        <aside
          style={{ width: sidebarWidth }}
          className="h-screen overflow-auto fixed left-0 top-0   transition-all duration-300   z-50"
        >
          <div className="h-16 flex items-center justify-center text-black font-bold text-xl border-b border-white">
            {collapsed ? (
              <span className="text-sm">Educate</span>
            ) : (
              <Image
                src={logo}
                alt="logo"
                className="h-12 w-auto object-contain"
                priority
              />
            )}
          </div>

          <div className="py-4">
            {menuItems.map((item) => (
              <Tooltip key={item.label} delayDuration={300}>
                <TooltipTrigger asChild>
                  <Link href={item.path}>
                    <div
                      className={`
                        flex items-center p-3 mx-2 rounded-lg cursor-pointer 
                        transition-all duration-300
                        ${
                          isActive(item.path)
                            ? "bg-[#62c9b8] shadow-lg"
                            : "hover:bg-[#0AB99D] hover:text-white"
                        }
                      `}
                    >
                      <button>
                        <item.icon size={22} />
                      </button>
                      {!collapsed && (
                        <span className="ml-3  whitespace-nowrap">
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
            ))}
          </div>

          {collapsed ? (
            <div className="h-15 w-15 overflow-hidden rounded-full">
              <Image src={userImg} alt="userImg" />
            </div>
          ) : (
            <div className="h-24 gap-3 bg-[#0f8571] w-full flex items-center justify-center">
              <div className="h-17 w-17 overflow-hidden rounded-full">
                <Image src={userImg} alt="userImg" />
              </div>
              <div className=" leading-4  rounded-full">
                <h2 className="uppercase font-semibold">Riya sah</h2>
                <small className="text-stone-300 ">
                  riyafamilyinfo@gmail.com
                </small>
              </div>
            </div>
          )}
        </aside>

        <div
          className="flex-1 min-h-screen bg-gray-100"
          style={{ marginLeft: sidebarWidth }}
        >
          <header
            className="h-16 fixed top-0 right-0 bg-white shadow-sm flex items-center justify-between px-6 z-40"
            style={{ left: sidebarWidth }}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 cursor-pointer rounded-md  "
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <Menu size={22} />
              </button>

              <h1 className="text-lg font-semibold text-gray-800">
                {pageTitle}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Bell size={20} className="cursor-pointer" />
              <div className="flex items-center gap-2 cursor-pointer">
                <UserCircle size={28} />
                <span className="text-sm font-medium">Admin</span>
              </div>
            </div>
          </header>

          <main className="pt-20 p-6">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SidebarMenu;
