"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ZoomIn, ZoomOut, Upload, Smartphone, Type, Image as ImageIcon, Trash2, CheckCircle2, ChevronDown, Check } from "lucide-react";
import Link from "next/link";

// Dynamic import with custom type props
const PhoneCustomizerCanvas = dynamic(
    () => import("@/components/customizer/PhoneCustomizerCanvas"),
    { ssr: false, loading: () => <div className="w-[300px] h-[600px] rounded-[40px] bg-neutral-200 dark:bg-neutral-800 animate-pulse" /> }
);

// Tipagem baseada no Canvas
type CustomElement = {
    id: string;
    type: 'image' | 'text';
    url?: string;
    text?: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    rotation: number;
    fill?: string;
    fontSize?: number;
    fontFamily?: string;
};

const PHONE_MODELS = [
    { id: "iph-17-pm", name: "iPhone 17 Pro Max", brand: "Apple" },
    { id: "iph-16-pm", name: "iPhone 16 Pro Max", brand: "Apple" },
    { id: "iph-15-pm", name: "iPhone 15 Pro Max", brand: "Apple" },
    { id: "gal-s24-u", name: "Galaxy S24 Ultra", brand: "Samsung" },
];

const CASE_COLORS = [
    { id: "transparent", hex: "transparent", name: "Transparente" },
    { id: "black", hex: "#1a1a1a", name: "Preto" },
    { id: "white", hex: "#f5f5f5", name: "Branco" },
    { id: "pink", hex: "#fce4ec", name: "Rosa" },
];

const TEXT_COLORS = ["#000000", "#ffffff", "#ff0000", "#0000ff", "#ff00ff", "#ffd700", "#00ff00"];

