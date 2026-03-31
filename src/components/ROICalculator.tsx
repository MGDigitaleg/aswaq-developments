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

  const numClass = "font-['Montserrat'] font-bold tracking-tight";

  return (
    <div className="bg-[#F2EFE9] rounded-2xl border border-stone-200 p-6 md:p-8 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#0A1128]/10 flex items-center justify-center">
          <Calculator size={20} className="text-[#0A1128]" />
        </div>
        <h3 className="font-display text-lg font-bold text-[#0A1128]">
          {isArabic ? "حاسبة العائد على الاستثمار" : "ROI Calculator"}
        </h3>
      </div>

      <div className="space-y-5">
        {/* Unit Price */}
        <label>
          <span className="flex justify-between text-sm font-body text-[#0A1128] mb-2">
            <span>{isArabic ? "سعر الوحدة" : "Unit Price"}</span>
            <span className={`${numClass} text-[#0A1128]`}>{formatNum(unitPrice)} EGP</span>
          </span>
          <input
            type="range"
            min={500000}
            max={10000000}
            step={100000}
            value={unitPrice}
            onChange={(e) => setUnitPrice(Number(e.target.value))}
            className="w-full accent-[#c89c3c] h-1.5 bg-stone-200 rounded-full appearance-none cursor-pointer"
          />
        </label>

        {/* Down Payment */}
        <label>
          <span className="flex justify-between text-sm font-body text-[#0A1128] mb-2">
            <span>{isArabic ? "الدفعة المقدمة" : "Down Payment"}</span>
            <span className={`${numClass} text-[#0A1128]`}>{downPayment}%</span>
          </span>
          <input
            type="range"
            min={10}
            max={100}
            step={5}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full accent-[#c89c3c] h-1.5 bg-stone-200 rounded-full appearance-none cursor-pointer"
          />
        </label>

        {/* Monthly Rent */}
        <label>
          <span className="flex justify-between text-sm font-body text-[#0A1128] mb-2">
            <span>{isArabic ? "الإيجار الشهري المتوقع" : "Expected Monthly Rent"}</span>
            <span className={`${numClass} text-[#0A1128]`}>{formatNum(monthlyRent)} EGP</span>
          </span>
          <input
            type="range"
            min={3000}
            max={100000}
            step={1000}
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(Number(e.target.value))}
            className="w-full accent-[#c89c3c] h-1.5 bg-stone-200 rounded-full appearance-none cursor-pointer"
          />
        </label>

        {/* Appreciation */}
        <label>
          <span className="flex justify-between text-sm font-body text-[#0A1128] mb-2">
            <span>{isArabic ? "معدل الارتفاع السنوي" : "Annual Appreciation"}</span>
            <span className={`${numClass} text-[#0A1128]`}>{appreciation}%</span>
          </span>
          <input
            type="range"
            min={5}
            max={30}
            step={1}
            value={appreciation}
            onChange={(e) => setAppreciation(Number(e.target.value))}
            className="w-full accent-[#c89c3c] h-1.5 bg-stone-200 rounded-full appearance-none cursor-pointer"
          />
        </label>
      </div>

      {/* Results */}
      <div className="mt-6 pt-6 border-t border-stone-300">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white border border-stone-200 rounded-xl text-center">
            <p className="text-xs text-[#0A1128]/60 font-body mb-1">{isArabic ? "الدفعة المقدمة" : "Down Payment"}</p>
            <p className={`${numClass} text-lg text-[#0A1128]`}>{formatNum(downPaymentAmount)}</p>
          </div>
          <div className="p-4 bg-white border border-stone-200 rounded-xl text-center">
            <p className="text-xs text-[#0A1128]/60 font-body mb-1">{isArabic ? "العائد السنوي" : "Gross Yield"}</p>
            <p className={`${numClass} text-lg text-[#0A1128]`}>{grossYield}%</p>
          </div>
          <div className="p-4 bg-white border border-stone-200 rounded-xl text-center">
            <p className="text-xs text-[#0A1128]/60 font-body mb-1">{isArabic ? "القيمة بعد 5 سنوات" : "5-Year Value"}</p>
            <p className={`${numClass} text-lg text-[#0A1128]`}>{formatNum(fiveYearValue)}</p>
          </div>
          <div className="p-4 bg-[#0A1128] rounded-xl text-center">
            <p className="text-xs text-white/60 font-body mb-1">{isArabic ? "العائد الإجمالي" : "Total ROI"}</p>
            <div className="flex items-center justify-center gap-1.5">
              <TrendingUp size={16} className="text-[#c89c3c]" />
              <p className={`${numClass} text-lg text-[#c89c3c]`}>{roi}%</p>
            </div>
          </div>
        </div>
        <p className="text-[10px] text-[#0A1128]/40 font-body mt-4 text-center leading-relaxed">
          {isArabic
            ? "* هذه تقديرات تقريبية لأغراض إرشادية فقط. العوائد الفعلية قد تختلف."
            : "* These are approximate estimates for illustrative purposes only. Actual returns may vary."}
        </p>
      </div>
    </div>
  );
};

export default ROICalculator;