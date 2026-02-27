"use client";

import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Use dynamic import so it's strictly Client Side, avoiding 'canvas' node global errors
const CanvasEditor = dynamic(() => import("@/components/customizer/CanvasEditor"), {
    ssr: false,
    loading: () => <div className="w-[300px] h-[600px] bg-muted animate-pulse rounded-3xl mx-auto" />
});

function PersonalizarContent() {
    const searchParams = useSearchParams();
    const modelQuery = searchParams.get("model");

    const modelName = modelQuery || "iPhone 15 Pro Max";
    // In a real app we would query the DB for the mask url
    const maskUrl = "https://placehold.co/300x600/transparent/00A86B?text=Overlay";

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Personalize sua Capinha</h1>
                <p className="text-muted-foreground mt-2">Envie sua imagem, ajuste e veja o preview realista instantâneo.</p>
            </div>

            <CanvasEditor modelName={modelName} maskUrl={maskUrl} />
        </div>
    );
}

export default function PersonalizarPage() {
    return (
        <Suspense fallback={<div className="container mx-auto py-12 text-center text-muted-foreground">Carregando editor...</div>}>
            <PersonalizarContent />
        </Suspense>
    );
}
