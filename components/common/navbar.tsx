"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const menus = [
  {
    title: "Home",
    href: "#",
  },
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Services",
    href: "#services",
  },
  {
    title: "Portfolio",
    href: "#portfolio",
  },
  {
    title: "FAQ",
    href: "#faq",
  },
  {
    title: "Book Appointment",
    href: "#appointment",
  },
];

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      <div className="container mx-auto flex h-24 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-white">
         <Image src="/logo.png" alt="logo" width={1000} height={1000} className="h-[70px] w-[100px] object-cover" />
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
        <div className="flex items-center gap-2">
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
      </div>
    </header>
  );
}