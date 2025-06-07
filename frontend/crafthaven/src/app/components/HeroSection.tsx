export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 items-center px-10  gap-10 bg-orange-300">
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
      <div>
        <h1 className="text-5xl md:text-6xl font-serif font-light text-[#F2F6EF] leading-tight absolute">
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
          alt="Handcrafted Bowl"
          className="w-[1000px] h-[1000px] object-contain mx-auto object-left-top"
        />
        <button className="mt-10 px-6 py-3 bg-white border border-[#252B42] text-[#252B42] text-lg font-medium hover:bg-[#252B42] hover:text-white transition">
          Shop now →
        </button>
      </div>
    </section>
  );
}
