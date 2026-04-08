import { motion } from "framer-motion";
import { MapPin, Building2, Stethoscope, Briefcase, ShoppingBag, CheckCircle2 } from "lucide-react";
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
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 md:pt-40 pb-16 md:pb-20 text-center relative z-10 min-h-[420px] flex flex-col justify-end">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase font-body mb-4 text-primary-foreground/40">ASWAQ Developments</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-5 leading-tight">Arena Mall at El Shorouk</h1>
            <p className="text-primary-foreground/55 font-body max-w-2xl mx-auto text-[15px] leading-relaxed">
              A contemporary mixed-use project designed to serve the evolving needs of businesses, professionals, and investors in El Shorouk City.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <img src={arenaImg} alt="Arena Mall - ASWAQ Developments El Shorouk" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="section-divider mb-6" style={{ marginLeft: 0, marginRight: 'auto' }} />
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">Arena Mall at El Shorouk</h2>
              <p className="text-muted-foreground font-body text-[15px] leading-[1.9] mb-4">
                Arena Mall is a contemporary mixed-use project by ASWAQ Developments, situated in one of El Shorouk City's most strategic locations. It offers a premium environment with a mix of retail, administrative, and medical units.
              </p>
              <p className="text-muted-foreground font-body text-[15px] leading-[1.9]">
                With modern architectural design and versatile unit types, the mall caters to retail outlets and shops, professional offices and administrative spaces, along with healthcare and medical service units.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Strategic Position</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">Arena Mall Location</h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto text-[15px] leading-relaxed">
              Strategically positioned directly opposite the French University in El Shorouk City, Arena Mall benefits from high visibility and consistent demand.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {locationAdvantages.map((adv, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}
                className="flex items-start gap-3 p-4 md:p-5 bg-card rounded-xl border border-border/30 hover:border-accent/15 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={15} className="text-accent" />
                </div>
                <p className="text-foreground font-body text-sm leading-relaxed">{adv}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 max-w-4xl mx-auto rounded-2xl overflow-hidden"
            style={{ boxShadow: 'var(--shadow-lg)' }}
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
          <p className="section-label mb-3">Available Spaces</p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Commercial Units Available at Arena Mall
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto mb-12 text-[15px] leading-relaxed">
            Explore available units for rent & sale at Arena Mall ranging from 16 m² to 343 m², suitable for both small enterprises and larger commercial concepts.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {unitTypes.map((type, i) => (
              <motion.div key={type.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}
                className="flex flex-col items-center gap-4 p-6 md:p-7 bg-card rounded-2xl border border-border/30 hover:border-accent/15 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <type.icon size={24} className="text-accent" />
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
          <div className="text-center mb-12">
            <p className="section-label mb-3">Investment Value</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">Why Invest in Arena Mall</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {whyInvest.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex items-start gap-3 p-4 md:p-5 bg-card rounded-xl border border-border/30 hover:border-accent/15 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                <p className="text-foreground font-body text-sm leading-relaxed">{item}</p>
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
