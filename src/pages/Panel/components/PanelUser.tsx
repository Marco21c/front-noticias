import { Outlet } from "react-router-dom";
import SideBarPanel from "./SideBarPanel";

export default function PanelUser() {
  return (
    <div className="flex min-h-screen">
      <SideBarPanel />

      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}

