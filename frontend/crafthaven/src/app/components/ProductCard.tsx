"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  category?: {
    slug: string;
  };
  sku?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = () => {
    const query = new URLSearchParams({
      title: product.title,
      price: product.price.toString(),
      image: product.imageUrl,
      desc: product.description,
    });

    if (product.category?.slug) {
      query.append("category", product.category.slug);
    }

    if (product.sku) {
      query.append("sku", product.sku);
    }

    router.push(`/buy?${query.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between">
      <div className="relative w-full h-100 mb-4 rounded-xl overflow-hidden p-4">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            sizes="100vw"
            className="object-contain"
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500 text-sm">
            No Image
          </div>
        )}
      </div>

      <div className="mb-2 text-center">
        <h3 className="text-lg font-bold text-gray-600">{product.title}</h3>
        <p className="text-gray-600">Rs. {product.price}</p>
      </div>

      <div className="flex justify-between gap-2 mt-auto">
        <button
          onClick={() => addToCart(product)}
          className="bg-[#ffd6c3] text-black font-bold px-4 py-2 rounded hover:bg-amber-300 text-sm w-full"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="bg-[#FF5506] text-white font-bold px-4 py-2 rounded hover:bg-red-600 text-sm w-full"
        >
          Buy
        </button>
      </div>
    </div>
  );
}
