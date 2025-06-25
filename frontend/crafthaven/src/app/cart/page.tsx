"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center ">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Link href="/" className="text-blue-500 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#FFF3EE] rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6  text-amber-900 ">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border rounded-lg shadow"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={80}
                height={80}
                className="rounded"
              />
              <div>
                <h3 className="text-lg font-semibold  text-amber-700">
                  {item.title}
                </h3>
                <p className="text-sm text-amber-900">{item.description}</p>
                <p className="text-sm  text-amber-700">
                  Rs. {item.price} x {item.quantity}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">Rs. {item.price * item.quantity}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline text-sm mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-[#FF5506] text-white rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
        <div className="text-xl font-bold">
          Total: Rs. {totalAmount.toFixed(2)}
        </div>
      </div>

      <div className="mt-6 text-right">
        <Link
          href="/checkout"
          className="px-6 py-2 bg-amber-950 text-white rounded font-bold hover:bg-amber-950 "
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
