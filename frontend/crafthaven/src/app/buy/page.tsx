"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function BuyPage() {
  const params = useSearchParams();

  const title = params.get("title") || "Unknown Product";
  const price = params.get("price") || "0";
  const desc = params.get("desc") || "No description available.";
  const image = params.get("image") || "";
  const categoryParam = params.get("category");
  const sku = params.get("sku");

  const priceNumber = parseFloat(price);
  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState<any[]>([]);

  const handleQuantityChange = (val: number) => {
    if (val >= 1) setQuantity(val);
  };

  const totalPrice = priceNumber * quantity;
  const isPayable = image && priceNumber > 0;

  const formatCurrency = (amount: number) =>
    "Rs. " + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  useEffect(() => {
    if (categoryParam) {
      fetch(`http://localhost:8080/api/products/category/${categoryParam}`)
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter((item: any) => item.title !== title);
          setRelated(filtered);
        });
    }
  }, [categoryParam, title]);

  return (
    <>
      <Header />
      <div className=" bg-[#FFF3EE]">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="relative w-full md:w-1/2 h-[400px] rounded-3xl overflow-hidden bg-gray-100 flex items-center justify-center shadow-lg">
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <span className="text-gray-400 text-lg select-none">
                  No Image Available
                </span>
              )}
            </div>

            <section className="md:w-1/2 flex flex-col justify-between">
              <div>
                <h1 className="text-5xl font-extrabold text-[#FF5506] font-serif mb-6">
                  {title}
                </h1>
                <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                  {desc}
                </p>
                {categoryParam && (
                  <p className="mb-2 text-sm text-[#FF5506] font-semibold">
                    Category:{" "}
                    <span className="capitalize font-normal">
                      {categoryParam}
                    </span>
                  </p>
                )}
                {sku && (
                  <p className="mb-6 text-sm text-amber-700 font-semibold">
                    SKU: <span className="font-mono font-normal">{sku}</span>
                  </p>
                )}
                <div className="inline-flex items-center border border-[#FF5506] rounded-xl overflow-hidden mb-8">
                  <button
                    onClick={() =>
                      handleQuantityChange(Math.max(1, quantity - 1))
                    }
                    className="w-12 h-12 bg-[#FF5506] text-white hover:bg-amber-700 font-bold"
                  >
                    –
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(Number(e.target.value))
                    }
                    className="w-20 text-center border-x border-amber-900 focus:outline-none text-lg text-amber-900"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-12 h-12 bg-[#FF5506] text-white hover:bg-amber-700 font-bold"
                  >
                    +
                  </button>
                </div>
                <p className="text-4xl font-bold text-[#FF5506] mb-8">
                  Total: {formatCurrency(totalPrice)}
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                {isPayable ? (
                  <Link
                    href={`/checkout?title=${encodeURIComponent(
                      title
                    )}&price=${priceNumber}&desc=${encodeURIComponent(
                      desc
                    )}&image=${encodeURIComponent(image)}&quantity=${quantity}`}
                    className="w-full block text-center py-4 rounded-2xl font-bold text-white text-xl bg-[#FF5506] hover:bg-red-600 transition focus:outline-none focus:ring-4 focus:ring-amber-400"
                  >
                    Proceed to Payment
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-4 rounded-2xl font-bold text-white text-xl bg-gray-400 cursor-not-allowed"
                  >
                    Proceed to Payment
                  </button>
                )}
                <Link
                  href="/cart"
                  className="text-center text-amber-900 font-semibold hover:underline"
                >
                  Back to Cart
                </Link>
              </div>
            </section>
          </div>

          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="text-3xl font-bold mb-6 text-amber-900">
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
                      href={`/buy?title=${encodeURIComponent(
                        item.title
                      )}&price=${item.price}&desc=${encodeURIComponent(
                        item.description
                      )}&image=${encodeURIComponent(item.imageUrl)}&category=${
                        item.category?.slug
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
        </main>
        <Footer />
      </div>
    </>
  );
}
