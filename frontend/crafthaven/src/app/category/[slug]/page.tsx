"use client";

import ProductCard from "@/app/components/ProductCard";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  category: {
    slug: string;
  };
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug?.toString().toLowerCase();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"" | "asc" | "desc">("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:8080/api/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Filter products by category slug
  const filtered = products.filter(
    (product) => product.category?.slug?.toLowerCase() === slug
  );

  // Sort filtered products based on sortOrder
  const sortedProducts = [...filtered].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else if (sortOrder === "desc") {
      return b.price - a.price;
    }
    return 0; // no sorting, keep original order
  });

  return (
    <>
      <Header />
      <div className="px-4 bg-orange-300">
        <h1 className="text-3xl font-bold text-gray-800 text-center py-6">
          {slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Products"}
        </h1>

        {/* Sort Dropdown */}
        <div className="max-w-3xl mx-auto mb-6 flex justify-end">
          <label
            htmlFor="sortPrice"
            className="mr-2 font-black text-amber-800 text-lg"
          >
            Sort by price:
          </label>
          <select
            id="sortPrice"
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "" | "asc" | "desc")
            }
            className="border rounded p-1 text-amber-700 bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-500"
          >
            <option value="">-- Select --</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
      <Footer />
    </>
  );
}
