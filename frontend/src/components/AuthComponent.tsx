"use client";

import type React from "react";

import { useState } from "react";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface AuthFormProps {
    onLogin?: (email: string, password: string) => void;
    onSignup?: (name: string, email: string, password: string) => void;
    isLoading?: boolean;
}

export default function AuthComponent({ onLogin = () => {}, onSignup = () => {}, isLoading = false }: AuthFormProps) {
    // Form states
    const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Validation states
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        return password.length >= 6;
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors
        setErrors({
            name: "",
            email: "",
            password: "",
        });

        // Validate fields
        let isValid = true;

        if (!validateEmail(email)) {
            setErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }));
            isValid = false;
        }

        if (!validatePassword(password)) {
            setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters" }));
            isValid = false;
        }

        if (isValid) {
            onLogin(email, password);
        }
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors
        setErrors({
            name: "",
            email: "",
            password: "",
        });

        // Validate fields
        let isValid = true;

        if (name.trim().length < 2) {
            setErrors((prev) => ({ ...prev, name: "Name must be at least 2 characters" }));
            isValid = false;
        }

        if (!validateEmail(email)) {
            setErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }));
            isValid = false;
        }

        if (!validatePassword(password)) {
            setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters" }));
            isValid = false;
        }

        if (isValid) {
            onSignup(name, email, password);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                    <form onSubmit={handleLogin}>
                        <CardHeader>
                            <CardTitle className="text-2xl">Login</CardTitle>
                            <CardDescription>Enter your credentials to access your account</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 mt-5">
                            <div className="space-y-2">
                                <Label htmlFor="login-email">Email</Label>
                                <Input
                                    id="login-email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={cn(errors.email && "border-destructive")}
                                />
                                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                            </div>
                            <div className="space-y-2 ">
                                <Label htmlFor="login-password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="login-password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={cn(errors.password && "border-destructive")}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        <span className="sr-only">
                                            {showPassword ? "Hide password" : "Show password"}
                                        </span>
                                    </Button>
                                </div>
                                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full mt-5" disabled={isLoading}>
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        <span>Logging in...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <LogIn className="h-4 w-4" />
                                        <span>Login</span>
                                    </div>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </TabsContent>

                <TabsContent value="signup">
                    <form onSubmit={handleSignup}>
                        <CardHeader>
                            <CardTitle className="text-2xl">Create an account</CardTitle>
                            <CardDescription>Enter your information to create an account</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 mt-5">
                            <div className="space-y-2">
                                <Label htmlFor="signup-name">Name</Label>
                                <Input
                                    id="signup-name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={cn(errors.name && "border-destructive")}
                                />
                                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="signup-email">Email</Label>
                                <Input
                                    id="signup-email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={cn(errors.email && "border-destructive")}
                                />
                                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="signup-password">Password</Label>
                                <div className="relative space-y-5">
                                    <Input
                                        id="signup-password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={cn(errors.password && "border-destructive")}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        <span className="sr-only">
                                            {showPassword ? "Hide password" : "Show password"}
                                        </span>
                                    </Button>
                                </div>
                                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        <span>Creating account...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <UserPlus className="h-4 w-4" />
                                        <span>Create Account</span>
                                    </div>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </TabsContent>
            </Tabs>
        </Card>
    );
}
