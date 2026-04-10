import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MapPin, ShoppingBag, Stethoscope, Briefcase, Building2,
  ChevronDown, ArrowRight, Play, X, Eye, DoorOpen,
  Maximize2, Phone, Mail
} from "lucide-react";
import Layout from "@/components/Layout";

import useSEO from "@/hooks/useSEO";

import solariaImg from "@/assets/solaria-mall.webp";
import heroImg from "@/assets/hero-solaria.webp";
import solaria4 from "@/assets/gallery/solaria-4.webp";
import solaria3 from "@/assets/gallery/solaria-3.webp";
import solaria2 from "@/assets/gallery/solaria-2.webp";
import solaria1 from "@/assets/gallery/solaria-1.webp";
import solariaNight from "@/assets/gallery/solaria-night.webp";
import solariaBirdEntrance from "@/assets/gallery/solaria-bird-entrance.webp";
import solariaOutroDay from "@/assets/gallery/solaria-outro-day.webp";
import solariaCam16 from "@/assets/gallery/solaria-cam16.webp";
import solariaIntro from "@/assets/gallery/solaria-intro.webp";
import solariaCube from "@/assets/gallery/solaria-cube.webp";
import solariaOutro from "@/assets/gallery/solaria-outro.webp";
import InteractiveFloorPlan from "@/components/InteractiveFloorPlan";
import MallGallerySection from "@/components/MallGallerySection";

const solariaGalleryImages = [solariaNight, solariaBirdEntrance, solariaIntro, solariaCube, solariaOutro, solariaOutroDay, solariaCam16, solaria4, solaria3, solaria2, solaria1];

/* ─── Data ─── */

/* hotspots removed — replaced by 360° orbit viewer */

const unitCategories = [
  { icon: ShoppingBag, label: "Commercial", count: "24 units", area: "45–180 m²", floor: "GF – 1F", status: "Available" },
  { icon: Stethoscope, label: "Medical", count: "18 units", area: "30–96 m²", floor: "1F – 2F", status: "Available" },
  { icon: Briefcase, label: "Administrative", count: "14 units", area: "50–396 m²", floor: "2F – 3F", status: "Available" },
  { icon: Building2, label: "Corporate", count: "6 units", area: "120–396 m²", floor: "3F – RF", status: "Limited" },
];

