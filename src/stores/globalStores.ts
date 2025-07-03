import { create } from "zustand";
import { appendPurchase, clearCartItems, clearToken, clearUsername, getCartItems, getUsername, setCartItems, setToken, setUsername } from "./storeUtils";
import type { CartData } from "./types";

type UseAuthStoreProps = {
  username: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
  redirectToAfterLogin?: string;
  updateRedirectToAfterLogin: (path?: string) => void;
};

export const useAuthStore = create<UseAuthStoreProps>((set) => ({
  username: getUsername(),
  login: (username, token) => {
    setToken(token);
    setUsername(username);
    set({ username });
  },
  logout: () => {
    clearToken();
    clearUsername();
    set({ username: null });
  },
  redirectToAfterLogin: undefined,
  updateRedirectToAfterLogin: (path) => set(() => ({ redirectToAfterLogin: path })),
}));

const initializeCart = () => {
  try {
    const localUsername = getUsername();
    if (!localUsername) {
      return [];
    }

    const data = getCartItems(localUsername);
    if (!data || data.username !== localUsername) {
      return [];
    }

    return data.cartItems;
  } catch {
    return [];
  }
};

export type UseProductStoreProps = {
  cartItems: CartData;
  updateCurrentCart: (productId: number, quantity: number) => void;
  checkout: () => void;
  initializeCartOnLogin: () => void;
  emptyCart: () => void;
};

export const useProductStore = create<UseProductStoreProps>((set, get) => ({
  cartItems: initializeCart(),
  updateCurrentCart: (productId, quantity) => {
    const { cartItems } = get();
    const index = cartItems.findIndex((p) => p.productId === productId);

    const username = getUsername();

    if (!username) {
      return;
    }

    let updated: CartData;

    if (index === -1) {
      updated = [...cartItems, { productId, quantity }];
    } else if (quantity === 0) {
      updated = cartItems.filter((_, index) => index !== index);
    } else {
      updated = [...cartItems];
      updated[index].quantity = quantity;
    }

    setCartItems(username, updated);
    set({ cartItems: updated });
  },
  checkout: () => {
    const { cartItems } = get();
    const username = getUsername();
    if (!username) {
      return;
    }

    appendPurchase(username, cartItems);
    clearCartItems(username);
    set({ cartItems: [] });
  },
  initializeCartOnLogin: () => set(() => ({ cartItems: initializeCart() })),
  emptyCart: () => set(() => ({ cartItems: [] })),
}));

