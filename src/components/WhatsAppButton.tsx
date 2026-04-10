import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const isArabic = location.pathname.startsWith("/ar");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setLoading(true);
    try {
      const cleanPhone = phone.startsWith("+") ? phone : `+${phone}`;
      const { data, error } = await supabase.functions.invoke("send-zoko-welcome", {
        body: { phone: cleanPhone, name: name.trim() || undefined },
      });

      if (error) throw error;

      if (data?.success) {
        toast.success(isArabic ? "تم إرسال الرسالة بنجاح! تحقق من واتساب" : "Message sent! Check your WhatsApp");
        setIsOpen(false);
        setPhone("");
        setName("");
      } else {
        throw new Error(data?.error || "Failed to send");
      }
    } catch (err) {
      console.error("Zoko error:", err);
      toast.error(isArabic ? "حدث خطأ، حاول مرة أخرى" : "Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact us on WhatsApp"
        className="fixed bottom-20 right-6 z-50 rounded-2xl p-4 transition-all duration-300 hover:scale-105"
        style={{
          background: "hsl(152 32% 36%)",
          color: "white",
          boxShadow: "0 6px 20px -4px hsl(152 32% 28% / 0.30), 0 2px 8px -2px hsl(152 32% 28% / 0.12)",
          border: "1px solid hsl(152 32% 42% / 0.25)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        data-cursor-hover
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={26} fill="white" strokeWidth={0} />}
      </motion.button>

      {/* Chat Form Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-36 right-6 z-50 w-[320px] rounded-2xl overflow-hidden"
            style={{
              background: "hsl(var(--primary))",
              boxShadow: "0 20px 60px -12px hsl(0 0% 0% / 0.35)",
              border: "1px solid hsl(var(--primary-foreground) / 0.08)",
            }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-primary-foreground/10">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "hsl(152 32% 36%)" }}
                >
                  <MessageCircle size={20} fill="white" strokeWidth={0} />
                </div>
                <div>
                  <p className={`text-primary-foreground text-sm font-semibold ${isArabic ? "font-arabic" : "font-body"}`}>
                    {isArabic ? "تواصل معنا" : "Chat with us"}
                  </p>
                  <p className={`text-primary-foreground/50 text-[11px] ${isArabic ? "font-arabic" : "font-body"}`}>
                    {isArabic ? "سنرسل لك رسالة ترحيب على واتساب" : "We'll send you a welcome message on WhatsApp"}
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              <div>
                <label className={`block text-primary-foreground/60 text-[11px] mb-1.5 ${isArabic ? "font-arabic text-right" : "font-body"}`}>
                  {isArabic ? "الاسم (اختياري)" : "Name (optional)"}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isArabic ? "أدخل اسمك" : "Enter your name"}
                  className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-primary-foreground/[0.06] border border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/25 focus:outline-none focus:border-primary-foreground/25 transition-colors ${isArabic ? "font-arabic text-right" : "font-body"}`}
                  dir={isArabic ? "rtl" : "ltr"}
                />
              </div>
              <div>
                <label className={`block text-primary-foreground/60 text-[11px] mb-1.5 ${isArabic ? "font-arabic text-right" : "font-body"}`}>
                  {isArabic ? "رقم الواتساب *" : "WhatsApp Number *"}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+201234567890"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm font-body bg-primary-foreground/[0.06] border border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/25 focus:outline-none focus:border-primary-foreground/25 transition-colors"
                  dir="ltr"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !phone.trim()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 disabled:opacity-50"
                style={{
                  background: "hsl(152 32% 36%)",
                  color: "white",
                }}
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <Send size={14} />
                    <span className={isArabic ? "font-arabic" : "font-body"}>
                      {isArabic ? "أرسل رسالة ترحيب" : "Send Welcome Message"}
                    </span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppButton;
