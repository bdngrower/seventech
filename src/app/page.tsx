import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-foreground/10">

      {/* Brutalist / Minimalist Hero */}
      <section className="relative flex h-[90vh] min-h-[700px] w-full items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[#F5F5F7] dark:bg-[#000000] -z-10" />

        <div className="container relative z-10 mx-auto px-6 text-center mt-12">
          <h1 className="mx-auto max-w-4xl text-[10vw] font-bold leading-[0.85] tracking-tighter text-foreground md:text-[8vw] lg:text-[7rem]">
            Faça. <br className="md:hidden" />A Sua. <br className="md:hidden" />
            <span className="text-foreground/40 italic font-medium">Marcante.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-[15px] md:text-lg font-light tracking-wide text-foreground/60">
            O design que você imagina. A proteção que seu dispositivo precisa.
            Personalize sua própria capa protetora de grau militar no nosso estúdio 3D.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link href="/personalizar">
              <Button
                size="lg"
                className="h-14 rounded-full bg-foreground px-10 text-[13px] font-medium tracking-wide text-background hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-foreground/10"
              >
                Criar Agora <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link
              href="/produtos"
              className="group flex h-14 items-center justify-center rounded-full px-8 text-[13px] font-medium tracking-wide text-foreground hover:bg-foreground/[0.03] transition-colors"
            >
              Explorar Coleção
            </Link>
          </div>

          {/* Minimalist device mockup hint */}
          <div className="mt-20 mx-auto w-full max-w-[800px] h-[300px] rounded-t-[3rem] bg-gradient-to-t from-background to-transparent border-t border-x border-foreground/[0.05] relative overflow-hidden">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[240px] h-[400px] bg-foreground/5 rounded-[3rem] border-8 border-background shadow-2xl flex items-center justify-center">
              <span className="text-foreground/20 text-xs tracking-widest uppercase font-medium">Crie sua Arte</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition - Clean Grid */}
      <section className="w-full bg-background py-32 md:py-48 border-t border-foreground/[0.03]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-5">
              <div className="h-16 w-16 rounded-full bg-foreground/[0.03] flex items-center justify-center mb-2">
                <Sparkles className="h-6 w-6 text-foreground/80" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">Design Ilimitado</h3>
              <p className="text-[14px] leading-relaxed font-light text-foreground/60 max-w-[280px]">
                Upload de imagens, textos e padrões. Sua criatividade é o limite no nosso editor Studio.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-5">
              <div className="h-16 w-16 rounded-full bg-foreground/[0.03] flex items-center justify-center mb-2">
                <ShieldCheck className="h-6 w-6 text-foreground/80" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">Ultra Proteção</h3>
              <p className="text-[14px] leading-relaxed font-light text-foreground/60 max-w-[280px]">
                Laterais absorventes de impacto tátil e fundo rígido resistente a riscos.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-5">
              <div className="h-16 w-16 rounded-full bg-foreground/[0.03] flex items-center justify-center mb-2">
                <Zap className="h-6 w-6 text-foreground/80" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">Impressão HD</h3>
              <p className="text-[14px] leading-relaxed font-light text-foreground/60 max-w-[280px]">
                Cores precisas e vibrantes aplicadas diretamente na superfície com cura UV de alta durabilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured / Bestsellers Minimalist Section */}
      <section className="relative w-full overflow-hidden bg-[#F5F5F7] dark:bg-[#0A0A0A] py-32 md:py-48">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-20 flex flex-col items-end md:flex-row md:justify-between md:items-end gap-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground max-w-md">
              Coleções Especiais.
            </h2>
            <Link
              href="/produtos"
              className="text-[13px] uppercase tracking-widest font-medium text-foreground hover:opacity-70 transition-opacity border-b border-foreground/20 pb-1"
            >
              Ver Todas
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Produto 1 */}
            <Link href="/produto/case-carbon-black" className="group block">
              <div className="aspect-[4/5] bg-background rounded-3xl overflow-hidden relative mb-6">
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/[0.02] group-hover:bg-foreground/[0.05] transition-colors duration-500">
                  <div className="w-[180px] h-[360px] bg-black rounded-[2.5rem] shadow-2xl transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-3" />
                </div>
              </div>
              <div className="flex justify-between items-start px-2">
                <div>
                  <h3 className="text-base font-semibold text-foreground tracking-tight">Onyx Black</h3>
                  <p className="text-[13px] text-foreground/50 font-light mt-1">Série Minimal</p>
                </div>
                <span className="text-[13px] font-medium tracking-wide">R$ 149</span>
              </div>
            </Link>

            {/* Produto 2 */}
            <Link href="/produto/case-clear-magsafe" className="group block">
              <div className="aspect-[4/5] bg-background rounded-3xl overflow-hidden relative mb-6">
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/[0.02] group-hover:bg-foreground/[0.05] transition-colors duration-500">
                  <div className="w-[180px] h-[360px] bg-transparent border-2 border-foreground/10 rounded-[2.5rem] shadow-lg transition-transform duration-700 group-hover:scale-105 group-hover:rotate-3 backdrop-blur-md" />
                </div>
                <div className="absolute top-6 left-6 bg-foreground text-background text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  Bestseller
                </div>
              </div>
              <div className="flex justify-between items-start px-2">
                <div>
                  <h3 className="text-base font-semibold text-foreground tracking-tight">Clear Glass</h3>
                  <p className="text-[13px] text-foreground/50 font-light mt-1">Série Transparente</p>
                </div>
                <span className="text-[13px] font-medium tracking-wide">R$ 129</span>
              </div>
            </Link>

            {/* Produto 3 */}
            <Link href="/produto/case-leather-brown" className="group block hidden lg:block">
              <div className="aspect-[4/5] bg-background rounded-3xl overflow-hidden relative mb-6">
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/[0.02] group-hover:bg-foreground/[0.05] transition-colors duration-500">
                  <div className="w-[180px] h-[360px] bg-[#8B5A2B] rounded-[2.5rem] shadow-2xl transition-transform duration-700 group-hover:scale-110" />
                </div>
              </div>
              <div className="flex justify-between items-start px-2">
                <div>
                  <h3 className="text-base font-semibold text-foreground tracking-tight">Saddle Brown</h3>
                  <p className="text-[13px] text-foreground/50 font-light mt-1">Série Couro</p>
                </div>
                <span className="text-[13px] font-medium tracking-wide">R$ 189</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
