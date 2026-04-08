import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, X, Layers, ShoppingBag, Stethoscope,
  Briefcase, Building2, Coffee
} from "lucide-react";
import floorPlanImg from "@/assets/solaria-floorplans.png";

/* ─── Unit data per floor ─── */

type UnitType = "Retail" | "Medical" | "Administrative" | "Corporate" | "F&B" | "Showroom" | "Service";
type UnitStatus = "Available" | "Reserved" | "Sold";

interface FloorUnit {
  id: string;
  number: string;
  area: string;
  type: UnitType;
  status: UnitStatus;
  /** SVG rect position as percentage of floor panel */
  x: number;
  y: number;
  w: number;
  h: number;
}

interface FloorData {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  /** Which 1/5 slice of the composite image (0–4) */
  sliceIndex: number;
  units: FloorUnit[];
}

const typeIcons: Record<UnitType, typeof ShoppingBag> = {
  Retail: ShoppingBag,
  Showroom: ShoppingBag,
  Medical: Stethoscope,
  Administrative: Briefcase,
  Corporate: Building2,
  "F&B": Coffee,
  Service: Briefcase,
};

const statusColors: Record<UnitStatus, string> = {
  Available: "hsl(152 60% 42%)",
  Reserved: "hsl(38 85% 55%)",
  Sold: "hsl(0 0% 60%)",
};

