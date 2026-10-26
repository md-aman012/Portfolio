"use client";

import { useState } from "react";
import Link from "next/link";
import { profile } from "@/data/portfolio";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed z-50 left-1/2 -translate-x-1/2 flex items-center justify-between transition-all duration-300"
        style={{
          top: "calc(14px + env(safe-area-inset-top, 0px))",
          width: "min(1100px, calc(100% - 24px))",
          minHeight: "56px",
          padding: "8px 10px 8px 22px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "18px",
          backgroundColor: "rgba(28, 28, 28, 0.55)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
        aria-label="Main navigation"
      >
        {/* Logo / Name */}
        <Link
          href="/"
          className="font-serif italic text-2xl tracking-normal text-[#f2efea] hover:opacity-80 transition-opacity select-none"
        >
          {profile.name}
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-[26px] list-none m-0 p-0 text-[13px] text-[#f2efea]">
          <li>
            <a href="#work" className="text-[#f2efea] hover:opacity-80 transition-opacity">
              Work
            </a>
          </li>
          <li>
            <a href="#about" className="text-[#f2efea] hover:opacity-80 transition-opacity">
              About
            </a>
          </li>
          <li>
            <a href="#skills" className="text-[#f2efea] hover:opacity-80 transition-opacity">
              Content
            </a>
          </li>
          <li>
            <a href="#journey" className="text-[#f2efea] hover:opacity-80 transition-opacity">
              Speaking
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium text-[#f2efea] transition-all duration-200"
              style={{
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "rgba(255, 255, 255, 0.07)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.14)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.22)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.07)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            >
              Let’s talk ↗
            </a>
          </li>
        </ul>

        {/* Mobile menu trigger + CTA */}
        <div className="flex items-center gap-2.5 md:hidden">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[#f2efea] transition-all"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.07)",
            }}
          >
            Let’s talk ↗
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            className="p-1.5 text-[#f2efea] hover:opacity-80 transition-opacity"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed z-40 left-1/2 -translate-x-1/2 md:hidden flex flex-col gap-3 p-4 rounded-2xl"
            style={{
              top: "calc(78px + env(safe-area-inset-top, 0px))",
              width: "min(1100px, calc(100% - 24px))",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backgroundColor: "rgba(20, 20, 20, 0.92)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {[
              { label: "Work", href: "#work" },
              { label: "About", href: "#about" },
              { label: "Content", href: "#skills" },
              { label: "Speaking", href: "#journey" },
              { label: "Resume", href: "#resume" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-base text-[#f2efea] py-2 px-3 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-xs text-[#8a8a8a]">↗</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
