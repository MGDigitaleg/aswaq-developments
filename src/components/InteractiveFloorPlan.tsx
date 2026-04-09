import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, X, ShoppingBag, Stethoscope,
  Briefcase, Building2, Coffee, ZoomIn, ZoomOut, Maximize2,
  Filter, RotateCcw,
} from "lucide-react";
import {
  floorsData, floorLabelsAr, statusColors, statusFills,
  type FloorUnit, type UnitType, type UnitStatus,
} from "@/data/floorPlanData";

/* ─── Constants ─── */
const typeIcons: Record<UnitType, typeof ShoppingBag> = {
  Retail: ShoppingBag, Medical: Stethoscope,
  Administrative: Briefcase, "F&B": Coffee, Service: Building2,
};

/* ─── i18n ─── */
const allTypes: UnitType[] = ["Retail", "Medical", "Administrative", "F&B", "Service"];
const allStatuses: UnitStatus[] = ["Available", "Reserved", "Sold"];

const i18n = {
  en: {
    tag: "Floor by Floor", title: "Navigate Every Level",
    desc: "Explore units across five levels. Hover to preview — click to inquire.",
    units: "units", availability: "Availability", view: "View",
    unitDetail: "Unit Detail", unit: "Unit", area: "Area", type: "Type", floor: "Floor",
    inquire: "Inquire About This Unit", viewAll: "View All Units",
    contactLink: "/contact", unitsLink: "/available-units",
    Available: "Available", Reserved: "Reserved", Sold: "Sold",
    filterLabel: "Filter", resetFilters: "Reset",
    allTypes: "All Types", allStatuses: "All Statuses",
    miniMap: "Overview",
    types: { Retail: "Retail", Medical: "Medical", Administrative: "Admin", "F&B": "F&B", Service: "Service" } as Record<UnitType, string>,
  },
  ar: {
    tag: "طابق بطابق", title: "استكشف كل مستوى",
    desc: "تصفّح الوحدات عبر خمسة طوابق. مرر للمعاينة — انقر للاستفسار.",
    units: "وحدة", availability: "الإتاحة", view: "العرض",
    unitDetail: "تفاصيل الوحدة", unit: "الوحدة", area: "المساحة", type: "النوع", floor: "الطابق",
    inquire: "استفسر عن هذه الوحدة", viewAll: "عرض جميع الوحدات",
    contactLink: "/ar/contact", unitsLink: "/ar/available-units",
    Available: "متاح", Reserved: "محجوز", Sold: "مباع",
    filterLabel: "تصفية", resetFilters: "إعادة",
    allTypes: "كل الأنواع", allStatuses: "كل الحالات",
    miniMap: "نظرة عامة",
    types: { Retail: "تجاري", Medical: "طبي", Administrative: "إداري", "F&B": "مأكولات", Service: "خدمي" } as Record<UnitType, string>,
  },
};

/* ─── Component ─── */
interface InteractiveFloorPlanProps {
  lang?: "en" | "ar";
}

