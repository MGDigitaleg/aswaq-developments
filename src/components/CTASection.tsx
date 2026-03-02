import { Link, useLocation } from "react-router-dom";

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
    <section className="bg-primary py-20">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          {title}
        </h2>
        <p className="text-primary-foreground/70 font-body max-w-2xl mx-auto mb-8">
          {subtitle}
        </p>
        <Link
          to={resolvedLink}
          className="inline-block bg-accent text-accent-foreground px-8 py-3 font-semibold rounded hover:bg-gold-light transition-colors font-body"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
