"use client";

import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
    const { items, removeItem, updateQuantity, total } = useCartStore();

    const cartTotal = total();
    const shipping = 15.00; // Mock shipping

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6 text-primary">
                    <ShoppingBag className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
                <p className="text-muted-foreground mb-8 text-lg max-w-md">
                    Explore nossos modelos e crie a capinha perfeita para o seu celular.
                </p>
                <Link href="/produtos">
                    <Button size="lg" className="h-14 px-8 text-lg">
                        Ver Produtos
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Meu Carrinho</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-6 border rounded-2xl bg-card">
                            <div className="w-24 h-32 bg-muted rounded-lg overflow-hidden border shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.customImageBase64 || item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-lg">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">Modelo: {item.modelName}</p>
                                        {item.isCustomized && (
                                            <span className="inline-block mt-2 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                                                Mockup Personalizado
                                            </span>
                                        )}
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-destructive hover:bg-destructive/10">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center border rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            className="px-3 py-1 bg-muted hover:bg-muted/80"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 text-sm font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-3 py-1 bg-muted hover:bg-muted/80"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="font-bold text-lg">
                                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="border rounded-2xl p-6 bg-card sticky top-24">
                        <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>

                        <div className="space-y-4 text-sm mb-6">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal ({items.length} itens)</span>
                                <span className="font-medium">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Frete Estimado</span>
                                <span className="font-medium">R$ {shipping.toFixed(2).replace('.', ',')}</span>
                            </div>
                        </div>

                        <Separator className="mb-6" />

                        <div className="flex justify-between items-center mb-8">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-bold text-2xl text-primary">
                                R$ {(cartTotal + shipping).toFixed(2).replace('.', ',')}
                            </span>
                        </div>

                        <Link href="/checkout">
                            <Button size="lg" className="w-full h-14 text-lg group">
                                Finalizar Compra
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>

                        <Link href="/produtos">
                            <Button variant="link" className="w-full mt-4 text-muted-foreground">
                                Continuar Comprando
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
