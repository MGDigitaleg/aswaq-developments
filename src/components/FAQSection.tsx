import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = ({ faqs, title = "You Ask, We Answer" }: { faqs: FAQItem[]; title?: string }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/[0.06] mb-4">
              <HelpCircle size={18} className="text-primary/60" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h2>
          </motion.div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-0">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
                className="border-b border-border/40 last:border-b-0"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/[0.05] text-primary/50 text-[11px] font-display font-bold tabular-nums shrink-0 transition-colors group-hover:bg-primary/10 group-hover:text-primary/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body font-medium text-foreground text-[15px] leading-relaxed group-hover:text-primary/90 transition-colors duration-200">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-primary text-primary-foreground rotate-180"
                        : "bg-border/30 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary/70"
                    }`}
                  >
                    <ChevronDown size={14} strokeWidth={2.5} />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 pl-10">
                        <p className="text-muted-foreground text-[13px] leading-[1.95] font-body max-w-xl">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
