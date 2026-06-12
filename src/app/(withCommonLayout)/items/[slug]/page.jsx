"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowLeft, ShoppingCart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { toast } from 'react-toastify';

const categoryClass = {
    Electronics: 'bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800/50',
    Clothing: 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800/50',
    Home: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/50',
    Books: 'bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200 dark:border-rose-800/50',
    Sports: 'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800/50',
};

const ProductDetails = ({ params }) => {
    // Unwrap the params promise using React's use() hook
    const { slug } = use(params);
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch the matched product on client mount
    useEffect(() => {
        let mounted = true;
        async function fetchProduct() {
            try {
                const res = await fetch('/products.json');
                if (!res.ok) throw new Error('Failed to fetch product data');
                const products = await res.json();
                if (!mounted) return;
                const matched = products.find((p) => p.id === slug);
                setProduct(matched);
            } catch (err) {
                console.error(err);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        fetchProduct();
        return () => {
            mounted = false;
        };
    }, [slug]);

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-24 text-center">
                <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="mt-4 text-muted-foreground text-sm font-medium">Loading product details...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-24 text-center">
                <h2 className="text-3xl font-bold">Product Not Found</h2>
                <p className="mt-4 text-muted-foreground">We couldn't find a product with the ID "{slug}".</p>
                <div className="mt-8">
                    <Link href="/items" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
                        <ArrowLeft className="h-4 w-4" />
                        Back to items
                    </Link>
                </div>
            </div>
        );
    }

    const categoryTagColor = categoryClass[product.category] ?? 'bg-secondary text-muted-foreground border-border';

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Breadcrumbs trail */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                <span>/</span>
                <Link href="/items" className="hover:text-foreground transition-colors">Items</Link>
                <span>/</span>
                <span className="text-foreground truncate max-w-xs">{product.title}</span>
            </nav>

            {/* 2-Column Grid Details */}
            <div className="grid gap-10 lg:grid-cols-2">
                
                {/* Left Column: Image wrapper */}
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill 
                        unoptimized 
                        priority 
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                </div>

                {/* Right Column: Spec content & actions */}
                <div className="flex flex-col justify-between">
                    <div>
                        {/* Category badge & star rating */}
                        <div className="flex items-center justify-between gap-4 mb-4">
                            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${categoryTagColor}`}>
                                {product.category}
                            </span>
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((starNum) => {
                                        const isFilled = starNum <= Math.floor(product.rating || 0);
                                        return (
                                            <Star
                                                key={starNum}
                                                className={`h-4 w-4 ${
                                                    isFilled ? 'fill-amber-400 text-amber-400' : 'text-muted/40'
                                                }`}
                                            />
                                        );
                                    })}
                                </div>
                                <span className="font-semibold text-foreground">{product.rating?.toFixed(1)}</span>
                                <span>({product.reviewCount} reviews)</span>
                            </div>
                        </div>

                        {/* Title and Brand */}
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                            {product.title}
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Brand: <span className="font-semibold text-foreground">{product.brand}</span>
                        </p>

                        {/* Price */}
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-foreground">
                                ${product.price}
                            </span>
                            <span className="text-xs text-muted-foreground">USD (plus local taxes)</span>
                        </div>

                        {/* Short Description */}
                        <p className="mt-6 text-base text-muted-foreground leading-relaxed font-normal">
                            {product.shortDescription}
                        </p>

                        {/* Specs grid */}
                        <div className="mt-8 border-t border-b border-border py-6">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                                Product Specifications
                            </h3>
                            <dl className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
                                {product.sku && (
                                    <div>
                                        <dt className="text-xs text-muted-foreground font-medium">SKU</dt>
                                        <dd className="mt-1 text-sm font-semibold text-foreground">{product.sku}</dd>
                                    </div>
                                )}
                                {product.weight && (
                                    <div>
                                        <dt className="text-xs text-muted-foreground font-medium">Weight</dt>
                                        <dd className="mt-1 text-sm font-semibold text-foreground">{product.weight}</dd>
                                    </div>
                                )}
                                {product.material && (
                                    <div className="col-span-2 sm:col-span-1">
                                        <dt className="text-xs text-muted-foreground font-medium">Material</dt>
                                        <dd className="mt-1 text-sm font-semibold text-foreground truncate">{product.material}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>

                    {/* CTA Buttons & Trust Assurances */}
                    <div className="mt-8">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => toast.success(`"${product.title}" added to cart!`)}
                                className="flex-1 cursor-pointer inline-flex justify-center items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 active:scale-[0.98] transition"
                            >
                                <ShoppingCart className="h-4 w-4" />
                                Add to cart
                            </button>
                            <button
                                onClick={() => toast.success(`Proceeding to checkout for "${product.title}"!`)}
                                className="flex-1 cursor-pointer inline-flex justify-center items-center gap-2 rounded-xl bg-secondary px-6 py-3.5 text-sm font-semibold text-foreground border border-border hover:bg-accent/10 active:scale-[0.98] transition"
                            >
                                Buy now
                            </button>
                        </div>

                        {/* Trust Assurances Icons */}
                        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-6 text-center text-xs text-muted-foreground">
                            <div className="flex flex-col items-center gap-1">
                                <Truck className="h-5 w-5 text-accent" />
                                <span className="font-medium">Free Shipping</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <RotateCcw className="h-5 w-5 text-accent" />
                                <span className="font-medium">30-Day Return</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <ShieldCheck className="h-5 w-5 text-accent" />
                                <span className="font-medium">Secure Payment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Full long description split by paragraphs */}
            {product.fullDescription && (
                <section className="mt-16 border-t border-border pt-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                        Product Overview
                    </h2>
                    <div className="prose max-w-none">
                        {product.fullDescription.split('\n\n').map((paragraph, index) => {
                            return (
                                <p key={index} className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line text-base font-normal">
                                    {paragraph}
                                </p>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductDetails;