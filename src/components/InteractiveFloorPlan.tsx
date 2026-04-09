import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, X, ShoppingBag, Stethoscope,
  Briefcase, Building2, Coffee, ZoomIn, ZoomOut, Maximize2, Minimize2,
  Filter, RotateCcw, Search, Layers,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  floorsData, floorLabelsAr, statusColors, statusFills,
  type FloorUnit, type UnitType, type UnitStatus,
} from "@/data/floorPlanData";

/* ─── Constants ─── */
const typeIcons: Record<UnitType, typeof ShoppingBag> = {
  Retail: ShoppingBag, Medical: Stethoscope,
  Administrative: Briefcase, "F&B": Coffee, Service: Building2,
};

const allTypes: UnitType[] = ["Retail", "Medical", "Administrative", "F&B", "Service"];
const allStatuses: UnitStatus[] = ["Available", "Reserved", "Sold"];

/* Premium unit-type color accents (subtle, luxury palette) */
const typeAccents: Record<UnitType, { fill: string; stroke: string; label: string }> = {
  Retail: { fill: "rgba(34,197,94,0.16)", stroke: "rgba(34,197,94,0.6)", label: "#16a34a" },
  Medical: { fill: "rgba(59,130,246,0.16)", stroke: "rgba(59,130,246,0.6)", label: "#2563eb" },
  Administrative: { fill: "rgba(139,92,246,0.16)", stroke: "rgba(139,92,246,0.6)", label: "#7c3aed" },
  "F&B": { fill: "rgba(245,158,11,0.16)", stroke: "rgba(245,158,11,0.6)", label: "#d97706" },
  Service: { fill: "rgba(107,114,128,0.16)", stroke: "rgba(107,114,128,0.6)", label: "#4b5563" },
};

/* ─── i18n ─── */
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
    searchPlaceholder: "Search unit…",
    searchNoResult: "No unit found",
    fullscreen: "Fullscreen", exitFullscreen: "Exit",
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
    searchPlaceholder: "ابحث عن وحدة…",
    searchNoResult: "لم يتم العثور على وحدة",
    fullscreen: "شاشة كاملة", exitFullscreen: "خروج",
    types: { Retail: "تجاري", Medical: "طبي", Administrative: "إداري", "F&B": "مأكولات", Service: "خدمي" } as Record<UnitType, string>,
  },
};

/* ─── Component ─── */
interface InteractiveFloorPlanProps {
  lang?: "en" | "ar";
}

const MIN_ZOOM = 0.8;
const MAX_ZOOM = 4;

