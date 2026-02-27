"use client";

import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Group } from "react-konva";
import useImage from "use-image";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, RotateCw, Upload, Download } from "lucide-react";
import { toast } from "sonner";
import Konva from "konva";

interface CanvasEditorProps {
    modelName: string;
    maskUrl: string; // The URL for the phone case mask (with a transparent hole where the art goes, or just an overlay)
}

export default function CanvasEditor({ modelName, maskUrl }: CanvasEditorProps) {
    const [isClient, setIsClient] = useState(false);
    const [userImageSrc, setUserImageSrc] = useState<string | null>(null);

    // Imagens do Konva
    const [userImage] = useImage(userImageSrc || "", "anonymous");
    // Para fins de demonstração, se não tiver maskUrl, usamos um mockup padrão
    const [maskImage] = useImage(maskUrl || "https://placehold.co/300x600/transparent/00A86B?text=Mask", "anonymous");

    // Transform states
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 150, y: 300 }); // Center of a 300x600 canvas approx
    const [rotation, setRotation] = useState(0);

    const stageRef = useRef<Konva.Stage>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                toast.error("Por favor, envie apenas imagens (PNG, JPG, WEBP).");
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setUserImageSrc(reader.result as string);
                // Reset transforms
                setScale(1);
                setRotation(0);
                setPosition({ x: 150, y: 300 });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleZoom = (direction: 'in' | 'out') => {
        setScale((prev) => Math.max(0.1, Math.min(prev + (direction === 'in' ? 0.1 : -0.1), 3)));
    };

    const handleRotate = (direction: 'cw' | 'ccw') => {
        setRotation((prev) => prev + (direction === 'cw' ? 90 : -90));
    };

    const handleDownloadPreview = () => {
        if (!stageRef.current) return;
        const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
        // In a real app, this would be sent to the server or cart
        const link = document.createElement("a");
        link.download = `preview-${modelName.toLowerCase().replace(/\s+/g, '-')}.png`;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Preview gerado e baixado com sucesso!");
    };

    if (!isClient) return <div className="w-[300px] h-[600px] bg-muted animate-pulse rounded-3xl" />;

    return (
        <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
            {/* Área da Esquerda: O Editor Canvas */}
            <div className="relative border-4 border-muted rounded-[3rem] overflow-hidden bg-white shadow-xl flex items-center justify-center p-2">
                {/* We use a fixed internal resolution for the case mask */}
                <Stage width={300} height={600} ref={stageRef}>
                    <Layer>
                        {/* Imagem do Usuário (Fundo) */}
                        {userImage && (
                            <Group
                                x={position.x}
                                y={position.y}
                                draggable
                                onDragEnd={(e) => {
                                    setPosition({ x: e.target.x(), y: e.target.y() });
                                }}
                            >
                                <KonvaImage
                                    image={userImage}
                                    offsetX={userImage.width / 2}
                                    offsetY={userImage.height / 2}
                                    scaleX={scale}
                                    scaleY={scale}
                                    rotation={rotation}
                                />
                            </Group>
                        )}

                        {/* A Máscara / Overlay da Capinha por cima */}
                        {maskImage && (
                            <KonvaImage
                                image={maskImage}
                                width={300}
                                height={600}
                                listening={false} // Deixa os eventos de mouse passarem através dela
                                opacity={0.9} // Slight transparency to simulate reflection
                            />
                        )}
                    </Layer>
                </Stage>
            </div>

            {/* Área da Direita: Controles */}
            <div className="flex flex-col gap-6 w-full max-w-sm bg-card p-6 rounded-2xl border shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold mb-1">Mockup Editor</h2>
                    <p className="text-muted-foreground text-sm">Ajuste sua imagem para o modelo: <strong>{modelName}</strong></p>
                </div>

                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleUpload}
                />

                <Button onClick={() => fileInputRef.current?.click()} className="w-full h-12 text-md" variant={userImage ? "outline" : "default"}>
                    <Upload className="w-5 h-5 mr-2" />
                    {userImage ? "Trocar Imagem" : "Fazer Upload da Imagem"}
                </Button>

                {userImageSrc && (
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-sm font-semibold">Tamanho (Zoom)</label>
                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="icon" onClick={() => handleZoom('out')}>
                                    <ZoomOut className="w-4 h-4" />
                                </Button>
                                <input
                                    type="range"
                                    min="0.1" max="3" step="0.05"
                                    value={scale}
                                    onChange={(e) => setScale(parseFloat(e.target.value))}
                                    className="flex-1 accent-primary"
                                />
                                <Button variant="outline" size="icon" onClick={() => handleZoom('in')}>
                                    <ZoomIn className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-semibold">Rotação</label>
                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="icon" onClick={() => handleRotate('ccw')} className="flex-1">
                                    <RotateCcw className="w-4 h-4 mr-2" /> -90°
                                </Button>
                                <Button variant="outline" size="icon" onClick={() => handleRotate('cw')} className="flex-1">
                                    <RotateCw className="w-4 h-4 mr-2" /> +90°
                                </Button>
                            </div>
                        </div>

                        <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground">
                            <p>👉 <strong>Dica:</strong> Clique e arraste a imagem no celular ao lado para posicioná-la perfeitamente onde desejar.</p>
                        </div>

                        <Button onClick={handleDownloadPreview} className="w-full h-14 text-lg">
                            <Download className="w-5 h-5 mr-2" />
                            Aprovar Mockup
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
