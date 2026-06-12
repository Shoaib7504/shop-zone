"use client"
import ProductCard from '@/Components/ProductCard';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

const priceRanges = [
  { value: 'all', label: 'All prices' },
  { value: 'lt50', label: 'Under $50' },
  { value: '50-100', label: '$50 - $100' },
  { value: '100-150', label: '$100 - $150' },
  { value: 'gt150', label: 'Over $150' },
];

export default function Items() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // filter/sort state
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [price, setPrice] = useState('all');
  const [sort, setSort] = useState('');

  useEffect(() => {
    let mounted = true;
    async function fetchProducts() {
      try {
        const res = await fetch('/products.json');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        if (!mounted) return;
        setProducts(Array.isArray(data) ? data : data?.products ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchProducts();
    return () => { mounted = false };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    let out = products.slice();

    // search
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      out = out.filter(p => (
        p.title?.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q) ||
        p.fullDescription?.toLowerCase().includes(q)
      ));
    }

    // category
    if (category !== 'all') out = out.filter(p => p.category === category);

    // price ranges
    if (price === 'lt50') out = out.filter(p => Number(p.price) < 50);
    if (price === '50-100') out = out.filter(p => Number(p.price) >= 50 && Number(p.price) <= 100);
    if (price === '100-150') out = out.filter(p => Number(p.price) > 100 && Number(p.price) <= 150);
    if (price === 'gt150') out = out.filter(p => Number(p.price) > 150);

    // sort
    if (sort === 'price-asc') out.sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') out.sort((a,b) => b.price - a.price);
    if (sort === 'rating') out.sort((a,b) => (b.rating||0) - (a.rating||0));

    return out;
  }, [products, search, category, price, sort]);

  function resetFilters() {
    setSearch(''); setCategory('all'); setPrice('all'); setSort('');
  }

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">All items</h1>
            <p className="mt-1 text-sm text-muted-foreground">Showing {filtered.length} product{filtered.length === 1 ? '' : 's'}</p>
          </div>
          <div className="mt-3 sm:mt-0">
            <button
              onClick={resetFilters}
              type="button"
              className="inline-flex items-center cursor-pointer gap-2 px-3 py-1.5 rounded-md text-sm font-medium border border-border bg-transparent hover:bg-accent/10 hover:text-accent-foreground transition"
            >
              Reset filters
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-3 lg:grid-cols-[1fr_auto_auto_auto] lg:items-center">
          <div className="relative">
            <input
              aria-label="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-md border px-3 py-2 pl-9"
            />
          </div>

          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-md border px-3 py-2">
            {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All categories' : c}</option>)}
          </select>

          <select value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-md border px-3 py-2">
            {priceRanges.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full rounded-md border px-3 py-2">
            <option value="">Sort by</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="mt-10">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-16 text-center">
              <h3 className="text-lg font-semibold">No results found</h3>
              <p className="mt-1 text-sm text-muted-foreground">Try a different search or filter.</p>
              <div className="mt-6">
                <Link href="/items" className="text-sm underline">Reset filters</Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
