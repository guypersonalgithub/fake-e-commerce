export type CartData = {
  productId: number;
  quantity: number;
}[];

export type CachedCartItems = {
  username: string;
  cartItems: CartData;
};
