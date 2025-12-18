import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FinancialHealthIndicatorProps {
  status: "healthy" | "stable" | "warning" | "risk";
  score: number; // 0-100
}

export default function FinancialHealthIndicator({ status, score }: FinancialHealthIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "healthy":
        return {
          color: "text-emerald-600",
          bgColor: "bg-emerald-500",
          label: "Saudável",
          description: "Você está no caminho certo!",
          gradient: "from-emerald-400 to-teal-500",
          shadow: "shadow-emerald-200",
        };
      case "stable":
        return {
          color: "text-blue-600",
          bgColor: "bg-blue-500",
          label: "Estável",
          description: "Finanças sob controle.",
          gradient: "from-blue-400 to-indigo-500",
          shadow: "shadow-blue-200",
        };
      case "warning":
        return {
          color: "text-amber-600",
          bgColor: "bg-amber-500",
          label: "Atenção",
          description: "Cuidado com gastos extras.",
          gradient: "from-amber-400 to-orange-500",
          shadow: "shadow-amber-200",
        };
      case "risk":
        return {
          color: "text-rose-600",
          bgColor: "bg-rose-500",
          label: "Em Risco",
          description: "Ação imediata necessária.",
          gradient: "from-rose-400 to-red-500",
          shadow: "shadow-rose-200",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex flex-col items-center justify-center py-6 relative">
      {/* Background Glow */}
      <div className={cn("absolute w-48 h-48 rounded-full opacity-20 blur-3xl animate-pulse", config.bgColor)} />
      
      {/* Main Indicator */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Outer Ring */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="110"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-secondary"
          />
          <motion.circle
            initial={{ pathLength: 0 }}
            animate={{ pathLength: score / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="128"
            cy="128"
            r="110"
            stroke="url(#gradient)"
            strokeWidth="12"
            fill="transparent"
            strokeLinecap="round"
            className="drop-shadow-md"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={status === 'healthy' ? '#34d399' : status === 'stable' ? '#60a5fa' : status === 'warning' ? '#fbbf24' : '#fb7185'} />
              <stop offset="100%" stopColor={status === 'healthy' ? '#10b981' : status === 'stable' ? '#3b82f6' : status === 'warning' ? '#f59e0b' : '#e11d48'} />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="relative w-40 h-40 rounded-full bg-card shadow-[inset_4px_4px_10px_rgba(0,0,0,0.05),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] flex flex-col items-center justify-center backdrop-blur-sm border border-white/50">
            <img 
              src="/images/financial-core.png" 
              alt="Financial Core" 
              className="absolute w-full h-full object-cover opacity-20 rounded-full mix-blend-overlay"
            />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider z-10">Status</span>
            <h2 className={cn("text-3xl font-bold mt-1 z-10", config.color)}>{config.label}</h2>
            <div className={cn("mt-2 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm z-10", config.bgColor)}>
              {score} / 100
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-muted-foreground font-medium text-center max-w-[200px]">
        {config.description}
      </p>
    </div>
  );
}
