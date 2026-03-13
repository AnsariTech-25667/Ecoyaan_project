"use client";

import type { CartItem } from "@/types/cart";
import { useCheckout } from "@/context/CheckoutContext";
import { useEffect } from "react";

// Receives SSR-fetched cart data as props and syncs it into CheckoutContext
export default function CartHydrator({
  items,
  shippingFee,
}: {
  items: CartItem[];
  shippingFee: number;
}) {
  const { setCartData } = useCheckout();

  useEffect(() => {
    setCartData(items, shippingFee);
  }, [items, shippingFee, setCartData]);

  return null;
}
