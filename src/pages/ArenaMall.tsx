import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  MapPin,
  Stethoscope,
  Store,
  TrendingUp,
  Eye,
  Users,
  BarChart3,
  ShieldCheck,
  Layers,
} from "lucide-react";
import Layout from "@/components/Layout";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useSEO from "@/hooks/useSEO";
import Lightbox from "@/components/Lightbox";

import heroImage from "@/assets/arena-premium/arena-night-render.jpg";
import snapshotImage from "@/assets/arena-premium/arena-render-main.jpg";
import visionRender from "@/assets/arena-premium/arena-render-angle.jpg";
import lifestyleRender from "@/assets/arena-premium/arena-back-render.jpg";
import aerialRender from "@/assets/arena-premium/arena-aerial-render.jpg";
import facadeWide from "@/assets/arena-premium/arena-construction-wide.jpg";
import facadeDetail from "@/assets/arena-premium/arena-construction-facade.jpg";
import siteOffice from "@/assets/arena-premium/arena-construction-site-office.jpg";
import distanceShot from "@/assets/arena-premium/arena-construction-distance.jpg";
import courtyardShot from "@/assets/arena-premium/arena-construction-courtyard.jpg";

/* ── Animation presets ── */
const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

/* ── Chapter marker ── */
const Chapter = ({ number, label }: { number: string; label: string }) => (
  <div className="mb-8 flex items-center gap-4">
    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 font-display text-sm text-foreground/40">
      {number}
    </span>
    <span className="text-[11px] font-body font-semibold uppercase tracking-[0.28em] text-accent/80">
      {label}
    </span>
    <div className="h-px flex-1 bg-border/40" />
  </div>
);

/* ── Investor stat card ── */
const StatCard = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <motion.div variants={fadeUp} className="group relative overflow-hidden rounded-2xl border border-border/30 bg-card p-6 transition-all duration-500 hover:-translate-y-1" style={{ boxShadow: "var(--shadow-sm)" }}>
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
      <Icon size={20} className="text-accent" />
    </div>
    <p className="mb-1 font-display text-2xl text-foreground md:text-3xl">{value}</p>
    <p className="text-sm font-body text-muted-foreground">{label}</p>
  </motion.div>
);

const businessCards = [
  { icon: Store, title: "Retail & Showrooms", desc: "High-visibility ground and first-floor units designed for customer-facing brands, F&B, and service operators." },
  { icon: Stethoscope, title: "Medical Clinics", desc: "Purpose-planned floors with infrastructure for healthcare, dental, dermatology, and specialist practices." },
  { icon: Briefcase, title: "Administrative Offices", desc: "Efficient, naturally lit layouts suited for professional firms, corporate branches, and consultancies." },
  { icon: Building2, title: "Flexible Commercial", desc: "Adaptable floor plates that support co-working, training centers, and hybrid business models." },
];

const investorReasons = [
  { icon: Layers, text: "Mixed-use demand across retail, medical, and office verticals" },
  { icon: Eye, text: "Dominant façade presence and inherent branding value" },
  { icon: TrendingUp, text: "Located in a high-growth corridor with rising land values" },
  { icon: Users, text: "Multiple tenant profiles reduce vacancy risk" },
  { icon: ShieldCheck, text: "Visible construction progress — not just a promise" },
  { icon: BarChart3, text: "Structured for long-term capital appreciation and rental yield" },
];

const galleryTabs = {
  vision: [heroImage, snapshotImage, visionRender, aerialRender, lifestyleRender],
  progress: [facadeWide, facadeDetail, siteOffice, distanceShot, courtyardShot],
  presence: [facadeDetail, snapshotImage, courtyardShot, heroImage],
};

