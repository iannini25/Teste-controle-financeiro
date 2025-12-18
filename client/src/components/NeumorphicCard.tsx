import { cn } from "@/lib/utils";

interface NeumorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "flat" | "pressed" | "convex" | "concave";
  intensity?: "soft" | "medium" | "hard";
}

export default function NeumorphicCard({
  children,
  className,
  variant = "flat",
  intensity = "soft",
  ...props
}: NeumorphicCardProps) {
  const getShadows = () => {
    // Base shadow values could be adjusted based on intensity
    // For this design system, we're using a subtle approach
    
    switch (variant) {
      case "pressed":
        return "shadow-inner bg-secondary/30 border-transparent";
      case "convex":
        return "shadow-lg bg-gradient-to-br from-white/80 to-secondary/50 border-white/40";
      case "concave":
        return "shadow-md bg-gradient-to-br from-secondary/50 to-white/80 border-white/40";
      case "flat":
      default:
        return "shadow-sm bg-card border-white/50";
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border backdrop-blur-sm transition-all duration-300",
        getShadows(),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