const landmarks = [
  { name: "French University in Egypt", distance: "2 min" },
  { name: "Cairo Ring Road", distance: "8 min" },
  { name: "Suez Road", distance: "10 min" },
  { name: "Royal City Compound", distance: "3 min" },
  { name: "El Shorouk City Center", distance: "5 min" },
  { name: "New Cairo", distance: "15 min" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

const SolariaMall = () => {
  useSEO(
    "Solaria Mall | Flagship Mixed-Use Destination in El Shorouk",
    "Discover Solaria Mall — a landmark commercial, medical, and administrative development by ASWAQ in El Shorouk City. Explore premium units from 30 to 396 m²."
  );

  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <Layout>
      {/* ═══════════════════════════════════════════
          1. HERO — Cinematic Fullscreen
      ═══════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src={heroImg}
            alt="Solaria Mall architectural facade"
            className="w-full h-full object-cover will-change-transform"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 12, ease: "easeOut" }}
          />
          {/* 4-layer gradient system */}
          <div className="absolute inset-0" style={{
            background: `linear-gradient(to bottom, hsl(var(--navy) / 0.20) 0%, transparent 35%)`,
          }} />
          <div className="absolute inset-0" style={{
            background: `linear-gradient(to bottom, transparent 50%, hsl(var(--navy) / 0.55) 75%, hsl(var(--navy) / 0.95) 100%)`,
          }} />
          <div className="absolute inset-0" style={{
            background: `linear-gradient(to right, hsl(var(--navy) / 0.35) 0%, transparent 50%)`,
          }} />
          {/* Vignette */}
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at center, transparent 40%, hsl(var(--navy) / 0.25) 100%)`,
          }} />
        </div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute top-28 md:top-32 right-6 sm:right-10 lg:right-16 z-20"
        >
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-primary-foreground/15" style={{
            background: 'hsl(var(--navy) / 0.55)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'hsl(152 45% 50%)' }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: 'hsl(152 45% 50%)' }} />
            </span>
            <span className="text-[11px] font-body font-semibold tracking-[0.12em] uppercase" style={{ color: 'hsl(var(--primary-foreground) / 0.90)' }}>
              Now Selling
            </span>
          </div>
        </motion.div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p
              className="text-[10px] font-body font-semibold tracking-[0.35em] uppercase mb-5"
              style={{ color: "hsl(var(--primary-foreground) / 0.45)" }}
            >
              ASWAQ Developments
            </p>
            <h1
              className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6"
              style={{ color: "hsl(var(--primary-foreground))", letterSpacing: "-0.025em" }}
            >
              Solaria Mall
            </h1>
            <p
              className="font-body text-[15px] md:text-[17px] leading-[1.8] max-w-xl mb-8"
              style={{ color: "hsl(var(--primary-foreground) / 0.60)" }}
            >
              A landmark destination for retail, healthcare, and corporate excellence in El Shorouk City.
            </p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                to="/units/for-sale"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg text-[13px] font-body font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'hsl(var(--primary-foreground))',
                  color: 'hsl(var(--navy))',
                  boxShadow: '0 4px 20px -4px hsl(0 0% 100% / 0.15)',
                }}
              >
                Reserve Your Unit
                <ArrowRight size={14} />
              </Link>
              <a
                href="tel:19474"
                className="btn-outline-light px-6 py-3.5 text-[13px] rounded-lg font-body"
              >
                <Phone size={14} />
                Call 19474
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] font-body tracking-[0.3em] uppercase" style={{ color: "hsl(var(--primary-foreground) / 0.3)" }}>
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={16} style={{ color: "hsl(var(--primary-foreground) / 0.3)" }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. BRAND STATEMENT — Split Layout
      ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeUp}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-premium)" }}>
                  <img
                    src={solariaImg}
                    alt="Solaria Mall exterior"
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
                {/* Stats plaque */}
                <div
                  className="absolute -bottom-6 -right-4 md:-right-8 rounded-xl px-6 py-5 glass"
                  style={{ boxShadow: "var(--shadow-lg)" }}
                >
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="font-display text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>6,600</p>
                      <p className="text-[10px] font-body tracking-[0.15em] uppercase text-muted-foreground mt-1">m² Total</p>
                    </div>
                    <div className="w-px h-10" style={{ background: "hsl(var(--border))" }} />
                    <div className="text-center">
                      <p className="font-display text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>5</p>
                      <p className="text-[10px] font-body tracking-[0.15em] uppercase text-muted-foreground mt-1">Floors</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 } as const}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ background: "hsl(var(--steel) / 0.4)" }} />
                <p className="text-[10px] font-body font-semibold tracking-[0.3em] uppercase" style={{ color: "hsl(var(--steel))" }}>
                  About the Project
                </p>
              </div>
              <h2
                className="font-display text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-foreground leading-[1.1] mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Not Just a Mall.{" "}
                <span style={{ color: "hsl(var(--steel))" }}>A Commercial Landmark.</span>
              </h2>
              <p className="text-muted-foreground font-body text-[15px] leading-[1.9] mb-5">
                Solaria Mall is ASWAQ Developments' most ambitious mixed-use destination — a vibrant ecosystem for retail, medical, and corporate activity spanning 6,600 m² in the heart of El Shorouk City.
              </p>
              <p className="text-muted-foreground font-body text-[15px] leading-[1.9] mb-8">
                With its modern architectural identity, strategic placement near the French University, and diverse unit offerings from 30 to 396 m², Solaria meets the rising demand for premium commercial spaces in Egypt.
              </p>
              <Link
                to="/contact"
                className="btn-premium px-8 py-3.5 text-[12px] font-body tracking-[0.1em] uppercase"
              >
                Request Brochure
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. 360° ARCHITECTURAL EXPLORER
      ═══════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: "hsl(var(--steel) / 0.4)" }} />
              <p className="text-[10px] font-body font-semibold tracking-[0.3em] uppercase" style={{ color: "hsl(var(--steel))" }}>
                Explore the Building
              </p>
              <div className="w-8 h-px" style={{ background: "hsl(var(--steel) / 0.4)" }} />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-[1.1]" style={{ letterSpacing: "-0.02em" }}>
              Architectural Overview
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="relative max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-xl)" }}>
              <div className="aspect-[4/3] md:aspect-[2/1] relative">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                  <source src="/solaria-orbit-clean.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. INTERACTIVE FLOOR PLAN
      ═══════════════════════════════════════════ */}
      <InteractiveFloorPlan />

      {/* ═══════════════════════════════════════════
          5. AVAILABLE UNITS
      ═══════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: "hsl(var(--steel) / 0.4)" }} />
              <p className="text-[10px] font-body font-semibold tracking-[0.3em] uppercase" style={{ color: "hsl(var(--steel))" }}>
                Available Spaces
              </p>
              <div className="w-8 h-px" style={{ background: "hsl(var(--steel) / 0.4)" }} />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-[1.1] mb-4" style={{ letterSpacing: "-0.02em" }}>
              Units at Solaria Mall
            </h2>
            <p className="text-muted-foreground font-body text-[14px] leading-[1.7] max-w-lg mx-auto">
              From boutique retail spaces to full-floor corporate suites — find the perfect unit for your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {unitCategories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl p-6 md:p-7 border transition-all duration-500"
                style={{
                  background: "hsl(var(--card))",
                  borderColor: "hsl(var(--border) / 0.35)",
                  boxShadow: "var(--shadow-sm)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                  e.currentTarget.style.borderColor = "hsl(var(--navy) / 0.1)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                  e.currentTarget.style.borderColor = "hsl(var(--border) / 0.35)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "hsl(var(--navy) / 0.06)" }}
                >
                  <cat.icon size={20} style={{ color: "hsl(var(--navy))" }} />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{cat.label}</h3>
                <p className="text-muted-foreground font-body text-[13px] mb-5">{cat.count}</p>
                <div className="space-y-2.5">
                  {[
                    { label: "Area", value: cat.area },
                    { label: "Floor", value: cat.floor },
                    { label: "Status", value: cat.status },
                  ].map((detail) => (
                    <div key={detail.label} className="flex justify-between">
                      <span className="text-[11px] font-body text-muted-foreground uppercase tracking-[0.08em]">{detail.label}</span>
                      <span
                        className="text-[12px] font-body font-semibold"
                        style={{
                          color: detail.label === "Status" && detail.value === "Limited"
                            ? "hsl(30 80% 50%)"
                            : "hsl(var(--foreground))",
                        }}
                      >
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-10">
            <Link to="/units" className="btn-outline-dark px-8 py-3.5 text-[11px] font-body tracking-[0.12em] uppercase rounded-lg">
              View All Available Units
              <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. LOCATION INTELLIGENCE
      ═══════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ background: "hsl(var(--steel) / 0.4)" }} />
                <p className="text-[10px] font-body font-semibold tracking-[0.3em] uppercase" style={{ color: "hsl(var(--steel))" }}>
                  Strategic Position
                </p>
              </div>
              <h2
                className="font-display text-3xl md:text-4xl font-bold text-foreground leading-[1.1] mb-5"
                style={{ letterSpacing: "-0.02em" }}
              >
                Location Value
              </h2>
              <p className="text-muted-foreground font-body text-[14px] leading-[1.85] mb-8">
                Strategically positioned at University Square in El Shorouk City, adjacent to the French University in Egypt — one of the area's highest-traffic intersections.
              </p>

              <div className="space-y-3 mb-8">
                {landmarks.map((lm, i) => (
                  <motion.div
                    key={lm.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="flex items-center justify-between py-3 px-4 rounded-lg"
                    style={{ background: "hsl(var(--cream))" }}
                  >
                    <div className="flex items-center gap-3">
                      <MapPin size={13} style={{ color: "hsl(var(--steel))" }} />
                      <span className="font-body text-[13px] text-foreground">{lm.name}</span>
                    </div>
                    <span
                      className="font-body text-[12px] font-semibold px-2.5 py-1 rounded-md"
                      style={{ background: "hsl(var(--navy) / 0.06)", color: "hsl(var(--navy))" }}
                    >
                      {lm.distance}
                    </span>
                  </motion.div>
                ))}
              </div>

              <a
                href="https://maps.google.com/?q=Solaria+Mall+El+Shorouk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-dark px-6 py-3 text-[11px] font-body tracking-[0.12em] uppercase rounded-lg"
              >
                Open in Google Maps
                <ArrowRight size={13} />
              </a>
            </motion.div>

            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 } as const}>
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-lg)" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3450.0642863994053!2d31.60202829678954!3d30.14957799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14581d004de29bd9%3A0x677ac037657c4a19!2sSolaria%20Mall!5e0!3m2!1sen!2seg!4v1772535772662!5m2!1sen!2seg"
                  width="100%"
                  height="480"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Solaria Mall Location"
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. PROJECT FILM
      ═══════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div {...fadeUp} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: "hsl(var(--steel) / 0.4)" }} />
              <p className="text-[10px] font-body font-semibold tracking-[0.3em] uppercase" style={{ color: "hsl(var(--steel))" }}>
                Project Film
              </p>
              <div className="w-8 h-px" style={{ background: "hsl(var(--steel) / 0.4)" }} />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-[1.1]" style={{ letterSpacing: "-0.02em" }}>
              Experience Solaria
            </h2>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            style={{ boxShadow: "var(--shadow-premium)" }}
            onClick={() => setVideoPlaying(true)}
          >
            {!videoPlaying ? (
              <>
                <img
                  src={solaria4}
                  alt="Solaria Mall project film thumbnail"
                  className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "hsl(var(--navy) / 0.35)" }}
                >
                  <div
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: "hsl(var(--ivory) / 0.9)",
                      boxShadow: "0 8px 40px hsl(var(--navy) / 0.3)",
                    }}
                  >
                    <Play size={28} className="ml-1" style={{ color: "hsl(var(--navy))" }} fill="hsl(var(--navy))" />
                  </div>
                </div>
              </>
            ) : (
              <iframe
                src="https://www.youtube.com/embed/8YDCm1TmTQ0?autoplay=1&rel=0&modestbranding=1"
                title="Solaria Mall Project Film"
                className="w-full aspect-video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}
          </motion.div>
        </div>
      </section>

      <MallGallerySection
        mallName="Solaria Mall"
        images={solariaGalleryImages}
        videos={[
          "8YDCm1TmTQ0", "ntpGQTMyq3Q", "0SPxL2rY3Dc", "-vQ52O22iwM", "l6kA_Ya2tW8",
          "bWMNLhNUWic", "giAo0wIirns", "5Vg0nxFPN2s", "lIwPvTA4kl8", "Z2s5k9hBR5s",
          "urvheJNfRdQ", "9ejGoFF4Jrk", "cepHBQGE7J0", "vDInqD_HcKU", "Y4lN13Cas5c",
          "BrDGv2SxZXI", "Hqv9KliWT1s", "7_I97gYQrho", "Yq2XDpp2UNU", "Xf8AUcMltIQ",
          "boE6pqIItFE", "IFGQuVc1Qh4", "NjbdYDPeErM", "PtXQ7ekGibo", "9xWD4rjaFz4",
          "lDb2srq3prQ", "21h59Aidbss", "5zo6Nh69DoU", "pnchRd-AAwg",
        ]}
      />

      {/* ═══════════════════════════════════════════
          8. FINAL CTA
      ═══════════════════════════════════════════ */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: "hsl(var(--navy))" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-1/2 h-full"
            style={{ background: "linear-gradient(to left, hsl(var(--primary-foreground) / 0.03), transparent)" }}
          />
        </div>
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center relative z-10">
          <motion.div {...fadeUp}>
            <div className="section-divider mb-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary-foreground) / 0.12), transparent)" }} />
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.08] mb-5"
              style={{ color: "hsl(var(--primary-foreground))", letterSpacing: "-0.02em" }}
            >
              Your Next Investment{" "}
              <span style={{ color: "hsl(var(--primary-foreground) / 0.5)" }}>Starts Here</span>
            </h2>
            <p
              className="font-body text-[15px] leading-[1.8] max-w-xl mx-auto mb-10"
              style={{ color: "hsl(var(--primary-foreground) / 0.5)" }}
            >
              Secure your unit at Solaria Mall — El Shorouk's most ambitious commercial destination with flexible spaces and premium positioning.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="btn-outline-light px-8 py-4 text-[12px] font-body tracking-[0.12em] uppercase rounded-lg"
              >
                Request Brochure
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className="btn-outline-light px-8 py-4 text-[12px] font-body tracking-[0.12em] uppercase rounded-lg"
              >
                Check Availability
                <Maximize2 size={14} />
              </Link>
            </div>

            {/* Contact shortcut */}
            <div className="flex items-center justify-center gap-6 mt-10">
              <a
                href="tel:19474"
                className="flex items-center gap-2 text-[12px] font-body transition-colors"
                style={{ color: "hsl(var(--primary-foreground) / 0.4)" }}
              >
                <Phone size={13} /> 19474
              </a>
              <div className="w-px h-4" style={{ background: "hsl(var(--primary-foreground) / 0.12)" }} />
              <a
                href="mailto:info@aswaq-developments.com"
                className="flex items-center gap-2 text-[12px] font-body transition-colors"
                style={{ color: "hsl(var(--primary-foreground) / 0.4)" }}
              >
                <Mail size={13} /> info@aswaq-developments.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SolariaMall;
