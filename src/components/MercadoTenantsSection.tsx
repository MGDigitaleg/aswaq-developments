import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Tenant logos
import tarekSaeed from "@/assets/tenants/tarek-saeed.png";
import fireGrill from "@/assets/tenants/fire-grill.png";
import cityPhone from "@/assets/tenants/city-phone.png";
import zero from "@/assets/tenants/zero.png";
import pastacup from "@/assets/tenants/pastacup.png";
import clawsPaws from "@/assets/tenants/claws-paws.png";
import agroNova from "@/assets/tenants/agro-nova.png";
import bim from "@/assets/tenants/bim.png";
import townBakery from "@/assets/tenants/town-bakery.png";
import mamlaka from "@/assets/tenants/mamlaka.png";
import monginis from "@/assets/tenants/monginis.png";
import arkan from "@/assets/tenants/arkan.png";

interface Tenant {
  name: string;
  logo: string;
}

const tenants: Tenant[] = [
  { name: "BIM", logo: bim },
  { name: "Monginis", logo: monginis },
  { name: "Fire Grill", logo: fireGrill },
  { name: "PastaCup", logo: pastacup },
  { name: "City Phone Store", logo: cityPhone },
  { name: "Arkan Cafe & Nuts", logo: arkan },
  { name: "Town Bakery", logo: townBakery },
  { name: "Zero Haircuts & Shaves", logo: zero },
  { name: "Tarek Saeed", logo: tarekSaeed },
  { name: "Claws & Paws", logo: clawsPaws },
  { name: "Agro Nova", logo: agroNova },
  { name: "Mamlaka", logo: mamlaka },
];

interface Props {
  isArabic?: boolean;
}

const MercadoTenantsSection = ({ isArabic = false }: Props) => {
  // Duplicate for seamless loop
  const loopTenants = [...tenants, ...tenants];

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 md:mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: 'hsl(var(--steel) / 0.4)' }} />
            <p className="text-[9.5px] font-body font-semibold tracking-[0.35em] uppercase" style={{ color: 'hsl(var(--steel))' }}>
              {isArabic ? "ميركادو مول" : "Mercado Mall"}
            </p>
            <div className="w-8 h-px" style={{ background: 'hsl(var(--steel) / 0.4)' }} />
          </div>
          <h2
            className="font-display text-[1.5rem] md:text-[1.85rem] lg:text-[2.1rem] font-bold text-foreground leading-[1.12] mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            {isArabic ? "شركاء التجزئة والعلامات التجارية" : "Trusted Retail & Brand Partners"}
          </h2>
          <p className="text-muted-foreground font-body text-[13px] md:text-[14px] leading-[1.75] max-w-lg mx-auto">
            {isArabic
              ? "مجموعة مختارة من العلامات التجارية الرائدة في التجزئة والمطاعم والخدمات التي تشكّل تجربة ميركادو مول."
              : "A curated mix of retail, dining, and service brands shaping the Mercado Mall experience."}
          </p>
        </motion.div>
      </div>

      {/* Slider — full width with edge fade */}
      <div className="relative group/slider">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, hsl(var(--background)), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, hsl(var(--background)), transparent)' }} />

        <motion.div
          className="flex gap-4 md:gap-5 w-max cursor-grab active:cursor-grabbing"
          animate={{ x: isArabic ? ["0%", "50%"] : ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          whileHover={{ animationPlayState: "paused" } as any}
          style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
        >
          {loopTenants.map((tenant, i) => (
            <div
              key={`${tenant.name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center rounded-lg border bg-card"
              style={{
                width: 'clamp(140px, 14vw, 180px)',
                height: 'clamp(88px, 8.5vw, 110px)',
                borderColor: 'hsl(var(--border) / 0.45)',
              }}
            >
              <img
                src={tenant.logo}
                alt={tenant.name}
                className="max-w-[62%] max-h-[52%] object-contain opacity-90 hover:opacity-100 transition-opacity duration-400"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center mt-10 md:mt-12"
      >
        <Link
          to={isArabic ? "/ar/mercado-mall" : "/mercado-mall"}
          className="inline-flex items-center gap-2.5 font-body text-[11px] font-semibold tracking-[0.14em] uppercase px-6 py-3 rounded-md border text-foreground/70 hover:text-foreground transition-all duration-400 group"
          style={{ borderColor: 'hsl(var(--border) / 0.6)' }}
        >
          {isArabic ? "اكتشف ميركادو مول" : "Explore Mercado Mall"}
          {isArabic
            ? <ArrowRight size={11} className="transition-all duration-400 group-hover:-translate-x-1 opacity-50 group-hover:opacity-90 rotate-180" />
            : <ArrowRight size={11} className="transition-all duration-400 group-hover:translate-x-1 opacity-50 group-hover:opacity-90" />
          }
        </Link>
      </motion.div>
    </section>
  );
};

export default MercadoTenantsSection;
