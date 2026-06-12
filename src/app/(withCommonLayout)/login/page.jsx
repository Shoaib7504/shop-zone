"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff } from 'lucide-react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    // Initialize React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLogin = async (data) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            toast.success("Logged in successfully!");
            router.push('/');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            toast.success("Successfully logged in with Google!");
            router.push('/');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="mx-auto max-w-md px-4 py-8 animate-fade-in">
            <div className="rounded-2xl bg-card p-8 shadow-sm border border-border">
                <h1 className="text-2xl font-bold">Sign in to your account</h1>
                <p className="mt-2 text-sm text-muted-foreground">Welcome back — enter your details to continue to ShopZen.</p>

                <form onSubmit={handleSubmit(handleLogin)} className="mt-6 space-y-4">
                    {/* Email Field */}
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="mt-1 block w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            suppressHydrationWarning
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: 'Enter a valid email address',
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-xs text-destructive">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-foreground">Password</label>
                            <a href="#" className="text-xs text-muted-foreground hover:text-accent">Forgot password?</a>
                        </div>
                        <div className="relative mt-1">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                className="block w-full rounded-md border bg-transparent pl-3 pr-10 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
                                suppressHydrationWarning
                                {...register('password', {
                                    required: 'Password is required',
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-xs text-destructive">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-95 disabled:opacity-60 transition"
                        disabled={loading}
                    >
                        {loading && <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-white align-middle" />}
                        Sign in
                    </button>
                </form>

                <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="h-px flex-1 bg-border" />
                    <div className="uppercase">or</div>
                    <div className="h-px flex-1 bg-border" />
                </div>

                {/* Google Sign-in */}
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full cursor-pointer rounded-md border border-border bg-transparent px-4 py-2 text-sm font-medium hover:bg-secondary disabled:opacity-60 transition"
                >
                    <span className="inline-block mr-2"><FcGoogle className="h-4 w-4 inline-block" /></span>
                    Sign in with Google
                </button>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-medium text-accent hover:underline">Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;