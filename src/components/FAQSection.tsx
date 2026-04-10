import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = ({ faqs, title = "You Ask, We Answer" }: { faqs: FAQItem[]; title?: string }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-14 md:py-20 bg-cream">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
        </div>
        <div className="divide-y divide-border/60">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.35 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left group"
                >
                  <span className="font-body font-medium text-foreground pr-4 text-sm leading-relaxed group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-primary text-primary-foreground rotate-180" : "text-muted-foreground"}`}>
                    <ChevronDown size={14} />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-muted-foreground text-[13px] leading-[1.9] font-body">
                        {faq.answer}
                      </p>
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
