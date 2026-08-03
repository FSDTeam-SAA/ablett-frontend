import Image from "next/image";

export default function FaqHero() {
  return (
    <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden pt-20 text-white sm:min-h-[340px] sm:pt-24 lg:min-h-[374px]">
      <Image
        src="/faq.png"
        alt="Construction site background"
        fill
        priority
        className="object-cover"
      />
      {/* <div className="absolute inset-0 bg-black/65" /> */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/60" /> */}

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
        <h1 className="text-[34px] font-normal leading-tight sm:text-5xl md:text-6xl lg:text-[68px]">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto mt-4 max-w-4xl text-sm font-light leading-7 text-[#E8E8E8] sm:mt-5 sm:text-base md:text-lg md:leading-8">
          Find answers to the most common questions about our construction
          services, project process, timelines, warranties, and more. If you
          can&apos;t find what you&apos;re looking for, our team is always here
          to help.
        </p>
      </div>
    </section>
  );
}
