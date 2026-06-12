import { ArrowRight, Headphones, RefreshCcw, ShieldCheck, Star, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
    const features = [
        { icon: Truck, title: "Free Shipping", desc: "On all orders over $50, delivered fast." },
        { icon: ShieldCheck, title: "Secure Payments", desc: "Bank-grade encryption for every checkout." },
        { icon: RefreshCcw, title: "Easy Returns", desc: "30 days, no questions asked." },
        { icon: Headphones, title: "24/7 Support", desc: "Real humans, around the clock." },
    ];
    return (
        <div>
            <section className="relative overflow-hidden">
                <div className="hero-blob -left-32 top-0 h-96 w-96 bg-accent/40" />
                <div className="hero-blob right-0 top-32 h-80 w-80 bg-primary/20" />
                <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-16 pb-24 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pt-24 lg:pb-32">
                    <div className="flex flex-col justify-center text-center lg:text-left hero-intro">
                        <div className="mb-5 inline-flex items-center gap-2 self-center rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur lg:self-start">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> New season collection is live
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                            Discover Products
                            <br />
                            You,ll{' '}
                            <span className="relative inline-block text-accent">
                                Love
                                <span className="absolute -bottom-1 left-0 h-1 w-full origin-left rounded-full bg-accent/40 underline-anim" />
                            </span>
                        </h1>
                        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0">
                            Shop the latest trends with fast delivery and easy returns. Curated
                            with care, priced fairly.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                            <Link href="/items" className="inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
                                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                            <Link href="/about" className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium">
                                Learn More
                            </Link>
                        </div>
                        <div className="mt-10 flex items-center justify-center gap-8 lg:justify-start">
                            {[
                                { n: '10k+', l: 'Happy customers' },
                                { n: '4.9★', l: 'Avg. rating' },
                                { n: '48h', l: 'Fast delivery' },
                            ].map((s) => (
                                <div key={s.l}>
                                    <div className="text-2xl font-bold tracking-tight">{s.n}</div>
                                    <div className="text-xs text-muted-foreground">{s.l}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hero visual (server-safe, animations via global CSS) */}
                    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                        <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl float-y">
                            <Image
                                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
                                alt="Curated fashion and lifestyle products"
                                width={500}
                                height={500}
                                className="aspect-4/5 w-full object-cover"
                                loading="eager"
                            />
                            <div className="absolute inset-0 bg-linear-to-tr from-primary/30 via-transparent to-accent/10" />
                        </div>

                        <div className="absolute -bottom-6 -left-4 hidden w-56 rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur sm:block float-small">
                            <div className="flex items-center gap-3">
                                <Image
                                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80"
                                    alt=""
                                    width={500}
                                    height={500}
                                    className="h-12 w-12 rounded-lg object-cover"
                                />
                                <div className="min-w-0">
                                    <div className="truncate text-sm font-semibold">Aurora Headphones</div>
                                    <div className="text-xs text-accent">$189</div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-4 -right-4 hidden rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-xl backdrop-blur sm:block float-small-2">
                            <div className="flex items-center gap-1 text-amber-400">
                                {[...Array(5)].map((_, k) => (
                                    <Star key={k} className="h-3.5 w-3.5 fill-current" />
                                ))}
                            </div>
                            <div className="mt-1 text-xs font-medium">Loved by 10k+</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((f, i) => (
                        <div
                            key={f.title}
                            className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
                        >
                            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                                <f.icon className="h-5 w-5" />
                            </div>
                            <h3 className="text-base font-semibold">{f.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Hero;