const InteractiveFloorPlan = ({ lang = "en" }: InteractiveFloorPlanProps) => {
  const t = i18n[lang];
  const isRtl = lang === "ar";
  const [activeFloor, setActiveFloor] = useState("gf");
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<FloorUnit | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [filterType, setFilterType] = useState<UnitType | null>(null);
  const [filterStatus, setFilterStatus] = useState<UnitStatus | null>(null);
  const panStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const currentFloor = floorsData.find((f) => f.id === activeFloor)!;
  const arFloor = isRtl ? floorLabelsAr[currentFloor.id] : null;
  const floorLabel = arFloor?.label || currentFloor.label;
  const floorShort = arFloor?.shortLabel || currentFloor.shortLabel;
  const floorDesc = arFloor?.description || currentFloor.description;

  const resetView = useCallback(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => Math.min(3, Math.max(1, z - e.deltaY * 0.002)));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsPanning(true);
    panStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  }, [zoom, pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    setPan({ x: panStart.current.panX + dx, y: panStart.current.panY + dy });
  }, [isPanning]);

  const handleMouseUp = useCallback(() => setIsPanning(false), []);

  useEffect(() => {
    resetView();
    setSelectedUnit(null);
    setHoveredUnit(null);
  }, [activeFloor, resetView]);

  // Filter logic
  const unitMatches = useCallback((u: FloorUnit) => {
    if (filterType && u.type !== filterType) return false;
    if (filterStatus && u.status !== filterStatus) return false;
    return true;
  }, [filterType, filterStatus]);

  const hasFilters = filterType !== null || filterStatus !== null;
  const matchCount = currentFloor.units.filter(unitMatches).length;

  // Stats
  const available = currentFloor.units.filter((u) => u.status === "Available").length;
  const reserved = currentFloor.units.filter((u) => u.status === "Reserved").length;
  const sold = currentFloor.units.filter((u) => u.status === "Sold").length;

  return (
    <section className="py-20 md:py-28" style={{ background: "hsl(var(--ivory))" }} dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "hsl(var(--steel) / 0.35)" }} />
            <p className={`text-[10px] font-semibold tracking-[0.3em] uppercase ${isRtl ? "font-arabic" : "font-body"}`} style={{ color: "hsl(var(--steel))" }}>
              {t.tag}
            </p>
            <div className="w-8 h-px" style={{ background: "hsl(var(--steel) / 0.35)" }} />
          </div>
          <h2 className={`font-display text-3xl md:text-4xl font-bold text-foreground leading-[1.1] ${isRtl ? "font-arabic" : ""}`} style={{ letterSpacing: isRtl ? "0" : "-0.02em" }}>
            {t.title}
          </h2>
          <p className={`text-muted-foreground text-[13px] mt-3 max-w-md mx-auto leading-relaxed ${isRtl ? "font-arabic" : "font-body"}`}>
            {t.desc}
          </p>
        </motion.div>

        {/* ── Filter Toolbar ── */}
        <div
          className="flex flex-wrap items-center gap-2 mb-4 px-1"
        >
          <div className="flex items-center gap-1.5 mr-1">
            <Filter size={11} style={{ color: "hsl(var(--steel) / 0.5)" }} />
            <span className={`text-[9px] font-semibold tracking-[0.15em] uppercase ${isRtl ? "font-arabic" : "font-body"}`} style={{ color: "hsl(var(--steel) / 0.6)" }}>
              {t.filterLabel}
            </span>
          </div>

          {/* Type filters */}
          <button
            onClick={() => setFilterType(null)}
            className={`px-2.5 py-1 rounded-md text-[9px] font-semibold tracking-wide transition-all duration-200 ${isRtl ? "font-arabic" : "font-body"}`}
            style={{
              background: filterType === null ? "hsl(var(--navy))" : "transparent",
              color: filterType === null ? "hsl(var(--primary-foreground))" : "hsl(var(--steel))",
              border: `1px solid ${filterType === null ? "transparent" : "hsl(var(--border) / 0.25)"}`,
            }}
          >
            {t.allTypes}
          </button>
          {allTypes.map((type) => {
            const Icon = typeIcons[type];
            const isActive = filterType === type;
            const count = currentFloor.units.filter((u) => u.type === type).length;
            if (count === 0) return null;
            return (
              <button
                key={type}
                onClick={() => setFilterType(isActive ? null : type)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[9px] font-semibold tracking-wide transition-all duration-200 ${isRtl ? "font-arabic" : "font-body"}`}
                style={{
                  background: isActive ? "hsl(var(--navy))" : "transparent",
                  color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--steel))",
                  border: `1px solid ${isActive ? "transparent" : "hsl(var(--border) / 0.25)"}`,
                }}
              >
                <Icon size={9} />
                {t.types[type]}
                <span style={{ opacity: 0.5 }}>({count})</span>
              </button>
            );
          })}

          <div className="w-px h-4 mx-1" style={{ background: "hsl(var(--border) / 0.2)" }} />

          {/* Status filters */}
          <button
            onClick={() => setFilterStatus(null)}
            className={`px-2.5 py-1 rounded-md text-[9px] font-semibold tracking-wide transition-all duration-200 ${isRtl ? "font-arabic" : "font-body"}`}
            style={{
              background: filterStatus === null ? "hsl(var(--navy))" : "transparent",
              color: filterStatus === null ? "hsl(var(--primary-foreground))" : "hsl(var(--steel))",
              border: `1px solid ${filterStatus === null ? "transparent" : "hsl(var(--border) / 0.25)"}`,
            }}
          >
            {t.allStatuses}
          </button>
          {allStatuses.map((status) => {
            const isActive = filterStatus === status;
            const count = currentFloor.units.filter((u) => u.status === status).length;
            if (count === 0) return null;
            return (
              <button
                key={status}
                onClick={() => setFilterStatus(isActive ? null : status)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-semibold tracking-wide transition-all duration-200 ${isRtl ? "font-arabic" : "font-body"}`}
                style={{
                  background: isActive ? "hsl(var(--navy))" : "transparent",
                  color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--steel))",
                  border: `1px solid ${isActive ? "transparent" : "hsl(var(--border) / 0.25)"}`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[status], opacity: isActive ? 1 : 0.7 }} />
                {t[status]}
                <span style={{ opacity: 0.5 }}>({count})</span>
              </button>
            );
          })}

          {hasFilters && (
            <>
              <div className="w-px h-4 mx-1" style={{ background: "hsl(var(--border) / 0.2)" }} />
              <button
                onClick={() => { setFilterType(null); setFilterStatus(null); }}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-semibold transition-all duration-200 hover:bg-muted/40 ${isRtl ? "font-arabic" : "font-body"}`}
                style={{ color: "hsl(var(--steel) / 0.7)" }}
              >
                <RotateCcw size={8} />
                {t.resetFilters}
              </button>
              <span className={`text-[9px] ${isRtl ? "font-arabic" : "font-body"}`} style={{ color: "hsl(var(--steel) / 0.5)", fontFamily: "'Montserrat', sans-serif" }}>
                {matchCount}/{currentFloor.units.length}
              </span>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          {/* ── Floor Selector ── */}
          <div className="lg:col-span-2">
            <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {floorsData.map((floor) => {
                const isActive = activeFloor === floor.id;
                return (
                  <button
                    key={floor.id}
                    onClick={() => setActiveFloor(floor.id)}
                    className={`flex-shrink-0 relative px-3 py-2 rounded-lg ${isRtl ? "text-right" : "text-left"} transition-all duration-300`}
                    style={{
                      background: isActive ? "hsl(var(--navy))" : "transparent",
                      border: `1px solid ${isActive ? "transparent" : "hsl(var(--border) / 0.2)"}`,
                    }}
                  >
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-[12px] font-bold ${isRtl ? "font-arabic" : "font-display"}`}
                        style={{ color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))" }}
                      >
                        {isRtl ? (floorLabelsAr[floor.id]?.shortLabel || floor.shortLabel) : floor.shortLabel}
                      </span>
                      <span
                        className={`hidden lg:inline text-[10px] ${isRtl ? "font-arabic" : "font-body"}`}
                        style={{ color: isActive ? "hsl(var(--primary-foreground) / 0.6)" : "hsl(var(--steel))" }}
                      >
                        {isRtl ? (floorLabelsAr[floor.id]?.label || floor.label) : floor.label}
                      </span>
                    </div>
                    <p
                      className={`text-[8px] mt-0.5 tracking-wide ${isRtl ? "font-arabic" : "font-body"}`}
                      style={{ color: isActive ? "hsl(var(--primary-foreground) / 0.4)" : "hsl(var(--steel) / 0.5)" }}
                    >
                      {floor.units.length} {t.units}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="hidden lg:flex flex-col gap-2 mt-5 pt-4" style={{ borderTop: "1px solid hsl(var(--border) / 0.15)" }}>
              <p className={`text-[8px] font-semibold tracking-[0.2em] uppercase mb-1 ${isRtl ? "font-arabic" : "font-body"}`} style={{ color: "hsl(var(--steel) / 0.6)" }}>
                {t.availability}
              </p>
              {([
                ["Available", available],
                ["Reserved", reserved],
                ["Sold", sold],
              ] as [UnitStatus, number][]).map(([s, count]) => (
                <div key={s} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: statusColors[s], opacity: 0.8 }} />
                  <span className={`text-[10px] text-muted-foreground flex-1 ${isRtl ? "font-arabic" : "font-body"}`}>{t[s]}</span>
                  <span className="text-[10px] font-body" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: "hsl(var(--steel))" }}>
                    {count}
                  </span>
                </div>
              ))}
            </div>

            {/* Zoom controls */}
            <div className="hidden lg:flex flex-col gap-1 mt-4 pt-4" style={{ borderTop: "1px solid hsl(var(--border) / 0.15)" }}>
              <p className={`text-[8px] font-semibold tracking-[0.2em] uppercase mb-1 ${isRtl ? "font-arabic" : "font-body"}`} style={{ color: "hsl(var(--steel) / 0.6)" }}>
                {t.view}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => setZoom((z) => Math.min(3, z + 0.3))}
                  className="flex items-center justify-center w-7 h-7 rounded-md transition-colors hover:bg-muted/60"
                  style={{ border: "1px solid hsl(var(--border) / 0.2)" }}
                >
                  <ZoomIn size={12} className="text-muted-foreground" />
                </button>
                <button
                  onClick={() => setZoom((z) => Math.max(1, z - 0.3))}
                  className="flex items-center justify-center w-7 h-7 rounded-md transition-colors hover:bg-muted/60"
                  style={{ border: "1px solid hsl(var(--border) / 0.2)" }}
                >
                  <ZoomOut size={12} className="text-muted-foreground" />
                </button>
                <button
                  onClick={resetView}
                  className="flex items-center justify-center w-7 h-7 rounded-md transition-colors hover:bg-muted/60"
                  style={{ border: "1px solid hsl(var(--border) / 0.2)" }}
                >
                  <Maximize2 size={12} className="text-muted-foreground" />
                </button>
              </div>
              {zoom > 1 && (
                <p className="text-[9px] font-body text-muted-foreground mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {Math.round(zoom * 100)}%
                </p>
              )}
            </div>

            {/* ── Mini-Map Overview ── */}
            <div className="hidden lg:block mt-4 pt-4" style={{ borderTop: "1px solid hsl(var(--border) / 0.15)" }}>
              <p className={`text-[8px] font-semibold tracking-[0.2em] uppercase mb-2 ${isRtl ? "font-arabic" : "font-body"}`} style={{ color: "hsl(var(--steel) / 0.6)" }}>
                {t.miniMap}
              </p>
              <div className="flex flex-col gap-1.5">
                {floorsData.map((floor) => {
                  const isActive = activeFloor === floor.id;
                  const floorAvail = floor.units.filter((u) => u.status === "Available").length;
                  const floorReserved = floor.units.filter((u) => u.status === "Reserved").length;
                  const floorSold = floor.units.filter((u) => u.status === "Sold").length;
                  const total = floor.units.length;
                  const availPct = total ? (floorAvail / total) * 100 : 0;
                  const reservedPct = total ? (floorReserved / total) * 100 : 0;
                  const soldPct = total ? (floorSold / total) * 100 : 0;

                  return (
                    <button
                      key={floor.id}
                      onClick={() => setActiveFloor(floor.id)}
                      className="group relative rounded-md overflow-hidden transition-all duration-250"
                      style={{
                        background: isActive ? "hsl(var(--navy) / 0.06)" : "transparent",
                        border: `1px solid ${isActive ? "hsl(var(--navy) / 0.15)" : "hsl(var(--border) / 0.1)"}`,
                        padding: "5px 6px",
                      }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`text-[8px] font-bold ${isRtl ? "font-arabic" : "font-display"}`}
                          style={{ color: isActive ? "hsl(var(--navy))" : "hsl(var(--foreground) / 0.7)" }}
                        >
                          {isRtl ? (floorLabelsAr[floor.id]?.shortLabel || floor.shortLabel) : floor.shortLabel}
                        </span>
                        <span
                          className="text-[7px] font-body"
                          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: "hsl(var(--steel) / 0.5)" }}
                        >
                          {total}
                        </span>
                      </div>
                      {/* Density bar */}
                      <div
                        className="flex w-full rounded-full overflow-hidden"
                        style={{ height: 3, background: "hsl(var(--border) / 0.1)" }}
                      >
                        <div
                          className="transition-all duration-500"
                          style={{ width: `${availPct}%`, background: statusColors.Available, opacity: 0.8 }}
                        />
                        <div
                          className="transition-all duration-500"
                          style={{ width: `${reservedPct}%`, background: statusColors.Reserved, opacity: 0.8 }}
                        />
                        <div
                          className="transition-all duration-500"
                          style={{ width: `${soldPct}%`, background: statusColors.Sold, opacity: 0.8 }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Interactive Plan ── */}
          <div className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${selectedUnit ? "lg:col-span-6" : "lg:col-span-10"}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFloor.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative rounded-xl overflow-hidden select-none"
                style={{
                  background: "#f7f5f1",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.06)",
                  border: "1px solid hsl(var(--border) / 0.12)",
                  cursor: zoom > 1 ? (isPanning ? "grabbing" : "grab") : "default",
                }}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div
                  className="relative w-full transition-transform duration-200 ease-out"
                  style={{
                    transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                    transformOrigin: "center center",
                  }}
                >
                  {/* Floor plan image */}
                  <img
                    src={currentFloor.image}
                    alt={`${currentFloor.label} — Solaria Mall`}
                    className="w-full h-auto block"
                    draggable={false}
                  />

                  {/* SVG overlay — viewBox matches native image pixels */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox={`0 0 ${currentFloor.viewBoxW} ${currentFloor.viewBoxH}`}
                    preserveAspectRatio="xMidYMid meet"
                    style={{ pointerEvents: "none" }}
                  >
                    {/* Defs for glow filter + breathing animation */}
                    <defs>
                      <filter id="unitGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <style>{`
                      @keyframes unitBreathe {
                        0%, 100% { fill-opacity: 0.12; }
                        50% { fill-opacity: 0.28; }
                      }
                      .unit-breathe { animation: unitBreathe 3s cubic-bezier(0.4,0,0.6,1) infinite; }
                    `}</style>

                    {currentFloor.units.map((unit, unitIndex) => {
                      const matches = unitMatches(unit);
                      const isDimmed = hasFilters && !matches;
                      const isHovered = hoveredUnit === unit.id;
                      const isSelected = selectedUnit?.id === unit.id;
                      const isActive = isHovered || isSelected;
                      const fills = statusFills[unit.status];

                      const unitCount = currentFloor.units.length;
                      const base = Math.min(currentFloor.viewBoxW, currentFloor.viewBoxH);
                      const numSize = unitCount <= 5 ? base * 0.022 : unitCount <= 35 ? base * 0.014 : base * 0.009;
                      const areaSize = numSize * 0.7;
                      const gap = numSize * 0.6;
                      const labelScale = isActive && !isDimmed ? 1.25 : 1;

                      if (isDimmed) {
                        // Dimmed: render only a faint gray outline, no fill, no label
                        return (
                          <g key={unit.id}>
                            <polygon
                              points={unit.points}
                              fill="transparent"
                              stroke="hsl(222, 10%, 75%)"
                              strokeWidth={0.4}
                              strokeLinejoin="round"
                              strokeOpacity={0.3}
                              style={{ pointerEvents: "none" }}
                            />
                          </g>
                        );
                      }

                      return (
                        <g key={unit.id}>
                          {/* Outer glow stroke for active state */}
                          {isActive && (
                            <polygon
                              points={unit.points}
                              fill="none"
                              stroke={fills.stroke}
                              strokeWidth={5}
                              strokeLinejoin="round"
                              strokeOpacity={0.25}
                              filter="url(#unitGlow)"
                              style={{ pointerEvents: "none" }}
                            />
                          )}

                          {/* Main polygon */}
                          <polygon
                            points={unit.points}
                            fill={isActive ? fills.hover : fills.base}
                            stroke={isActive ? fills.stroke : "hsl(222, 47%, 15%)"}
                            strokeWidth={isSelected ? 3.5 : isHovered ? 2.5 : 0.5}
                            strokeLinejoin="round"
                            strokeOpacity={isActive ? 1 : 0.08}
                            className={!isActive && unit.status === "Available" ? "unit-breathe" : undefined}
                            style={{
                              cursor: "pointer",
                              pointerEvents: "all",
                              transition: "fill 0.3s ease, stroke 0.3s ease, stroke-width 0.3s ease, stroke-opacity 0.3s ease",
                              ...(!isActive && unit.status === "Available" ? { animation: `unitBreathe 3s cubic-bezier(0.4,0,0.6,1) infinite ${(unitIndex * 0.4) % 3}s` } : {}),
                            }}
                            onMouseEnter={() => setHoveredUnit(unit.id)}
                            onMouseLeave={() => setHoveredUnit(null)}
                            onClick={(e) => { e.stopPropagation(); setSelectedUnit(unit); }}
                          />

                          {/* Unit label — clickable */}
                          <g
                            style={{
                              pointerEvents: "all",
                              cursor: "pointer",
                              transform: `translate(${unit.cx}px, ${unit.cy}px) scale(${labelScale})`,
                              transformOrigin: `${unit.cx}px ${unit.cy}px`,
                              transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease",
                            }}
                            opacity={isActive ? 1 : 0.65}
                            onMouseEnter={() => setHoveredUnit(unit.id)}
                            onMouseLeave={() => setHoveredUnit(null)}
                            onClick={(e) => { e.stopPropagation(); setSelectedUnit(unit); }}
                          >
                            <text
                              x={unit.cx}
                              y={unit.cy}
                              textAnchor="middle"
                              fill={isActive ? "hsl(222, 47%, 11%)" : "hsl(222, 47%, 18%)"}
                            >
                              <tspan x={unit.cx} dy={-gap / 2} fontSize={numSize} fontWeight={isActive ? 800 : 700} fontFamily="'Montserrat', sans-serif">
                                {unit.number}
                              </tspan>
                              <tspan x={unit.cx} dy={gap} fontSize={areaSize} fontWeight={500} fontFamily="'Montserrat', sans-serif" fillOpacity={isActive ? 0.9 : 0.7}>
                                {unit.area}
                              </tspan>
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredUnit && (() => {
                      const unit = currentFloor.units.find((u) => u.id === hoveredUnit);
                      if (!unit) return null;
                      const Icon = typeIcons[unit.type];
                      // Convert pixel coords to percentage for tooltip positioning
                      const tipX = Math.min(Math.max(
                        (unit.cx / currentFloor.viewBoxW) * 100, 8
                      ), 92);
                      const tipY = (unit.cy / currentFloor.viewBoxH) * 100;
                      // Offset above the unit label; scale offset inversely with zoom so it doesn't drift
                      const yOffset = 28 / zoom;

                      return (
                        <motion.div
                          key={unit.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.12 }}
                          className="absolute z-30 pointer-events-none"
                          style={{
                            left: `${tipX}%`,
                            top: `calc(${tipY}% - ${yOffset}px)`,
                            transform: "translate(-50%, -100%)",
                          }}
                        >
                          <div
                            className="rounded-md px-2.5 py-1.5"
                            style={{
                              background: "rgba(255,253,248,0.94)",
                              backdropFilter: "blur(14px)",
                              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                              border: "1px solid rgba(0,0,0,0.05)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <div className="flex items-center gap-1.5">
                              <Icon size={9} style={{ color: "hsl(var(--navy))" }} />
                              <span className={`text-[10px] font-bold text-foreground ${isRtl ? "font-arabic" : "font-display"}`}>
                                {t.unit} {unit.number}
                              </span>
                              <span className={`w-1.5 h-1.5 rounded-full ${isRtl ? "mr-1" : "ml-1"}`} style={{ background: statusColors[unit.status] }} />
                            </div>
                            <div className={`flex gap-2 text-[8px] text-muted-foreground mt-0.5 ${isRtl ? "font-arabic" : "font-body"}`}>
                              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>{unit.area}</span>
                              <span>·</span>
                              <span>{t.types[unit.type]}</span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                </div>

                {/* Mobile legend */}
                <div className="flex lg:hidden items-center justify-center gap-4 py-2" style={{ borderTop: "1px solid hsl(var(--border) / 0.12)" }}>
                  {(["Available", "Reserved", "Sold"] as UnitStatus[]).map((s) => (
                    <div key={s} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[s] }} />
                      <span className={`text-[8px] text-muted-foreground ${isRtl ? "font-arabic" : "font-body"}`}>{t[s]}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Side Detail Panel ── */}
          <AnimatePresence>
            {selectedUnit && (
              <motion.div
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? -20 : 20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-4"
              >
                <div
                  className="rounded-xl p-5 h-full"
                  style={{
                    background: "rgba(255,253,248,0.75)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid hsl(var(--border) / 0.15)",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.02), 0 6px 24px rgba(0,0,0,0.05)",
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className={`text-[8px] font-semibold tracking-[0.2em] uppercase mb-1 ${isRtl ? "font-arabic" : "font-body"}`} style={{ color: "hsl(var(--steel) / 0.6)" }}>
                        {floorShort} · {t.unitDetail}
                      </p>
                      <h3 className={`text-lg font-bold text-foreground ${isRtl ? "font-arabic" : "font-display"}`}>
                        {t.unit} {selectedUnit.number}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedUnit(null)}
                      className="p-1 rounded-md transition-colors hover:bg-muted/50"
                    >
                      <X size={13} className="text-muted-foreground" />
                    </button>
                  </div>

                  {/* Status badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8px] font-semibold tracking-wider uppercase mb-4 ${isRtl ? "font-arabic" : "font-body"}`}
                    style={{
                      background: `${statusColors[selectedUnit.status]}10`,
                      color: statusColors[selectedUnit.status],
                      border: `1px solid ${statusColors[selectedUnit.status]}20`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[selectedUnit.status] }} />
                    {t[selectedUnit.status]}
                  </span>

                  {/* Details */}
                  <div className="space-y-0 mb-5">
                    {[
                      { label: t.unit, value: selectedUnit.number },
                      { label: t.area, value: selectedUnit.area },
                      { label: t.type, value: t.types[selectedUnit.type] },
                      { label: t.floor, value: floorLabel },
                    ].map((item, i) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between py-2.5"
                        style={{ borderBottom: i < 3 ? "1px solid hsl(var(--border) / 0.1)" : "none" }}
                      >
                        <span className={`text-[9px] tracking-[0.08em] text-muted-foreground uppercase ${isRtl ? "font-arabic" : "font-body"}`}>
                          {item.label}
                        </span>
                        <span
                          className="text-[11px] font-semibold text-foreground"
                          style={{ fontFamily: item.label === t.area ? "'Montserrat', sans-serif" : "inherit" }}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Floor description */}
                  <p className={`text-[11px] leading-[1.7] mb-5 ${isRtl ? "font-arabic" : "font-body"}`} style={{ color: "hsl(var(--steel))" }}>
                    {floorDesc}
                  </p>

                  {/* CTAs */}
                  <div className="space-y-2">
                    <Link
                      to={t.contactLink}
                      className={`btn-premium w-full justify-center px-4 py-2 text-[9px] tracking-[0.14em] uppercase ${isRtl ? "font-arabic" : "font-body"}`}
                    >
                      {t.inquire}
                      <ArrowRight size={11} className={isRtl ? "rotate-180" : ""} />
                    </Link>
                    <Link
                      to={t.unitsLink}
                      className={`btn-outline-dark w-full justify-center px-4 py-2 text-[9px] tracking-[0.14em] uppercase rounded-lg ${isRtl ? "font-arabic" : "font-body"}`}
                    >
                      {t.viewAll}
                      <ArrowRight size={11} className={isRtl ? "rotate-180" : ""} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default InteractiveFloorPlan;
