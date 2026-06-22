import React, { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { to: "/", label: "首页" },
  { to: "/practice", label: "练习" },
  { to: "/learn", label: "学习" },
  { to: "/records", label: "记录" },
  { to: "/phrases", label: "短语" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="text-xl font-semibold tracking-tight">
            EnglishApp
          </Link>

          <nav className="hidden md:flex space-x-4">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="text-sm hover:text-teal-700">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-2 space-y-1">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="block py-2" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
