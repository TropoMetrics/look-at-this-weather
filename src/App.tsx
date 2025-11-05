import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TemperatureUnitProvider } from "@/contexts/TemperatureUnitContext";
import Index from "./pages/Index";
import Warnings from "./pages/Warnings";
import WeatherMap from "./pages/WeatherMap";
import SixHourForecast from "./pages/SixHourForecast";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TemperatureUnitProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/warnings" element={<Warnings />} />
            <Route path="/weather-map" element={<WeatherMap />} />
            <Route path="/forecast" element={<SixHourForecast />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </TemperatureUnitProvider>
  </QueryClientProvider>
);

export default App;
