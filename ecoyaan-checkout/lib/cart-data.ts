import type { CartResponse } from "@/types/cart";

export function getCartData(): CartResponse {
  return {
    cartItems: [
      {
        product_id: 101,
        product_name: "Bamboo Toothbrush (Pack of 4)",
        product_price: 299,
        quantity: 2,
        image: "https://placehold.co/150x150/e2e8f0/475569?text=Bamboo",
      },
      {
        product_id: 102,
        product_name: "Reusable Cotton Produce Bags",
        product_price: 450,
        quantity: 1,
        image: "https://placehold.co/150x150/e2e8f0/475569?text=Cotton",
      },
    ],
    shipping_fee: 50,
    discount_applied: 0,
  };
}
