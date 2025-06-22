"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image_url: string; // Ensure this matches your backend JSON key
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data);
        data.forEach((product: Product) =>
          console.log("Image URL:", product.image_url)
        );
        setProducts(data);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-100 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
