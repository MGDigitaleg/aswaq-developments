import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, Check, User, AtSign, Building2, ShoppingBag, MessageSquare, PhoneCall } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import JsonLd, { buildBreadcrumbSchema } from "@/components/JsonLd";
import { countryCodes } from "@/data/countryCodes";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(1, "Phone number is required").max(20),
  email: z.string().trim().email("Invalid email address").max(255),
  requestType: z.string().min(1, "Please select a request type"),
  unitType: z.string().min(1, "Please select a unit type"),
  preferredMall: z.string().min(1, "Please select a preferred mall"),
  notes: z.string().max(1000).optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

const requestTypes = ["Inquiry", "Appointment", "Price Request"];
const unitTypes = ["Commercial", "Administrative", "Medical"];
const malls = ["Solaria Mall", "Arena Mall", "Mercado Mall", "City Hub Mall"];

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    detail: "Villa 1/127 - Al-Nsoor complex, Al Moltaqa Neighborhood, Otostrad road - Sheraton",
    href: undefined as string | undefined,
  },
  {
    icon: Phone,
    title: "Hotline",
    detail: "19474",
    href: "tel:19474",
  },
  {
    icon: Mail,
    title: "Email",
    detail: "marketing@aswaqdev.com",
    href: "mailto:marketing@aswaqdev.com",
  },
];

/* ── Floating-label input ── */
const FloatingInput = ({
  label, value, onChange, error, type = "text", icon: Icon,
}: {
  label: string; value: string; onChange: (v: string) => void; error?: string; type?: string;
  icon: React.ElementType;
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative group">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 transition-colors group-focus-within:text-primary/60">
        <Icon size={16} />
      </div>
      <input
        type={type}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className={`peer w-full pl-10 pr-4 pt-5 pb-2 border rounded-xl bg-card text-foreground font-body text-sm focus:outline-none transition-all duration-300 ${
          error
            ? "border-destructive/60 focus:ring-2 focus:ring-destructive/20"
            : "border-border/50 focus:ring-2 focus:ring-primary/15 focus:border-primary/30 hover:border-border"
        }`}
      />
      <label
        className={`absolute left-10 transition-all duration-200 pointer-events-none font-body ${
          active
            ? "top-1.5 text-[10px] text-muted-foreground/70"
            : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground/60"
        }`}
      >
        {label}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-destructive text-[11px] mt-1 ml-1 font-body"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Floating-label select ── */
const FloatingSelect = ({
  label, value, onChange, options, error, icon: Icon,
}: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; error?: string;
  icon: React.ElementType;
}) => {
  const active = value.length > 0;
  return (
    <div className="relative group">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 transition-colors group-focus-within:text-primary/60 z-10">
        <Icon size={16} />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`peer w-full pl-10 pr-9 pt-5 pb-2 border rounded-xl bg-card text-foreground font-body text-sm focus:outline-none transition-all duration-300 appearance-none cursor-pointer ${
          error
            ? "border-destructive/60 focus:ring-2 focus:ring-destructive/20"
            : "border-border/50 focus:ring-2 focus:ring-primary/15 focus:border-primary/30 hover:border-border"
        } ${!active ? "text-transparent" : ""}`}
      >
        <option value="" disabled>{label}</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-foreground">{o}</option>
        ))}
      </select>
      <label
        className={`absolute left-10 transition-all duration-200 pointer-events-none font-body ${
          active
            ? "top-1.5 text-[10px] text-muted-foreground/70"
            : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground/60"
        }`}
      >
        {label}
      </label>
      <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/40" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-destructive text-[11px] mt-1 ml-1 font-body">{error}</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Progress bar ── */
