import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-muted">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-primary">Seven Tech</h3>
                        <p className="text-sm text-muted-foreground">
                            A sua loja especializada em capinhas personalizadas. Proteja e decore seu celular com o seu estilo.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Links Rápidos</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/produtos" className="hover:text-primary transition-colors">Produtos</Link>
                            </li>
                            <li>
                                <Link href="/personalizar" className="hover:text-primary transition-colors">Personalizar</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Suporte</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
                            </li>
                            <li>
                                <Link href="/contato" className="hover:text-primary transition-colors">Fale Conosco</Link>
                            </li>
                            <li>
                                <Link href="/termos" className="hover:text-primary transition-colors">Termos de Serviço</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Redes Sociais</h3>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t pt-8 flex flex-col items-center justify-between gap-4 md:flex-row text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Seven Tech. Todos os direitos reservados.</p>
                    <div className="flex items-center gap-4">
                        <Link href="/privacidade" className="hover:underline hover:text-primary">
                            Política de Privacidade
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
