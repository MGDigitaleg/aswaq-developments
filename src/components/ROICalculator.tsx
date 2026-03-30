import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp } from "lucide-react";

const ROICalculator = ({ isArabic = false }: { isArabic?: boolean }) => {
  const [unitPrice, setUnitPrice] = useState(1500000);
  const [downPayment, setDownPayment] = useState(30);
  const [monthlyRent, setMonthlyRent] = useState(12000);
  const [appreciation, setAppreciation] = useState(15);

  const downPaymentAmount = unitPrice * (downPayment / 100);
  const annualRent = monthlyRent * 12;
  const grossYield = ((annualRent / unitPrice) * 100).toFixed(1);
  const fiveYearValue = unitPrice * Math.pow(1 + appreciation / 100, 5);
  const totalRentIncome = annualRent * 5;
  const totalReturn = fiveYearValue - unitPrice + totalRentIncome;
  const roi = ((totalReturn / unitPrice) * 100).toFixed(0);

  const formatNum = useCallback((n: number) => {
    return new Intl.NumberFormat(isArabic ? "ar-EG" : "en-EG").format(Math.round(n));
  }, [isArabic]);

  return (
    <div className="premium-card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Calculator size={20} className="text-primary" />
        </div>
        <h3 className="font-display text-lg font-bold text-foreground">
          {isArabic ? "حاسبة العائد على الاستثمار" : "ROI Calculator"}
        </h3>
      </div>

      <div className="space-y-5">
        {/* Unit Price */}
        <label>
          <span className="flex justify-between text-sm font-body text-foreground mb-2">
            <span>{isArabic ? "سعر الوحدة" : "Unit Price"}</span>
            <span className="font-semibold text-accent">{formatNum(unitPrice)} EGP</span>
          </span>
          <input
            type="range"
            min={500000}
            max={10000000}
            step={100000}
            value={unitPrice}
            onChange={(e) => setUnitPrice(Number(e.target.value))}
            className="w-full accent-[hsl(var(--accent))] h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
          />
        </label>

        {/* Down Payment */}
        <label>
          <span className="flex justify-between text-sm font-body text-foreground mb-2">
            <span>{isArabic ? "الدفعة المقدمة" : "Down Payment"}</span>
            <span className="font-semibold text-accent">{downPayment}%</span>
          </span>
          <input
            type="range"
            min={10}
            max={100}
            step={5}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full accent-[hsl(var(--accent))] h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
          />
        </label>

        {/* Monthly Rent */}
        <label>
          <span className="flex justify-between text-sm font-body text-foreground mb-2">
            <span>{isArabic ? "الإيجار الشهري المتوقع" : "Expected Monthly Rent"}</span>
            <span className="font-semibold text-accent">{formatNum(monthlyRent)} EGP</span>
          </span>
          <input
            type="range"
            min={3000}
            max={100000}
            step={1000}
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(Number(e.target.value))}
            className="w-full accent-[hsl(var(--accent))] h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
          />
        </label>

        {/* Appreciation */}
        <label>
          <span className="flex justify-between text-sm font-body text-foreground mb-2">
            <span>{isArabic ? "معدل الارتفاع السنوي" : "Annual Appreciation"}</span>
            <span className="font-semibold text-accent">{appreciation}%</span>
          </span>
          <input
            type="range"
            min={5}
            max={30}
            step={1}
            value={appreciation}
            onChange={(e) => setAppreciation(Number(e.target.value))}
            className="w-full accent-[hsl(var(--accent))] h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
          />
        </label>
      </div>

      {/* Results */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-cream rounded-xl text-center">
            <p className="text-xs text-muted-foreground font-body mb-1">{isArabic ? "الدفعة المقدمة" : "Down Payment"}</p>
            <p className="font-display text-lg font-bold text-foreground">{formatNum(downPaymentAmount)}</p>
          </div>
          <div className="p-4 bg-cream rounded-xl text-center">
            <p className="text-xs text-muted-foreground font-body mb-1">{isArabic ? "العائد السنوي" : "Gross Yield"}</p>
            <p className="font-display text-lg font-bold text-accent">{grossYield}%</p>
          </div>
          <div className="p-4 bg-cream rounded-xl text-center">
            <p className="text-xs text-muted-foreground font-body mb-1">{isArabic ? "القيمة بعد 5 سنوات" : "5-Year Value"}</p>
            <p className="font-display text-lg font-bold text-foreground">{formatNum(fiveYearValue)}</p>
          </div>
          <div className="p-4 bg-primary rounded-xl text-center">
            <p className="text-xs text-primary-foreground/60 font-body mb-1">{isArabic ? "العائد الإجمالي" : "Total ROI"}</p>
            <div className="flex items-center justify-center gap-1.5">
              <TrendingUp size={16} className="text-accent" />
              <p className="font-display text-lg font-bold text-accent">{roi}%</p>
            </div>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground/60 font-body mt-4 text-center leading-relaxed">
          {isArabic
            ? "* هذه تقديرات تقريبية لأغراض إرشادية فقط. العوائد الفعلية قد تختلف."
            : "* These are approximate estimates for illustrative purposes only. Actual returns may vary."}
        </p>
      </div>
    </div>
  );
};

export default ROICalculator;
