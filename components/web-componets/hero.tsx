import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Download, Home, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[760px] overflow-hidden sm:h-[680px] sm:min-h-0 lg:h-[724px]">
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/70 to-black/90 sm:hidden" />

      <div className="relative z-10 container mx-auto flex min-h-[760px] items-start px-5 pb-10 pt-28 sm:h-full sm:min-h-0 sm:items-center sm:px-6 sm:pb-0 sm:pt-0">
        <div className="w-full max-w-2xl text-white">
          <h1 className="max-w-[335px] text-[34px] font-normal leading-[1.04] [text-wrap:balance] sm:max-w-none sm:pt-24 sm:text-[52px] sm:leading-[1.08] lg:pt-[120px] lg:text-[68px]">
            From{" "}
            <span className="italic font-heading font-medium">Raw Land</span> to
            <br />
            Finished Projects
          </h1>

          <h2>General Contractor and Land Excavation / Development</h2>

          <p className="mt-4 max-w-[330px] text-sm leading-6 font-light text-[#E6E6E6] sm:mt-2 sm:max-w-xl sm:text-base sm:leading-8 lg:max-w-2xl lg:text-lg">
            Complete residential and commercial construction solutions
            delivered with quality craftsmanship, experienced project
            management, and attention to every detail.
          </p>

          <div className="mt-5 flex max-w-[340px] items-center gap-3 sm:mt-5 sm:max-w-none">
            <div>
              <Image
                src="/plus.png"
                alt="logo"
                width={1000}
                height={1000}
                className="h-9 w-9 object-cover sm:h-12 sm:w-12"
              />
            </div>
            <div>
              <p className="text-sm font-medium leading-snug sm:text-base lg:text-xl">Built on Faith. Committed to Excellence</p>
              <span className="text-xs font-medium leading-5 text-[#E6E6E6] lg:text-base">Seeking to glorify Jesus through every project</span>
            </div>
          </div>

          <div className="mt-6 flex max-w-[340px] flex-col gap-3 sm:mt-6 sm:max-w-none sm:flex-row sm:items-center lg:mt-[42px]">
            <Link
              href="/request-quote"
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#BB7B1D] px-6 text-sm font-medium text-white transition hover:bg-[#BB7B1D]/85 sm:h-12 sm:w-auto sm:px-9 sm:text-base"
            >
              Request a Quote
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-[#BB7B1D] transition hover:bg-white/85 sm:h-12 sm:w-auto sm:px-9 sm:text-base"
            >
              View Our Projects
            </Link>
          </div>
          <div className="mt-4 sm:mt-6 text-center md:text-left">
            <a
              href="/A7_Property_Solutions_Brochure.pdf"
              download
              className="inline-flex min-h-9  items-center justify-center gap-2 rounded-full border border-dotted border-[#BB7B1D] bg-transparent px-4 py-2 text-center text-xs font-medium leading-5 text-white transition hover:bg-[#BB7B1D]/15 sm:px-8 sm:text-base"
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5" />
              Download Our Company Brochure (PDF)
            </a>
          </div>

          {/* Rating */}

          <div className="mt-4 max-w-[340px] space-y-3 text-white sm:mt-5 sm:max-w-none">
            <h4 className="text-lg italic font-semibold leading-tight sm:text-[28px] sm:leading-none">
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
