import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowLeft } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { countryCodes } from "@/data/countryCodes";
import useSEO from "@/hooks/useSEO";

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

const requestTypes = ["شراء", "استثمار", "إيجار", "استشارة"];
const unitTypes = ["تجاري", "إداري", "طبي"];
const malls = ["سولاريا مول", "أرينا مول", "ميركادو مول", "سيتي هب مول"];

const contactInfo = [
  {
    icon: MapPin,
    title: "العنوان",
    detail: "فيلا 1/127 - مجمع النسور، حي الملتقى، طريق الأوتوستراد - شيراتون",
  },
  {
    icon: Phone,
    title: "الخط الساخن",
    detail: "19474",
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    detail: "marketing@aswaqdev.com",
  },
];

const ContactAr = () => {
  useSEO("اتصل بنا | أسواق للتطوير العقاري", "تواصل مع فريق أسواق للتطوير العقاري. لديك أسئلة حول مشاريعنا أو الوحدات المتاحة؟ نحن هنا لمساعدتك.");

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
      phone: result.data.phone,
      email: result.data.email,
      request_type: result.data.requestType,
      unit_type: result.data.unitType,
      preferred_mall: result.data.preferredMall,
      notes: result.data.notes || null,
      lang: "ar",
    });
    if (!error) {
      supabase.functions.invoke('send-pingram-email', {
        body: {
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone,
          requestType: result.data.requestType,
          unitType: result.data.unitType,
          preferredMall: result.data.preferredMall,
          notes: result.data.notes || '',
        },
      }).catch(console.error);

      setSubmitted(true);
      setForm({});
      setErrors({});
    }
    setSubmitting(false);
  };

  const inputClass =
    "w-full px-4 py-3.5 border border-border/60 rounded-xl bg-card text-foreground font-arabic text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40 transition-all";
  const selectClass =
    "w-full px-4 py-3.5 border border-border/60 rounded-xl bg-card text-foreground font-arabic text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40 transition-all appearance-none cursor-pointer";

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 md:pt-40 pb-16 md:pb-20 text-center relative z-10 min-h-[350px] flex flex-col justify-end">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase font-arabic mb-4 text-primary-foreground/40">تواصل معنا</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-5 leading-tight">اتصل بنا</h1>
            <p className="text-primary-foreground/55 font-arabic max-w-2xl mx-auto text-[15px] leading-relaxed">
              لديك أسئلة حول مشاريعنا أو الوحدات المتاحة؟ تواصل مع فريقنا وسنساعدك في إيجاد المساحة المثالية.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            <motion.div className="flex-1" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="section-divider mb-6" style={{ marginLeft: 'auto', marginRight: 0 }} />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">أرسل لنا استفسارك</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 bg-cream rounded-2xl border border-border/30"
                  style={{ boxShadow: 'var(--shadow-sm)' }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                    <Mail size={28} className="text-accent" />
                  </div>
                  <p className="font-display text-2xl font-bold text-foreground mb-2">شكرًا لك!</p>
                  <p className="text-muted-foreground font-arabic text-[15px]">لقد استلمنا استفسارك وسنرد عليك قريبًا.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 text-sm font-semibold rounded-xl hover:opacity-90 transition-all duration-300 font-arabic">
                    إرسال استفسار آخر
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <input type="text" placeholder="الاسم *" value={form.name || ""} onChange={(e) => handleChange("name", e.target.value)} className={inputClass} />
                      {errors.name && <p className="text-destructive text-xs mt-1 font-arabic">{errors.name}</p>}
                    </div>
                    <div>
                      <div className="flex">
                        <input type="tel" placeholder="رقم الهاتف *" value={form.phone || ""} onChange={(e) => handleChange("phone", e.target.value)} className={`${inputClass} rounded-l-none`} />
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="inline-flex items-center px-2 border border-l-0 border-border/60 rounded-l-xl bg-muted text-sm text-muted-foreground font-arabic focus:outline-none focus:ring-2 focus:ring-accent/30 appearance-none cursor-pointer min-w-[90px]"
                        >
                          {countryCodes.map((c) => (
                            <option key={`${c.flag}${c.code}`} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.phone && <p className="text-destructive text-xs mt-1 font-arabic">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <input type="email" placeholder="البريد الإلكتروني *" value={form.email || ""} onChange={(e) => handleChange("email", e.target.value)} className={inputClass} />
                      {errors.email && <p className="text-destructive text-xs mt-1 font-arabic">{errors.email}</p>}
                    </div>
                    <div className="relative">
                      <select value={form.requestType || ""} onChange={(e) => handleChange("requestType", e.target.value)} className={selectClass}>
                        <option value="" disabled>اختر نوع الطلب</option>
                        {requestTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <ChevronIcon />
                      {errors.requestType && <p className="text-destructive text-xs mt-1 font-arabic">{errors.requestType}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative">
                      <select value={form.unitType || ""} onChange={(e) => handleChange("unitType", e.target.value)} className={selectClass}>
                        <option value="" disabled>اختر نوع الوحدة</option>
                        {unitTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <ChevronIcon />
                      {errors.unitType && <p className="text-destructive text-xs mt-1 font-arabic">{errors.unitType}</p>}
                    </div>
                    <div className="relative">
                      <select value={form.preferredMall || ""} onChange={(e) => handleChange("preferredMall", e.target.value)} className={selectClass}>
                        <option value="" disabled>اختر المول المفضل</option>
                        {malls.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <ChevronIcon />
                      {errors.preferredMall && <p className="text-destructive text-xs mt-1 font-arabic">{errors.preferredMall}</p>}
                    </div>
                  </div>

                  <div>
                    <textarea placeholder="ملاحظات إضافية" rows={4} value={form.notes || ""} onChange={(e) => handleChange("notes", e.target.value)} className={`${inputClass} resize-y`} />
                  </div>

                  <div className="flex items-center justify-center">
                    <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-3.5 font-semibold rounded-xl hover:opacity-90 transition-all duration-300 font-arabic text-sm disabled:opacity-50">
                      {submitting ? "جاري الإرسال…" : "إرسال"}
                      {!submitting && <ArrowLeft size={16} />}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            <motion.div
              className="lg:w-80 shrink-0"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-card rounded-2xl border border-border/30 overflow-hidden" style={{ boxShadow: 'var(--shadow-sm)' }}>
                {contactInfo.map((info, i) => (
                  <div key={info.title} className={`p-6 ${i < contactInfo.length - 1 ? "border-b border-border/20" : ""}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                        <info.icon size={18} className="text-accent" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-foreground mb-1 text-sm">{info.title}</h4>
                        <p className="text-muted-foreground font-arabic text-sm leading-relaxed">{info.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const ChevronIcon = () => (
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default ContactAr;
