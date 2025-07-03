import { useAuthStore } from "@/stores/globalStores";
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
  }, [username, location.pathname, location.search]);

  if (!username) {
    return null;
  }

  return children;
};

