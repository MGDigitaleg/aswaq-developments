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
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 md:mb-16"
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
              : "A curated selection of retail, dining, and service brands shaping the Mercado Mall experience."}
          </p>
        </motion.div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5 mb-12 md:mb-14">
          {tenants.map((tenant, i) => (
            <motion.div
              key={tenant.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.45, delay: i * 0.035, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex items-center justify-center rounded-lg border bg-card transition-all duration-500 hover:shadow-md"
              style={{
                aspectRatio: '5 / 3',
                borderColor: 'hsl(var(--border) / 0.5)',
              }}
            >
              <img
                src={tenant.logo}
                alt={tenant.name}
                className="max-w-[60%] max-h-[50%] object-contain transition-all duration-500 group-hover:scale-[1.03] opacity-80 group-hover:opacity-100"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
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
      </div>
    </section>
  );
};

export default MercadoTenantsSection;
