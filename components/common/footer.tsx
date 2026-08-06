import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const quickLinks = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/#about" },
  { title: "Services", href: "/#services" },
  { title: "FAQ", href: "/faq" },
  { title: "Contact", href: "/#contact" },
];

const services = [
  { title: "Residential Construction", href: "/#services" },
  { title: "Commercial Construction", href: "/#services" },
  { title: "Site Preparation", href: "/#services" },
  { title: "Foundations", href: "/#services" },
];

const socialLinks = [
  { label: "Facebook", href: "/", icon: FaFacebookF },
  { label: "LinkedIn", href: "/", icon: FaLinkedinIn },
  { label: "Instagram", href: "/", icon: FaInstagram },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#F8F1E6] text-[#1F1F1F]">
      <div className="container mx-auto px-5 sm:px-8 lg:px-10">

        {/* CTA */}

        <div
          id="appointment"
          className="flex flex-col items-start justify-between gap-6 border-b border-[#E6D7BF] py-10 sm:py-14 md:py-16 lg:flex-row lg:items-center lg:py-20"
        >
          <div>
            <h2 className="max-w-3xl text-[32px] font-normal leading-[1.12] sm:text-[42px] md:text-5xl lg:text-[56px]">
              Ready to Start Your
              <br />
              <span className="font-heading font-medium italic">
                Construction Project?
              </span>
            </h2>
          </div>

          <Link
            href="/request-quote"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#C88719] px-6 text-sm font-medium text-white transition hover:bg-[#B47714] sm:h-14 sm:px-10 sm:text-base"
          >
            Request a Free Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Footer */}

        <div className="grid gap-9 py-10 sm:grid-cols-2 md:py-14 lg:grid-cols-[1.2fr_0.55fr_0.85fr_0.85fr] lg:gap-16">

          {/* Company */}

          <div>
            <Image
              src="/blacklogo.png"
              alt="Logo"
              width={1000}
              height={1000}
              className="h-10 w-auto object-contain sm:h-12"
            />

            <p className="mt-4 max-w-[390px] text-sm leading-7 text-neutral-600 sm:mt-5 sm:text-base sm:leading-8 lg:text-lg">
              A7 Property Solutions is a full-service construction
              company specializing in residential construction,
              commercial projects, site preparation,
              foundations, welding, and fabrication.
            </p>

            <div className="mt-6 flex gap-3 sm:mt-7 sm:gap-4">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    aria-label={item.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EED9B7] text-[#C88719] transition hover:bg-[#C88719] hover:text-white sm:h-10 sm:w-10"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl">
              Quick Links
            </h3>

            <ul className="space-y-3 sm:space-y-4">
              {quickLinks.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-base text-neutral-600 transition hover:text-[#C88719] sm:text-lg"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}

          <div>
            <h3 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl">
              Our Services
            </h3>

            <ul className="space-y-3 sm:space-y-4">
              {services.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-base text-neutral-600 transition hover:text-[#C88719] sm:text-lg"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl">
              Contact
            </h3>

            <ul className="space-y-3 text-base text-neutral-600 sm:space-y-4 sm:text-lg">
              <li>
                <Link href="tel:4055550128" className="transition hover:text-[#C88719]">
                  (214) 670-6720
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:tanya.hill@example.com"
                  className="transition hover:text-[#C88719]"
                >
                  shawn@a7cndc.com
                </Link>
              </li>
              <li>
               1020 Hwy 377 N Ste B #2151
                <br />
               Whitesboro, Texas 76273
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#E6D7BF] py-5 text-center text-xs text-neutral-500 sm:text-sm md:flex-row md:text-left">
          <p>
            © {new Date().getFullYear()} A7 Property Solutions. All rights reserved.
          </p>

          {/* <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <Link href="/">Privacy Policy</Link>
            <span aria-hidden="true">•</span>
            <Link href="/">Terms & Conditions</Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
