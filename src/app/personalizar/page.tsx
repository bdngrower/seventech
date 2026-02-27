"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ZoomIn, ZoomOut, Share2, Upload, Undo, Redo, Info } from "lucide-react";
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
        <div className="flex flex-col md:flex-row h-[calc(100vh-72px)] mt-[72px] bg-[#F5F5F7] dark:bg-[#0A0A0A] overflow-hidden relative selection:bg-foreground/10">

            {/* HEADER MOBILE */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-foreground/[0.03] bg-background z-10">
                <Link href="/">
                    <Button variant="ghost" size="icon" className="hover:bg-transparent text-foreground/70">
                        <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
                    </Button>
                </Link>
                <span className="font-medium text-[13px] tracking-wide">ESTÚDIO DE CRIAÇÃO</span>
                <div className="w-8" />
            </div>

            {/* RENDER VIEW (Left Side) */}
            <div className="flex-1 relative flex flex-col items-center justify-center">

                {/* Floating Toolbar Minimalist */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-10 hidden md:flex">
                    <Link href="/" passHref>
                        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hover:bg-foreground/[0.03] text-foreground/50 hover:text-foreground" title="Voltar">
                            <ArrowLeft className="w-[18px] h-[18px]" strokeWidth={1.5} />
                        </Button>
                    </Link>
                    <div className="h-px bg-foreground/[0.05] my-2 w-6 mx-auto" />
                    <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hover:bg-foreground/[0.03] text-foreground/50 hover:text-foreground" onClick={() => setScale(s => s * 1.1)}>
                        <ZoomIn className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hover:bg-foreground/[0.03] text-foreground/50 hover:text-foreground" onClick={() => setScale(s => s * 0.9)}>
                        <ZoomOut className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    </Button>
                    <div className="h-px bg-foreground/[0.05] my-2 w-6 mx-auto" />
                    <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hover:bg-foreground/[0.03] text-foreground/50 hover:text-foreground disabled:opacity-30" disabled>
                        <Undo className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hover:bg-foreground/[0.03] text-foreground/50 hover:text-foreground disabled:opacity-30" disabled>
                        <Redo className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    </Button>
                </div>

                {/* The Canvas Area */}
                <div className="flex-1 w-full h-full flex items-center justify-center overflow-hidden">
                    <div className="relative transition-transform duration-300 ease-out" style={{ transform: `scale(${scale})` }}>
                        <div className="p-2 rounded-[3.8rem] bg-background shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-foreground/[0.03]">
                            <PhoneCustomizerCanvas
                                width={280}
                                height={580}
                                uploadedImage={uploadedImage}
                            />
                        </div>
                    </div>
                </div>

                {/* View Toggles (Left / Right side of the case) */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 bg-background/80 backdrop-blur-xl border border-foreground/[0.03] rounded-full z-10 shadow-sm">
                    <button className="px-5 py-2 text-[11px] font-medium tracking-widest uppercase bg-foreground text-background rounded-full transition-colors">
                        Costas
                    </button>
                    <button className="px-5 py-2 text-[11px] font-medium tracking-widest uppercase text-foreground/60 hover:text-foreground transition-colors">
                        Frente
                    </button>
                    <button className="px-5 py-2 text-[11px] font-medium tracking-widest uppercase text-foreground/60 hover:text-foreground transition-colors">
                        Interior
                    </button>
                </div>
            </div>

            {/* SIDEBAR CONFIGURATION (Right Side) */}
            <div className="w-full md:w-[420px] bg-background border-l border-foreground/[0.03] flex flex-col h-full z-20">

                <div className="p-8 border-b border-foreground/[0.03] flex justify-between items-start">
                    <div className="space-y-2">
                        <p className="text-[11px] font-semibold tracking-widest uppercase text-foreground/40">Customização</p>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">iPhone 15 Pro Max</h1>
                        <p className="text-lg font-light text-foreground/80 pt-1">R$ 149,00</p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 text-foreground/40 hover:text-foreground hover:bg-foreground/[0.03]">
                        <Share2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">

                    {/* Aparelho Selection */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground/70">Aparelho Selecionado</h3>
                            <button className="text-[11px] font-medium text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">Trocar</button>
                        </div>

                        <div className="flex items-center gap-4 p-4 border border-foreground/[0.08] rounded-2xl bg-background">
                            <div className="w-12 h-20 bg-[#f0f0f0] dark:bg-[#1a1a1a] rounded-lg border border-foreground/[0.05] flex items-center justify-center">
                                {/* small mockup icon placeholder */}
                            </div>
                            <div>
                                <p className="text-sm font-semibold">iPhone 15 Pro Max</p>
                                <p className="text-[12px] text-foreground/50 font-light mt-0.5">Série Ultra Proteção</p>
                            </div>
                        </div>
                    </div>

                    {/* Upload Área Minimalista */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground/70">Design da Superfície</h3>
                            <Info className="w-3 h-3 text-foreground/30" />
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept="image/png, image/jpeg, image/webp"
                            className="hidden"
                        />

                        <div
                            onClick={triggerUpload}
                            className="group relative border border-dashed border-foreground/20 hover:border-foreground/40 bg-foreground/[0.01] rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all"
                        >
                            <div className="w-10 h-10 rounded-full bg-background border border-foreground/[0.05] shadow-sm text-foreground flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                <Upload className="w-[18px] h-[18px]" strokeWidth={1.5} />
                            </div>
                            <div className="text-center">
                                <p className="text-[13px] font-medium text-foreground">
                                    {uploadedImage ? "Imagem carregada (clique para trocar)" : "Faça upload da sua arte"}
                                </p>
                                <p className="text-[11px] text-foreground/40 font-light mt-1.5">
                                    JPG, PNG. Máx 10MB.<br />Aspect Ratio 9:19.
                                </p>
                            </div>
                        </div>

                        {uploadedImage && (
                            <div className="flex justify-end pt-1">
                                <button onClick={() => setUploadedImage(null)} className="text-[11px] text-red-500 hover:text-red-600 font-medium">Remover Imagem</button>
                            </div>
                        )}
                    </div>

                </div>

                <div className="p-6 border-t border-foreground/[0.03] bg-background">
                    <Button className="w-full h-14 rounded-full bg-foreground hover:bg-foreground/90 text-background text-[13px] font-medium tracking-wide shadow-none transition-all hover:scale-[1.02] active:scale-[0.98]">
                        Adicionar ao Carrinho
                    </Button>
                    <p className="text-center text-[10px] text-foreground/40 mt-4 font-light">
                        Produção em 2-3 dias úteis. Frete calculado no checkout.
                    </p>
                </div>

            </div>

        </div>
    );
}
