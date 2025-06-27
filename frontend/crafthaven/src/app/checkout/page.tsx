"use client";

import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const params = useSearchParams();

  // Try to read product info from query params (for single product checkout)
  const paramTitle = params.get("title");
  const paramPrice = params.get("price");
  const paramDesc = params.get("desc");
  const paramImage = params.get("image");
  const paramQuantity = params.get("quantity");

  // Build a "checkoutItems" array that either uses the single product or the cart
  const checkoutItems =
    paramTitle && paramPrice && paramQuantity
      ? [
          {
            id: "single-product",
            title: paramTitle,
            price: parseFloat(paramPrice),
            quantity: parseInt(paramQuantity, 10),
            description: paramDesc || "",
            imageUrl: paramImage || "",
          },
        ]
      : cartItems;

  const TAX_RATE = 0.07;
  const SHIPPING_FEE = checkoutItems.length > 0 ? 150 : 0;

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING_FEE;

  const formatCurrency = (amount: number) =>
    "Rs. " + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (checkoutItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // TODO: Add validation and backend submission here
    alert("Order placed successfully! Thank you.");
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-20 bg-[#FFF3EE]">
        <h2 className="text-4xl font-bold text-amber-900 mb-6">
          Your Cart is Empty
        </h2>
        <p>Please add some products before checking out.</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-[#FFF3EE] min-h-screen max-w-9xl mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto p-8 bg-white rounded shadow-md my-12">
          <h1 className="text-3xl font-semibold mb-8 text-gray-800">
            Checkout
          </h1>

          {/* Products Summary */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Your Products
            </h2>
            <ul className="divide-y divide-gray-300">
              {checkoutItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between py-4 items-center"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="font-semibold text-gray-900">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </li>
              ))}

              <li className="flex justify-between py-4 font-semibold text-gray-900 border-t border-gray-300 mt-4">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </li>
              <li className="flex justify-between py-2 text-gray-700">
                <span>Tax (7%)</span>
                <span>{formatCurrency(tax)}</span>
              </li>
              <li className="flex justify-between py-2 text-gray-700">
                <span>Shipping Fee</span>
                <span>{formatCurrency(SHIPPING_FEE)}</span>
              </li>
              <li className="flex justify-between py-4 font-extrabold text-amber-900 text-xl border-t border-gray-300">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </li>
            </ul>
          </section>

          {/* Shipping Address Form */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Shipping Address
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full border  text-gray-800  border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full border  text-gray-800 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 555-123-4567"
                    className="w-full border  text-gray-800 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    required
                    className="w-full border  text-gray-800 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Country</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="LK">Sri Lanka</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="addressLine1"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={form.addressLine1}
                  onChange={handleChange}
                  required
                  placeholder="1234 Main St"
                  className="w-full border  text-gray-800 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="addressLine2"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={form.addressLine2}
                  onChange={handleChange}
                  placeholder="Apartment, suite, etc."
                  className="w-full border  text-gray-800 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    placeholder="Colombo"
                    className="w-full border  text-gray-800 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    State/Province <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    required
                    placeholder="Western Province"
                    className="w-full border  text-gray-800 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    required
                    placeholder="10000"
                    className="w-full border  text-gray-800 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-900 hover:bg-amber-800 text-white font-bold py-3 rounded transition-colors"
              >
                Place Order
              </button>
            </form>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