const FormProgress = ({ form }: { form: Partial<ContactForm> }) => {
  const fields: (keyof ContactForm)[] = ["name", "phone", "email", "requestType", "unitType", "preferredMall"];
  const filled = fields.filter((f) => form[f] && String(form[f]).trim().length > 0).length;
  const pct = Math.round((filled / fields.length) * 100);
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex-1 h-1 bg-border/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
      <span className="text-[11px] font-body text-muted-foreground/60 tabular-nums font-medium min-w-[32px] text-right">
        {pct}%
      </span>
    </div>
  );
};

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<Partial<ContactForm>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState("+20");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const unit = searchParams.get("unit");
    const type = searchParams.get("type");
    const mall = searchParams.get("mall");
    const prefill: Partial<ContactForm> = {};
    if (type) {
      const typeMap: Record<string, string> = { Retail: "Commercial", Medical: "Medical", Admin: "Administrative" };
      const mapped = typeMap[type] || type;
      if (unitTypes.includes(mapped)) prefill.unitType = mapped;
    }
    if (mall && malls.includes(mall)) prefill.preferredMall = mall;
    if (unit) prefill.notes = `Inquiry about Unit ${unit}`;
    if (Object.keys(prefill).length > 0) setForm((prev) => ({ ...prev, ...prefill }));
  }, [searchParams]);

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
      lang: "en",
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

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact" },
  ]);

  return (
    <Layout>
      <JsonLd data={breadcrumbs} />

      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 md:pt-40 pb-16 md:pb-20 text-center relative z-10 min-h-[350px] flex flex-col justify-end">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase font-body mb-4 text-primary-foreground/40">Get In Touch</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-5 leading-tight">Contact Us</h1>
            <p className="text-primary-foreground/55 font-body max-w-2xl mx-auto text-[15px] leading-relaxed">
              Have questions about our projects or available units? Reach out to our team and we'll help you find the perfect space.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="py-14 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-2">
                <div className="section-divider mb-5" style={{ marginLeft: 0 }} />
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  Send Us Your Inquiry
                </h2>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center py-16 bg-card rounded-2xl border border-border/30"
                    style={{ boxShadow: 'var(--shadow-sm)' }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-16 h-16 mx-auto mb-5 rounded-full bg-accent/10 flex items-center justify-center"
                    >
                      <Check size={30} className="text-accent" strokeWidth={2.5} />
                    </motion.div>
                    <p className="font-display text-2xl font-bold text-foreground mb-2">Thank You!</p>
                    <p className="text-muted-foreground font-body text-[15px] max-w-sm mx-auto">
                      We've received your inquiry and will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 btn-premium px-7 py-3 text-sm rounded-xl font-body inline-flex items-center gap-2"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <FormProgress form={form} />
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FloatingInput
                          label="Full Name *"
                          value={form.name || ""}
                          onChange={(v) => handleChange("name", v)}
                          error={errors.name}
                          icon={User}
                        />
                        <div>
                          <div className="flex">
                            <select
                              value={countryCode}
                              onChange={(e) => setCountryCode(e.target.value)}
                              className="inline-flex items-center px-2 border border-r-0 border-border/50 rounded-l-xl bg-muted/60 text-sm text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/15 appearance-none cursor-pointer min-w-[85px] transition-colors hover:bg-muted"
                            >
                              {countryCodes.map((c) => (
                                <option key={`${c.flag}${c.code}`} value={c.code}>
                                  {c.flag} {c.code}
                                </option>
                              ))}
                            </select>
                            <div className="relative flex-1">
                              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50">
                                <PhoneCall size={16} />
                              </div>
                              <input
                                type="tel"
                                placeholder="Phone Number *"
                                value={form.phone || ""}
                                onChange={(e) => handleChange("phone", e.target.value)}
                                className={`w-full pl-10 pr-4 py-3.5 border border-border/50 rounded-r-xl rounded-l-none bg-card text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30 transition-all duration-300 hover:border-border ${
                                  errors.phone ? "border-destructive/60 focus:ring-destructive/20" : ""
                                }`}
                              />
                            </div>
                          </div>
                          <AnimatePresence>
                            {errors.phone && (
                              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-destructive text-[11px] mt-1 ml-1 font-body">{errors.phone}</motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FloatingInput
                          label="Email Address *"
                          value={form.email || ""}
                          onChange={(v) => handleChange("email", v)}
                          error={errors.email}
                          type="email"
                          icon={AtSign}
                        />
                        <FloatingSelect
                          label="Request Type *"
                          value={form.requestType || ""}
                          onChange={(v) => handleChange("requestType", v)}
                          options={requestTypes}
                          error={errors.requestType}
                          icon={MessageSquare}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FloatingSelect
                          label="Unit Type *"
                          value={form.unitType || ""}
                          onChange={(v) => handleChange("unitType", v)}
                          options={unitTypes}
                          error={errors.unitType}
                          icon={Building2}
                        />
                        <FloatingSelect
                          label="Preferred Mall *"
                          value={form.preferredMall || ""}
                          onChange={(v) => handleChange("preferredMall", v)}
                          options={malls}
                          error={errors.preferredMall}
                          icon={ShoppingBag}
                        />
                      </div>

                      <div className="relative group">
                        <div className="absolute left-3.5 top-4 text-muted-foreground/50 transition-colors group-focus-within:text-primary/60">
                          <MessageSquare size={16} />
                        </div>
                        <textarea
                          placeholder="Additional Notes (optional)"
                          rows={4}
                          value={form.notes || ""}
                          onChange={(e) => handleChange("notes", e.target.value)}
                          className="w-full pl-10 pr-4 pt-3.5 pb-3 border border-border/50 rounded-xl bg-card text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30 transition-all duration-300 resize-y hover:border-border"
                        />
                      </div>

                      <div className="flex items-center justify-end pt-2">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="group btn-premium px-10 py-3.5 text-sm rounded-xl font-body disabled:opacity-50 inline-flex items-center gap-2.5 relative overflow-hidden"
                        >
                          <span className="relative z-10">{submitting ? "Sending…" : "Send Inquiry"}</span>
                          {!submitting && (
                            <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              className="lg:w-[320px] shrink-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="bg-card rounded-2xl border border-border/30 overflow-hidden" style={{ boxShadow: 'var(--shadow-sm)' }}>
                {contactInfo.map((info, i) => {
                  const Inner = (
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-primary/[0.06] flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary/10">
                        <info.icon size={18} className="text-primary/70" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-foreground mb-1 text-[13px] tracking-wide uppercase">{info.title}</h4>
                        <p className="text-muted-foreground font-body text-sm leading-relaxed">{info.detail}</p>
                      </div>
                    </div>
                  );
                  return (
                    <div
                      key={info.title}
                      className={`group transition-colors hover:bg-muted/30 ${i < contactInfo.length - 1 ? "border-b border-border/20" : ""}`}
                    >
                      {info.href ? (
                        <a href={info.href} className="block p-6">{Inner}</a>
                      ) : (
                        <div className="p-6">{Inner}</div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Map placeholder */}
              <div className="mt-4 rounded-2xl border border-border/30 overflow-hidden bg-card" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.123456789!2d31.3456789!3d30.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA3JzI0LjQiTiAzMcKwMjAnNDQuNCJF!5e0!3m2!1sen!2seg!4v1234567890"
                  width="100%"
                  height="180"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ASWAQ Office Location"
                  className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
