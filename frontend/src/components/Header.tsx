"use client";

import { useState } from "react";
import { Bell, LogOut, Menu, Moon, Settings, Sun, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTheme } from "next-themes";

interface HeaderProps {
    isLoggedIn?: boolean;
    user?: {
        name: string;
        email: string;
        image?: string;
    };
    onLogout?: () => void;
}

export default function Header({
    isLoggedIn = false,
    user = { name: "", email: "" },
    onLogout = () => {},
}: HeaderProps) {
    const { theme, setTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const getInitials = (name: string) => {
        return name
            ?.split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    isLoggedIn = user ? true : false;
    return (
        <header className="max-w-7xl mx-auto sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold">T</span>
                    </div>
                    <span className="font-bold text-xl hidden sm:inline-block">TaskApp</span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="cursor-not-allowed text-sm font-medium transition-colors hover:text-primary"
                        >
                            {link.name}
                        </div>
                    ))}
                </nav>

                {/* Desktop Auth/User Section */}
                <div className="hidden md:flex items-center gap-4">
                    {isLoggedIn ? (
                        <>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
                                <span className="sr-only">Notifications</span>
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={onLogout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Button>Authenticate</Button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[80%] sm:w-[350px]">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between border-b pb-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                                        <span className="text-primary-foreground font-bold">T</span>
                                    </div>
                                    <span className="font-bold text-xl">TaskApp</span>
                                </div>
                                <SheetClose asChild>
                                    <Button variant="ghost" size="icon">
                                        <X className="h-5 w-5" />
                                        <span className="sr-only">Close menu</span>
                                    </Button>
                                </SheetClose>
                            </div>

                            {/* Mobile User Info */}
                            {isLoggedIn && (
                                <div className="flex items-center gap-4 py-4 border-b">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={user.image} alt={user.name} />
                                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{user.name}</span>
                                        <span className="text-sm text-muted-foreground">{user.email}</span>
                                    </div>
                                </div>
                            )}

                            {/* Mobile Navigation */}
                            <nav className="flex flex-col gap-1 py-4">
                                {navLinks.map((link) => (
                                    <SheetClose asChild key={link.name}>
                                        <div className="flex items-center py-2 px-3 text-sm rounded-md hover:bg-muted">
                                            {link.name}
                                        </div>
                                    </SheetClose>
                                ))}
                            </nav>

                            {/* Mobile Theme Toggle */}
                            <div className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-muted">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="p-0 h-auto"
                                >
                                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                </Button>
                                <span className="text-sm">{theme === "dark" ? "Light" : "Dark"} mode</span>
                            </div>

                            {/* Mobile Auth Buttons */}
                            <div className="mt-auto border-t pt-4">
                                {isLoggedIn ? (
                                    <Button
                                        variant="destructive"
                                        className="w-full"
                                        onClick={() => {
                                            onLogout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </Button>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <Button>Authenticate</Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
