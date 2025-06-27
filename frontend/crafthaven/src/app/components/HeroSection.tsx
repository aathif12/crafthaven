"use client";

export default function HeroSection() {
  const scrollToProducts = () => {
    const element = document.getElementById("product-list");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-10 bg-orange-300">
      {/* Shop Now Button */}
      <button
        onClick={scrollToProducts}
        className="absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 px-10 py-3 bg-white text-[#252B42] text-lg font-medium hover:bg-[#252B42] hover:text-white transition shadow-lg"
      >
        Shop now →
      </button>

      {/* Left Image */}
      <div className="relative">
        <img
          src="/bowl.png"
          alt="Handcrafted Bowl"
          className="w-[1000px] h-[1000px] object-contain mx-auto"
        />
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 text-2xl text-[#252B42]">
          <button className="block mb-2">→</button>
          <button className="block">←</button>
        </div>
      </div>

      {/* Right Content with Heading and Image */}
      <div className="relative">
        <h1 className="text-9xl font-normal font-['Ivy_Mode'] leading-[118.80px] text-[#F2F6EF] leading-tight absolute z-10">
          Welcome to our
          <br />
          world of
          <br />
          <span className="font-normal">handcrafted</span>
          <br />
          artistry
        </h1>
        <img
          src="/craft.png"
          alt="Craft Visual"
          className="w-[1000px] h-[1000px] object-contain mx-auto object-left-top"
        />
      </div>
    </section>
  );
}
