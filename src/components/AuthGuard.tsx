import { useAuthStore } from "@/globalStores";
import { useEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";

type AuthGuardProps = {
  children: ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = useAuthStore((state) => state.username);
  const updateRedirectToAfterLogin = useAuthStore((state) => state.updateRedirectToAfterLogin);

  useEffect(() => {
    if (!username) {
      const fullPath = `${location.pathname}${location.search}`;
      updateRedirectToAfterLogin(fullPath);
      navigate("/login");
    }
  }, [username, location, navigate, updateRedirectToAfterLogin]);

  if (!username) {
    return null;
  }

  return children;
};
