import Link from "next/link";
import Image from "next/image";
// import { Facebook, Instagram, Linkedin, ArrowRight } from "lucide-react";

const quickLinks = [
  "Home",
  "About Us",
  "Services",
  "FAQ",
  "Contact",
];

const services = [
  "Residential Construction",
  "Commercial Construction",
  "Site Preparation",
  "Foundations",
];

export default function Footer() {
  return (
    <footer className="bg-[#F8F1E6] text-[#1F1F1F]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* CTA */}

        <div className="flex flex-col items-start justify-between gap-8 border-b border-[#E6D7BF] py-14 lg:flex-row lg:items-center">
          <div>
            <h2 className="max-w-2xl text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
              Ready to Start Your
              <br />
              <span className="font-serif italic">
                Construction Project?
              </span>
            </h2>
          </div>

          <Link
            href="/contact"
            className="inline-flex h-14 items-center rounded-full bg-[#C88719] px-8 text-white transition hover:bg-[#B47714]"
          >
            Request a Free Quote
            {/* <ArrowRight className="ml-2 h-4 w-4" /> */}
          </Link>
        </div>

        {/* Footer */}

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">

          {/* Company */}

          <div>
            <Image
              src="/logo.svg"
              alt="Logo"
              width={60}
              height={60}
            />

            <p className="mt-6 leading-8 text-neutral-600">
              A7 Property Solutions is a full-service construction
              company specializing in residential construction,
              commercial projects, site preparation,
              foundations, welding, and fabrication.
            </p>

            {/* <div className="mt-8 flex gap-3">
              {[Facebook, Linkedin, Instagram].map((Icon, i) => (
                <Link
                  href="/"
                  key={i}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EED9B7] text-[#C88719] transition hover:bg-[#C88719] hover:text-white"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div> */}
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="mb-6 text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="text-neutral-600 transition hover:text-[#C88719]"
                  >
                    {item}
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
                <li key={item}>
                  <Link
                    href="/"
                    className="text-neutral-600 transition hover:text-[#C88719]"
                  >
                    {item}
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

            <ul className="space-y-4 text-neutral-600">
              <li>(405) 555-0128</li>
              <li>tanya.hill@example.com</li>
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
            © {new Date().getFullYear()} All Rights Reserved.
          </p>

          <div className="flex gap-6">
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}