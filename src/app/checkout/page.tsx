"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2, Lock, Truck, CreditCard, QrCode } from "lucide-react";

export default function CheckoutPage() {
    const router = useRouter();
    const { items, total, clearCart } = useCartStore();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");

    const cartTotal = total();
    const shipping = 15.0;

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        setStep((prev) => (prev < 3 ? prev + 1 : prev) as 1 | 2 | 3);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCheckout = () => {
        // Simulando chamada de API de Checkout do Mercado Pago
        toast.info("Processando pagamento via Mercado Pago...", { duration: 3000 });

        setTimeout(() => {
            clearCart();
            toast.success("Pedido realizado com sucesso!");
            router.push("/pedido/12345"); // Mock order ID
        }, 2000);
    };

    if (items.length === 0 && step === 1) {
        router.push("/carrinho");
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Esquerda: Formulários */}
                <div className="flex-1 space-y-8">
                    {/* Breadcrumbs/Steps */}
                    <div className="flex items-center justify-between mb-8 max-w-md">
                        <div className={`flex flex-col items-center gap-2 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                                {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : "1"}
                            </div>
                            <span className="text-xs font-semibold">Identificação</span>
                        </div>
                        <div className={`h-[2px] w-12 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
                        <div className={`flex flex-col items-center gap-2 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                                {step > 2 ? <CheckCircle2 className="w-5 h-5" /> : "2"}
                            </div>
                            <span className="text-xs font-semibold">Entrega</span>
                        </div>
                        <div className={`h-[2px] w-12 ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
                        <div className={`flex flex-col items-center gap-2 ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                                3
                            </div>
                            <span className="text-xs font-semibold">Pagamento</span>
                        </div>
                    </div>

                    {step === 1 && (
                        <form onSubmit={handleNextStep} className="bg-card border rounded-2xl p-6 md:p-8 space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Dados Pessoais</h2>
                                <p className="text-muted-foreground text-sm mb-6">Como podemos te chamar?</p>
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">E-mail</Label>
                                        <Input id="email" type="email" placeholder="seu@email.com" required />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">Nome</Label>
                                            <Input id="firstName" placeholder="João" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Sobrenome</Label>
                                            <Input id="lastName" placeholder="Silva" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cpf">CPF</Label>
                                        <Input id="cpf" placeholder="000.000.000-00" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Telefone / WhatsApp</Label>
                                        <Input id="phone" placeholder="(11) 99999-9999" required />
                                    </div>
                                </div>
                            </div>
                            <Button type="submit" size="lg" className="w-full text-lg h-14">
                                Continuar para Entrega
                            </Button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleNextStep} className="bg-card border rounded-2xl p-6 md:p-8 space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Endereço de Entrega</h2>
                                <p className="text-muted-foreground text-sm mb-6">Onde devemos entregar seus produtos?</p>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2 md:col-span-1">
                                            <Label htmlFor="cep">CEP</Label>
                                            <Input id="cep" placeholder="00000-000" required />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="rua">Endereço</Label>
                                            <Input id="rua" placeholder="Rua, Avenida..." required />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="numero">Número</Label>
                                            <Input id="numero" placeholder="123" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="complemento">Complemento</Label>
                                            <Input id="complemento" placeholder="Apto, Casa, etc." />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2 md:col-span-1">
                                            <Label htmlFor="bairro">Bairro</Label>
                                            <Input id="bairro" required />
                                        </div>
                                        <div className="space-y-2 md:col-span-1">
                                            <Label htmlFor="cidade">Cidade</Label>
                                            <Input id="cidade" required />
                                        </div>
                                        <div className="space-y-2 md:col-span-1">
                                            <Label htmlFor="estado">Estado</Label>
                                            <Input id="estado" placeholder="SP" required maxLength={2} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border border-primary/20 bg-primary/5 rounded-xl flex items-start gap-4">
                                <Truck className="w-6 h-6 text-primary shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold">Frete Melhor Envio (Mock)</h4>
                                    <p className="text-sm text-muted-foreground">Correios PAC - 4 a 6 dias úteis</p>
                                    <p className="font-bold mt-1 text-primary">R$ 15,00</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button type="button" variant="outline" size="lg" className="w-full text-lg h-14" onClick={() => setStep(1)}>
                                    Voltar
                                </Button>
                                <Button type="submit" size="lg" className="w-full text-lg h-14">
                                    Ir para Pagamento
                                </Button>
                            </div>
                        </form>
                    )}

                    {step === 3 && (
                        <div className="bg-card border rounded-2xl p-6 md:p-8 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Pagamento Seguro Mercado Pago</h2>
                                <p className="text-muted-foreground text-sm mb-6 flex items-center gap-2">
                                    <Lock className="w-4 h-4" /> Ambiente 100% seguro e criptografado
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    <button
                                        onClick={() => setPaymentMethod("pix")}
                                        className={`flex items-center gap-3 p-4 border rounded-xl transition-all ${paymentMethod === "pix" ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:border-primary/50"
                                            }`}
                                    >
                                        <QrCode className={`w-6 h-6 ${paymentMethod === "pix" ? "text-primary" : "text-muted-foreground"}`} />
                                        <div className="text-left">
                                            <div className="font-semibold">Pix</div>
                                            <div className="text-xs text-muted-foreground">Aprovação imediata</div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setPaymentMethod("card")}
                                        className={`flex items-center gap-3 p-4 border rounded-xl transition-all ${paymentMethod === "card" ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:border-primary/50"
                                            }`}
                                    >
                                        <CreditCard className={`w-6 h-6 ${paymentMethod === "card" ? "text-primary" : "text-muted-foreground"}`} />
                                        <div className="text-left">
                                            <div className="font-semibold">Cartão de Crédito</div>
                                            <div className="text-xs text-muted-foreground">Em até 12x s/ juros</div>
                                        </div>
                                    </button>
                                </div>

                                {paymentMethod === "card" && (
                                    <div className="grid gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                        <div className="space-y-2">
                                            <Label htmlFor="cardNumber">Número do Cartão</Label>
                                            <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cardName">Nome impresso no cartão</Label>
                                            <Input id="cardName" placeholder="JOAO SILVA" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="expiry">Validade</Label>
                                                <Input id="expiry" placeholder="MM/AA" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cvv">CVV</Label>
                                                <Input id="cvv" placeholder="123" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === "pix" && (
                                    <div className="p-6 bg-muted/50 rounded-xl flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-top-4 duration-300">
                                        <QrCode className="w-16 h-16 text-primary mb-4" />
                                        <h3 className="font-bold">Pague com Pix</h3>
                                        <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                                            O QR Code para pagamento será gerado na próxima tela. O pedido é liberado na hora!
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4 pt-4 border-t">
                                <Button type="button" variant="outline" size="lg" className="w-full text-lg h-14" onClick={() => setStep(2)}>
                                    Voltar
                                </Button>
                                <Button size="lg" className="w-full text-lg h-14 bg-green-600 hover:bg-green-700 text-white" onClick={handleCheckout}>
                                    <Lock className="w-4 h-4 mr-2" />
                                    Finalizar Pedido
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Direita: Resumo do Pedido */}
                <div className="w-full md:w-80 lg:w-96 shrink-0">
                    <div className="bg-muted/30 border rounded-2xl p-6 sticky top-24">
                        <h3 className="font-bold text-lg mb-4">Resumo do Pedido</h3>

                        <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 mb-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-12 h-16 bg-muted rounded overflow-hidden shrink-0 border relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item.customImageBase64 || item.image} alt={item.name} className="w-full h-full object-cover" />
                                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.modelName}</p>
                                        <p className="text-sm font-bold mt-1">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-3 text-sm">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Subtotal</span>
                                <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Frete (Melhor Envio)</span>
                                <span>R$ {shipping.toFixed(2).replace('.', ',')}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Descontos</span>
                                <span className="text-green-500">R$ 0,00</span>
                            </div>
                        </div>

                        <div className="border-t mt-4 pt-4 flex justify-between items-center">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-bold text-2xl text-primary">
                                R$ {(cartTotal + shipping).toFixed(2).replace('.', ',')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