const floorsData: FloorData[] = [
  {
    id: "gf", label: "Ground Floor", shortLabel: "GF", sliceIndex: 0,
    description: "Prime retail frontage with direct street access and maximum visibility.",
    units: [
      { id: "gf-01", number: "G-01", area: "86 m²", type: "Retail", status: "Available", x: 15, y: 28, w: 18, h: 14 },
      { id: "gf-02", number: "G-02", area: "64 m²", type: "Retail", status: "Available", x: 35, y: 28, w: 14, h: 14 },
      { id: "gf-03", number: "G-03", area: "120 m²", type: "Showroom", status: "Reserved", x: 52, y: 25, w: 20, h: 16 },
      { id: "gf-04", number: "G-04", area: "45 m²", type: "Retail", status: "Available", x: 15, y: 46, w: 14, h: 12 },
      { id: "gf-05", number: "G-05", area: "72 m²", type: "Retail", status: "Available", x: 32, y: 46, w: 16, h: 12 },
      { id: "gf-06", number: "G-06", area: "95 m²", type: "Showroom", status: "Available", x: 52, y: 45, w: 18, h: 13 },
      { id: "gf-07", number: "G-07", area: "55 m²", type: "Retail", status: "Sold", x: 15, y: 62, w: 14, h: 11 },
      { id: "gf-08", number: "G-08", area: "68 m²", type: "Service", status: "Available", x: 32, y: 62, w: 16, h: 11 },
      { id: "gf-09", number: "G-09", area: "180 m²", type: "Retail", status: "Available", x: 52, y: 62, w: 22, h: 14 },
      { id: "gf-10", number: "G-10", area: "48 m²", type: "Retail", status: "Available", x: 76, y: 35, w: 12, h: 12 },
      { id: "gf-11", number: "G-11", area: "52 m²", type: "Retail", status: "Reserved", x: 76, y: 50, w: 12, h: 11 },
      { id: "gf-12", number: "G-12", area: "60 m²", type: "Retail", status: "Available", x: 76, y: 64, w: 12, h: 12 },
    ],
  },
  {
    id: "1f", label: "First Floor", shortLabel: "1F", sliceIndex: 1,
    description: "Versatile commercial spaces suited for clinics, offices, and service businesses.",
    units: [
      { id: "1f-01", number: "1-01", area: "42 m²", type: "Medical", status: "Available", x: 14, y: 26, w: 16, h: 13 },
      { id: "1f-02", number: "1-02", area: "38 m²", type: "Medical", status: "Available", x: 33, y: 26, w: 14, h: 13 },
      { id: "1f-03", number: "1-03", area: "56 m²", type: "Administrative", status: "Reserved", x: 50, y: 24, w: 18, h: 14 },
      { id: "1f-04", number: "1-04", area: "30 m²", type: "Medical", status: "Available", x: 14, y: 43, w: 12, h: 11 },
      { id: "1f-05", number: "1-05", area: "45 m²", type: "Medical", status: "Available", x: 29, y: 43, w: 14, h: 11 },
      { id: "1f-06", number: "1-06", area: "68 m²", type: "Administrative", status: "Available", x: 46, y: 42, w: 18, h: 12 },
      { id: "1f-07", number: "1-07", area: "35 m²", type: "Medical", status: "Sold", x: 14, y: 58, w: 12, h: 11 },
      { id: "1f-08", number: "1-08", area: "50 m²", type: "Administrative", status: "Available", x: 29, y: 58, w: 15, h: 11 },
      { id: "1f-09", number: "1-09", area: "90 m²", type: "Administrative", status: "Available", x: 48, y: 58, w: 20, h: 13 },
      { id: "1f-10", number: "1-10", area: "44 m²", type: "Medical", status: "Available", x: 72, y: 30, w: 14, h: 12 },
      { id: "1f-11", number: "1-11", area: "52 m²", type: "Administrative", status: "Available", x: 72, y: 45, w: 14, h: 11 },
      { id: "1f-12", number: "1-12", area: "48 m²", type: "Medical", status: "Available", x: 72, y: 59, w: 14, h: 11 },
      { id: "1f-13", number: "1-13", area: "36 m²", type: "Medical", status: "Reserved", x: 14, y: 72, w: 12, h: 10 },
      { id: "1f-14", number: "1-14", area: "120 m²", type: "Administrative", status: "Available", x: 30, y: 72, w: 22, h: 12 },
    ],
  },
  {
    id: "2f", label: "Second Floor", shortLabel: "2F", sliceIndex: 2,
    description: "Dedicated medical and administrative zone with quiet, professional atmosphere.",
    units: [
      { id: "2f-01", number: "2-01", area: "36 m²", type: "Medical", status: "Available", x: 14, y: 25, w: 14, h: 12 },
      { id: "2f-02", number: "2-02", area: "30 m²", type: "Medical", status: "Available", x: 31, y: 25, w: 12, h: 12 },
      { id: "2f-03", number: "2-03", area: "48 m²", type: "Medical", status: "Available", x: 46, y: 23, w: 16, h: 13 },
      { id: "2f-04", number: "2-04", area: "42 m²", type: "Administrative", status: "Reserved", x: 65, y: 25, w: 14, h: 12 },
      { id: "2f-05", number: "2-05", area: "34 m²", type: "Medical", status: "Available", x: 14, y: 41, w: 12, h: 11 },
      { id: "2f-06", number: "2-06", area: "38 m²", type: "Medical", status: "Available", x: 29, y: 41, w: 13, h: 11 },
      { id: "2f-07", number: "2-07", area: "56 m²", type: "Administrative", status: "Available", x: 45, y: 40, w: 16, h: 12 },
      { id: "2f-08", number: "2-08", area: "44 m²", type: "Medical", status: "Sold", x: 64, y: 41, w: 14, h: 11 },
      { id: "2f-09", number: "2-09", area: "30 m²", type: "Medical", status: "Available", x: 14, y: 56, w: 12, h: 10 },
      { id: "2f-10", number: "2-10", area: "32 m²", type: "Medical", status: "Available", x: 29, y: 56, w: 12, h: 10 },
      { id: "2f-11", number: "2-11", area: "62 m²", type: "Administrative", status: "Available", x: 44, y: 55, w: 17, h: 11 },
      { id: "2f-12", number: "2-12", area: "40 m²", type: "Medical", status: "Available", x: 64, y: 55, w: 14, h: 11 },
      { id: "2f-13", number: "2-13", area: "50 m²", type: "Medical", status: "Reserved", x: 14, y: 70, w: 14, h: 10 },
      { id: "2f-14", number: "2-14", area: "96 m²", type: "Administrative", status: "Available", x: 32, y: 69, w: 22, h: 12 },
      { id: "2f-15", number: "2-15", area: "38 m²", type: "Medical", status: "Available", x: 58, y: 70, w: 13, h: 10 },
      { id: "2f-16", number: "2-16", area: "46 m²", type: "Medical", status: "Available", x: 74, y: 55, w: 12, h: 10 },
    ],
  },
  {
    id: "3f", label: "Third Floor", shortLabel: "3F", sliceIndex: 3,
    description: "Upper-level administrative suites with panoramic views for corporate tenants.",
    units: [
      { id: "3f-01", number: "3-01", area: "80 m²", type: "Administrative", status: "Available", x: 14, y: 26, w: 18, h: 14 },
      { id: "3f-02", number: "3-02", area: "65 m²", type: "Administrative", status: "Available", x: 35, y: 26, w: 16, h: 14 },
      { id: "3f-03", number: "3-03", area: "120 m²", type: "Corporate", status: "Reserved", x: 54, y: 24, w: 22, h: 16 },
      { id: "3f-04", number: "3-04", area: "50 m²", type: "Administrative", status: "Available", x: 14, y: 44, w: 14, h: 12 },
      { id: "3f-05", number: "3-05", area: "72 m²", type: "Administrative", status: "Available", x: 32, y: 44, w: 16, h: 12 },
      { id: "3f-06", number: "3-06", area: "396 m²", type: "Corporate", status: "Available", x: 52, y: 44, w: 28, h: 20 },
      { id: "3f-07", number: "3-07", area: "58 m²", type: "Administrative", status: "Available", x: 14, y: 60, w: 14, h: 11 },
      { id: "3f-08", number: "3-08", area: "90 m²", type: "Administrative", status: "Sold", x: 32, y: 60, w: 18, h: 11 },
      { id: "3f-09", number: "3-09", area: "110 m²", type: "Corporate", status: "Available", x: 14, y: 74, w: 22, h: 12 },
      { id: "3f-10", number: "3-10", area: "75 m²", type: "Administrative", status: "Available", x: 40, y: 74, w: 16, h: 12 },
    ],
  },
  {
    id: "rf", label: "Roof Floor", shortLabel: "RF", sliceIndex: 4,
    description: "Exclusive rooftop spaces with open-air potential for restaurants and lounges.",
    units: [
      { id: "rf-01", number: "R-01", area: "200 m²", type: "F&B", status: "Available", x: 16, y: 24, w: 28, h: 20 },
      { id: "rf-02", number: "R-02", area: "150 m²", type: "F&B", status: "Available", x: 48, y: 24, w: 24, h: 18 },
      { id: "rf-03", number: "R-03", area: "80 m²", type: "F&B", status: "Reserved", x: 16, y: 50, w: 20, h: 16 },
      { id: "rf-04", number: "R-04", area: "120 m²", type: "F&B", status: "Available", x: 40, y: 48, w: 22, h: 18 },
    ],
  },
];

