import type { NextPage } from "next";
import Image from "next/image";

const Ingredients: NextPage = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Left Section - Now with orange accent */}
      <div className="w-full lg:w-1/2 bg-[#ffffff] p-6 lg:p-12 flex flex-col">
        <h1 className="text-8xl md:text-6xl font-bold mb-10 text-[#9A3100] text-center lg:text-left font-['Ivy_Mode'] ">
          here tradition, creativity, and craftsmanship come together
        </h1>
        <div className="relative w-full aspect-[616/405] flex-grow  overflow-hidden">
          <Image
            className="object-cover"
            fill
            alt="Women working with pottery"
            src="/women-Vase-bowl-Saturday-Evening-Girls-potteries_1-removebg-preview 1.png"
          />
        </div>
      </div>

      {/* Right Section - Orange accent elements */}
      <div className="w-full lg:w-1/2 bg-[#FFF3EE] p-6 lg:p-12 flex flex-col justify-center">
        <div className="space-y-8 w-full">
          {/* Sustainable Materials */}
          <div className="w-full bg-white p-8 rounded-none lg:rounded-lg shadow-lg border-t-4 border-[#FF5506]">
            <div className="flex gap-6 items-start max-w-6xl mx-auto">
              <div className="min-w-[74px] bg-[#FF5506] p-3 rounded-full">
                <Image
                  width={74}
                  height={74}
                  alt="Organic icon"
                  src="/Organic.png"
                  className="filter brightness-0 invert"
                />
              </div>
              <div className="w-full">
                <h2 className="text-2xl font-semibold text-[#FF5506] mb-3 ">
                  Sustainable Materials
                </h2>
                <p className="text-lg text-[#9A3100] ">
                  Eco-conscious creations made with natural, recycled, or
                  upcycled resources.
                </p>
              </div>
            </div>
          </div>

          {/* Creative & Unique */}
          <div className="w-full bg-white p-8 rounded-none lg:rounded-lg shadow-lg border-t-4 border-[#FF5506]">
            <div className="flex gap-6 items-start max-w-6xl mx-auto">
              <div className="min-w-[74px] bg-[#FF5506] p-3 rounded-full">
                <Image
                  width={74}
                  height={74}
                  alt="Creative icon"
                  src="/skin 1.png"
                  className="filter brightness-0 invert"
                />
              </div>
              <div className="w-full">
                <h2 className="text-2xl font-semibold text-[#FF5506] mb-3 ">
                  Creative & Unique
                </h2>
                <p className="text-lg text-[#9A3100] ">
                  One-of-a-kind items that celebrate individuality and artistic
                  expression
                </p>
              </div>
            </div>
          </div>

          {/* Authentically Handmade */}
          <div className="w-full bg-white p-8 rounded-none lg:rounded-lg shadow-lg border-t-4 border-[#FF5506]">
            <div className="flex gap-6 items-start max-w-6xl mx-auto">
              <div className="min-w-[74px] bg-[#FF5506] p-3 rounded-full">
                <Image
                  width={74}
                  height={74}
                  alt="Handmade icon"
                  src="/serum 3.png"
                  className="filter brightness-0 invert"
                />
              </div>
              <div className="w-full">
                <h2 className="text-2xl font-semibold text-[#FF5506] mb-3 ">
                  Authentically Handmade
                </h2>
                <p className="text-lg text-[#9A3100] ">
                  Every product is carefully crafted by skilled artisans using
                  traditional techniques.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
