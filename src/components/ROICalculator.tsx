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

  const SliderInput = ({ label, value, min, max, step, onChange, suffix }: {
    label: string; value: number; min: number; max: number; step: number;
    onChange: (v: number) => void; suffix: string;
  }) => (
    <label className="block">
      <span className={`flex justify-between text-[13px] ${fontClass} text-foreground mb-2.5`}>
        <span className="text-foreground/70">{label}</span>
        <span className={`${numClass} text-foreground`}>{suffix === "%" ? `${value}%` : `${formatNum(value)} ${suffix}`}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer roi-slider"
      />
    </label>
  );

  return (
    <div
      className="bg-card rounded-2xl border border-border p-7 md:p-10 lg:p-12"
      style={{ boxShadow: 'var(--shadow-xl)' }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
          <Calculator size={18} className="text-foreground" />
        </div>
        <h3 className={`font-display text-lg font-bold text-foreground`}>
          {isArabic ? "حاسبة العائد على الاستثمار" : "ROI Calculator"}
        </h3>
      </div>

      <div className={wide ? "flex flex-col lg:flex-row gap-10 lg:gap-14" : ""}>
        {/* Sliders */}
        <div className={`space-y-6 ${wide ? "lg:flex-[3]" : ""}`}>
          <SliderInput label={isArabic ? "سعر الوحدة" : "Unit Price"} value={unitPrice} min={500000} max={10000000} step={100000} onChange={setUnitPrice} suffix="EGP" />
          <SliderInput label={isArabic ? "الدفعة المقدمة" : "Down Payment"} value={downPayment} min={10} max={100} step={5} onChange={setDownPayment} suffix="%" />
          <SliderInput label={isArabic ? "الإيجار الشهري المتوقع" : "Expected Monthly Rent"} value={monthlyRent} min={3000} max={100000} step={1000} onChange={setMonthlyRent} suffix="EGP" />
          <SliderInput label={isArabic ? "معدل الارتفاع السنوي" : "Annual Appreciation"} value={appreciation} min={5} max={30} step={1} onChange={setAppreciation} suffix="%" />
        </div>

        {/* Results */}
        <div className={wide ? "lg:flex-[2] flex flex-col justify-center" : "mt-8 pt-8 border-t border-border"}>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-5 bg-background border border-border/80 rounded-xl text-center">
              <p className={`text-[11px] text-muted-foreground ${fontClass} mb-1.5 tracking-wide`}>{isArabic ? "الدفعة المقدمة" : "Down Payment"}</p>
              <p className={`${numClass} text-lg text-foreground`}>{formatNum(downPaymentAmount)}</p>
            </div>
            <div className="p-5 bg-background border border-border/80 rounded-xl text-center">
              <p className={`text-[11px] text-muted-foreground ${fontClass} mb-1.5 tracking-wide`}>{isArabic ? "العائد السنوي" : "Gross Yield"}</p>
              <p className={`${numClass} text-lg text-foreground`}>{grossYield}%</p>
            </div>
            <div className="p-5 bg-background border border-border/80 rounded-xl text-center">
              <p className={`text-[11px] text-muted-foreground ${fontClass} mb-1.5 tracking-wide`}>{isArabic ? "القيمة بعد 5 سنوات" : "5-Year Value"}</p>
              <p className={`${numClass} text-lg text-foreground`}>{formatNum(fiveYearValue)}</p>
            </div>
            <div className="p-5 bg-primary rounded-xl text-center">
              <p className={`text-[11px] text-primary-foreground/50 ${fontClass} mb-1.5 tracking-wide`}>{isArabic ? "العائد الإجمالي" : "Total ROI"}</p>
              <div className="flex items-center justify-center gap-1.5">
                <TrendingUp size={15} className="text-primary-foreground/70" />
                <p className={`${numClass} text-lg text-primary-foreground`}>{roi}%</p>
              </div>
            </div>
          </div>
          <p className={`text-[10px] text-muted-foreground/50 ${fontClass} mt-5 text-center leading-relaxed`}>
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
