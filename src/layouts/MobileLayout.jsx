import BottomTab from "@/components/BottomTab.jsx";
import { Outlet } from "react-router-dom";

export default function MobileLayout() {
  return (
    <div className="pb-20">
      {" "}
      {/* Chừa khoảng trống cho tab */}
      <Outlet />
      <BottomTab />
    </div>
  );
}
