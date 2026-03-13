import CartHydrator from "@/components/CartHydrator";
import Image from "next/image";
import Link from "next/link";
import { getCartData } from "@/lib/cart-data";

export default async function CartPage() {
  const data = getCartData();
  const { cartItems, shipping_fee, discount_applied } = data;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );

  const grandTotal = subtotal + shipping_fee - discount_applied;

  return (
    <div className="space-y-6">
      <CartHydrator items={cartItems} shippingFee={shipping_fee} />

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        <p className="mt-1 text-sm text-gray-500">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="md:col-span-2 space-y-4">
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.product_id}
                className="flex items-center gap-4 bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition duration-200 ease-in-out"
              >
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.product_name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">
                    {item.product_name}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    ₹{item.product_price} × {item.quantity}
                  </p>
                </div>

                <p className="text-lg font-semibold text-gray-900">
                  ₹{item.product_price * item.quantity}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-xl border p-6 sticky top-10">
            <h2 className="text-lg font-semibold text-gray-900">
              Order Summary
            </h2>

            <dl className="mt-4 space-y-3 text-sm text-gray-600">
              <div className="flex justify-between items-center">
                <dt>Subtotal</dt>
                <dd className="font-medium text-gray-800">₹{subtotal}</dd>
              </div>

              <div className="flex justify-between items-center">
                <dt>Shipping</dt>
                <dd className="font-medium text-gray-800">₹{shipping_fee}</dd>
              </div>

              <div className="flex justify-between items-center">
                <dt>Discount</dt>
                <dd className={`font-medium ${discount_applied > 0 ? "text-green-600" : "text-gray-800"}`}>
                  {discount_applied > 0 ? `−₹${discount_applied}` : "₹0"}
                </dd>
              </div>

              <div className="border-t border-gray-300 pt-4 mt-4">
                <div className="flex justify-between items-center text-lg font-semibold text-gray-900">
                  <dt>Total</dt>
                  <dd>₹{grandTotal}</dd>
                </div>
              </div>
            </dl>

            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-lg bg-green-600 py-3 text-center text-lg font-semibold text-white shadow hover:bg-green-700 transition duration-200 ease-in-out"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
