import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { countryCodes } from "@/data/countryCodes";

const contactSchema = z.object({
  name: z.string().trim().min(1, "الاسم مطلوب").max(100),
  phone: z.string().trim().min(1, "رقم الهاتف مطلوب").max(20),
  email: z.string().trim().email("بريد إلكتروني غير صالح").max(255),
  requestType: z.string().min(1, "يرجى اختيار نوع الطلب"),
  unitType: z.string().min(1, "يرجى اختيار نوع الوحدة"),
  preferredMall: z.string().min(1, "يرجى اختيار المول المفضل"),
  notes: z.string().max(1000).optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

const requestTypes = ["شراء وحدة", "استثمار", "إيجار وحدة", "حجز استشارة", "استفسار عام"];
const unitTypes = ["تجاري", "إداري", "طبي"];
const malls = ["سولاريا مول", "أرينا مول", "ميركادو مول", "سيتي هب مول"];

const contactInfo = [
  { icon: Phone, title: "الخط الساخن", detail: "19474", href: "tel:19474" },
  { icon: Mail, title: "البريد الإلكتروني", detail: "marketing@aswaqdev.com", href: "mailto:marketing@aswaqdev.com" },
  {
    icon: MapPin,
    title: "زوروّنا",
    detail: "فيلا 1/127 - مجمع النسور، حي الملتقى، طريق الأوتوستراد - شيراتون",
    href: undefined,
  },
];

const ContactAr = () => {
  const [form, setForm] = useState<Partial<ContactForm>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState("+20");

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("form_submissions").insert({
      name: result.data.name,
      phone: `${countryCode} ${result.data.phone}`,
      email: result.data.email,
      request_type: result.data.requestType,
      unit_type: result.data.unitType,
      preferred_mall: result.data.preferredMall,
      notes: result.data.notes || null,
      lang: "ar",
    });
    setSubmitting(false);
    if (!error) {
      setSubmitted(true);
      setForm({});
      setErrors({});
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 border border-border rounded-xl bg-background text-foreground font-arabic text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-all duration-300";
  const selectClass =
    "w-full px-4 py-3.5 border border-border rounded-xl bg-background text-foreground font-arabic text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-all duration-300 appearance-none cursor-pointer";

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-premium" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-accent font-arabic font-semibold tracking-[0.15em] text-xs mb-3">تواصل معنا</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              اتصل بنا
            </h1>
            <p className="text-primary-foreground/60 font-arabic max-w-2xl mx-auto text-base">
              لديك أسئلة حول مشاريعنا أو الوحدات المتاحة؟ تواصل معنا وسنساعدك في إيجاد المساحة المثالية.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-premium-md">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">أرسل لنا استفسارك</h2>
                <p className="text-muted-foreground font-arabic text-sm mb-8">
                  املأ البيانات أدناه وسيتواصل فريقنا معك خلال 24 ساعة.
                </p>

                {submitted ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="font-display text-2xl font-bold text-foreground mb-2">شكرًا لك!</p>
                    <p className="text-muted-foreground font-arabic mb-6">لقد استلمنا استفسارك وسنرد عليك قريبًا.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="bg-accent text-accent-foreground px-6 py-2.5 text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors font-arabic"
                    >
                      إرسال استفسار آخر
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-foreground/70 font-arabic mb-1.5">الاسم الكامل *</label>
                        <input type="text" placeholder="أدخل اسمك" value={form.name || ""} onChange={(e) => handleChange("name", e.target.value)} className={inputClass} />
                        {errors.name && <p className="text-destructive text-xs mt-1.5 font-arabic">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-foreground/70 font-arabic mb-1.5">رقم الهاتف *</label>
                        <div className="flex">
                          <input type="tel" placeholder="رقم الهاتف" value={form.phone || ""} onChange={(e) => handleChange("phone", e.target.value)} className={`${inputClass} rounded-l-none`} />
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="inline-flex items-center px-3 border border-l-0 border-border rounded-l-xl bg-muted text-sm text-muted-foreground font-arabic focus:outline-none focus:ring-2 focus:ring-accent/40 appearance-none cursor-pointer min-w-[90px]"
                          >
                            {countryCodes.map((c) => (
                              <option key={`${c.flag}${c.code}`} value={c.code}>{c.flag} {c.code}</option>
                            ))}
                          </select>
                        </div>
                        {errors.phone && <p className="text-destructive text-xs mt-1.5 font-arabic">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-foreground/70 font-arabic mb-1.5">البريد الإلكتروني *</label>
                        <input type="email" placeholder="your@email.com" value={form.email || ""} onChange={(e) => handleChange("email", e.target.value)} className={inputClass} />
                        {errors.email && <p className="text-destructive text-xs mt-1.5 font-arabic">{errors.email}</p>}
                      </div>
                      <div className="relative">
                        <label className="block text-xs font-semibold text-foreground/70 font-arabic mb-1.5">أبحث عن *</label>
                        <select value={form.requestType || ""} onChange={(e) => handleChange("requestType", e.target.value)} className={selectClass}>
                          <option value="" disabled>اختر الغرض</option>
                          {requestTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <ChevronIcon />
                        {errors.requestType && <p className="text-destructive text-xs mt-1.5 font-arabic">{errors.requestType}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="relative">
                        <label className="block text-xs font-semibold text-foreground/70 font-arabic mb-1.5">نوع الوحدة *</label>
                        <select value={form.unitType || ""} onChange={(e) => handleChange("unitType", e.target.value)} className={selectClass}>
                          <option value="" disabled>اختر نوع الوحدة</option>
                          {unitTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <ChevronIcon />
                        {errors.unitType && <p className="text-destructive text-xs mt-1.5 font-arabic">{errors.unitType}</p>}
                      </div>
                      <div className="relative">
                        <label className="block text-xs font-semibold text-foreground/70 font-arabic mb-1.5">المشروع المفضل *</label>
                        <select value={form.preferredMall || ""} onChange={(e) => handleChange("preferredMall", e.target.value)} className={selectClass}>
                          <option value="" disabled>اختر المشروع</option>
                          {malls.map((m) => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <ChevronIcon />
                        {errors.preferredMall && <p className="text-destructive text-xs mt-1.5 font-arabic">{errors.preferredMall}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground/70 font-arabic mb-1.5">ملاحظات إضافية</label>
                      <textarea placeholder="أخبرنا المزيد عما تبحث عنه..." rows={4} value={form.notes || ""} onChange={(e) => handleChange("notes", e.target.value)} className={`${inputClass} resize-y`} />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-10 py-3.5 font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 font-arabic text-sm disabled:opacity-50 shadow-gold"
                    >
                      {submitting ? "جاري الإرسال…" : "إرسال الاستفسار"}
                      {!submitting && <ArrowUpRight size={16} />}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="lg:w-80 flex flex-col gap-4 shrink-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {contactInfo.map((info) => {
                const Wrapper = info.href ? "a" : "div";
                const wrapperProps = info.href ? { href: info.href } : {};
                return (
                  <Wrapper
                    key={info.title}
                    {...(wrapperProps as any)}
                    className="p-6 rounded-2xl bg-card border border-border shadow-premium-sm hover:shadow-premium-md transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                        <info.icon size={20} className="text-accent" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-foreground text-sm mb-1">{info.title}</h4>
                        <p className="text-muted-foreground font-arabic text-sm leading-relaxed">{info.detail}</p>
                      </div>
                    </div>
                  </Wrapper>
                );
              })}

              <div className="p-6 rounded-2xl bg-primary text-primary-foreground mt-2">
                <p className="font-display font-bold text-base mb-2">موثوق من 400+ عميل</p>
                <p className="text-primary-foreground/60 text-sm font-arabic leading-relaxed">
                  أكثر من 20 عاماً من الخبرة العقارية. استثمارك في أيدٍ أمينة.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const ChevronIcon = () => (
  <svg className="absolute left-3 bottom-3.5 pointer-events-none text-muted-foreground" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default ContactAr;
