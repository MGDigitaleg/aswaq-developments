import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle2, MapPin, ShoppingBag, UtensilsCrossed,
  Briefcase, Sparkles, Building2, Eye, Users, LayoutGrid, Store,
  TrendingUp, Shield, Repeat, Target
} from "lucide-react";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import MercadoTenantsSection from "@/components/MercadoTenantsSection";
import useSEO from "@/hooks/useSEO";

// Images
import mercadoHero from "@/assets/gallery/mercado-4.jpg";
import mercadoAbout from "@/assets/gallery/mercado-3.jpg";
import mercadoInterior from "@/assets/gallery/mercado-9.jpg";
import mercadoExperience from "@/assets/gallery/mercado-8.jpg";
import mercado1 from "@/assets/gallery/mercado-1.webp";
import mercado2 from "@/assets/gallery/mercado-2.jpg";
import mercado3 from "@/assets/gallery/mercado-3.jpg";
import mercado4 from "@/assets/gallery/mercado-4.jpg";
import mercado5 from "@/assets/gallery/mercado-5.jpg";
import mercado6 from "@/assets/gallery/mercado-6.jpg";
import mercado7 from "@/assets/gallery/mercado-7.jpg";
import mercado8 from "@/assets/gallery/mercado-8.jpg";
import mercado9 from "@/assets/gallery/mercado-9.jpg";

