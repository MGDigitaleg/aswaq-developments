import { useState } from "react";
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
    "w-full px-4 py-3.5 border border-border rounded-lg bg-background text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-all duration-300";
  const selectClass =
    "w-full px-4 py-3.5 border border-border rounded-lg bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-all duration-300 appearance-none cursor-pointer";

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact" },
  ]);

  return (
    <Layout>
      <JsonLd data={breadcrumbs} />
      {/* Hero */}
      <section className="bg-primary pt-48 pb-24 md:pb-28">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-accent font-body font-semibold tracking-[0.25em] uppercase text-xs mb-4">Get In Touch</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">Contact Us</h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto text-base leading-relaxed">
              Have questions about our projects or available units? Reach out to our team and we'll help you find the perfect space.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8">
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
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Send Us Your Inquiry
                </h2>
              </div>

              {submitted ? (
                <div className="text-center py-16 bg-cream rounded-xl border border-border/50">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <Mail size={28} className="text-accent" />
                  </div>
                  <p className="font-display text-2xl font-bold text-foreground mb-2">Thank You!</p>
                  <p className="text-muted-foreground font-body">We've received your inquiry and will get back to you shortly.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 bg-accent text-accent-foreground px-6 py-2.5 text-sm font-semibold rounded-md hover:bg-gold-light transition-all duration-300 font-body"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row 1: Name + Phone */}
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
                          className="inline-flex items-center px-2 border border-r-0 border-border rounded-l-lg bg-muted text-sm text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-accent/40 appearance-none cursor-pointer min-w-[90px]"
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

                  {/* Row 2: Email + Request Type */}
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

                  {/* Row 3: Unit Type + Preferred Mall */}
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

                  {/* Additional Notes */}
                  <div>
                    <textarea
                      placeholder="Additional Notes"
                      rows={5}
                      value={form.notes || ""}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      className={`${inputClass} resize-y`}
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group bg-primary text-primary-foreground px-10 py-3.5 font-semibold rounded-md hover:bg-navy-light transition-all duration-300 font-body text-sm disabled:opacity-50 inline-flex items-center gap-2"
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
                  className={`p-7 bg-cream ${i === 0 ? "rounded-t-xl" : ""} ${i === contactInfo.length - 1 ? "rounded-b-xl" : ""} ${i !== contactInfo.length - 1 ? "border-b border-border/50" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <info.icon size={20} className="text-primary" />
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
