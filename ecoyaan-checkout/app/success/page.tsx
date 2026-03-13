"use client";

import { useEffect, useMemo, useRef } from "react";

import Link from "next/link";
import { useCheckout } from "@/context/CheckoutContext";

export default function SuccessPage() {
  const { cartItems, shippingAddress, clearCart } = useCheckout();

  const snapshotRef = useRef({ cartItems, shippingAddress });
  const orderItems = snapshotRef.current.cartItems;
  const orderAddress = snapshotRef.current.shippingAddress;

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const orderId = useMemo(
    () => `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    []
  );

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border p-8 space-y-6">

        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Order Successful 🎉
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <div className="mt-4 inline-block rounded-lg bg-gray-50 px-4 py-3">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Order ID
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-800">{orderId}</p>
          </div>
        </div>

        {orderItems.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Items Ordered</h2>
            <div className="mt-3 divide-y divide-gray-100">
              {orderItems.map((item) => (
                <div
                  key={item.product_id}
                  className="flex justify-between py-2 text-sm text-gray-700"
                >
                  <span>{item.product_name}</span>
                  <span className="text-gray-500">× {item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {orderAddress && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Shipping Address</h2>
            <div className="mt-3 text-sm text-gray-600 space-y-1">
              <p className="font-medium text-gray-800">{orderAddress.fullName}</p>
              <p>{orderAddress.city}, {orderAddress.state}</p>
              <p>{orderAddress.pinCode}</p>
            </div>
          </div>
        )}

        <Link
          href="/cart"
          className="block w-full rounded-lg bg-green-600 py-3 text-center text-lg font-semibold text-white shadow hover:bg-green-700 transition duration-200 ease-in-out"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
