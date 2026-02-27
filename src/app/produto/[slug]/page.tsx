import Link from "next/link";
import { Star, ShieldCheck, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

// Mock database fetch
const getProduct = async (slug: string) => {
    const isCustomizable = slug.includes("personalizavel");
    return {
        id: "1",
        name: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        price: isCustomizable ? 89.90 : 59.90,
        description: "Proteja seu celular com estilo e durabilidade incomparáveis. Nossas capinhas são projetadas para absorver impactos e manter um visual premium.",
        isCustomizable,
        images: [
            `https://placehold.co/600x800/f1f5f9/94a3b8?text=${isCustomizable ? "Sua+Arte+Aqui" : "Frente"}`,
            `https://placehold.co/600x800/e2e8f0/64748b?text=Lado+A`,
            `https://placehold.co/600x800/cbd5e1/475569?text=Lado+B`,
        ]
    };
};

export default async function ProductPage({ params }: Props) {
    const resolvedParams = await params;
    const product = await getProduct(resolvedParams.slug);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Imagens */}
                <div className="space-y-4">
                    <div className="aspect-[3/4] bg-muted rounded-2xl overflow-hidden border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {product.images.slice(1).map((img, i) => (
                            <div key={i} className="aspect-square bg-muted rounded-xl border overflow-hidden cursor-pointer hover:border-primary">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={img} alt={`${product.name} - Imagem ${i + 2}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Informações */}
                <div className="flex flex-col">
                    <div className="mb-6">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex text-yellow-500">
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                            </div>
                            <span className="text-muted-foreground">(124 avaliações)</span>
                        </div>
                    </div>

                    <div className="text-3xl font-extrabold text-primary mb-6">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                    </div>

                    <p className="text-muted-foreground mb-8 text-lg">
                        {product.description}
                    </p>

                    <Separator className="mb-8" />

                    {/* Opções (Mocks) */}
                    <div className="space-y-6 mb-8">
                        <div>
                            <label className="text-sm font-semibold mb-3 block">Escolha o Modelo do Celular</label>
                            <select className="w-full p-3 rounded-lg border bg-background text-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-shadow">
                                <option value="">Selecione um modelo...</option>
                                <option value="iphone15pm">iPhone 15 Pro Max</option>
                                <option value="iphone14">iPhone 14</option>
                                <option value="galaxys24u">Galaxy S24 Ultra</option>
                            </select>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col gap-4 mt-auto">
                        {product.isCustomizable ? (
                            <Link href={`/personalizar?product=${product.id}`}>
                                <Button size="lg" className="w-full text-lg h-14 group">
                                    Personalizar Agora
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        ) : (
                            <Button size="lg" className="w-full text-lg h-14">
                                Adicionar ao Carrinho
                            </Button>
                        )}

                        <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-green-500" />
                                <span>Garantia de 90 dias</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Truck className="w-5 h-5 text-primary" />
                                <span>Frete Fixo R$ 9,90</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
