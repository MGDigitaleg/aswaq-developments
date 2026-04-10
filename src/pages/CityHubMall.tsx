import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MapPin, ShoppingBag, Store, Briefcase, Eye, Users,
  CheckCircle2, ChevronDown, ArrowRight, Phone,
  Compass, Building2, TrendingUp, Clock
} from "lucide-react";
import Layout from "@/components/Layout";
import MallGallerySection from "@/components/MallGallerySection";
import useSEO from "@/hooks/useSEO";

import cityhubImg from "@/assets/cityhub-mall.webp";
import cityhub1 from "@/assets/gallery/cityhub-1.webp";
import cityhub2 from "@/assets/gallery/cityhub-2.webp";
import cityhub3 from "@/assets/gallery/cityhub-3.webp";
import cityhub4 from "@/assets/gallery/cityhub-4.webp";
import cityhub5 from "@/assets/gallery/cityhub-5.webp";
import cityhub6 from "@/assets/gallery/cityhub-6.webp";
import cityhub7 from "@/assets/gallery/cityhub-7.webp";
import cityhub8 from "@/assets/gallery/cityhub-8.webp";

const galleryImages = [cityhub1, cityhub2, cityhub3, cityhub4, cityhub5, cityhub6, cityhub7, cityhub8];
const galleryVideos = ["9pl-SiE0VVk", "868YMiO0LJc", "82mVbp9nB6U", "VIvmPBqrLnk"];

const fadeUp = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const whyCards = [
  { icon: Eye, title: "Clear Visibility", desc: "High-traffic positioning ensures your business is seen daily by thousands of residents and passersby." },
  { icon: Compass, title: "Everyday Accessibility", desc: "Convenient access from major roads and residential areas supports repeat customer movement." },
  { icon: Store, title: "Practical Unit Types", desc: "Flexible commercial spaces designed for retail, services, and customer-facing businesses." },
  { icon: Users, title: "Strong Local Relevance", desc: "Located within a thriving community with steady demand for everyday commercial services." },
];

const unitTypes = [
  { icon: ShoppingBag, title: "Retail Units", desc: "Spaces built for shops, showrooms, and consumer-facing brands that thrive on daily traffic." },
  { icon: Briefcase, title: "Service Businesses", desc: "Flexible units suited for salons, repair shops, travel agencies, and everyday service operators." },
  { icon: Building2, title: "Clinics / Professional Services", desc: "Well-positioned spaces for medical clinics, labs, consultancies, and professional offices." },
  { icon: TrendingUp, title: "Flexible Commercial Concepts", desc: "Adaptable units for food & beverage, co-working, or mixed-use commercial concepts." },
];

const locationCards = [
  { title: "Residential Proximity", desc: "Surrounded by dense residential compounds and neighborhoods with consistent daily traffic." },
  { title: "Road Connectivity", desc: "Easy access from Suez Road, Ring Road, and Gamal Abdel Nasser Axis." },
  { title: "Community Integration", desc: "Positioned within a mature urban district with schools, clubs, and daily-use amenities." },
  { title: "Growing Demand", desc: "El Shorouk's expanding population creates increasing demand for practical commercial spaces." },
];

const investPoints = [
  "High-visibility commercial address with steady daily foot traffic",
  "Competitive entry price with flexible payment plans",
  "Units from 29 m² — accessible for first-time investors",
  "Operational mall with proven tenant activity",
  "Location in one of East Cairo's fastest-growing residential corridors",
  "Practical commercial demand that supports long-term rental yields",
];

