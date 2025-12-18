import { useState } from "react";
import Layout from "@/components/Layout";
import NeumorphicCard from "@/components/NeumorphicCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { HelpCircle, Calculator, TrendingUp, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Impostos() {
  const [income, setIncome] = useState(5000);
  const [dependents, setDependents] = useState(0);
  const [healthExpenses, setHealthExpenses] = useState(0);
  const [educationExpenses, setEducationExpenses] = useState(0);

  // Simplified IR calculation logic (2024 rules approximation)
  const calculateIR = () => {
    const deductionPerDependent = 189.59;
    const baseIncome = income - (dependents * deductionPerDependent) - (healthExpenses / 12) - (educationExpenses / 12);
    
    let tax = 0;
    let bracket = "Isento";
    let rate = 0;

    if (baseIncome <= 2259.20) {
      tax = 0;
      bracket = "Isento";
      rate = 0;
    } else if (baseIncome <= 2826.65) {
      tax = (baseIncome * 0.075) - 169.44;
      bracket = "7,5%";
      rate = 7.5;
    } else if (baseIncome <= 3751.05) {
      tax = (baseIncome * 0.15) - 381.44;
      bracket = "15%";
      rate = 15;
    } else if (baseIncome <= 4664.68) {
      tax = (baseIncome * 0.225) - 662.77;
      bracket = "22,5%";
      rate = 22.5;
    } else {
      tax = (baseIncome * 0.275) - 896.00;
      bracket = "27,5%";
      rate = 27.5;
    }

    return {
      monthlyTax: Math.max(0, tax),
      annualTax: Math.max(0, tax * 13), // Including 13th salary approx
      bracket,
      rate,
      effectiveRate: (Math.max(0, tax) / income) * 100
    };
  };

  const result = calculateIR();

  return (
    <Layout>
      <div className="flex flex-col gap-6 pb-20">
        <header>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            Calculadora de Impostos
          </h1>
          <p className="text-muted-foreground mt-1">
            Entenda quanto você paga de Leão e planeje sua restituição.
          </p>
        </header>

        {/* Main Calculator */}
        <NeumorphicCard className="p-6">
          <div className="flex flex-col gap-6">
            {/* Income Input */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-base font-semibold flex items-center gap-2">
                  Renda Mensal Bruta
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle size={16} className="text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Seu salário antes dos descontos. Inclua salário, aluguéis recebidos, etc.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <span className="text-primary font-bold">R$ {income.toLocaleString('pt-BR')}</span>
              </div>
              <Slider 
                value={[income]} 
                min={1500} 
                max={30000} 
                step={100} 
                onValueChange={(val) => setIncome(val[0])}
                className="py-2"
              />
            </div>

            {/* Dependents */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-base font-semibold">Dependentes</Label>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => setDependents(Math.max(0, dependents - 1))}
                  >
                    -
                  </Button>
                  <span className="w-4 text-center font-bold">{dependents}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => setDependents(dependents + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Gastos com Saúde (Mês)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                  <Input 
                    type="number" 
                    value={healthExpenses} 
                    onChange={(e) => setHealthExpenses(Number(e.target.value))}
                    className="pl-8 bg-secondary/30 border-transparent focus:bg-white transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Gastos com Educação (Mês)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                  <Input 
                    type="number" 
                    value={educationExpenses} 
                    onChange={(e) => setEducationExpenses(Number(e.target.value))}
                    className="pl-8 bg-secondary/30 border-transparent focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </NeumorphicCard>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NeumorphicCard variant="convex" className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">Estimativa Mensal</h3>
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-bold text-foreground">
                R$ {result.monthlyTax.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-sm text-muted-foreground">
                Alíquota efetiva: <strong className="text-foreground">{result.effectiveRate.toFixed(1)}%</strong> (Faixa: {result.bracket})
              </span>
            </div>
            
            <div className="mt-6 p-3 bg-white/50 rounded-xl border border-white/50 flex gap-3 items-start">
              <AlertCircle className="text-primary shrink-0 mt-0.5" size={18} />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Este valor é retido na fonte ou pago via Carnê-Leão. Gastos com saúde e educação podem reduzir este valor na declaração anual.
              </p>
            </div>
          </NeumorphicCard>

          <NeumorphicCard className="p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Projeção Anual</h3>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="text-emerald-500" />
                <span className="text-2xl font-bold">
                  R$ {result.annualTax.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Total estimado de imposto em 1 ano.</p>
            </div>
            
            <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200">
              Ver como pagar menos
            </Button>
          </NeumorphicCard>
        </div>

        {/* Educational Section */}
        <section>
          <h3 className="font-bold text-lg mb-4">Entenda seus Impostos</h3>
          <div className="grid gap-3">
            {[
              { title: "O que é a Alíquota Efetiva?", desc: "É a porcentagem real do seu salário que vai para o imposto, que é sempre menor que a faixa da tabela." },
              { title: "Deduções Legais", desc: "Gastos que o governo aceita para abater do seu imposto, como médicos, dentistas, psicólogos e escolas." },
              { title: "Restituição", desc: "Se você pagou mais imposto do que devia durante o ano, o governo devolve a diferença." }
            ].map((item, i) => (
              <NeumorphicCard key={i} className="p-4">
                <h4 className="font-bold text-primary mb-1 flex items-center gap-2">
                  <HelpCircle size={16} />
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </NeumorphicCard>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
