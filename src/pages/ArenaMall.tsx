import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  MapPin,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Store,
} from "lucide-react";
import Layout from "@/components/Layout";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useSEO from "@/hooks/useSEO";
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

const projectHighlights = [
  "Mixed-use commercial concept",
  "Retail, clinics, and office opportunities",
  "Premium façade with strong visibility",
  "Strategic positioning in El Shorouk",
];

const locationCards = [
  "High visibility and accessible frontage",
  "Surrounded by active residential catchments",
  "Suitable for daily-footfall businesses",
  "Strong mixed-use demand potential",
];

const businessCards = [
  {
    icon: Store,
    title: "Retail & Showrooms",
    description: "Ideal for customer-facing brands and high-visibility operators.",
  },
  {
    icon: Stethoscope,
    title: "Medical Clinics",
    description: "Suitable for healthcare and service-led practices.",
  },
  {
    icon: Briefcase,
    title: "Administrative Offices",
    description: "Efficient layouts for professional and corporate use.",
  },
  {
    icon: Building2,
    title: "Flexible Commercial Units",
    description: "Adaptable spaces for growing businesses and mixed-use operations.",
  },
];

const progressMilestones = [
  "Structural presence established",
  "Façade identity taking shape",
  "Site and frontage activation",
  "Sales and investor engagement on site",
];

const investorPoints = [
  "Mixed-use demand across retail, medical, and office use",
  "Strong façade presence and visual branding value",
  "Contemporary product in a growing urban location",
  "Suitable for different tenant and business profiles",
  "Visible development progress increases confidence",
  "Built to support long-term business and investment potential",
];

const accessBenefits = [
  "Residential density",
  "Visibility",
  "Easy access",
  "Business relevance",
];

const galleryTabs = {
  vision: [heroImage, snapshotImage, visionRender, aerialRender],
  progress: [facadeWide, facadeDetail, siteOffice, distanceShot, courtyardShot],
  presence: [facadeDetail, snapshotImage, courtyardShot, heroImage],
};

