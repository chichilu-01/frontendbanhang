import { Outlet, useLocation } from "react-router-dom";
import BottomTab from "@components/BottomTab";

export default function MobileLayout() {
  const location = useLocation();

  // ❌ Các trang KHÔNG dùng MobileLayout
  const exclude = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-code",
    "/verify-reset-code",
    "/reset-password",
  ];

  if (exclude.includes(location.pathname)) {
    return <Outlet />; // ✔ Không bao layout → không có nền trắng
  }

  return (
    <div className="pb-20 md:pb-0 md:pt-[64px]">
      <Outlet />

      {/* Mobile bottom tab */}
      <div className="md:hidden">
        <BottomTab />
      </div>
    </div>
  );
}
