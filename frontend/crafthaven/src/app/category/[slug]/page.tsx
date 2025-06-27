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

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:8080/api/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filtered = products.filter(
    (product) => product.category?.slug?.toLowerCase() === slug
  );

  return (
    <>
      <Header />
      <div className="px-4 bg-orange-300">
        <h1 className="text-3xl font-bold text-gray-800 text-center py-6">
          {slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Products"}
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((product) => (
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
