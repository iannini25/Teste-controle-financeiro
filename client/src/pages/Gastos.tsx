import Layout from "@/components/Layout";
import NeumorphicCard from "@/components/NeumorphicCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ShoppingBag, Coffee, Home as HomeIcon, Car, Smartphone, MoreHorizontal } from "lucide-react";

export default function Gastos() {
  const data = [
    { name: "Moradia", value: 1800, color: "#60a5fa", icon: HomeIcon },
    { name: "Alimentação", value: 1200, color: "#34d399", icon: Coffee },
    { name: "Transporte", value: 450, color: "#fbbf24", icon: Car },
    { name: "Lazer", value: 300, color: "#f472b6", icon: ShoppingBag },
    { name: "Outros", value: 100.50, color: "#94a3b8", icon: MoreHorizontal },
  ];

  const totalExpenses = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <Layout>
      <div className="flex flex-col gap-6 pb-20">
        <header>
          <h1 className="text-2xl font-bold text-primary">Meus Gastos</h1>
          <p className="text-muted-foreground">Para onde seu dinheiro está indo.</p>
        </header>

        {/* Chart Section */}
        <NeumorphicCard className="p-6 flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-full h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} className="drop-shadow-sm" />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `R$ ${value.toFixed(2)}`}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-muted-foreground font-medium uppercase">Total</span>
              <span className="text-xl font-bold text-foreground">R$ {totalExpenses.toLocaleString('pt-BR')}</span>
            </div>
          </div>
        </NeumorphicCard>

        {/* List Section */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Detalhamento</h3>
          {data.map((item, index) => (
            <NeumorphicCard key={index} className="p-4 flex items-center justify-between hover:translate-x-1 transition-transform cursor-pointer">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                  style={{ backgroundColor: item.color }}
                >
                  <item.icon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{item.name}</h4>
                  <span className="text-xs text-muted-foreground">{((item.value / totalExpenses) * 100).toFixed(1)}% do total</span>
                </div>
              </div>
              <span className="font-bold text-foreground">
                R$ {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </NeumorphicCard>
          ))}
        </div>
      </div>
    </Layout>
  );
}