const InteractiveFloorPlan = () => {
  const [activeFloor, setActiveFloor] = useState("gf");
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<FloorUnit | null>(null);

  const currentFloor = floorsData.find((f) => f.id === activeFloor)!;

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: "hsl(var(--steel) / 0.4)" }} />
            <p className="text-[10px] font-body font-semibold tracking-[0.3em] uppercase" style={{ color: "hsl(var(--steel))" }}>
              Floor by Floor
            </p>
            <div className="w-8 h-px" style={{ background: "hsl(var(--steel) / 0.4)" }} />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-[1.1]" style={{ letterSpacing: "-0.02em" }}>
            Navigate Every Level
          </h2>
          <p className="text-muted-foreground font-body text-[14px] mt-4 max-w-lg mx-auto leading-relaxed">
            Hover over any unit to preview details. Click to explore availability and inquire.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Floor selector */}
          <div className="lg:col-span-2">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {floorsData.map((floor) => (
                <button
                  key={floor.id}
                  onClick={() => {
                    setActiveFloor(floor.id);
                    setSelectedUnit(null);
                  }}
                  className="flex-shrink-0 group relative px-4 py-3.5 rounded-xl text-left transition-all duration-500"
                  style={{
                    background: activeFloor === floor.id ? "hsl(var(--navy))" : "transparent",
                    border: `1px solid ${activeFloor === floor.id ? "hsl(var(--navy))" : "hsl(var(--border) / 0.5)"}`,
                  }}
                >
                  <p
                    className="font-body text-[10px] font-semibold tracking-[0.15em] uppercase"
                    style={{
                      color: activeFloor === floor.id
                        ? "hsl(var(--primary-foreground) / 0.5)"
                        : "hsl(var(--steel))",
                    }}
                  >
                    {floor.shortLabel}
                  </p>
                  <p
                    className="font-display text-[13px] font-bold mt-0.5"
                    style={{
                      color: activeFloor === floor.id
                        ? "hsl(var(--primary-foreground))"
                        : "hsl(var(--foreground))",
                    }}
                  >
                    {floor.label}
                  </p>
                  <p
                    className="text-[10px] font-body mt-0.5"
                    style={{
                      color: activeFloor === floor.id
                        ? "hsl(var(--primary-foreground) / 0.4)"
                        : "hsl(var(--steel) / 0.7)",
                    }}
                  >
                    {floor.units.length} units
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive floor plan */}
          <div className={`${selectedUnit ? "lg:col-span-6" : "lg:col-span-10"} transition-all duration-500`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFloor.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl overflow-hidden"
                style={{
                  boxShadow: "var(--shadow-lg)",
                  background: "hsl(var(--ivory))",
                }}
              >
                {/* Floor plan image — clips to the correct 1/5 slice */}
                <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={floorPlanImg}
                      alt={`${currentFloor.label} plan — Solaria Mall`}
                      className="absolute h-full object-cover"
                      style={{
                        width: "500%",
                        left: `${-currentFloor.sliceIndex * 100}%`,
                      }}
                    />
                  </div>

                  {/* SVG overlay for interactive units */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    {currentFloor.units.map((unit) => {
                      const isHovered = hoveredUnit === unit.id;
                      const isSelected = selectedUnit?.id === unit.id;
                      const fillColor =
                        unit.status === "Sold"
                          ? "rgba(150,150,150,0.12)"
                          : unit.status === "Reserved"
                            ? "rgba(210,170,60,0.10)"
                            : "rgba(30,60,120,0.06)";
                      const hoverFill =
                        unit.status === "Sold"
                          ? "rgba(150,150,150,0.25)"
                          : unit.status === "Reserved"
                            ? "rgba(210,170,60,0.22)"
                            : "rgba(30,60,120,0.18)";

                      return (
                        <rect
                          key={unit.id}
                          x={unit.x}
                          y={unit.y}
                          width={unit.w}
                          height={unit.h}
                          rx="1"
                          fill={isHovered || isSelected ? hoverFill : fillColor}
                          stroke={
                            isSelected
                              ? "hsl(232,78%,10%)"
                              : isHovered
                                ? "rgba(30,60,120,0.35)"
                                : "rgba(30,60,120,0.08)"
                          }
                          strokeWidth={isSelected ? "0.5" : "0.25"}
                          className="cursor-pointer transition-all"
                          style={{
                            filter: isHovered ? "drop-shadow(0 0 6px rgba(30,60,120,0.15))" : "none",
                            transition: "fill 0.3s, stroke 0.3s, filter 0.3s",
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

                      // Position tooltip near the unit
                      const tooltipLeft = unit.x + unit.w / 2;
                      const tooltipTop = unit.y;

                      return (
                        <motion.div
                          key={unit.id}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.2 }}
                          className="absolute z-30 pointer-events-none"
                          style={{
                            left: `${Math.min(Math.max(tooltipLeft, 15), 85)}%`,
                            top: `${Math.max(tooltipTop - 2, 2)}%`,
                            transform: "translate(-50%, -100%)",
                          }}
                        >
                          <div
                            className="rounded-lg px-4 py-3 min-w-[160px]"
                            style={{
                              background: "hsl(var(--ivory) / 0.95)",
                              backdropFilter: "blur(16px)",
                              boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                              border: "1px solid hsl(var(--border) / 0.3)",
                            }}
                          >
                            <div className="flex items-center gap-2 mb-1.5">
                              <Icon size={12} style={{ color: "hsl(var(--navy))" }} />
                              <span className="font-display text-[12px] font-bold text-foreground">
                                {unit.number}
                              </span>
                            </div>
                            <div className="space-y-0.5">
                              <div className="flex justify-between gap-4">
                                <span className="text-[10px] font-body text-muted-foreground">Area</span>
                                <span className="text-[10px] font-body font-semibold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>{unit.area}</span>
                              </div>
                              <div className="flex justify-between gap-4">
                                <span className="text-[10px] font-body text-muted-foreground">Type</span>
                                <span className="text-[10px] font-body font-semibold text-foreground">{unit.type}</span>
                              </div>
                              <div className="flex justify-between gap-4">
                                <span className="text-[10px] font-body text-muted-foreground">Status</span>
                                <span className="text-[10px] font-body font-semibold flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[unit.status] }} />
                                  <span style={{ color: statusColors[unit.status] }}>{unit.status}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 py-3 px-4" style={{ borderTop: "1px solid hsl(var(--border) / 0.2)" }}>
                  {(["Available", "Reserved", "Sold"] as UnitStatus[]).map((status) => (
                    <div key={status} className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ background: statusColors[status] }} />
                      <span className="text-[10px] font-body text-muted-foreground tracking-wide">{status}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Side detail panel */}
          <AnimatePresence>
            {selectedUnit && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-4"
              >
                <div
                  className="rounded-2xl p-6 md:p-8 h-full"
                  style={{
                    background: "hsl(var(--ivory) / 0.6)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid hsl(var(--border) / 0.3)",
                    boxShadow: "var(--shadow-lg)",
                  }}
                >
                  {/* Close */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Layers size={14} style={{ color: "hsl(var(--steel))" }} />
                        <p className="text-[9px] font-body font-semibold tracking-[0.25em] uppercase" style={{ color: "hsl(var(--steel))" }}>
                          {currentFloor.shortLabel} · Unit Details
                        </p>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground">
                        Unit {selectedUnit.number}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedUnit(null)}
                      className="p-1.5 rounded-lg transition-colors hover:bg-muted"
                    >
                      <X size={16} className="text-muted-foreground" />
                    </button>
                  </div>

                  {/* Status badge */}
                  <div className="mb-6">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-body font-semibold tracking-wide uppercase"
                      style={{
                        background: `${statusColors[selectedUnit.status]}15`,
                        color: statusColors[selectedUnit.status],
                        border: `1px solid ${statusColors[selectedUnit.status]}30`,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[selectedUnit.status] }} />
                      {selectedUnit.status}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-4 mb-8">
                    {[
                      { label: "Unit Number", value: selectedUnit.number },
                      { label: "Area", value: selectedUnit.area },
                      { label: "Type", value: selectedUnit.type },
                      { label: "Floor", value: currentFloor.label },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between pb-3"
                        style={{ borderBottom: "1px solid hsl(var(--border) / 0.3)" }}
                      >
                        <span className="text-[11px] font-body tracking-[0.05em] text-muted-foreground uppercase">
                          {item.label}
                        </span>
                        <span className="font-body text-[13px] font-semibold text-foreground">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground font-body text-[13px] leading-[1.8] mb-8">
                    {currentFloor.description}
                  </p>

                  {/* CTAs */}
                  <div className="space-y-3">
                    <Link
                      to="/contact"
                      className="btn-premium w-full justify-center px-6 py-3 text-[11px] font-body tracking-[0.12em] uppercase"
                    >
                      Inquire About This Unit
                      <ArrowRight size={13} />
                    </Link>
                    <Link
                      to="/available-units"
                      className="btn-outline-dark w-full justify-center px-6 py-3 text-[11px] font-body tracking-[0.12em] uppercase rounded-lg"
                    >
                      View All Units
                      <ArrowRight size={13} />
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
