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

type CachedCartItems = {
  username: string;
  cartItems: CartData;
};

const initializeCart = () => {
  try {
    const cachedCartItems = localStorage.getItem("cartItems");
    if (!cachedCartItems) {
      return [];
    }

    const { username, cartItems } = JSON.parse(cachedCartItems) as CachedCartItems;
    const cachedUsername = useAuthStore.getState().username;

    if (cachedUsername !== username) {
      return [];
    }

    return cartItems as CartData;
  } catch {
    return [];
  }
};

export type CartData = {
  productId: number;
  quantity: number;
}[];

export type UseProductStoreProps = {
  cartItems: CartData;
  updateCurrentCart: (productId: number, quantity: number) => void;
  checkout: () => void;
  initializeCartOnLogin: () => void;
  emptyCart: () => void;
};

export const useProductStore = create<UseProductStoreProps>((set) => ({
  cartItems: initializeCart(),
  updateCurrentCart: (productId, quantity) =>
    set((state) => {
      const productIndex = state.cartItems.findIndex((product) => product.productId === productId);

      let updatedCart: CartData = [];

      if (productIndex === -1) {
        updatedCart = [...state.cartItems, { productId, quantity }];
      } else if (quantity === 0) {
        updatedCart = state.cartItems.filter((_, index) => index !== productIndex);
      } else {
        updatedCart = [...state.cartItems];
        updatedCart[productIndex].quantity = quantity;
      }

      const username = localStorage.getItem("username");

      if (!username) {
        return {};
      }

      localStorage.setItem("cartItems", JSON.stringify({ username, cartItems: updatedCart }));

      return { cartItems: updatedCart };
    }),
  checkout: () =>
    set((state) => {
      const purchases = localStorage.getItem("purchases");
      const checkoutCarts = purchases ? (JSON.parse(purchases) as CachedCartItems[]) : [];
      const username = localStorage.getItem("username");

      if (!username) {
        return {};
      }

      checkoutCarts.push({ username, cartItems: state.cartItems });
      localStorage.setItem("purchases", JSON.stringify(checkoutCarts));
      localStorage.removeItem("cartItems");

      return { cartItems: [] };
    }),
  initializeCartOnLogin: () => set(() => ({ cartItems: initializeCart() })),
  emptyCart: () => set(() => ({ cartItems: [] })),
}));

