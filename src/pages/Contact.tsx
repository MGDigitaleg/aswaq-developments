import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
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
  },
  {
    icon: Phone,
    title: "Hotline",
    detail: "19474",
  },
  {
    icon: Mail,
    title: "Email",
    detail: "marketing@aswaqdev.com",
  },
];

const Contact = () => {
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

  const inputClass =
    "w-full px-4 py-3.5 border border-border/60 rounded-lg bg-card text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300";
  const selectClass =
    "w-full px-4 py-3.5 border border-border/60 rounded-lg bg-card text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300 appearance-none cursor-pointer";

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 md:pt-40 pb-16 md:pb-20 text-center relative z-10 min-h-[420px] flex flex-col justify-end">
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
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <div className="section-divider mb-5" style={{ marginLeft: 0 }} />
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  Send Us Your Inquiry
                </h2>
              </div>

              {submitted ? (
                <div className="text-center py-16 bg-card rounded-2xl border border-border/30" style={{ boxShadow: 'var(--shadow-md)' }}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Mail size={28} className="text-accent" />
                  </div>
                  <p className="font-display text-2xl font-bold text-foreground mb-2">Thank You!</p>
                  <p className="text-muted-foreground font-body text-[15px]">We've received your inquiry and will get back to you shortly.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 btn-premium px-6 py-2.5 text-sm rounded-lg font-body"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <input
                        type="text"
                        placeholder="Name *"
                        value={form.name || ""}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className={inputClass}
                      />
                      {errors.name && <p className="text-destructive text-xs mt-1.5 font-body">{errors.name}</p>}
                    </div>
                    <div>
                      <div className="flex">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="inline-flex items-center px-2 border border-r-0 border-border/60 rounded-l-lg bg-muted text-sm text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer min-w-[90px]"
                        >
                          {countryCodes.map((c) => (
                            <option key={`${c.flag}${c.code}`} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          placeholder="Phone Number *"
                          value={form.phone || ""}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          className={`${inputClass} rounded-l-none`}
                        />
                      </div>
                      {errors.phone && <p className="text-destructive text-xs mt-1.5 font-body">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <input
                        type="email"
                        placeholder="Email *"
                        value={form.email || ""}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={inputClass}
                      />
                      {errors.email && <p className="text-destructive text-xs mt-1.5 font-body">{errors.email}</p>}
                    </div>
                    <div className="relative">
                      <select
                        value={form.requestType || ""}
                        onChange={(e) => handleChange("requestType", e.target.value)}
                        className={selectClass}
                      >
                        <option value="" disabled>Select Request Type</option>
                        {requestTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <ChevronIcon />
                      {errors.requestType && <p className="text-destructive text-xs mt-1.5 font-body">{errors.requestType}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative">
                      <select
                        value={form.unitType || ""}
                        onChange={(e) => handleChange("unitType", e.target.value)}
                        className={selectClass}
                      >
                        <option value="" disabled>Select Unit Type</option>
                        {unitTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <ChevronIcon />
                      {errors.unitType && <p className="text-destructive text-xs mt-1.5 font-body">{errors.unitType}</p>}
                    </div>
                    <div className="relative">
                      <select
                        value={form.preferredMall || ""}
                        onChange={(e) => handleChange("preferredMall", e.target.value)}
                        className={selectClass}
                      >
                        <option value="" disabled>Select Preferred Mall</option>
                        {malls.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <ChevronIcon />
                      {errors.preferredMall && <p className="text-destructive text-xs mt-1.5 font-body">{errors.preferredMall}</p>}
                    </div>
                  </div>

                  <div>
                    <textarea
                      placeholder="Additional Notes"
                      rows={5}
                      value={form.notes || ""}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      className={`${inputClass} resize-y`}
                    />
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group btn-premium px-10 py-3.5 text-sm rounded-lg font-body disabled:opacity-50 inline-flex items-center gap-2"
                    >
                      {submitting ? "Sending…" : "Send"}
                      {!submitting && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              className="lg:w-80 flex flex-col gap-0 shrink-0"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {contactInfo.map((info, i) => (
                <div
                  key={info.title}
                  className={`p-7 bg-card ${i === 0 ? "rounded-t-2xl" : ""} ${i === contactInfo.length - 1 ? "rounded-b-2xl" : ""} ${i !== contactInfo.length - 1 ? "border-b border-border/30" : ""} border border-border/30 ${i > 0 ? "border-t-0" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <info.icon size={20} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-foreground mb-1.5">{info.title}</h4>
                      <p className="text-muted-foreground font-body text-sm leading-relaxed">{info.detail}</p>
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
  <svg
    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default Contact;
