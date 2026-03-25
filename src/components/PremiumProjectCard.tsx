import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

interface PremiumProjectCardProps {
  name: string;
  image: string;
  description: string;
  href: string;
  location?: string;
  unitTypes?: string[];
  index: number;
}

const PremiumProjectCard = ({ name, image, description, href, location, unitTypes, index }: PremiumProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={href}
        className="group block relative rounded-2xl overflow-hidden shadow-premium-md card-premium"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

          {/* Unit type tags */}
          {unitTypes && unitTypes.length > 0 && (
            <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
              {unitTypes.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-primary-foreground/15 text-primary-foreground/90 backdrop-blur-sm border border-primary-foreground/10 font-body"
                >
                  {type}
                </span>
              ))}
            </div>
          )}

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {location && (
              <div className="flex items-center gap-1.5 text-primary-foreground/60 text-xs font-body mb-2">
                <MapPin size={12} />
                {location}
              </div>
            )}
            <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-2">
              {name}
            </h3>
            <p className="text-primary-foreground/70 font-body text-sm line-clamp-2 mb-3 max-w-sm">
              {description}
            </p>

            {/* CTA */}
            <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm font-body group-hover:gap-3 transition-all duration-300">
              Explore Project
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PremiumProjectCard;
