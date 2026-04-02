import { useState, useCallback } from "react";
import { Calculator, TrendingUp } from "lucide-react";

const ROICalculator = ({ isArabic = false, wide = false }: { isArabic?: boolean; wide?: boolean }) => {
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

  const numClass = "font-['Montserrat'] font-bold tracking-tight";
  const fontClass = isArabic ? "font-arabic" : "font-body";

  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 lg:p-12" style={{ boxShadow: 'var(--shadow-xl)' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/[0.06] flex items-center justify-center">
          <Calculator size={20} className="text-primary" />
        </div>
        <h3 className={`font-display text-lg font-bold text-foreground ${fontClass}`}>
          {isArabic ? "حاسبة العائد على الاستثمار" : "ROI Calculator"}
        </h3>
      </div>

      <div className={wide ? "flex flex-col lg:flex-row gap-8 lg:gap-12" : ""}>
        {/* Sliders */}
        <div className={`space-y-5 ${wide ? "lg:flex-[3]" : ""}`}>
          {/* Unit Price */}
          <label>
            <span className={`flex justify-between text-sm ${fontClass} text-foreground mb-2`}>
              <span>{isArabic ? "سعر الوحدة" : "Unit Price"}</span>
              <span className={`${numClass} text-foreground`}>{formatNum(unitPrice)} EGP</span>
            </span>
            <input
              type="range"
              min={500000}
              max={10000000}
              step={100000}
              value={unitPrice}
              onChange={(e) => setUnitPrice(Number(e.target.value))}
              className="w-full accent-primary h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
            />
          </label>

          {/* Down Payment */}
          <label>
            <span className={`flex justify-between text-sm ${fontClass} text-foreground mb-2`}>
              <span>{isArabic ? "الدفعة المقدمة" : "Down Payment"}</span>
              <span className={`${numClass} text-foreground`}>{downPayment}%</span>
            </span>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full accent-primary h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
            />
          </label>

          {/* Monthly Rent */}
          <label>
            <span className={`flex justify-between text-sm ${fontClass} text-foreground mb-2`}>
              <span>{isArabic ? "الإيجار الشهري المتوقع" : "Expected Monthly Rent"}</span>
              <span className={`${numClass} text-foreground`}>{formatNum(monthlyRent)} EGP</span>
            </span>
            <input
              type="range"
              min={3000}
              max={100000}
              step={1000}
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              className="w-full accent-primary h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
            />
          </label>

          {/* Appreciation */}
          <label>
            <span className={`flex justify-between text-sm ${fontClass} text-foreground mb-2`}>
              <span>{isArabic ? "معدل الارتفاع السنوي" : "Annual Appreciation"}</span>
              <span className={`${numClass} text-foreground`}>{appreciation}%</span>
            </span>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={appreciation}
              onChange={(e) => setAppreciation(Number(e.target.value))}
              className="w-full accent-primary h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
            />
          </label>
        </div>

        {/* Results */}
        <div className={wide ? "lg:flex-[2] flex flex-col justify-center" : "mt-6 pt-6 border-t border-border"}>
          {!wide && <div className="h-0" />}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-background border border-border rounded-xl text-center">
              <p className={`text-xs text-muted-foreground ${fontClass} mb-1`}>{isArabic ? "الدفعة المقدمة" : "Down Payment"}</p>
              <p className={`${numClass} text-lg text-foreground`}>{formatNum(downPaymentAmount)}</p>
            </div>
            <div className="p-4 bg-background border border-border rounded-xl text-center">
              <p className={`text-xs text-muted-foreground ${fontClass} mb-1`}>{isArabic ? "العائد السنوي" : "Gross Yield"}</p>
              <p className={`${numClass} text-lg text-foreground`}>{grossYield}%</p>
            </div>
            <div className="p-4 bg-background border border-border rounded-xl text-center">
              <p className={`text-xs text-muted-foreground ${fontClass} mb-1`}>{isArabic ? "القيمة بعد 5 سنوات" : "5-Year Value"}</p>
              <p className={`${numClass} text-lg text-foreground`}>{formatNum(fiveYearValue)}</p>
            </div>
            <div className="p-4 bg-primary rounded-xl text-center">
              <p className={`text-xs text-primary-foreground/60 ${fontClass} mb-1`}>{isArabic ? "العائد الإجمالي" : "Total ROI"}</p>
              <div className="flex items-center justify-center gap-1.5">
                <TrendingUp size={16} className="text-primary-foreground" />
                <p className={`${numClass} text-lg text-primary-foreground`}>{roi}%</p>
              </div>
            </div>
          </div>
          <p className={`text-[10px] text-muted-foreground/60 ${fontClass} mt-4 text-center leading-relaxed`}>
            {isArabic
              ? "* هذه تقديرات تقريبية لأغراض إرشادية فقط. العوائد الفعلية قد تختلف."
              : "* These are approximate estimates for illustrative purposes only. Actual returns may vary."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
