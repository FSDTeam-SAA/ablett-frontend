import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

import RequestQuoteForm from "./request-quote-form";

const contactItems = [
  {
    label: "Phone",
    value: "(214) 670-6720",
    href: "tel:(214) 670-6720",
    icon: FaPhoneAlt,
  },
  {
    label: "Email",
    value: "shawn@a7cndc.com",
    href: "mailto:shawn@a7cndc.com",
    icon: FaEnvelope,
  },
  {
    label: "Address",
    value: "1020 Hwy 377 N Ste B #2151 Whitesboro, Texas 76273",
    icon: FaMapMarkerAlt,
  },
];

const socialLinks = [
  { label: "Facebook", href: "/", icon: FaFacebookF },
  { label: "LinkedIn", href: "/", icon: FaLinkedinIn },
  { label: "Instagram", href: "/", icon: FaInstagram },
];

export default function RequestQuoteContactSection() {
  return (
    <section className="relative overflow-hidden bg-black pb-14 pt-20 text-white sm:pb-20 sm:pt-24 lg:pb-24">
      <div className="absolute inset-x-0 top-0 h-[320px] sm:h-[390px] lg:h-[330px]">
        <Image
          src="/ quote.png"
          alt="Construction site background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* <div className="absolute inset-0 bg-black/55" /> */}
        {/* <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-black" /> */}
      </div>

      <div className="container relative z-10 mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 pt-12 sm:gap-10 sm:pt-14 lg:grid-cols-[0.9fr_1.15fr] lg:items-start lg:gap-14">
          <div className="">
            <div className="max-w-[560px]">
              <h1 className="text-[36px] font-normal leading-tight sm:text-5xl md:text-6xl lg:text-[64px]">
                Ready to Build?
              </h1>
              <p className="mt-3 max-w-[470px] text-sm font-light leading-7 text-[#E6E6E6] sm:mt-4 sm:text-base sm:leading-8 lg:text-lg">
                Let&apos;s discuss your project and create a construction
                solution that fits your goals and budget.
              </p>
            </div>

            <div className="mt-10 max-w-[420px] sm:mt-14 lg:mt-[128px]">
              <h2 className="text-2xl font-semibold leading-tight sm:text-[28px]">
                Get In Touch
              </h2>

              <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F6D8A5] text-[#C88719] sm:h-9 sm:w-9">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-white sm:text-base">
                          {item.label}
                        </span>
                        <span className="block text-sm font-light leading-6 text-[#CFCFCF] sm:text-base">
                          {item.value}
                        </span>
                      </span>
                    </>
                  );

                  return item.href ? (
                    <Link
                      href={item.href}
                      key={item.label}
                      className="flex items-center gap-3 transition hover:text-[#C88719]"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div key={item.label} className="flex items-center gap-3">
                      {content}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-white sm:text-base">
                  Social Media:
                </p>
                <div className="mt-3 flex gap-3">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        aria-label={item.label}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F6D8A5] text-[#C88719] transition hover:bg-[#C88719] hover:text-white sm:h-10 sm:w-10"
                      >
                        <Icon className="h-4 w-4" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pt-8">
            <RequestQuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
