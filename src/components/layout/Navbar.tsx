import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, User, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/80 backdrop-blur-2xl border-b border-foreground/[0.03] transition-all duration-300">
            <div className="container mx-auto flex h-[72px] items-center justify-between px-6 md:px-10">
                <div className="flex items-center gap-8">
                    <Link href="/" className="transition-opacity hover:opacity-80 flex items-center">
                        <Image
                            src="/logo.png"
                            alt="SevenTech Logo"
                            width={160}
                            height={45}
                            className="h-8 w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>

                <nav className="hidden md:flex flex-1 justify-center gap-10">
                    <Link
                        href="/produtos"
                        className="text-[13px] font-medium tracking-wide text-foreground/70 transition-colors hover:text-foreground"
                    >
                        Coleções
                    </Link>
                    <Link
                        href="/personalizar"
                        className="text-[13px] font-medium tracking-wide text-foreground/70 transition-colors hover:text-foreground"
                    >
                        Estúdio de Criação
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/carrinho">
                        <Button variant="ghost" size="icon" className="relative hover:bg-transparent text-foreground/80 hover:text-foreground -mr-2">
                            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                            <span className="sr-only">Carrinho</span>
                            <span className="absolute top-1 right-1 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-foreground text-[9px] text-background font-bold">
                                0
                            </span>
                        </Button>
                    </Link>
                    <Link href="/minha-conta" className="hidden sm:flex">
                        <Button variant="ghost" size="icon" className="hover:bg-transparent text-foreground/80 hover:text-foreground">
                            <User className="h-5 w-5" strokeWidth={1.5} />
                            <span className="sr-only">Minha Conta</span>
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="md:hidden hover:bg-transparent text-foreground/80 hover:text-foreground">
                        <Menu className="h-[22px] w-[22px]" strokeWidth={1.5} />
                        <span className="sr-only">Menu</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
