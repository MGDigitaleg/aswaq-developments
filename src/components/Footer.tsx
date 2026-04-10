import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Star, ExternalLink, ArrowRight, ArrowLeft } from "lucide-react";
import aswaqLogo from "@/assets/aswaq-logo.webp";

const reviews = [
  {
    name: "Mohamed Marghany",
    rating: 5,
    text: "Excellent",
    textAr: "ممتاز",
    date: "a year ago",
    dateAr: "منذ عام",
  },
  {
    name: "Ahmed Kandil",
    rating: 5,
    text: "A very reputable and reliable company, especially Mr. Mohamed El-Sadek and Mr. Ahmed Mohsen.",
    textAr: "شركة محترمة وموثوقة جدًا، وخصوصًا الأستاذ محمد الصادق والأستاذ أحمد محسن.",
    date: "3 years ago",
    dateAr: "منذ 3 سنوات",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={12} className={i < rating ? "fill-steel text-steel" : "text-primary-foreground/12"} />
    ))}
  </div>
);
...
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-primary-foreground/[0.04] rounded-xl p-4.5 border border-primary-foreground/[0.07] hover:border-primary-foreground/[0.14] transition-all duration-300"
              >
                <StarRating rating={review.rating} />
                <p className={`text-[12.5px] text-primary-foreground/65 mt-2.5 mb-3 ${fontClass} leading-relaxed min-h-[36px]`}>
                  "{isArabic ? review.textAr : review.text}"
                </p>
                <div className="flex items-center justify-between gap-3">
                  <p className={`text-[12px] font-semibold text-primary-foreground/85 ${fontClass}`}>{review.name}</p>
                  <p className={`text-[11px] text-primary-foreground/45 shrink-0 ${fontClass}`}>
                    {isArabic ? review.dateAr : review.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-primary-foreground/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className={`text-[11px] text-primary-foreground/50 ${fontClass}`}>
            © {new Date().getFullYear()} {isArabic ? "أسواق للتطوير العقاري. جميع الحقوق محفوظة." : "ASWAQ Developments. All rights reserved."}
          </p>
          <p className={`text-[11px] text-primary-foreground/50 ${fontClass}`}>
            {isArabic ? "تطوير بواسطة" : "Developed By"}{" "}
            <a href="https://mg.digital/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/55 underline hover:no-underline">MG Digital</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
