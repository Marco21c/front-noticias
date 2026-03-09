import { Outlet } from "react-router-dom";
import SideBarPanel from "./SideBarPanel";

export default function PanelUser() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBarPanel />

      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
