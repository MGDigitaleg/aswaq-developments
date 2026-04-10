import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Calculator, Building2, ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import ROICalculator from "@/components/ROICalculator";
import useSEO from "@/hooks/useSEO";

const benefits = [
  { icon: TrendingUp, title: "High ROI Potential", desc: "Strong rental demand and consistent property appreciation across ASWAQ developments." },
  { icon: Building2, title: "Diverse Unit Types", desc: "Commercial, administrative & medical — from 29 to 300 m² across four landmark malls." },
  { icon: ShieldCheck, title: "Flexible Payment Plans", desc: "Payment structures designed for investors and business owners of all scales." },
  { icon: Calculator, title: "Data-Driven Decisions", desc: "Use our calculator to model returns, compare scenarios, and plan your investment." },
];

const ROICalculatorPage = () => {
  useSEO(
    "ROI Calculator | ASWAQ Developments Investment Tool",
    "Calculate your return on investment for commercial, administrative, and medical units in El Shorouk with ASWAQ Developments' interactive ROI calculator."
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 md:pt-40 pb-12 md:pb-16 text-center relative z-10 min-h-[360px] flex flex-col justify-end">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 justify-center mb-5">
              <div className="w-6 h-px bg-primary-foreground/15" />
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase font-body text-primary-foreground/40">Investment Tool</p>
              <div className="w-6 h-px bg-primary-foreground/15" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-5 leading-tight max-w-3xl mx-auto">
              ROI Calculator
            </h1>
            <p className="text-primary-foreground/50 font-body max-w-xl mx-auto text-[15px] leading-relaxed">
              Model your investment returns, compare scenarios, and make data-driven real estate decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 md:py-18 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ROICalculator wide />
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Why Invest with ASWAQ
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="p-5 bg-card rounded-xl border border-border/30 text-center"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon size={18} className="text-accent" />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-muted-foreground font-body text-[12.5px] leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-18 bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Ready to Invest?
            </h2>
            <p className="text-primary-foreground/50 font-body text-[15px] leading-relaxed mb-8 max-w-xl mx-auto">
              Browse available units and secure your next investment in El Shorouk's fastest-growing commercial destinations.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/units"
                className="btn-premium px-8 py-3 text-[12.5px] rounded-lg font-body inline-flex items-center gap-2 group"
              >
                Browse Units
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="btn-outline-light px-8 py-3 text-[12.5px] rounded-lg font-body"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ROICalculatorPage;
