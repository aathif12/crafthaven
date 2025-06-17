"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";

type Product = {
  id: 1;
  name: "dfdkfj";
  price: 45445;
  imageUrl: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition duration-300 max-w-xs w-full">
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
        {/* <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        /> */}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{"dfndf"}</h3>
      <p className="text-gray-600 mb-2">Rs. {4000}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 w-full bg-[#59B2F4] text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
