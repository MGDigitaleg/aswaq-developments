import { motion } from "framer-motion";

interface Partner {
  name: string;
  nameAr?: string;
}

const partners: Partner[] = [
  { name: "City Club", nameAr: "سيتي كلوب" },
  { name: "Shorouk City Authority", nameAr: "هيئة مدينة الشروق" },
  { name: "Egyptian Engineering", nameAr: "الهندسة المصرية" },
  { name: "National Bank", nameAr: "البنك الأهلي" },
  { name: "Delta Construction", nameAr: "دلتا للإنشاءات" },
  { name: "Cairo Developments", nameAr: "القاهرة للتطوير" },
];

interface TrustedBySectionProps {
  lang?: "en" | "ar";
}

const TrustedBySection = ({ lang = "en" }: TrustedBySectionProps) => {
  const isArabic = lang === "ar";
  const fontClass = isArabic ? "font-arabic" : "font-body";

  return (
    <section className="py-14 md:py-18 bg-cream border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className={`text-muted-foreground/60 ${fontClass} text-[11px] tracking-[0.2em] uppercase font-semibold`}>
            {isArabic ? "شركاؤنا الموثوقون" : "Trusted By Industry Leaders"}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex items-center justify-center p-5 md:p-6 rounded-xl bg-card border border-border/40 hover:border-border transition-all duration-300 min-h-[68px]"
            >
              <p className="font-display text-sm font-bold text-foreground/40 text-center leading-tight">
                {isArabic ? (partner.nameAr || partner.name) : partner.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
