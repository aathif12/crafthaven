"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (query.trim()) {
      fetch(`http://localhost:8080/api/products/search?query=${query}`)
        .then((res) => res.json())
        .then(setProducts);
    }
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4 ">
        Search results for "{query}"
      </h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
