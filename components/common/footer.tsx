import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

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
  { label: "Facebook", href: "/", text: "f" },
  { label: "LinkedIn", href: "/", text: "in" },
  { label: "Instagram", href: "/", text: "ig" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#F8F1E6] text-[#1F1F1F]">
      <div className="container mx-auto px-5 sm:px-8 lg:px-10">

        {/* CTA */}

        <div
          id="appointment"
          className="flex flex-col items-start justify-between gap-8 border-b border-[#E6D7BF] py-14 md:py-20 lg:flex-row lg:items-center"
        >
          <div>
            <h2 className="max-w-3xl text-[40px] font-normal leading-[1.1] sm:text-5xl lg:text-[56px]">
              Ready to Start Your
              <br />
              <span className="font-heading font-medium italic">
                Construction Project?
              </span>
            </h2>
          </div>

          <Link
            href="/#contact"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#C88719] px-8 text-base font-medium text-white transition hover:bg-[#B47714] sm:px-10"
          >
            Request a Free Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Footer */}

        <div className="grid gap-10 py-12 sm:grid-cols-2 md:py-14 lg:grid-cols-[1.2fr_0.55fr_0.85fr_0.85fr] lg:gap-16">

          {/* Company */}

          <div>
            <Image
              src="/blacklogo.png"
              alt="Logo"
              width={1000}
              height={1000}
              className="h-12 w-auto object-contain"
            />

            <p className="mt-5 max-w-[390px] text-base leading-8 text-neutral-600 sm:text-lg">
              A7 Property Solutions is a full-service construction
              company specializing in residential construction,
              commercial projects, site preparation,
              foundations, welding, and fabrication.
            </p>

            <div className="mt-7 flex gap-4">
              {socialLinks.map((item) => (
                <Link
                  href={item.href}
                  key={item.label}
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EED9B7] text-lg font-semibold lowercase text-[#C88719] transition hover:bg-[#C88719] hover:text-white"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="mb-6 text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-lg text-neutral-600 transition hover:text-[#C88719]"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}

          <div>
            <h3 className="mb-6 text-xl font-semibold">
              Our Services
            </h3>

            <ul className="space-y-4">
              {services.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-lg text-neutral-600 transition hover:text-[#C88719]"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="mb-6 text-xl font-semibold">
              Contact
            </h3>

            <ul className="space-y-4 text-lg text-neutral-600">
              <li>
                <Link href="tel:4055550128" className="transition hover:text-[#C88719]">
                  (405) 555-0128
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:tanya.hill@example.com"
                  className="transition hover:text-[#C88719]"
                >
                  tanya.hill@example.com
                </Link>
              </li>
              <li>
                3891 Ranchview Dr.
                <br />
                Richardson, California 62639
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#E6D7BF] py-6 text-sm text-neutral-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} A7 Property Solutions. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <Link href="/">Privacy Policy</Link>
            <span aria-hidden="true">•</span>
            <Link href="/">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
