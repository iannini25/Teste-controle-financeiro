import Layout from "@/components/Layout";
import NeumorphicCard from "@/components/NeumorphicCard";
import { Progress } from "@/components/ui/progress";
import { Target, Plane, Car, Home } from "lucide-react";

export default function Planejamento() {
  const goals = [
    {
      id: 1,
      title: "Reserva de Emergência",
      icon: Target,
      current: 5000,
      target: 15000,
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
    },
    {
      id: 2,
      title: "Viagem de Férias",
      icon: Plane,
      current: 2500,
      target: 8000,
      color: "bg-blue-500",
      textColor: "text-blue-600",
    },
    {
      id: 3,
      title: "Trocar de Carro",
      icon: Car,
      current: 12000,
      target: 45000,
      color: "bg-purple-500",
      textColor: "text-purple-600",
    },
    {
      id: 4,
      title: "Entrada da Casa",
      icon: Home,
      current: 25000,
      target: 100000,
      color: "bg-amber-500",
      textColor: "text-amber-600",
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-6 pb-20">
        <header>
          <h1 className="text-2xl font-bold text-primary">Meus Objetivos</h1>
          <p className="text-muted-foreground">Transforme sonhos em metas.</p>
        </header>

        <div className="grid gap-4">
          {goals.map((goal) => {
            const percentage = Math.min(100, Math.round((goal.current / goal.target) * 100));
            
            return (
              <NeumorphicCard key={goal.id} className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${goal.color} bg-opacity-10`}>
                      <goal.icon className={goal.textColor} size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{goal.title}</h3>
                      <span className="text-xs text-muted-foreground font-medium">
                        Faltam R$ {(goal.target - goal.current).toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${goal.color} bg-opacity-10 ${goal.textColor}`}>
                    {percentage}%
                  </div>
                </div>

                <div className="space-y-2">
                  <Progress value={percentage} className={`h-3 bg-secondary [&>div]:${goal.color}`} />
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-muted-foreground">R$ {goal.current.toLocaleString('pt-BR')}</span>
                    <span className="text-foreground">R$ {goal.target.toLocaleString('pt-BR')}</span>
                  </div>
                </div>
              </NeumorphicCard>
            );
          })}
        </div>

        <NeumorphicCard variant="pressed" className="p-6 border-dashed border-2 border-primary/30 bg-transparent flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-secondary/30 transition-colors">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Target size={24} />
          </div>
          <span className="font-bold text-primary">Criar Nova Meta</span>
        </NeumorphicCard>
      </div>
    </Layout>
  );
}