const InteractiveFloorPlan = ({ lang = "en" }: InteractiveFloorPlanProps) => {
  const t = i18n[lang];
  const isRtl = lang === "ar";
  const isMobile = useIsMobile();

  const [activeFloor, setActiveFloor] = useState("gf");
  const [prevFloor, setPrevFloor] = useState("gf");
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<FloorUnit | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [filterType, setFilterType] = useState<UnitType | null>(null);
  const [filterStatus, setFilterStatus] = useState<UnitStatus | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHighlight, setSearchHighlight] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [floorTransition, setFloorTransition] = useState(false);

  const panStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const touchRef = useRef({ dist: 0, zoom: 1, cx: 0, cy: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const currentFloor = floorsData.find((f) => f.id === activeFloor)!;
  const arFloor = isRtl ? floorLabelsAr[currentFloor.id] : null;
  const floorLabel = arFloor?.label || currentFloor.label;
  const floorShort = arFloor?.shortLabel || currentFloor.shortLabel;
  const floorDesc = arFloor?.description || currentFloor.description;

  const resetView = useCallback(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, []);

  /* ─── Fullscreen ─── */
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

  /* ─── Wheel zoom (centered on cursor) ─── */
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const rect = viewportRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;
    setZoom((prevZoom) => {
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prevZoom - e.deltaY * 0.002));
      const scale = newZoom / prevZoom;
      setPan((p) => ({
        x: cursorX - scale * (cursorX - p.x),
        y: cursorY - scale * (cursorY - p.y),
      }));
      return newZoom;
    });
  }, []);

  /* ─── Mouse pan ─── */
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

  /* ─── Touch: pinch zoom + drag ─── */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchRef.current = {
        dist: Math.hypot(dx, dy),
        zoom,
        cx: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        cy: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      };
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
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, touchRef.current.zoom * scale));
      setZoom(newZoom);
    } else if (e.touches.length === 1 && isPanning) {
      setPan({
        x: panStart.current.panX + (e.touches[0].clientX - panStart.current.x),
        y: panStart.current.panY + (e.touches[0].clientY - panStart.current.y),
      });
    }
  }, [isPanning]);

  const handleTouchEnd = useCallback(() => setIsPanning(false), []);

  /* ─── Floor switching with animation ─── */
  const switchFloor = useCallback((floorId: string) => {
    if (floorId === activeFloor) return;
    setFloorTransition(true);
    setPrevFloor(activeFloor);
    setTimeout(() => {
      setActiveFloor(floorId);
      resetView();
      setSelectedUnit(null);
      setHoveredUnit(null);
      setSearchQuery("");
      setSearchHighlight(null);
      setTimeout(() => setFloorTransition(false), 50);
    }, 200);
  }, [activeFloor, resetView]);

  /* ─── Search ─── */
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (!query.trim()) { setSearchHighlight(null); return; }
    const q = query.trim().toLowerCase();
    const onCurrent = currentFloor.units.find((u) => u.number.toLowerCase() === q);
    if (onCurrent) {
      setSearchHighlight(onCurrent.id);
      setSelectedUnit(onCurrent);
      const el = viewportRef.current;
      if (el) {
        const vw = el.clientWidth;
        const vh = el.clientHeight;
        const scaleX = vw / currentFloor.viewBoxW;
        const scaleY = vh / currentFloor.viewBoxH;
        const s = Math.min(scaleX, scaleY);
        const targetZoom = Math.min(2.5, Math.max(1.8, 1 / s * 0.5));
        setZoom(targetZoom);
        setPan({
          x: vw / 2 - onCurrent.cx * s * targetZoom,
          y: vh / 2 - onCurrent.cy * s * targetZoom,
        });
      }
      return;
    }
    for (const floor of floorsData) {
      if (floor.id === activeFloor) continue;
      const found = floor.units.find((u) => u.number.toLowerCase() === q);
      if (found) {
        switchFloor(floor.id);
        setTimeout(() => {
          setSearchHighlight(found.id);
          setSelectedUnit(found);
          setSearchQuery(query);
        }, 300);
        return;
      }
    }
    setSearchHighlight(null);
  }, [currentFloor, activeFloor, switchFloor]);

  /* ─── Filters ─── */
  const unitMatches = useCallback((u: FloorUnit) => {
    if (filterType && u.type !== filterType) return false;
    if (filterStatus && u.status !== filterStatus) return false;
    return true;
  }, [filterType, filterStatus]);

  const hasFilters = filterType !== null || filterStatus !== null;
  const matchCount = currentFloor.units.filter(unitMatches).length;

  const stats = useMemo(() => ({
    available: currentFloor.units.filter((u) => u.status === "Available").length,
    reserved: currentFloor.units.filter((u) => u.status === "Reserved").length,
    sold: currentFloor.units.filter((u) => u.status === "Sold").length,
  }), [currentFloor]);

  /* ─── Focus mode: dim map when unit selected ─── */
  const focusMode = selectedUnit !== null;

  return (
    <section
      ref={sectionRef}
      className={`relative ${isFullscreen ? "bg-[#f5f2ed]" : ""}`}
      style={{
        background: isFullscreen ? "#f5f2ed" : "hsl(var(--ivory))",
        padding: isFullscreen ? 0 : undefined,
      }}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Non-fullscreen: header */}
      {!isFullscreen && (
        <div className="pt-20 md:pt-28 pb-6 md:pb-10">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
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
          </div>
        </div>
      )}

      {/* ─── Main explorer container ─── */}
      <div
        ref={containerRef}
        className={`${isFullscreen ? "h-screen flex flex-col" : "max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6 pb-8 md:pb-16"}`}
      >
        {/* ── Top bar: search + filters + floor tabs + controls ── */}
        <div
          className={`flex flex-wrap items-center gap-1.5 md:gap-2 ${isFullscreen ? "px-4 py-2.5 border-b" : "mb-3 px-1"}`}
          style={{
            background: isFullscreen ? "rgba(255,253,248,0.92)" : "transparent",
            backdropFilter: isFullscreen ? "blur(16px)" : undefined,
            borderColor: "hsl(var(--border) / 0.12)",
          }}
        >
          {/* Search */}
          <div className="relative flex items-center">
            <Search size={12} className={`absolute ${isRtl ? "right-2.5" : "left-2.5"} pointer-events-none`} style={{ color: "hsl(var(--steel) / 0.45)" }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`w-[110px] focus:w-[140px] md:w-[130px] md:focus:w-[170px] transition-all duration-300 ${isRtl ? "pr-7 pl-2" : "pl-7 pr-2"} py-1.5 rounded-lg text-[11px] font-medium outline-none ${isRtl ? "font-arabic" : "font-body"}`}
              style={{
                background: "hsl(var(--navy) / 0.04)",
                color: "hsl(var(--foreground))",
                border: `1px solid ${searchHighlight ? "hsl(var(--navy) / 0.3)" : "hsl(var(--border) / 0.2)"}`,
              }}
            />
            {searchQuery && !searchHighlight && (
              <span className={`absolute -bottom-4 ${isRtl ? "right-0" : "left-0"} text-[9px] whitespace-nowrap`} style={{ color: "hsl(var(--destructive))" }}>
                {t.searchNoResult}
              </span>
            )}
          </div>

          <div className="w-px h-5 mx-0.5" style={{ background: "hsl(var(--border) / 0.15)" }} />

          {/* Floor tabs — prominent */}
          <div className="flex items-center gap-0.5 p-0.5 rounded-lg" style={{ background: "hsl(var(--navy) / 0.04)" }}>
            {floorsData.map((floor) => {
              const isActive = activeFloor === floor.id;
              return (
                <button
                  key={floor.id}
                  onClick={() => switchFloor(floor.id)}
                  className={`relative px-3 py-1.5 rounded-md text-[11px] font-bold transition-all duration-250 ${isRtl ? "font-arabic" : "font-display"}`}
                  style={{
                    background: isActive ? "hsl(var(--navy))" : "transparent",
                    color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--steel))",
                    boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.12)" : "none",
                  }}
                >
                  {isRtl ? (floorLabelsAr[floor.id]?.shortLabel || floor.shortLabel) : floor.shortLabel}
                  <span className={`${isRtl ? "mr-1" : "ml-1"} text-[8px] font-normal opacity-60`}>
                    {floor.units.length}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="w-px h-5 mx-0.5 hidden md:block" style={{ background: "hsl(var(--border) / 0.15)" }} />

          {/* Type filters — desktop */}
          <div className="hidden md:flex items-center gap-1">
            <Filter size={11} style={{ color: "hsl(var(--steel) / 0.4)" }} />
            {allTypes.map((type) => {
              const isActive = filterType === type;
              const count = currentFloor.units.filter((u) => u.type === type).length;
              if (count === 0) return null;
              const Icon = typeIcons[type];
              return (
                <button
                  key={type}
                  onClick={() => setFilterType(isActive ? null : type)}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold transition-all duration-250 ${isRtl ? "font-arabic" : "font-body"}`}
                  style={{
                    background: isActive ? typeAccents[type].fill : "transparent",
                    color: isActive ? typeAccents[type].label : "hsl(var(--steel))",
                    border: `1px solid ${isActive ? typeAccents[type].stroke : "transparent"}`,
                  }}
                >
                  <Icon size={10} />
                  {t.types[type]}
                </button>
              );
            })}
          </div>

          {/* Status filters — desktop */}
          <div className="hidden md:flex items-center gap-1">
            {allStatuses.map((status) => {
              const isActive = filterStatus === status;
              const count = currentFloor.units.filter((u) => u.status === status).length;
              if (count === 0) return null;
              return (
                <button
                  key={status}
                  onClick={() => setFilterStatus(isActive ? null : status)}
                  className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-semibold transition-all duration-250 ${isRtl ? "font-arabic" : "font-body"}`}
                  style={{
                    background: isActive ? `${statusColors[status]}15` : "transparent",
                    color: isActive ? statusColors[status] : "hsl(var(--steel))",
                    border: `1px solid ${isActive ? `${statusColors[status]}40` : "transparent"}`,
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: statusColors[status], opacity: isActive ? 1 : 0.5 }} />
                  {t[status]}
                </button>
              );
            })}
          </div>

          {hasFilters && (
            <button
              onClick={() => { setFilterType(null); setFilterStatus(null); }}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold transition-all duration-200 hover:bg-muted/40 ${isRtl ? "font-arabic" : "font-body"}`}
              style={{ color: "hsl(var(--steel) / 0.6)" }}
            >
              <RotateCcw size={9} />
              {t.resetFilters}
              <span className="font-body" style={{ fontFamily: "'Montserrat', sans-serif", opacity: 0.5 }}>
                {matchCount}/{currentFloor.units.length}
              </span>
            </button>
          )}

          {/* Spacer */}
          <div className="flex-1" />

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
            {/* Fullscreen toggle — desktop only */}
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

        {/* ── Map + Panel layout ── */}
        <div className={`flex gap-0 ${isFullscreen ? "flex-1 min-h-0" : ""}`}>
          {/* ─── Interactive Plan ─── */}
          <div
            className={`relative transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              selectedUnit && !isMobile ? "flex-[3]" : "flex-1"
            } ${isFullscreen ? "h-full" : ""}`}
          >
            <div
              ref={viewportRef}
              data-floor-viewport
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
              {/* Focus overlay — dims background when unit is selected */}
              <AnimatePresence>
                {focusMode && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-[5] pointer-events-none"
                    style={{ background: "rgba(245,242,237,0.35)" }}
                  />
                )}
              </AnimatePresence>

              {/* Map content with transform */}
              <motion.div
                className="relative w-full h-full"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transformOrigin: "0 0",
                  transition: isPanning ? "none" : "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                {/* Floor plan image with crossfade */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentFloor.id}
                    src={currentFloor.image}
                    alt={`${currentFloor.label} — Solaria Mall`}
                    className="w-full h-auto block"
                    draggable={false}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </AnimatePresence>

                {/* SVG overlay */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox={`0 0 ${currentFloor.viewBoxW} ${currentFloor.viewBoxH}`}
                  preserveAspectRatio="xMidYMid meet"
                  style={{ pointerEvents: "none" }}
                >
                  <defs>
                    <filter id="unitGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="focusGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="12" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <style>{`
                    @keyframes unitBreathe {
                      0%, 100% { fill-opacity: 0.10; }
                      50% { fill-opacity: 0.24; }
                    }
                    @keyframes searchPulse {
                      0%, 100% { stroke-opacity: 1; stroke-dashoffset: 0; }
                      50% { stroke-opacity: 0.3; stroke-dashoffset: 12; }
                    }
                  `}</style>

                  {currentFloor.units.map((unit, unitIndex) => {
                    const matches = unitMatches(unit);
                    const isDimmed = hasFilters && !matches;
                    const isHovered = hoveredUnit === unit.id;
                    const isSelected = selectedUnit?.id === unit.id;
                    const isSearchMatch = searchHighlight === unit.id;
                    const isActive = isHovered || isSelected || isSearchMatch;
                    const fills = statusFills[unit.status];
                    const accent = typeAccents[unit.type];

                    // Focus mode: dim non-selected units
                    const isFocusDimmed = focusMode && !isSelected && !isHovered;

                    const base = Math.min(currentFloor.viewBoxW, currentFloor.viewBoxH);
                    const unitCount = currentFloor.units.length;
                    const numSize = unitCount <= 5 ? base * 0.022 : unitCount <= 35 ? base * 0.014 : base * 0.009;
                    const areaSize = numSize * 0.7;
                    const gap = numSize * 0.6;
                    const labelScale = isActive && !isDimmed ? 1.3 : 1;

                    if (isDimmed) {
                      return (
                        <g key={unit.id} style={{ pointerEvents: "none" }}>
                          <polygon points={unit.points} fill="rgba(245,242,237,0.88)" stroke="none" strokeLinejoin="round" />
                          <polygon points={unit.points} fill="rgba(200,195,188,0.25)" stroke="hsl(222, 8%, 78%)" strokeWidth={0.3} strokeLinejoin="round" strokeOpacity={0.5} />
                        </g>
                      );
                    }

                    return (
                      <g key={unit.id} style={{ opacity: isFocusDimmed ? 0.35 : 1, transition: "opacity 0.3s ease" }}>
                        {/* Selected unit: extra strong glow */}
                        {isSelected && (
                          <polygon
                            points={unit.points}
                            fill="none"
                            stroke={fills.stroke}
                            strokeWidth={8}
                            strokeLinejoin="round"
                            strokeOpacity={0.2}
                            filter="url(#focusGlow)"
                            style={{ pointerEvents: "none" }}
                          />
                        )}

                        {/* Hover glow */}
                        {isActive && !isSelected && (
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

                        {/* Search pulse */}
                        {isSearchMatch && (
                          <polygon
                            points={unit.points}
                            fill="none"
                            stroke="hsl(222, 47%, 30%)"
                            strokeWidth={4}
                            strokeLinejoin="round"
                            strokeDasharray="8 4"
                            style={{ pointerEvents: "none", animation: "searchPulse 1.5s ease-in-out infinite" }}
                          />
                        )}

                        {/* Main polygon */}
                        <polygon
                          points={unit.points}
                          fill={isActive ? fills.hover : fills.base}
                          stroke={isActive ? fills.stroke : accent.stroke}
                          strokeWidth={isSelected ? 3.5 : isHovered ? 2.5 : 0.6}
                          strokeLinejoin="round"
                          strokeOpacity={isActive ? 1 : 0.15}
                          style={{
                            cursor: "pointer",
                            pointerEvents: "all",
                            transition: "fill 0.25s ease, stroke 0.25s ease, stroke-width 0.25s ease, stroke-opacity 0.25s ease",
                            ...(!isActive && unit.status === "Available" ? {
                              animation: `unitBreathe 3.5s cubic-bezier(0.4,0,0.6,1) infinite ${(unitIndex * 0.4) % 3.5}s`,
                            } : {}),
                          }}
                          onMouseEnter={() => setHoveredUnit(unit.id)}
                          onMouseLeave={() => setHoveredUnit(null)}
                          onClick={(e) => { e.stopPropagation(); setSelectedUnit(unit); }}
                        />

                        {/* Unit label */}
                        <g
                          style={{
                            pointerEvents: "all",
                            cursor: "pointer",
                            transform: `translate(${unit.cx}px, ${unit.cy}px) scale(${labelScale})`,
                            transformOrigin: `${unit.cx}px ${unit.cy}px`,
                            transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease",
                          }}
                          opacity={isActive ? 1 : isFocusDimmed ? 0.4 : 0.65}
                          onMouseEnter={() => setHoveredUnit(unit.id)}
                          onMouseLeave={() => setHoveredUnit(null)}
                          onClick={(e) => { e.stopPropagation(); setSelectedUnit(unit); }}
                        >
                          <text x={unit.cx} y={unit.cy} textAnchor="middle" fill={isActive ? "hsl(222, 47%, 11%)" : "hsl(222, 47%, 18%)"}>
                            <tspan x={unit.cx} dy={-gap / 2} fontSize={numSize} fontWeight={isActive ? 800 : 700} fontFamily="'Montserrat', sans-serif">
                              {unit.number}
                            </tspan>
                            <tspan x={unit.cx} dy={gap} fontSize={areaSize} fontWeight={500} fontFamily="'Montserrat', sans-serif" fillOpacity={isActive ? 0.9 : 0.6}>
                              {unit.area}
                            </tspan>
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>

                {/* ── Floating Tooltip ── */}
                <AnimatePresence>
                  {hoveredUnit && !isMobile && (() => {
                    const unit = currentFloor.units.find((u) => u.id === hoveredUnit);
                    if (!unit) return null;
                    const Icon = typeIcons[unit.type];
                    const tipX = Math.min(Math.max((unit.cx / currentFloor.viewBoxW) * 100, 6), 94);
                    const tipY = (unit.cy / currentFloor.viewBoxH) * 100;

                    return (
                      <motion.div
                        key={unit.id}
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute z-30 pointer-events-none"
                        style={{
                          left: `${tipX}%`,
                          top: `calc(${tipY}% - ${32 / zoom}px)`,
                          transform: "translate(-50%, -100%)",
                        }}
                      >
                        <div
                          className="rounded-lg px-3 py-2"
                          style={{
                            background: "rgba(255,253,248,0.95)",
                            backdropFilter: "blur(20px)",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.05)",
                            border: "1px solid rgba(0,0,0,0.06)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: typeAccents[unit.type].fill }}>
                              <Icon size={10} style={{ color: typeAccents[unit.type].label }} />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className={`text-[11px] font-bold text-foreground ${isRtl ? "font-arabic" : "font-display"}`}>
                                  {t.unit} {unit.number}
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[unit.status] }} />
                              </div>
                              <div className={`flex gap-2 text-[9px] text-muted-foreground mt-0.5 ${isRtl ? "font-arabic" : "font-body"}`}>
                                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>{unit.area}</span>
                                <span>·</span>
                                <span>{t.types[unit.type]}</span>
                                <span>·</span>
                                <span style={{ color: statusColors[unit.status] }}>{t[unit.status]}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Tooltip arrow */}
                        <div className="flex justify-center">
                          <div className="w-2 h-2 rotate-45 -mt-1" style={{ background: "rgba(255,253,248,0.95)", border: "1px solid rgba(0,0,0,0.06)", borderTop: "none", borderLeft: "none" }} />
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </motion.div>

              {/* Mobile legend bar */}
              <div className="flex lg:hidden items-center justify-center gap-3 py-2 absolute bottom-0 left-0 right-0 z-10" style={{ background: "rgba(255,253,248,0.9)", backdropFilter: "blur(12px)", borderTop: "1px solid hsl(var(--border) / 0.1)" }}>
                {(["Available", "Reserved", "Sold"] as UnitStatus[]).map((s) => (
                  <div key={s} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: statusColors[s] }} />
                    <span className={`text-[9px] text-muted-foreground ${isRtl ? "font-arabic" : "font-body"}`}>{t[s]}</span>
                  </div>
                ))}
              </div>

              {/* Desktop legend — floating in corner */}
              <div className={`hidden lg:flex flex-col gap-1.5 absolute bottom-3 ${isRtl ? "left-3" : "right-3"} z-10 rounded-lg px-3 py-2`} style={{ background: "rgba(255,253,248,0.9)", backdropFilter: "blur(16px)", border: "1px solid rgba(0,0,0,0.04)" }}>
                <p className={`text-[8px] font-semibold tracking-[0.2em] uppercase ${isRtl ? "font-arabic" : "font-body"}`} style={{ color: "hsl(var(--steel) / 0.5)" }}>
                  {t.availability}
                </p>
                {([
                  ["Available", stats.available],
                  ["Reserved", stats.reserved],
                  ["Sold", stats.sold],
                ] as [UnitStatus, number][]).map(([s, count]) => (
                  <div key={s} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: statusColors[s], opacity: 0.8 }} />
                    <span className={`text-[10px] text-muted-foreground flex-1 ${isRtl ? "font-arabic" : "font-body"}`}>{t[s]}</span>
                    <span className="text-[10px]" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: "hsl(var(--steel))" }}>
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Side Detail Panel (desktop) ─── */}
          <AnimatePresence>
            {selectedUnit && !isMobile && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 340 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`shrink-0 overflow-hidden ${isFullscreen ? "h-full" : ""}`}
              >
                <div
                  className={`w-[340px] h-full ${isRtl ? "pr-3" : "pl-3"}`}
                >
                  <div
                    className={`rounded-xl p-5 h-full flex flex-col`}
                    style={{
                      background: "rgba(255,253,248,0.8)",
                      backdropFilter: "blur(24px)",
                      border: "1px solid hsl(var(--border) / 0.12)",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.02), 0 8px 32px rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className={`text-[8px] font-semibold tracking-[0.2em] uppercase mb-1 ${isRtl ? "font-arabic" : "font-body"}`} style={{ color: "hsl(var(--steel) / 0.5)" }}>
                          {floorShort} · {t.unitDetail}
                        </p>
                        <h3 className={`text-lg font-bold text-foreground ${isRtl ? "font-arabic" : "font-display"}`}>
                          {t.unit} {selectedUnit.number}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedUnit(null)}
                        className="p-1.5 rounded-lg transition-all duration-200 hover:bg-muted/50 hover:rotate-90"
                      >
                        <X size={14} className="text-muted-foreground" />
                      </button>
                    </div>

                    {/* Status badge */}
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-wider uppercase mb-5 w-fit ${isRtl ? "font-arabic" : "font-body"}`}
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
                    <div className="space-y-0 mb-5 flex-1">
                      {[
                        { label: t.unit, value: selectedUnit.number },
                        { label: t.area, value: selectedUnit.area },
                        { label: t.type, value: t.types[selectedUnit.type] },
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
                          <span
                            className="text-[12px] font-semibold text-foreground"
                            style={{ fontFamily: item.label === t.area ? "'Montserrat', sans-serif" : "inherit" }}
                          >
                            {item.value}
                          </span>
                        </div>
                      ))}

                      {/* Floor description */}
                      <p className={`text-[11px] leading-[1.7] mt-4 ${isRtl ? "font-arabic" : "font-body"}`} style={{ color: "hsl(var(--steel) / 0.8)" }}>
                        {floorDesc}
                      </p>
                    </div>

                    {/* CTAs */}
                    <div className="space-y-2 mt-auto">
                      <Link
                        to={`${t.contactLink}?unit=${selectedUnit.number}&type=${encodeURIComponent(selectedUnit.type)}&mall=Solaria+Mall`}
                        className={`btn-premium w-full justify-center px-4 py-2.5 text-[10px] tracking-[0.14em] uppercase ${isRtl ? "font-arabic" : "font-body"}`}
                      >
                        {t.inquire}
                        <ArrowRight size={12} className={isRtl ? "rotate-180" : ""} />
                      </Link>
                      <Link
                        to={t.unitsLink}
                        className={`btn-outline-dark w-full justify-center px-4 py-2.5 text-[10px] tracking-[0.14em] uppercase rounded-lg ${isRtl ? "font-arabic" : "font-body"}`}
                      >
                        {t.viewAll}
                        <ArrowRight size={12} className={isRtl ? "rotate-180" : ""} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── Mobile Bottom Sheet ─── */}
        <AnimatePresence>
          {selectedUnit && isMobile && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 bottom-0 z-50"
              style={{ maxHeight: "55vh" }}
            >
              <div
                className="rounded-t-2xl px-5 pt-3 pb-6 overflow-y-auto"
                style={{
                  background: "rgba(255,253,248,0.97)",
                  backdropFilter: "blur(24px)",
                  boxShadow: "0 -8px 40px rgba(0,0,0,0.12)",
                  maxHeight: "55vh",
                }}
              >
                {/* Drag handle */}
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-1 rounded-full" style={{ background: "hsl(var(--border) / 0.3)" }} />
                </div>

                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className={`text-[9px] font-semibold tracking-[0.2em] uppercase mb-0.5 ${isRtl ? "font-arabic" : "font-body"}`} style={{ color: "hsl(var(--steel) / 0.5)" }}>
                      {floorShort} · {t.unitDetail}
                    </p>
                    <h3 className={`text-xl font-bold text-foreground ${isRtl ? "font-arabic" : "font-display"}`}>
                      {t.unit} {selectedUnit.number}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedUnit(null)}
                    className="p-2 rounded-lg bg-muted/30"
                  >
                    <X size={16} className="text-muted-foreground" />
                  </button>
                </div>

                {/* Status */}
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-wider uppercase mb-4 ${isRtl ? "font-arabic" : "font-body"}`}
                  style={{
                    background: `${statusColors[selectedUnit.status]}10`,
                    color: statusColors[selectedUnit.status],
                    border: `1px solid ${statusColors[selectedUnit.status]}20`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[selectedUnit.status] }} />
                  {t[selectedUnit.status]}
                </span>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: t.area, value: selectedUnit.area, mono: true },
                    { label: t.type, value: t.types[selectedUnit.type], mono: false },
                    { label: t.floor, value: floorLabel, mono: false },
                    { label: t.unit, value: selectedUnit.number, mono: true },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg" style={{ background: "hsl(var(--navy) / 0.03)", border: "1px solid hsl(var(--border) / 0.08)" }}>
                      <p className={`text-[9px] text-muted-foreground uppercase tracking-wider mb-1 ${isRtl ? "font-arabic" : "font-body"}`}>{item.label}</p>
                      <p className="text-[13px] font-semibold text-foreground" style={{ fontFamily: item.mono ? "'Montserrat', sans-serif" : "inherit" }}>{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="space-y-2">
                  <Link
                    to={`${t.contactLink}?unit=${selectedUnit.number}&type=${encodeURIComponent(selectedUnit.type)}&mall=Solaria+Mall`}
                    className={`btn-premium w-full justify-center px-4 py-3 text-[11px] tracking-[0.14em] uppercase ${isRtl ? "font-arabic" : "font-body"}`}
                  >
                    {t.inquire}
                    <ArrowRight size={13} className={isRtl ? "rotate-180" : ""} />
                  </Link>
                  <Link
                    to={t.unitsLink}
                    className={`btn-outline-dark w-full justify-center px-4 py-3 text-[11px] tracking-[0.14em] uppercase rounded-lg ${isRtl ? "font-arabic" : "font-body"}`}
                  >
                    {t.viewAll}
                    <ArrowRight size={13} className={isRtl ? "rotate-180" : ""} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Backdrop for mobile bottom sheet */}
        <AnimatePresence>
          {selectedUnit && isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.2)" }}
              onClick={() => setSelectedUnit(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveFloorPlan;
