import { Home, Camera, Map, Compass, MessageCircle, BarChart3, GraduationCap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/scan", icon: Camera, label: "Scan" },
    { path: "/journey", icon: Compass, label: "Journey" },
    { path: "/learn", icon: GraduationCap, label: "Learn" },
    { path: "/map", icon: Map, label: "Map" },
    { path: "/chat", icon: MessageCircle, label: "Chat" },
    { path: "/dashboard", icon: BarChart3, label: "Dashboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md bg-white/80 shadow-sm">
      <div className="flex justify-around items-center h-16 max-w-screen-xl mx-auto px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 transition-all flex-1 py-2 px-1",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "animate-scale-in")} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
