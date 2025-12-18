import { Link, useLocation } from "wouter";
import { Home, PieChart, Calculator, User, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Início", path: "/" },
    { icon: PieChart, label: "Gastos", path: "/gastos" },
    { icon: Calculator, label: "Impostos", path: "/impostos" },
    { icon: Compass, label: "Planejamento", path: "/planejamento" },
    { icon: User, label: "Perfil", path: "/perfil" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-20 transition-all duration-300">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-20 flex-col items-center py-8 bg-card border-r border-border shadow-sm z-50">
        <div className="mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/30">
            $
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-6 w-full px-2">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 cursor-pointer group",
                    isActive
                      ? "bg-primary/10 text-primary shadow-inner"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon
                    size={24}
                    className={cn(
                      "transition-transform duration-200 group-hover:scale-110",
                      isActive && "fill-current"
                    )}
                  />
                  <span className="text-[10px] mt-1 font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute left-16 bg-popover px-2 py-1 rounded shadow-md md:hidden">
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="container py-6 md:py-10 animate-in fade-in duration-500">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-card/80 backdrop-blur-md border-t border-border z-50 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={cn(
                    "flex flex-col items-center justify-center w-14 h-full transition-colors duration-200 cursor-pointer",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "p-1.5 rounded-xl transition-all duration-200",
                      isActive && "bg-primary/10 translate-y-[-4px] shadow-sm"
                    )}
                  >
                    <item.icon
                      size={22}
                      className={cn(isActive && "fill-current")}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-medium mt-0.5 transition-all duration-200",
                      isActive ? "opacity-100 font-bold" : "opacity-70"
                    )}
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
