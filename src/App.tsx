import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { MobileBottomNavigation } from "@/components/MobileBottomNavigation";
import { Chatbot } from "@/components/Chatbot";
import Index from "./pages/Index";
import Insurance from "./pages/Insurance";
import Corporate from "./pages/Corporate";
import ARSpaceVisualizer from "./pages/ARSpaceVisualizer";
import ListingDetails from "./pages/ListingDetails";
import MyRentals from "./pages/MyRentals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/listings" element={<Index />} />
              <Route path="/insurance" element={<Insurance />} />
              <Route path="/corporate" element={<Corporate />} />
              <Route path="/listing/:id" element={<ListingDetails />} />
              <Route path="/ar-scanner" element={<ARSpaceVisualizer />} />
              <Route path="/my-rentals" element={<MyRentals />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            {/* Global Mobile Bottom Navigation */}
            <MobileBottomNavigation 
              onChatbotToggle={() => setIsChatbotOpen(!isChatbotOpen)}
              isChatbotOpen={isChatbotOpen}
            />
            
            {/* Global Chatbot */}
            <Chatbot 
              isOpen={isChatbotOpen} 
              onClose={() => setIsChatbotOpen(false)} 
            />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
};

export default App;
