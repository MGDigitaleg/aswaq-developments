import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import AvailableUnits from "./pages/AvailableUnits";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import ArenaMall from "./pages/ArenaMall";
import CityHubMall from "./pages/CityHubMall";
import MercadoMall from "./pages/MercadoMall";
import SolariaMall from "./pages/SolariaMall";
import UnitsForSale from "./pages/UnitsForSale";
import UnitsForRent from "./pages/UnitsForRent";
import UnitsForInvestment from "./pages/UnitsForInvestment";
import CommercialForSale from "./pages/CommercialForSale";
import CommercialForRent from "./pages/CommercialForRent";
import CommercialForInvestment from "./pages/CommercialForInvestment";
import AdministrativeForSale from "./pages/AdministrativeForSale";
import AdministrativeForRent from "./pages/AdministrativeForRent";
import AdministrativeForInvestment from "./pages/AdministrativeForInvestment";
import MedicalForSale from "./pages/MedicalForSale";
import MedicalForRent from "./pages/MedicalForRent";
import MedicalForInvestment from "./pages/MedicalForInvestment";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Gallery from "./pages/Gallery";
import Careers from "./pages/Careers";
import CareerDetail from "./pages/CareerDetail";
import ScrollToTop from "./components/ScrollToTop";
import NewsDetailRedirect from "./components/NewsDetailRedirect";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminBlogList from "./pages/admin/AdminBlogList";
import AdminBlogEditor from "./pages/admin/AdminBlogEditor";
import AdminPageContent from "./pages/admin/AdminPageContent";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminFormSubmissions from "./pages/admin/AdminFormSubmissions";

// Arabic pages
import CommercialForSaleAr from "./pages/ar/CommercialForSaleAr";
import CommercialForRentAr from "./pages/ar/CommercialForRentAr";
import CommercialForInvestmentAr from "./pages/ar/CommercialForInvestmentAr";
import AdministrativeForSaleAr from "./pages/ar/AdministrativeForSaleAr";
import AdministrativeForRentAr from "./pages/ar/AdministrativeForRentAr";
import AdministrativeForInvestmentAr from "./pages/ar/AdministrativeForInvestmentAr";
import MedicalForSaleAr from "./pages/ar/MedicalForSaleAr";
import MedicalForRentAr from "./pages/ar/MedicalForRentAr";
import MedicalForInvestmentAr from "./pages/ar/MedicalForInvestmentAr";
import SolariaMallAr from "./pages/ar/SolariaMallAr";
import ArenaMallAr from "./pages/ar/ArenaMallAr";
import MercadoMallAr from "./pages/ar/MercadoMallAr";
import CityHubMallAr from "./pages/ar/CityHubMallAr";
import UnitsForSaleAr from "./pages/ar/UnitsForSaleAr";
import UnitsForRentAr from "./pages/ar/UnitsForRentAr";
import UnitsForInvestmentAr from "./pages/ar/UnitsForInvestmentAr";
import IndexAr from "./pages/ar/IndexAr";
import AboutAr from "./pages/ar/AboutAr";
import NewsAr from "./pages/ar/NewsAr";
import NewsDetailAr from "./pages/ar/NewsDetailAr";
import GalleryAr from "./pages/ar/GalleryAr";
import ContactAr from "./pages/ar/ContactAr";
import ProjectsAr from "./pages/ar/ProjectsAr";
import AvailableUnitsAr from "./pages/ar/AvailableUnitsAr";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* English routes */}
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
          <Route path="/units/commercial-for-sale" element={<CommercialForSale />} />
          <Route path="/units/commercial-for-rent" element={<CommercialForRent />} />
          <Route path="/units/commercial-for-investment" element={<CommercialForInvestment />} />
          <Route path="/units/administrative-for-sale" element={<AdministrativeForSale />} />
          <Route path="/units/administrative-for-rent" element={<AdministrativeForRent />} />
          <Route path="/units/administrative-for-investment" element={<AdministrativeForInvestment />} />
          <Route path="/units/medical-for-sale" element={<MedicalForSale />} />
          <Route path="/units/medical-for-rent" element={<MedicalForRent />} />
          <Route path="/units/medical-for-investment" element={<MedicalForInvestment />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Arabic routes */}
          <Route path="/ar" element={<IndexAr />} />
          <Route path="/ar/projects" element={<ProjectsAr />} />
          <Route path="/ar/projects/arena-mall" element={<ArenaMallAr />} />
          <Route path="/ar/projects/city-hub-mall" element={<CityHubMallAr />} />
          <Route path="/ar/projects/mercado-mall" element={<MercadoMallAr />} />
          <Route path="/ar/projects/solaria-mall" element={<SolariaMallAr />} />
          <Route path="/ar/units" element={<AvailableUnitsAr />} />
          <Route path="/ar/units/for-sale" element={<UnitsForSaleAr />} />
          <Route path="/ar/units/for-rent" element={<UnitsForRentAr />} />
          <Route path="/ar/units/for-investment" element={<UnitsForInvestmentAr />} />
          <Route path="/ar/units/commercial-for-sale" element={<CommercialForSaleAr />} />
          <Route path="/ar/units/commercial-for-rent" element={<CommercialForRentAr />} />
          <Route path="/ar/units/commercial-for-investment" element={<CommercialForInvestmentAr />} />
          <Route path="/ar/units/administrative-for-sale" element={<AdministrativeForSaleAr />} />
          <Route path="/ar/units/administrative-for-rent" element={<AdministrativeForRentAr />} />
          <Route path="/ar/units/administrative-for-investment" element={<AdministrativeForInvestmentAr />} />
          <Route path="/ar/units/medical-for-sale" element={<MedicalForSaleAr />} />
          <Route path="/ar/units/medical-for-rent" element={<MedicalForRentAr />} />
          <Route path="/ar/units/medical-for-investment" element={<MedicalForInvestmentAr />} />
          <Route path="/ar/news" element={<NewsAr />} />
          <Route path="/ar/news/:slug" element={<NewsDetailAr />} />
          <Route path="/ar/gallery" element={<GalleryAr />} />
          <Route path="/ar/about" element={<AboutAr />} />
          <Route path="/ar/contact" element={<ContactAr />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminBlogList />} />
          <Route path="/admin/blog/:id" element={<AdminBlogEditor />} />
          <Route path="/admin/pages" element={<AdminPageContent />} />
          <Route path="/admin/submissions" element={<AdminFormSubmissions />} />
          <Route path="/admin/users" element={<AdminUsers />} />

          {/* Redirects */}
          <Route path="/photo.php" element={<Navigate to="/gallery" replace />} />
          <Route path="/photo" element={<Navigate to="/gallery" replace />} />
          <Route path="/videos.php" element={<Navigate to="/gallery" replace />} />
          <Route path="/videos" element={<Navigate to="/gallery" replace />} />
          <Route path="/newsdetial.php" element={<NewsDetailRedirect />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
