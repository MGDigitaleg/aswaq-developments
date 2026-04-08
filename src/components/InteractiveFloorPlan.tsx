import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, X, Layers, ShoppingBag, Stethoscope,
  Briefcase, Building2, Coffee
} from "lucide-react";
import floorPlanImg from "@/assets/solaria-floorplans.png";

/* ─── Types ─── */

type UnitType = "Retail" | "Medical" | "Administrative" | "Corporate" | "F&B" | "Showroom" | "Service";
type UnitStatus = "Available" | "Reserved" | "Sold";

interface FloorUnit {
  id: string;
  number: string;
  area: string;
  type: UnitType;
  status: UnitStatus;
  /** SVG polygon points as percentage coords "x1,y1 x2,y2 ..." */
  points: string;
  /** Center position for tooltip anchoring */
  cx: number;
  cy: number;
}

interface FloorData {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  unitCount: number;
  sliceIndex: number;
  units: FloorUnit[];
}

const typeIcons: Record<UnitType, typeof ShoppingBag> = {
  Retail: ShoppingBag, Showroom: ShoppingBag, Medical: Stethoscope,
  Administrative: Briefcase, Corporate: Building2, "F&B": Coffee, Service: Briefcase,
};

const statusColors: Record<UnitStatus, string> = {
  Available: "hsl(152 55% 40%)",
  Reserved: "hsl(38 75% 50%)",
  Sold: "hsl(0 0% 58%)",
};

/* ─── Floor Data with polygon-mapped units ─── */
/* Coordinates are % within each floor's visible plan area.
   The building has a roughly triangular footprint — apex top-left, widening toward bottom-right.
   Units are positioned to match the architectural plan layout. */

