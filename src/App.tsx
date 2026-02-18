import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import AvailableUnits from "./pages/AvailableUnits";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ArenaMall from "./pages/ArenaMall";
import CityHubMall from "./pages/CityHubMall";
import MercadoMall from "./pages/MercadoMall";
import SolariaMall from "./pages/SolariaMall";
import UnitsForSale from "./pages/UnitsForSale";
import UnitsForRent from "./pages/UnitsForRent";
import UnitsForInvestment from "./pages/UnitsForInvestment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/arena-mall" element={<ArenaMall />} />
          <Route path="/projects/city-hub-mall" element={<CityHubMall />} />
          <Route path="/projects/mercado-mall" element={<MercadoMall />} />
          <Route path="/projects/solaria-mall" element={<SolariaMall />} />
          <Route path="/units" element={<AvailableUnits />} />
          <Route path="/units/for-sale" element={<UnitsForSale />} />
          <Route path="/units/for-rent" element={<UnitsForRent />} />
          <Route path="/units/for-investment" element={<UnitsForInvestment />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
