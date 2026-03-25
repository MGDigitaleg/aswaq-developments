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
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <div className="section-divider mb-6" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            {title}
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? "bg-cream border border-accent/20" : "bg-background border border-border hover:border-accent/20"}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
                >
                  <span className="font-body font-semibold text-foreground pr-4">{faq.question}</span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-accent text-accent-foreground rotate-180" : "bg-muted text-muted-foreground"}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed font-body">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
