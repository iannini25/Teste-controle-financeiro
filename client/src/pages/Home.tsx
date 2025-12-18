import Layout from "@/components/Layout";
import FinancialHealthIndicator from "@/components/FinancialHealthIndicator";
import SuggestionsPanel from "@/components/SuggestionsPanel";
import NeumorphicCard from "@/components/NeumorphicCard";
import { ArrowUp, ArrowDown, Wallet, CreditCard, DollarSign } from "lucide-react";

export default function Home() {
  // Mock data
  const financialData = {
    income: 5200.00,
    expenses: 3850.50,
    balance: 1349.50,
    healthScore: 78,
    status: "healthy" as const,
  };

  return (
    <Layout>
      <div className="flex flex-col gap-8 pb-20">
        {/* Header */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">Olá, Usuário</h1>
            <p className="text-muted-foreground">Aqui está seu resumo financeiro.</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden border-2 border-white shadow-sm">
            <img src="/images/glass-icons.png" alt="Profile" className="w-full h-full object-cover scale-150 translate-y-1" />
          </div>
        </header>

        {/* Main Indicator */}
        <section className="flex justify-center">
          <FinancialHealthIndicator status={financialData.status} score={financialData.healthScore} />
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-2 gap-4">
          <NeumorphicCard className="p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-emerald-600 mb-1">
              <div className="p-1.5 rounded-full bg-emerald-100">
                <ArrowUp size={16} />
              </div>
              <span className="text-xs font-bold uppercase">Entradas</span>
            </div>
            <span className="text-xl font-bold text-foreground">
              R$ {financialData.income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-rose-600 mb-1">
              <div className="p-1.5 rounded-full bg-rose-100">
                <ArrowDown size={16} />
              </div>
              <span className="text-xs font-bold uppercase">Saídas</span>
            </div>
            <span className="text-xl font-bold text-foreground">
              R$ {financialData.expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </NeumorphicCard>
        </section>

        {/* Balance Card */}
        <NeumorphicCard variant="convex" className="p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Wallet size={100} />
          </div>
          <div className="relative z-10">
            <span className="text-sm font-medium text-muted-foreground">Saldo Atual</span>
            <h2 className="text-3xl font-bold text-primary mt-1 mb-4">
              R$ {financialData.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h2>
            <div className="flex gap-3">
              <button className="flex-1 py-2 px-4 rounded-xl bg-primary text-primary-foreground font-medium text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all active:translate-y-0 active:shadow-sm">
                Adicionar Receita
              </button>
              <button className="flex-1 py-2 px-4 rounded-xl bg-white text-foreground font-medium text-sm border border-border shadow-sm hover:bg-secondary transition-colors">
                Adicionar Gasto
              </button>
            </div>
          </div>
        </NeumorphicCard>

        {/* Categories Preview */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Gastos por Categoria</h3>
            <button className="text-sm text-primary font-medium hover:underline">Ver tudo</button>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { icon: CreditCard, label: "Cartão de Crédito", value: 1250.00, color: "bg-purple-500" },
              { icon: DollarSign, label: "Contas Fixas", value: 980.50, color: "bg-blue-500" },
              { icon: Wallet, label: "Lazer", value: 450.00, color: "bg-amber-500" },
            ].map((item, i) => (
              <NeumorphicCard key={i} className="p-3 flex items-center justify-between hover:bg-white/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center text-white shadow-md`}>
                    <item.icon size={20} />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
                <span className="font-bold text-muted-foreground">
                  R$ {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </NeumorphicCard>
            ))}
          </div>
        </section>
      </div>
      
      <SuggestionsPanel />
    </Layout>
  );
}
