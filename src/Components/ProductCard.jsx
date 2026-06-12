"use client"

import Link from 'next/link';
import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const categoryClass = {
  Electronics: 'bg-blue-50 text-blue-800',
  Clothing: 'bg-green-50 text-green-800',
  Home: 'bg-yellow-50 text-yellow-800',
  Books: 'bg-rose-50 text-rose-800',
  Sports: 'bg-amber-50 text-amber-800',
};

const ProductCard = ({ product, index = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.04 }}
      whileHover={{ y: -4 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
    >
      <Link href={`/items/${product.id}`} className="block overflow-hidden">
        <div className="relative aspect-4/3 overflow-hidden bg-secondary">
          <Image
            src={product.image}
            alt={product.title}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <div className={`rounded-full px-3 py-1 text-xs font-medium ${categoryClass[product.category] ?? 'bg-secondary text-muted-foreground'}`}>
            {product.category}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium text-foreground">{product.rating?.toFixed(1)}</span>
            <span>({product.reviewCount})</span>
          </div>
        </div>
        <h3 className="line-clamp-2 text-base font-semibold leading-snug">{product.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold">${product.price}</span>
          <Link
            href={`/items/${product.id}`}
            className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-transparent border border-transparent hover:bg-accent hover:text-accent-foreground transition"
            aria-label={`View details for ${product.title}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;