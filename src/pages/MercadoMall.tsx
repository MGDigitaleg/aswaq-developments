import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle2, MapPin, ShoppingBag, UtensilsCrossed,
  Briefcase, Sparkles, Building2, Eye, Users, LayoutGrid, Store,
  Repeat, Target, ExternalLink, CircleDot
} from "lucide-react";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import MercadoTenantsSection from "@/components/MercadoTenantsSection";
import useSEO from "@/hooks/useSEO";

// 3D Renders — primary visual language (aspirational, cinematic, premium)
import render1 from "@/assets/gallery/mercado-1.webp";   // internal courtyard / elevator
import render2 from "@/assets/gallery/mercado-2.webp";   // aerial render from above
import render3 from "@/assets/gallery/mercado-3.webp";   // direct daytime front exterior
import render4 from "@/assets/gallery/mercado-4.webp";   // front night render
import render5 from "@/assets/gallery/mercado-5.webp";   // daytime internal open walkway
import render6 from "@/assets/gallery/mercado-6.webp";   // strong corner / angled exterior
import render7 from "@/assets/gallery/mercado-7.webp";   // wide premium night façade (strongest)

// Real photos — proof of operational activity
import realRetail from "@/assets/gallery/mercado-real-retail.webp";
import realCorner from "@/assets/gallery/mercado-real-corner.webp";
import realCorridor from "@/assets/gallery/mercado-real-corridor.webp";
import realCourtyard from "@/assets/gallery/mercado-real-courtyard.webp";
import realWide from "@/assets/gallery/mercado-real-wide.webp";
import realStairs from "@/assets/gallery/mercado-real-stairs.webp";

/* ── Animation presets (CSS-friendly, no useScroll overhead) ── */
const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" as const } };
const imgReveal = { initial: { opacity: 0, scale: 1.03 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true, margin: "-40px" as const }, transition: { duration: 0.7 } };

/* ── Data ── */
const snapshotStats = [
  { value: "Fully Operational", label: "Commercial mall" },
  { value: "3 Floors", label: "Of retail activity" },
  { value: "29 sqm+", label: "Starting unit size" },
  { value: "Active Brands", label: "& daily traffic" },
];

const whyCards = [
  { icon: Building2, title: "Operational Environment", desc: "Mercado is already functioning as a live commercial destination with active daily use and established retail presence." },
  { icon: Store, title: "Brand Presence", desc: "Existing brands help reinforce trust, attract visitors, and strengthen the mall's commercial credibility." },
  { icon: LayoutGrid, title: "Flexible Unit Sizes", desc: "A range of unit sizes starting from 29 sqm makes Mercado suitable for both emerging concepts and established operators." },
  { icon: MapPin, title: "Prime El Shorouk Position", desc: "Its location supports strong neighborhood relevance, visibility, and everyday demand from the surrounding population." },
];

const movementPoints = [
  "Open circulation and visitor flow",
  "Visible shopfront exposure",
  "Repeated daily activity",
  "Suitable for lifestyle and service-led retail",
];

const commercialCards = [
  { icon: ShoppingBag, title: "Retail Shops", desc: "Suitable for customer-facing brands that rely on visibility, accessibility, and everyday traffic." },
  { icon: UtensilsCrossed, title: "F&B Concepts", desc: "Well-positioned for cafés, dining concepts, and food operators seeking destination-based activity." },
  { icon: Briefcase, title: "Service Businesses", desc: "Ideal for businesses that benefit from neighborhood relevance, convenience, and recurring visits." },
  { icon: Sparkles, title: "Lifestyle Brands", desc: "A strong fit for fashion, beauty, specialty retail, and brands looking to grow within an active commercial setting." },
];

const locationCards = [
  { icon: Users, title: "Dense Residential Surroundings", desc: "Mercado benefits from a nearby residential population that supports recurring daily demand." },
  { icon: Eye, title: "Easy Access and Visibility", desc: "Its placement allows for convenient arrival, strong frontage, and practical commercial exposure." },
  { icon: Repeat, title: "Everyday Demand Potential", desc: "The surrounding context supports repeat visits for retail, food, and service-oriented operators." },
  { icon: Target, title: "Strong Neighborhood Relevance", desc: "Mercado fits naturally into the commercial life of El Shorouk and serves an already active local audience." },
];

const investorPoints = [
  "Operational commercial destination",
  "Existing tenant and brand activity",
  "Retail environment with repeat potential",
  "Strong relevance to surrounding population",
  "Flexible entry through varied unit sizes",
  "More confidence than concept-only projects",
];

/* ── Gallery: 4 tabs ── */
type GalleryTab = "vision" | "retail" | "exterior" | "real";
const galleryTabs: { key: GalleryTab; label: string }[] = [
  { key: "vision", label: "3D Vision" },
  { key: "retail", label: "Retail Experience" },
  { key: "exterior", label: "Exterior & Presence" },
  { key: "real", label: "Real Operation" },
];
const galleryMap: Record<GalleryTab, string[]> = {
  vision: [render2, render3, render1, render6, render7],
  retail: [render5, realCourtyard, realCorridor],
  exterior: [render3, render4, render6, realCorner],
  real: [realRetail, realCorridor, realCourtyard, realWide, realStairs],
};
const allGalleryImages = [
  render2, render3, render1, render6, render7,
  render5, realCourtyard, realCorridor,
  render4, realCorner,
  realRetail, realWide, realStairs,
];

