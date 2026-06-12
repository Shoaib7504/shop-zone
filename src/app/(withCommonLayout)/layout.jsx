import Footer from "@/Components/Shared/Footer";
import Navbar from "@/Components/Shared/Navbar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <Navbar></Navbar>
     
      <div className="min-h-[90vh]">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default layout;