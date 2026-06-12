"use client"

import ProductCard from "@/Components/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Hero from "@/Components/Hero";
import Testimonials from "@/Components/Testimonials";
import Promo from "@/Components/Promo";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/products.json");
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data?.products ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);
  const product = products.slice(0, 4)
  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (

    <div>
      <Hero></Hero>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-accent">Curated picks</p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
              Trending This Week
            </h2>
          </div>
          <Link href="/items" className="hidden px-3 py-2 rounded-xl bg-transparent hover:bg-accent hover:text-accent-foreground sm:inline-flex items-center text-sm font-medium">
            View all
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {product.slice(0, 8).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <div className="mt-10 flex justify-center sm:hidden">
          <Link href="/items" className="px-4 py-2 text-sm underline">
            View all products
          </Link>
        </div>
      </section>
      <Testimonials></Testimonials>
      <Promo></Promo>
    </div>
  );
};

export default Page;