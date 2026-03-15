import UnitCategoryPage, { commonFaqs } from "@/components/UnitCategoryPage";

const CommercialForInvestment = () => (
  <UnitCategoryPage
    metaTitle="Commercial Units for Investment in Shorouk City | ASWAQ Developments"
    metaDescription="Explore commercial units for investment in Shorouk City with ASWAQ Developments. Discover high-potential commercial properties within growing real estate projects designed for long-term returns."
    heroLabel="Commercial Units"
    heroTitle="Commercial Units for Investment in Shorouk City"
    heroDescription="Invest in commercial properties built for sustainable growth. Secure high-demand commercial properties for investment inside Shorouk City's most promising real estate projects."
    introTitle="Commercial Units for Investment at the Best Malls in El Shorouk City"
    introDescription="At ASWAQ Developments, we offer carefully planned commercial units designed to deliver strong rental demand, long-term value appreciation, and stable returns for investors. Investing in commercial units in El Shorouk means owning income-generating assets backed by real market demand."
    locationTitle="Why Shorouk City is a Smart Location for Commercial Units"
    locationDescription="Shorouk City is one of Cairo's fastest growing destinations, making it an ideal choice for commercial units investment."
    locationDrivers={[
      "Strategic location with easy access to Cairo–Ismailia Road and nearby new cities",
      "Rapid population growth driven by residential compounds and universities",
      "Increasing demand for retail, dining, and daily services",
    ]}
    locationConclusion="Investing in commercial units in El Shorouk means owning income-generating assets backed by real market demand."
    mallsSectionTitle="Best Commercial Units for Investment at ASWAQ Malls"
    mallsSectionIntro="ASWAQ's commercial units are located inside 4 distinctive malls, each serving a specific market segment and customer behavior."
    malls={[
      { name: "Solaria Mall", href: "/projects/solaria-mall", description: "Establish your brand in a sophisticated, next-generation mall designed for luxury and accessibility. Located near the Suez Road and major institutions.", sizes: "Spaces from 30 m² to 300 m²" },
      { name: "Arena Mall", href: "/projects/arena-mall", description: "Capitalize on a young, active demographic directly across from the French University. With the city's first dedicated food court and a constant stream of students and professionals.", sizes: "Spaces from 30 m² to 300 m²" },
      { name: "Mercado Mall", href: "/projects/mercado-mall", description: "Boost your brand's visibility in El Shorouk's busiest commercial hub, placed in a high-density residential zone with a built-in customer base from Madinaty and New Heliopolis.", sizes: "Spaces from 24 m² to 300 m²" },
      { name: "City Hub Mall", href: "/projects/city-hub-mall", description: "Position your business in the heart of the 'Clubs District,' facing El Shorouk's premier sporting clubs. Famous for its open-air dining and dancing fountain.", sizes: "Spaces from 30 m² to 300 m²" },
    ]}
    ctaTitle="Start Your Commercial Investment with ASWAQ"
    ctaSubtitle="Contact us now to explore available units, pricing details, and investment opportunities tailored to your business goals."
    faqs={commonFaqs}
  />
);

export default CommercialForInvestment;
