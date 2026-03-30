import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import Layout from "@/components/Layout";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import { useCareer, useCareers } from "@/hooks/useCareers";
import heroImage from "@/assets/about-hero.webp";

const CareerDetailAr = () => {
  const { slug } = useParams<{ slug: string }>();
  const { career, loading } = useCareer(slug);
  const { careers } = useCareers();

  useEffect(() => {
    if (career) {
      document.title = `${career.title} | وظائف | أسواق للتطوير العقاري`;
    }
  }, [career]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </Layout>
    );
  }

  if (!career) return <Navigate to="/ar/careers" replace />;

  const renderDescription = (text: string) => {
    return text.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;
      if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        return <p key={i} className="font-bold text-foreground mt-4 mb-1">{trimmed.replace(/\*\*/g, "")}</p>;
      }
      const boldMatch = trimmed.match(/^\*\*(.+?)\*\*(.*)$/);
      if (boldMatch) {
        return <p key={i} className="mt-1"><strong>{boldMatch[1]}</strong>{boldMatch[2]}</p>;
      }
      if (trimmed.startsWith("- ") || trimmed.startsWith("▪️")) {
        const content = trimmed.replace(/^-\s*/, "").replace(/^▪️\s*/, "");
        const parts = content.split(/\*\*(.+?)\*\*/);
        return (
          <li key={i} className="mr-4 text-muted-foreground">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
          </li>
        );
      }
      if (trimmed.startsWith("#")) {
        const content = trimmed.replace(/^#+\s*/, "");
        return <p key={i} className="font-bold text-foreground mt-3">{content}</p>;
      }
      return <p key={i} className="text-muted-foreground mt-1">{trimmed}</p>;
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[30vh] min-h-[200px] flex items-center justify-center">
        <img src={heroImage} alt="وظائف" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground"
          >
            وظائف
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Application Form */}
            <div className="order-1 lg:order-2">
              <CareerApplicationForm
                careers={careers}
                selectedCareerId={career.id}
                title="استفسار"
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

            {/* Job Details */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <Link
                to="/ar/careers"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors text-sm mb-6"
              >
                العودة للوظائف <ArrowLeft size={16} className="rotate-180" />
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="font-display text-2xl md:text-3xl font-bold text-accent">
                  {career.title_ar || career.title}
                </h2>
                <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                  <Calendar size={14} />
                  <span>
                    {new Date(career.date).toLocaleDateString("ar-EG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="mt-6 text-sm leading-relaxed">
                  <ul className="list-disc">{renderDescription(career.description_ar || career.description)}</ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CareerDetailAr;
