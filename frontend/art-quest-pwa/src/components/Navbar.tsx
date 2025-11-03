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
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b shadow-sm 
                 backdrop-blur-md 
                 bg-gradient-to-r from-[#f7f3ed]/95 via-[#f2e9dc]/90 to-[#f7f3ed]/95 
                 text-gray-800"
    >
      <div className="flex justify-around items-center h-16 max-w-screen-xl mx-auto px-4">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 transition-all flex-1 py-2 px-1",
                isActive
                  ? "text-[#7b3f00] font-semibold drop-shadow-sm" // rich gold-brown active color
                  : "text-gray-700 hover:text-[#5c4a1d]" // subtle hover effect
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "animate-scale-in")} />
              <span className="text-[11px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