const fadeUp = { initial: { opacity: 0, y: 25 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const snapshotStats = [
  { value: "Fully Operational", label: "Commercial mall" },
  { value: "3 Floors", label: "Of retail activity" },
  { value: "29 sqm+", label: "Starting unit size" },
  { value: "Active Brands", label: "& daily traffic" },
];

const whyCards = [
  { icon: Building2, title: "Operational Environment", desc: "An active, functioning mall — not a concept or a future promise." },
  { icon: Store, title: "Brand Presence", desc: "Existing tenants create a credible, commercially viable atmosphere." },
  { icon: LayoutGrid, title: "Flexible Unit Sizes", desc: "From 29 sqm to 300 sqm, accommodating a wide range of business types." },
  { icon: MapPin, title: "Prime El Shorouk Position", desc: "Serving one of East Cairo's most populated and in-demand areas." },
];

const commercialCards = [
  { icon: ShoppingBag, title: "Retail Shops", desc: "Ground and upper floor units with strong visibility." },
  { icon: UtensilsCrossed, title: "F&B Concepts", desc: "Open-air dining areas, food courts, and café-ready spaces." },
  { icon: Briefcase, title: "Service Businesses", desc: "Clinics, salons, tech shops, and professional services." },
  { icon: Sparkles, title: "Lifestyle Brands", desc: "Fashion, wellness, fitness, and lifestyle retail." },
];

const locationCards = [
  { icon: Users, title: "Dense Residential Surroundings", desc: "Serving thousands of households in El Shorouk's Second District." },
  { icon: Eye, title: "Easy Access & Visibility", desc: "Direct frontage on a main road facing Banque du Caire." },
  { icon: Repeat, title: "Everyday Demand Potential", desc: "Strong recurring footfall from daily essentials and services." },
  { icon: Target, title: "Strong Neighborhood Relevance", desc: "Central to El Shorouk's most active commercial zone." },
];

const investorPoints = [
  "Operational commercial destination",
  "Existing tenant and brand activity",
  "Retail environment with repeat potential",
  "Strong relevance to surrounding population",
  "Flexible entry through varied unit sizes",
  "More confidence than concept-only projects",
];

type GalleryTab = "exterior" | "retail" | "aerial" | "night";
const galleryTabs: { key: GalleryTab; label: string }[] = [
  { key: "exterior", label: "Exterior" },
  { key: "retail", label: "Retail Experience" },
  { key: "aerial", label: "Aerial View" },
  { key: "night", label: "Night & Ambience" },
];
const galleryMap: Record<GalleryTab, string[]> = {
  exterior: [mercado3, mercado7, mercado1],
  retail: [mercado9, mercado8, mercado5],
  aerial: [mercado2, mercado6],
  night: [mercado4, mercado5],
};
const allGalleryImages = [mercado1, mercado2, mercado3, mercado4, mercado5, mercado6, mercado7, mercado8, mercado9];

const MercadoMall = () => {
  useSEO(
    "Mercado Mall | Commercial Units for Rent in El Shorouk",
    "Looking for commercial property for rent? Invest in Mercado Mall El Shorouk, offering retail units for sale & rent at flexible prices."
  );

  const [activeTab, setActiveTab] = useState<GalleryTab>("exterior");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (img: string) => {
    const idx = allGalleryImages.indexOf(img);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  };

  return (
    <Layout>
      {/* ─── 1. HERO ─── */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <img src={mercadoHero} alt="" className="w-full h-full object-cover opacity-[0.15]" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 md:pt-48 pb-20 md:pb-28 relative z-10">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase font-body mb-5 text-primary-foreground/35">
                ASWAQ Developments — Active Commercial Destination
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-[4.2rem] font-bold text-primary-foreground mb-6 leading-[1.05]" style={{ letterSpacing: '-0.02em' }}>
                Mercado Mall<br />El Shorouk
              </h1>
              <p className="text-primary-foreground/50 font-body text-[15px] md:text-base leading-[1.85] max-w-xl mb-10">
                Mercado Mall is a fully serviced commercial destination designed to meet the needs of El Shorouk's vibrant and densely populated communities. With active brands, ready-to-operate units, and strong everyday footfall, it offers a proven environment for modern retail and business growth.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#snapshot" className="btn-outline-light px-8 py-3.5 text-[12px] rounded-lg font-body group">
                  Explore Mercado
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </a>
                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 text-[12px] font-body font-semibold tracking-[0.08em] uppercase rounded-lg border border-primary-foreground/15 text-primary-foreground/60 hover:text-primary-foreground hover:border-primary-foreground/30 transition-all duration-300">
                  Request Unit Details
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. QUICK SNAPSHOT ─── */}
      <section id="snapshot" className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <p className="section-label mb-3">A Commercial Hub That's Already Alive</p>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">
                Already Operating. Already Proven.
              </h2>
              <p className="text-muted-foreground font-body text-[15px] leading-[1.9] mb-8">
                Unlike projects still in concept, Mercado Mall is already operating as a commercial destination. Its tenant mix, open circulation, and active environment make it a practical and investment-relevant address in El Shorouk.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {snapshotStats.map((s, i) => (
                  <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="p-5 bg-cream rounded-xl border border-border/30"
                    style={{ boxShadow: 'var(--shadow-sm)' }}
                  >
                    <p className="font-display text-lg md:text-xl font-bold text-foreground mb-1">{s.value}</p>
                    <p className="text-muted-foreground font-body text-xs tracking-wide">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <img src={mercadoAbout} alt="Mercado Mall — Operational commercial destination in El Shorouk" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 3. WHY MERCADO WORKS ─── */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-14">
            <p className="section-label mb-3">The Mercado Advantage</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">Why Mercado Works</h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto text-[15px] leading-relaxed">
              Mercado Mall combines accessibility, visible retail exposure, and an active tenant environment — creating a stronger proposition for businesses that want to operate within a proven destination rather than a speculative one.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyCards.map((card, i) => (
              <motion.div key={card.title} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.4 }}
                className="p-6 md:p-7 bg-card rounded-2xl border border-border/30 hover:border-accent/15 transition-all duration-300 group"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors duration-300">
                  <card.icon size={22} className="text-accent" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground font-body text-[13px] leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. ACTIVE BRANDS / TENANT MIX ─── */}
      <MercadoTenantsSection />

      {/* ─── 5. BUILT AROUND DAILY MOVEMENT ─── */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <img src={mercadoInterior} alt="Mercado Mall interior retail circulation" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
              <p className="section-label mb-3">Designed for Everyday Footfall</p>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">
                Built Around Daily Movement
              </h2>
              <p className="text-muted-foreground font-body text-[15px] leading-[1.9]">
                Mercado Mall is structured around open retail movement, clear visibility, and a tenant mix that supports repeat visits — making it attractive for brands, food concepts, service businesses, and lifestyle retail.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 6. ARCHITECTURAL / EXPERIENCE ─── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="order-2 lg:order-1">
              <p className="section-label mb-3">Architectural Vision</p>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">
                A Retail Experience with Openness and Energy
              </h2>
              <p className="text-muted-foreground font-body text-[15px] leading-[1.9]">
                Mercado Mall is more than a row of units — it is a layered retail environment with open circulation, visual connectivity, and multiple engagement points across the project.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <img src={mercadoExperience} alt="Mercado Mall architectural experience" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 7. COMMERCIAL OPPORTUNITY ─── */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-14">
            <p className="section-label mb-3">Available Opportunities</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">Commercial Units for Retail Growth</h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto text-[15px] leading-relaxed">
              With unit sizes starting from 29 square meters and a range of positioning options across the mall, Mercado provides opportunities for both emerging concepts and established operators looking to grow in El Shorouk.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {commercialCards.map((card, i) => (
              <motion.div key={card.title} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.4 }}
                className="p-6 md:p-7 bg-card rounded-2xl border border-border/30 hover:border-accent/15 transition-all duration-300 group"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors duration-300">
                  <card.icon size={22} className="text-accent" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground font-body text-[13px] leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/contact" className="group btn-premium px-10 py-4 text-[13px] rounded-lg font-body">
              Request Available Units
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 8. STRATEGIC LOCATION ─── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-14">
            <p className="section-label mb-3">Strategic Position</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">Positioned for Visibility in El Shorouk</h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto text-[15px] leading-relaxed">
              Mercado Mall serves one of El Shorouk's most active and populated areas, benefiting from strong local demand, accessible frontage, and recurring visitor traffic.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {locationCards.map((card, i) => (
              <motion.div key={card.title} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.4 }}
                className="p-5 md:p-6 bg-cream rounded-xl border border-border/30 hover:border-accent/15 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <card.icon size={18} className="text-accent" />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground mb-1.5">{card.title}</h3>
                <p className="text-muted-foreground font-body text-[12px] leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto rounded-2xl overflow-hidden"
            style={{ boxShadow: 'var(--shadow-lg)' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d442274.52711179055!2d31.4139086!3d30.0004101!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14581d4c995d3bcb%3A0x9e8ec7cb114e26c5!2sMercado%20mall!5e0!3m2!1sen!2seg!4v1772535763986!5m2!1sen!2seg"
              width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Mercado Mall Location" className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* ─── 9. CURATED GALLERY ─── */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12">
            <p className="section-label mb-3">Visual Archive</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">Mercado in Perspective</h2>
          </motion.div>
          <div className="flex justify-center mb-10">
            <div className="flex bg-background rounded-lg p-1 gap-1 border border-border/30" style={{ boxShadow: 'var(--shadow-sm)' }}>
              {galleryTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-5 py-2.5 rounded-md text-[12px] font-body font-medium tracking-wide transition-all duration-200 ${activeTab === tab.key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryMap[activeTab].map((src, i) => (
              <motion.div key={`${activeTab}-${i}`}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="rounded-2xl overflow-hidden border border-border/30 aspect-[4/3] cursor-pointer"
                style={{ boxShadow: 'var(--shadow-sm)' }}
                onClick={() => openLightbox(src)}
              >
                <img src={src} alt={`Mercado Mall ${activeTab} ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. INVESTMENT VALUE ─── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <p className="section-label mb-3">Investor Confidence</p>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">
                Why Mercado Appeals to Investors
              </h2>
              <p className="text-muted-foreground font-body text-[15px] leading-[1.9] mb-8">
                Mercado Mall offers a different kind of opportunity: a commercial asset supported by actual operation, tenant presence, and retail relevance — making it more than just a future promise.
              </p>
              <div className="space-y-3">
                {investorPoints.map((point, i) => (
                  <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.06, duration: 0.35 }}
                    className="flex items-start gap-3 p-4 bg-cream rounded-xl border border-border/30"
                    style={{ boxShadow: 'var(--shadow-sm)' }}
                  >
                    <CheckCircle2 size={17} className="text-accent shrink-0 mt-0.5" />
                    <p className="text-foreground font-body text-sm leading-relaxed">{point}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <img src={mercado6} alt="Mercado Mall investment opportunity" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 11. FINAL CTA ─── */}
      <section className="relative bg-primary py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={mercado2} alt="" className="w-full h-full object-cover opacity-[0.08]" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-primary/70" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
            <div className="section-divider mb-8" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary-foreground) / 0.1), transparent)' }} />
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-primary-foreground mb-5 leading-[1.08] max-w-2xl mx-auto">
              Join an Active Commercial Destination
            </h2>
            <p className="text-primary-foreground/50 font-body max-w-xl mx-auto mb-10 text-[15px] leading-relaxed">
              Explore the commercial potential of Mercado Mall, discover available opportunities, and position your business inside one of El Shorouk's established retail addresses.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="group btn-outline-light px-10 py-4 text-[13px] rounded-lg font-body">
                Request Unit Details
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 text-[12px] font-body font-semibold tracking-[0.08em] uppercase rounded-lg border border-primary-foreground/15 text-primary-foreground/60 hover:text-primary-foreground hover:border-primary-foreground/30 transition-all duration-300">
                Book a Visit
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 text-[12px] font-body font-semibold tracking-[0.08em] uppercase rounded-lg text-primary-foreground/40 hover:text-primary-foreground/70 transition-all duration-300">
                Talk to Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Lightbox images={allGalleryImages} open={lightboxOpen} startIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />
    </Layout>
  );
};

export default MercadoMall;