const MercadoMall = () => {
  useSEO(
    "Mercado Mall | Commercial Units for Rent in El Shorouk",
    "Looking for commercial property for rent? Invest in Mercado Mall El Shorouk, offering retail units for sale & rent at flexible prices."
  );

  const [activeTab, setActiveTab] = useState<GalleryTab>("vision");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (img: string) => {
    const idx = allGalleryImages.indexOf(img);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  };

  return (
    <Layout>
      {/* ─── 1. HERO — Strongest night exterior render ─── */}
      <section className="relative bg-primary overflow-hidden min-h-[600px] md:min-h-[700px] lg:min-h-[85vh]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        >
          <img
            src={render7}
            alt="Mercado Mall — Premium commercial destination"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="sync"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 md:via-primary/60 to-primary/10 md:to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 md:from-primary/80 via-primary/20 md:via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary/40 to-transparent" />

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute top-28 md:top-32 right-6 sm:right-10 lg:right-16 z-20"
        >
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-primary-foreground/15" style={{ background: 'hsl(var(--navy) / 0.55)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'hsl(152 45% 50%)' }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: 'hsl(152 45% 50%)' }} />
            </span>
            <span className="text-[11px] font-body font-semibold tracking-[0.12em] uppercase" style={{ color: 'hsl(var(--primary-foreground) / 0.90)' }}>Fully Operational</span>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 md:pt-52 pb-24 md:pb-32 relative z-10 flex flex-col justify-end min-h-[inherit]">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[9px] font-semibold tracking-[0.4em] uppercase font-body mb-6 text-primary-foreground/30">
                ASWAQ Developments — Active Commercial Destination
              </p>
              <h1
                className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-bold text-primary-foreground leading-[1.02] mb-5"
                style={{ letterSpacing: '-0.025em' }}
              >
                Mercado Mall
                <br />
                <span className="text-primary-foreground/60">El Shorouk</span>
              </h1>
              <motion.p
                className="text-primary-foreground/45 font-body text-[15px] md:text-base leading-[1.85] max-w-lg mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                A fully serviced commercial destination with active brands, ready-to-operate units, and strong everyday footfall — proven for modern retail and business growth.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <a href="#snapshot" className="btn-outline-light px-8 py-3.5 text-[12px] rounded-lg font-body group">
                  Explore Mercado
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </a>
                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 text-[12px] font-body font-semibold tracking-[0.08em] uppercase rounded-lg border border-primary-foreground/12 text-primary-foreground/50 hover:text-primary-foreground hover:border-primary-foreground/25 transition-all duration-400">
                  Request Unit Details
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. QUICK SNAPSHOT — Direct daytime front exterior ─── */}
      <section id="snapshot" className="py-12 md:py-18 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
              <p className="section-label mb-3">A Commercial Hub That's Already Alive</p>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">
                Already Operating. Already Proven.
              </h2>
              <p className="text-muted-foreground font-body text-[15px] leading-[1.9] mb-8">
                Unlike projects still in concept, Mercado Mall is already operating as a commercial destination. Its tenant mix, open circulation, and active environment make it a practical and investment-relevant address in El Shorouk.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {snapshotStats.map((s, i) => (
                  <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.45 }}
                    className="p-5 bg-cream rounded-xl border border-border/30"
                    style={{ boxShadow: 'var(--shadow-sm)' }}
                  >
                    <p className="font-display text-lg md:text-xl font-bold text-foreground mb-1">{s.value}</p>
                    <p className="text-muted-foreground font-body text-xs tracking-wide">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div {...imgReveal}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <img src={render3} alt="Mercado Mall — Daytime front exterior" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 3. WHY MERCADO WORKS — Corner/angled exterior as visual accent ─── */}
      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <p className="section-label mb-3">The Mercado Advantage</p>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">Why Mercado Works</h2>
              <p className="text-muted-foreground font-body max-w-2xl text-[15px] leading-relaxed mb-8">
                Mercado Mall combines accessibility, visible retail exposure, and an active tenant environment — creating a stronger proposition for businesses that want to operate within a proven destination rather than a speculative one.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whyCards.map((card, i) => (
                  <motion.div key={card.title} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.45 }}
                    className="p-5 bg-card rounded-xl border border-border/30 hover:border-accent/15 hover:-translate-y-1 transition-all duration-400 group"
                    style={{ boxShadow: 'var(--shadow-sm)' }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/15 transition-colors duration-300">
                      <card.icon size={20} className="text-accent" />
                    </div>
                    <h3 className="font-display text-sm font-bold text-foreground mb-1.5">{card.title}</h3>
                    <p className="text-muted-foreground font-body text-[12px] leading-relaxed">{card.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div {...imgReveal}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <img src={render6} alt="Mercado Mall — Corner angled exterior view" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 4. ACTIVE BRANDS / TENANT MIX ─── */}
      <MercadoTenantsSection />

      {/* ─── 5. BUILT AROUND DAILY MOVEMENT — Internal walkway + courtyard ─── */}
      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div {...imgReveal}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] mb-4" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <img src={render5} alt="Mercado Mall daytime internal walkway" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
              </div>
              <div className="rounded-xl overflow-hidden aspect-[16/7]" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <img src={realCourtyard} alt="Mercado Mall real courtyard" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
              <p className="section-label mb-3">Designed for Everyday Footfall</p>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">
                Built Around Daily Movement
              </h2>
              <p className="text-muted-foreground font-body text-[15px] leading-[1.9] mb-6">
                Mercado Mall is structured around open retail movement, clear visibility, and a tenant mix that supports repeat visits — making it attractive for brands, food concepts, service businesses, and lifestyle retail.
              </p>
              <div className="space-y-2.5">
                {movementPoints.map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CircleDot size={14} className="text-accent shrink-0" />
                    <p className="text-foreground font-body text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 6. ARCHITECTURAL / EXPERIENCE — Courtyard/elevator + exterior supports ─── */}
      <section className="py-12 md:py-18 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="order-2 lg:order-1">
              <p className="section-label mb-3">Architectural Vision</p>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">
                A Retail Experience with Openness and Energy
              </h2>
              <p className="text-muted-foreground font-body text-[15px] leading-[1.9] mb-4">
                Mercado Mall is more than a row of units — it is a layered retail environment with open circulation, visual connectivity, and multiple engagement points across the project.
              </p>
              <p className="text-muted-foreground font-body text-[15px] leading-[1.9]">
                Its configuration supports discovery, repeat visits, and stronger interaction between brands, visitors, and destination spaces.
              </p>
            </motion.div>
            <motion.div {...imgReveal} className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] mb-4" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <img src={render1} alt="Mercado Mall central courtyard and elevator" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-sm)' }}>
                  <img src={render3} alt="Mercado Mall exterior" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="rounded-xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-sm)' }}>
                  <img src={render6} alt="Mercado Mall corner view" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 7. COMMERCIAL OPPORTUNITY — Aerial render ─── */}
      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-10">
            <p className="section-label mb-3">Available Opportunities</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">Commercial Units for Retail Growth</h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto text-[15px] leading-relaxed">
              With unit sizes starting from 29 square meters and a range of positioning options across the mall, Mercado provides opportunities for both emerging concepts and established operators looking to grow in El Shorouk.
            </p>
          </motion.div>
          <motion.div {...imgReveal} className="mb-12">
            <div className="rounded-2xl overflow-hidden aspect-[21/9] max-w-4xl mx-auto" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <img src={render2} alt="Mercado Mall aerial view" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {commercialCards.map((card, i) => (
              <motion.div key={card.title} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.45 }}
                className="p-6 md:p-7 bg-card rounded-2xl border border-border/30 hover:border-accent/15 hover:-translate-y-1 transition-all duration-400 group"
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
      <section className="py-12 md:py-18 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-10">
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
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="text-center mt-6">
            <a
              href="https://maps.app.goo.gl/mercadomall"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[12px] font-body font-semibold tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Open in Google Maps
              <ExternalLink size={12} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── 9. CURATED GALLERY — 4 tabs ─── */}
      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12">
            <p className="section-label mb-3">Visual Archive</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">Mercado in Perspective</h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto text-[15px] leading-relaxed">
              Explore Mercado Mall through a curated visual selection that reflects its architectural character, active retail environment, and commercial presence.
            </p>
          </motion.div>
          <div className="flex justify-center mb-10">
            <div className="flex flex-wrap justify-center bg-background rounded-lg p-1 gap-1 border border-border/30" style={{ boxShadow: 'var(--shadow-sm)' }}>
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
                className="rounded-2xl overflow-hidden border border-border/30 aspect-[4/3] cursor-pointer group"
                style={{ boxShadow: 'var(--shadow-sm)' }}
                onClick={() => openLightbox(src)}
              >
                <img src={src} alt={`Mercado Mall ${activeTab} ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-600" loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. OPERATIONAL PROOF — Real photos grid ─── */}
      <section className="py-12 md:py-18 bg-background">
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
              <p className="text-muted-foreground font-body text-[13px] leading-[1.85] mt-6 italic">
                For investors, Mercado represents a more grounded commercial proposition — one shaped by visible activity, practical relevance, and a stronger relationship between space and demand.
              </p>
            </motion.div>
            <motion.div {...imgReveal}>
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                  <img src={realRetail} alt="Mercado Mall active storefront" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-sm)' }}>
                    <img src={realCorridor} alt="Mercado Mall corridor" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-sm)' }}>
                    <img src={realCourtyard} alt="Mercado Mall courtyard" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 11. FINAL CTA — Strongest night render ─── */}
      <section className="relative bg-primary py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={render7} alt="" className="w-full h-full object-cover opacity-[0.06]" loading="lazy" />
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
