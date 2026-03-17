"use client";

import { useState } from "react"; 
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const InstructorLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <Navbar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        setMobileOpen={setMobileOpen}
      />

      <main
        className={`pt-15 min-h-screen transition-all duration-300 ${
          collapsed ? "lg:pl-17.5" : "lg:pl-60"
        }`}
      >
        <div>{children}</div>
      </main>
    </div>
  );
};

export default InstructorLayout;


