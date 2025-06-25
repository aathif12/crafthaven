import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white  ">
      <div className="max-w-8xl mx-auto px-7 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-semibold mb-4">CraftHaven</h3>
          <p className="text-sm text-gray-300">
            Discover unique handmade crafts, jewelry, art prints, and more from
            talented creators.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/category/jewelry" className="hover:underline">
                Jewelry
              </Link>
            </li>
            <li>
              <Link href="/category/art-prints" className="hover:underline">
                Art Prints
              </Link>
            </li>
            <li>
              <Link href="/category/paper-goods" className="hover:underline">
                Paper Goods
              </Link>
            </li>
            <li>
              <Link href="/category/home-living" className="hover:underline">
                Home & Living
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-orange-400" />
              support@crafthaven.com
            </li>
            <li className="flex gap-4 mt-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="hover:text-orange-400"
              >
                <FaFacebookF />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="hover:text-orange-400"
              >
                <FaInstagram />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="hover:text-orange-400"
              >
                <FaTwitter />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} CraftHaven. All rights reserved.
      </div>
    </footer>
  );
}
