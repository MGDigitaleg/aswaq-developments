import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import StickyActionBar from "./StickyActionBar";
import CustomCursor from "./CustomCursor";

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const isArabic = location.pathname.startsWith("/ar");

  useEffect(() => {
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = isArabic ? "ar" : "en";
  }, [isArabic]);

  return (
    <div className={`min-h-screen flex flex-col ${isArabic ? "font-arabic" : "font-body"}`}>
      <CustomCursor />
      <Navbar />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
      <WhatsAppButton />
      <StickyActionBar />
    </div>
  );
};

export default Layout;
