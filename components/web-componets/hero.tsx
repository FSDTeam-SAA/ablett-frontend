import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[640px] overflow-hidden sm:h-[680px] lg:h-[724px]">
      {/* Background */}

      <Image
        src="/hero1.png"
        alt="hero"
        fill
        priority
        className="object-cover object-center lg:object-fill"
      />

      {/* Overlay */}

   <div
  className="absolute inset-0"
  style={{
    background:
      "linear-gradient(270deg, rgba(0, 0, 0, 0) 36%, #000000 100%)",
  }}
/> 

    

      <div className="relative z-10 container mx-auto flex h-full items-center px-5 sm:px-6">
        <div className="max-w-2xl text-white">
          <h1 className="pt-20 text-[38px] font-normal leading-[1.08] sm:pt-24 sm:text-[52px] lg:pt-[120px] lg:text-[68px]">
            From{" "}
            <span className="italic font-heading font-medium">
              Raw Land
            </span>{" "}
            to
            <br />
            Finished Projects
          </h1>

          <p className="mt-5 max-w-xl text-[15px] leading-7 font-light text-[#E6E6E6] sm:mt-7 sm:text-base sm:leading-8 lg:max-w-2xl lg:text-lg">
            A7 Property Solutions delivers residential,
            commercial, site preparation, welding and
            construction services with quality craftsmanship,
            reliable equipment, and experienced professionals.
          </p>

          <Button
            className="mt-8 h-12 rounded-full bg-[#BB7B1D] px-6 text-sm hover:bg-[#BB7B1D]/80 sm:mt-10 sm:px-8 sm:text-base lg:mt-[52px] lg:h-auto lg:py-7"
          >
            Request a Free Quote
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          {/* Rating */}

          <div className="mt-8 flex items-center gap-3 sm:mt-10 sm:gap-4">
            <div className="flex -space-x-3">
              <Image
                src="/Profile.png"
                alt=""
                width={1000}
                height={1000}
                className="h-10 w-10 rounded-full border-2 border-white sm:h-12 sm:w-12"
              />
              <Image
                src="/Profile.png"
                alt=""
                width={1000}
                height={1000}
                className="h-10 w-10 rounded-full border-2 border-white sm:h-12 sm:w-12"
              />
             <Image
                src="/Profile.png"
                alt=""
                width={1000}
                height={1000}
                className="h-10 w-10 rounded-full border-2 border-white sm:h-12 sm:w-12"
              />
            </div>

            <div>
              <h4 className="text-sm font-semibold sm:text-lg">
                4.9/5 ⭐⭐⭐⭐⭐
              </h4>

              <p className="text-xs text-[#F2F2F2] sm:text-base">
                See all 1000+ reviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
