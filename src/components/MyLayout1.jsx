import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function MyLayout1() {
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
