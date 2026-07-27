import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[754px] overflow-hidden">
      {/* Background */}

      <Image
        src="/hero.png"
        alt="hero"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}

   <div
  className="absolute inset-0"
  style={{
    background:
      "linear-gradient(270deg, rgba(0, 0, 0, 0) 36%, #000000 100%)",
  }}
/> 

    

      <div className="relative z-10 container mx-auto flex h-full items-center px-6">
        <div className="max-w-2xl text-white">
          <h1 className="text-[68px] font-normal pt-[120px]">
            From{" "}
            <span className="italic font-heading font-medium">
              Raw Land
            </span>{" "}
            to
            <br />
            Finished Projects
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 font-light text-[#E6E6E6]">
            A7 Property Solutions delivers residential,
            commercial, site preparation, welding and
            construction services with quality craftsmanship,
            reliable equipment, and experienced professionals.
          </p>

          <Button
            className="mt-[52px] rounded-full bg-[#BB7B1D] px-8 py-7 text-base hover:bg-[#BB7B1D]/80"
          >
            Request a Free Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {/* Rating */}

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              <Image
                src="/Profile.png"
                alt=""
                width={1000}
                height={1000}
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <Image
                src="/Profile.png"
                alt=""
                width={1000}
                height={1000}
                className="w-12 h-12 rounded-full border-2 border-white"
              />
             <Image
                src="/Profile.png"
                alt=""
                width={1000}
                height={1000}
                className="w-12 h-12 rounded-full border-2 border-white"
              />
            </div>

            <div>
              <h4 className="font-semibold text-lg">
                4.9/5 ⭐⭐⭐⭐⭐
              </h4>

              <p className="text-[#F2F2F2]">
                See all 1000+ reviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
