import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, X, ShoppingBag, Stethoscope,
  Briefcase, Building2, Coffee, ZoomIn, ZoomOut, Maximize2
} from "lucide-react";

import floorGF from "@/assets/floorplans/GF.png";
import floor1F from "@/assets/floorplans/1F.png";
import floor2F from "@/assets/floorplans/2F.png";
import floor3F from "@/assets/floorplans/3F.png";
import floorRF from "@/assets/floorplans/RF.png";

/* ─── Types ─── */
type UnitType = "Retail" | "Medical" | "Administrative" | "F&B" | "Service";
type UnitStatus = "Available" | "Reserved" | "Sold";

interface FloorUnit {
  id: string;
  number: string;
  area: string;
  type: UnitType;
  status: UnitStatus;
  /** x, y, w, h as % of image */
  x: number; y: number; w: number; h: number;
}

interface FloorData {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  image: string;
  units: FloorUnit[];
}

const typeIcons: Record<UnitType, typeof ShoppingBag> = {
  Retail: ShoppingBag, Medical: Stethoscope,
  Administrative: Briefcase, "F&B": Coffee, Service: Building2,
};

const statusColors: Record<UnitStatus, string> = {
  Available: "hsl(152 55% 40%)",
  Reserved: "hsl(38 75% 50%)",
  Sold: "hsl(0 0% 58%)",
};

const statusFills: Record<UnitStatus, { base: string; hover: string; stroke: string }> = {
  Available: {
    base: "rgba(46,139,87,0.06)",
    hover: "rgba(46,139,87,0.18)",
    stroke: "rgba(46,139,87,0.45)",
  },
  Reserved: {
    base: "rgba(200,165,50,0.06)",
    hover: "rgba(200,165,50,0.18)",
    stroke: "rgba(200,165,50,0.45)",
  },
  Sold: {
    base: "rgba(140,140,140,0.06)",
    hover: "rgba(140,140,140,0.18)",
    stroke: "rgba(140,140,140,0.45)",
  },
};

/* ─── Helper: make a unit ─── */
const u = (
  id: string, number: string, area: string,
  type: UnitType, status: UnitStatus,
  x: number, y: number, w: number, h: number
): FloorUnit => ({ id, number, area, type, status, x, y, w, h });

