import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-4xl font-bold text-gray-900">
          Ecoyaan Checkout
        </h1>
        <p className="mt-3 text-gray-500">
          A simplified e-commerce checkout flow built with Next.js 14,
          TypeScript, and Tailwind CSS.
        </p>
        <Link
          href="/cart"
          className="mt-8 inline-block rounded-lg bg-green-600 px-8 py-3 text-lg font-semibold text-white shadow hover:bg-green-700 transition-colors"
        >
          View Cart
        </Link>
      </div>
    </main>
  );
}
