import { useAuth } from "@context/AuthContext";

const useToken = () => {
  const { token } = useAuth();
  return token;
};

export default useToken;
