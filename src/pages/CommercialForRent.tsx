import UnitCategoryPage, { commonFaqs } from "@/components/UnitCategoryPage";

const CommercialForRent = () => (
  <UnitCategoryPage
    metaTitle="Commercial Units for Rent in Shorouk City"
    metaDescription="Looking for commercial units for rent in Shorouk? Discover premium commercial properties in Shorouk City's most active malls with ASWAQ."
    heroLabel="Commercial Units"
    heroTitle="Commercial Units for Rent in Shorouk City"
    heroDescription="Looking for commercial units for rent in Shorouk? Discover premium commercial properties in Shorouk City's most active malls with ASWAQ."
    introTitle="Choose Prime Commercial Units for Your Business"
    introDescription="At ASWAQ Developments, we understand that for many businesses, flexibility is the key to scaling. Our rental portfolio offers premium commercial spaces across our flagship projects — Mercado Mall, Arena Mall, Solaria Mall, and City Hub Mall — designed to put your brand in the spotlight without the upfront cost of ownership."
    locationTitle="Why Shorouk City is a Smart Location for Commercial Units"
    locationDescription="Shorouk City is one of Cairo's fastest growing destinations, making it an ideal choice for commercial units."
    locationDrivers={[
      "Strategic location with easy access to Cairo–Ismailia Road and nearby new cities",
      "Rapid population growth driven by residential compounds and universities",
      "Increasing demand for retail, dining, and daily services",
    ]}
    locationConclusion="Renting a commercial unit in El Shorouk is about more than just a lease; it's about joining a thriving ecosystem built for high traffic and visibility."
    mallsSectionTitle="Best Commercial Units for Rent at ASWAQ Malls"
    mallsSectionIntro="ASWAQ's commercial units are located inside 4 distinctive malls, each serving a specific market segment and customer behavior."
    malls={[
      { name: "Solaria Mall", href: "/projects/solaria-mall", description: "Establish your brand in a sophisticated, next-generation mall designed for luxury and accessibility. Located near the Suez Road and major institutions, Solaria offers modern rental spaces with high-end infrastructure.", sizes: "Spaces from 30 m² to 300 m²" },
      { name: "Arena Mall", href: "/projects/arena-mall", description: "Capitalize on a young, active demographic by renting directly across from the French University. With the city's first dedicated food court and a constant stream of students and professionals.", sizes: "Spaces from 16 m² to 343 m²" },
      { name: "Mercado Mall", href: "/projects/mercado-mall", description: "Boost your brand's visibility in El Shorouk's busiest commercial hub. Renting at Mercado Mall places you in a high-density residential zone with a built-in customer base.", sizes: "Spaces from 24 m² to 300 m²" },
      { name: "City Hub Mall", href: "/projects/city-hub-mall", description: "Position your business in the heart of the 'Clubs District,' facing El Shorouk's premier sporting clubs. Famous for its open-air dining and dancing fountain.", sizes: "Spaces from 30 m² to 300 m²" },
    ]}
    ctaTitle="Rent your Commercial Unit Today"
    ctaSubtitle="Contact us now to explore available units, pricing details, and rental opportunities tailored to your business goals."
    faqs={commonFaqs}
  />
);

export default CommercialForRent;
