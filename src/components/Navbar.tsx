"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Ingredients", href: "/" },
    // { name: "Meals", href: "/meals" },
    { name: "Favorites", href: "/favorites" },
  ];

  return (
    <nav className="bg-[#f9f9f8]/70 dark:bg-stone-900/70 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold font-['Playfair_Display'] text-[#0d631b]">
          MealMaster
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-bold pb-1 ${
                pathname === link.href
                  ? "text-[#0d631b] border-b-2 border-[#0d631b]"
                  : "text-stone-500 hover:text-[#0d631b] border-b-2 border-transparent"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
