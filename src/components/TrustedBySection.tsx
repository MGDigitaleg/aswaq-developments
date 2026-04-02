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
    <section className="py-12 md:py-16 bg-cream border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className={`text-muted-foreground ${fontClass} text-sm tracking-widest uppercase`}>
            {isArabic ? "شركاؤنا الموثوقون" : "Trusted By Industry Leaders"}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="flex items-center justify-center p-4 md:p-6 rounded-xl bg-background border border-border/30 hover:border-secondary/30 hover:shadow-sm transition-all duration-300 min-h-[72px]"
            >
              {/* Replace this div with an <img> tag for real logos */}
              <p className="font-display text-sm md:text-base font-bold text-foreground/50 text-center leading-tight">
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
