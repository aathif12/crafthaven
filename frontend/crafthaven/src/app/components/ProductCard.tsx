"use client";

type Product = {
  id: number;
  title: string;
  price: number;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-bold">{product.title}</h3>
      <p className="text-gray-600">Rs. {product.price}</p>
    </div>
  );
}
