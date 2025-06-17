import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Ingredients from "./components/Ingredients";
import ProductCard from "./components/ProductCart";
import ShoppingCart from "./components/ShoppingCart";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex flex-col items-center sm:items-start">
        <HeroSection />
        <Ingredients />
      </main>
      <ShoppingCart />
      <ProductCard />
      <footer className="flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
