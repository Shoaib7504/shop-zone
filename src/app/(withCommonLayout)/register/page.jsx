"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff } from 'lucide-react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    // Initialize React Hook Form
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    // Form submission handler
    const handleRegister = async (data) => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password);
            toast.success("Account created successfully!");
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
            toast.success("Account registered with Google successfully!");
            router.push('/');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const passwordVal = watch('password');

    return (
        <div className="mx-auto max-w-md px-4 py-8 animate-fade-in">
            <div className="rounded-2xl bg-card p-8 shadow-sm border border-border">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="mt-2 text-sm text-muted-foreground">Join ShopZen — enter your details to get started.</p>

                <form onSubmit={handleSubmit(handleRegister)} className="mt-6 space-y-4">
                    {/* Name Field */}
                    <div className="space-y-1.5">
                        <label htmlFor="name" className="block text-sm font-medium text-foreground">Full name</label>
                        <input
                            id="name"
                            placeholder="Your name"
                            className="mt-1 block w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            {...register('name', {
                                required: 'Name is required',
                            })}
                        />
                        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                    </div>

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
                        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                        <label htmlFor="password" className="block text-sm font-medium text-foreground">Password</label>
                        <div className="relative mt-1">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Create a password"
                                className="block w-full rounded-md border bg-transparent pl-3 pr-10 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                    validate: {
                                        hasUppercase: (value) => 
                                            /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
                                        hasSymbol: (value) => 
                                            /[^A-Za-z0-9]/.test(value) || 'Password must contain at least one special character/symbol',
                                    }
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
                        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-1.5">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">Confirm password</label>
                        <div className="relative mt-1">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Repeat your password"
                                className="block w-full rounded-md border bg-transparent pl-3 pr-10 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
                                {...register('confirmPassword', {
                                    required: 'Confirm password is required',
                                    validate: (value) => 
                                        value === passwordVal || "Passwords don't match",
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
                                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                            >
                                {showConfirmPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-95 disabled:opacity-60 transition"
                        disabled={loading}
                    >
                        {loading && <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-white align-middle" />}
                        Create account
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
                    Continue with Google
                </button>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-accent hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;