"use client";

import { useState } from "react";
import AuthComponent from "./components/AuthComponent";
import { toast } from "sonner";
import { useUserStore } from "./store/user.store";

export default function AuthPage() {
    const [isLoading, setIsLoading] = useState(false);
    const { update_user } = useUserStore();

    const handleLogin = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            localStorage.setItem("token", data.token);
            update_user(data.user);
            toast.success("Login successful");
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message || "Login failed");
            } else {
                toast.error("Login failed");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async (name: string, email: string, password: string, userType: string = "normal") => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, userType }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            localStorage.setItem("token", data.token);
            update_user(data.user);
            toast.success("Account created");
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message || "Signup failed");
            } else {
                toast.error("Signup failed");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            <AuthComponent onLogin={handleLogin} onSignup={handleSignup} isLoading={isLoading} />
        </div>
    );
}
