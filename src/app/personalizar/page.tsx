"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ZoomIn, ZoomOut, Upload, Smartphone, ChevronDown, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Dynamic import to avoid SSR hydration errors with react-konva
const PhoneCustomizerCanvas = dynamic(
    () => import("@/components/customizer/PhoneCustomizerCanvas"),
    { ssr: false, loading: () => <div className="w-[260px] h-[520px] rounded-[36px] bg-neutral-200 dark:bg-neutral-800 animate-pulse" /> }
);

// Available phone models
const PHONE_MODELS = [
    { id: "iphone-17-pro-max", name: "iPhone 17 Pro Max", brand: "Apple" },
    { id: "iphone-17-pro", name: "iPhone 17 Pro", brand: "Apple" },
    { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max", brand: "Apple" },
    { id: "iphone-16-pro", name: "iPhone 16 Pro", brand: "Apple" },
    { id: "iphone-16", name: "iPhone 16", brand: "Apple" },
    { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", brand: "Apple" },
    { id: "iphone-15", name: "iPhone 15", brand: "Apple" },
    { id: "galaxy-s26-ultra", name: "Galaxy S26 Ultra", brand: "Samsung" },
    { id: "galaxy-s25-ultra", name: "Galaxy S25 Ultra", brand: "Samsung" },
    { id: "galaxy-s24-ultra", name: "Galaxy S24 Ultra", brand: "Samsung" },
];

// Case colors
const CASE_COLORS = [
    { id: "black", hex: "#1a1a1a", name: "Preto" },
    { id: "white", hex: "#f5f5f5", name: "Branco" },
    { id: "midnight", hex: "#191970", name: "Azul Meia-Noite" },
    { id: "forest", hex: "#1b4332", name: "Verde Floresta" },
    { id: "wine", hex: "#722f37", name: "Vinho" },
    { id: "transparent", hex: "transparent", name: "Transparente" },
];

export default function PersonalizarPage() {
    const [scale, setScale] = useState(1);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedModel, setSelectedModel] = useState(PHONE_MODELS[0]);
    const [selectedColor, setSelectedColor] = useState(CASE_COLORS[0]);
    const [showModelPicker, setShowModelPicker] = useState(false);

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
        <div className="flex flex-col md:flex-row h-screen bg-[#fafafa] dark:bg-[#0a0a0a] overflow-hidden">

            {/* ===== PREVIEW AREA (Left) ===== */}
            <div className="flex-1 relative flex items-center justify-center bg-[#f0f0f0] dark:bg-[#111]">

                {/* Top bar inside preview */}
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-20">
                    <Link href="/" className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors">
                        <ArrowLeft className="w-4 h-4" strokeWidth={2} />
                        <span className="text-[13px] font-medium hidden sm:inline">Voltar</span>
                    </Link>
                    <div className="flex items-center gap-3 bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-full px-1 py-1 border border-black/5 dark:border-white/10">
                        <button
                            onClick={() => setScale(s => Math.max(0.5, s * 0.9))}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        >
                            <ZoomOut className="w-4 h-4 text-foreground/70" strokeWidth={2} />
                        </button>
                        <span className="text-[11px] font-medium text-foreground/50 min-w-[36px] text-center">
                            {Math.round(scale * 100)}%
                        </span>
                        <button
                            onClick={() => setScale(s => Math.min(2, s * 1.1))}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        >
                            <ZoomIn className="w-4 h-4 text-foreground/70" strokeWidth={2} />
                        </button>
                    </div>
                </div>

                {/* Canvas Holder */}
                <div
                    className="transition-transform duration-300 ease-out"
                    style={{ transform: `scale(${scale})` }}
                >
                    <div className="relative">
                        {/* Phone case shadow */}
                        <div className="absolute -inset-3 bg-black/[0.04] dark:bg-white/[0.02] rounded-[44px] blur-xl" />

                        {/* The actual canvas */}
                        <div className="relative rounded-[40px] overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/40">
                            <PhoneCustomizerCanvas
                                width={260}
                                height={520}
                                uploadedImage={uploadedImage}
                                caseColor={selectedColor.hex}
                            />
                        </div>
                    </div>
                </div>

                {/* Hint text at bottom */}
                {!uploadedImage && (
                    <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[12px] text-foreground/30 font-light">
                        Faça upload de uma imagem para personalizar
                    </p>
                )}
            </div>


            {/* ===== SIDEBAR (Right) ===== */}
            <div className="w-full md:w-[400px] lg:w-[420px] bg-white dark:bg-[#0d0d0d] border-l border-black/5 dark:border-white/5 flex flex-col h-full overflow-hidden">

                {/* Sidebar Header */}
                <div className="px-6 pt-6 pb-5 border-b border-black/5 dark:border-white/5">
                    <p className="text-[11px] uppercase tracking-[0.15em] text-foreground/40 font-semibold">Personalizar Capa</p>
                    <h1 className="text-xl font-bold tracking-tight text-foreground mt-1">{selectedModel.name}</h1>
                    <p className="text-base text-foreground/70 font-light mt-1">R$ 89,90</p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-6 py-6 space-y-8">

                        {/* ── Step 1: Model Selection ── */}
                        <div className="space-y-3">
                            <p className="text-[11px] uppercase tracking-[0.15em] text-foreground/50 font-bold flex items-center gap-1.5">
                                <Smartphone className="w-3.5 h-3.5" />
                                1. Modelo do Celular
                            </p>

                            <button
                                onClick={() => setShowModelPicker(!showModelPicker)}
                                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border border-black/10 dark:border-white/10 bg-[#fafafa] dark:bg-[#161616] hover:border-black/20 dark:hover:border-white/20 transition-colors"
                            >
                                <span className="text-[14px] font-medium">{selectedModel.name}</span>
                                <ChevronDown className={`w-4 h-4 text-foreground/40 transition-transform ${showModelPicker ? 'rotate-180' : ''}`} />
                            </button>

                            {showModelPicker && (
                                <div className="border border-black/10 dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-[#161616] max-h-[240px] overflow-y-auto">
                                    {PHONE_MODELS.map((model) => (
                                        <button
                                            key={model.id}
                                            onClick={() => { setSelectedModel(model); setShowModelPicker(false); }}
                                            className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-black/3 dark:hover:bg-white/5 transition-colors border-b border-black/5 dark:border-white/5 last:border-b-0 ${selectedModel.id === model.id ? 'bg-black/5 dark:bg-white/5' : ''
                                                }`}
                                        >
                                            <div>
                                                <p className="text-[13px] font-medium">{model.name}</p>
                                                <p className="text-[11px] text-foreground/40">{model.brand}</p>
                                            </div>
                                            {selectedModel.id === model.id && (
                                                <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center">
                                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                        <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-background" />
                                                    </svg>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ── Step 2: Case Color ── */}
                        <div className="space-y-3">
                            <p className="text-[11px] uppercase tracking-[0.15em] text-foreground/50 font-bold">
                                2. Cor da Capa
                            </p>
                            <div className="flex items-center gap-3 flex-wrap">
                                {CASE_COLORS.map((color) => (
                                    <button
                                        key={color.id}
                                        onClick={() => setSelectedColor(color)}
                                        className={`group relative w-10 h-10 rounded-full border-2 transition-all ${selectedColor.id === color.id
                                                ? 'border-foreground scale-110'
                                                : 'border-black/10 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30'
                                            }`}
                                        title={color.name}
                                    >
                                        <div
                                            className="absolute inset-1 rounded-full"
                                            style={{
                                                backgroundColor: color.hex === "transparent" ? undefined : color.hex,
                                                backgroundImage: color.hex === "transparent"
                                                    ? "repeating-conic-gradient(#d4d4d4 0% 25%, transparent 0% 50%) 50% / 8px 8px"
                                                    : undefined,
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                            <p className="text-[11px] text-foreground/40">{selectedColor.name}</p>
                        </div>

                        {/* ── Step 3: Upload Image ── */}
                        <div className="space-y-3">
                            <p className="text-[11px] uppercase tracking-[0.15em] text-foreground/50 font-bold flex items-center gap-1.5">
                                <Upload className="w-3.5 h-3.5" />
                                3. Sua Imagem
                            </p>

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                accept="image/png, image/jpeg, image/webp"
                                className="hidden"
                            />

                            {!uploadedImage ? (
                                <button
                                    onClick={triggerUpload}
                                    className="w-full border-2 border-dashed border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30 rounded-xl px-6 py-8 flex flex-col items-center gap-3 transition-colors group cursor-pointer"
                                >
                                    <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                                        <Upload className="w-5 h-5 text-foreground/50" strokeWidth={1.5} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[13px] font-medium text-foreground">Escolher Imagem</p>
                                        <p className="text-[11px] text-foreground/40 mt-1">JPG, PNG · Máx 10MB</p>
                                    </div>
                                </button>
                            ) : (
                                <div className="space-y-3">
                                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                                        <Image
                                            src={uploadedImage}
                                            alt="Preview da imagem"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={triggerUpload}
                                            className="flex-1 text-center py-2.5 rounded-lg bg-black/5 dark:bg-white/5 text-[12px] font-medium hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                                        >
                                            Trocar Imagem
                                        </button>
                                        <button
                                            onClick={() => setUploadedImage(null)}
                                            className="px-4 py-2.5 rounded-lg text-[12px] font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            )}

                            <p className="text-[11px] text-foreground/30 font-light">
                                Arraste a imagem no preview para reposicionar
                            </p>
                        </div>

                    </div>
                </div>

                {/* Buy CTA */}
                <div className="px-6 py-5 border-t border-black/5 dark:border-white/5 bg-white dark:bg-[#0d0d0d]">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-[12px] text-foreground/40">Total</p>
                            <p className="text-xl font-bold">R$ 89,90</p>
                        </div>
                        <p className="text-[11px] text-foreground/40 text-right">Frete calculado<br />no checkout</p>
                    </div>
                    <Button className="w-full h-12 rounded-xl bg-foreground hover:bg-foreground/90 text-background text-[13px] font-semibold tracking-wide transition-all hover:scale-[1.01] active:scale-[0.99] gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Adicionar ao Carrinho
                    </Button>
                    <p className="text-center text-[10px] text-foreground/30 mt-3">
                        Produção em 2-3 dias úteis
                    </p>
                </div>

            </div>
        </div>
    );
}
