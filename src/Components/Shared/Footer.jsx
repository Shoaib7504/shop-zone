import Link from 'next/link'
import React from 'react'
import { ShoppingBag, Globe, Mail, Phone } from 'lucide-react'

const Footer = () => {
  return (
    <div>
      <footer className="border-t border-border bg-secondary/40 rounded-xl">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold">ShopZen</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Thoughtfully curated goods. Fast shipping, easy returns, and zero
              fuss.
            </p>
            <div className="mt-5 flex gap-3">
              
              {[Globe, Mail, Phone].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="rounded-md p-2 text-muted-foreground transition hover:bg-background hover:text-accent"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground">Home</Link></li>
              <li><Link href="/items" className="hover:text-foreground">Shop</Link></li>
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
              <li><Link href="/login" className="hover:text-foreground">Sign In</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Categories</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Electronics</a></li>
              <li><a href="#" className="hover:text-foreground">Clothing</a></li>
              <li><a href="#" className="hover:text-foreground">Home</a></li>
              <li><a href="#" className="hover:text-foreground">Books</a></li>
              <li><a href="#" className="hover:text-foreground">Sports</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>hello@shopzen.example</li>
              <li>+1 (555) 010-9090</li>
              <li>221B Baker St, London</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
            <p>© {new Date().getFullYear()} ShopZen. All rights reserved.</p>
            <p>Built with React, TanStack Start &amp; Firebase</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer