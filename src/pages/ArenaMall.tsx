import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Building2, Stethoscope, Briefcase, ShoppingBag } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import MallGallerySection from "@/components/MallGallerySection";
import arenaImg from "@/assets/arena-mall.webp";
import useSEO from "@/hooks/useSEO";
import arena1 from "@/assets/gallery/arena-1.webp";
import arena2 from "@/assets/gallery/arena-2.webp";

const galleryImages = [arena1, arena2];
const galleryVideos = ["buh9BJmWn9A", "unR4JKFXAXE", "6YWp0lGYC3Q", "JFqUABOPOk8", "kVdnKIBWN2A"];

const unitTypes = [
  { icon: ShoppingBag, label: "Retail shops and showrooms" },
  { icon: Stethoscope, label: "Medical clinics and healthcare units" },
  { icon: Briefcase, label: "Corporate and administrative offices" },
  { icon: Building2, label: "Flexible business units" },
];

const whyInvest = [
  "Strategic frontage opposite French University with strong daily activity",
  "Mixed-use design accommodating retail, healthcare, and offices",
  "Flexible unit layouts catering to multiple industries",
  "Modern architecture and professional environment",
  "Access to major transportation routes and surrounding communities",
  "Competitive prices with investor-friendly payment plans",
  "Fully serviced: parking, security, surveillance, elevators, and plaza areas",
];

const locationAdvantages = [
  "High visibility and foot traffic from students, faculty, and nearby residents",
  "Easy access via major roads connecting Shorouk City with neighboring communities",
  "Proximity to expanding residential districts and service hubs",
  "Enhanced demand for retail, office workspaces, and healthcare services",
];

const ArenaMall = () => {
  useSEO("Arena Mall | Commercial, Medical, & Administrative Units for Rent in El Shorouk", "Explore properties for rent at Arena Mall El Shorouk by ASWAQ Developments. Discover commercial, business, and medical units in a prime mixed-use location. Find your ideal rental space today.");

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary pt-48 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary-foreground/60 font-body font-medium tracking-widest uppercase text-sm mb-3">
              ASWAQ Developments
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-6">
              Arena Mall at El Shorouk
            </h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto">
              A contemporary mixed-use project designed to serve the evolving needs of businesses, professionals, and investors in El Shorouk City.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-sm">
                <img src={arenaImg} alt="Arena Mall" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground mb-4">Arena Mall at El Shorouk</h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                Arena Mall is a contemporary mixed-use project by ASWAQ Developments, situated in one of El Shorouk City's most strategic locations. It offers a premium environment with a mix of retail, administrative, and medical units.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                With modern architectural design and versatile unit types, the mall caters to retail outlets and shops, professional offices and administrative spaces, along with healthcare and medical service units.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground text-center mb-6">
            Arena Mall Location
          </h2>
          <p className="text-muted-foreground font-body text-center max-w-3xl mx-auto mb-12">
            Strategically positioned directly opposite the French University in El Shorouk City, Arena Mall benefits from high visibility and consistent demand.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {locationAdvantages.map((adv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 p-5 bg-background rounded-2xl border border-border/50 hover:shadow-md transition-all duration-300"
              >
                <MapPin size={20} className="text-primary shrink-0 mt-0.5" />
                <p className="text-foreground font-body text-sm">{adv}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d220929.63495783907!2d31.4380646!3d30.0934547!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14581dde296e1a5b%3A0xdc596b1d18b48bea!2sArena%20Mall%20El-Shorouk!5e0!3m2!1sen!2seg!4v1772535766831!5m2!1sen!2seg"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Arena Mall Location"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Available Units */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Commercial Units Available at Arena Mall
          </h2>
          <p className="text-muted-foreground font-body max-w-3xl mx-auto mb-12">
            Explore available units for rent & sale at Arena Mall ranging from 16 m² to 343 m², suitable for both small enterprises and larger commercial concepts.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {unitTypes.map((type, i) => (
              <motion.div
                key={type.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-3 p-6 bg-cream rounded-2xl border border-border/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <type.icon size={24} className="text-primary" />
                </div>
                <p className="font-semibold text-foreground font-body text-sm text-center">{type.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invest */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground text-center mb-12">
            Why Invest in Arena Mall
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {whyInvest.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-4 bg-background rounded-2xl border border-border/50 hover:shadow-md transition-all duration-300"
              >
                <span className="text-primary font-bold">✓</span>
                <p className="text-foreground font-body text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MallGallerySection mallName="Arena Mall" images={galleryImages} videos={galleryVideos} />

      <CTASection
        title="Invest in Arena Mall Today"
        subtitle="Unlock prime business space at Arena Mall El Shorouk. Contact ASWAQ Developments for details, pricing, unit layouts, and availability."
        buttonText="Request Unit Details"
        buttonLink="/contact"
      />
    </Layout>
  );
};

export default ArenaMall;
