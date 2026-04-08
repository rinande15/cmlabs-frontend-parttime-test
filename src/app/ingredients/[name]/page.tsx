"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function IngredientDetail() {
  const { name } = useParams();
  const [meals, setMeals] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`)
      .then((res) => setMeals(res.data.meals || []))
      .catch((err) => {
        console.error(err);
        setMeals([]);
      })
      .finally(() => setLoading(false));
  }, [name]);

  const filtered = meals.filter((m: any) =>
    m.strMeal.toLowerCase().includes(search.toLowerCase()),
  );
  const [favorite, setFavorite] = useState(false);

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <header className="mb-16 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-6xl font-editorial font-bold text-primary">
                {name}
              </h1>
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
            {filtered.map((meal: any) => {
              const favs = JSON.parse(
                localStorage.getItem("favorites") || "[]",
              );
              const isFavorited = !!favs.find(
                (m: any) => m.idMeal === meal.idMeal,
              );

              return (
                <div key={meal.idMeal} className="group relative">
                  <Link href={`/meals/${meal.idMeal}?ingredient=${name}`}>
                    <div className="group cursor-pointer hover:-translate-y-2 transition-all duration-500">
                      <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-container-low shadow-sm hover:shadow-xl">
                        <img
                          src={meal.strMealThumb}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
                        <div className="absolute bottom-0 left-0 p-4 w-full">
                          <h3 className="text-white text-lg font-semibold">
                            {meal.strMeal}
                          </h3>
                        </div>

                        {/* tombol favorite */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const favs = JSON.parse(
                              localStorage.getItem("favorites") || "[]",
                            );
                            if (
                              !favs.find((m: any) => m.idMeal === meal.idMeal)
                            ) {
                              favs.push(meal);
                            } else {
                              const index = favs.findIndex(
                                (m: any) => m.idMeal === meal.idMeal,
                              );
                              favs.splice(index, 1);
                            }
                            localStorage.setItem(
                              "favorites",
                              JSON.stringify(favs),
                            );
                            setMeals([...meals]); // rerender
                          }}
                          className="absolute top-2 right-2 text-2xl transition-colors group-hover:scale-110"
                        >
                          <span
                            className={`select-none ${
                              isFavorited ? "text-red-500" : "text-red-300/50"
                            }`}
                          >
                            ❤️
                          </span>
                          {/* tooltip */}
                          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap transition-opacity">
                            Favorite
                          </span>
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-primary text-white rounded-xl hover:opacity-80 transition mt-12"
        >
          ⬅ Back
        </button>
      </main>

      <Footer />
    </div>
  );
}
