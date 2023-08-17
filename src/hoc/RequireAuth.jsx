import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  const navigate = useNavigate();

  if (!localStorage.getItem('accessToken')) {
    navigate('/login');
  }

  return children;
};

export { RequireAuth };
