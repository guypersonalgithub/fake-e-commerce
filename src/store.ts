import { create } from "zustand";

type UseAuthStoreProps = {
  username: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<UseAuthStoreProps>((set) => ({
  username: localStorage.getItem("username") ?? null,
  login: (username, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    set({ username });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    set({ username: null });
  },
}));

