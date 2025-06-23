"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  category: {
    id: number;
    name: string;
  };
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const categories = [
    "All",
    ...Array.from(
      new Set(products.map((p) => p.category?.name).filter(Boolean))
    ),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category.name === selectedCategory
        );

  return (
    <div className="p-4   bg-[#FFF3EE]  shadow-md">
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center ">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-8 py-4 rounded-full text-sm font-bold transition ${
              selectedCategory === cat
                ? "bg-[#FF5506] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-[#ffd6c3]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-[#FFF3EE]">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
