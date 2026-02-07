import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../footer/Footer";

export default function DefaultLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


