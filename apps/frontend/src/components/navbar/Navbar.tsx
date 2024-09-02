"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "../ui/button";
import { ToggleLeft } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const paths = [
    { to: "/", name: "Home" },
    { to: "/features", name: "Features" },
    { to: "/contact", name: "Contact" },
    { to: "/pricing", name: "Pricing" },
  ];

  const path = usePathname();

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 inset-x-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between p-1 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900">
              <Image
                src={"/logo.gif"}
                layout={"responsive"}
                height={130}
                width={130}
                alt={`logo`}
                unoptimized={true}
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {paths.map((p) => (
              <Link
                key={p.to}
                href={p.to}
                className={`${
                  path === p.to
                    ? " font-bold bg-black rounded-full text-white"
                    : "text-gray-900"
                } hover:bg-black hover:rounded-full hover:text-white p-3 transition-all duration-400 ease-in-out`}
              >
                {p.name}
              </Link>
            ))}
          </div>

          {/* Sign In Button */}
          <div className="hidden md:flex items-center space-x-4">
            <ToggleLeft />
            <Link
              href="/sign-in"
              className="text-white font-medium rounded-full w-[130px] bg-blue-500 hover:bg-blue-400 p-3 text-center"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-900 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {paths.map((p) => (
            <Link
              key={p.to}
              href={p.to}
              className={`${
                path === p.to
                  ? " font-bold bg-black rounded-full text-white"
                  : "text-gray-900"
              } hover:bg-black hover:rounded-full hover:text-white p-3 transition-all duration-400 ease-in-out block text-gray-900  px-3 py-2 rounded-md text-base font-medium`}
            >
              {p.name}
            </Link>
          ))}

          <Link
            href="/sign-in"
            className="block  px-3 py-2  text-base font-medium bg-blue-600 rounded-full text-white p-3 transition-all duration-400 ease-in-out"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
