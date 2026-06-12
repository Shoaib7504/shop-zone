"use client"
"use client"
import { Star } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};
const Testimonials = () => {
    const testimonials = [
  { name: "Maya Chen", role: "Designer, NYC", quote: "Beautifully curated and shipping is unreal. My go-to.", initials: "MC" },
  { name: "Jordan Lee", role: "Engineer, Berlin", quote: "Everything I've bought has felt thoughtfully made.", initials: "JL" },
  { name: "Priya Shah", role: "Photographer, Mumbai", quote: "The packaging alone makes opening boxes a ritual.", initials: "PS" },
];
    return (
        <div>
             <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-medium text-accent">Loved by thousands</p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
              What our customers say
            </h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <div className="mb-3 flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-foreground/90">{t.quote}</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
        </div>
    );
};

export default Testimonials;