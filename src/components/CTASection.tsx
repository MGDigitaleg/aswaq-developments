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
    <section className="relative bg-primary py-14 md:py-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-divider mb-8 bg-primary-foreground/15" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-primary-foreground mb-5 leading-tight max-w-3xl mx-auto">
            {title}
          </h2>
          <p className="text-primary-foreground/55 font-body max-w-2xl mx-auto mb-10 text-base md:text-lg leading-relaxed">
            {subtitle}
          </p>
          <Link
            to={resolvedLink}
            className="group inline-flex items-center gap-2 border border-primary-foreground/25 text-primary-foreground px-10 py-4 font-semibold rounded-lg hover:bg-primary-foreground/[0.08] hover:border-primary-foreground/40 transition-all duration-300 font-body text-sm md:text-base"
            data-cursor-hover
          >
            {buttonText}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
