import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";

const RootLayout = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center min-h-[99vh]">
          <span className="loading loading-dots loading-xl"></span>
          <span className="loading loading-dots loading-xl"></span>
          <span className="loading loading-dots loading-xl"></span>
        </div>
      </>
    );
  }

  return (
    <div className=" relative min-h-screen">
      <Navbar></Navbar>
      <div className="max-w-[1240px] mx-auto min-h-[55.3vh]">
        <div className="mx-4">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>

      {/* Theme Toggle */}
      <div className="flex-none relative">
        <ThemeToggle></ThemeToggle>
      </div>
    </div>
  );
};

export default RootLayout;
