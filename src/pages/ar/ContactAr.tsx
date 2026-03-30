import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
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

const requestTypes = ["استفسار", "حجز موعد", "طلب سعر"];
const unitTypes = ["تجاري", "إداري", "طبي"];
const malls = ["سولاريا مول", "أرينا مول", "ميركادو مول", "سيتي هب مول"];

const contactInfo = [
  {
    icon: MapPin,
    title: "العنوان",
    detail: "فيلا 1/127 - مجمع النسور، حي الملتقى، طريق الأوتوستراد - شيراتون",
    bg: "bg-primary/10",
  },
  {
    icon: Phone,
    title: "الخط الساخن",
    detail: "19474",
    bg: "bg-primary/5",
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    detail: "marketing@aswaqdev.com",
    bg: "bg-primary/10",
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
      phone: result.data.phone,
      email: result.data.email,
      request_type: result.data.requestType,
      unit_type: result.data.unitType,
      preferred_mall: result.data.preferredMall,
      notes: result.data.notes || null,
      lang: "ar",
    });
    if (!error) {
      // Send email notification via Pingram
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
    "w-full px-4 py-3 border border-border rounded-md bg-background text-foreground font-arabic text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all";
  const selectClass =
    "w-full px-4 py-3 border border-border rounded-md bg-background text-foreground font-arabic text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all appearance-none cursor-pointer";

  return (
    <Layout>
      <section className="bg-primary pt-48 pb-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary-foreground/60 font-arabic font-medium tracking-widest text-sm mb-3">تواصل معنا</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">اتصل بنا</h1>
            <p className="text-primary-foreground/70 font-arabic max-w-3xl mx-auto">
              لديك أسئلة حول مشاريعنا أو الوحدات المتاحة؟ تواصل مع فريقنا وسنساعدك في إيجاد المساحة المثالية.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            <motion.div className="flex-1" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">أرسل لنا استفسارك</h2>

              {submitted ? (
                <div className="text-center py-16 bg-cream rounded-lg">
                  <p className="font-display text-2xl font-bold text-foreground mb-2">شكرًا لك!</p>
                  <p className="text-muted-foreground font-arabic">لقد استلمنا استفسارك وسنرد عليك قريبًا.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 bg-accent text-accent-foreground px-6 py-2.5 text-sm font-semibold rounded hover:bg-gold-light transition-colors font-arabic">
                    إرسال استفسار آخر
                  </button>
                </div>
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
                          className="inline-flex items-center px-2 border border-l-0 border-border rounded-l-md bg-muted text-sm text-muted-foreground font-arabic focus:outline-none focus:ring-2 focus:ring-accent/50 appearance-none cursor-pointer min-w-[90px]"
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
                    <textarea placeholder="ملاحظات إضافية" rows={5} value={form.notes || ""} onChange={(e) => handleChange("notes", e.target.value)} className={`${inputClass} resize-y`} />
                  </div>

                  <div className="flex items-center justify-start">
                    <button type="submit" disabled={submitting} className="bg-primary text-primary-foreground px-10 py-3 font-semibold rounded hover:bg-navy-light transition-colors font-arabic text-sm disabled:opacity-50">
                      {submitting ? "جاري الإرسال…" : "إرسال"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            <motion.div className="lg:w-80 flex flex-col gap-0 shrink-0" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {contactInfo.map((info, i) => (
                <div key={info.title} className={`p-6 ${info.bg} ${i === 0 ? "rounded-t-lg" : ""} ${i === contactInfo.length - 1 ? "rounded-b-lg" : ""}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <info.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-foreground mb-1">{info.title}</h4>
                      <p className="text-muted-foreground font-arabic text-sm leading-relaxed">{info.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
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