/* ─── Floor Data — real units from architectural plans ─── */
const floorsData: FloorData[] = [
  {
    id: "gf", label: "Ground Floor", shortLabel: "GF", image: floorGF,
    description: "Prime retail frontage with direct street access and maximum commercial visibility. 66 units from 26 m² to 125 m².",
    units: [
      // ── Top-right row: 01-03 ──
      u("gf-01","01","73 m²","Retail","Available", 78,7, 9,5),
      u("gf-02","02","49 m²","Retail","Available", 69,7, 8,5),
      u("gf-03","03","47 m²","Retail","Available", 62,8, 6.5,4.5),
      // ── Right upper: 04 (large) ──
      u("gf-04","04","79 m²","Retail","Available", 65,13, 15,6),
      // ── Right column pairs: 05-13 ──
      u("gf-05","05","49 m²","Retail","Available", 63,21, 8,5),
      u("gf-06","06","50 m²","Retail","Available", 63,27, 7,4.5),
      u("gf-07","07","56 m²","Retail","Available", 75,20, 9,7),
      u("gf-08","08","49 m²","Retail","Available", 63,32, 8,4.5),
      u("gf-09","09","40 m²","Retail","Available", 75,32, 9,4.5),
      u("gf-10","10","51 m²","Retail","Available", 63,37, 8,4.5),
      u("gf-11","11","40 m²","Retail","Available", 75,37, 9,4.5),
      u("gf-12","12","45 m²","Retail","Available", 63,42, 8,4.5),
      u("gf-13","13","28 m²","Retail","Available", 75,42, 9,4.5),
      // ── Right strip: 14-21 (dual column) ──
      u("gf-14","14","47 m²","Retail","Reserved", 63,47, 8,4.5),
      u("gf-15","15","29 m²","Retail","Available", 75,47, 9,4.5),
      u("gf-16","16","47 m²","Retail","Available", 63,52, 8,4.5),
      u("gf-17","17","29 m²","Retail","Available", 75,52, 9,4.5),
      u("gf-18","18","47 m²","Retail","Available", 63,57, 8,4.5),
      u("gf-19","19","29 m²","Retail","Available", 75,57, 9,4.5),
      u("gf-20","20","47 m²","Retail","Available", 63,62, 8,4.5),
      u("gf-21","21","29 m²","Retail","Available", 75,62, 9,4.5),
      // ── Right lower: 22-24 ──
      u("gf-22","22","68 m²","Retail","Available", 63,67, 10,5),
      u("gf-23","23","43 m²","Retail","Available", 73,67, 11,5),
      u("gf-24","24","64 m²","Retail","Available", 63,73, 15,5),
      // ── Bottom-right: 25-28 ──
      u("gf-25","25","77 m²","Retail","Available", 63,81, 17,5.5),
      u("gf-26","26","75 m²","Retail","Reserved", 63,87, 17,5),
      u("gf-27","27","79 m²","Retail","Available", 63,93, 9,5),
      u("gf-28","28","75 m²","Retail","Available", 72,93, 9,5),
      // ── Center-top: 29-36 (paired rows) ──
      u("gf-29","29","43 m²","Retail","Available", 52,14, 6,5),
      u("gf-30","30","40 m²","Retail","Available", 44,14, 7,5),
      u("gf-31","31","32 m²","Retail","Available", 53,20, 7,5),
      u("gf-32","32","57 m²","Retail","Available", 44,20, 8,5),
      u("gf-33","33","33 m²","Retail","Available", 53,26, 7,5),
      u("gf-34","34","41 m²","Retail","Available", 44,26, 8,5),
      u("gf-35","35","34 m²","Retail","Available", 53,32, 7,5),
      u("gf-36","36","42 m²","Retail","Available", 44,32, 8,5),
      // ── Center: 37-39 ──
      u("gf-37","37","67 m²","Retail","Available", 50,38, 10,6),
      u("gf-38","38","60 m²","Retail","Available", 58,40, 8,5),
      u("gf-39","39","62 m²","Retail","Available", 50,40, 8,5),
      // ── Upper-left: 40-42 ──
      u("gf-40","40","39 m²","Retail","Available", 39,23, 5,5),
      u("gf-41","41","39 m²","Retail","Available", 38,29, 5.5,5),
      u("gf-42","42","58 m²","Retail","Available", 36,35, 7,6),
      // ── Center grid: 43-48 ──
      u("gf-43","43","52 m²","Retail","Available", 50,46, 5.5,4.5),
      u("gf-44","44","48 m²","Retail","Available", 39,47, 6,5),
      u("gf-45","45","50 m²","Retail","Available", 46,47, 6,5),
      u("gf-46","46","49 m²","Retail","Available", 53,50, 5.5,4.5),
      u("gf-47","47","51 m²","Retail","Available", 47,50, 6,4.5),
      u("gf-48","48","46 m²","Retail","Available", 42,50, 5,4.5),
      // ── Left-center: 49-56 ──
      u("gf-49","49","49 m²","Retail","Available", 36,53, 6,5),
      u("gf-50","50","49 m²","Retail","Available", 30,48, 6,5),
      u("gf-51","51","51 m²","Retail","Available", 26,48, 6,5),
      u("gf-52","52","49 m²","Retail","Available", 21,46, 6.5,5),
      u("gf-53","53","45 m²","Retail","Sold", 26,52, 6,5),
      u("gf-54","54","48 m²","Retail","Available", 27,55, 6,5),
      u("gf-55","55","102 m²","Retail","Available", 33,54, 10,7),
      u("gf-56","56","51 m²","Retail","Available", 27,58, 6,5),
      // ── Center-lower: 57 ──
      u("gf-57","57","44 m²","Retail","Available", 42,60, 7,5),
      // ── Bottom-left: 58-63 ──
      u("gf-58","58","77 m²","Retail","Available", 36,72, 8,7),
      u("gf-59","59","73 m²","Retail","Available", 30,70, 8,7),
      u("gf-60","60","75 m²","Retail","Available", 24,73, 8,6),
      u("gf-61","61","79 m²","Retail","Available", 26,65, 8,7),
      u("gf-62","62","125 m²","Retail","Available", 14,62, 11,11),
      u("gf-63","63","47 m²","Retail","Available", 23,57, 6,6),
      // ── Bottom-center/right: 64-66 ──
      u("gf-64","64","83 m²","Retail","Available", 48,73, 10,7),
      u("gf-65","65","87 m²","Retail","Available", 48,80, 10,7),
      u("gf-66","66","107 m²","Retail","Available", 46,87, 12,8),
    ],
  },
  {
    id: "1f", label: "First Floor", shortLabel: "1F", image: floor1F,
    description: "Versatile commercial spaces with dedicated access. Clinics and professional offices. 32 units from 40 m² to 276 m².",
    units: [
      // Top-right: 101-102
      u("1f-101","101","95 m²","Retail","Available", 73,12, 9,8),
      u("1f-102","102","75 m²","Retail","Available", 61,12, 10,8),
      // Right strip: 103-110
      u("1f-103","103","57 m²","Retail","Available", 72,30, 8,6),
      u("1f-104","104","53 m²","Retail","Available", 72,36.5, 8,5.5),
      u("1f-105","105","53 m²","Retail","Available", 72,42.5, 8,5.5),
      u("1f-106","106","53 m²","Retail","Reserved", 72,48.5, 8,5.5),
      u("1f-107","107","53 m²","Retail","Available", 72,54.5, 8,5.5),
      u("1f-108","108","53 m²","Retail","Available", 72,60.5, 8,5.5),
      u("1f-109","109","53 m²","Retail","Available", 72,66.5, 8,5.5),
      u("1f-110","110","77 m²","Retail","Available", 72,73, 8,6.5),
      // Left upper column: 113-118
      u("1f-113","113","75 m²","Retail","Available", 45,12, 8,6.5),
      u("1f-114","114","82 m²","Retail","Available", 42,20, 9,7),
      u("1f-115","115","51 m²","Retail","Available", 42,28, 7,5.5),
      u("1f-116","116","52 m²","Retail","Available", 42,34, 7,5.5),
      u("1f-117","117","43 m²","Retail","Available", 52,28, 7,5),
      u("1f-118","118","40 m²","Retail","Sold", 52,34, 6,5),
      // Center: 119-125
      u("1f-119","119","99 m²","Retail","Available", 38,30, 9,7),
      u("1f-120","120","50 m²","Retail","Available", 40,40, 6.5,5.5),
      u("1f-121","121","55 m²","Retail","Available", 40,46, 7,5.5),
      u("1f-122","122","57 m²","Retail","Available", 53,44, 7.5,6),
      u("1f-123","123","48 m²","Retail","Available", 45,50, 6.5,5.5),
      u("1f-124","124","52 m²","Retail","Available", 39,50, 6,5.5),
      u("1f-125","125","117 m²","Retail","Available", 29,48, 9.5,7),
      // Left lower: 126-132
      u("1f-126","126","49 m²","Retail","Available", 39,57, 6,5),
      u("1f-127","127","54 m²","Retail","Available", 37,63, 6.5,5),
      u("1f-128","128","49 m²","Retail","Available", 33,72, 6,5),
      u("1f-129","129","52 m²","Retail","Available", 33,78, 6.5,5.5),
      u("1f-130","130","88 m²","Retail","Available", 32,84, 8,6),
      u("1f-131","131","250 m²","Retail","Available", 14,58, 13,10),
      u("1f-132","132","276 m²","Retail","Available", 47,80, 13,9),
      // Bottom-right: 111-112
      u("1f-111","111","91 m²","Retail","Available", 74,82, 8,7),
      u("1f-112","112","187 m²","Retail","Available", 67,90, 12,7),
    ],
  },
  {
    id: "2f", label: "Second Floor", shortLabel: "2F", image: floor2F,
    description: "Mixed-use medical and administrative zone with professional atmosphere and natural light. Units from 12 m² to 108 m².",
    units: [
      // Top-right: 201-202
      u("2f-202","202","122 m²","Administrative","Available", 72,10, 10,8),
      u("2f-201","201","46 m²","Administrative","Available", 73,20, 8,6),
      // Right strip: 203-209
      u("2f-203","203","37 m²","Medical","Available", 74,28, 7,5),
      u("2f-204","204","37 m²","Medical","Available", 74,33.5, 7,5),
      u("2f-205","205","37 m²","Medical","Available", 74,39, 7,5),
      u("2f-206","206","37 m²","Medical","Reserved", 74,44.5, 7,5),
      u("2f-207","207","37 m²","Medical","Available", 74,50, 7,5),
      u("2f-208","208","39 m²","Medical","Available", 74,55.5, 7,5.5),
      u("2f-209","209","66 m²","Administrative","Available", 78,28, 7,8),
      // Right mid column: 210-216
      u("2f-210","210","49 m²","Administrative","Available", 78,62, 7,5.5),
      u("2f-211","211","49 m²","Administrative","Available", 78,68, 7,5.5),
      u("2f-212","212","49 m²","Medical","Available", 78,74, 7,5.5),
      u("2f-213","213","49 m²","Administrative","Available", 78,80, 7,5.5),
      u("2f-214","214","49 m²","Administrative","Sold", 78,86, 7,5.5),
      u("2f-215","215","49 m²","Medical","Available", 78,92, 7,5),
      u("2f-216","216","69 m²","Administrative","Available", 72,88, 7,6.5),
      // Upper center: 217-222
      u("2f-217","217","88 m²","Administrative","Available", 50,17, 9,7),
      u("2f-220","220","46 m²","Administrative","Available", 48,28, 7,5.5),
      u("2f-221","221","38 m²","Medical","Available", 48,34, 6.5,5),
      u("2f-222","222","78 m²","Medical","Available", 55,38, 8,6),
      u("2f-223","223","39 m²","Administrative","Available", 42,40, 6,5),
      // Center: 224-229
      u("2f-224","224","70 m²","Administrative","Available", 42,48, 8,6),
      u("2f-225","225","86 m²","Administrative","Available", 50,52, 9,6.5),
      u("2f-226","226","12 m²","Medical","Available", 46,56, 4,3.5),
      u("2f-227","227","43 m²","Administrative","Reserved", 40,56, 6,5),
      u("2f-228","228","63 m²","Administrative","Available", 36,56, 7,6),
      u("2f-229","229","38 m²","Medical","Available", 28,56, 6,5),
      // Bottom-left: 230-235
      u("2f-230","230","38 m²","Administrative","Available", 32,68, 6,5),
      u("2f-231","231","54 m²","Administrative","Available", 28,64, 7,5.5),
      u("2f-232","232","43 m²","Administrative","Available", 37,80, 6.5,5),
      u("2f-233","233","104 m²","Administrative","Available", 35,86, 9,7),
      u("2f-234","234","108 m²","Administrative","Available", 22,72, 9,7),
      u("2f-235","235","74 m²","Medical","Available", 14,62, 8,6.5),
      // Bottom-right: 218-219
      u("2f-218","218","221 m²","Medical","Available", 74,94, 10,5),
      u("2f-219","219","43 m²","Administrative","Available", 68,82, 7,5.5),
    ],
  },
  {
    id: "3f", label: "Third Floor", shortLabel: "3F", image: floor3F,
    description: "Upper-level administrative and medical suites with panoramic views and premium finishes. Units from 37 m² to 121 m².",
    units: [
      // Top-right: 301-302
      u("3f-302","302","122 m²","Administrative","Available", 72,10, 10,8),
      u("3f-301","301","46 m²","Administrative","Available", 73,20, 8,6),
      // Right strip: 303-309
      u("3f-303","303","36 m²","Medical","Available", 65,25, 7,5.5),
      u("3f-304","304","37 m²","Medical","Available", 74,28, 7,5),
      u("3f-305","305","37 m²","Medical","Available", 74,34, 7,5),
      u("3f-306","306","37 m²","Medical","Reserved", 74,40, 7,5),
      u("3f-307","307","37 m²","Medical","Available", 74,46, 7,5),
      u("3f-308","308","39 m²","Medical","Available", 74,52, 7,5),
      u("3f-309","309","66 m²","Administrative","Available", 78,28, 7,8),
      // Right column: 310-316
      u("3f-310","310","49 m²","Administrative","Available", 78,58, 7,5.5),
      u("3f-311","311","49 m²","Administrative","Available", 78,64, 7,5.5),
      u("3f-312","312","49 m²","Medical","Available", 78,70, 7,5.5),
      u("3f-313","313","49 m²","Administrative","Sold", 78,76, 7,5.5),
      u("3f-314","314","49 m²","Administrative","Available", 78,82, 7,5.5),
      u("3f-315","315","49 m²","Medical","Available", 78,88, 7,5),
      u("3f-316","316","89 m²","Administrative","Available", 72,84, 7,7),
      // Upper center: 319-322
      u("3f-319","319","80 m²","Administrative","Available", 45,17, 9,7),
      u("3f-320","320","46 m²","Administrative","Available", 48,26, 7,5.5),
      u("3f-321","321","38 m²","Medical","Available", 48,32, 6.5,5),
      u("3f-322","322","78 m²","Medical","Available", 55,36, 8,6),
      // Center: 323-329
      u("3f-323","323","99 m²","Administrative","Reserved", 40,38, 9,7),
      u("3f-324","324","70 m²","Administrative","Available", 42,48, 8,6),
      u("3f-325","325","86 m²","Administrative","Available", 50,52, 9,6.5),
      u("3f-326","326","121 m²","Administrative","Available", 50,60, 10,7),
      u("3f-327","327","63 m²","Administrative","Available", 38,58, 7,5.5),
      u("3f-328","328","83 m²","Administrative","Available", 34,56, 7.5,6),
      u("3f-329","329","38 m²","Medical","Available", 30,54, 6,5),
      // Left-bottom: 330-336
      u("3f-330","330","38 m²","Administrative","Available", 32,66, 6,5),
      u("3f-331","331","40 m²","Administrative","Available", 35,73, 6.5,5),
      u("3f-332","332","43 m²","Administrative","Available", 37,80, 6.5,5),
      u("3f-333","333","104 m²","Administrative","Available", 35,86, 9,7),
      u("3f-334","334","108 m²","Administrative","Available", 22,72, 9,7),
      u("3f-335","335","34 m²","Medical","Sold", 14,63, 6,5.5),
      u("3f-336","336","54 m²","Administrative","Available", 20,63, 6.5,5.5),
      // Bottom-right: 317-318
      u("3f-317","317","55 m²","Medical","Available", 72,92, 7,5),
      u("3f-318","318","221 m²","Medical","Available", 74,96, 10,4),
    ],
  },
  {
    id: "rf", label: "Roof Floor", shortLabel: "RF", image: floorRF,
    description: "Exclusive rooftop spaces with open-air potential — ideal for restaurants, lounges, and premium F&B concepts.",
    units: [
      u("rf-01","R-01","29 m²","F&B","Available", 45,18, 7,9),
      u("rf-02","R-02","148 m²","F&B","Available", 46,28, 13,12),
      u("rf-03","R-03","59 m²","F&B","Available", 32,48, 6,12),
      u("rf-04","R-04","39 m²","F&B","Available", 35,62, 7,8),
    ],
  },
];