const floorsData: FloorData[] = [
  {
    id: "gf", label: "Ground Floor", shortLabel: "GF", sliceIndex: 0, unitCount: 12,
    description: "Prime retail frontage with direct street access, high footfall, and maximum commercial visibility.",
    units: [
      // Top row — small retail units along the upper-left edge
      { id: "gf-01", number: "G-01", area: "42 m²", type: "Retail", status: "Available", points: "12,22 22,18 28,22 28,30 12,30", cx: 20, cy: 25 },
      { id: "gf-02", number: "G-02", area: "38 m²", type: "Retail", status: "Available", points: "28,18 38,15 44,20 44,30 28,30 28,22", cx: 36, cy: 24 },
      { id: "gf-03", number: "G-03", area: "55 m²", type: "Retail", status: "Reserved", points: "44,15 58,12 58,30 44,30 44,20", cx: 51, cy: 22 },
      // Middle-left cluster — green retail units
      { id: "gf-04", number: "G-04", area: "86 m²", type: "Retail", status: "Available", points: "8,30 22,30 22,44 8,44", cx: 15, cy: 37 },
      { id: "gf-05", number: "G-05", area: "64 m²", type: "Retail", status: "Available", points: "22,30 36,30 36,44 22,44", cx: 29, cy: 37 },
      { id: "gf-06", number: "G-06", area: "72 m²", type: "Showroom", status: "Available", points: "36,30 52,30 52,44 36,44", cx: 44, cy: 37 },
      // Center corridor area units
      { id: "gf-07", number: "G-07", area: "120 m²", type: "Showroom", status: "Available", points: "52,22 68,22 68,44 52,44 52,30", cx: 60, cy: 34 },
      // Bottom-left units
      { id: "gf-08", number: "G-08", area: "45 m²", type: "Retail", status: "Sold", points: "5,44 18,44 18,56 5,56", cx: 12, cy: 50 },
      { id: "gf-09", number: "G-09", area: "68 m²", type: "Retail", status: "Available", points: "18,44 34,44 34,56 18,56", cx: 26, cy: 50 },
      { id: "gf-10", number: "G-10", area: "95 m²", type: "Service", status: "Available", points: "34,44 52,44 52,60 34,60", cx: 43, cy: 52 },
      // Right side — large retail / showroom
      { id: "gf-11", number: "G-11", area: "180 m²", type: "Retail", status: "Available", points: "68,22 82,22 82,50 68,50", cx: 75, cy: 36 },
      { id: "gf-12", number: "G-12", area: "48 m²", type: "Retail", status: "Reserved", points: "52,50 68,50 68,64 52,64", cx: 60, cy: 57 },
    ],
  },
  {
    id: "1f", label: "First Floor", shortLabel: "1F", sliceIndex: 1, unitCount: 14,
    description: "Versatile commercial and medical spaces with dedicated access, suited for clinics and professional offices.",
    units: [
      { id: "1f-01", number: "1-01", area: "42 m²", type: "Medical", status: "Available", points: "14,20 26,17 26,30 14,30", cx: 20, cy: 24 },
      { id: "1f-02", number: "1-02", area: "38 m²", type: "Medical", status: "Available", points: "26,17 38,14 44,18 44,30 26,30", cx: 35, cy: 23 },
      { id: "1f-03", number: "1-03", area: "56 m²", type: "Administrative", status: "Reserved", points: "44,14 58,12 58,30 44,30", cx: 51, cy: 22 },
      { id: "1f-04", number: "1-04", area: "30 m²", type: "Medical", status: "Available", points: "10,30 22,30 22,42 10,42", cx: 16, cy: 36 },
      { id: "1f-05", number: "1-05", area: "45 m²", type: "Medical", status: "Available", points: "22,30 36,30 36,42 22,42", cx: 29, cy: 36 },
      { id: "1f-06", number: "1-06", area: "68 m²", type: "Administrative", status: "Available", points: "36,30 52,30 52,42 36,42", cx: 44, cy: 36 },
      { id: "1f-07", number: "1-07", area: "35 m²", type: "Medical", status: "Sold", points: "52,24 66,24 66,42 52,42", cx: 59, cy: 33 },
      { id: "1f-08", number: "1-08", area: "50 m²", type: "Administrative", status: "Available", points: "7,42 20,42 20,54 7,54", cx: 14, cy: 48 },
      { id: "1f-09", number: "1-09", area: "90 m²", type: "Administrative", status: "Available", points: "20,42 38,42 38,56 20,56", cx: 29, cy: 49 },
      { id: "1f-10", number: "1-10", area: "44 m²", type: "Medical", status: "Available", points: "38,42 52,42 52,56 38,56", cx: 45, cy: 49 },
      { id: "1f-11", number: "1-11", area: "52 m²", type: "Administrative", status: "Available", points: "52,42 66,42 66,56 52,56", cx: 59, cy: 49 },
      { id: "1f-12", number: "1-12", area: "48 m²", type: "Medical", status: "Available", points: "66,28 80,28 80,44 66,44", cx: 73, cy: 36 },
      { id: "1f-13", number: "1-13", area: "36 m²", type: "Medical", status: "Reserved", points: "5,54 18,54 18,64 5,64", cx: 12, cy: 59 },
      { id: "1f-14", number: "1-14", area: "120 m²", type: "Administrative", status: "Available", points: "18,54 42,54 42,66 18,66", cx: 30, cy: 60 },
    ],
  },
  {
    id: "2f", label: "Second Floor", shortLabel: "2F", sliceIndex: 2, unitCount: 16,
    description: "Dedicated medical and administrative zone with quiet, professional atmosphere and natural light.",
    units: [
      { id: "2f-01", number: "2-01", area: "36 m²", type: "Medical", status: "Available", points: "14,20 26,17 26,30 14,30", cx: 20, cy: 24 },
      { id: "2f-02", number: "2-02", area: "30 m²", type: "Medical", status: "Available", points: "26,17 38,15 38,30 26,30", cx: 32, cy: 23 },
      { id: "2f-03", number: "2-03", area: "48 m²", type: "Medical", status: "Available", points: "38,14 54,12 54,30 38,30", cx: 46, cy: 22 },
      { id: "2f-04", number: "2-04", area: "42 m²", type: "Administrative", status: "Reserved", points: "54,12 68,14 68,30 54,30", cx: 61, cy: 22 },
      { id: "2f-05", number: "2-05", area: "34 m²", type: "Medical", status: "Available", points: "10,30 22,30 22,42 10,42", cx: 16, cy: 36 },
      { id: "2f-06", number: "2-06", area: "38 m²", type: "Medical", status: "Available", points: "22,30 36,30 36,42 22,42", cx: 29, cy: 36 },
      { id: "2f-07", number: "2-07", area: "56 m²", type: "Administrative", status: "Available", points: "36,30 52,30 52,42 36,42", cx: 44, cy: 36 },
      { id: "2f-08", number: "2-08", area: "44 m²", type: "Medical", status: "Sold", points: "52,24 66,24 66,42 52,42", cx: 59, cy: 33 },
      { id: "2f-09", number: "2-09", area: "30 m²", type: "Medical", status: "Available", points: "7,42 20,42 20,52 7,52", cx: 14, cy: 47 },
      { id: "2f-10", number: "2-10", area: "32 m²", type: "Medical", status: "Available", points: "20,42 34,42 34,52 20,52", cx: 27, cy: 47 },
      { id: "2f-11", number: "2-11", area: "62 m²", type: "Administrative", status: "Available", points: "34,42 52,42 52,54 34,54", cx: 43, cy: 48 },
      { id: "2f-12", number: "2-12", area: "40 m²", type: "Medical", status: "Available", points: "52,42 66,42 66,54 52,54", cx: 59, cy: 48 },
      { id: "2f-13", number: "2-13", area: "50 m²", type: "Medical", status: "Reserved", points: "5,52 20,52 20,64 5,64", cx: 13, cy: 58 },
      { id: "2f-14", number: "2-14", area: "96 m²", type: "Administrative", status: "Available", points: "20,52 42,52 42,66 20,66", cx: 31, cy: 59 },
      { id: "2f-15", number: "2-15", area: "38 m²", type: "Medical", status: "Available", points: "42,52 58,52 58,64 42,64", cx: 50, cy: 58 },
      { id: "2f-16", number: "2-16", area: "46 m²", type: "Medical", status: "Available", points: "66,30 80,30 80,44 66,44", cx: 73, cy: 37 },
    ],
  },
  {
    id: "3f", label: "Third Floor", shortLabel: "3F", sliceIndex: 3, unitCount: 10,
    description: "Upper-level administrative suites with panoramic views, premium finishes, and corporate-grade infrastructure.",
    units: [
      { id: "3f-01", number: "3-01", area: "80 m²", type: "Administrative", status: "Available", points: "14,20 30,16 30,34 14,34", cx: 22, cy: 26 },
      { id: "3f-02", number: "3-02", area: "65 m²", type: "Administrative", status: "Available", points: "30,16 46,13 46,34 30,34", cx: 38, cy: 24 },
      { id: "3f-03", number: "3-03", area: "120 m²", type: "Corporate", status: "Reserved", points: "46,13 66,16 66,34 46,34", cx: 56, cy: 24 },
      { id: "3f-04", number: "3-04", area: "50 m²", type: "Administrative", status: "Available", points: "10,34 24,34 24,48 10,48", cx: 17, cy: 41 },
      { id: "3f-05", number: "3-05", area: "72 m²", type: "Administrative", status: "Available", points: "24,34 42,34 42,48 24,48", cx: 33, cy: 41 },
      { id: "3f-06", number: "3-06", area: "396 m²", type: "Corporate", status: "Available", points: "42,34 72,34 72,58 42,58", cx: 57, cy: 46 },
      { id: "3f-07", number: "3-07", area: "58 m²", type: "Administrative", status: "Available", points: "7,48 22,48 22,60 7,60", cx: 15, cy: 54 },
      { id: "3f-08", number: "3-08", area: "90 m²", type: "Administrative", status: "Sold", points: "22,48 42,48 42,62 22,62", cx: 32, cy: 55 },
      { id: "3f-09", number: "3-09", area: "110 m²", type: "Corporate", status: "Available", points: "5,60 28,60 28,72 5,72", cx: 17, cy: 66 },
      { id: "3f-10", number: "3-10", area: "75 m²", type: "Administrative", status: "Available", points: "28,60 48,60 48,72 28,72", cx: 38, cy: 66 },
    ],
  },
  {
    id: "rf", label: "Roof Floor", shortLabel: "RF", sliceIndex: 4, unitCount: 4,
    description: "Exclusive rooftop spaces with open-air potential — ideal for restaurants, lounges, and premium F&B concepts.",
    units: [
      { id: "rf-01", number: "R-01", area: "200 m²", type: "F&B", status: "Available", points: "16,18 44,14 44,38 16,38", cx: 30, cy: 26 },
      { id: "rf-02", number: "R-02", area: "150 m²", type: "F&B", status: "Available", points: "44,14 72,18 72,38 44,38", cx: 58, cy: 26 },
      { id: "rf-03", number: "R-03", area: "80 m²", type: "F&B", status: "Reserved", points: "12,38 36,38 36,56 12,56", cx: 24, cy: 47 },
      { id: "rf-04", number: "R-04", area: "120 m²", type: "F&B", status: "Available", points: "36,38 66,38 66,58 36,58", cx: 51, cy: 48 },
    ],
  },
];

