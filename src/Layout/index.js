import React from "react";
import Header from "./Header";
import RootRoutes from "../RootRoutes/RootRoutes";


function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <RootRoutes />
      </div>
    </>
  );
}

export default Layout;
