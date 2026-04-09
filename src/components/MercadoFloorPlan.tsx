import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, ZoomIn, ZoomOut, Maximize2, Minimize2,
  Layers, X,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  mercadoFloors,
  type MercadoFloorUnit,
} from "@/data/mercadoFloorPlanData";

/* ─── i18n ─── */
const i18n = {
  en: {
    tag: "Floor by Floor",
    title: "Mercado Mall Floor Plans",
    desc: "Explore each level of Mercado Mall through an interactive floor-by-floor plan experience.",
    units: "units",
    unitDetail: "Unit Detail",
    unit: "Unit",
    area: "Area",
    type: "Type",
    floor: "Floor",
    inquire: "Inquire About This Unit",
    viewAll: "View Available Units",
    contactLink: "/contact",
    unitsLink: "/available-units",
    Available: "Available",
    Reserved: "Reserved",
    Sold: "Sold",
    fullscreen: "Fullscreen",
    exitFullscreen: "Exit",
    comingSoon: "Interactive unit selection coming soon",
    requestDetails: "Request Unit Details",
  },
  ar: {
    tag: "طابق بطابق",
    title: "مخططات ميركادو مول",
    desc: "استكشف كل مستوى من ميركادو مول من خلال تجربة تفاعلية طابق بطابق.",
    units: "وحدة",
    unitDetail: "تفاصيل الوحدة",
    unit: "الوحدة",
    area: "المساحة",
    type: "النوع",
    floor: "الطابق",
    inquire: "استفسر عن هذه الوحدة",
    viewAll: "عرض الوحدات المتاحة",
    contactLink: "/ar/contact",
    unitsLink: "/ar/available-units",
    Available: "متاح",
    Reserved: "محجوز",
    Sold: "مباع",
    fullscreen: "شاشة كاملة",
    exitFullscreen: "خروج",
    comingSoon: "تحديد الوحدات التفاعلي قريباً",
    requestDetails: "طلب تفاصيل الوحدة",
  },
};

/* ─── Component ─── */
interface MercadoFloorPlanProps {
  lang?: "en" | "ar";
}

const MIN_ZOOM = 0.8;
const MAX_ZOOM = 4;