const ArenaMall = () => {
  useSEO(
    "ARENA Mall El Shorouk | Premium Commercial Opportunity",
    "Explore ARENA Mall El Shorouk by ASWAQ Developments — a premium mixed-use destination for retail, clinics, offices, and investor-led business opportunity."
  );

  return (
    <Layout>
      <section className="relative min-h-[78vh] overflow-hidden bg-primary pt-32 md:pt-40">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="ARENA Mall premium night exterior render"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="hero-gradient absolute inset-0" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, hsl(var(--primary) / 0.82) 0%, hsl(var(--primary) / 0.55) 42%, hsl(var(--primary) / 0.25) 100%)" }}
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl items-end px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <p className="mb-5 text-[11px] font-body font-semibold uppercase tracking-[0.3em] text-primary-foreground/65">ASWAQ Developments</p>
            <h1 className="mb-5 max-w-2xl font-display text-4xl font-bold leading-[0.95] text-primary-foreground md:text-6xl lg:text-7xl">
              ARENA Mall El Shorouk
            </h1>
            <p className="mb-4 text-xl font-body text-primary-foreground/90 md:text-2xl">
              Built for Visibility. Designed for Business.
            </p>
            <p className="mb-8 max-w-2xl text-base font-body leading-8 text-primary-foreground/70 md:text-lg">
              A modern mixed-use commercial destination in El Shorouk, created for ambitious brands, clinics, and businesses seeking premium presence and long-term value.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn-premium justify-center px-7 py-4 text-sm font-body">
                Request Brochure
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-outline-light justify-center px-7 py-4 text-sm font-body">
                Book a Site Visit
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
            <div className="overflow-hidden rounded-[28px] border border-border/40" style={{ boxShadow: "var(--shadow-premium)" }}>
              <img src={snapshotImage} alt="ARENA Mall premium daytime render" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.08 }}>
            <p className="section-label mb-4">PROJECT OVERVIEW</p>
            <h2 className="mb-5 font-display text-3xl leading-tight text-foreground md:text-5xl">
              A Contemporary Commercial Landmark in El Shorouk
            </h2>
            <p className="mb-8 max-w-xl text-base font-body leading-8 text-muted-foreground">
              ARENA Mall is a modern mixed-use destination by ASWAQ Developments, designed to serve retail, medical, and administrative demand in one contemporary address. With a strong façade, premium architectural identity, and flexible business use, it is built to support visibility, movement, and long-term commercial value.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {projectHighlights.map((item) => (
                <div key={item} className="institutional-card flex items-start gap-3 p-4">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
                  <p className="text-sm font-body text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="section-label mb-4">Editorial proof of progress</p>
            <h2 className="mb-5 font-display text-3xl leading-tight text-foreground md:text-5xl">From Vision to Reality</h2>
            <p className="text-base font-body leading-8 text-muted-foreground">
              ARENA Mall is not just imagined beautifully — it is taking shape with confidence. The project’s visual identity, commercial ambition, and architectural presence are now moving from concept to construction, giving investors and business owners stronger trust in what is being delivered.
            </p>
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="overflow-hidden rounded-[28px] border border-border/40 bg-card p-4 md:p-6" style={{ boxShadow: "var(--shadow-premium)" }}>
            <BeforeAfterSlider beforeImage={visionRender} afterImage={facadeWide} beforeLabel="Vision" afterLabel="Progress" className="aspect-[16/9] rounded-[22px]" />
            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-3">
                {[
                  "Vision",
                  "Progress",
                  "Delivery Confidence",
                ].map((label) => (
                  <span key={label} className="rounded-full border border-border/50 bg-background px-4 py-2 text-[11px] font-body font-semibold uppercase tracking-[0.2em] text-foreground/75">
                    {label}
                  </span>
                ))}
              </div>
              <p className="text-sm font-body text-muted-foreground">Designed with intention. Built with momentum.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="section-label mb-4">Built form</p>
            <h2 className="mb-5 font-display text-3xl leading-tight text-foreground md:text-5xl">A Façade Designed for Presence</h2>
            <p className="text-base font-body leading-8 text-muted-foreground">
              ARENA Mall is defined by clean architectural lines, generous glazing, strong volumetric framing, and a contemporary mixed-use expression that enhances brand visibility and creates a premium commercial destination.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="overflow-hidden rounded-[28px] border border-border/40" style={{ boxShadow: "var(--shadow-lg)" }}>
              <img src={facadeDetail} alt="ARENA Mall real façade construction progress" className="h-full w-full object-cover" loading="lazy" />
            </motion.div>
            <div className="grid gap-5">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.06 }} className="overflow-hidden rounded-[28px] border border-border/40" style={{ boxShadow: "var(--shadow-lg)" }}>
                <img src={courtyardShot} alt="ARENA Mall frontage and courtyard progress" className="h-full w-full object-cover" loading="lazy" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.12 }} className="overflow-hidden rounded-[28px] border border-border/40" style={{ boxShadow: "var(--shadow-lg)" }}>
                <img src={distanceShot} alt="ARENA Mall wider site presence during construction" className="h-full w-full object-cover" loading="lazy" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <div>
              <p className="section-label mb-4">Location intelligence</p>
              <h2 className="mb-5 font-display text-3xl leading-tight text-foreground md:text-5xl">Strategically Positioned in El Shorouk</h2>
              <p className="mb-8 text-base font-body leading-8 text-muted-foreground">
                ARENA Mall benefits from a location that supports everyday movement, commercial exposure, and business relevance — making it suitable for customer-facing brands, healthcare practices, and modern office users.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {locationCards.map((item) => (
                  <div key={item} className="institutional-card p-4">
                    <p className="text-sm font-body text-foreground">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {accessBenefits.map((item) => (
                  <span key={item} className="rounded-full bg-card px-4 py-2 text-xs font-body font-semibold uppercase tracking-[0.2em] text-foreground/75" style={{ boxShadow: "var(--shadow-sm)" }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="overflow-hidden rounded-[28px] border border-border/40" style={{ boxShadow: "var(--shadow-premium)" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d220929.63495783907!2d31.4380646!3d30.0934547!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14581dde296e1a5b%3A0xdc596b1d18b48bea!2sArena%20Mall%20El-Shorouk!5e0!3m2!1sen!2seg!4v1772535766831!5m2!1sen!2seg"
                  width="100%"
                  height="440"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Arena Mall El Shorouk map"
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="https://maps.google.com/?q=Arena%20Mall%20El-Shorouk" target="_blank" rel="noreferrer" className="btn-premium justify-center px-6 py-3 text-sm font-body">
                  Open in Google Maps
                  <ArrowRight size={15} />
                </a>
                <div className="institutional-card flex items-center gap-3 px-5 py-3">
                  <MapPin size={18} className="text-accent" />
                  <p className="text-sm font-body text-foreground">Opposite the French University with high-visibility commercial frontage.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="section-label mb-4">Commercial mix</p>
            <h2 className="mb-5 font-display text-3xl leading-tight text-foreground md:text-5xl">Spaces Designed for Modern Business Needs</h2>
            <p className="text-base font-body leading-8 text-muted-foreground">
              From high-visibility retail units to clinic-ready floors and efficient office spaces, ARENA Mall is planned to support multiple business models within one coherent destination.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {businessCards.map((card, index) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.06 }} className="institutional-card p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
                  <card.icon size={22} className="text-accent" />
                </div>
                <h3 className="mb-3 font-display text-2xl text-foreground">{card.title}</h3>
                <p className="text-sm font-body leading-7 text-muted-foreground">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="section-label mb-4">On-site proof</p>
            <h2 className="mb-5 font-display text-3xl leading-tight text-foreground md:text-5xl">Visible Progress on the Ground</h2>
            <p className="text-base font-body leading-8 text-muted-foreground">
              ARENA Mall is not simply a proposal — it is actively taking shape. Recent construction progress reflects delivery momentum and reinforces confidence for buyers, tenants, and investors.
            </p>
          </div>

          <div className="mb-6 grid gap-5 lg:grid-cols-3">
            {[facadeWide, siteOffice, courtyardShot].map((image, index) => (
              <motion.div key={image} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.06 }} className="overflow-hidden rounded-[24px] border border-border/40 bg-card" style={{ boxShadow: "var(--shadow-lg)" }}>
                <img src={image} alt={`ARENA Mall construction progress ${index + 1}`} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                <div className="p-4">
                  <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-body font-semibold uppercase tracking-[0.18em] text-foreground/70">Active Development</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {progressMilestones.map((item) => (
              <div key={item} className="institutional-card p-5">
                <p className="mb-3 text-[11px] font-body font-semibold uppercase tracking-[0.22em] text-accent">Progress</p>
                <p className="text-sm font-body text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="section-label mb-4">Investor rationale</p>
            <h2 className="mb-5 font-display text-3xl leading-tight text-foreground md:text-5xl">Why Arena Appeals to Investors</h2>
            <p className="text-base font-body leading-8 text-muted-foreground">
              ARENA Mall combines architectural presence, flexible commercial use, and visible development progress in one address — creating a strong proposition for investors seeking stable demand and long-term commercial relevance.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {investorPoints.map((item, index) => (
              <motion.div key={item} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }} className="institutional-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  {[ShieldCheck, ScanSearch, Sparkles][index % 3] && (() => {
                    const Icon = [ShieldCheck, ScanSearch, Sparkles][index % 3];
                    return <Icon size={18} className="text-accent" />;
                  })()}
                  <span className="text-[11px] font-body font-semibold uppercase tracking-[0.22em] text-foreground/55">Investor Value</span>
                </div>
                <p className="text-sm font-body leading-7 text-foreground">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="section-label mb-4">Curated imagery</p>
            <h2 className="mb-5 font-display text-3xl leading-tight text-foreground md:text-5xl">Arena in Perspective</h2>
            <p className="text-base font-body leading-8 text-muted-foreground">
              A curated view of vision, progress, and architectural presence — organized to show how ARENA Mall is being imagined, built, and positioned.
            </p>
          </div>

          <Tabs defaultValue="vision" className="w-full">
            <TabsList className="mb-8 h-auto flex-wrap gap-2 rounded-2xl bg-card p-2">
              <TabsTrigger value="vision" className="rounded-xl px-5 py-3 font-body data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">3D Vision</TabsTrigger>
              <TabsTrigger value="progress" className="rounded-xl px-5 py-3 font-body data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Construction Progress</TabsTrigger>
              <TabsTrigger value="presence" className="rounded-xl px-5 py-3 font-body data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Façade & Presence</TabsTrigger>
            </TabsList>

            {Object.entries(galleryTabs).map(([key, images]) => (
              <TabsContent key={key} value={key}>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {images.map((image, index) => (
                    <motion.div key={`${key}-${index}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.04 }} className="overflow-hidden rounded-[24px] border border-border/40 bg-card" style={{ boxShadow: "var(--shadow-lg)" }}>
                      <img src={image} alt={`Arena Mall gallery ${key} ${index + 1}`} className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.03]" loading="lazy" />
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <p className="section-label mb-4">Experience</p>
            <h2 className="mb-5 font-display text-3xl leading-tight text-foreground md:text-5xl">More Than a Building - A Destination Experience</h2>
            <p className="text-base font-body leading-8 text-muted-foreground">
              ARENA Mall is designed to support movement, visibility, and everyday commercial activity — creating an environment where brands feel established, customers feel invited, and businesses feel positioned for growth.
            </p>
          </div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="overflow-hidden rounded-[28px] border border-border/40" style={{ boxShadow: "var(--shadow-premium)" }}>
            <img src={aerialRender} alt="ARENA Mall aspirational aerial render" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-primary">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="section-label mb-4" style={{ color: "hsl(var(--primary-foreground) / 0.45)" }}>Final opportunity</p>
          <h2 className="mb-5 font-display text-3xl leading-tight text-primary-foreground md:text-5xl">Position Your Business at ARENA Mall</h2>
          <p className="mx-auto mb-8 max-w-3xl text-base font-body leading-8 text-primary-foreground/68">
            Explore available opportunities, request detailed information, or schedule a site visit to discover the commercial potential of ARENA Mall El Shorouk.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/contact" className="btn-premium justify-center px-7 py-4 text-sm font-body">Request Brochure</Link>
            <Link to="/contact" className="btn-outline-light justify-center px-7 py-4 text-sm font-body">Book a Site Visit</Link>
            <Link to="/contact" className="btn-outline-light justify-center px-7 py-4 text-sm font-body">Talk to Sales Team</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ArenaMall;
