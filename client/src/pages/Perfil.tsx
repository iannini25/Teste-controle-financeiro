import Layout from "@/components/Layout";
import NeumorphicCard from "@/components/NeumorphicCard";
import { Button } from "@/components/ui/button";
import { User, Settings, Bell, Shield, LogOut, CreditCard } from "lucide-react";

export default function Perfil() {
  const menuItems = [
    { icon: User, label: "Dados Pessoais" },
    { icon: CreditCard, label: "Contas e Cartões" },
    { icon: Bell, label: "Notificações" },
    { icon: Shield, label: "Segurança e Privacidade" },
    { icon: Settings, label: "Configurações do App" },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-6 pb-20">
        <header className="flex flex-col items-center py-6">
          <div className="w-24 h-24 rounded-full bg-secondary overflow-hidden border-4 border-white shadow-lg mb-4 relative group cursor-pointer">
            <img src="/images/glass-icons.png" alt="Profile" className="w-full h-full object-cover scale-150 translate-y-2" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs">
              Editar
            </div>
          </div>
          <h1 className="text-2xl font-bold text-primary">Usuário Exemplo</h1>
          <p className="text-muted-foreground">Membro desde 2024</p>
        </header>

        <NeumorphicCard className="p-2 overflow-hidden">
          {menuItems.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors cursor-pointer border-b border-border last:border-0"
            >
              <div className="p-2 rounded-xl bg-primary/5 text-primary">
                <item.icon size={20} />
              </div>
              <span className="font-medium flex-1">{item.label}</span>
            </div>
          ))}
        </NeumorphicCard>

        <NeumorphicCard className="p-6 bg-gradient-to-br from-primary to-blue-600 text-white border-none">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Plano Premium</h3>
            <span className="px-2 py-1 bg-white/20 rounded text-xs font-bold">ATIVO</span>
          </div>
          <p className="text-blue-100 text-sm mb-4">
            Você tem acesso a todas as funcionalidades de inteligência artificial e relatórios avançados.
          </p>
          <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90 border-none">
            Gerenciar Assinatura
          </Button>
        </NeumorphicCard>

        <Button variant="ghost" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 gap-2">
          <LogOut size={18} />
          Sair da Conta
        </Button>
      </div>
    </Layout>
  );
}
