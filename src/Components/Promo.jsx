import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Promo = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground sm:p-16 fade-up">
        <div className="hero-blob right-0 top-0 h-72 w-72 bg-accent/60" />
        <div className="relative max-w-2xl">
          <p className="text-sm font-medium text-accent/90">Limited time</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Summer Sale — Up to 50% Off Selected Items
          </h2>
          <p className="mt-3 text-primary-foreground/70">
            Refresh your essentials with hand-picked deals across every category. Free shipping included.
          </p>
          <div className="mt-7">
            <Link href="/items" className="inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
              Shop the Sale <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promo;