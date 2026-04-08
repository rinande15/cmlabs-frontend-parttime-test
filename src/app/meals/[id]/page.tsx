"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MealDetail() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const ingredient = searchParams.get("ingredient");

  const [meal, setMeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => setMeal(res.data.meals[0] || null))
      .catch((err) => {
        console.error(err);
        setMeal(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const steps = meal?.strInstructions
    ?.split(/\r?\n|\./)
    .map((s: string) => s.trim())
    .filter((s: string) => s.length > 0);

  if (loading)
    return (
      <div className="bg-surface min-h-screen flex flex-col">
        <Navbar />
        <main className="max-w-5xl mx-auto px-6 pt-12 pb-24">
          <div className="h-8 w-64 bg-surface-container-low animate-pulse mb-6 rounded" />
          <div className="w-full h-80 bg-surface-container-low animate-pulse rounded mb-6" />
          <div className="h-6 w-40 bg-surface-container-low animate-pulse mb-4 rounded" />
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-4 w-full bg-surface-container-low animate-pulse mb-2 rounded"
            />
          ))}
          <div className="h-10 w-32 bg-surface-container-low animate-pulse mt-6 rounded" />
        </main>
        <Footer />
      </div>
    );

  if (!meal) return <p className="text-center mt-20">Meal not found 😹</p>;

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-12 pb-24">
        <h1 className="text-5xl font-editorial font-bold text-primary mb-8">
          {meal.strMeal}
        </h1>

        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full rounded-2xl mb-10 shadow-md"
        />

        <h2 className="text-3xl font-bold mb-4">Instructions</h2>
        <ul className="mb-10 list-disc pl-6 space-y-2">
          {steps?.map((step: string, i: number) => (
            <li key={i}>{step}</li>
          ))}
        </ul>

        {meal.strYoutube && (
          <>
            <h2 className="text-3xl font-bold mb-4">Video Tutorial</h2>
            <iframe
              className="w-full h-[400px] rounded-xl mb-10"
              src={meal.strYoutube.replace("watch?v=", "embed/")}
              allowFullScreen
            />
          </>
        )}

        <button
          onClick={() => router.push(`/ingredients/${ingredient}`)}
          className="px-6 py-3 bg-primary text-white rounded-xl hover:opacity-80 transition"
        >
          ⬅ Back
        </button>
      </main>

      <Footer />
    </div>
  );
}
