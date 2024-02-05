import Navbar from "./Navbar";
import { Component } from "solid-js";
import { Outlet } from "@solidjs/router";

const Layout: Component = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default Layout;
