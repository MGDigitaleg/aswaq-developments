import { motion } from "framer-motion";
import { MapPin, ShoppingBag, Stethoscope, Briefcase, Building2, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import MallGallerySection from "@/components/MallGallerySection";
import solariaImg from "@/assets/solaria-mall.jpg";
import useSEO from "@/hooks/useSEO";
import solaria1 from "@/assets/gallery/solaria-1.jpg";
import solaria2 from "@/assets/gallery/solaria-2.jpg";
import solaria3 from "@/assets/gallery/solaria-3.jpg";
import solaria4 from "@/assets/gallery/solaria-4.jpg";

const galleryImages = [solaria1, solaria2, solaria3, solaria4];
const galleryVideos = [
  "pnchRd-AAwg", "5zo6Nh69DoU", "21h59Aidbss", "lDb2srq3prQ", "9xWD4rjaFz4",
  "PtXQ7ekGibo", "NjbdYDPeErM", "IFGQuVc1Qh4", "boE6pqIItFE", "Xf8AUcMltIQ",
  "Yq2XDpp2UNU", "7_I97gYQrho", "Hqv9KliWT1s", "BrDGv2SxZXI", "Y4lN13Cas5c",
  "vDInqD_HcKU", "cepHBQGE7J0", "9ejGoFF4Jrk", "urvheJNfRdQ", "Z2s5k9hBR5s",
  "lIwPvTA4kl8", "5Vg0nxFPN2s", "giAo0wIirns", "bWMNLhNUWic", "l6kA_Ya2tW8",
  "-vQ52O22iwM", "0SPxL2rY3Dc", "ntpGQTMyq3Q",
];

const unitTypes = [
  { icon: ShoppingBag, label: "Retail shops and showrooms" },
  { icon: Stethoscope, label: "Medical clinics and healthcare units" },
  { icon: Briefcase, label: "Corporate and administrative offices" },
  { icon: Building2, label: "Flexible business units" },
];

const locationAdvantages = [
  "Prime frontage facing the 7th & 8th districts and key urban arteries",
  "Close proximity to educational institutions, residential developments, and major roads",
  "Easy accessibility from Cairo Ring Road, Suez Road, and nearby cities",
  "High daily exposure thanks to mixed daytime and evening activity flows",
];

const whyInvest = [
  "Strategic urban location in El Shorouk City with strong day-round activity",
  "Mixed-use design accommodating retail, healthcare, and offices",
  "Flexible commercial unit sizes suitable for diverse industries",
  "Modern architecture and professional environment",
  "Access to major transportation routes and surrounding communities",
  "Competitive prices with investor-friendly payment plans",
  "Fully serviced: parking, security, surveillance, elevators, and plaza areas",
];

const SolariaMall = () => {
  useSEO("Solaria Mall | Mixed-Use Properties for Rent in El Shorouk", "Select prime commercial units for rent at Solaria Mall El Shorouk. Find ideal spaces for retail, offices, and profitable property investment in Egypt.");

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-24 md:py-28">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-accent font-body font-semibold tracking-[0.25em] uppercase text-xs mb-4">ASWAQ Developments</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">Solaria Mall at El Shorouk</h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto text-base leading-relaxed">
              One of ASWAQ's most ambitious mixed-use properties — a vibrant hub for shopping, services, healthcare, and professional activities spanning 6,600 m².
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
                <img src={solariaImg} alt="Solaria Mall" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div className="md:w-1/2" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="section-divider mb-5" style={{ marginLeft: 0 }} />
              <h2 className="font-display text-3xl font-bold text-foreground mb-5">Solaria Mall at El Shorouk</h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                Solaria Mall is one of ASWAQ Developments' most ambitious mixed-use properties, positioned to become a vibrant hub for shopping, services, healthcare, and professional activities in El Shorouk City. Spanning across 6,600 square meters, the mall offers a diverse range of amenities and services.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                With its modern architectural identity and strategic placement near key landmarks, Solaria Mall meets the rising demand for commercial, business, and versatile properties in Egypt.
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5">Solaria Mall Location</h2>
            <p className="text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed">
              Strategically situated in El Shorouk City, at University Square near the French University, Solaria Mall enjoys a prominent position drawing consistent visitation.
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3450.0642863994053!2d31.60202829678954!3d30.14957799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14581d004de29bd9%3A0x677ac037657c4a19!2sSolaria%20Mall!5e0!3m2!1sen!2seg!4v1772535772662!5m2!1sen!2seg"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Solaria Mall Location"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Units */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="section-divider mb-6" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5">Units Available at Solaria Mall</h2>
          <p className="text-muted-foreground font-body max-w-3xl mx-auto mb-12 leading-relaxed">
            Explore available units for rent & sale at Solaria Mall ranging from 30 m² to 396 m².
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Why Invest in Solaria Mall</h2>
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

      <MallGallerySection mallName="Solaria Mall" images={galleryImages} videos={galleryVideos} />

      <CTASection
        title="Invest in Solaria Mall Today"
        subtitle="Secure your commercial unit in a high-foot-traffic mixed-use project in El Shorouk City with flexible spaces, strategic design, and robust rental demand."
        buttonText="Request Unit Details"
        buttonLink="/contact"
      />
    </Layout>
  );
};

export default SolariaMall;
