import Image from 'next/image';
import React from 'react';

const About = () => {
    const stats = [
        { value: 10000, suffix: "+", label: "Products" },
        { value: 50000, suffix: "+", label: "Customers" },
        { value: 99, suffix: "%", label: "Satisfaction" },
        { value: 24, suffix: "/7", label: "Support" },
    ];
    const team = [
        { name: "Eli Marsden", role: "Founder & CEO", initials: "EM" },
        { name: "Sana Patel", role: "Head of Product", initials: "SP" },
        { name: "Noor Hassan", role: "Design Lead", initials: "NH" },
    ];
    return (
        <div>
         <section className="relative overflow-hidden border-b border-border">
        <div className="hero-blob -left-20 top-10 h-80 w-80 bg-accent/30" />
        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl fade-up">About ShopZen</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground fade-up-delayed">
            We,re a small team obsessed with finding the well-designed,
            built-to-last goods that quietly improve the way you live.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-accent">Our mission</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Beautifully made, sensibly priced
            </h2>
            <p className="mt-4 text-muted-foreground">
              ShopZen began as a side project between three friends frustrated
              by online shopping that felt either overwhelming or hollow. We
              wanted a quieter store with fewer, better things — the kind of
              shop where every item has a reason for being there.
            </p>
            <p className="mt-4 text-muted-foreground">
              Today we work directly with makers across electronics, clothing,
              home and beyond, picking goods that balance craft, function and
              fair pricing. We test what we sell, we ship it quickly, and we
              take it back if it doesn,t work for you.
            </p>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary">
            <Image
              src="https://placehold.co/600x600/eef2ff/4f46e5?text=ShopZen"
              alt="ShopZen workshop"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-background p-6 text-center"
            >
              <div className="text-3xl font-bold text-accent sm:text-4xl">{s.value}{s.suffix}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-medium text-accent">The team</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">A small, sharp crew</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {team.map((m) => (
            <div
              key={m.name}
              className="rounded-2xl border border-border bg-card p-8 text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-lg font-semibold text-accent">
                {m.initials}
              </div>
              <div className="mt-4 text-base font-semibold">{m.name}</div>
              <div className="text-sm text-muted-foreground">{m.role}</div>
            </div>
          ))}
        </div>
      </section>    
        </div>
    );
};

export default About;