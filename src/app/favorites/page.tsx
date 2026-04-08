"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const favs = localStorage.getItem("favorites");
    if (favs) {
      setFavorites(JSON.parse(favs));
    } else {
      setFavorites([]);
    }

    setLoading(false);
  }, []);

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((m) => m.idMeal !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <h1 className="text-5xl font-editorial font-bold text-primary mb-8">
          Your Favorites
        </h1>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-surface-container-low animate-pulse"
              />
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <p className="text-lg text-on-surface-variant">No favorites yet 😹</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {favorites.map((meal) => (
              <div key={meal.idMeal} className="relative group">
                <Link href={`/meals/${meal.idMeal}?ingredient=`}>
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full aspect-square object-cover rounded-2xl shadow-sm hover:shadow-xl transition-transform group-hover:scale-105"
                  />
                </Link>
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => removeFavorite(meal.idMeal)}
                    className="bg-red-500 text-white px-2 py-1 rounded-full text-sm hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
                <h3 className="mt-2 text-center font-semibold">
                  {meal.strMeal}
                </h3>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
