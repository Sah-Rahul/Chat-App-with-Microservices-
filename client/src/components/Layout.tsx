import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GoTop from "./GoTop";

interface Iprop {
  children: ReactNode;
}

const Layout = ({ children }: Iprop) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />

      <div className="absolute z-50 -bottom-8 right-5">
        <GoTop />
      </div>
    </div>
  );
};

export default Layout;
