"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const menus = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Portfolio",
    href: "/portfolio",
  },
  {
    title: "FAQ",
    href: "/faq",
  },
  {
    title: "Book Appointment",
    href: "/appointment",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-50 w-full transition-all duration-300",
        isScrolled || isMenuOpen
          ? " bg-black/85 shadow-[0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-5 sm:h-24 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-white"
          onClick={() => setIsMenuOpen(false)}
        >
         <Image src="/logo.png" alt="logo" width={1000} height={1000} className="h-12 w-[72px] object-contain sm:h-14 sm:w-20 md:h-[70px] md:w-[100px]" />
        </Link>

        {/* Menu */}
        <nav className="hidden lg:flex items-center gap-10">
          {menus.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-base text-[#FFFFFF] font-light transition hover:text-[#D89A2A]"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-2 lg:flex">
            <Button
          className="rounded-full text-base text-[#BB7B1D] bg-[#FFFFFF] px-6 h-10 hover:bg-[#FFFFFF]/80"
        >
          Login
        </Button>

        <Button
          className="rounded-full text-base text-white bg-[#BB7B1D] px-6 h-10 hover:bg-[#BB7B1D]/80"
        >
          Request a Quote
        </Button>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((current) => !current)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition hover:border-[#D89A2A] hover:text-[#D89A2A] lg:hidden"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-white/10 bg-black/95 px-5 transition-[grid-template-rows] duration-300 lg:hidden",
          isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 py-4">
            {menus.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-light text-white transition hover:bg-white/10 hover:text-[#D89A2A]"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="grid gap-3 pb-5 sm:grid-cols-2">
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-[#BB7B1D] transition hover:bg-white/80"
            >
              Login
            </Link>
            <Link
              href="/request-quote"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#BB7B1D] px-5 text-sm font-medium text-white transition hover:bg-[#BB7B1D]/80"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
