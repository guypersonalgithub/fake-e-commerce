import { create } from "zustand";
import {
  appendPurchase,
  clearCartItems,
  clearToken,
  clearUsername,
  getCartItems,
  getUsername,
  setCartItems,
  setToken,
  setUsername,
} from "./storeUtils";
import type { CartData } from "./types";

const initializeCart = (username: string) => {
  try {
    const data = getCartItems(username);
    if (!data || data.username !== username) {
      return [];
    }

    return data.cartItems;
  } catch {
    return [];
  }
};

export type UseStoreProps = {
  // Auth
  username: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
  redirectToAfterLogin?: string;
  updateRedirectToAfterLogin: (path?: string) => void;

  // Products
  cartItems: CartData;
  updateCurrentCart: (productId: number, quantity: number) => void;
  checkout: () => void;
};

export const useStore = create<UseStoreProps>((set, get) => ({
  // Auth
  username: getUsername(),
  login: (username, token) => {
    setToken(token);
    setUsername(username);
    const cartItems = initializeCart(username);
    set({ username, cartItems });
  },
  logout: () => {
    clearToken();
    clearUsername();
    set({ username: null, cartItems: [] });
  },
  redirectToAfterLogin: undefined,
  updateRedirectToAfterLogin: (path) => set(() => ({ redirectToAfterLogin: path })),

  // Products
  cartItems: (() => {
    const { username } = get() ?? { username: getUsername() };
    if (!username) {
      return [];
    }

    return initializeCart(username);
  })(),
  updateCurrentCart: (productId, quantity) => {
    const { cartItems, username } = get();
    if (!username) {
      return;
    }

    const index = cartItems.findIndex((p) => p.productId === productId);

    let updated: CartData;

    if (index === -1) {
      updated = [...cartItems, { productId, quantity }];
    } else if (quantity === 0) {
      updated = cartItems.filter((_, i) => i !== index);
    } else {
      updated = [...cartItems];
      updated[index].quantity = quantity;
    }

    setCartItems(username, updated);
    set({ cartItems: updated });
  },
  checkout: () => {
    const { cartItems, username } = get();
    if (!username) {
      return;
    }

    appendPurchase(username, cartItems);
    clearCartItems(username);
    set({ cartItems: [] });
  },
}));

