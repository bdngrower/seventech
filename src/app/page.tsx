import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Truck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-accent selection:text-white">
      {/* 1. Hero Section - Minimalist & Glassy */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
        {/* Soft dynamic gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background z-0" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl opacity-50 mix-blend-multiply" />

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center space-y-10">
          <div className="inline-flex items-center rounded-full border border-border bg-white/50 backdrop-blur-md px-4 py-1.5 text-sm font-medium transition-colors hover:bg-white/80 dark:bg-black/50 dark:hover:bg-black/80">
            <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
            Nova Coleção: Capinhas Anti-Impacto Premium
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground max-w-5xl leading-[1.1]">
            Proteção invisível.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/70">
              Personalidade única.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light">
            Crie capinhas exclusivas com a sua arte. Proteção premium militar com um visual minimalista e de alto padrão.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-8 w-full sm:w-auto">
            <Link href="/personalizar" className="w-full sm:w-auto">
              <Button size="lg" className="text-lg px-10 py-7 h-auto w-full rounded-2xl gap-3 group bg-foreground text-background hover:bg-foreground/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                Personalizar Agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Minimal Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-16 text-sm font-medium text-muted-foreground uppercase tracking-widest">
            <div className="flex flex-col items-center justify-center gap-3">
              <Shield className="w-6 h-6 text-foreground" strokeWidth={1.5} />
              <span>Grau Militar</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              <Zap className="w-6 h-6 text-foreground" strokeWidth={1.5} />
              <span>Impressão 4K</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              <Truck className="w-6 h-6 text-foreground" strokeWidth={1.5} />
              <span>Frete Expresso</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Seleção de Modelos - Em Cards "Glass" */}
      <section className="py-32 bg-card relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                Feito para o seu aparelho
              </h2>
              <p className="text-xl text-muted-foreground font-light">
                Modelagem perfeita em silicone premium e policarbonato para os principais smartphones do mercado.
              </p>
            </div>
            <Button variant="ghost" className="text-foreground font-semibold text-lg group hidden md:flex">
              Ver todos os modelos <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["iPhone 15 Pro Max", "Galaxy S24 Ultra", "iPhone 14 Pro", "Galaxy S23"].map((model, i) => (
              <Link key={i} href={`/personalizar?model=${encodeURIComponent(model)}`} className="group block h-full">
                <div className="flex flex-col h-full bg-background/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 hover:bg-background hover:border-foreground/20 hover:shadow-2xl transition-all duration-500 cursor-pointer">
                  {/* Minimal Phone Mockup representation */}
                  <div className="flex-1 flex items-center justify-center py-12">
                    <div className="w-24 h-48 rounded-[2.5rem] border-[6px] border-muted group-hover:border-accent/40 bg-card shadow-inner transition-colors duration-500 relative flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm flex items-center justify-center absolute -right-4 -bottom-4 shadow-sm group-hover:scale-110 transition-transform">
                        <span className="text-xs font-bold text-foreground">🖌️</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-border/50">
                    <h3 className="font-bold text-xl text-foreground group-hover:text-accent transition-colors">{model}</h3>
                    <p className="text-muted-foreground mt-2 font-medium">Personalize →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Button variant="ghost" className="mt-8 text-foreground font-semibold text-lg group md:hidden w-full flex justify-center">
            Ver todos os modelos <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* 3. Workflow Passo-a-Passo */}
      <section className="py-32 bg-background border-t border-border/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Design de nível estúdio, <br className="hidden md:block" />sem complicação.
              </h2>
              <div className="space-y-8">
                {[
                  { title: "Selecione o Modelo", desc: "Escolha entre nossa ampla gama de aparelhos suportados." },
                  { title: "Faça o Upload", desc: "Arraste sua foto, arte ou padronagem para o nosso estúdio virtual." },
                  { title: "Ajuste e Visualize", desc: "Tenha um preview 3D/HD instantâneo de como a case ficará." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 group cursor-default">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center text-foreground font-bold text-lg group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{step.title}</h3>
                      <p className="text-muted-foreground text-lg">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Abstract visual representation of the studio */}
            <div className="relative aspect-square rounded-[3rem] bg-muted overflow-hidden border border-border">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-card rounded-[2.5rem] shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white/20">
                <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest opacity-50">Interactive Studio Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer CTA */}
      <section className="py-24 bg-foreground text-background text-center">
        <div className="container mx-auto px-6 space-y-8">
          <h2 className="text-4xl font-bold">Pronto para começar?</h2>
          <Link href="/personalizar" className="inline-block relative">
            <Button size="lg" className="text-lg px-12 py-8 rounded-full bg-accent text-white hover:bg-accent/90 hover:scale-105 transition-all shadow-2xl shadow-accent/20">
              Criar Minha Capinha Personalizada
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
