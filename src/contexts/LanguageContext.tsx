import { createContext, useContext } from "react";
import { useLocation } from "react-router-dom";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  switchPath: (currentPath: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  isRTL: false,
  switchPath: (p) => p,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const language: Language = location.pathname.startsWith("/ar") ? "ar" : "en";
  const isRTL = language === "ar";

  const switchPath = (currentPath: string) => {
    if (language === "ar") {
      // Remove /ar prefix
      const enPath = currentPath.replace(/^\/ar/, "") || "/";
      return enPath;
    }
    // Add /ar prefix
    return `/ar${currentPath === "/" ? "" : currentPath}`;
  };

  return (
    <LanguageContext.Provider value={{ language, isRTL, switchPath }}>
      {children}
    </LanguageContext.Provider>
  );
};
