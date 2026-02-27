import Link from "next/link";
import { Filter, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock data
const mockProducts = [
    {
        id: "1",
        slug: "capinha-personalizavel-premium",
        name: "Capinha Personalizável Premium",
        price: 89.90,
        rating: 4.9,
        reviews: 124,
        image: "https://placehold.co/400x500/e2e8f0/1e293b?text=Personalize+Aqui",
        isCustomizable: true,
    },
    {
        id: "2",
        slug: "capinha-anti-impacto-transparente",
        name: "Capinha Anti-Impacto Transparente",
        price: 49.90,
        rating: 4.8,
        reviews: 89,
        image: "https://placehold.co/400x500/f1f5f9/94a3b8?text=Transparente",
        isCustomizable: false,
    },
    {
        id: "3",
        slug: "capinha-matte-preta",
        name: "Capinha Slim Matte Preta",
        price: 59.90,
        rating: 4.7,
        reviews: 45,
        image: "https://placehold.co/400x500/0f172a/ffffff?text=Preto+Matte",
        isCustomizable: false,
    },
    {
        id: "4",
        slug: "capinha-couro-vegan",
        name: "Capinha Couro Vegano Caramelo",
        price: 119.90,
        rating: 5.0,
        reviews: 32,
        image: "https://placehold.co/400x500/8b5a2b/ffffff?text=Couro",
        isCustomizable: false,
    },
];

const mockModels = [
    "iPhone 15 Pro Max",
    "iPhone 15 Pro",
    "iPhone 15",
    "iPhone 14 Pro Max",
    "iPhone 14",
    "Galaxy S24 Ultra",
    "Galaxy S24+",
    "Galaxy S24",
    "Galaxy S23 Ultra",
];

export default function ProductsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Todos os Produtos</h1>
                    <p className="text-muted-foreground mt-1">Encontre a capinha perfeita para o seu estilo e proteção.</p>
                </div>
                <div className="flex items-center gap-2">
                    {/* Mobile filter button */}
                    <Button variant="outline" className="md:hidden">
                        <Filter className="w-4 h-4 mr-2" />
                        Filtros
                    </Button>
                    <span className="text-sm text-muted-foreground hidden md:inline-block">
                        {mockProducts.length} produtos encontrados
                    </span>
                </div>
            </div>

            <Separator className="mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar Filters */}
                <aside className="hidden md:block col-span-1 space-y-8">
                    <div>
                        <h3 className="font-semibold mb-4">Categorias</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <button className="text-primary font-medium hover:underline">Todos os Produtos</button>
                            </li>
                            <li>
                                <button className="hover:text-foreground">Personalizáveis</button>
                            </li>
                            <li>
                                <button className="hover:text-foreground">Prontas / Estampadas</button>
                            </li>
                            <li>
                                <button className="hover:text-foreground">Anti-Impacto</button>
                            </li>
                        </ul>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="font-semibold mb-4">Modelo do Celular</h3>
                        <div className="space-y-3">
                            {mockModels.slice(0, 5).map((model) => (
                                <div key={model} className="flex items-center space-x-2">
                                    <input type="checkbox" id={`model-${model}`} className="rounded border-gray-300 text-primary focus:ring-primary" />
                                    <label htmlFor={`model-${model}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {model}
                                    </label>
                                </div>
                            ))}
                            <Button variant="link" className="px-0 h-auto text-muted-foreground hover:text-primary">
                                Ver mais +
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="font-semibold mb-4">Faixa de Preço</h3>
                        <input type="range" min="0" max="200" className="w-full accent-primary" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>R$ 0</span>
                            <span>R$ 200+</span>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="col-span-1 md:col-span-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockProducts.map((product) => (
                            <Link key={product.id} href={`/produto/${product.slug}`} className="group">
                                <Card className="h-full overflow-hidden border-transparent hover:border-border transition-colors shadow-none hover:shadow-md">
                                    <div className="aspect-[4/5] relative bg-muted overflow-hidden">
                                        {product.isCustomizable && (
                                            <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-md z-10">
                                                Personalizável
                                            </span>
                                        )}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-1 mb-2 text-sm text-yellow-500">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span className="text-muted-foreground text-xs">
                                                {product.rating} ({product.reviews})
                                            </span>
                                        </div>
                                        <h3 className="font-medium text-base truncate" title={product.name}>
                                            {product.name}
                                        </h3>
                                        <p className="font-bold text-lg mt-2">
                                            R$ {product.price.toFixed(2).replace('.', ',')}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
