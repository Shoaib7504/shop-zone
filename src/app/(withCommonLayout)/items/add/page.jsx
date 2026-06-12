"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, PlusCircle, Tag, Sliders, FileText, Image as ImageIcon, Star, Sparkles } from 'lucide-react';

const categories = ['Electronics', 'Clothing', 'Home', 'Books', 'Sports'];

const categoryClass = {
    Electronics: 'bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800/50',
    Clothing: 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800/50',
    Home: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/50',
    Books: 'bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200 dark:border-rose-800/50',
    Sports: 'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800/50',
};

const AddItems = () => {
    // Initialize React Hook Form for client-side state and validations
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm({
        defaultValues: {
            title: '',
            category: 'Electronics',
            price: '',
            brand: '',
            sku: '',
            weight: '',
            material: '',
            image: '',
            shortDescription: '',
            fullDescription: '',
        },
        mode: 'onTouched', // Triggers validation on touch/blur
    });

    // Watch all fields to render the live preview card in real time
    const watchedValues = watch();

    // Handle form submit strictly on the client side
    const onSubmit = (data) => {
        console.log('Submitted Product Data (Client-side):', data);
        
        // Show success toast notification
        toast.success('Product added successfully!');
        
        // Reset the form fields back to default values
        reset();
    };

    // Pre-determine styles for the category tag
    const selectedCategoryClass = categoryClass[watchedValues.category] ?? 'bg-secondary text-muted-foreground border-border';

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
            {/* Navigation & Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <Link
                        href="/items"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to items
                    </Link>
                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                        Add New Product
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Create and preview your product listing before adding it to the store.
                    </p>
                </div>
            </div>

            {/* Main 2-Column Grid Layout */}
            <div className="grid gap-8 lg:grid-cols-[1.7fr_1.3fr] lg:items-start">
                
                {/* Left Column: Form Card */}
                <div className="rounded-2xl bg-card p-6 sm:p-8 shadow-sm border border-border">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        
                        {/* Section 1: Basic Information */}
                        <div>
                            <h2 className="flex items-center gap-2 text-lg font-bold text-foreground border-b border-border pb-3 mb-4">
                                <Tag className="h-5 w-5 text-accent" />
                                Basic Information
                            </h2>
                            <div className="grid gap-6 sm:grid-cols-2">
                                {/* Title */}
                                <div className="space-y-1.5">
                                    <label htmlFor="title" className="block text-sm font-medium text-foreground">
                                        Product Title
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        placeholder="e.g. Leather Jacket"
                                        className="block w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent transition duration-150"
                                        {...register('title', { required: 'Product title is required' })}
                                    />
                                    {errors.title && (
                                        <p className="text-xs text-destructive">{errors.title.message}</p>
                                    )}
                                </div>

                                {/* Category */}
                                <div className="space-y-1.5">
                                    <label htmlFor="category" className="block text-sm font-medium text-foreground">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        className="block w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent transition duration-150 font-medium"
                                        {...register('category', { required: 'Category is required' })}
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2 mt-6">
                                {/* Price */}
                                <div className="space-y-1.5">
                                    <label htmlFor="price" className="block text-sm font-medium text-foreground">
                                        Price ($ USD)
                                    </label>
                                    <input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        placeholder="99.99"
                                        className="block w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent transition duration-150"
                                        {...register('price', {
                                            required: 'Price is required',
                                            min: { value: 0.01, message: 'Price must be greater than 0' }
                                        })}
                                    />
                                    {errors.price && (
                                        <p className="text-xs text-destructive">{errors.price.message}</p>
                                    )}
                                </div>

                                {/* Brand */}
                                <div className="space-y-1.5">
                                    <label htmlFor="brand" className="block text-sm font-medium text-foreground">
                                        Brand Name
                                    </label>
                                    <input
                                        id="brand"
                                        type="text"
                                        placeholder="e.g. North & Pine"
                                        className="block w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent transition duration-150"
                                        {...register('brand')}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Technical Specifications */}
                        <div>
                            <h2 className="flex items-center gap-2 text-lg font-bold text-foreground border-b border-border pb-3 mb-4">
                                <Sliders className="h-5 w-5 text-accent" />
                                Technical Details
                            </h2>
                            <div className="grid gap-6 sm:grid-cols-3">
                                {/* SKU */}
                                <div className="space-y-1.5">
                                    <label htmlFor="sku" className="block text-sm font-medium text-foreground">
                                        SKU Code
                                    </label>
                                    <input
                                        id="sku"
                                        type="text"
                                        placeholder="NP-JK-901"
                                        className="block w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent transition duration-150"
                                        {...register('sku')}
                                    />
                                </div>

                                {/* Weight */}
                                <div className="space-y-1.5">
                                    <label htmlFor="weight" className="block text-sm font-medium text-foreground">
                                        Weight
                                    </label>
                                    <input
                                        id="weight"
                                        type="text"
                                        placeholder="e.g. 850g"
                                        className="block w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent transition duration-150"
                                        {...register('weight')}
                                    />
                                </div>

                                {/* Material */}
                                <div className="space-y-1.5">
                                    <label htmlFor="material" className="block text-sm font-medium text-foreground">
                                        Material
                                    </label>
                                    <input
                                        id="material"
                                        type="text"
                                        placeholder="e.g. Cotton"
                                        className="block w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent transition duration-150"
                                        {...register('material')}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Media & Descriptions */}
                        <div>
                            <h2 className="flex items-center gap-2 text-lg font-bold text-foreground border-b border-border pb-3 mb-4">
                                <FileText className="h-5 w-5 text-accent" />
                                Media & Description
                            </h2>
                            <div className="space-y-6">
                                {/* Image URL */}
                                <div className="space-y-1.5">
                                    <label htmlFor="image" className="block flex items-center gap-1.5 text-sm font-medium text-foreground">
                                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                                        Product Image URL (Optional)
                                    </label>
                                    <input
                                        id="image"
                                        type="url"
                                        placeholder="https://images.unsplash.com/photo-..."
                                        className="block w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent transition duration-150"
                                        {...register('image')}
                                    />
                                </div>

                                {/* Short Description */}
                                <div className="space-y-1.5">
                                    <label htmlFor="shortDescription" className="block text-sm font-medium text-foreground">
                                        Short Description / Tagline
                                    </label>
                                    <input
                                        id="shortDescription"
                                        type="text"
                                        placeholder="A brief tagline summarizing the product..."
                                        className="block w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent transition duration-150"
                                        {...register('shortDescription', { required: 'Short description is required' })}
                                    />
                                    {errors.shortDescription && (
                                        <p className="text-xs text-destructive">{errors.shortDescription.message}</p>
                                    )}
                                </div>

                                {/* Full Description */}
                                <div className="space-y-1.5">
                                    <label htmlFor="fullDescription" className="block text-sm font-medium text-foreground">
                                        Full Description
                                    </label>
                                    <textarea
                                        id="fullDescription"
                                        rows={4}
                                        placeholder="Describe your product's key details and features..."
                                        className="block w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent transition duration-150"
                                        {...register('fullDescription', { required: 'Full description is required' })}
                                    />
                                    {errors.fullDescription && (
                                        <p className="text-xs text-destructive">{errors.fullDescription.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full cursor-pointer inline-flex justify-center items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md hover:opacity-95 hover:shadow-lg active:scale-[0.99] transition duration-150"
                            >
                                <PlusCircle className="h-4.5 w-4.5" />
                                Create Catalog Item
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Column: Sticky Real-time Card Preview */}
                <div className="lg:sticky lg:top-24">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-wider">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-duration-1000"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            Live Card Preview
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Sparkles className="h-3 w-3 text-amber-500" />
                            Updates in real time
                        </span>
                    </div>

                    {/* Preview Card Mockup */}
                    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md max-w-sm mx-auto lg:mx-0">
                        {/* Image wrapper */}
                        <div className="relative aspect-4/3 overflow-hidden bg-secondary">
                            {watchedValues.image ? (
                                <Image
                                    src={watchedValues.image}
                                    alt="Preview Image"
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-secondary/85">
                                    <ImageIcon className="h-10 w-10 text-muted/50 stroke-[1.2]" />
                                    <span className="mt-2 text-xs font-semibold">No Image Provided</span>
                                </div>
                            )}
                        </div>

                        {/* Card Content details */}
                        <div className="flex flex-col gap-3 p-5">
                            <div className="flex items-center justify-between">
                                <div className={`rounded-full px-3 py-1 text-xs font-semibold border ${selectedCategoryClass}`}>
                                    {watchedValues.category || 'Electronics'}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                    <span className="font-semibold text-foreground">4.5</span>
                                    <span>(0)</span>
                                </div>
                            </div>

                            <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground">
                                {watchedValues.title || 'Product Title Preview'}
                            </h3>
                            
                            <p className="line-clamp-2 text-sm text-muted-foreground min-h-[40px]">
                                {watchedValues.shortDescription || 'A brief tagline summarizing the item details and features will render here.'}
                            </p>

                            <div className="mt-2 flex items-center justify-between pt-2 border-t border-border/60">
                                <span className="text-lg font-extrabold text-foreground">
                                    ${watchedValues.price ? Number(watchedValues.price).toFixed(2) : '0.00'}
                                </span>
                                <div className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold bg-transparent border border-border text-foreground hover:bg-secondary transition-colors">
                                    View Details
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AddItems;