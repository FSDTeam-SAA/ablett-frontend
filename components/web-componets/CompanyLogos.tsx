"use client";

import Image from "next/image";

const logos = [
  "/logo1.png",
  "/logo2.png",
  "/logo3.png",
  "/logo1.png",
  "/logo2.png",
  "/logo3.png",
  "/logo1.png",
  "/logo2.png",
  "/logo3.png",
];

export default function CompanyLogos() {
  const items = [...logos, ...logos]; // duplicate for infinite loop

  return (
    <section className="relative overflow-hidden bg-[#000000] py-10 sm:py-[60px]">
   

      <div className="flex w-max animate-marquee">
        {items.map((logo, index) => (
          <div
            key={index}
            className="mx-6 flex h-12 w-28 items-center justify-center sm:mx-12 sm:h-[60px] sm:w-40"
          >
            <Image
              src={logo}
              alt="logo"
              width={1000}
              height={1000}
              className="h-12 w-auto object-contain sm:h-[60px]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
