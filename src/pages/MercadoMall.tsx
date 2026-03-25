import { motion } from "framer-motion";
import { MapPin, ShoppingBag, TrendingUp, Store, Wrench } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import MallGallerySection from "@/components/MallGallerySection";
import mercadoImg from "@/assets/mercado-mall.jpg";
import useSEO from "@/hooks/useSEO";
import mercado1 from "@/assets/gallery/mercado-1.jpg";

const galleryImages = [mercado1];
const galleryVideos = ["fHgVO2698Jw", "_QHKwyMozZw", "hUGvrHMnmoY"];

const unitTypes = [
  { icon: ShoppingBag, label: "Commercial units for rent" },
  { icon: TrendingUp, label: "Retail properties for investment" },
  { icon: Store, label: "Retail shops for rent" },
  { icon: Wrench, label: "Service providers & specialty businesses" },
];

const locationAdvantages = [
  "Prime position within a vital service and residential zone",
  "Direct frontage on key landmarks, attracting constant movement",
  "Easy accessibility through main internal roads of El Shorouk",
  "Surrounded by established residential communities and essential services",
];

const whyInvest = [
  "Strategic location in East Cairo with steady foot traffic",
  "Modern architectural design enhancing visibility and business appeal",
  "Flexible unit sizes starting from approximately 24 m²",
  "Competitive pricing with attractive entry points for investors",
  "Flexible payment plans with investor-friendly installment options",
  "Immediate or near-immediate delivery for faster operation",
  "Fully serviced: parking, security, surveillance, elevators, and plaza areas",
];

const MercadoMall = () => {
  useSEO("Mercado Mall | Commercial Units for Rent in El Shorouk", "Looking for commercial property for rent? Invest in Mercado Mall El Shorouk, offering retail units for sale & rent at flexible prices.");

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-24 md:py-28">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-accent font-body font-semibold tracking-[0.25em] uppercase text-xs mb-4">ASWAQ Developments</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">Mercado Mall at El Shorouk</h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto text-base leading-relaxed">
              A prime commercial destination designed to meet the growing demand for retail and business spaces in East Cairo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div className="md:w-1/2" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="rounded-xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <img src={mercadoImg} alt="Mercado Mall" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div className="md:w-1/2" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="section-divider mb-5" style={{ marginLeft: 0 }} />
              <h2 className="font-display text-3xl font-bold text-foreground mb-5">Mercado Mall at El Shorouk</h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                Mercado Mall El Shorouk is a prime commercial destination strategically located in a prime location. The mall spans three floors, offering a wide range of commercial units starting from 24 square meters.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                With its strong location, practical layouts, and investment-focused design, Mercado Mall represents a solid opportunity for investors seeking commercial real estate and property for sale in Egypt.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-divider mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5">Mercado Mall Location</h2>
            <p className="text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed">
              Strategically located in El Shorouk City – Second District West, directly facing Banque du Caire and the Japanese School, ensuring continuous daily foot traffic and high visibility.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {locationAdvantages.map((adv, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex items-start gap-3 p-5 bg-background rounded-xl border border-border/50 hover:border-accent/20 transition-all duration-300"
              >
                <MapPin size={20} className="text-accent shrink-0 mt-0.5" />
                <p className="text-foreground font-body text-sm leading-relaxed">{adv}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 max-w-4xl mx-auto rounded-xl overflow-hidden"
            style={{ boxShadow: 'var(--shadow-lg)' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d442274.52711179055!2d31.4139086!3d30.0004101!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14581d4c995d3bcb%3A0x9e8ec7cb114e26c5!2sMercado%20mall!5e0!3m2!1sen!2seg!4v1772535763986!5m2!1sen!2seg"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mercado Mall Location"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Available Units */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="section-divider mb-6" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5">Commercial Units Available at Mercado Mall</h2>
          <p className="text-muted-foreground font-body max-w-3xl mx-auto mb-12 leading-relaxed">
            Explore available units for rent & sale at Mercado Mall ranging from 24 m² to 300 m².
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {unitTypes.map((type, i) => (
              <motion.div key={type.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex flex-col items-center gap-4 p-6 md:p-8 bg-cream rounded-xl border border-border/50 hover:border-accent/20 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <type.icon size={26} className="text-primary" />
                </div>
                <p className="font-semibold text-foreground font-body text-sm text-center">{type.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invest */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-divider mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Why Invest in Mercado Mall</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {whyInvest.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }}
                className="flex items-start gap-3 p-5 bg-background rounded-xl border border-border/50 hover:border-accent/20 transition-all duration-300"
              >
                <span className="text-accent font-bold text-lg">✓</span>
                <p className="text-foreground font-body text-sm leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MallGallerySection mallName="Mercado Mall" images={galleryImages} videos={galleryVideos} />

      <CTASection
        title="Invest in Mercado Mall Today"
        subtitle="Secure your commercial unit in a well-located, ready-to-operate mall in El Shorouk City and benefit from strong rental demand and long-term growth potential."
        buttonText="Request Unit Details"
        buttonLink="/contact"
      />
    </Layout>
  );
};

export default MercadoMall;
