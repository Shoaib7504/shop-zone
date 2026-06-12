"use client";

import { LogOut, Menu, ShoppingBag, UserIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const publicLinks = [
  { href: '/', label: 'Home' },
  { href: '/items', label: 'Items' },
  { href: '/about', label: 'About' },
];

const Navbar = () => {
  const { user, logout } = useAuth();

  // Handle logout and close mobile drawer
  const handleLogout = async () => {
    try {
      await logout();
      const toggle = document.getElementById('mobile-menu-toggle');
      if (toggle) {
        toggle.checked = false;
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <input type="checkbox" id="mobile-menu-toggle" className="sr-only" />

      <header className="rounded-2xl sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold tracking-tight">ShopZen</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {publicLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="story-link text-sm font-medium text-foreground/80 hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            {user && (
              <>
                <Link
                  href="/items/add"
                  className="story-link text-sm font-medium text-foreground/80 hover:text-foreground"
                >
                  Add Product
                </Link>
                <Link
                  href="/items/manage"
                  className="story-link text-sm font-medium text-foreground/80 hover:text-foreground"
                >
                  Manage
                </Link>
              </>
            )}
          </nav>

          {/* Desktop auth */}
          <div className="hidden items-center gap-2 md:flex">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="rounded-md px-4 py-1.5 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-foreground transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium truncate max-w-[120px]">
                    {user.displayName || user.email || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-secondary transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger — label toggles the checkbox */}
          <label
            htmlFor="mobile-menu-toggle"
            className="cursor-pointer rounded-md p-2 hover:bg-secondary transition-colors md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </label>
        </div>
      </header>

      {/* Mobile overlay — click closes drawer */}
      <label htmlFor="mobile-menu-toggle" className="mobile-overlay" aria-hidden="true" />

      {/* Mobile drawer */}
      <aside className="mobile-drawer">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-bold">Menu</span>
          <label
            htmlFor="mobile-menu-toggle"
            className="cursor-pointer rounded-md p-1 hover:bg-secondary transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </label>
        </div>

        {publicLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-md px-3 py-2 text-base font-medium hover:bg-secondary transition-colors"
          >
            {l.label}
          </Link>
        ))}

        {user && (
          <>
            <Link
              href="/items/add"
              className="rounded-md px-3 py-2 text-base font-medium hover:bg-secondary transition-colors"
            >
              Add Product
            </Link>
            <Link
              href="/items/manage"
              className="rounded-md px-3 py-2 text-base font-medium hover:bg-secondary transition-colors"
            >
              Manage Products
            </Link>
          </>
        )}

        <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className="rounded-md border border-border px-4 py-2 text-center text-sm font-medium hover:bg-secondary transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 truncate">
                  <div className="truncate text-sm font-medium">
                    {user.displayName || 'User'}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{user.email}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="cursor-pointer flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navbar;