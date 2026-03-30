import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";

// Lazy-loaded pages to reduce initial JS bundle
const Projects = lazy(() => import("./pages/Projects"));
const AvailableUnits = lazy(() => import("./pages/AvailableUnits"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Contact = lazy(() => import("./pages/Contact"));
const ArenaMall = lazy(() => import("./pages/ArenaMall"));
const CityHubMall = lazy(() => import("./pages/CityHubMall"));
const MercadoMall = lazy(() => import("./pages/MercadoMall"));
const SolariaMall = lazy(() => import("./pages/SolariaMall"));
const UnitsForSale = lazy(() => import("./pages/UnitsForSale"));
const UnitsForRent = lazy(() => import("./pages/UnitsForRent"));
const UnitsForInvestment = lazy(() => import("./pages/UnitsForInvestment"));
const CommercialForSale = lazy(() => import("./pages/CommercialForSale"));
const CommercialForRent = lazy(() => import("./pages/CommercialForRent"));
const CommercialForInvestment = lazy(() => import("./pages/CommercialForInvestment"));
const AdministrativeForSale = lazy(() => import("./pages/AdministrativeForSale"));
const AdministrativeForRent = lazy(() => import("./pages/AdministrativeForRent"));
const AdministrativeForInvestment = lazy(() => import("./pages/AdministrativeForInvestment"));
const MedicalForSale = lazy(() => import("./pages/MedicalForSale"));
const MedicalForRent = lazy(() => import("./pages/MedicalForRent"));
const MedicalForInvestment = lazy(() => import("./pages/MedicalForInvestment"));
const News = lazy(() => import("./pages/News"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Careers = lazy(() => import("./pages/Careers"));
const CareerDetail = lazy(() => import("./pages/CareerDetail"));
const NewsDetailRedirect = lazy(() => import("./components/NewsDetailRedirect"));
const NewsDetailArabicRedirect = lazy(() => import("./components/NewsDetailArabicRedirect"));
const WorksRedirect = lazy(() => import("./components/WorksRedirect"));
const WorksArabicRedirect = lazy(() => import("./components/WorksArabicRedirect"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminBlogList = lazy(() => import("./pages/admin/AdminBlogList"));
const AdminBlogEditor = lazy(() => import("./pages/admin/AdminBlogEditor"));
const AdminPageContent = lazy(() => import("./pages/admin/AdminPageContent"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminFormSubmissions = lazy(() => import("./pages/admin/AdminFormSubmissions"));

// Arabic pages
const CommercialForSaleAr = lazy(() => import("./pages/ar/CommercialForSaleAr"));
const CommercialForRentAr = lazy(() => import("./pages/ar/CommercialForRentAr"));
const CommercialForInvestmentAr = lazy(() => import("./pages/ar/CommercialForInvestmentAr"));
const AdministrativeForSaleAr = lazy(() => import("./pages/ar/AdministrativeForSaleAr"));
const AdministrativeForRentAr = lazy(() => import("./pages/ar/AdministrativeForRentAr"));
const AdministrativeForInvestmentAr = lazy(() => import("./pages/ar/AdministrativeForInvestmentAr"));
const MedicalForSaleAr = lazy(() => import("./pages/ar/MedicalForSaleAr"));
const MedicalForRentAr = lazy(() => import("./pages/ar/MedicalForRentAr"));
const MedicalForInvestmentAr = lazy(() => import("./pages/ar/MedicalForInvestmentAr"));
const SolariaMallAr = lazy(() => import("./pages/ar/SolariaMallAr"));
const ArenaMallAr = lazy(() => import("./pages/ar/ArenaMallAr"));
const MercadoMallAr = lazy(() => import("./pages/ar/MercadoMallAr"));
const CityHubMallAr = lazy(() => import("./pages/ar/CityHubMallAr"));
const UnitsForSaleAr = lazy(() => import("./pages/ar/UnitsForSaleAr"));
const UnitsForRentAr = lazy(() => import("./pages/ar/UnitsForRentAr"));
const UnitsForInvestmentAr = lazy(() => import("./pages/ar/UnitsForInvestmentAr"));
const IndexAr = lazy(() => import("./pages/ar/IndexAr"));
const AboutAr = lazy(() => import("./pages/ar/AboutAr"));
const NewsAr = lazy(() => import("./pages/ar/NewsAr"));
const NewsDetailAr = lazy(() => import("./pages/ar/NewsDetailAr"));
const GalleryAr = lazy(() => import("./pages/ar/GalleryAr"));
const ContactAr = lazy(() => import("./pages/ar/ContactAr"));
const ProjectsAr = lazy(() => import("./pages/ar/ProjectsAr"));
const AvailableUnitsAr = lazy(() => import("./pages/ar/AvailableUnitsAr"));
const CareersAr = lazy(() => import("./pages/ar/CareersAr"));
const CareerDetailAr = lazy(() => import("./pages/ar/CareerDetailAr"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={null}>
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
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:slug" element={<CareerDetail />} />
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
            <Route path="/ar/careers" element={<CareersAr />} />
            <Route path="/ar/careers/:slug" element={<CareerDetailAr />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminBlogList />} />
            <Route path="/admin/blog/:id" element={<AdminBlogEditor />} />
            <Route path="/admin/pages" element={<AdminPageContent />} />
            <Route path="/admin/submissions" element={<AdminFormSubmissions />} />
            <Route path="/admin/users" element={<AdminUsers />} />

            {/* Redirects */}
            <Route path="/index.php" element={<Navigate to="/" replace />} />
            <Route path="/about.php" element={<Navigate to="/about" replace />} />
            <Route path="/works.php" element={<WorksRedirect />} />
            <Route path="/news.php" element={<Navigate to="/news" replace />} />
            <Route path="/contact.php" element={<Navigate to="/contact" replace />} />
            <Route path="/photo.php" element={<Navigate to="/gallery" replace />} />
            <Route path="/photo" element={<Navigate to="/gallery" replace />} />
            <Route path="/videos.php" element={<Navigate to="/gallery" replace />} />
            <Route path="/videos" element={<Navigate to="/gallery" replace />} />
            <Route path="/newsdetial.php" element={<NewsDetailRedirect />} />
            <Route path="/careers.php" element={<Navigate to="/careers" replace />} />
            {/* Arabic redirects */}
            <Route path="/indexarabic.php" element={<Navigate to="/ar" replace />} />
            <Route path="/aboutarabic.php" element={<Navigate to="/ar/about" replace />} />
            <Route path="/worksarabic.php" element={<WorksArabicRedirect />} />
            <Route path="/photoarabic.php" element={<Navigate to="/ar/gallery" replace />} />
            <Route path="/videosarabic.php" element={<Navigate to="/ar/gallery" replace />} />
            <Route path="/newsarabic.php" element={<Navigate to="/ar/news" replace />} />
            <Route path="/newsdetialarabic.php" element={<NewsDetailArabicRedirect />} />
            <Route path="/contactarabic.php" element={<Navigate to="/ar/contact" replace />} />
            <Route path="/careersarabic.php" element={<Navigate to="/ar/careers" replace />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
