import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Shield, Clock, MapPin, TrendingUp, Building2, Users } from "lucide-react";

const trustData = {
  en: {
    label: "Why ASWAQ",
    title: "Built on Trust, Driven by Excellence",
    subtitle: "Over two decades of proven success in Egypt's real estate market",
    stats: [
      { value: "20+", label: "Years of Expertise", icon: Clock },
      { value: "15+", label: "Successful Projects", icon: Building2 },
      { value: "400+", label: "Satisfied Clients", icon: Users },
      { value: "3B+", label: "EGP Invested", icon: TrendingUp },
    ],
    points: [
      {
        icon: Shield,
        title: "Proven Track Record",
        text: "Backed by over 20 years of real estate expertise and partnerships active since 2002.",
      },
      {
        icon: MapPin,
        title: "Strategic Locations",
        text: "All projects in Shorouk City's most dynamic growth corridors with high population density.",
      },
      {
        icon: TrendingUp,
        title: "Strong Investment Returns",
        text: "High-demand areas with proven rental yields and capital appreciation potential.",
      },
      {
        icon: Building2,
        title: "Professional Management",
        text: "ASWAQ-owned and managed properties ensuring quality, maintenance, and long-term value.",
      },
    ],
  },
  ar: {
    label: "لماذا أسواق",
    title: "بُنينا على الثقة، ونقودنا التميّز",
    subtitle: "أكثر من عقدين من النجاح المُثبت في سوق العقارات المصري",
    stats: [
      { value: "20+", label: "سنوات خبرة", icon: Clock },
      { value: "15+", label: "مشروع ناجح", icon: Building2 },
      { value: "400+", label: "عميل راضٍ", icon: Users },
      { value: "3B+", label: "جنيه استثمارات", icon: TrendingUp },
    ],
    points: [
      {
        icon: Shield,
        title: "سجل حافل بالنجاح",
        text: "مدعومين بأكثر من 20 عاماً من الخبرة العقارية وشراكات نشطة منذ 2002.",
      },
      {
        icon: MapPin,
        title: "مواقع استراتيجية",
        text: "جميع المشاريع في أكثر ممرات النمو ديناميكية بمدينة الشروق.",
      },
      {
        icon: TrendingUp,
        title: "عوائد استثمارية قوية",
        text: "مناطق ذات طلب مرتفع مع عوائد إيجارية مثبتة وإمكانية زيادة رأس المال.",
      },
      {
        icon: Building2,
        title: "إدارة احترافية",
        text: "عقارات مملوكة ومدارة بواسطة أسواق لضمان الجودة والقيمة طويلة المدى.",
      },
    ],
  },
};

const TrustSection = () => {
  const location = useLocation();
  const isArabic = location.pathname.startsWith("/ar");
  const data = isArabic ? trustData.ar : trustData.en;

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-body font-semibold tracking-widest uppercase text-xs mb-3">
            {data.label}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            {data.title}
          </h2>
          <p className="text-primary-foreground/60 font-body max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {data.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10"
            >
              <stat.icon size={20} className="text-accent mx-auto mb-3" />
              <div className="font-display text-3xl md:text-4xl font-bold text-accent mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-primary-foreground/60 font-body">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Trust points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {data.points.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex gap-4 p-6 rounded-xl bg-primary-foreground/5 border border-primary-foreground/8"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
                <point.icon size={20} className="text-accent" />
              </div>
              <div>
                <h4 className="font-display font-bold text-primary-foreground text-base mb-1.5">
                  {point.title}
                </h4>
                <p className="text-primary-foreground/60 text-sm font-body leading-relaxed">
                  {point.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
