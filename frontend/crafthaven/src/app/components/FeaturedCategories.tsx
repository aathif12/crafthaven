// components/FeaturedCategories.js
export default function FeaturedCategories() {
  const categories = ["Jewelry", "Art Prints", "Paper Goods"];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div
          key={category}
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {category}
          </h2>
          <p className="text-sm text-gray-600">
            Explore our unique collection of {category.toLowerCase()}{" "}
            handcrafted with care.
          </p>
        </div>
      ))}
    </section>
  );
}
