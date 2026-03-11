import UnitCategoryPage, { commonFaqs } from "@/components/UnitCategoryPage";

const AdministrativeForInvestment = () => (
  <UnitCategoryPage
    metaTitle="Administrative Units for Investment in Shorouk City | ASWAQ Developments"
    metaDescription="Capitalize on administrative units for investment in Shorouk City with ASWAQ Developments. Discover premium offices within mixed-use real estate projects at City Hub & Mercado Mall."
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
    mallsSectionIntro="We specialize in creating vibrant destinations that blend retail and professional services."
    malls={[
      { name: "Solaria Mall", href: "/projects/solaria-mall", description: "Located in the 9th District, Solaria Mall offers modern administrative units designed for productivity and professional growth. The mall features contemporary architecture and a strategic location near major residential communities.", sizes: "Spaces from 30 m² to 300 m²" },
      { name: "Arena Mall", href: "/projects/arena-mall", description: "Strategically positioned in the Third District, Arena Mall provides administrative spaces with excellent accessibility and visibility. Its modern design and vibrant atmosphere create an ideal setting for businesses to thrive.", sizes: "Spaces from 30 m² to 300 m²" },
    ]}
    ctaTitle="Ready to Secure your Administrative Unit?"
    ctaSubtitle="Contact us now to explore available units, pricing details, and investment opportunities tailored to your business goals."
    faqs={commonFaqs}
  />
);

export default AdministrativeForInvestment;
