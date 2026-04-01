import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import Layout from "@/components/Layout";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import { useCareers } from "@/hooks/useCareers";
import heroImage from "@/assets/about-hero.webp";

const CareersAr = () => {
  const { careers, loading } = useCareers();

  useEffect(() => {
    document.title = "وظائف | أسواق للتطوير العقاري";
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[450px] flex items-center justify-center pt-[120px]">
        <img src={heroImage} alt="وظائف" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground"
          >
            وظائف
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Application Form - appears first on RTL */}
            <div className="order-1 lg:order-2">
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
            <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
              {loading ? (
                <p className="text-muted-foreground">جاري التحميل...</p>
              ) : careers.length === 0 ? (
                <p className="text-muted-foreground">لا توجد وظائف متاحة حالياً.</p>
              ) : (
                careers.map((career, i) => (
                  <motion.div
                    key={career.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <Link to={`/ar/careers/${career.slug}`}>
                      <h3 className="font-display text-lg font-bold text-foreground hover:text-primary transition-colors">
                        {career.title_ar || career.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      <span>{new Date(career.date).toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric" })}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {(career.description_ar || career.description).split("\n")[0]}
                    </p>
                    <Link
                      to={`/ar/careers/${career.slug}`}
                      className="inline-block mt-4 bg-[#D4AF37] text-[#0A1128] text-sm font-bold tracking-wide border border-transparent rounded-lg px-6 py-2 transition-all duration-300 ease-in-out hover:bg-[#0A1128] hover:text-[#D4AF37] hover:border-[#D4AF37] hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
                    >
                      اقرأ المزيد
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
