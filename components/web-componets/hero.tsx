import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Download, Home, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[640px] overflow-hidden sm:h-[680px] lg:h-[724px]">
      {/* Background */}

      <Image
        src="/hero.png"
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
            <span className="italic font-heading font-medium">Raw Land</span> to
            <br />
            Finished Projects
          </h1>

          <p className="mt-5 max-w-xl text-[15px] leading-7 font-light text-[#E6E6E6] sm:mt-5 sm:text-base sm:leading-8 lg:max-w-2xl lg:text-lg">
            Complete residential and commercial construction solutions
            delivered with quality craftsmanship, experienced project
            management, and attention to every detail.
          </p>

          <div className="mt-5 flex items-center gap- sm:mt-5">
            <div>
              <Image
                src="/plus.png"
                alt="logo"
                width={1000}
                height={1000}
                className="h-10 w-10 sm:h-12 sm:w-12 object-cover"
              />
            </div>
            <div>
              <p className="text-base lg:text-xl font-medium">Built on Faith. Committed to Excellence</p>
              <span className="text-xs lg:text-base font-medium text-[#E6E6E6]">Seeking to glorify Jesus through every project</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center lg:mt-[42px]">
            <Link
              href="/request-quote"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#BB7B1D] px-7 text-sm font-medium text-white transition hover:bg-[#BB7B1D]/85 sm:px-9 sm:text-base"
            >
              Request a Quote
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-medium text-[#BB7B1D] transition hover:bg-white/85 sm:px-9 sm:text-base"
            >
              View Our Projects
            </Link>
          </div>
          <div className="mt-6">
            <a
              href="/A7_Property_Solutions_Brochure.pdf"
              download
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-dotted border-[#BB7B1D] bg-transparent px-6 text-sm font-medium text-white transition hover:bg-[#BB7B1D]/15 sm:px-8 sm:text-base"
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5" />
              Download Our Company Brochure (PDF)
            </a>
          </div>

          {/* Rating */}

          <div className="mt-4 space-y-3 text-white sm:mt-5">
            <h4 className=" text-2xl italic font-semibold leading-none sm:text-[28px]">
              16+ Years of Construction Experience
            </h4>
            <div className="space-y-2 text-sm font-light text-white sm:text-base">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-white" />
                <span>Serving North Texas & Southern Oklahoma</span>
              </div>
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-white" />
                <span>Free Estimates</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-white" />
                <span>Residential & Commercial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
