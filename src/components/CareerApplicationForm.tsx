import { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
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
  name: "Name",
  email: "Email Address",
  phone: "Phone Number",
  major: "Major",
  coverLetter: "Cover Letter",
  uploadCv: "Upload CV*",
  chooseFile: "Choose file...",
  browse: "Browse",
  selectPosition: "Select Position",
  send: "Send",
  sending: "Sending...",
  errorPosition: "Please select a position.",
  errorCv: "Please upload your CV.",
  success: "Your application has been submitted successfully.",
  errorSubmit: "Failed to submit application. Please try again.",
};

const CareerApplicationForm = ({ careers, selectedCareerId, title = "Apply For Job", labels: labelsProp }: Props) => {
  const l = { ...defaultLabels, ...labelsProp };
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    major: "",
    cover_letter: "",
    career_id: selectedCareerId || "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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
      // Upload CV
      const fileExt = cvFile.name.split(".").pop();
      const filePath = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("career-cvs")
        .upload(filePath, cvFile);

      if (uploadError) throw uploadError;

      // Submit application
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

      toast({ title: "✓", description: l.success });
      setForm({ name: "", email: "", phone: "", major: "", cover_letter: "", career_id: selectedCareerId || "" });
      setCvFile(null);
    } catch (err: any) {
      console.error(err);
      toast({ title: "Error", description: l.errorSubmit, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-xl shadow-lg p-6 md:p-8 sticky top-24"
    >
      <h2 className="font-display text-xl font-bold text-foreground mb-6">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder={l.name}
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
          className="bg-secondary border-0"
        />
        <Input
          type="email"
          placeholder={l.email}
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
          className="bg-secondary border-0"
        />
        <Input
          placeholder={l.phone}
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          required
          className="bg-secondary border-0"
        />
        <Input
          placeholder={l.major}
          value={form.major}
          onChange={(e) => handleChange("major", e.target.value)}
          className="bg-secondary border-0"
        />

        {!selectedCareerId && (
          <Select value={form.career_id} onValueChange={(v) => handleChange("career_id", v)}>
            <SelectTrigger className="bg-secondary border-0">
              <SelectValue placeholder={l.selectPosition} />
            </SelectTrigger>
            <SelectContent>
              {careers.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Textarea
          placeholder={l.coverLetter}
          value={form.cover_letter}
          onChange={(e) => handleChange("cover_letter", e.target.value)}
          rows={4}
          className="bg-secondary border-0 resize-y"
        />

        <div>
          <p className="text-sm text-muted-foreground mb-2">{l.uploadCv}</p>
          <label className="flex items-center gap-3 cursor-pointer bg-secondary rounded-md px-4 py-3 hover:bg-muted transition-colors">
            <Upload size={18} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground truncate">
              {cvFile ? cvFile.name : l.chooseFile}
            </span>
            <span className="ms-auto bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded">
              {l.browse}
            </span>
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
          className="w-full bg-primary text-primary-foreground hover:bg-navy-light font-semibold"
        >
          {loading ? l.sending : l.send}
        </Button>
      </form>
    </motion.div>
  );
};

export default CareerApplicationForm;
