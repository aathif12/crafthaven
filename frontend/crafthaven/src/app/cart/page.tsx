"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();

  const TAX_RATE = 0.07;
  const SHIPPING_FEE = cartItems.length > 0 ? 150 : 0;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING_FEE;

  const formatCurrency = (amount: number) =>
    "Rs. " + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // State for related products
  const [related, setRelated] = useState<any[]>([]);

  // Get unique categories from cart items
  const categoriesInCart = Array.from(
    new Set(
      cartItems
        .map((item) =>
          typeof item.category === "object" ? item.category.slug : item.category
        )
        .filter(Boolean)
    )
  );

  // Fetch related products from all categories in cart
  useEffect(() => {
    if (categoriesInCart.length === 0) {
      setRelated([]);
      return;
    }

    // Fetch products from all categories and combine results
    Promise.all(
      categoriesInCart.map((cat) =>
        fetch(`http://localhost:8080/api/products/category/${cat}`).then(
          (res) => res.json()
        )
      )
    )
      .then((allData) => {
        // Flatten array of arrays
        const combined = allData.flat();

        // Filter out products already in cart by title or id
        const filtered = combined.filter(
          (item: any) =>
            !cartItems.some((cartItem) => cartItem.title === item.title)
        );

        // Remove duplicates by id if any
        const uniqueRelated = filtered.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
        );

        setRelated(uniqueRelated);
      })
      .catch(() => setRelated([]));
  }, [categoriesInCart, cartItems]);

  if (cartItems.length === 0) {
    return (
      <>
        <Header />

        <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 bg-[#FFF3EE]">
          <h2 className="text-4xl font-bold text-amber-900 mb-6">
            Your Cart is Empty
          </h2>
          <Link
            href="/"
            className="text-[#FF5506] text-lg font-semibold hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-9xl mx-auto px-6 py-12 bg-[#FFF3EE] min-h-[90vh]">
        <h1 className="text-5xl font-extrabold text-amber-900 mb-10 font-serif">
          Your Cart
        </h1>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow flex flex-col md:flex-row items-center md:items-start justify-between"
              >
                <div className="flex items-center space-x-6 w-full md:w-3/5">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={120}
                    height={120}
                    className="rounded-xl object-cover"
                  />

                  <div>
                    <h2 className="text-2xl font-bold text-[#FF5506] mb-1">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-700 mb-1 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Category:{" "}
                      <span className="capitalize font-medium">
                        {typeof item.category === "object"
                          ? item.category.name
                          : item.category}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      SKU:{" "}
                      <span className="font-mono">{item.sku || "N/A"}</span>
                    </p>
                    <p
                      className={`mt-2 font-medium ${
                        item.inStock ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 md:mt-0 w-full md:w-2/5 flex flex-col items-end space-y-4">
                  <div className="text-xl font-bold text-amber-900">
                    {formatCurrency(item.price * item.quantity)}
                  </div>

                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="w-10 h-10 bg-amber-900 text-white font-bold"
                    >
                      –
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                      className="w-12 text-center border-x border-amber-900 focus:outline-none text-amber-700"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 bg-amber-900 font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="bg-white rounded-2xl shadow p-6 sticky top-24 h-fit">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2 text-gray-700">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex justify-between mb-2 text-gray-700">
              <span>Tax (7%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>

            <div className="flex justify-between mb-2 text-gray-700">
              <span>Shipping</span>
              <span>{formatCurrency(SHIPPING_FEE)}</span>
            </div>

            <hr className="border-amber-300 my-4" />

            <div className="flex justify-between text-2xl font-extrabold text-amber-900 mb-6">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>

            <Link
              href="/checkout"
              className="block w-full text-center py-3 bg-amber-950 text-white rounded-xl font-bold hover:bg-amber-900 transition"
            >
              Proceed to Checkout
            </Link>

            <button
              onClick={clearCart}
              className="w-full mt-4 py-3 bg-[#FF5506] text-white rounded-xl font-semibold hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
          </aside>
        </div>

        {/* Related Products Section */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-amber-900">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {related.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow hover:shadow-md transition p-4"
                >
                  <div className="relative w-full h-40 mb-3 rounded overflow-hidden bg-gray-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-[#FF5506] truncate">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 truncate">
                    {item.description}
                  </p>
                  <p className="text-amber-700 font-bold mb-2">
                    Rs. {item.price.toFixed(2)}
                  </p>
                  <Link
                    href={`/buy?title=${encodeURIComponent(item.title)}&price=${
                      item.price
                    }&desc=${encodeURIComponent(
                      item.description
                    )}&image=${encodeURIComponent(item.imageUrl)}&category=${
                      item.category?.slug || item.category
                    }`}
                    className="inline-block mt-2 px-4 py-2 bg-[#FF5506] text-white rounded hover:bg-red-600 text-sm"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
}
