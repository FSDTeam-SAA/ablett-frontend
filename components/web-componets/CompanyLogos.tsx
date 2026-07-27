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
    <section className="relative overflow-hidden bg-[#000000] py-[60px]">
   

      <div className="flex w-max animate-marquee">
        {items.map((logo, index) => (
          <div
            key={index}
            className="mx-12 flex h-[60px] w-40 items-center justify-center "
          >
            <Image
              src={logo}
              alt="logo"
              width={1000}
              height={1000}
              className="h-[60px] w-auto object-contain  "
            />
          </div>
        ))}
      </div>
    </section>
  );
}
