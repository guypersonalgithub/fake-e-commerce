import { create } from "zustand";

type UseProductStoreProps = {
  currentCart: { productId: number; amount: number }[];
  updateCurrentCart: (productId: number, amount: number) => void;
};

export const useProductStore = create<UseProductStoreProps>((set) => ({
  currentCart: [],
  updateCurrentCart: (productId, amount) =>
    set((state) => {
      const productIndex = state.currentCart.findIndex(
        (product) => product.productId === productId,
      );

      if (productIndex === -1) {
        return { currentCart: [...state.currentCart, { productId, amount }] };
      }

      const shallow = state.currentCart.slice();
      shallow[productIndex].amount = amount;

      return { currentCart: shallow };
    }),
}));

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

