import React from "react";
import Nav from "./components/Nav";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  return (
    <div>
      <Nav />
      <div className={`${isSellerPath ? " " : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