const ArenaMall = () => {
  useSEO(
    "ARENA Mall El Shorouk | Premium Commercial Opportunity",
    "Explore ARENA Mall El Shorouk by ASWAQ Developments — a premium mixed-use destination for retail, clinics, offices, and investor-led business opportunity."
  );

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
    <Lightbox images={lightboxImages} open={lightboxOpen} startIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />
    <Layout>
      {/* ════════════════════════════════════════════
          HERO — Full-viewport cinematic opener
      ════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen items-end overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <img src={heroImage} alt="ARENA Mall premium night exterior" className="h-full w-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(var(--primary) / 0.3) 0%, hsl(var(--primary) / 0.5) 40%, hsl(var(--primary) / 0.88) 75%, hsl(var(--primary) / 0.97) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, hsl(var(--primary) / 0.7) 0%, transparent 60%)" }} />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-40 sm:px-6 md:pb-28 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
            <p className="mb-6 text-[11px] font-body font-semibold uppercase tracking-[0.35em] text-primary-foreground/50">
              ASWAQ Developments — El Shorouk
            </p>
            <h1 className="mb-6 font-display text-5xl font-bold leading-[0.92] text-primary-foreground md:text-7xl lg:text-8xl">
              ARENA<br />Mall
            </h1>
            <div className="mb-8 h-px w-20 bg-primary-foreground/20" />
            <p className="mb-3 text-xl font-body font-medium text-primary-foreground/90 md:text-2xl">
              Built for Visibility. Designed for Business.
            </p>
            <p className="mb-10 max-w-xl text-base font-body leading-8 text-primary-foreground/55">
              A modern mixed-use commercial destination created for ambitious brands, clinics, and businesses seeking premium presence and long-term value.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn-premium justify-center px-8 py-4 text-sm font-body">
                Request Brochure <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-outline-light justify-center px-8 py-4 text-sm font-body">
                Book a Site Visit
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CHAPTER 01 — Project Snapshot
      ════════════════════════════════════════════ */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Chapter number="01" label="Project Overview" />
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ duration: 0.7 }}>
              <div className="overflow-hidden rounded-[28px] border border-border/40" style={{ boxShadow: "var(--shadow-premium)" }}>
                <img src={snapshotImage} alt="ARENA Mall premium daytime render" className="w-full object-cover" loading="lazy" />
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <h2 className="mb-6 font-display text-3xl leading-tight text-foreground md:text-5xl">
                A Contemporary Commercial Landmark
              </h2>
              <p className="mb-8 text-base font-body leading-8 text-muted-foreground">
                ARENA Mall is a modern mixed-use destination designed to serve retail, medical, and administrative demand in one contemporary address. With a strong façade, premium architectural identity, and flexible business use, it is built to support visibility, movement, and long-term commercial value.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {["Mixed-use commercial concept", "Retail, clinics & office opportunities", "Premium façade with strong visibility", "Strategic positioning in El Shorouk"].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-border/30 bg-card p-4" style={{ boxShadow: "var(--shadow-sm)" }}>
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                    <p className="text-sm font-body text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PULL QUOTE — Editorial divider
      ════════════════════════════════════════════ */}
      <section className="bg-primary py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.blockquote initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="font-display text-2xl font-medium italic leading-relaxed text-primary-foreground/85 md:text-4xl md:leading-snug">
            "Not just a building — a strategic position<br className="hidden md:block" /> in a city that's still growing."
          </motion.blockquote>
          <div className="mx-auto mt-6 h-px w-16 bg-primary-foreground/15" />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CHAPTER 02 — From Vision to Reality
      ════════════════════════════════════════════ */}
      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Chapter number="02" label="From Vision to Reality" />
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-6 font-display text-3xl leading-tight text-foreground md:text-5xl">
              What Was Imagined Is Now Taking Shape
            </h2>
            <p className="text-base font-body leading-8 text-muted-foreground">
              ARENA Mall is not just imagined beautifully — it is taking shape with confidence. The project's architectural presence is moving from concept to construction, giving investors and business owners tangible proof of what is being delivered.
            </p>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} transition={{ duration: 0.8 }} className="overflow-hidden rounded-[28px] border border-border/40 bg-card p-5 md:p-8" style={{ boxShadow: "var(--shadow-premium)" }}>
            <BeforeAfterSlider beforeImage={visionRender} afterImage={facadeWide} beforeLabel="Vision" afterLabel="Reality" className="aspect-[16/9] rounded-[20px]" />
            <div className="mt-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="flex flex-wrap gap-2">
                {["Vision", "Progress", "Delivery Confidence"].map((label) => (
                  <span key={label} className="rounded-full border border-border/50 bg-background px-4 py-2 text-[10px] font-body font-semibold uppercase tracking-[0.22em] text-foreground/60">
                    {label}
                  </span>
                ))}
              </div>
              <p className="font-display text-sm italic text-muted-foreground">Designed with intention. Built with momentum.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CHAPTER 03 — Architectural Identity
      ════════════════════════════════════════════ */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Chapter number="03" label="Architectural Identity" />
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-6 font-display text-3xl leading-tight text-foreground md:text-5xl">
              A Façade Designed for Presence
            </h2>
            <p className="text-base font-body leading-8 text-muted-foreground">
              Clean architectural lines, generous glazing, strong volumetric framing, and a contemporary mixed-use expression that enhances brand visibility and creates a premium commercial destination.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.7 }} className="overflow-hidden rounded-[28px] border border-border/40" style={{ boxShadow: "var(--shadow-lg)" }}>
              <img src={facadeDetail} alt="ARENA Mall real façade construction" className="aspect-[16/10] w-full object-cover" loading="lazy" />
            </motion.div>
            <div className="grid gap-4">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6, delay: 0.08 }} className="overflow-hidden rounded-[28px] border border-border/40" style={{ boxShadow: "var(--shadow-lg)" }}>
                <img src={courtyardShot} alt="ARENA Mall courtyard progress" className="aspect-[4/3] w-full object-cover" loading="lazy" />
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6, delay: 0.14 }} className="overflow-hidden rounded-[28px] border border-border/40" style={{ boxShadow: "var(--shadow-lg)" }}>
                <img src={distanceShot} alt="ARENA Mall wider site presence" className="aspect-[4/3] w-full object-cover" loading="lazy" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CHAPTER 04 — Strategic Location
      ════════════════════════════════════════════ */}
      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Chapter number="04" label="Location Intelligence" />
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="mb-6 font-display text-3xl leading-tight text-foreground md:text-5xl">
                Strategically Positioned in El Shorouk
              </h2>
              <p className="mb-8 text-base font-body leading-8 text-muted-foreground">
                ARENA Mall benefits from a location that supports everyday movement, commercial exposure, and business relevance — making it suitable for customer-facing brands, healthcare practices, and modern office users.
              </p>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-8 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: Eye, text: "High visibility and accessible frontage" },
                  { icon: Users, text: "Active residential catchments nearby" },
                  { icon: TrendingUp, text: "Strong daily-footfall potential" },
                  { icon: BarChart3, text: "Growing mixed-use demand zone" },
                ].map((item) => (
                  <motion.div key={item.text} variants={fadeUp} className="flex items-start gap-3 rounded-xl border border-border/30 bg-card p-4" style={{ boxShadow: "var(--shadow-sm)" }}>
                    <item.icon size={16} className="mt-0.5 shrink-0 text-accent" />
                    <p className="text-sm font-body text-foreground">{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>
              <div className="flex items-center gap-3 rounded-xl border border-border/30 bg-card px-5 py-4" style={{ boxShadow: "var(--shadow-sm)" }}>
                <MapPin size={18} className="shrink-0 text-accent" />
                <p className="text-sm font-body text-foreground">Opposite the French University — high-visibility commercial frontage</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="overflow-hidden rounded-[28px] border border-border/40" style={{ boxShadow: "var(--shadow-premium)" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d220929.63495783907!2d31.4380646!3d30.0934547!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14581dde296e1a5b%3A0xdc596b1d18b48bea!2sArena%20Mall%20El-Shorouk!5e0!3m2!1sen!2seg!4v1772535766831!5m2!1sen!2seg"
                  width="100%" height="380" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Arena Mall El Shorouk map" className="w-full"
                />
              </div>
              <a href="https://maps.google.com/?q=Arena%20Mall%20El-Shorouk" target="_blank" rel="noreferrer" className="btn-premium inline-flex w-full justify-center px-6 py-3 text-sm font-body sm:w-auto">
                Open in Google Maps <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CHAPTER 05 — Built for Modern Business
      ════════════════════════════════════════════ */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Chapter number="05" label="Commercial Mix" />
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-6 font-display text-3xl leading-tight text-foreground md:text-5xl">
              Spaces Designed for Modern Business
            </h2>
            <p className="text-base font-body leading-8 text-muted-foreground">
              From high-visibility retail to clinic-ready floors and efficient office spaces, ARENA Mall supports multiple business models within one coherent destination.
            </p>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {businessCards.map((card) => (
              <motion.div key={card.title} variants={fadeUp} className="group rounded-2xl border border-border/30 bg-card p-7 transition-all duration-500 hover:-translate-y-1" style={{ boxShadow: "var(--shadow-sm)" }}>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary transition-colors duration-300 group-hover:bg-accent/10">
                  <card.icon size={22} className="text-accent" />
                </div>
                <h3 className="mb-3 font-display text-xl text-foreground">{card.title}</h3>
                <p className="text-sm font-body leading-7 text-muted-foreground">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CHAPTER 06 — Construction Progress
      ════════════════════════════════════════════ */}
      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Chapter number="06" label="On-Site Evidence" />
          <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <h2 className="mb-6 font-display text-3xl leading-tight text-foreground md:text-5xl">
                Visible Progress on the Ground
              </h2>
              <p className="text-base font-body leading-8 text-muted-foreground">
                ARENA Mall is actively taking shape. Recent construction progress reflects delivery momentum and reinforces confidence for buyers, tenants, and investors.
              </p>
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 gap-3">
              {["Structural presence established", "Façade identity taking shape", "Site and frontage activation", "Sales engagement on site"].map((item) => (
                <motion.div key={item} variants={fadeUp} className="rounded-xl border border-border/30 bg-card p-4" style={{ boxShadow: "var(--shadow-sm)" }}>
                  <span className="mb-2 block text-[10px] font-body font-semibold uppercase tracking-[0.22em] text-accent">Progress</span>
                  <p className="text-sm font-body text-foreground">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[facadeWide, siteOffice, courtyardShot].map((image, index) => (
              <motion.div key={image} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6, delay: index * 0.08 }} className="overflow-hidden rounded-[24px] border border-border/40" style={{ boxShadow: "var(--shadow-lg)" }}>
                <img src={image} alt={`ARENA Mall construction ${index + 1}`} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                <div className="p-4">
                  <span className="rounded-full bg-secondary px-3 py-1.5 text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-foreground/60">Active Development</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CHAPTER 07 — Investor Rationale
      ════════════════════════════════════════════ */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Chapter number="07" label="Investor Rationale" />
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-6 font-display text-3xl leading-tight text-foreground md:text-5xl">
              Why Arena Appeals to Investors
            </h2>
            <p className="text-base font-body leading-8 text-muted-foreground">
              Architectural presence, flexible commercial use, and visible development progress in one address — creating a strong proposition for investors seeking stable demand and long-term relevance.
            </p>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {investorReasons.map((item) => (
              <motion.div key={item.text} variants={fadeUp} className="flex items-start gap-4 rounded-2xl border border-border/30 bg-card p-6 transition-all duration-500 hover:-translate-y-1" style={{ boxShadow: "var(--shadow-sm)" }}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
                  <item.icon size={18} className="text-accent" />
                </div>
                <p className="text-sm font-body leading-7 text-foreground">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CHAPTER 08 — Curated Gallery
      ════════════════════════════════════════════ */}
      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Chapter number="08" label="Visual Portfolio" />
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-6 font-display text-3xl leading-tight text-foreground md:text-5xl">Arena in Perspective</h2>
          </div>

          <Tabs defaultValue="vision" className="w-full">
            <TabsList className="mb-10 h-auto flex-wrap gap-2 rounded-2xl bg-card p-2">
              <TabsTrigger value="vision" className="rounded-xl px-6 py-3 font-body text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">3D Vision</TabsTrigger>
              <TabsTrigger value="progress" className="rounded-xl px-6 py-3 font-body text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Construction Progress</TabsTrigger>
              <TabsTrigger value="presence" className="rounded-xl px-6 py-3 font-body text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Façade & Presence</TabsTrigger>
            </TabsList>

            {Object.entries(galleryTabs).map(([key, images]) => (
              <TabsContent key={key} value={key}>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className={`grid gap-4 ${key === "vision" ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2 xl:grid-cols-3"}`}>
                  {images.map((image, index) => (
                    <motion.div key={`${key}-${index}`} variants={fadeUp} className="group overflow-hidden rounded-[24px] border border-border/40 bg-card" style={{ boxShadow: "var(--shadow-lg)" }}>
                      <img src={image} alt={`Arena Mall ${key} ${index + 1}`} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          DESTINATION — Full-bleed aspirational image
      ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0">
          <img src={aerialRender} alt="ARENA Mall aspirational aerial view" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(var(--primary) / 0.6) 0%, hsl(var(--primary) / 0.85) 100%)" }} />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="mb-6 font-display text-3xl leading-tight text-primary-foreground md:text-5xl">
              More Than a Building —<br />A Destination Experience
            </h2>
            <p className="mx-auto max-w-2xl text-base font-body leading-8 text-primary-foreground/70">
              An environment where brands feel established, customers feel invited, and businesses feel positioned for growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FINAL CTA — Decisive investor close
      ════════════════════════════════════════════ */}
      <section className="bg-primary py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="mb-5 text-[11px] font-body font-semibold uppercase tracking-[0.3em] text-primary-foreground/35">Next Step</p>
            <h2 className="mb-6 font-display text-3xl leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Position Your Business<br />at ARENA Mall
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-base font-body leading-8 text-primary-foreground/55">
              Explore available opportunities, request detailed information, or schedule a site visit to discover the commercial potential of ARENA Mall El Shorouk.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/contact" className="btn-premium justify-center px-8 py-4 text-sm font-body">Request Brochure</Link>
              <Link to="/contact" className="btn-outline-light justify-center px-8 py-4 text-sm font-body">Book a Site Visit</Link>
              <Link to="/contact" className="btn-outline-light justify-center px-8 py-4 text-sm font-body">Talk to Sales Team</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
    </>
  );
};

export default ArenaMall;
