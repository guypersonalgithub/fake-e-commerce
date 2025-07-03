import type { CachedCartItems, CartData } from "./types";

export const getToken = () => localStorage.getItem("token");
export const setToken = (token: string) => localStorage.setItem("token", token);
export const clearToken = () => localStorage.removeItem("token");

export const getUsername = () => localStorage.getItem("username");
export const setUsername = (username: string) => localStorage.setItem("username", username);
export const clearUsername = () => localStorage.removeItem("username");

export const getCartItems = (username: string): CachedCartItems | undefined => {
  try {
    const cartItems = localStorage.getItem(`cartItems-${username}`);
    if (!cartItems) {
      return;
    }

    return JSON.parse(cartItems) as CachedCartItems;
  } catch {
    return;
  }
};

export const setCartItems = (username: string, cartItems: CartData) =>
  localStorage.setItem(`cartItems-${username}`, JSON.stringify({ username, cartItems }));

export const clearCartItems = (username: string) =>
  localStorage.removeItem(`cartItems-${username}`);

export const appendPurchase = (username: string, cartItems: CartData) => {
  const purchases = JSON.parse(localStorage.getItem("purchases") ?? "[]") as CachedCartItems[];
  purchases.push({ username, cartItems });
  localStorage.setItem("purchases", JSON.stringify(purchases));
};
