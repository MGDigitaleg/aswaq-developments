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

interface Tenant {
  name: string;
  logo: string;
}

const tenants: Tenant[] = [
  { name: "BIM", logo: bim },
  { name: "Fire Grill", logo: fireGrill },
  { name: "PastaCup", logo: pastacup },
  { name: "City Phone Store", logo: cityPhone },
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
    <section className="py-14 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            className="font-display text-[1.5rem] md:text-[1.85rem] lg:text-[2.1rem] font-bold text-foreground leading-[1.12] mb-3"
            style={{ letterSpacing: '-0.02em' }}
          >
            {isArabic ? "العلامات التجارية داخل ميركادو" : "Brands Inside Mercado Mall"}
          </h2>
          <p className="text-muted-foreground font-body text-[13px] md:text-[13.5px] leading-[1.8] max-w-md mx-auto">
            {isArabic
              ? "وجهة تجارية نابضة بالحياة تضم علامات تجارية رائدة في مجالات التجزئة والمطاعم والخدمات."
              : "A vibrant commercial destination home to leading brands in retail, dining, and services."}
          </p>
        </motion.div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mb-10 md:mb-12">
          {tenants.map((tenant, i) => (
            <motion.div
              key={tenant.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex items-center justify-center rounded-xl border border-border/40 bg-card hover:border-border/70 transition-all duration-500"
              style={{
                aspectRatio: '3 / 2',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: 'var(--shadow-md)' }} />
              <img
                src={tenant.logo}
                alt={tenant.name}
                className="max-w-[65%] max-h-[55%] object-contain transition-transform duration-500 group-hover:scale-[1.04]"
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
            className="inline-flex items-center gap-2.5 font-body text-[11px] font-semibold tracking-[0.14em] uppercase px-5.5 py-2.5 rounded-md border border-foreground/12 text-foreground/80 hover:text-foreground hover:border-foreground/30 transition-all duration-400 group"
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
