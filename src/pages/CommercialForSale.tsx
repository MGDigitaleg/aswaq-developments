import UnitCategoryPage, { commonFaqs } from "@/components/UnitCategoryPage";

const CommercialForSale = () => (
  <UnitCategoryPage
    heroLabel="Commercial Units"
    heroTitle="Commercial Units for Sale in Shorouk City"
    heroDescription="Looking for commercial units for sale in Shorouk? Discover premium commercial properties in Shorouk City's most active malls with ASWAQ."
    introTitle="Invest Where Growth Never Stops"
    introDescription="ASWAQ offers carefully selected commercial spaces & properties inside some of the city's most promising malls. Our units are designed to serve business owners who want visibility & steady customer flow. Whether you are opening a shop, a brand outlet, or securing a high-demand retail space, our commercial units for sale provide the foundation for long-term success."
    locationTitle="Why Shorouk City is a Smart Location for Commercial Units"
    locationDescription="Shorouk City is one of Cairo's fastest growing destinations, making it an ideal choice for commercial units investment."
    locationDrivers={[
      "Strategic location with easy access to Cairo–Ismailia Road and nearby new cities",
      "Rapid population growth driven by residential compounds and universities",
      "Increasing demand for retail, dining, and daily services",
    ]}
    locationConclusion="Choosing commercial properties for sale in Shorouk means positioning your business in a city that's still growing, where demand is rising."
    mallsSectionTitle="Best Commercial Units for Sale at ASWAQ Malls"
    mallsSectionIntro="ASWAQ's commercial units are located inside distinctive malls, each serving a specific market segment and customer behavior."
    malls={[
      { name: "Solaria Mall", href: "/projects/solaria-mall", description: "A modern retail destination designed to serve surrounding residential compounds, offering excellent visibility and daily foot traffic for commercial properties; shops, cafés, and service providers.", sizes: "Spaces from 30 m² to 300 m²" },
      { name: "Arena Mall", href: "/projects/arena-mall", description: "A vibrant commercial hub suitable for brands seeking strong exposure, with smart layouts that enhance customer movement and maximize storefront impact.", sizes: "Spaces from 30 m² to 300 m²" },
      { name: "Mercado Mall", href: "/projects/mercado-mall", description: "Boost your brand's visibility in El Shorouk's busiest commercial hub. Located in a high-density residential zone with a built-in customer base from Madinaty and New Heliopolis.", sizes: "Spaces from 30 m² to 300 m²" },
      { name: "City Hub Mall", href: "/projects/city-hub-mall", description: "Position your business in the heart of the 'Clubs District,' facing El Shorouk's premier sporting clubs. Famous for its open-air dining and dancing fountain.", sizes: "Spaces from 30 m² to 300 m²" },
    ]}
    ctaTitle="Own your Commercial Unit Today"
    ctaSubtitle="Contact us now to explore available units, pricing details, and investment opportunities tailored to your business goals."
    faqs={commonFaqs}
  />
);

export default CommercialForSale;
