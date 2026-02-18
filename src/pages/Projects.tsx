import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import cityhubImg from "@/assets/cityhub-mall.jpg";
import mercadoImg from "@/assets/mercado-mall.jpg";
import arenaImg from "@/assets/arena-mall.jpg";
import solariaImg from "@/assets/solaria-mall.jpg";

const projects = [
  {
    name: "Solaria Mall",
    image: solariaImg,
    description:
      "A modern mixed-use destination designed to serve the daily needs of surrounding communities. Ideal for commercial, retail, service-based businesses, medical units, and offices.",
  },
  {
    name: "Arena Mall",
    image: arenaImg,
    description:
      "A dynamic mixed-use destination developed to maximize accessibility and exposure. The strong choice for businesses seeking growth in a high-demand area.",
  },
  {
    name: "Mercado Mall",
    image: mercadoImg,
    description:
      "Mercado Mall delivers a lifestyle-focused commercial & retail environment that attracts a diverse audience. It supports dining, fashion, and specialty retail concepts.",
  },
  {
    name: "City Hub Mall",
    image: cityhubImg,
    description:
      "City Hub Mall is a well-planned commercial project combining convenience and long-term investments. It offers flexible commercial spaces for sustainable business performance.",
  },
];

const faqs = [
  {
    question: "What types of properties does ASWAQ Developments offer?",
    answer:
      "ASWAQ Developments offers a range of commercial real estate options, including commercial units for sale, units for rent, administrative spaces, and medical units located within strategic malls and commercial destinations.",
  },
  {
    question: "Are the commercial units available for both sale and rent?",
    answer:
      "Yes. ASWAQ Developments offers both commercial units for sale and units for rent across our four mall destinations.",
  },
  {
    question: "What makes ASWAQ's locations attractive for investors?",
    answer:
      "Our locations are carefully chosen based on growth potential, residential proximity, and accessibility. Shorouk City's consistent population growth and increasing demand make our units a strong investment opportunity.",
  },
  {
    question: "How can I inquire about available units or prices?",
    answer:
      "You can contact ASWAQ Developments directly through the Contact Us page, submit a Request a Demo form, or call our sales team.",
  },
  {
    question: "Are there flexible payment plans for buying units?",
    answer:
      "Yes. ASWAQ Developments offers flexible payment plans for buyers interested in owning a unit.",
  },
];

const Projects = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent font-body font-medium tracking-widest uppercase text-sm mb-3">
              Our Developments
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              ASWAQ Developments<br />Real Estate Projects
            </h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto">
              ASWAQ Developments Projects represent a portfolio of carefully planned real estate projects designed to support businesses, investors, and growing brands. Our developments focus on creating high-performing commercial destinations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent flex flex-col justify-end p-8">
                  <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">
                    {project.name}
                  </h3>
                  <p className="text-primary-foreground/80 text-sm font-body max-w-md">
                    {project.description}
                  </p>
                  <Link
                    to="/units"
                    className="inline-flex items-center gap-2 text-accent font-body font-semibold text-sm mt-4 hover:text-gold-light transition-colors"
                  >
                    Explore Project →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Units CTA */}
      <section className="bg-accent py-16">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-accent-foreground mb-2">
              Available Units for Sale & Rent
            </h2>
            <p className="text-accent-foreground/80 font-body max-w-lg">
              Across ASWAQ Developments Projects, a variety of units are available to suit different business and investment needs. Spaces range from 30 m² to 300 m².
            </p>
          </div>
          <Link
            to="/units"
            className="shrink-0 bg-primary text-primary-foreground px-8 py-3 font-semibold rounded hover:bg-navy-light transition-colors font-body"
          >
            Explore Available Units
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection faqs={faqs} />

      {/* CTA */}
      <CTASection />
    </Layout>
  );
};

export default Projects;
