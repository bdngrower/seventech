import Link from "next/link";
import { ShoppingCart, User, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
            <div className="container mx-auto flex h-20 items-center justify-between px-6">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-extrabold tracking-tighter text-2xl text-foreground">
                            SEVENTECH
                            <span className="text-accent ml-1 text-4xl leading-[0]">.</span>
                        </span>
                    </Link>
                </div>

                <nav className="hidden md:flex flex-1 justify-center gap-8">
                    <Link
                        href="/produtos"
                        className="flex items-center text-sm font-semibold tracking-wide text-muted-foreground transition-all hover:text-foreground hover:-translate-y-0.5"
                    >
                        COLEÇÕES
                    </Link>
                    <Link
                        href="/personalizar"
                        className="flex items-center text-sm font-semibold tracking-wide text-accent transition-all hover:text-accent/80 hover:-translate-y-0.5"
                    >
                        PERSONALIZAR
                    </Link>
                </nav>

                <div className="flex items-center gap-2">
                    <Link href="/carrinho">
                        <Button variant="ghost" size="icon" className="relative text-foreground hover:bg-muted/50 rounded-full h-10 w-10">
                            <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
                            <span className="sr-only">Carrinho</span>
                            {/* Carrinho Badge Exemplo */}
                            <span className="absolute 1 top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] text-background font-bold shadow-sm">
                                0
                            </span>
                        </Button>
                    </Link>
                    <Link href="/minha-conta">
                        <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted/50 rounded-full h-10 w-10 hidden sm:flex">
                            <User className="h-5 w-5" strokeWidth={1.5} />
                            <span className="sr-only">Minha Conta</span>
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="md:hidden text-foreground hover:bg-muted/50 rounded-full h-10 w-10">
                        <Menu className="h-5 w-5" strokeWidth={1.5} />
                        <span className="sr-only">Menu</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
