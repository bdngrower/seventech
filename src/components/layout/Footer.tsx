import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-foreground/[0.03] bg-background">
            <div className="container mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
                    <div className="space-y-6">
                        <Link href="/" className="inline-block transition-opacity hover:opacity-80">
                            <Image
                                src="/logo.png"
                                alt="SevenTech Logo"
                                width={160}
                                height={45}
                                className="h-8 w-auto object-contain grayscale opacity-80"
                            />
                        </Link>
                        <p className="text-[13px] text-foreground/60 font-light leading-relaxed max-w-[280px]">
                            Proteção invisível de grau militar com personalidade única.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-semibold tracking-wider uppercase text-foreground/90">Coleções</h3>
                        <ul className="space-y-3 text-[13px] text-foreground/60 font-light">
                            <li>
                                <Link href="/" className="hover:text-foreground transition-colors">Lançamentos</Link>
                            </li>
                            <li>
                                <Link href="/produtos" className="hover:text-foreground transition-colors">Todos os Produtos</Link>
                            </li>
                            <li>
                                <Link href="/personalizar" className="hover:text-foreground transition-colors">Estúdio de Criação</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-semibold tracking-wider uppercase text-foreground/90">Suporte</h3>
                        <ul className="space-y-3 text-[13px] text-foreground/60 font-light">
                            <li>
                                <Link href="/faq" className="hover:text-foreground transition-colors">Dúvidas Frequentes</Link>
                            </li>
                            <li>
                                <Link href="/contato" className="hover:text-foreground transition-colors">Contato</Link>
                            </li>
                            <li>
                                <Link href="/termos" className="hover:text-foreground transition-colors">Termos Legais</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-semibold tracking-wider uppercase text-foreground/90">Siga-nos</h3>
                        <div className="flex space-x-5">
                            <Link href="#" className="text-foreground/50 hover:text-foreground transition-colors group">
                                <Instagram className="h-[18px] w-[18px] group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-foreground/50 hover:text-foreground transition-colors group">
                                <Facebook className="h-[18px] w-[18px] group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-foreground/50 hover:text-foreground transition-colors group">
                                <Twitter className="h-[18px] w-[18px] group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-16 md:mt-24 pt-8 border-t border-foreground/[0.03] flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto text-[11px] text-foreground/40 font-light">
                    <p>© {new Date().getFullYear()} SevenTech. Todos os direitos reservados.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacidade" className="hover:text-foreground transition-colors">
                            Política de Privacidade
                        </Link>
                        <Link href="/reembolsos" className="hover:text-foreground transition-colors">
                            Trocas e Devoluções
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