/* ─── Component ─── */
const InteractiveFloorPlan = () => {
  const [activeFloor, setActiveFloor] = useState("gf");
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<FloorUnit | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const currentFloor = floorsData.find((f) => f.id === activeFloor)!;

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
  }, [activeFloor, resetView]);

  // Stats
  const available = currentFloor.units.filter((u) => u.status === "Available").length;
  const reserved = currentFloor.units.filter((u) => u.status === "Reserved").length;
  const sold = currentFloor.units.filter((u) => u.status === "Sold").length;

  return (
    <section className="py-20 md:py-28" style={{ background: "hsl(var(--ivory))" }}>
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
                    className="flex-shrink-0 relative px-3 py-2 rounded-lg text-left transition-all duration-300"
                    style={{
                      background: isActive ? "hsl(var(--navy))" : "transparent",
                      border: `1px solid ${isActive ? "transparent" : "hsl(var(--border) / 0.2)"}`,
                    }}
                  >
                    <div className="flex items-baseline gap-2">
                      <span
                        className="font-display text-[12px] font-bold"
                        style={{ color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))" }}
                      >
                        {floor.shortLabel}
                      </span>
                      <span
                        className="hidden lg:inline text-[10px] font-body"
                        style={{ color: isActive ? "hsl(var(--primary-foreground) / 0.6)" : "hsl(var(--steel))" }}
                      >
                        {floor.label}
                      </span>
                    </div>
                    <p
                      className="text-[8px] font-body mt-0.5 tracking-wide"
                      style={{ color: isActive ? "hsl(var(--primary-foreground) / 0.4)" : "hsl(var(--steel) / 0.5)" }}
                    >
                      {floor.units.length} units
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="hidden lg:flex flex-col gap-2 mt-5 pt-4" style={{ borderTop: "1px solid hsl(var(--border) / 0.15)" }}>
              <p className="text-[8px] font-body font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: "hsl(var(--steel) / 0.6)" }}>
                Availability
              </p>
              {([
                ["Available", available],
                ["Reserved", reserved],
                ["Sold", sold],
              ] as [UnitStatus, number][]).map(([s, count]) => (
                <div key={s} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: statusColors[s], opacity: 0.8 }} />
                  <span className="text-[10px] font-body text-muted-foreground flex-1">{s}</span>
                  <span className="text-[10px] font-body" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: "hsl(var(--steel))" }}>
                    {count}
                  </span>
                </div>
              ))}
            </div>

            {/* Zoom controls */}
            <div className="hidden lg:flex flex-col gap-1 mt-4 pt-4" style={{ borderTop: "1px solid hsl(var(--border) / 0.15)" }}>
              <p className="text-[8px] font-body font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: "hsl(var(--steel) / 0.6)" }}>
                View
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
                ref={containerRef}
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

                  {/* Unit overlays */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    style={{ pointerEvents: "none" }}
                  >
                    {currentFloor.units.map((unit) => {
                      const isHovered = hoveredUnit === unit.id;
                      const isSelected = selectedUnit?.id === unit.id;
                      const isActive = isHovered || isSelected;
                      const fills = statusFills[unit.status];

                      return (
                        <rect
                          key={unit.id}
                          x={unit.x}
                          y={unit.y}
                          width={unit.w}
                          height={unit.h}
                          rx="0.3"
                          fill={isActive ? fills.hover : fills.base}
                          stroke={isActive ? fills.stroke : "transparent"}
                          strokeWidth={isSelected ? "0.35" : "0.2"}
                          style={{
                            cursor: "pointer",
                            pointerEvents: "all",
                            transition: "fill 0.25s ease, stroke 0.25s ease",
                          }}
                          onMouseEnter={() => setHoveredUnit(unit.id)}
                          onMouseLeave={() => setHoveredUnit(null)}
                          onClick={(e) => { e.stopPropagation(); setSelectedUnit(unit); }}
                        />
                      );
                    })}
                  </svg>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredUnit && (() => {
                      const unit = currentFloor.units.find((u) => u.id === hoveredUnit);
                      if (!unit) return null;
                      const Icon = typeIcons[unit.type];
                      const tipX = Math.min(Math.max(unit.x + unit.w / 2, 10), 90);
                      const tipY = unit.y;

                      return (
                        <motion.div
                          key={unit.id}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.12 }}
                          className="absolute z-30 pointer-events-none"
                          style={{
                            left: `${tipX}%`,
                            top: `${tipY}%`,
                            transform: "translate(-50%, -105%)",
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
                              <span className="font-display text-[10px] font-bold text-foreground">
                                Unit {unit.number}
                              </span>
                              <span className="w-1.5 h-1.5 rounded-full ml-1" style={{ background: statusColors[unit.status] }} />
                            </div>
                            <div className="flex gap-2 text-[8px] font-body text-muted-foreground mt-0.5">
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
                <div className="flex lg:hidden items-center justify-center gap-4 py-2" style={{ borderTop: "1px solid hsl(var(--border) / 0.12)" }}>
                  {(["Available", "Reserved", "Sold"] as UnitStatus[]).map((s) => (
                    <div key={s} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[s] }} />
                      <span className="text-[8px] font-body text-muted-foreground">{s}</span>
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
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
                      <p className="text-[8px] font-body font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: "hsl(var(--steel) / 0.6)" }}>
                        {currentFloor.shortLabel} · Unit Detail
                      </p>
                      <h3 className="font-display text-lg font-bold text-foreground">
                        Unit {selectedUnit.number}
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
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8px] font-body font-semibold tracking-wider uppercase mb-4"
                    style={{
                      background: `${statusColors[selectedUnit.status]}10`,
                      color: statusColors[selectedUnit.status],
                      border: `1px solid ${statusColors[selectedUnit.status]}20`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[selectedUnit.status] }} />
                    {selectedUnit.status}
                  </span>

                  {/* Details */}
                  <div className="space-y-0 mb-5">
                    {[
                      { label: "Unit", value: selectedUnit.number },
                      { label: "Area", value: selectedUnit.area },
                      { label: "Type", value: selectedUnit.type },
                      { label: "Floor", value: currentFloor.label },
                    ].map((item, i) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between py-2.5"
                        style={{ borderBottom: i < 3 ? "1px solid hsl(var(--border) / 0.1)" : "none" }}
                      >
                        <span className="text-[9px] font-body tracking-[0.08em] text-muted-foreground uppercase">
                          {item.label}
                        </span>
                        <span
                          className="text-[11px] font-semibold text-foreground"
                          style={{ fontFamily: item.label === "Area" ? "'Montserrat', sans-serif" : "inherit" }}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Floor description */}
                  <p className="text-[11px] font-body leading-[1.7] mb-5" style={{ color: "hsl(var(--steel))" }}>
                    {currentFloor.description}
                  </p>

                  {/* CTAs */}
                  <div className="space-y-2">
                    <Link
                      to="/contact"
                      className="btn-premium w-full justify-center px-4 py-2 text-[9px] font-body tracking-[0.14em] uppercase"
                    >
                      Inquire About This Unit
                      <ArrowRight size={11} />
                    </Link>
                    <Link
                      to="/available-units"
                      className="btn-outline-dark w-full justify-center px-4 py-2 text-[9px] font-body tracking-[0.14em] uppercase rounded-lg"
                    >
                      View All Units
                      <ArrowRight size={11} />
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
