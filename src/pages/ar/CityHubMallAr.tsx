import { motion } from "framer-motion";
import { MapPin, ShoppingBag, TrendingUp, Store, Wrench } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import MallGallerySection from "@/components/MallGallerySection";
import cityhubImg from "@/assets/cityhub-mall.webp";
import useSEO from "@/hooks/useSEO";
import cityhub1 from "@/assets/gallery/cityhub-1.webp";
import cityhub2 from "@/assets/gallery/cityhub-2.webp";
import cityhub3 from "@/assets/gallery/cityhub-3.webp";
import cityhub4 from "@/assets/gallery/cityhub-4.webp";
import cityhub5 from "@/assets/gallery/cityhub-5.webp";
import cityhub6 from "@/assets/gallery/cityhub-6.webp";
import cityhub7 from "@/assets/gallery/cityhub-7.webp";
import cityhub8 from "@/assets/gallery/cityhub-8.webp";

const galleryImages = [cityhub1, cityhub2, cityhub3, cityhub4, cityhub5, cityhub6, cityhub7, cityhub8];
const galleryVideos = ["9pl-SiE0VVk", "868YMiO0LJc", "82mVbp9nB6U", "VIvmPBqrLnk"];

const unitTypes = [
  { icon: ShoppingBag, label: "وحدات تجارية للإيجار" },
  { icon: TrendingUp, label: "عقارات تجزئة للاستثمار" },
  { icon: Store, label: "محلات للإيجار" },
  { icon: Wrench, label: "مساحات لمزودي الخدمات والشركات المتخصصة" },
];

const whyInvest = [
  "مركز تجاري رئيسي في واحدة من أكثر المناطق الحضرية ديناميكية في شرق القاهرة",
  "مجموعة واسعة من أنواع الوحدات بمساحات تبدأ من 29 م²",
  "أسعار تنافسية مع خطط سداد ميسرة للمستثمرين",
  "مفهوم مول متكامل: تسوق وطعام وترفيه",
  "مجموعة كاملة من الخدمات والمرافق بما في ذلك هايبر ماركت ومطاعم وكافيهات ومنطقة ترفيه للأطفال وسينما",
  "هندسة معمارية عصرية وبنية تحتية ذكية جاهزة للتشغيل أو التأجير",
];

const CityHubMallAr = () => {
  useSEO("سيتي هب مول | وحدات تجارية للإيجار في الشروق", "استكشف الفرص التجارية الأفضل في سيتي هب مول الشروق بأسعار مرنة ووحدات للإيجار والبيع.");

  return (
    <Layout>
      <section className="bg-primary pt-48 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary-foreground/60 font-body font-medium tracking-widest uppercase text-sm mb-3">شركة أسواق للتطوير العقاري</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-6">سيتي هب مول في مدينة الشروق</h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto">
              وجهة تجارية وترفيهية رائدة متكاملة حيث يلتقي نمط الحياة اليومية مع متطلبات الاستثمار المربح.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div className="md:w-1/2" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-sm">
                <img src={cityhubImg} alt="سيتي هب مول" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div className="md:w-1/2" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground mb-4">سيتي هب مول بالشروق</h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                يُعد سيتي هب مول الشروق وجهة تجارية وترفيهية متكاملة رائدة. يتمتع المول بموقع استراتيجي في قلب مدينة الشروق، مصمم لضمان تدفق واضح للزوار ونشاط تجاري مستمر.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                يقدم سيتي هب مزيجاً من مساحات التجزئة والمطاعم والترفيه، مما يجعله فرصة استثمارية مقنعة للباحثين عن وحدات تجارية في واحدة من أسرع مناطق شرق القاهرة نمواً.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">موقع سيتي هب مول</h2>
          <p className="text-muted-foreground font-body max-w-3xl mx-auto mb-12">
            يقع في شارع النوادي بمدينة الشروق، يستفيد من موقعه الاستراتيجي في ممر صاخب. موقعه بالقرب من الطريق الدائري وطريق السويس يسهل الوصول إليه من جميع أنحاء القاهرة.
          </p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto p-6 bg-background rounded-2xl border border-border/50">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-primary shrink-0 mt-0.5" />
              <p className="text-foreground font-body text-sm text-right">
                بالقرب من مجمعات سكنية راقية وجامعات مما يولد تدفقاً مستمراً للزوار يدعم الطلب على التجزئة والترفيه.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.1527093465797!2d31.34942880000001!3d30.061156900000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f6d0024fbe5%3A0xa28dc2865dabbf10!2sCity%20Hub!5e0!3m2!1sar!2seg!4v1772535758532!5m2!1sar!2seg"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع سيتي هب مول"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">الوحدات التجارية المتاحة في سيتي هب مول</h2>
          <p className="text-muted-foreground font-body max-w-3xl mx-auto mb-12">
            استكشف الوحدات المتاحة للإيجار والبيع في سيتي هب مول بمساحات تتراوح من 29 م² إلى 198 م².
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {unitTypes.map((type, i) => (
              <motion.div key={type.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-3 p-6 bg-cream rounded-2xl border border-border/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <type.icon size={24} className="text-primary" />
                </div>
                <p className="font-semibold text-foreground font-body text-sm text-center">{type.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground text-center mb-12">لماذا تستثمر في سيتي هب مول</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {whyInvest.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-4 bg-background rounded-2xl border border-border/50 hover:shadow-md transition-all duration-300"
              >
                <span className="text-primary font-bold">✓</span>
                <p className="text-foreground font-body text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MallGallerySection mallName="سيتي هب مول" images={galleryImages} videos={galleryVideos} lang="ar" />

      <CTASection
        title="استثمر في سيتي هب مول اليوم"
        subtitle="امتلك وحدتك التجارية في موقع استراتيجي بمدينة الشروق واستمتع برؤية عالية وحركة زوار متواصلة مع حلول ملكية مرنة."
        buttonText="طلب تفاصيل الوحدة"
        buttonLink="/ar/contact"
      />
    </Layout>
  );
};

export default CityHubMallAr;
