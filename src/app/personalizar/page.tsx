"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ZoomIn, ZoomOut, Share2, ShoppingCart, Upload, Undo, Redo } from "lucide-react";
import PhoneCustomizerCanvas from "@/components/customizer/PhoneCustomizerCanvas";
import Link from "next/link";

export default function PersonalizarPage() {
    const [scale, setScale] = useState(1);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-5rem)] bg-background overflow-hidden relative selection:bg-accent selection:text-white">

            {/* HEADER MOBILE */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-border/40 bg-card z-10 shadow-sm">
                <Link href="/">
                    <Button variant="ghost" size="icon" className="text-foreground">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <span className="font-semibold text-sm">Personalizando Case</span>
                <div className="w-8" />
            </div>

            {/* RENDER VIEW (Left Side) */}
            <div className="flex-1 relative flex flex-col bg-muted/30">

                {/* Floating Toolbar */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10 bg-card/80 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-border/50 hidden md:flex">
                    <Link href="/" passHref>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted" title="Voltar">
                            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                        </Button>
                    </Link>
                    <div className="h-px bg-border/50 my-1 w-full" />
                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted" onClick={() => setScale(s => s * 1.1)}>
                        <ZoomIn className="w-5 h-5 text-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted" onClick={() => setScale(s => s * 0.9)}>
                        <ZoomOut className="w-5 h-5 text-foreground" />
                    </Button>
                    <div className="h-px bg-border/50 my-1 w-full" />
                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted disabled:opacity-50" disabled>
                        <Undo className="w-5 h-5 text-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted disabled:opacity-50" disabled>
                        <Redo className="w-5 h-5 text-foreground" />
                    </Button>
                </div>

                {/* The Canvas Area */}
                <div className="flex-1 w-full h-full flex items-center justify-center overflow-hidden">
                    <div className="relative transition-transform duration-200" style={{ transform: `scale(${scale})` }}>
                        <div className="p-4 rounded-[4rem] bg-white/50 backdrop-blur-3xl shadow-2xl border border-white/20">
                            <PhoneCustomizerCanvas
                                width={300}
                                height={620}
                                uploadedImage={uploadedImage}
                            />
                        </div>
                    </div>
                </div>

                {/* View Toggles (Left / Right side of the case) */}
                <div className="absolute bottom-6 left-6 flex gap-3 z-10">
                    <button className="flex flex-col items-center gap-2 p-2 bg-card rounded-xl border-2 border-primary shadow-lg transition-transform hover:scale-105">
                        <div className="w-10 h-16 bg-muted rounded-md border border-border"></div>
                        <span className="text-[10px] font-bold uppercase tracking-wider">Traseira</span>
                    </button>
                </div>
            </div>

            {/* SIDEBAR CONFIGURATION (Right Side) */}
            <div className="w-full md:w-[400px] lg:w-[450px] bg-card border-l border-border/50 flex flex-col h-full shadow-2xl z-20">

                <div className="p-8 border-b border-border/50 space-y-3">
                    <div className="flex justify-between items-start">
                        <h1 className="text-3xl font-extrabold tracking-tighter">Capinha Anti-Impacto</h1>
                        <Button variant="outline" size="icon" className="rounded-full shadow-sm hover:border-foreground/50"><Share2 className="w-4 h-4" /></Button>
                    </div>
                    <p className="text-4xl font-light text-foreground flex items-baseline gap-1">
                        <span className="text-lg text-muted-foreground mr-1">R$</span>89,90
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">

                    {/* Tamanhos / Modelos */}
                    <div className="space-y-5">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Modelo do Aparelho</h3>
                            <span className="text-xs text-accent font-semibold cursor-pointer hover:underline">Alterar</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border-2 border-primary bg-background rounded-2xl p-5 flex flex-col items-center gap-4 cursor-pointer shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-8 h-8 bg-primary rounded-bl-2xl flex items-center justify-center">
                                    <span className="text-primary-foreground text-xs font-bold">✓</span>
                                </div>
                                <div className="w-10 h-20 bg-foreground rounded-[0.4rem] shadow-inner"></div>
                                <span className="text-sm font-semibold text-center leading-tight">iPhone 15 <br /> <span className="text-xs font-normal text-muted-foreground">Standard</span></span>
                            </div>
                            <div className="border border-border/50 hover:border-primary/50 bg-muted/30 rounded-2xl p-5 flex flex-col items-center gap-4 cursor-pointer opacity-70 hover:opacity-100 transition-all hover:shadow-sm">
                                <div className="w-12 h-24 bg-muted-foreground rounded-[0.5rem] shadow-inner"></div>
                                <span className="text-sm font-semibold text-center leading-tight">iPhone 15 <br /> <span className="text-xs font-normal text-muted-foreground">Pro Max</span></span>
                            </div>
                        </div>
                    </div>

                    {/* Upload Área */}
                    <div className="space-y-5">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Sua Arte</h3>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept="image/png, image/jpeg, image/webp"
                            className="hidden"
                        />

                        <div onClick={triggerUpload} className="border-2 border-dashed border-border/50 hover:border-accent bg-muted/20 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all group hover:bg-accent/5">
                            <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Upload className="w-6 h-6" strokeWidth={2} />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-foreground">
                                    {uploadedImage ? "Imagem enviada! Clique para trocar." : "Clique para enviar imagem"}
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">Formatos suportados: .JPG, .PNG<br />Resolução ideal: 1080x2400px</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="p-6 border-t border-border/50 bg-background/80 backdrop-blur-xl">
                    <Button className="w-full h-16 text-lg rounded-2xl bg-accent hover:bg-accent/90 text-white shadow-xl shadow-accent/20 gap-3 group font-bold tracking-wide">
                        <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        FECHAR PEDIDO
                    </Button>
                </div>

            </div>

        </div>
    );
}
