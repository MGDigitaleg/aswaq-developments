import useSEO from "@/hooks/useSEO";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Layers, TrendingUp, ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import unitSaleImg from "@/assets/units-sale.webp";
import unitInvestmentImg from "@/assets/units-investment.webp";
import unitRentImg from "@/assets/units-rent.webp";
import JsonLd, { buildBreadcrumbSchema, buildFaqSchema } from "@/components/JsonLd";

const unitTypes = [
  {
    title: "Units for Sale",
    icon: "🏷️",
    image: unitSaleImg,
    description:
      "Own a unit in a strategically located development and secure a long-term asset with strong growth potential. ASWAQ offers a variety of units for sale suitable for retail and commercial use.",
    cta: "Explore Units for Sale in El Shorouk",
    link: "/units/for-sale",
  },
  {
    title: "Units for Investment",
    icon: "📈",
    image: unitInvestmentImg,
    description:
      "Looking for reliable returns? Our investment units are selected based on location strength, rental demand, and market performance. Ideal for investors seeking income-generating real estate with professional planning and clear demand drivers.",
    cta: "Explore Units for Investment in El Shorouk",
    link: "/units/for-investment",
  },
  {
    title: "Units for Rent",
    icon: "🏢",
    image: unitRentImg,
    description:
      "Discover flexible properties for rent in high-traffic, well-serviced developments. Whether you're launching a new business or expanding an existing one, ASWAQ provides ready-to-operate rental units that match different business models.",
    cta: "Explore Units for Rent in El Shorouk",
    link: "/units/for-rent",
  },
];

const whyChoose = [
  { icon: MapPin, text: "Strategic Locations", desc: "Strong foot traffic areas" },
  { icon: Layers, text: "Flexible Unit Sizes", desc: "Practical layouts 30-300 m²" },
  { icon: TrendingUp, text: "Investment-Ready", desc: "Sustainable value planning" },
  { icon: ShieldCheck, text: "Fully Serviced", desc: "Environments for business growth" },
];

const faqs = [
  {
    question: "What types of properties does ASWAQ Developments offer?",
    answer:
      "ASWAQ Developments offers a range of commercial real estate options, including commercial units for sale, units for rent, and administrative spaces located within strategic malls and commercial destinations. We design our properties to serve businesses, investors, and tenants looking for quality spaces with strong footfall.",
  },
  {
    question: "How do I buy a unit or property in Shorouk City?",
    answer:
      "To buy a property in Shorouk City, you first decide the type of property that matches your needs, search for aswaq-egypt.com, discover the types we offer and locations, then contact us to request your unit.",
  },
  {
    question: "Where can I buy a unit in Shorouk City?",
    answer:
      "ASWAQ Developments offers a range of commercial and retail spaces for sale across its four major mall destinations: Solaria Mall, Arena Mall, Mercado Mall, and City Hub Mall. These units range in size from 24 m² up to 300 m², providing flexible options.",
  },
  {
    question: "How many malls does ASWAQ Developments have units in?",
    answer:
      "ASWAQ Developments currently offers units in four major malls in Shorouk City: Solaria Mall, Arena Mall, Mercado Mall, and City Hub Mall. Each mall targets a different retail and service audience to help businesses thrive.",
  },
  {
    question: "What are the typical sizes of the spaces & units available?",
    answer:
      "Our units & spaces range from 30 m² up to 300 m², giving flexibility for small shops, medium-sized outlets, and larger flagship stores. Whether you're starting a new business or expanding an existing one, we have units that fit your needs.",
  },
  {
    question: "Where are ASWAQ's units located?",
    answer:
      "All our commercial spaces are strategically located in Shorouk City, one of East Cairo's fast-growing urban hubs. These locations benefit from residential density, accessibility, and increasing daily foot traffic.",
  },
  {
    question: "Are the commercial units available for both sale and rent?",
    answer:
      "Yes. ASWAQ Developments offers both commercial units for sale and units for rent across our four mall destinations. You can choose according to your investment capacity and business strategy.",
  },
  {
    question: "What types of businesses can operate in ASWAQ's malls?",
    answer:
      "Our units are suitable for a variety of businesses, such as retail shops, cafés, restaurants, service centers, and offices. Each mall's environment supports specific business activity, from daily needs to lifestyle-driven outlets.",
  },
  {
    question: "What makes ASWAQ's locations attractive for investors?",
    answer:
      "ASWAQ's locations are carefully chosen based on growth potential, residential proximity, and accessibility. Shorouk City's consistent population growth and increasing demand for commercial activity make our units a strong investment opportunity with future appreciation.",
  },
  {
    question: "Are there flexible payment plans for buying units?",
    answer:
      "Yes. ASWAQ Developments offers flexible payment plans for buyers interested in owning a unit. This allows investors and business owners to manage payments over time while securing prime retail and commercial space.",
  },
];

const AvailableUnits = () => {
  useSEO("Choose Your Unit in Shorouk City | Properties for Sale & Properties", "Explore units for sale, investment opportunities, and properties for rent across prime developments by ASWAQ Developments, a trusted real estate developer in Egypt. Choose your unit today.");

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Available Units", url: "/units" },
  ]);
  const faqSchemaData = buildFaqSchema(faqs.map(f => ({ question: f.question, answer: f.answer })));

  return (
    <Layout>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={faqSchemaData} />
      {/* Hero */}
      <section className="bg-primary pt-40 pb-16 min-h-[450px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary-foreground/60 font-body font-medium tracking-widest uppercase text-sm mb-3">
              Choose Your Unit
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-6">
              Available Units: Explore Properties for<br />Sale, Investment & Rent
            </h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto mb-4">
              Whether you're looking for units for sale, properties for rent, or smart investment opportunities, ASWAQ Developments offers a carefully selected portfolio of commercial and administrative units in prime locations across Egypt.
            </p>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto">
              Explore flexible spaces designed to meet real business needs, developed by a trusted Real Estate Developer in Egypt with a clear focus on value, location, and long-term growth. Choose your unit type below and start your journey today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Unit Types */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {unitTypes.map((type, i) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="md:w-1/2">
                  <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-sm">
                    <img
                      src={type.image}
                      alt={type.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <span className="text-3xl mb-3 block">{type.icon}</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
                    {type.title}
                  </h2>
                  <p className="text-muted-foreground font-body leading-relaxed mb-6">
                    {type.description}
                  </p>
                  <Link
                    to={type.link}
                    className="inline-block bg-accent text-accent-foreground px-6 py-2.5 font-semibold rounded-lg hover:bg-gold-light hover:shadow-md transition-all duration-300 font-body text-sm"
                  >
                    {type.cta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12 md:py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Why Choose ASWAQ Developments?
          </h2>
          <p className="text-muted-foreground font-body max-w-3xl mx-auto mb-12">
            ASWAQ Developments is a leading Real Estate Developer in Egypt, specializing in mixed-use and commercial projects designed around real market demand. Every project is planned with a focus on:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {whyChoose.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-3 p-6 bg-background rounded-2xl border border-border/50 shadow-sm"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon size={24} className="text-primary" />
                </div>
                <p className="font-semibold text-foreground font-body">{item.text}</p>
                <p className="text-sm text-muted-foreground font-body">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection faqs={faqs} />

      {/* CTA */}
      <CTASection />
    </Layout>
  );
};

export default AvailableUnits;
