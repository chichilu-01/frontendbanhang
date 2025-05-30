import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/api/login");
    }
  }, [user, navigate]);

  if (!user) return null; // tránh render lỗi tạm thời trước khi redirect

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">👤 Thông tin tài khoản</h1>
      <div className="space-y-2">
        <p>
          <strong>Họ tên:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Vai trò:</strong> {user.role}
        </p>
      </div>
    </div>
  );
}
