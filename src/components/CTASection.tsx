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
    <section className="relative bg-primary py-24 md:py-32 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-divider mb-8 bg-primary-foreground/20" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-primary-foreground mb-5 leading-tight max-w-3xl mx-auto">
            {title}
          </h2>
          <p className="text-primary-foreground/60 font-body max-w-2xl mx-auto mb-10 text-base md:text-lg leading-relaxed">
            {subtitle}
          </p>
          <Link
            to={resolvedLink}
            className="group inline-flex items-center gap-2 bg-accent text-accent-foreground px-10 py-4 font-semibold rounded-md hover:bg-gold-light transition-all duration-300 font-body text-sm md:text-base"
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
