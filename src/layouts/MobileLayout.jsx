import { Outlet } from "react-router-dom";
import BottomTab from "@components/BottomTab";

export default function MobileLayout() {
  return (
    <div className="pb-20 md:pb-0 md:pt-[64px]">
      {/* MOBILE: không có navbar */}
      {/* DESKTOP: sẽ hiện navbar từ App.jsx */}

      <Outlet />

      {/* Bottom tab chỉ mobile */}
      <div className="md:hidden">
        <BottomTab />
      </div>
    </div>
  );
}
