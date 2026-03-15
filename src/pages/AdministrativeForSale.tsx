import UnitCategoryPage, { commonFaqs } from "@/components/UnitCategoryPage";

const AdministrativeForSale = () => (
  <UnitCategoryPage
    metaTitle="Administrative Units for Sale in Shorouk City | Offices for Sale"
    metaDescription="Discover administrative units for sale in Shorouk City with ASWAQ Developments. Own offices for sale within strategic real estate projects built for business growth."
    heroLabel="Administrative Units"
    heroTitle="Administrative Units for Sale in Shorouk City"
    heroDescription="Secure a permanent foundation for your business in Shorouk City's most prestigious commercial landmarks."
    introTitle="Explore Premium Administrative Units for Sale"
    introDescription="Transitioning from a tenant to an owner is a strategic milestone for any growing business. ASWAQ Developments offers a diverse selection of administrative units for sale that provide long-term stability, operational control, and asset appreciation for business owners and investors. Our real estate projects are designed to reflect the professionalism of your brand."
    locationTitle="Shorouk City: A Rising Hub for Business & Administrative Units"
    locationDescription="Shorouk City is evolving into a strong business and services hub in East Cairo, supported by residential expansion and commercial development."
    locationDrivers={[
      "Increasing demand for nearby office spaces",
      "Easy accessibility from main roads and surrounding districts",
      "Presence of mixed-use real estate projects supporting daily business activity",
      "Growing number of companies, service providers, and professional firms",
    ]}
    locationConclusion="This makes administrative properties for sale in Shorouk City a strategic investment decision."
    mallsSectionTitle="Best Administrative Units for Sale at ASWAQ Malls"
    mallsSectionIntro="We specialize in creating vibrant destinations that blend retail and professional services."
    malls={[
      { name: "Solaria Mall", href: "/projects/solaria-mall", description: "Located in the 9th District, Solaria Mall offers modern administrative units designed for productivity and professional growth. The mall features contemporary architecture and a strategic location near major residential communities.", sizes: "Spaces from 30 m² to 396 m²" },,
      { name: "Arena Mall", href: "/projects/arena-mall", description: "Strategically positioned in the Third District, Arena Mall provides administrative spaces with excellent accessibility and visibility. Its modern design and vibrant atmosphere create an ideal setting for businesses to thrive.", sizes: "Spaces from 16 m² to 343 m²" },
    ]}
    ctaTitle="Ready to Secure your Administrative Unit?"
    ctaSubtitle="Contact us now to explore available units, pricing details, and investment opportunities tailored to your business goals."
    faqs={commonFaqs}
  />
);

export default AdministrativeForSale;
