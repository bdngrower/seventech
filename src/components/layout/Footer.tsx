import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background/50 backdrop-blur-md">
            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-4">
                        <h3 className="font-extrabold tracking-tighter text-xl text-foreground">
                            SEVENTECH
                            <span className="text-accent ml-1 text-2xl leading-[0]">.</span>
                        </h3>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">
                            Crie a sua case exclusiva. Proteção invisível, de grau militar com personalidade única.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider uppercase">Coleções</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground font-light">
                            <li>
                                <Link href="/" className="hover:text-accent transition-colors">Novidades</Link>
                            </li>
                            <li>
                                <Link href="/produtos" className="hover:text-accent transition-colors">Todos os Produtos</Link>
                            </li>
                            <li>
                                <Link href="/personalizar" className="hover:text-accent transition-colors">Monte a sua (Estúdio)</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider uppercase">Suporte</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground font-light">
                            <li>
                                <Link href="/faq" className="hover:text-accent transition-colors">Dúvidas Frequentes (FAQ)</Link>
                            </li>
                            <li>
                                <Link href="/contato" className="hover:text-accent transition-colors">Fale Conosco</Link>
                            </li>
                            <li>
                                <Link href="/termos" className="hover:text-accent transition-colors">Termos e Condições</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider uppercase">Siga-nos</h3>
                        <div className="flex space-x-6">
                            <Link href="#" className="text-muted-foreground hover:text-accent transition-colors group">
                                <Instagram className="h-5 w-5 group-hover:-translate-y-1 transition-transform" strokeWidth={1.5} />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-accent transition-colors group">
                                <Facebook className="h-5 w-5 group-hover:-translate-y-1 transition-transform" strokeWidth={1.5} />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-accent transition-colors group">
                                <Twitter className="h-5 w-5 group-hover:-translate-y-1 transition-transform" strokeWidth={1.5} />
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-20 border-t border-border/40 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row text-xs text-muted-foreground font-light">
                    <p>© {new Date().getFullYear()} SevenTech. Todos os direitos reservados.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacidade" className="hover:text-accent transition-colors">
                            Política de Privacidade
                        </Link>
                        <Link href="/reembolsos" className="hover:text-accent transition-colors">
                            Trocas e Devoluções
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
