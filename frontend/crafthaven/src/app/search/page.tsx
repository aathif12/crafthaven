"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // "" | "asc" | "desc"

  useEffect(() => {
    if (query.trim()) {
      fetch(`http://localhost:8080/api/products/search?query=${query}`)
        .then((res) => res.json())
        .then(setProducts);
    }
  }, [query]);

  // Sort products locally based on sortOrder
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else if (sortOrder === "desc") {
      return b.price - a.price;
    } else {
      return 0; // no sorting, keep original order
    }
  });

  return (
    <>
      <Header />
      <div className="bg-[#ffd6c3] py-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800">Search Results</h1>
          <p className="text-gray-600 mt-2">
            Showing results for: <span className="font-semibold">{query}</span>
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="sortPrice"
            className="mr-2 font-black text-amber-800 text-lg"
          >
            Sort by price:
          </label>
          <select
            id="sortPrice"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded p-1 text-amber-700 bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-300  focus:border-amber-500  "
          >
            <option value="">-- Select --</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sortedProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
      <Footer />
    </>
  );
}
