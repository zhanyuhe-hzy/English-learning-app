import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} EnglishApp — All rights reserved.
      </div>
    </footer>
  );
}
