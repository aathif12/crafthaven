"use client";
import { useCart } from "@/app/context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

export default function MiniCart() {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Link href="/cart">
      <div className="flex items-center space-x-2 hover:underline cursor-pointer">
        <FaShoppingCart className="text-xl" />
        <span>{totalItems} item(s)</span>
        <span className="font-semibold">Rs. {totalAmount}</span>
      </div>
    </Link>
  );
}
