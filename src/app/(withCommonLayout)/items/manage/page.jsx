"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { Eye, Trash2, Plus, AlertCircle } from 'lucide-react';

const ManageItems = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products on component mount
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
                console.error('Error fetching products:', error);
                toast.error('Failed to load products.');
            } finally {
                if (mounted) setLoading(false);
            }
        }
        fetchProducts();
        return () => {
            mounted = false;
        };
    }, []);

    // Handle product deletion (client-side)
    const handleDelete = (id) => {
        // Filter out the deleted item from the local state
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast.success('Product deleted successfully!');
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-24 text-center">
                <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="mt-4 text-muted-foreground text-sm font-medium">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
            {/* Header section */}
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                        Manage Products
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        View, manage, and delete products in your store catalog.
                    </p>
                </div>
                <div>
                    <Link
                        href="/items/add"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 transition"
                    >
                        <Plus className="h-4 w-4" />
                        Add Product
                    </Link>
                </div>
            </div>

            {products.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-16 text-center">
                    <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold text-foreground">No products found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Your catalog is currently empty. Get started by adding a product.
                    </p>
                    <div className="mt-6">
                        <Link
                            href="/items/add"
                            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                        >
                            Add your first product
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    {/* Desktop View (Table Layout) */}
                    <div className="hidden md:block overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                        <table className="w-full border-collapse text-sm">
                            <thead className="bg-secondary/40 border-b border-border text-muted-foreground text-xs uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-4 text-left">Product</th>
                                    <th className="px-6 py-4 text-left">Category</th>
                                    <th className="px-6 py-4 text-left">Price</th>
                                    <th className="px-6 py-4 text-left">SKU</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-accent/5 transition-colors">
                                        {/* Product image + Title info */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.title}
                                                        fill
                                                        unoptimized
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-foreground">{product.title}</div>
                                                    <div className="text-xs text-muted-foreground truncate max-w-xs">
                                                        {product.shortDescription}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        {/* Category */}
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-foreground border border-border">
                                                {product.category}
                                            </span>
                                        </td>
                                        {/* Price */}
                                        <td className="px-6 py-4 font-medium text-foreground">
                                            ${product.price}
                                        </td>
                                        {/* SKU */}
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {product.sku || 'N/A'}
                                        </td>
                                        {/* Action buttons */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/items/${product.id}`}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-transparent bg-transparent text-destructive hover:bg-destructive/10 transition-colors"
                                                    title="Delete Product"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View (Card Grid Layout) */}
                    <div className="grid gap-4 md:hidden">
                        {products.map((product) => (
                            <div key={product.id} className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="font-semibold text-foreground truncate">{product.title}</h3>
                                            <span className="text-sm font-bold text-foreground shrink-0">${product.price}</span>
                                        </div>
                                        <span className="mt-1 inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-foreground border border-border">
                                            {product.category}
                                        </span>
                                        <p className="mt-2 text-xs text-muted-foreground line-clamp-1">
                                            {product.shortDescription}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex border-t border-border pt-3 gap-2">
                                    <Link
                                        href={`/items/${product.id}`}
                                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary transition"
                                    >
                                        <Eye className="h-3.5 w-3.5" />
                                        View
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="flex-1 cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive hover:text-white transition"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ManageItems;