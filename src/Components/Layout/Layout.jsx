import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import FooterComponent from "../Footer/FooterComponent";
import style from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={style.layoutContainer}>
      <Header />
      <div className={style.mainContent}>
        <Outlet />
      </div>
      <FooterComponent />
    </div>
  );
}
