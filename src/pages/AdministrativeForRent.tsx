import UnitCategoryPage, { commonFaqs } from "@/components/UnitCategoryPage";

const AdministrativeForRent = () => (
  <UnitCategoryPage
    metaTitle="Administrative Units for Rent in Shorouk City | Offices for Rent"
    metaDescription="Elevate your business with premium administrative units for rent in Shorouk City. Discover modern offices at mixed-use malls by ASWAQ Developments. Flexible spaces from 30 m²."
    heroLabel="Administrative Units"
    heroTitle="Administrative Units for Rent in Shorouk City"
    heroDescription="Elevate your business with premium administrative units for rent in Shorouk City. Discover modern offices at mixed-use malls by ASWAQ Developments."
    introTitle="Explore Premium Administrative Units for Rent"
    introDescription="A professional office environment is the heartbeat of any successful organization. ASWAQ Developments offers a curated selection of administrative units for rent that provide the perfect balance of luxury, accessibility, and functionality. By leasing within our world-class real estate projects, you gain an immediate corporate identity in one of Cairo's most sought-after urban districts."
    locationTitle="Shorouk City: A Rising Hub for Business & Administrative Units"
    locationDescription="Shorouk City is evolving into a strong business and services hub in East Cairo, supported by residential expansion and commercial development."
    locationDrivers={[
      "Increasing demand for nearby office spaces",
      "Easy accessibility from main roads and surrounding districts",
      "Presence of mixed-use real estate projects supporting daily business activity",
      "Growing number of companies, service providers, and professional firms",
    ]}
    locationConclusion="This makes administrative properties for rent in Shorouk City a strategic decision for your business."
    mallsSectionTitle="Best Administrative Units for Rent at ASWAQ Malls"
    mallsSectionIntro="We specialize in creating vibrant destinations that blend retail and professional services."
    malls={[
      { name: "Solaria Mall", href: "/projects/solaria-mall", description: "Located in the 9th District, Solaria Mall offers modern administrative units designed for productivity and professional growth. The mall features contemporary architecture and a strategic location near major residential communities.", sizes: "Spaces from 30 m² to 396 m²" },,
      { name: "Arena Mall", href: "/projects/arena-mall", description: "Strategically positioned in the Third District, Arena Mall provides administrative spaces with excellent accessibility and visibility. Its modern design and vibrant atmosphere create an ideal setting for businesses to thrive.", sizes: "Spaces from 16 m² to 343 m²" },
    ]}
    ctaTitle="Ready to Secure your Administrative Unit?"
    ctaSubtitle="Contact us now to explore available units, pricing details, and rental opportunities tailored to your business goals."
    faqs={commonFaqs}
  />
);

export default AdministrativeForRent;