const CityHubMall = () => {
  useSEO(
    "City Hub Mall | Commercial Units for Rent in El Shorouk",
    "Explore prime business properties & spaces in City Hub Mall in El Shorouk offering commercial units for rent and sale at flexible prices."
  );

  return (
    <Layout>
      {/* ═══ 1. HERO ═══ */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src={cityhub1}
            alt="City Hub Mall El Shorouk"
            className="w-full h-full object-cover will-change-transform"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, hsl(var(--navy) / 0.15) 0%, transparent 30%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 45%, hsl(var(--navy) / 0.50) 70%, hsl(var(--navy) / 0.94) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, hsl(var(--navy) / 0.30) 0%, transparent 50%)' }} />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-[10px] font-body font-semibold tracking-[0.35em] uppercase mb-4" style={{ color: 'hsl(var(--primary-foreground) / 0.40)' }}>
              ASWAQ Developments
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-5" style={{ color: 'hsl(var(--primary-foreground))', letterSpacing: '-0.02em' }}>
              City Hub Mall<br className="hidden md:block" /> El Shorouk
            </h1>
            <p className="font-body text-[15px] md:text-[16px] leading-[1.8] max-w-lg mb-4" style={{ color: 'hsl(var(--primary-foreground) / 0.55)' }}>
              A Smart Commercial Address for Everyday Business
            </p>
            <p className="font-body text-[13px] md:text-[14px] leading-[1.8] max-w-xl mb-8" style={{ color: 'hsl(var(--primary-foreground) / 0.40)' }}>
              City Hub Mall is designed to support practical retail, service-oriented businesses, and everyday commercial demand in El Shorouk. With clear visibility, accessible positioning, and business-ready spaces, it offers a smart environment for operators seeking relevance and consistency.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[13px] font-body font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: 'hsl(var(--primary-foreground))', color: 'hsl(var(--navy))', boxShadow: '0 4px 16px -4px hsl(0 0% 100% / 0.12)' }}
              >
                Request Unit Details
                <ArrowRight size={14} />
              </Link>
              <a href="tel:19474" className="btn-outline-light px-5 py-3 text-[13px] rounded-lg font-body">
                <Phone size={14} />
                Book a Site Visit
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] font-body tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--primary-foreground) / 0.25)' }}>Scroll</span>
            <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronDown size={15} style={{ color: 'hsl(var(--primary-foreground) / 0.25)' }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 2. QUICK SNAPSHOT ═══ */}
      <section className="py-12 md:py-18 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeUp}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-premium)' }}>
                <img src={cityhubImg} alt="City Hub Mall exterior" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div {...fadeUp}>
              <div className="section-divider mb-6" style={{ marginLeft: 0, marginRight: 'auto' }} />
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">
                Commercial Simplicity with Strong Potential
              </h2>
              <p className="text-muted-foreground font-body text-[15px] leading-[1.9] mb-4">
                City Hub Mall brings together visibility, accessibility, and practical business use in one clear commercial address. It is built to serve everyday demand and support businesses that rely on convenience, presence, and repeat customer movement.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                {[
                  "Commercial units designed for practical use",
                  "Accessible and visible location",
                  "Suitable for retail and service businesses",
                  "Built for everyday traffic and convenience",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[13px] text-foreground/80 font-body">
                    <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 3. WHY CITY HUB WORKS ═══ */}
      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="section-label mb-3">Smart Commercial Logic</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why City Hub Works
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto text-[15px] leading-relaxed">
              City Hub is shaped around the fundamentals that matter most in everyday commercial success: visibility, accessibility, and relevance to local demand.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="p-6 bg-card rounded-2xl border border-border/30 hover:border-accent/15 hover:-translate-y-1 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <card.icon size={22} className="text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground font-body text-[13px] leading-[1.7]">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. LOCATION & EVERYDAY DEMAND ═══ */}
      <section className="py-12 md:py-18 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="section-label mb-3">Strategic Location</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Positioned for Daily Commercial Relevance
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto text-[15px] leading-relaxed">
              City Hub Mall benefits from a location that supports recurring daily movement and practical access, making it suitable for businesses that depend on repeat visits and neighborhood convenience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {locationCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="p-5 bg-card rounded-xl border border-border/30 hover:border-accent/15 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <h3 className="font-display text-[15px] font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground font-body text-[13px] leading-[1.7]">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.1527093465797!2d31.34942880000001!3d30.061156900000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f6d0024fbe5%3A0xa28dc2865dabbf10!2sCity%20Hub!5e0!3m2!1sen!2seg!4v1772535758532!5m2!1sen!2seg"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="City Hub Mall Location"
                className="w-full"
              />
            </div>
            <div className="flex justify-center mt-5">
              <a
                href="https://maps.app.goo.gl/CityHubMallShorouk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] font-body font-medium text-accent hover:text-foreground transition-colors"
              >
                <MapPin size={14} />
                Open in Google Maps
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 5. BUILT FOR DAILY RETAIL ═══ */}
      <section className="py-12 md:py-18 bg-primary">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <p className="text-[10px] font-body font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: 'hsl(var(--primary-foreground) / 0.35)' }}>
              Commercial DNA
            </p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: 'hsl(var(--primary-foreground))' }}>
              Designed for Everyday Business Activity
            </h2>
            <p className="font-body text-[15px] leading-[1.9] mb-8" style={{ color: 'hsl(var(--primary-foreground) / 0.55)' }}>
              City Hub Mall is ideal for operators who value convenience, routine footfall, and business visibility. Its commercial logic supports service businesses, local brands, and practical retail concepts.
            </p>
            <div className="w-12 h-px mx-auto" style={{ background: 'hsl(var(--primary-foreground) / 0.12)' }} />
          </motion.div>
        </div>
      </section>

      {/* ═══ 6. BUSINESS FIT / UNIT TYPES ═══ */}
      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="section-label mb-3">Unit Categories</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Spaces for Practical Commercial Growth
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto text-[15px] leading-relaxed">
              City Hub supports a range of business uses across retail, service, and customer-facing operations — making it a strong fit for brands looking to grow through daily commercial relevance.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {unitTypes.map((unit, i) => (
              <motion.div
                key={unit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="p-6 bg-card rounded-2xl border border-border/30 hover:border-accent/15 hover:-translate-y-1 transition-all duration-300 text-center"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <unit.icon size={24} className="text-accent" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">{unit.title}</h3>
                <p className="text-muted-foreground font-body text-[13px] leading-[1.7]">{unit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. REALITY / PROOF ═══ */}
      <section className="py-12 md:py-18 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="section-label mb-3">On the Ground</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              A Commercial Address Taking Shape in Real Life
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[cityhub2, cityhub3, cityhub5, cityhub6].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-xl overflow-hidden aspect-[4/3]"
                style={{ boxShadow: 'var(--shadow-md)' }}
              >
                <img src={img} alt={`City Hub Mall progress ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. CURATED GALLERY ═══ */}
      <MallGallerySection mallName="City Hub Mall" images={galleryImages} videos={galleryVideos} />

      {/* ═══ 9. INVESTMENT VALUE ═══ */}
      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="section-label mb-3">Investor Perspective</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why City Hub Appeals to Investors
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto text-[15px] leading-relaxed">
              City Hub offers a practical commercial proposition built around visibility, convenience, and local demand — making it relevant for investors looking for grounded business potential rather than speculation alone.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {investPoints.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex items-start gap-3 p-4 md:p-5 bg-card rounded-xl border border-border/30 hover:border-accent/15 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                <p className="text-foreground font-body text-sm leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 10. FINAL CTA ═══ */}
      <section className="py-14 md:py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
        </div>
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 text-center relative z-10">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-5" style={{ color: 'hsl(var(--primary-foreground))' }}>
              Position Your Business at City Hub Mall
            </h2>
            <p className="font-body text-[15px] leading-[1.8] mb-10 max-w-xl mx-auto" style={{ color: 'hsl(var(--primary-foreground) / 0.50)' }}>
              Explore available opportunities, request detailed information, or schedule a visit to discover the commercial potential of City Hub Mall El Shorouk.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[13px] font-body font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: 'hsl(var(--primary-foreground))', color: 'hsl(var(--navy))', boxShadow: '0 4px 16px -4px hsl(0 0% 100% / 0.12)' }}
              >
                Request Unit Details
                <ArrowRight size={14} />
              </Link>
              <a href="tel:19474" className="btn-outline-light px-6 py-3.5 text-[13px] rounded-lg font-body">
                <Phone size={14} />
                Book a Site Visit
              </a>
              <a href="tel:19474" className="btn-outline-light px-6 py-3.5 text-[13px] rounded-lg font-body">
                <Phone size={14} />
                Talk to Sales
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CityHubMall;