export default function PersonalizarPage() {
    const [scale, setScale] = useState(1);

    // Editor State
    const [elements, setElements] = useState<CustomElement[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // UI State
    const [selectedModel, setSelectedModel] = useState(PHONE_MODELS[0]);
    const [selectedColor, setSelectedColor] = useState(CASE_COLORS[0]);
    const [activeTab, setActiveTab] = useState<'model' | 'add' | 'edit'>('model');

    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- Actions ---

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newId = `img-${Date.now()}`;
                setElements([
                    ...elements,
                    {
                        id: newId,
                        type: 'image',
                        url: e.target?.result as string,
                        x: 50,
                        y: 100,
                        width: 200,
                        height: 200,
                        rotation: 0
                    }
                ]);
                setSelectedId(newId);
                setActiveTab('edit');
            };
            reader.readAsDataURL(file);
        }
    };

    const addText = () => {
        const newId = `txt-${Date.now()}`;
        setElements([
            ...elements,
            {
                id: newId,
                type: 'text',
                text: 'Seu Texto',
                fontSize: 32,
                fontFamily: 'Inter, sans-serif',
                fill: '#000000',
                x: 50,
                y: 200,
                rotation: 0
            }
        ]);
        setSelectedId(newId);
        setActiveTab('edit');
    };

    const deleteSelected = () => {
        if (!selectedId) return;
        setElements(elements.filter(el => el.id !== selectedId));
        setSelectedId(null);
        setActiveTab('add');
    };

    const updateSelectedText = (val: string) => {
        setElements(elements.map(el => el.id === selectedId ? { ...el, text: val } : el));
    };

    const updateSelectedTextColor = (color: string) => {
        setElements(elements.map(el => el.id === selectedId ? { ...el, fill: color } : el));
    };

    const selectedElement = elements.find(el => el.id === selectedId);

    // Auto-switch to Add tab if we deselect
    useEffect(() => {
        if (!selectedId && activeTab === 'edit') {
            setActiveTab('add');
        }
        if (selectedId && activeTab !== 'edit') {
            setActiveTab('edit');
        }
    }, [selectedId, activeTab]);

    return (
        <div className="flex flex-col md:flex-row h-screen bg-[#F0F0F0] dark:bg-[#0A0A0A] overflow-hidden">

            {/* ====== HEADER MOBILE ====== */}
            <div className="md:hidden flex items-center justify-between p-4 bg-background z-20 shadow-sm">
                <Link href="/">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div className="text-sm font-semibold tracking-wide">ESTÚDIO</div>
                <div className="w-8" />
            </div>

            {/* ====== CANVAS AREA (Left) ====== */}
            <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden">

                {/* Transparent Desktop View Back Arrow */}
                <div className="absolute top-6 left-6 z-20 hidden md:block">
                    <Link href="/">
                        <Button variant="outline" className="rounded-full bg-background/50 backdrop-blur-md border-black/10 gap-2 font-medium tracking-wide">
                            <ArrowLeft className="w-4 h-4" /> Voltar
                        </Button>
                    </Link>
                </div>

                <div
                    className="transition-transform duration-300 ease-out flex items-center justify-center h-full w-full py-12"
                    style={{ transform: `scale(${scale})` }}
                >
                    <div className="relative">
                        {/* Shadow to make it pop */}
                        <div className="absolute -inset-2 bg-black/[0.05] dark:bg-white/[0.02] rounded-[48px] blur-xl" />

                        <div className="relative rounded-[40px] shadow-2xl bg-white dark:bg-black border border-black/5 dark:border-white/10 overflow-hidden">
                            <PhoneCustomizerCanvas
                                width={300}
                                height={600}
                                elements={elements}
                                setElements={setElements}
                                caseColor={selectedColor.hex}
                                selectedId={selectedId}
                                setSelectedId={setSelectedId}
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Canvas Controls */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background/80 backdrop-blur-xl p-1.5 rounded-full border border-black/5 dark:border-white/10 shadow-lg">
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={() => setScale(s => Math.max(0.5, s - 0.1))}>
                        <ZoomOut className="w-4 h-4" />
                    </Button>
                    <span className="text-[11px] font-mono w-10 text-center">{Math.round(scale * 100)}%</span>
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={() => setScale(s => Math.min(2, s + 0.1))}>
                        <ZoomIn className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* ====== SIDEBAR (Right) ====== */}
            <div className="w-full md:w-[400px] flex flex-col bg-white dark:bg-[#111] shadow-2xl relative z-30">

                {/* Product Meta */}
                <div className="p-6 border-b border-black/5 dark:border-white/5">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Capa Personalizada</h2>
                            <p className="text-sm text-foreground/50">{selectedModel.name}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold">R$ 89</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-black/5 dark:border-white/5">
                    <button
                        onClick={() => setActiveTab('model')}
                        className={`flex-1 py-3 text-[12px] font-semibold tracking-wider uppercase transition-colors ${activeTab === 'model' ? 'border-b-2 border-foreground text-foreground' : 'text-foreground/40 hover:text-foreground/80'}`}
                    >
                        Capa
                    </button>
                    <button
                        onClick={() => setActiveTab('add')}
                        className={`flex-1 py-3 text-[12px] font-semibold tracking-wider uppercase transition-colors ${activeTab === 'add' ? 'border-b-2 border-foreground text-foreground' : 'text-foreground/40 hover:text-foreground/80'}`}
                    >
                        Adicionar
                    </button>
                    <button
                        onClick={() => { if (selectedId) setActiveTab('edit') }}
                        className={`flex-1 py-3 text-[12px] font-semibold tracking-wider uppercase transition-colors ${activeTab === 'edit' ? 'border-b-2 border-foreground text-foreground' : 'text-foreground/40 hover:text-foreground/80'} ${!selectedId && 'opacity-30 cursor-not-allowed'}`}
                    >
                        Editar
                    </button>
                </div>

                {/* Scrollable Panel */}
                <div className="flex-1 overflow-y-auto p-6">

                    {/* Tab 1: CAPA */}
                    {activeTab === 'model' && (
                        <div className="space-y-8">
                            {/* Device */}
                            <div className="space-y-3">
                                <label className="text-[11px] uppercase tracking-widest font-bold text-foreground/50">Modelo do Celular</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {PHONE_MODELS.map(model => (
                                        <button
                                            key={model.id}
                                            onClick={() => setSelectedModel(model)}
                                            className={`p-3 rounded-xl border text-left flex justify-between items-center transition-all ${selectedModel.id === model.id ? 'border-foreground bg-foreground/[0.02]' : 'border-black/10 dark:border-white/10 hover:border-black/30'
                                                }`}
                                        >
                                            <span className="text-sm font-medium">{model.name}</span>
                                            {selectedModel.id === model.id && <CheckCircle2 className="w-4 h-4 text-foreground" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Case Cor */}
                            <div className="space-y-3">
                                <label className="text-[11px] uppercase tracking-widest font-bold text-foreground/50">Estilo / Cor da Capa</label>
                                <div className="flex gap-3">
                                    {CASE_COLORS.map(color => (
                                        <button
                                            key={color.id}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center p-0.5 transition-all ${selectedColor.id === color.id ? 'border-foreground scale-110' : 'border-transparent hover:scale-105'
                                                }`}
                                        >
                                            <div
                                                className="w-full h-full rounded-full border border-black/10 dark:border-white/10"
                                                style={{
                                                    backgroundColor: color.hex === "transparent" ? "#eaeaea" : color.hex,
                                                    backgroundImage: color.hex === "transparent" ? "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.05) 5px, rgba(0,0,0,0.05) 10px)" : undefined
                                                }}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <p className="text-[12px] text-foreground/60">{selectedColor.name}</p>
                            </div>
                        </div>
                    )}

                    {/* Tab 2: ADICIONAR */}
                    {activeTab === 'add' && (
                        <div className="space-y-4">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                accept="image/png, image/jpeg, image/webp"
                                className="hidden"
                            />

                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full h-32 rounded-2xl border border-dashed border-black/20 dark:border-white/20 bg-foreground/[0.01] hover:bg-foreground/[0.04] transition-colors flex flex-col items-center justify-center gap-2"
                            >
                                <ImageIcon className="w-6 h-6 text-foreground/60" />
                                <span className="text-sm font-semibold">Adicionar Foto/Imagem</span>
                                <span className="text-[11px] text-foreground/40">PNG, JPG até 10MB</span>
                            </button>

                            <button
                                onClick={addText}
                                className="w-full py-4 rounded-xl border border-black/5 dark:border-white/5 bg-foreground/[0.02] hover:bg-foreground/[0.05] transition-colors flex items-center justify-center gap-2"
                            >
                                <Type className="w-5 h-5 text-foreground/60" />
                                <span className="text-sm font-semibold">Adicionar Texto</span>
                            </button>

                            <div className="pt-8 text-center px-4">
                                <p className="text-[13px] text-foreground/50 leading-relaxed">
                                    Utilize os dedos ou o mouse para <b>rotacionar</b>, <b>escalar</b> e <b>mover</b> as imagens e textos adicionados diretamente na capa.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Tab 3: EDITAR ELEMENTO */}
                    {activeTab === 'edit' && selectedElement && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">

                            {selectedElement.type === 'image' && (
                                <div className="space-y-4">
                                    <div className="p-4 bg-muted rounded-xl text-center">
                                        <p className="text-sm font-medium">Imagem Selecionada</p>
                                        <p className="text-[11px] text-foreground/50 mt-1">Use os controles no Canvas para dimensionar e girar.</p>
                                    </div>
                                </div>
                            )}

                            {selectedElement.type === 'text' && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[11px] uppercase tracking-widest font-bold text-foreground/50">Texto</label>
                                        <input
                                            type="text"
                                            value={selectedElement.text}
                                            onChange={(e) => updateSelectedText(e.target.value)}
                                            className="w-full bg-background border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] uppercase tracking-widest font-bold text-foreground/50">Cor da Fonte</label>
                                        <div className="flex flex-wrap gap-3">
                                            {TEXT_COLORS.map(color => (
                                                <button
                                                    key={color}
                                                    onClick={() => updateSelectedTextColor(color)}
                                                    className="w-8 h-8 rounded-full border border-black/10 shadow-sm flex items-center justify-center"
                                                    style={{ backgroundColor: color }}
                                                >
                                                    {selectedElement.fill === color && <Check className={`w-4 h-4 ${color === '#ffffff' ? 'text-black' : 'text-white'}`} />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="pt-6 border-t border-black/5 dark:border-white/5">
                                <Button
                                    variant="destructive"
                                    className="w-full rounded-xl gap-2"
                                    onClick={deleteSelected}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Remover Elemento
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer / Buy Action */}
                <div className="p-6 border-t border-black/5 dark:border-white/5 bg-background">
                    <Button className="w-full h-14 rounded-2xl bg-foreground text-background font-bold tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all">
                        Finalizar e Comprar (R$ 89,90)
                    </Button>
                </div>

            </div>
        </div>
    );
}
