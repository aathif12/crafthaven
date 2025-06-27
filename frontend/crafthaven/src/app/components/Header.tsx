"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import MiniCart from "./MiniCart";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (query.trim().length > 1) {
      fetch(`http://localhost:8080/api/products/suggestions?query=${query}`)
        .then((res) => res.json())
        .then(setSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (title: string) => {
    setQuery(title);
    setShowSuggestions(false);
    router.push(`/search?query=${encodeURIComponent(title)}`);
  };

  return (
    <header className="w-full bg-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-9xl mx-auto flex justify-between items-center">
        {/* Left: Navigation + Search */}
        <div className="flex items-center space-x-6 flex-1">
          <Link href="/" className="flex items-center ml-6">
            <img src="/logo.png" alt="CraftHaven Logo" className="h-8 w-auto" />
            <span className="ml-2 text-xl font-semibold text-gray-800 font-serif">
              CraftHaven
            </span>
          </Link>
          {/* Search Bar */}
          <div className="relative hidden md:block flex-1">
            <form onSubmit={handleSearch} className="flex">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none text-black"
              />
              <button
                type="submit"
                className="bg-orange-600 text-white px-4 py-2 rounded-r-md hover:bg-orange-700"
              >
                Search
              </button>
            </form>
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-50 bg-white border border-gray-300 mt-1 w-full max-h-60 overflow-y-auto shadow-lg rounded-md">
                {suggestions.map((item: any) => (
                  <li
                    key={item.id}
                    onClick={() => handleSuggestionClick(item.title)}
                    className="px-4 text-amber-900 font-bold py-2 hover:bg-orange-100 cursor-pointer"
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Navigation */}
          <nav className="hidden md:flex space-x-6 text-sm lg:text-base text-gray-700 items-center">
            <Link
              href="/category/Jewelry"
              className="hover:text-orange-600 transition"
            >
              Jewelry
            </Link>
            <Link
              href="/category/wood-carvings"
              className="hover:text-orange-600 transition"
            >
              Wood Carvings
            </Link>
            <Link
              href="/category/clay-items"
              className="hover:text-orange-600 transition"
            >
              Clay Items
            </Link>
            <Link
              href="/category/textiles"
              className="hover:text-orange-600 transition"
            >
              Textiles
            </Link>

            <MiniCart />

            {user ? (
              <>
                <span className="text-gray-700">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="text-blue-600">
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
