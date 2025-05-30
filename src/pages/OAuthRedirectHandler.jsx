import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function OAuthRedirectHandler() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const code = params.get("code");
    const provider = params.get("provider");
    if (!code || !provider) return;

    API.post(`/api/auth/oauth/${provider}`, { code })
      .then((res) => {
        login(res.data.token);
        alert("✅ Đăng nhập thành công qua OAuth");
        navigate("/");
      })
      .catch((err) => {
        console.error("OAuth login failed:", err);
        alert("❌ Đăng nhập thất bại qua OAuth");
        navigate("/login");
      });
  }, [params]);

  return <p className="p-6 text-center">🔄 Đang xử lý đăng nhập...</p>;
}
