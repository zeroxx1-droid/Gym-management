"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Shield, User, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface NavbarProps {
  onOpenTrialModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTrialModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Programs", href: "#programs" },
    { name: "Facilities", href: "#facilities" },
    { name: "Coaches", href: "#coaches" },
    { name: "Pricing", href: "#pricing" },
    { name: "Schedule", href: "#schedule" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-950/95 backdrop-blur-md border-b border-dark-700/80 py-3.5 shadow-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-lime-500 rounded-lg flex items-center justify-center font-black text-black text-xl shadow-neon group-hover:scale-105 transition-transform">
            ■
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-white text-base tracking-widest uppercase">
              BLACK<span className="text-lime-400">SQUARE</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
              Iron & Performance
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold text-zinc-300 hover:text-lime-400 tracking-wider uppercase transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons: Member Portal, Admin, Free Trial */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link href="/member">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<User className="w-3.5 h-3.5 text-lime-400" />}
              className="text-xs"
            >
              Member Pass
            </Button>
          </Link>

          <Link href="/admin">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Shield className="w-3.5 h-3.5 text-lime-400" />}
              className="text-xs"
            >
              Admin OS
            </Button>
          </Link>

          <Button
            variant="lime"
            size="sm"
            onClick={onOpenTrialModal}
            className="text-xs font-bold"
          >
            Free Trial
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-dark-900 transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-lime-400" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-dark-950/95 border-b border-dark-700/80 px-4 pt-4 pb-6 space-y-4 backdrop-blur-xl">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-bold text-zinc-300 hover:text-lime-400 uppercase tracking-wider rounded-lg hover:bg-dark-900"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-dark-800 space-y-2">
            <Link href="/member" className="block w-full">
              <Button variant="secondary" size="sm" className="w-full text-xs">
                Athlete Member Pass
              </Button>
            </Link>
            <Link href="/admin" className="block w-full">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Admin Dashboard Console
              </Button>
            </Link>
            <Button
              variant="lime"
              size="sm"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrialModal();
              }}
              className="w-full text-xs font-bold"
            >
              Book 7-Day Free Trial
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