/* ─── Component ─── */

const InteractiveFloorPlan = () => {
  const [activeFloor, setActiveFloor] = useState("gf");
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<FloorUnit | null>(null);

  const currentFloor = floorsData.find((f) => f.id === activeFloor)!;

  return (
    <section className="py-20 md:py-28" style={{ background: "hsl(var(--ivory))" }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
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
            <p className="text-[10px] font-body font-semibold tracking-[0.3em] uppercase" style={{ color: "hsl(var(--steel))" }}>
              Floor by Floor
            </p>
            <div className="w-8 h-px" style={{ background: "hsl(var(--steel) / 0.35)" }} />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-[1.1]" style={{ letterSpacing: "-0.02em" }}>
            Navigate Every Level
          </h2>
          <p className="text-muted-foreground font-body text-[13px] mt-3 max-w-md mx-auto leading-relaxed">
            Explore units across five levels. Hover to preview — click to inquire.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* ── Floor Selector ── */}
          <div className="lg:col-span-2">
            <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {floorsData.map((floor) => {
                const isActive = activeFloor === floor.id;
                return (
                  <button
                    key={floor.id}
                    onClick={() => { setActiveFloor(floor.id); setSelectedUnit(null); }}
                    className="flex-shrink-0 relative px-3.5 py-2.5 rounded-lg text-left transition-all duration-400"
                    style={{
                      background: isActive ? "hsl(var(--navy))" : "transparent",
                      border: `1px solid ${isActive ? "transparent" : "hsl(var(--border) / 0.3)"}`,
                    }}
                  >
                    <div className="flex items-baseline gap-2">
                      <span
                        className="font-display text-[13px] font-bold"
                        style={{ color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))" }}
                      >
                        {floor.shortLabel}
                      </span>
                      <span
                        className="hidden lg:inline text-[11px] font-body"
                        style={{ color: isActive ? "hsl(var(--primary-foreground) / 0.55)" : "hsl(var(--steel))" }}
                      >
                        {floor.label}
                      </span>
                    </div>
                    <p
                      className="text-[9px] font-body mt-0.5 tracking-wide"
                      style={{ color: isActive ? "hsl(var(--primary-foreground) / 0.35)" : "hsl(var(--steel) / 0.6)" }}
                    >
                      {floor.unitCount} units
                    </p>
                    {isActive && (
                      <motion.div
                        layoutId="floor-indicator"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: "hsl(var(--navy))", zIndex: -1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="hidden lg:flex flex-col gap-2 mt-6 pt-5" style={{ borderTop: "1px solid hsl(var(--border) / 0.2)" }}>
              {(["Available", "Reserved", "Sold"] as UnitStatus[]).map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: statusColors[s] }} />
                  <span className="text-[10px] font-body text-muted-foreground">{s}</span>
                </div>
              ))}
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
                transition={{ duration: 0.4 }}
                className="relative rounded-xl overflow-hidden"
                style={{
                  background: "#f5f3ef",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.06)",
                  border: "1px solid hsl(var(--border) / 0.15)",
                }}
              >
                {/* Floor plan image — full bleed, clipped to correct slice */}
                <div className="relative w-full" style={{ paddingBottom: "130%" }}>
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={floorPlanImg}
                      alt={`${currentFloor.label} — Solaria Mall`}
                      className="absolute h-full object-cover"
                      style={{
                        width: "500%",
                        left: `${-currentFloor.sliceIndex * 100}%`,
                        top: 0,
                      }}
                    />
                  </div>

                  {/* SVG overlay with polygon units */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 80"
                    preserveAspectRatio="xMidYMid meet"
                    style={{ pointerEvents: "none" }}
                  >
                    {currentFloor.units.map((unit) => {
                      const isHovered = hoveredUnit === unit.id;
                      const isSelected = selectedUnit?.id === unit.id;
                      const isActive = isHovered || isSelected;

                      const baseFill = unit.status === "Sold"
                        ? "rgba(140,140,140,0.08)"
                        : unit.status === "Reserved"
                          ? "rgba(200,165,50,0.06)"
                          : "rgba(25,50,100,0.04)";

                      const activeFill = unit.status === "Sold"
                        ? "rgba(140,140,140,0.22)"
                        : unit.status === "Reserved"
                          ? "rgba(200,165,50,0.18)"
                          : "rgba(25,50,100,0.14)";

                      const activeStroke = unit.status === "Sold"
                        ? "rgba(140,140,140,0.5)"
                        : unit.status === "Reserved"
                          ? "rgba(200,165,50,0.5)"
                          : "rgba(25,50,100,0.4)";

                      return (
                        <polygon
                          key={unit.id}
                          points={unit.points}
                          fill={isActive ? activeFill : baseFill}
                          stroke={isActive ? activeStroke : "rgba(25,50,100,0.05)"}
                          strokeWidth={isSelected ? "0.4" : "0.2"}
                          style={{
                            cursor: "pointer",
                            pointerEvents: "all",
                            transition: "fill 0.35s ease, stroke 0.35s ease",
                            filter: isHovered ? "drop-shadow(0 0 4px rgba(25,50,100,0.12))" : "none",
                          }}
                          onMouseEnter={() => setHoveredUnit(unit.id)}
                          onMouseLeave={() => setHoveredUnit(null)}
                          onClick={() => setSelectedUnit(unit)}
                        />
                      );
                    })}
                  </svg>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredUnit && !selectedUnit && (() => {
                      const unit = currentFloor.units.find((u) => u.id === hoveredUnit);
                      if (!unit) return null;
                      const Icon = typeIcons[unit.type];

                      return (
                        <motion.div
                          key={unit.id}
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 3 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-30 pointer-events-none"
                          style={{
                            left: `${Math.min(Math.max(unit.cx, 12), 88)}%`,
                            top: `${Math.max((unit.cy / 80) * 100 - 3, 2)}%`,
                            transform: "translate(-50%, -100%)",
                          }}
                        >
                          <div
                            className="rounded-md px-3 py-2"
                            style={{
                              background: "rgba(255,253,248,0.92)",
                              backdropFilter: "blur(12px)",
                              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                              border: "1px solid rgba(0,0,0,0.06)",
                              minWidth: "130px",
                            }}
                          >
                            <div className="flex items-center gap-1.5 mb-1">
                              <Icon size={10} style={{ color: "hsl(var(--navy))" }} />
                              <span className="font-display text-[11px] font-bold text-foreground">
                                {unit.number}
                              </span>
                              <span className="ml-auto flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[unit.status] }} />
                                <span className="text-[8px] font-body" style={{ color: statusColors[unit.status] }}>{unit.status}</span>
                              </span>
                            </div>
                            <div className="flex gap-3 text-[9px] font-body text-muted-foreground">
                              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>{unit.area}</span>
                              <span>·</span>
                              <span>{unit.type}</span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                </div>

                {/* Mobile legend */}
                <div className="flex lg:hidden items-center justify-center gap-5 py-2.5" style={{ borderTop: "1px solid hsl(var(--border) / 0.15)" }}>
                  {(["Available", "Reserved", "Sold"] as UnitStatus[]).map((s) => (
                    <div key={s} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[s] }} />
                      <span className="text-[9px] font-body text-muted-foreground">{s}</span>
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
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-4"
              >
                <div
                  className="rounded-xl p-5 md:p-6 h-full"
                  style={{
                    background: "rgba(255,253,248,0.7)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid hsl(var(--border) / 0.2)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 8px 28px rgba(0,0,0,0.06)",
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="text-[9px] font-body font-semibold tracking-[0.2em] uppercase mb-1.5" style={{ color: "hsl(var(--steel))" }}>
                        {currentFloor.shortLabel} · Unit Detail
                      </p>
                      <h3 className="font-display text-xl font-bold text-foreground">
                        Unit {selectedUnit.number}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedUnit(null)}
                      className="p-1 rounded-md transition-colors hover:bg-muted/50"
                    >
                      <X size={14} className="text-muted-foreground" />
                    </button>
                  </div>

                  {/* Status */}
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-body font-semibold tracking-wider uppercase mb-5"
                    style={{
                      background: `${statusColors[selectedUnit.status]}12`,
                      color: statusColors[selectedUnit.status],
                      border: `1px solid ${statusColors[selectedUnit.status]}25`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[selectedUnit.status] }} />
                    {selectedUnit.status}
                  </span>

                  {/* Details grid */}
                  <div className="space-y-0 mb-6">
                    {[
                      { label: "Unit", value: selectedUnit.number },
                      { label: "Area", value: selectedUnit.area },
                      { label: "Type", value: selectedUnit.type },
                      { label: "Floor", value: currentFloor.label },
                    ].map((item, i) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between py-3"
                        style={{ borderBottom: i < 3 ? "1px solid hsl(var(--border) / 0.15)" : "none" }}
                      >
                        <span className="text-[10px] font-body tracking-[0.08em] text-muted-foreground uppercase">
                          {item.label}
                        </span>
                        <span
                          className="text-[12px] font-semibold text-foreground"
                          style={{ fontFamily: item.label === "Area" ? "'Montserrat', sans-serif" : "inherit" }}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground font-body text-[12px] leading-[1.7] mb-6" style={{ color: "hsl(var(--steel))" }}>
                    {currentFloor.description}
                  </p>

                  {/* CTAs */}
                  <div className="space-y-2.5">
                    <Link
                      to="/contact"
                      className="btn-premium w-full justify-center px-5 py-2.5 text-[10px] font-body tracking-[0.14em] uppercase"
                    >
                      Inquire About This Unit
                      <ArrowRight size={12} />
                    </Link>
                    <Link
                      to="/available-units"
                      className="btn-outline-dark w-full justify-center px-5 py-2.5 text-[10px] font-body tracking-[0.14em] uppercase rounded-lg"
                    >
                      View All Units
                      <ArrowRight size={12} />
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
