import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import useSEO from "@/hooks/useSEO";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import JsonLd, { buildBreadcrumbSchema, buildProjectSchema } from "@/components/JsonLd";
import cityhubImg from "@/assets/cityhub-mall.webp";
import mercadoImg from "@/assets/mercado-mall.webp";
import arenaImg from "@/assets/arena-mall.webp";
import solariaImg from "@/assets/solaria-mall.webp";
import heroImg from "@/assets/hero-building.webp";

const projects = [
  {
    name: "Solaria Mall",
    image: solariaImg,
    href: "/projects/solaria-mall",
    tag: "Retail & Medical",
    description:
      "A modern mixed-use destination designed to serve the daily needs of surrounding communities. It's ideal for commercial, retail and service-based businesses, medical units and offices.",
  },
  {
    name: "Arena Mall",
    image: arenaImg,
    href: "/projects/arena-mall",
    tag: "Commercial & Medical",
    description:
      "A dynamic mixed-use destination developed to maximize accessibility and exposure. The strong choice for businesses seeking growth in a high-demand area.",
  },
  {
    name: "Mercado Mall",
    image: mercadoImg,
    href: "/projects/mercado-mall",
    tag: "Mixed-Use",
    description:
      "Mercado Mall delivers a lifestyle-focused commercial & retail environment that attracts a diverse audience. It supports dining, fashion, and specialty retail concepts, creating opportunities for both operators and investors.",
  },
  {
    name: "City Hub Mall",
    image: cityhubImg,
    href: "/projects/city-hub-mall",
    tag: "Commercial & Retail",
    description:
      "City Hub Mall is a well-planned commercial project combining convenience and long-term investments. It offers flexible commercial spaces designed to support sustainable business performance in a growing urban hub.",
  },
];

const faqs = [
  {
    question: "What types of properties does ASWAQ Developments offer?",
    answer:
      "ASWAQ Developments offers a range of commercial real estate options, including commercial units for sale, units for rent, administrative spaces, and medical units located within strategic malls and commercial destinations. We design our properties to serve businesses, investors, and tenants looking for quality spaces with strong footfall.",
  },
  {
    question: "How do I buy a unit or property in Shorouk City?",
    answer:
      "To buy a property in Shorouk City, you first decide the type of property that matches your needs, search for aswaq-egypt.com, discover the types we offer and locations, then contact us to request your unit.",
  },
  {
    question: "Where can I buy a unit in Shorouk City?",
    answer:
      "If you want to buy a unit in Shorouk City, ASWAQ Developments offers a range of commercial and retail spaces for sale across its four major mall destinations: Solaria Mall, Arena Mall, Mercado Mall, and City Hub Mall. These units range in size from 24 m² up to 300 m², providing flexible options.",
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
      "All our commercial spaces are strategically located in Shorouk City, one of East Cairo's fast-growing urban hubs. These locations benefit from residential density, easy access, and increasing daily traffic, perfect for businesses seeking visibility and long-term growth.",
  },
  {
    question: "Are the commercial units available for both sale and rent?",
    answer:
      "Yes. ASWAQ Developments offers both commercial units for sale and units for rent across our four mall destinations. You can choose according to your investment capacity and business strategy.",
  },
  {
    question: "What types of businesses can operate in ASWAQ's malls?",
    answer:
      "Our units are suitable for a variety of businesses, such as retail shops, cafés, restaurants, service centers, medical clinics, offices, and more. Each mall's environment supports specific business activity, from daily needs to lifestyle-driven outlets.",
  },
  {
    question: "What makes ASWAQ's locations attractive for investors?",
    answer:
      "ASWAQ Developments' locations are carefully chosen based on growth potential, residential proximity, and accessibility. Shorouk City's consistent population growth and increasing demand for commercial activity make our units a strong investment opportunity with future appreciation.",
  },
  {
    question: "How can I inquire about available units or prices?",
    answer:
      "You can contact ASWAQ Developments directly through the Contact Us page, submit a Request a Demo form, or call our sales team. We'll provide up-to-date availability, pricing details, and tailored recommendations based on your business goals.",
  },
  {
    question: "Are there flexible payment plans for buying units?",
    answer:
      "Yes. ASWAQ Developments offers flexible payment plans for buyers interested in owning a unit. This allows investors and business owners to manage payments over time while securing prime retail and commercial, administrative, and medical space.",
  },
];

