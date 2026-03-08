"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

export const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navLinks = [
    { name: "Services", href: isHome ? "#services" : "/services" },
    { name: "Work", href: isHome ? "#portfolio" : "/work" },
    { name: "Process", href: isHome ? "#process" : "/#process" },
    { name: "Our Story", href: isHome ? "#story" : "/#story" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center glass-card bg-background/50 backdrop-blur-md border-b">
      <Link href="/" className="text-2xl font-black tracking-tighter">
        SOFOL <span className="text-primary">IT</span>
      </Link>
      <div className="flex items-center gap-4 md:gap-8 text-sm font-medium text-muted-foreground">
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "hover:text-primary transition-colors",
                pathname === link.href && "text-primary font-bold"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <ThemeToggle />
        <Link 
          href="/#contact" 
          className="px-5 py-2 rounded-full border border-input hover:border-primary/50 text-foreground transition-all bg-background/50"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};
