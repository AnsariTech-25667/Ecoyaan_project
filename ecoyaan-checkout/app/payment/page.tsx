"use client";

import Image from "next/image";
import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentPage() {
  const {
    cartItems,
    shippingAddress,
    subtotal,
    shippingFee,
    grandTotal,
    clearCart,
  } = useCheckout();

  const router = useRouter();
  const [paying, setPaying] = useState(false);

  const canPay = cartItems.length > 0 && shippingAddress !== null;

  async function handlePay() {
    if (!canPay) return;
    setPaying(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    clearCart();
    router.push("/success");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Confirm &amp; Pay
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Review your order before completing payment.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>

        {cartItems.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="mt-4 divide-y divide-gray-100">
            {cartItems.map((item) => (
              <li
                key={item.product_id}
                className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.product_name}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">
                    {item.product_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    ₹{item.product_price} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  ₹{item.product_price * item.quantity}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Shipping Address
        </h2>

        {shippingAddress ? (
          <div className="mt-4 text-sm text-gray-700 space-y-1">
            <p className="font-medium text-gray-900">
              {shippingAddress.fullName}
            </p>
            <p>{shippingAddress.email}</p>
            <p>{shippingAddress.phone}</p>
            <p>
              {shippingAddress.city}, {shippingAddress.state} –{" "}
              {shippingAddress.pinCode}
            </p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-red-500">
            Shipping information missing.
          </p>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Order Summary
        </h2>

        <dl className="mt-4 space-y-3 text-sm text-gray-600">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-medium text-gray-800">₹{subtotal}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping Fee</dt>
            <dd className="font-medium text-gray-800">₹{shippingFee}</dd>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-4 mt-4 text-lg font-semibold text-gray-900">
            <dt>Grand Total</dt>
            <dd>₹{grandTotal}</dd>
          </div>
        </dl>
      </div>

      <button
        onClick={handlePay}
        disabled={!canPay || paying}
        className="block w-full rounded-lg bg-green-600 py-3 text-center text-lg font-semibold text-white shadow hover:bg-green-700 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {paying ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            Processing Payment...
          </span>
        ) : (
          "Pay Securely"
        )}
      </button>
    </div>
  );
}