const Projects = () => {
  useSEO("ASWAQ Developments Real Estate Projects", "Looking for commercial units for sale in Shorouk? Discover premium commercial properties in Shorouk City's most active malls with ASWAQ.");

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Our Projects", url: "/projects" },
  ]);

  const projectSchemas = projects.map(p => buildProjectSchema({
    name: p.name,
    description: p.description,
    image: p.image,
    url: p.href,
  }));

  return (
    <Layout>
      <JsonLd data={breadcrumbs} />
      {projectSchemas.map((schema, i) => <JsonLd key={i} data={schema} />)}

      {/* Hero */}
      <section className="relative min-h-[420px] md:min-h-[480px] flex items-end pb-16 md:pb-20 overflow-hidden">
        <img
          src={heroImg}
          alt="ASWAQ Developments Real Estate Projects in El Shorouk"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, hsl(226 76% 6% / 0.4) 0%, hsl(226 76% 6% / 0.75) 100%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-40">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-body font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: 'hsl(var(--gold) / 0.75)' }}>Our Portfolio</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight max-w-2xl">
              ASWAQ Developments Real Estate Projects
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="section-divider mb-8" />
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
              Integrated Real Estate Projects in Shorouk City
            </h2>
            <p className="text-muted-foreground font-body text-[15px] leading-[1.9] mb-5">
              ASWAQ Developments Projects represent a portfolio of carefully planned real estate projects designed to support businesses, investors, and growing brands. Our developments focus on creating high-performing commercial destinations through smart planning, strategic locations, and flexible spaces.
            </p>
            <p className="text-muted-foreground font-body text-[15px] leading-[1.9]">
              With a strong focus on mixed-use units in Egypt, ASWAQ Developments offers commercial units across multiple malls where you can explore{" "}
              <Link to="/units/for-sale" className="text-accent font-semibold hover:underline transition-colors">
                available retail spaces in Shorouk City
              </Link>
              , whether for property for sale or commercial property for rent, all within well-connected areas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Showcase */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            {projects.slice(0, 2).map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={project.href}
                  className="group block relative rounded-2xl overflow-hidden aspect-[16/10]"
                  style={{ boxShadow: 'var(--shadow-lg)' }}
                >
                  <img
                    src={project.image}
                    alt={`${project.name} - ASWAQ Developments`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <span className="inline-block text-[10px] font-body font-semibold tracking-[0.12em] uppercase text-accent mb-2">{project.tag}</span>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-2">
                      {project.name}
                    </h3>
                    <p className="text-primary-foreground/55 text-sm font-body line-clamp-2 max-w-md">{project.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-primary-foreground/70 font-body font-semibold text-sm mt-3 group-hover:gap-2.5 transition-all duration-300">
                      Explore Project <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.slice(2).map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={project.href}
                  className="group block relative rounded-2xl overflow-hidden aspect-[16/10]"
                  style={{ boxShadow: 'var(--shadow-lg)' }}
                >
                  <img
                    src={project.image}
                    alt={`${project.name} - ASWAQ Developments`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block text-[10px] font-body font-semibold tracking-[0.12em] uppercase text-accent mb-2">{project.tag}</span>
                    <h3 className="font-display text-lg md:text-xl font-bold text-primary-foreground mb-1.5">
                      {project.name}
                    </h3>
                    <p className="text-primary-foreground/55 text-sm font-body line-clamp-2">{project.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Units CTA */}
      <section className="relative py-20 md:py-28 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase font-body text-accent mb-4">Available Now</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-6 leading-tight">
              Available Units for Sale & Rent
            </h2>
            <p className="text-primary-foreground/55 font-body text-[15px] leading-[1.9] mb-4">
              Across ASWAQ Developments Projects, a variety of units are available to suit different business and investment needs. Our spaces range from 30 m² to 300 m², providing flexible options for small shops, medium-sized outlets, and larger commercial concepts.
            </p>
            <p className="text-primary-foreground/55 font-body text-[15px] leading-[1.9] mb-10">
              Whether you are searching for commercial units for rent, commercial property for rent, or mixed-use units for sale in Egypt, ASWAQ Developments offers strategic opportunities within fully developed malls in Shorouk City.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/units"
                className="btn-premium px-9 py-4 text-sm rounded-lg font-body group inline-flex items-center justify-center gap-2"
              >
                Explore Available Units
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="btn-outline-light px-9 py-4 text-sm rounded-lg font-body text-center"
              >
                Request a Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection faqs={faqs} title="You Ask, We Answer" />
    </Layout>
  );
};

export default Projects;