const MercadoFloorPlan = ({ lang = "en" }: MercadoFloorPlanProps) => {
  const t = i18n[lang];
  const isRtl = lang === "ar";
  const isMobile = useIsMobile();

  const [activeFloor, setActiveFloor] = useState("gf");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<MercadoFloorUnit | null>(null);
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);

  const panStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const touchRef = useRef({ dist: 0, zoom: 1 });
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const currentFloor = mercadoFloors.find((f) => f.id === activeFloor)!;
  const floorLabel = isRtl ? currentFloor.labelAr : currentFloor.label;
  const floorShort = isRtl ? currentFloor.shortLabelAr : currentFloor.shortLabel;
  const floorDesc = isRtl ? currentFloor.descriptionAr : currentFloor.description;
  const hasUnits = currentFloor.units.length > 0;

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  /* ── Floor switching ── */
  const switchFloor = useCallback((floorId: string) => {
    if (floorId === activeFloor) return;
    setActiveFloor(floorId);
    resetView();
    setSelectedUnit(null);
    setHoveredUnit(null);
  }, [activeFloor, resetView]);

  /* ── Fullscreen ── */
  const toggleFullscreen = useCallback(() => {
    if (!sectionRef.current) return;
    if (!document.fullscreenElement) {
      sectionRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  /* ── Wheel zoom (cursor-centered) ── */
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const rect = viewportRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    setZoom((prev) => {
      const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev - e.deltaY * 0.002));
      const scale = next / prev;
      setPan((p) => ({
        x: cx - scale * (cx - p.x),
        y: cy - scale * (cy - p.y),
      }));
      return next;
    });
  }, []);

  /* ── Mouse pan ── */
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsPanning(true);
    panStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({
      x: panStart.current.panX + (e.clientX - panStart.current.x),
      y: panStart.current.panY + (e.clientY - panStart.current.y),
    });
  }, [isPanning]);

  const handleMouseUp = useCallback(() => setIsPanning(false), []);

  /* ── Touch: pinch zoom + drag ── */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchRef.current = { dist: Math.hypot(dx, dy), zoom };
    } else if (e.touches.length === 1) {
      setIsPanning(true);
      panStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, panX: pan.x, panY: pan.y };
    }
  }, [zoom, pan]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const scale = dist / touchRef.current.dist;
      setZoom(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, touchRef.current.zoom * scale)));
    } else if (e.touches.length === 1 && isPanning) {
      setPan({
        x: panStart.current.panX + (e.touches[0].clientX - panStart.current.x),
        y: panStart.current.panY + (e.touches[0].clientY - panStart.current.y),
      });
    }
  }, [isPanning]);

  const handleTouchEnd = useCallback(() => setIsPanning(false), []);

  return (
    <section
      ref={sectionRef}
      className={`relative ${isFullscreen ? "" : "py-20 md:py-28"}`}
      style={{
        background: isFullscreen ? "#f5f2ed" : "hsl(var(--ivory))",
      }}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Header — hidden in fullscreen */}
      {!isFullscreen && (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "hsl(var(--steel) / 0.35)" }} />
              <p
                className={`text-[10px] font-semibold tracking-[0.3em] uppercase ${isRtl ? "font-arabic" : "font-body"}`}
                style={{ color: "hsl(var(--steel))" }}
              >
                {t.tag}
              </p>
              <div className="w-8 h-px" style={{ background: "hsl(var(--steel) / 0.35)" }} />
            </div>
            <h2
              className={`font-display text-3xl md:text-4xl font-bold text-foreground leading-[1.1] ${isRtl ? "font-arabic" : ""}`}
              style={{ letterSpacing: isRtl ? "0" : "-0.02em" }}
            >
              {t.title}
            </h2>
            <p className={`text-muted-foreground text-[13px] mt-3 max-w-lg mx-auto leading-relaxed ${isRtl ? "font-arabic" : "font-body"}`}>
              {t.desc}
            </p>
          </motion.div>
        </div>
      )}

      {/* ── Explorer Container ── */}
      <div className={`${isFullscreen ? "h-screen flex flex-col" : "max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6"}`}>
        {/* ── Top toolbar ── */}
        <div
          className={`flex flex-wrap items-center gap-2 ${isFullscreen ? "px-4 py-2.5 border-b" : "mb-3 px-1"}`}
          style={{
            background: isFullscreen ? "rgba(255,253,248,0.92)" : "transparent",
            backdropFilter: isFullscreen ? "blur(16px)" : undefined,
            borderColor: "hsl(var(--border) / 0.12)",
          }}
        >
          {/* Floor tabs */}
          <div className="flex items-center gap-0.5 p-0.5 rounded-lg" style={{ background: "hsl(var(--navy) / 0.04)" }}>
            {mercadoFloors.map((floor) => {
              const isActive = activeFloor === floor.id;
              return (
                <button
                  key={floor.id}
                  onClick={() => switchFloor(floor.id)}
                  className={`relative px-3 md:px-4 py-1.5 md:py-2 rounded-md text-[11px] md:text-[12px] font-bold transition-all duration-250 ${isRtl ? "font-arabic" : "font-display"}`}
                  style={{
                    background: isActive ? "hsl(var(--navy))" : "transparent",
                    color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--steel))",
                    boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.12)" : "none",
                  }}
                >
                  {isRtl ? floor.shortLabelAr : floor.shortLabel}
                  {!isMobile && (
                    <span className={`${isRtl ? "mr-1.5" : "ml-1.5"} text-[9px] font-normal opacity-50 hidden md:inline`}>
                      {isRtl ? floor.labelAr : floor.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Active floor label — desktop */}
          <div className="hidden md:flex items-center gap-2">
            <span className={`text-[11px] font-semibold ${isRtl ? "font-arabic" : "font-display"}`} style={{ color: "hsl(var(--foreground) / 0.7)" }}>
              {floorLabel}
            </span>
            <div className="w-px h-4" style={{ background: "hsl(var(--border) / 0.2)" }} />
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-0.5">
            {zoom > MIN_ZOOM + 0.05 && (
              <span className="text-[10px] font-body mr-1 hidden md:inline" style={{ fontFamily: "'Montserrat', sans-serif", color: "hsl(var(--steel) / 0.5)" }}>
                {Math.round(zoom * 100)}%
              </span>
            )}
            <button
              onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + 0.4))}
              className="flex items-center justify-center w-7 h-7 rounded-md transition-all duration-200 hover:bg-muted/60"
              style={{ border: "1px solid hsl(var(--border) / 0.15)" }}
            >
              <ZoomIn size={13} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => { setZoom((z) => Math.max(MIN_ZOOM, z - 0.4)); if (zoom <= 1.2) setPan({ x: 0, y: 0 }); }}
              className="flex items-center justify-center w-7 h-7 rounded-md transition-all duration-200 hover:bg-muted/60"
              style={{ border: "1px solid hsl(var(--border) / 0.15)" }}
            >
              <ZoomOut size={13} className="text-muted-foreground" />
            </button>
            <button
              onClick={resetView}
              className="flex items-center justify-center w-7 h-7 rounded-md transition-all duration-200 hover:bg-muted/60"
              style={{ border: "1px solid hsl(var(--border) / 0.15)" }}
            >
              <Maximize2 size={13} className="text-muted-foreground" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="hidden md:flex items-center justify-center w-7 h-7 rounded-md transition-all duration-200 hover:bg-muted/60"
              style={{ border: "1px solid hsl(var(--border) / 0.15)" }}
              title={isFullscreen ? t.exitFullscreen : t.fullscreen}
            >
              {isFullscreen
                ? <Minimize2 size={13} className="text-muted-foreground" />
                : <Layers size={13} className="text-muted-foreground" />
              }
            </button>
          </div>
        </div>

        {/* ── Map + Panel ── */}
        <div className={`flex gap-0 ${isFullscreen ? "flex-1 min-h-0" : ""}`}>
          {/* Map viewport */}
          <div
            className={`relative transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              selectedUnit && !isMobile ? "flex-[3]" : "flex-1"
            } ${isFullscreen ? "h-full" : ""}`}
          >
            <div
              ref={viewportRef}
              className={`relative overflow-hidden select-none ${isFullscreen ? "h-full" : "rounded-xl"}`}
              style={{
                background: "#f7f5f1",
                boxShadow: isFullscreen ? "none" : "0 1px 3px rgba(0,0,0,0.03), 0 8px 32px rgba(0,0,0,0.06)",
                border: isFullscreen ? "none" : "1px solid hsl(var(--border) / 0.1)",
                cursor: isPanning ? "grabbing" : "grab",
                minHeight: isFullscreen ? undefined : isMobile ? "50vh" : "65vh",
                touchAction: "none",
              }}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Transform container */}
              <motion.div
                className="relative w-full h-full"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transformOrigin: "0 0",
                  transition: isPanning ? "none" : "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                {/* Floor image with crossfade */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentFloor.id}
                    src={currentFloor.image}
                    alt={`${currentFloor.label} — Mercado Mall`}
                    className="w-full h-auto block"
                    draggable={false}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  />
                </AnimatePresence>

                {/* SVG hotspot overlay — ready for unit polygons */}
                {hasUnits && (
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox={`0 0 ${currentFloor.viewBoxW} ${currentFloor.viewBoxH}`}
                    preserveAspectRatio="xMidYMid meet"
                    style={{ pointerEvents: "none" }}
                  >
                    <defs>
                      <filter id="mercadoGlow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <style>{`
                      @keyframes mercadoBreathe {
                        0%, 100% { fill-opacity: 0.10; }
                        50% { fill-opacity: 0.24; }
                      }
                    `}</style>

                    {currentFloor.units.map((unit, idx) => {
                      const isHovered = hoveredUnit === unit.id;
                      const isSelected = selectedUnit?.id === unit.id;
                      const isActive = isHovered || isSelected;
                      const focusDimmed = selectedUnit && !isSelected && !isHovered;

                      return (
                        <g key={unit.id} style={{ opacity: focusDimmed ? 0.3 : 1, transition: "opacity 0.3s ease" }}>
                          {/* Glow on active */}
                          {isActive && (
                            <polygon
                              points={unit.points}
                              fill="none"
                              stroke="hsl(220, 30%, 50%)"
                              strokeWidth={isSelected ? 8 : 5}
                              strokeLinejoin="round"
                              strokeOpacity={0.2}
                              filter="url(#mercadoGlow)"
                              style={{ pointerEvents: "none" }}
                            />
                          )}

                          {/* Main polygon */}
                          <polygon
                            points={unit.points}
                            fill={isActive ? "rgba(220, 180, 100, 0.35)" : "rgba(220, 180, 100, 0.12)"}
                            stroke={isActive ? "hsl(220, 30%, 40%)" : "hsl(220, 15%, 60%)"}
                            strokeWidth={isSelected ? 3 : isHovered ? 2 : 0.5}
                            strokeLinejoin="round"
                            strokeOpacity={isActive ? 1 : 0.12}
                            style={{
                              cursor: "pointer",
                              pointerEvents: "all",
                              transition: "fill 0.25s ease, stroke 0.25s ease, stroke-width 0.25s ease",
                              ...(!isActive ? {
                                animation: `mercadoBreathe 3.5s cubic-bezier(0.4,0,0.6,1) infinite ${(idx * 0.4) % 3.5}s`,
                              } : {}),
                            }}
                            onMouseEnter={() => setHoveredUnit(unit.id)}
                            onMouseLeave={() => setHoveredUnit(null)}
                            onClick={(e) => { e.stopPropagation(); setSelectedUnit(unit); }}
                          />

                          {/* Label */}
                          <g
                            style={{
                              pointerEvents: "all",
                              cursor: "pointer",
                              transform: `translate(${unit.cx}px, ${unit.cy}px) scale(${isActive ? 1.25 : 1})`,
                              transformOrigin: `${unit.cx}px ${unit.cy}px`,
                              transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
                            }}
                            opacity={isActive ? 1 : focusDimmed ? 0.3 : 0.6}
                            onMouseEnter={() => setHoveredUnit(unit.id)}
                            onMouseLeave={() => setHoveredUnit(null)}
                            onClick={(e) => { e.stopPropagation(); setSelectedUnit(unit); }}
                          >
                            <text x={unit.cx} y={unit.cy} textAnchor="middle" fill="hsl(222, 47%, 15%)">
                              <tspan x={unit.cx} dy={-6} fontSize={14} fontWeight={700} fontFamily="'Montserrat', sans-serif">
                                {unit.number}
                              </tspan>
                              <tspan x={unit.cx} dy={14} fontSize={10} fontWeight={500} fontFamily="'Montserrat', sans-serif" fillOpacity={0.7}>
                                {unit.area}
                              </tspan>
                            </text>
                          </g>

                          {/* Tooltip on hover */}
                          {isHovered && !isMobile && (
                            <foreignObject
                              x={unit.cx - 70}
                              y={unit.cy - 65}
                              width={140}
                              height={45}
                              style={{ pointerEvents: "none", overflow: "visible" }}
                            >
                              <div
                                style={{
                                  background: "rgba(255,253,248,0.95)",
                                  backdropFilter: "blur(16px)",
                                  borderRadius: 8,
                                  padding: "6px 10px",
                                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                                  border: "1px solid rgba(0,0,0,0.06)",
                                  textAlign: "center",
                                }}
                              >
                                <div style={{ fontSize: 11, fontWeight: 700, color: "hsl(232, 78%, 10%)" }}>
                                  {t.unit} {unit.number}
                                </div>
                                <div style={{ fontSize: 9, color: "hsl(220, 20%, 50%)", marginTop: 2 }}>
                                  {unit.area} · {unit.type}
                                </div>
                              </div>
                            </foreignObject>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                )}
              </motion.div>

              {/* Floor label overlay — bottom-left */}
              <div
                className={`absolute bottom-3 ${isRtl ? "right-3" : "left-3"} z-10 rounded-lg px-3 py-2`}
                style={{
                  background: "rgba(255,253,248,0.9)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(0,0,0,0.04)",
                }}
              >
                <p className={`text-[11px] font-bold ${isRtl ? "font-arabic" : "font-display"}`} style={{ color: "hsl(var(--navy))" }}>
                  {floorLabel}
                </p>
                <p className={`text-[9px] mt-0.5 ${isRtl ? "font-arabic" : "font-body"}`} style={{ color: "hsl(var(--steel) / 0.6)" }}>
                  {floorDesc}
                </p>
              </div>
            </div>
          </div>

          {/* ── Side Panel (desktop, only when unit selected) ── */}
          <AnimatePresence>
            {selectedUnit && !isMobile && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 320 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`shrink-0 overflow-hidden ${isFullscreen ? "h-full" : ""}`}
              >
                <div className={`w-[320px] h-full ${isRtl ? "pr-3" : "pl-3"}`}>
                  <div
                    className="rounded-xl p-5 h-full flex flex-col"
                    style={{
                      background: "rgba(255,253,248,0.8)",
                      backdropFilter: "blur(24px)",
                      border: "1px solid hsl(var(--border) / 0.12)",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.02), 0 8px 32px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className={`text-[8px] font-semibold tracking-[0.2em] uppercase mb-1 ${isRtl ? "font-arabic" : "font-body"}`} style={{ color: "hsl(var(--steel) / 0.5)" }}>
                          {floorShort} · {t.unitDetail}
                        </p>
                        <h3 className={`text-lg font-bold text-foreground ${isRtl ? "font-arabic" : "font-display"}`}>
                          {t.unit} {selectedUnit.number}
                        </h3>
                      </div>
                      <button onClick={() => setSelectedUnit(null)} className="p-1.5 rounded-lg transition-all duration-200 hover:bg-muted/50">
                        <X size={14} className="text-muted-foreground" />
                      </button>
                    </div>

                    <div className="space-y-0 mb-5 flex-1">
                      {[
                        { label: t.unit, value: selectedUnit.number },
                        { label: t.area, value: selectedUnit.area },
                        { label: t.type, value: selectedUnit.type },
                        { label: t.floor, value: floorLabel },
                      ].map((item, i) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between py-3"
                          style={{ borderBottom: i < 3 ? "1px solid hsl(var(--border) / 0.08)" : "none" }}
                        >
                          <span className={`text-[10px] tracking-[0.08em] text-muted-foreground uppercase ${isRtl ? "font-arabic" : "font-body"}`}>
                            {item.label}
                          </span>
                          <span className="text-[12px] font-semibold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 mt-auto">
                      <Link
                        to={`${t.contactLink}?unit=${selectedUnit.number}&type=${encodeURIComponent(selectedUnit.type)}&mall=Mercado+Mall`}
                        className={`btn-premium w-full justify-center px-4 py-2.5 text-[10px] tracking-[0.14em] uppercase ${isRtl ? "font-arabic" : "font-body"}`}
                      >
                        {t.inquire}
                        <ArrowRight size={12} className={isRtl ? "rotate-180" : ""} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Bottom CTA (when no units yet) ── */}
        {!hasUnits && !isFullscreen && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-center"
          >
            <Link
              to={isRtl ? "/ar/contact" : "/contact"}
              className={`btn-premium inline-flex items-center gap-2 px-6 py-3 text-[11px] tracking-[0.14em] uppercase ${isRtl ? "font-arabic" : "font-body"}`}
            >
              {t.requestDetails}
              <ArrowRight size={13} className={isRtl ? "rotate-180" : ""} />
            </Link>
          </motion.div>
        )}

        {/* Mobile bottom sheet */}
        <AnimatePresence>
          {selectedUnit && isMobile && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40"
                style={{ background: "rgba(0,0,0,0.2)" }}
                onClick={() => setSelectedUnit(null)}
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-0 bottom-0 z-50"
                style={{ maxHeight: "50vh" }}
              >
                <div
                  className="rounded-t-2xl px-5 pt-3 pb-6 overflow-y-auto"
                  style={{
                    background: "rgba(255,253,248,0.97)",
                    backdropFilter: "blur(24px)",
                    boxShadow: "0 -8px 40px rgba(0,0,0,0.12)",
                    maxHeight: "50vh",
                  }}
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-10 h-1 rounded-full" style={{ background: "hsl(var(--border) / 0.3)" }} />
                  </div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className={`text-[9px] font-semibold tracking-[0.2em] uppercase mb-0.5 ${isRtl ? "font-arabic" : "font-body"}`} style={{ color: "hsl(var(--steel) / 0.5)" }}>
                        {floorShort} · {t.unitDetail}
                      </p>
                      <h3 className={`text-xl font-bold text-foreground ${isRtl ? "font-arabic" : "font-display"}`}>
                        {t.unit} {selectedUnit.number}
                      </h3>
                    </div>
                    <button onClick={() => setSelectedUnit(null)} className="p-2 rounded-lg bg-muted/30">
                      <X size={16} className="text-muted-foreground" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { label: t.area, value: selectedUnit.area },
                      { label: t.type, value: selectedUnit.type },
                      { label: t.floor, value: floorLabel },
                      { label: t.unit, value: selectedUnit.number },
                    ].map((item) => (
                      <div key={item.label} className="p-3 rounded-lg" style={{ background: "hsl(var(--navy) / 0.03)", border: "1px solid hsl(var(--border) / 0.08)" }}>
                        <p className={`text-[9px] text-muted-foreground uppercase tracking-wider mb-1 ${isRtl ? "font-arabic" : "font-body"}`}>{item.label}</p>
                        <p className="text-[13px] font-semibold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={`${t.contactLink}?unit=${selectedUnit.number}&type=${encodeURIComponent(selectedUnit.type)}&mall=Mercado+Mall`}
                    className={`btn-premium w-full justify-center px-4 py-3 text-[11px] tracking-[0.14em] uppercase ${isRtl ? "font-arabic" : "font-body"}`}
                  >
                    {t.inquire}
                    <ArrowRight size={13} className={isRtl ? "rotate-180" : ""} />
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MercadoFloorPlan;
