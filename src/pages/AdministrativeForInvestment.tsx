import UnitCategoryPage, { commonFaqs } from "@/components/UnitCategoryPage";

const AdministrativeForInvestment = () => (
  <UnitCategoryPage
    heroLabel="Administrative Units"
    heroTitle="Administrative Units for Investment in Shorouk City"
    heroDescription="Capitalize on administrative units for investment in Shorouk City with ASWAQ Developments. Discover premium offices within mixed-use real estate projects."
    introTitle="Own your Administrative Unit for Investment"
    introDescription="Explore premium offices for investment in East Cairo. ASWAQ Developments offers a gateway to the thriving market of Shorouk City by providing high-yield administrative units for investment. By choosing ASWAQ Developments, you are partnering with a developer that combines 20 years of real estate expertise with a vision for modern, integrated urban living."
    locationTitle="Shorouk City: A Rising Hub for Business & Administrative Units"
    locationDescription="Shorouk City is evolving beyond residential growth into a business-friendly destination."
    locationDrivers={[
      "Increasing number of companies moving to East Cairo",
      "Growing demand for modern office spaces near residential communities",
      "Strategic access to major roads and surrounding cities",
      "Mixed-use developments that combine work, retail, and services",
    ]}
    locationConclusion="These factors make administrative properties for investment in Shorouk City highly attractive."
    mallsSectionTitle="Best Administrative Units for Investment at ASWAQ Malls"
    mallsSectionIntro="We specialize in creating vibrant destinations that blend retail, medical, and professional services."
    malls={[
      { name: "City Hub Mall", href: "/projects/city-hub-mall", description: "Located in the heart of the Club District, City Hub is a landmark of modern architecture. Facing the Shorouk and City Clubs, it offers administrative units that benefit from the mall's vibrant atmosphere, including its signature dancing fountain and open-air dining zones.", sizes: "Spaces from 30 m² to 300 m²" },
      { name: "Mercado Mall", href: "/projects/mercado-mall", description: "As one of the largest fully-serviced complexes in the area, Mercado Mall provides a professional setting for businesses. Its strategic location in the Second District ensures a high volume of traffic, making its offices for investment highly sought after.", sizes: "Spaces from 30 m² to 300 m²" },
    ]}
    ctaTitle="Ready to Secure your Administrative Unit?"
    ctaSubtitle="Contact us now to explore available units, pricing details, and investment opportunities tailored to your business goals."
    faqs={commonFaqs}
  />
);

export default AdministrativeForInvestment;
