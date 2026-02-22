import { motion } from "framer-motion";
import { MapPin, ShoppingBag, Stethoscope, Briefcase, Building2 } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import solariaImg from "@/assets/solaria-mall.jpg";
import useSEO from "@/hooks/useSEO";

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
      <section className="bg-primary py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-accent font-body font-medium tracking-widest uppercase text-sm mb-3">ASWAQ Developments</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Solaria Mall at El Shorouk</h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto">
              One of ASWAQ's most ambitious mixed-use properties — a vibrant hub for shopping, services, healthcare, and professional activities spanning 6,400 m².
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div className="md:w-1/2" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-lg overflow-hidden aspect-[4/3]">
                <img src={solariaImg} alt="Solaria Mall" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div className="md:w-1/2" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Solaria Mall at El Shorouk</h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                Solaria Mall is one of ASWAQ Developments' most ambitious mixed-use properties, positioned to become a vibrant hub for shopping, services, healthcare, and professional activities in El Shorouk City. Spanning across 6,400 square meters, the mall offers a diverse range of amenities and services.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                With its modern architectural identity and strategic placement near key landmarks, Solaria Mall meets the rising demand for commercial, business, and versatile properties in Egypt.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-6">Solaria Mall Location</h2>
          <p className="text-muted-foreground font-body text-center max-w-3xl mx-auto mb-12">
            Strategically situated in El Shorouk City, at University Square near the French University, Solaria Mall enjoys a prominent position drawing consistent visitation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {locationAdvantages.map((adv, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 p-5 bg-background rounded-lg"
              >
                <MapPin size={20} className="text-accent shrink-0 mt-0.5" />
                <p className="text-foreground font-body text-sm">{adv}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Units Available at Solaria Mall</h2>
          <p className="text-muted-foreground font-body max-w-3xl mx-auto mb-12">
            Explore available units for rent & sale at Solaria Mall ranging from 30 m² to 300 m².
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {unitTypes.map((type, i) => (
              <motion.div key={type.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-3 p-6 bg-cream rounded-lg"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <type.icon size={24} className="text-primary" />
                </div>
                <p className="font-semibold text-foreground font-body text-sm text-center">{type.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Why Invest in Solaria Mall</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {whyInvest.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-4 bg-background rounded-lg"
              >
                <span className="text-accent font-bold">✓</span>
                <p className="text-foreground font-body text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
