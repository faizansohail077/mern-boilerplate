"use client";

import { ReactNode, useState } from "react";
import Header from "./Header";
import { toast } from "sonner";
import { useUserStore } from "@/store/user.store";

export default function AppLayoutExample({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { user, update_user } = useUserStore();

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        update_user(null);
        toast.success("Logged out");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header isLoggedIn={isLoggedIn} user={user!} onLogout={handleLogout} />
            <main className="flex min-h-[60vh] items-center justify-center p-4 bg-muted/40">{children}</main>
        </div>
    );
}
