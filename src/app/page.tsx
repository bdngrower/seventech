import Link from "next/link";
import { ArrowRight, CheckCircle2, Star, Shield, Truck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-black z-0" />
        {/* Placeholder para uma imagem de fundo ou vídeo. Vamos usar um padrão sutil. */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 z-0 mix-blend-overlay" />

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl">
            Sua Personalidade, <br />
            <span className="text-primary">Na Palma da Mão.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
            Crie capinhas exclusivas com a sua arte, fotos ou design favorito. Proteção premium com um visual que é só seu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/personalizar">
              <Button size="lg" className="text-lg px-8 py-6 h-auto w-full sm:w-auto gap-2 group">
                Crie sua capinha personalizada
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/produtos">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto w-full sm:w-auto bg-transparent border-gray-600 text-white hover:bg-white/10 hover:text-white">
                Ver Coleções
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm font-medium text-gray-300">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Proteção Anti-Impacto</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span>Impressão UV 4K</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              <span>Envio Expresso</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Modelos Disponíveis */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Modelos Disponíveis</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Temos capinhas para as principais marcas do mercado. Escolha a sua.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["iPhone 15 Pro Max", "Galaxy S24 Ultra", "iPhone 14 Pro", "Galaxy S23"].map((model, i) => (
              <Link key={i} href={`/personalizar?model=${encodeURIComponent(model)}`} className="group">
                <div className="flex flex-col items-center p-8 bg-background border rounded-2xl hover:border-primary hover:shadow-lg transition-all text-center gap-4">
                  {/* Mock placeholder for a phone silhouette */}
                  <div className="w-20 h-40 bg-muted rounded-[2rem] border-4 border-foreground/10 group-hover:border-primary/50 transition-colors flex items-center justify-center">
                    <span className="text-4xl">📱</span>
                  </div>
                  <h3 className="font-semibold">{model}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="link" className="text-primary font-semibold text-base">
              Ver todos os modelos <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Como Funciona */}
      <section className="py-24 bg-background border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Como Funciona?</h2>
            <p className="text-muted-foreground">Em apenas 3 passos você tem a capinha dos seus sonhos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-2xl font-bold">1</div>
              <h3 className="text-xl font-bold">Escolha seu modelo</h3>
              <p className="text-muted-foreground">Selecione a marca e o modelo exato do seu celular.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-2xl font-bold">2</div>
              <h3 className="text-xl font-bold">Envie sua arte</h3>
              <p className="text-muted-foreground">Faça o upload da sua imagem, ajuste, gire e aplique zoom até ficar perfeito.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-2xl font-bold">3</div>
              <h3 className="text-xl font-bold">Receba em casa</h3>
              <p className="text-muted-foreground">Nós imprimimos com tecnologia UV de alta resolução e enviamos para você.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Depoimentos */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">O que nossos clientes dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Mariana S.", text: "A qualidade da impressão é absurda! Ficou exatamente como no preview do site." },
              { name: "João V.", text: "Chegou super rápido. A capinha é bem resistente e as cores são super vivas." },
              { name: "Carla T.", text: "Amei a facilidade de criar o design pelo celular mesmo. Recomendo muito!" },
            ].map((review, i) => (
              <div key={i} className="bg-background p-8 rounded-2xl border shadow-sm">
                <div className="flex gap-1 mb-4 text-[#FFB800]">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-muted-foreground italic mb-6">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                    {review.name[0]}
                  </div>
                  <span className="font-bold">{review.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Dúvidas Frequentes</h2>
          <div className="space-y-6">
            {[
              { q: "Qual o material da capinha?", a: "Trabalhamos com TPU flexível nas bordas (para absorção de impacto) e policarbonato rígido na traseira, onde é feita a impressão UV." },
              { q: "A impressão desbota ou descasca?", a: "Não. Utilizamos tecnologia de impressão UV de alta durabilidade com cura instantânea, resistente a riscos e raios UV." },
              { q: "Qual o prazo de produção e entrega?", a: "Nosso prazo médio de produção é de 2 a 3 dias úteis. O prazo de entrega varia de acordo com o CEP e o método de envio (Correios ou Transportadora)." },
            ].map((faq, i) => (
              <div key={i} className="border rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
