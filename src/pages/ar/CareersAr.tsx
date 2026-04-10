import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase, ArrowLeft, Users, Building2, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import { useCareers } from "@/hooks/useCareers";
import heroImage from "@/assets/about-hero.webp";

const stats = [
  { icon: Users, value: "+٥٠", label: "فريق العمل" },
  { icon: Building2, value: "٤", label: "مشاريع نشطة" },
  { icon: Clock, value: "+٢٠", label: "سنة خبرة" },
];

const CareersAr = () => {
  const { careers, loading } = useCareers();

  useEffect(() => {
    document.title = "وظائف | أسواق للتطوير العقاري";
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[480px] flex items-end pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-fixed" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary-foreground/25" />
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase font-body text-primary-foreground/50">
                انضم لفريقنا
              </p>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground leading-[1.15] max-w-2xl">
              ابنِ مستقبل العقارات معنا
            </h1>
            <p className="text-primary-foreground/50 font-body text-[15px] mt-4 max-w-xl leading-relaxed">
              نبحث دائماً عن أشخاص موهوبين يشاركوننا شغفنا بالتميز والابتكار.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex gap-6 md:gap-10 mt-8"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(0 0% 100% / 0.08)' }}>
                  <s.icon size={14} className="text-primary-foreground/60" />
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-primary-foreground leading-none">{s.value}</div>
                  <div className="text-[9px] font-body tracking-[0.15em] uppercase text-primary-foreground/35">{s.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Positions Header */}
      <section className="pt-14 md:pt-20 pb-6 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-steel/40" />
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase font-body text-steel/60">الوظائف المتاحة</p>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
                الفرص الحالية
              </h2>
            </div>
            <p className="text-sm text-muted-foreground font-body max-w-md">
              {careers.length} {careers.length === 1 ? "وظيفة متاحة" : "وظائف متاحة"} — اعثر على ما يناسب مسيرتك المهنية.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16 md:pb-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Application Form */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start">
              <CareerApplicationForm
                careers={careers}
                title="تقديم للوظيفة"
                labels={{
                  name: "الاسم",
                  email: "الايميل",
                  phone: "الموبايل",
                  major: "التخصص",
                  coverLetter: "رسالة",
                  uploadCv: "السيرة الذاتية *",
                  chooseFile: "اختر ملف...",
                  browse: "تصفح",
                  selectPosition: "اختر الوظيفة",
                  send: "إرسال",
                  sending: "جاري الإرسال...",
                  errorPosition: "يرجى اختيار الوظيفة.",
                  errorCv: "يرجى رفع السيرة الذاتية.",
                  success: "تم إرسال طلبك بنجاح.",
                  errorSubmit: "فشل في إرسال الطلب. حاول مرة أخرى.",
                }}
              />
            </div>

            {/* Job Listings */}
            <div className="lg:col-span-2 space-y-4 order-2 lg:order-1">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-card rounded-2xl border border-border/40 p-6 animate-pulse">
                      <div className="h-5 bg-muted rounded w-1/3 mb-3" />
                      <div className="h-3 bg-muted rounded w-1/4 mb-4" />
                      <div className="h-3 bg-muted rounded w-2/3" />
                    </div>
                  ))}
                </div>
              ) : careers.length === 0 ? (
                <div className="bg-card rounded-2xl border border-border/40 p-12 text-center">
                  <Briefcase size={40} className="mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground font-body">لا توجد وظائف متاحة حالياً. تابعنا قريباً!</p>
                </div>
              ) : (
                careers.map((career, i) => (
                  <motion.div
                    key={career.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      to={`/ar/careers/${career.slug}`}
                      className="group block bg-card rounded-2xl border border-border/40 p-6 hover:border-primary/15 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase font-body text-primary/50 bg-primary/5 px-2 py-0.5 rounded-full">
                              دوام كامل
                            </span>
                          </div>
                          <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                            {career.title_ar || career.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground font-body">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={12} className="text-steel/50" />
                              {new Date(career.date).toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric" })}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin size={12} className="text-steel/50" />
                              مدينة الشروق
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground/80 mt-3 line-clamp-2 font-body leading-relaxed">
                            {(career.description_ar || career.description).split("\n")[0]}
                          </p>
                        </div>
                        <div className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-border/50 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-300 mt-4 flex-shrink-0">
                          <ArrowLeft size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CareersAr;
