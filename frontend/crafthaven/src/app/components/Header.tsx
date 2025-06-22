import MiniCart from "./minicart";
import ShoppingCart from "./ShoppingCart";

// components/Header.js
export default function Header() {
  return (
    <header className="w-full bg-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.png" alt="CraftHaven Logo" className="h-8 w-auto" />
          <span className="ml-2 text-xl font-semibold text-gray-800 font-serif">
            CraftHaven
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm lg:text-base text-gray-700">
          <a href="#" className="hover:text-orange-600 transition">
            Jewelry
          </a>
          <a href="#" className="hover:text-orange-600 transition">
            Art Prints
          </a>
          <a href="#" className="hover:text-orange-600 transition">
            Paper Goods
          </a>
          <a href="#" className="hover:text-orange-600 transition">
            Home & Living
          </a>
          <a href="#" className="hover:text-orange-600 transition">
            Clothing
          </a>
          <MiniCart />
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button>
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
