import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Send, CheckCircle2, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Career } from "@/hooks/useCareers";

interface Labels {
  name?: string;
  email?: string;
  phone?: string;
  major?: string;
  coverLetter?: string;
  uploadCv?: string;
  chooseFile?: string;
  browse?: string;
  selectPosition?: string;
  send?: string;
  sending?: string;
  errorPosition?: string;
  errorCv?: string;
  success?: string;
  errorSubmit?: string;
}

interface Props {
  careers: Career[];
  selectedCareerId?: string;
  title?: string;
  labels?: Labels;
}

const defaultLabels: Labels = {
  name: "Full Name",
  email: "Email Address",
  phone: "Phone Number",
  major: "Major / Specialization",
  coverLetter: "Cover Letter (optional)",
  uploadCv: "Resume / CV",
  chooseFile: "Drop your file here or click to browse",
  browse: "Browse",
  selectPosition: "Select Position",
  send: "Submit Application",
  sending: "Submitting...",
  errorPosition: "Please select a position.",
  errorCv: "Please upload your CV.",
  success: "Your application has been submitted successfully.",
  errorSubmit: "Failed to submit application. Please try again.",
};

const inputStyles = "bg-cream/60 border border-border/40 text-foreground placeholder:text-muted-foreground/50 rounded-xl h-11 text-sm font-body focus:border-primary/30 focus:ring-1 focus:ring-primary/10 transition-all duration-200";

const CareerApplicationForm = ({ careers, selectedCareerId, title = "Apply Now", labels: labelsProp }: Props) => {
  const l = { ...defaultLabels, ...labelsProp };
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    major: "",
    cover_letter: "",
    career_id: selectedCareerId || "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && /\.(pdf|doc|docx)$/i.test(file.name)) {
      setCvFile(file);
    }
  };

  const filledFields = [form.name, form.email, form.phone, form.career_id || selectedCareerId, cvFile].filter(Boolean).length;
  const totalRequired = 5;
  const progress = Math.round((filledFields / totalRequired) * 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.career_id) {
      toast({ title: "Error", description: l.errorPosition, variant: "destructive" });
      return;
    }
    if (!cvFile) {
      toast({ title: "Error", description: l.errorCv, variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const fileExt = cvFile.name.split(".").pop();
      const filePath = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from("career-cvs").upload(filePath, cvFile);
      if (uploadError) throw uploadError;

      const { error } = await supabase.from("career_applications").insert({
        career_id: form.career_id,
        name: form.name,
        email: form.email,
        phone: form.phone,
        major: form.major || null,
        cover_letter: form.cover_letter || null,
        cv_url: filePath,
      });
      if (error) throw error;

      setSubmitted(true);
      toast({ title: "✓", description: l.success });
    } catch (err: any) {
      console.error(err);
      toast({ title: "Error", description: l.errorSubmit, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-2xl border border-border/40 p-8 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={28} className="text-green-500" />
        </div>
        <h3 className="font-display text-lg font-bold text-foreground mb-2">
          {l.success?.includes("بنجاح") ? "تم الإرسال بنجاح!" : "Application Submitted!"}
        </h3>
        <p className="text-sm text-muted-foreground font-body leading-relaxed">
          {l.success}
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", phone: "", major: "", cover_letter: "", career_id: selectedCareerId || "" });
            setCvFile(null);
          }}
          className="mt-5 text-xs text-primary/60 hover:text-primary transition-colors font-body underline underline-offset-2"
        >
          {l.success?.includes("بنجاح") ? "تقديم طلب آخر" : "Submit another application"}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-2xl border border-border/40 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-primary px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(0 0% 100% / 0.1)' }}>
            <Send size={14} className="text-primary-foreground/70" />
          </div>
          <h2 className="font-display text-lg font-bold text-primary-foreground">{title}</h2>
        </div>
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-body tracking-wide text-primary-foreground/40 uppercase">
              {l.success?.includes("بنجاح") ? "اكتمال النموذج" : "Form Progress"}
            </span>
            <span className="text-[10px] font-body text-primary-foreground/50 font-semibold">{progress}%</span>
          </div>
          <div className="h-1 bg-primary-foreground/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'hsl(0 0% 100% / 0.35)' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-body font-semibold tracking-wide text-foreground/70 uppercase">{l.name} *</label>
          <Input
            placeholder={l.name}
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
            className={inputStyles}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-body font-semibold tracking-wide text-foreground/70 uppercase">{l.email} *</label>
          <Input
            type="email"
            placeholder={l.email}
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
            className={inputStyles}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-body font-semibold tracking-wide text-foreground/70 uppercase">{l.phone} *</label>
          <Input
            placeholder={l.phone}
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
            className={inputStyles}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-body font-semibold tracking-wide text-foreground/70 uppercase">{l.major}</label>
          <Input
            placeholder={l.major}
            value={form.major}
            onChange={(e) => handleChange("major", e.target.value)}
            className={inputStyles}
          />
        </div>

        {!selectedCareerId && (
          <div className="space-y-1.5">
            <label className="text-[11px] font-body font-semibold tracking-wide text-foreground/70 uppercase">{l.selectPosition} *</label>
            <Select value={form.career_id} onValueChange={(v) => handleChange("career_id", v)}>
              <SelectTrigger className={inputStyles}>
                <SelectValue placeholder={l.selectPosition} />
              </SelectTrigger>
              <SelectContent>
                {careers.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-[11px] font-body font-semibold tracking-wide text-foreground/70 uppercase">{l.coverLetter}</label>
          <Textarea
            placeholder={l.coverLetter}
            value={form.cover_letter}
            onChange={(e) => handleChange("cover_letter", e.target.value)}
            rows={3}
            className={`${inputStyles} h-auto resize-none`}
          />
        </div>

        {/* File Upload */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-body font-semibold tracking-wide text-foreground/70 uppercase">{l.uploadCv}</label>
          <label
            className={`relative flex flex-col items-center justify-center cursor-pointer rounded-xl border-2 border-dashed px-4 py-5 transition-all duration-200 ${
              dragActive
                ? "border-primary/40 bg-primary/5"
                : cvFile
                ? "border-green-300/60 bg-green-50/30"
                : "border-border/40 bg-cream/40 hover:border-primary/20 hover:bg-cream/60"
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
          >
            {cvFile ? (
              <div className="flex items-center gap-3 w-full">
                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                  <FileText size={16} className="text-green-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-body font-medium text-foreground truncate">{cvFile.name}</p>
                  <p className="text-[10px] text-muted-foreground font-body">{(cvFile.size / 1024).toFixed(0)} KB</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); setCvFile(null); }}
                  className="text-xs text-muted-foreground hover:text-red-500 transition-colors"
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <Upload size={20} className="text-muted-foreground/40 mb-2" />
                <p className="text-xs text-muted-foreground/60 font-body text-center">{l.chooseFile}</p>
                <p className="text-[10px] text-muted-foreground/40 font-body mt-1">PDF, DOC, DOCX</p>
              </>
            )}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCvFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground hover:bg-navy-light font-semibold rounded-xl h-12 text-sm tracking-wide transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {l.sending}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send size={14} />
              {l.send}
            </span>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default CareerApplicationForm;
