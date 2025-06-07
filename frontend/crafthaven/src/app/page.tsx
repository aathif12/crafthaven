import Image from "next/image";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturedCategories from "./components/FeaturedCategories";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Header at the top */}
      <Header />

      {/* Main content (Hero section and others) */}
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <HeroSection />
        {/* You can add FeaturedCategories here if needed */}
      </main>

      {/* Footer at the bottom */}
      <footer className="flex gap-[24px] flex-wrap items-center justify-center">
        {/* Your existing footer content */}
      </footer>
    </div>
  );
}
