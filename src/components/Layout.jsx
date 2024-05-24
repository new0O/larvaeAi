import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="flex justify-center h-full">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
