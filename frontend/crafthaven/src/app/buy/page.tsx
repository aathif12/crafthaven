"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function BuyPage() {
  const params = useSearchParams();

  const title = params.get("title") || "Unknown";
  const price = params.get("price") || "0";
  const desc = params.get("desc") || "No description";
  const image = params.get("image") || "";

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <div className="relative w-full h-64 mb-4">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain rounded-xl"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex justify-center items-center">
            No Image
          </div>
        )}
      </div>
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-gray-700 my-2">{desc}</p>
      <p className="text-lg font-semibold">Rs. {price}</p>
      <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        Proceed to Payment
      </button>
    </div>
  );
}
