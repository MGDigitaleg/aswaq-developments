import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = ({
  title = "Start Your Next Real Estate Move With ASWAQ Developments",
  subtitle = "Looking for a trusted real estate developer offering premium property for sale or the right unit for rent?",
  buttonText = "Request Unit Details",
  buttonLink,
}: {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}) => {
  const location = useLocation();
  const isArabic = location.pathname.startsWith("/ar");
  const resolvedLink = buttonLink || (isArabic ? "/ar/contact" : "/contact");

  return (
    <section className="relative bg-primary py-12 md:py-18 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-foreground/[0.02] to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-divider mb-8" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary-foreground) / 0.1), transparent)' }} />
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-primary-foreground mb-5 leading-[1.08] max-w-3xl mx-auto">
            {title}
          </h2>
          <p className="text-primary-foreground/55 font-body max-w-xl mx-auto mb-8 text-[15px] leading-relaxed">
            {subtitle}
          </p>
          <Link
            to={resolvedLink}
            className="group btn-outline-light px-10 py-4 text-[13px] rounded-lg font-body"
          >
            {buttonText}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
