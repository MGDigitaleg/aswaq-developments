import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
    description:
      "A modern mixed-use destination designed to serve the daily needs of surrounding communities. It's ideal for commercial, retail and service-based businesses, medical units and offices.",
  },
  {
    name: "Arena Mall",
    image: arenaImg,
    href: "/projects/arena-mall",
    description:
      "A dynamic mixed-use destination developed to maximize accessibility and exposure. The strong choice for businesses seeking growth in a high-demand area.",
  },
  {
    name: "Mercado Mall",
    image: mercadoImg,
    href: "/projects/mercado-mall",
    description:
      "Mercado Mall delivers a lifestyle-focused commercial & retail environment that attracts a diverse audience. It supports dining, fashion, and specialty retail concepts, creating opportunities for both operators and investors.",
  },
  {
    name: "City Hub Mall",
    image: cityhubImg,
    href: "/projects/city-hub-mall",
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

      {/* Hero Banner */}
      <section className="relative h-[360px] md:h-[440px] flex items-center justify-center pt-[120px] overflow-hidden">
        <img
          src={heroImg}
          alt="ASWAQ Developments Real Estate Projects"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center px-4"
        >
          <p className="text-primary-foreground/60 font-body font-semibold tracking-[0.25em] uppercase text-xs mb-4">Our Portfolio</p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground">
            ASWAQ Developments Real Estate Projects
          </h1>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="section-divider mb-6" />
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
              Integrated Real Estate Projects in Shorouk City
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              ASWAQ Developments Projects represent a portfolio of carefully planned real estate projects designed to support businesses, investors, and growing brands. Our developments focus on creating high-performing commercial destinations through smart planning, strategic locations, and flexible spaces.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              With a strong focus on mixed-use units in Egypt, ASWAQ Developments offers commercial units across multiple malls where you can explore{" "}
              <Link to="/units/for-sale" className="text-primary font-semibold underline hover:text-secondary transition-colors">
                available retail spaces in Shorouk City
              </Link>
              , whether it's for both property for sale in Egypt and commercial property for rent, all within well-connected areas in Shorouk City.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Cards with Hover */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={project.href}
                  className="group block relative rounded-xl overflow-hidden aspect-[4/3]"
                  style={{ boxShadow: 'var(--shadow-lg)' }}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Default overlay with name */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex items-end p-6 md:p-8 transition-opacity duration-300 group-hover:opacity-0">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground">
                      {project.name}
                    </h3>
                  </div>
                  {/* Hover overlay with description */}
                  <div className="absolute inset-0 bg-primary/85 flex flex-col items-center justify-center p-8 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-4">
                      {project.name}
                    </h3>
                    <p className="text-primary-foreground/80 font-body text-sm md:text-base leading-relaxed max-w-sm">
                      {project.description}
                    </p>
                    <span className="mt-5 text-primary-foreground font-semibold text-sm font-body inline-flex items-center gap-1.5">
                      Explore Project <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Units CTA */}
      <section className="bg-primary py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-6">
              Available Units for Sale & Rent
            </h2>
            <p className="text-primary-foreground/70 font-body leading-relaxed mb-4">
              Across ASWAQ Developments Projects, a variety of units are available to suit different business and investment needs. Our spaces range from 30 m² to 300 m², providing flexible options for small shops, medium-sized outlets, and larger commercial concepts.
            </p>
            <p className="text-primary-foreground/70 font-body leading-relaxed mb-10">
              Whether you are searching for commercial units for rent, commercial property for rent, or mixed-use units for sale in Egypt, ASWAQ Developments offers strategic opportunities within fully developed malls in Shorouk City.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 bg-accent text-accent-foreground px-10 py-3.5 font-semibold rounded-lg hover:bg-gold-light hover:shadow-md transition-all duration-300 font-body"
            >
              Explore Available Units
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection
        faqs={faqs}
        title="You Ask, We Answer"
      />
    </Layout>
  );
};

export default Projects;
