"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, ShippingAddress } from "@/types/cart";

interface CheckoutContextType {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress | null;
  subtotal: number;
  shippingFee: number;
  grandTotal: number;
  setCartData: (items: CartItem[], shippingFee: number) => void;
  updateAddress: (address: ShippingAddress) => void;
  clearCart: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingAddress, setShippingAddress] =
    useState<ShippingAddress | null>(null);
  const [shippingFee, setShippingFee] = useState(0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const grandTotal = subtotal + shippingFee;

  const setCartData = useCallback((items: CartItem[], fee: number) => {
    setCartItems(items);
    setShippingFee(fee);
  }, []);

  const updateAddress = useCallback((address: ShippingAddress) => {
    setShippingAddress(address);
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setShippingAddress(null);
    setShippingFee(0);
  }, []);

  return (
    <CheckoutContext.Provider
      value={{
        cartItems,
        shippingAddress,
        subtotal,
        shippingFee,
        grandTotal,
        setCartData,
        updateAddress,
        clearCart,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return ctx;
}
