import { NextResponse } from "next/server";
import { getCartData } from "@/lib/cart-data";

export async function GET() {
  try {
    const cartData = getCartData();
    return NextResponse.json(cartData);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch cart data" },
      { status: 500 }
    );
  }
}
