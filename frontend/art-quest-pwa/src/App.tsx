import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Scanner from "./pages/Scanner";
import ArtworkDetail from "./pages/ArtworkDetail";
import Journey from "./pages/Journey";
import Learn from "./pages/Learn";
import Chat from "./pages/Chat";
import MuseumMap from "./pages/MuseumMap";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import FeedbackButton from "./components/FeedbackButton";
import Navbar from "./components/Navbar";
import { ArtworkProvider } from "./pages/ArtworkContext"; // ✅ import provider

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* ✅ ArtworkProvider wraps the Router so all routes can access useArtwork() */}
      <ArtworkProvider>
        <BrowserRouter>
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/scan" element={<Scanner />} />
              <Route path="/artwork/:id" element={<ArtworkDetail />} />
              <Route path="/journey" element={<Journey />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/map" element={<MuseumMap />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <FeedbackButton />
        </BrowserRouter>
      </ArtworkProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
