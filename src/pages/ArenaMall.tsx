import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Building2, Stethoscope, Briefcase, ShoppingBag } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import MallGallerySection from "@/components/MallGallerySection";
import arenaImg from "@/assets/arena-mall.jpg";
import useSEO from "@/hooks/useSEO";
import arena1 from "@/assets/gallery/arena-1.jpg";
import arena2 from "@/assets/gallery/arena-2.jpg";

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
      <section className="bg-primary py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent font-body font-medium tracking-widest uppercase text-sm mb-3">
              ASWAQ Developments
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Arena Mall at El Shorouk
            </h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto">
              A contemporary mixed-use project designed to serve the evolving needs of businesses, professionals, and investors in El Shorouk City.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-lg overflow-hidden aspect-[4/3]">
                <img src={arenaImg} alt="Arena Mall" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Arena Mall at El Shorouk</h2>
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
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-6">
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
                className="flex items-start gap-3 p-5 bg-background rounded-lg"
              >
                <MapPin size={20} className="text-accent shrink-0 mt-0.5" />
                <p className="text-foreground font-body text-sm">{adv}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Units */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Commercial Units Available at Arena Mall
          </h2>
          <p className="text-muted-foreground font-body max-w-3xl mx-auto mb-12">
            Explore available units for rent & sale at Arena Mall ranging from 30 m² to 300 m², suitable for both small enterprises and larger commercial concepts.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {unitTypes.map((type, i) => (
              <motion.div
                key={type.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-3 p-6 bg-cream rounded-lg"
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
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
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
                className="flex items-start gap-3 p-4 bg-background rounded-lg"
              >
                <span className="text-accent font-bold">✓</span>
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
