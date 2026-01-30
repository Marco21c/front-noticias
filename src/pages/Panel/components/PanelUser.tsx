import { Outlet } from "react-router-dom";
import SideBarPanel from "./SideBarPanel";

export default function PanelUser() {
  return (
    <div>
        <SideBarPanel/>
        <main>
           <Outlet/> 
        </main>
    </div>
  )
}
