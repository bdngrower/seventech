import Link from "next/link";
import { ShoppingCart, User, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold inline-block text-xl text-primary">
                            Seven Tech
                        </span>
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link
                            href="/produtos"
                            className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Produtos
                        </Link>
                        <Link
                            href="/personalizar"
                            className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Personalizar Capinha
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/carrinho">
                        <Button variant="ghost" size="icon" className="relative text-foreground hover:text-primary">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="sr-only">Carrinho</span>
                            {/* Carrinho Badge Exemplo */}
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                                0
                            </span>
                        </Button>
                    </Link>
                    <Link href="/minha-conta">
                        <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                            <User className="h-5 w-5" />
                            <span className="sr-only">Minha Conta</span>
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="md:hidden text-foreground hover:text-primary">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Menu</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
