import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function DefaultLayout() {
  return (
    <>
    <Navbar/>
    <main>
    <Outlet/>
    </main>
     <Footer />
    </>
  )
}
