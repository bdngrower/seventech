import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Zap, Droplets, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBFBFD] dark:bg-[#000000] selection:bg-foreground/10">

      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full pt-[140px] pb-24 md:pt-[180px] md:pb-32 overflow-hidden flex flex-col items-center text-center">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-[12px] md:text-[14px] uppercase tracking-[0.2em] font-bold text-foreground/50 mb-6">
            A Nova Geração
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-[90px] font-bold tracking-tight text-foreground leading-[1.05] max-w-5xl mx-auto">
            A sua história. <br />
            Na sua mão.
          </h1>
          <p className="mt-8 text-lg md:text-xl font-light text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Proteção de nível militar com o design que só você poderia criar.
            Bem-vindo ao estúdio de cases mais avançado da internet.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/personalizar">
              <Button size="lg" className="h-14 rounded-full bg-foreground text-background px-8 text-[15px] font-medium hover:scale-105 transition-transform">
                Criar a Minha Agora
              </Button>
            </Link>
            <Link href="/produtos">
              <Button size="lg" variant="outline" className="h-14 rounded-full px-8 text-[15px] font-medium bg-transparent border-foreground/20 hover:bg-foreground/5 transition-colors">
                Explorar Coleções <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image / 3D Mockup Area */}
        <div className="mt-16 md:mt-24 w-full max-w-[1200px] mx-auto px-6">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[40px] overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-2xl">
            {/* Using a high-quality placeholder image for the hero case showcase */}
            <Image
              src="https://images.unsplash.com/photo-1601593346740-925612772716?q=80&w=2600&auto=format&fit=crop"
              alt="Premium Phone Case Preview"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      </section>


      {/* ===== FEATURES GRID (Apple Style) ===== */}
      <section className="w-full py-24 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Menos plástico.<br /> Mais personalidade.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Feature 1 */}
            <div className="bg-[#f5f5f7] dark:bg-[#111111] rounded-[32px] p-10 md:p-14 flex flex-col items-center text-center overflow-hidden relative group">
              <div className="w-16 h-16 bg-white dark:bg-black rounded-2xl flex items-center justify-center shadow-sm mb-8 z-10">
                <Smartphone className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4 z-10">Feito para o seu aparelho</h3>
              <p className="text-foreground/60 font-medium z-10">Ajuste milimétrico para os principais modelos de iPhone e Galaxy do mercado. Bordas elevadas para tela e câmera.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#f5f5f7] dark:bg-[#111111] rounded-[32px] p-10 md:p-14 flex flex-col items-center text-center overflow-hidden relative">
              <div className="w-16 h-16 bg-white dark:bg-black rounded-2xl flex items-center justify-center shadow-sm mb-8 z-10">
                <ShieldCheck className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4 z-10">Armor Tech Pro</h3>
              <p className="text-foreground/60 font-medium z-10">Proteções em testes de queda de até 3 metros. Laterais em TPU flexível que absorvem impacto com excelência.</p>
            </div>

            {/* Feature 3 (Full Width) */}
            <div className="md:col-span-2 bg-[#f5f5f7] dark:bg-[#111111] rounded-[32px] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
              <div className="flex-1 text-left z-10">
                <div className="w-16 h-16 bg-white dark:bg-black rounded-2xl flex items-center justify-center shadow-sm mb-8">
                  <Zap className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">Suas Cores. Vivas.</h3>
                <p className="text-lg text-foreground/60 font-medium max-w-md">Impressão UV de altíssima definição que injeta a tinta nas fibras da capa. Não descasca, não desbota e mantém o brilho por anos.</p>
              </div>
              <div className="flex-1 relative w-full h-[300px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1541514757530-9b41e9d1bf72?q=80&w=800&auto=format&fit=crop"
                  alt="High Quality Print Detail"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ===== BESTSELLERS / CATEGORIES ===== */}
      <section className="w-full py-32 bg-[#FBFBFD] dark:bg-[#000000]">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Prontas para você.</h2>
            <Link href="/produtos" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              Ver todas as coleções <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product Card 1 */}
            <Link href="/produto/case-carbon" className="group">
              <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden bg-[#E2E2E6] dark:bg-[#1C1C1E] mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1586953208448-b95a79279fce?q=80&w=800&auto=format&fit=crop"
                  alt="Carbon Case"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="px-2">
                <span className="text-[11px] uppercase tracking-widest text-foreground/50 font-bold mb-2 block">Série Premium</span>
                <h3 className="text-xl font-bold text-foreground">Carbon Flow</h3>
                <p className="text-foreground/60 font-medium mt-1">R$ 149</p>
              </div>
            </Link>

            {/* Product Card 2 */}
            <Link href="/produto/case-clear" className="group">
              <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden bg-[#E2E2E6] dark:bg-[#1C1C1E] mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1620843437120-18C8B3f0E306?q=80&w=800&auto=format&fit=crop"
                  alt="Clear Case"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 bg-white dark:bg-black text-xs font-bold px-4 py-2 rounded-full">Bestseller</div>
              </div>
              <div className="px-2">
                <span className="text-[11px] uppercase tracking-widest text-foreground/50 font-bold mb-2 block">Série Transparente</span>
                <h3 className="text-xl font-bold text-foreground">Clear Pure</h3>
                <p className="text-foreground/60 font-medium mt-1">R$ 119</p>
              </div>
            </Link>

            {/* Product Card 3 */}
            <Link href="/personalizar" className="group">
              <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden bg-foreground text-background mb-6 flex flex-col items-center justify-center p-8 text-center group-hover:bg-foreground/90 transition-colors">
                <div className="w-16 h-16 rounded-full bg-background/10 flex items-center justify-center mb-6">
                  <Droplets className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Crie a sua.</h3>
                <p className="text-background/70 font-medium">Use fotos, textos e cores para montar uma capa 100% exclusiva.</p>
              </div>
              <div className="px-2">
                <span className="text-[11px] uppercase tracking-widest text-foreground/50 font-bold mb-2 block">Estúdio de Criação</span>
                <h3 className="text-xl font-bold text-foreground">Sua Capa Personalizada</h3>
                <p className="text-foreground/60 font-medium mt-1">A partir de R$ 89</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

