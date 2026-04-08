"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getIngredients } from "@/lib/api";
import Link from "next/link";

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getIngredients();
        setIngredients(res || []);
      } catch (err) {
        console.error("fetch error:", err);
        setIngredients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = (ingredients || []).filter((item) =>
    item.strIngredient.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <header className="mb-16 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-6xl font-editorial font-bold text-primary">
                Ingredients
              </h1>
              <p className="text-on-surface-variant text-lg mt-4 max-w-lg leading-relaxed">
                Curate your pantry from our garden of world-class ingredients.
                Discover fresh flavors to elevate your next culinary
                masterpiece.
              </p>
            </div>

            <div className="w-full md:w-96">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by name..."
                className="w-full pl-6 pr-8 py-5 bg-surface-container-high rounded-full outline-none"
              />
            </div>
          </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-surface-container-low animate-pulse blur-[1px]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {filtered.map((ingredient: any) => (
              <Link
                href={`/ingredients/${ingredient.strIngredient}`}
                key={ingredient.idIngredient}
              >
                <div className="group cursor-pointer hover:-translate-y-2 transition-all duration-500">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-container-low shadow-sm hover:shadow-xl">
                    <img
                      src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}
                      alt={ingredient.strIngredient}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />

                    <div className="absolute bottom-0 left-0 p-4 w-full">
                      <h3 className="text-white text-lg font-semibold">
                        {ingredient.strIngredient}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
