import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight, TrendingDown, PiggyBank, AlertTriangle } from "lucide-react";
import NeumorphicCard from "./NeumorphicCard";

export default function SuggestionsPanel() {
  const suggestions = [
    {
      id: 1,
      type: "warning",
      icon: AlertTriangle,
      title: "Gasto com Cartão",
      message: "Você está gastando mais de 35% da sua renda com cartão de crédito.",
      action: "Ver detalhes",
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      id: 2,
      type: "saving",
      icon: TrendingDown,
      title: "Oportunidade de Economia",
      message: "É possível economizar R$320/mês reduzindo gastos com delivery.",
      action: "Como economizar",
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      id: 3,
      type: "alert",
      icon: PiggyBank,
      title: "Reserva de Emergência",
      message: "Sua reserva de emergência está abaixo do ideal (2 meses cobertos).",
      action: "Planejar reserva",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          className="fixed bottom-24 right-4 md:bottom-8 md:right-8 rounded-full h-14 w-14 md:h-auto md:w-auto md:px-6 shadow-lg bg-gradient-to-r from-primary to-blue-600 hover:shadow-xl hover:scale-105 transition-all duration-300 z-40 flex items-center gap-2"
        >
          <Lightbulb className="h-6 w-6 text-white" />
          <span className="hidden md:inline text-white font-bold">Sugestões Inteligentes</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-background/95 backdrop-blur-xl border-l border-white/20">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold flex items-center gap-2 text-primary">
            <Lightbulb className="h-6 w-6 fill-current" />
            Sugestões Inteligentes
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col gap-4 overflow-y-auto h-[calc(100vh-120px)] pb-8">
          <p className="text-muted-foreground mb-2">
            Analisamos seus dados e encontramos algumas oportunidades para melhorar sua saúde financeira.
          </p>
          
          {suggestions.map((suggestion) => (
            <NeumorphicCard 
              key={suggestion.id} 
              variant="convex" 
              className="p-5 hover:translate-y-[-2px] transition-transform duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${suggestion.bg} ${suggestion.color}`}>
                  <suggestion.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg mb-1 ${suggestion.color}`}>{suggestion.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {suggestion.message}
                  </p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-semibold text-primary hover:text-primary/80 hover:bg-transparent flex items-center gap-1 group">
                    {suggestion.action}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </NeumorphicCard>
          ))}
          
          <div className="mt-4 p-4 rounded-xl bg-secondary/50 border border-dashed border-primary/20 text-center">
            <p className="text-sm text-muted-foreground">
              Novas sugestões aparecerão conforme você usa o app.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
