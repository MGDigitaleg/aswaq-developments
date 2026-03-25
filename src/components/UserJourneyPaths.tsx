import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Store, Briefcase, Stethoscope, Building2, ArrowRight } from "lucide-react";

const paths = {
  en: [
    {
      icon: Store,
      title: "Commercial Units",
      description: "Retail & F&B spaces in high-traffic mall destinations",
      href: "/units/commercial-for-sale",
      color: "from-accent/10 to-accent/5",
      iconColor: "text-accent",
    },
    {
      icon: Briefcase,
      title: "Administrative Units",
      description: "Modern office spaces for growing businesses",
      href: "/units/administrative-for-sale",
      color: "from-primary/10 to-primary/5",
      iconColor: "text-primary",
    },
    {
      icon: Stethoscope,
      title: "Medical Units",
      description: "Purpose-built clinics & healthcare facilities",
      href: "/units/medical-for-sale",
      color: "from-accent/10 to-accent/5",
      iconColor: "text-accent",
    },
    {
      icon: Building2,
      title: "All Projects",
      description: "Explore our full portfolio of developments",
      href: "/projects",
      color: "from-primary/10 to-primary/5",
      iconColor: "text-primary",
    },
  ],
  ar: [
    {
      icon: Store,
      title: "وحدات تجارية",
      description: "مساحات تجزئة ومطاعم في مولات ذات حركة مرور عالية",
      href: "/ar/units/commercial-for-sale",
      color: "from-accent/10 to-accent/5",
      iconColor: "text-accent",
    },
    {
      icon: Briefcase,
      title: "وحدات إدارية",
      description: "مساحات مكتبية عصرية للأعمال المتنامية",
      href: "/ar/units/administrative-for-sale",
      color: "from-primary/10 to-primary/5",
      iconColor: "text-primary",
    },
    {
      icon: Stethoscope,
      title: "وحدات طبية",
      description: "عيادات ومرافق صحية مصممة خصيصاً",
      href: "/ar/units/medical-for-sale",
      color: "from-accent/10 to-accent/5",
      iconColor: "text-accent",
    },
    {
      icon: Building2,
      title: "جميع المشاريع",
      description: "استكشف محفظتنا الكاملة من المشاريع",
      href: "/ar/projects",
      color: "from-primary/10 to-primary/5",
      iconColor: "text-primary",
    },
  ],
};

const UserJourneyPaths = () => {
  const location = useLocation();
  const isArabic = location.pathname.startsWith("/ar");
  const items = isArabic ? paths.ar : paths.en;

  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-accent font-body font-semibold tracking-widest uppercase text-xs mb-3">
            {isArabic ? "ابدأ رحلتك" : "Start Your Journey"}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            {isArabic ? "ما الذي تبحث عنه؟" : "What Are You Looking For?"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link
                to={item.href}
                className="group block p-6 md:p-8 rounded-2xl bg-gradient-to-br border border-border/60 hover:border-accent/30 hover:shadow-premium-lg transition-all duration-500 h-full"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={22} className={item.iconColor} />
                </div>
                <h3 className="font-display text-base md:text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm font-body mb-4 line-clamp-2">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold font-body group-hover:gap-2.5 transition-all duration-300">
                  {isArabic ? "استكشف" : "Explore"}
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserJourneyPaths;
