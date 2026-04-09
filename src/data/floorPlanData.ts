/**
 * Solaria Mall — Floor Plan Data Model
 *
 * Coordinates are in native image pixel space.
 * The SVG viewBox matches image dimensions for pixel-perfect overlay alignment.
 * Coordinates were extracted via automated boundary detection on the source floor plans.
 */

/* ─── Types ─── */
export type UnitType = "Retail" | "Medical" | "Administrative" | "F&B" | "Service";
export type UnitStatus = "Available" | "Reserved" | "Sold";

export interface FloorUnit {
  id: string;
  number: string;
  area: string;
  type: UnitType;
  status: UnitStatus;
  /** Pixel coordinates in native image space (viewBox) */
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface FloorData {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  image: string;
  viewBoxW: number;
  viewBoxH: number;
  units: FloorUnit[];
}

/* ─── Helper ─── */
const u = (
  floor: string, number: string, area: string,
  type: UnitType, status: UnitStatus,
  x: number, y: number, w: number, h: number,
): FloorUnit => ({ id: `${floor}-${number}`, number, area, type, status, x, y, w, h });

/* ========================================================================
   GROUND FLOOR — 1648 × 1809 — 66 Retail units
   Coordinates from automated boundary detection on GF_clean.png
   ======================================================================== */
const gfUnits: FloorUnit[] = [
  // ── Right wing top row (01–03) ──
  u("gf","01","73 m²","Retail","Available",   1415,265, 130,128),
  u("gf","02","49 m²","Retail","Available",   1318,265, 90,128),
  u("gf","03","47 m²","Retail","Available",   1130,285, 62,110),

  // ── Right wing center (04) ──
  u("gf","04","79 m²","Retail","Available",   1370,410, 140,120),

  // ── Right east strip (05–28) ──
  u("gf","05","49 m²","Retail","Available",   1320,607, 125,60),
  u("gf","06","50 m²","Retail","Available",   1320,678, 125,60),
  u("gf","07","56 m²","Retail","Available",   1455,570, 100,100),
  u("gf","08","49 m²","Retail","Available",   1320,748, 125,63),
  u("gf","09","40 m²","Retail","Available",   1455,748, 100,63),
  u("gf","10","51 m²","Retail","Available",   1349,817, 124,58),
  u("gf","11","40 m²","Retail","Available",   1483,817, 74,60),
  u("gf","12","45 m²","Retail","Available",   1349,886, 124,60),
  u("gf","13","28 m²","Retail","Available",   1483,886, 74,60),
  u("gf","14","47 m²","Retail","Available",   1349,956, 124,58),
  u("gf","15","29 m²","Retail","Available",   1483,956, 74,58),
  u("gf","16","47 m²","Retail","Available",   1349,1025, 80,58),
  u("gf","17","29 m²","Retail","Available",   1435,1025, 55,58),
  u("gf","18","47 m²","Retail","Available",   1349,1094, 124,58),
  u("gf","19","29 m²","Retail","Available",   1483,1094, 74,58),
  u("gf","20","47 m²","Retail","Available",   1349,1164, 124,90),
  u("gf","21","29 m²","Retail","Available",   1483,1164, 74,90),
  u("gf","22","68 m²","Retail","Available",   1349,1264, 109,88),
  u("gf","23","43 m²","Retail","Available",   1467,1264, 90,88),
  u("gf","24","64 m²","Retail","Available",   1349,1370, 160,60),
  u("gf","25","77 m²","Retail","Available",   1349,1441, 100,58),
  u("gf","26","75 m²","Retail","Available",   1456,1444, 98,55),
  u("gf","27","79 m²","Retail","Reserved",    1349,1511, 97,55),
  u("gf","28","75 m²","Retail","Reserved",    1458,1511, 95,55),

  // ── Left wing top (29–36) ──
  u("gf","29","43 m²","Retail","Available",   1063,285, 62,110),
  u("gf","30","40 m²","Retail","Available",   994,358, 62,100),
  u("gf","31","32 m²","Retail","Available",   994,470, 104,58),
  u("gf","32","57 m²","Retail","Available",   994,539, 104,63),
  u("gf","33","33 m²","Retail","Available",   994,611, 93,56),
  u("gf","34","41 m²","Retail","Available",   1104,611, 86,56),
  u("gf","35","34 m²","Retail","Available",   998,678, 93,56),
  u("gf","36","42 m²","Retail","Available",   1100,678, 90,56),

  // ── Left wing mid (37–39) ──
  u("gf","37","67 m²","Retail","Available",   1032,678, 88,128),
  u("gf","38","60 m²","Retail","Available",   1132,678, 58,126),
  u("gf","39","62 m²","Retail","Available",   1240,918, 55,128),

  // ── Center units (40–42) ──
  u("gf","40","39 m²","Retail","Available",   827,459, 72,79),
  u("gf","41","39 m²","Retail","Available",   1385,540, 60,55),
  u("gf","42","58 m²","Retail","Available",   1206,175, 78,70),

  // ── Center-left cluster (43–56) ──
  u("gf","43","52 m²","Retail","Available",   786,812, 57,132),
  u("gf","44","48 m²","Retail","Available",   866,747, 75,56),
  u("gf","45","50 m²","Retail","Available",   854,815, 61,60),
  u("gf","46","49 m²","Retail","Available",   648,1025, 71,55),
  u("gf","47","51 m²","Retail","Available",   648,886, 60,128),
  u("gf","48","46 m²","Retail","Available",   854,956, 60,39),
  u("gf","49","49 m²","Retail","Available",   509,955, 128,58),
  u("gf","50","49 m²","Retail","Available",   509,886, 128,58),
  u("gf","51","51 m²","Retail","Available",   719,886, 59,127),
  u("gf","52","49 m²","Retail","Available",   785,747, 72,58),
  u("gf","53","45 m²","Retail","Available",   340,960, 72,75),
  u("gf","54","48 m²","Retail","Available",   507,1023, 76,57),
  u("gf","55","102 m²","Retail","Available",  579,1091, 125,130),
  u("gf","56","51 m²","Retail","Available",   509,1091, 58,61),

  // ── Center-left bottom (57–63) ──
  u("gf","57","44 m²","Retail","Available",   926,955, 58,128),
  u("gf","58","77 m²","Retail","Available",   646,1372, 58,197),
  u("gf","59","73 m²","Retail","Available",   509,1370, 58,199),
  u("gf","60","75 m²","Retail","Available",   578,1372, 56,197),
  u("gf","61","79 m²","Retail","Available",   334,1233, 93,138),
  u("gf","62","125 m²","Retail","Available",  231,1140, 91,229),
  u("gf","63","47 m²","Retail","Available",   334,1140, 93,81),

  // ── Bottom wing (64–66) ──
  u("gf","64","83 m²","Retail","Available",   780,1434, 203,67),
  u("gf","65","87 m²","Retail","Available",   780,1509, 203,76),
  u("gf","66","107 m²","Retail","Available",  780,1593, 203,88),
];

/* ========================================================================
   FIRST FLOOR — 1595 × 1754 — 32 Retail units
   ======================================================================== */
const f1Units: FloorUnit[] = [
  u("1f","101","95 m²","Retail","Available",   1280,265, 150,130),
  u("1f","102","75 m²","Retail","Available",   1100,265, 150,130),
  u("1f","103","57 m²","Retail","Available",   1350,430, 110,60),
  u("1f","104","53 m²","Retail","Available",   1350,500, 110,55),
  u("1f","105","53 m²","Retail","Available",   1350,565, 110,55),
  u("1f","106","53 m²","Retail","Available",   1350,630, 110,55),
  u("1f","107","53 m²","Retail","Available",   1350,695, 110,55),
  u("1f","108","53 m²","Retail","Available",   1350,760, 110,55),
  u("1f","109","53 m²","Retail","Available",   1350,825, 110,55),
  u("1f","110","77 m²","Retail","Available",   1350,890, 110,70),
  u("1f","111","91 m²","Retail","Available",   1280,1000, 150,100),
  u("1f","112","187 m²","Retail","Available",  1180,1100, 180,130),
  u("1f","113","75 m²","Retail","Available",   900,265, 150,100),
  u("1f","114","82 m²","Retail","Available",   900,375, 130,90),
  u("1f","115","51 m²","Retail","Available",   900,475, 130,70),
  u("1f","116","52 m²","Retail","Available",   900,555, 130,70),
  u("1f","117","43 m²","Retail","Available",   900,635, 100,60),
  u("1f","118","40 m²","Retail","Available",   900,705, 100,60),
  u("1f","119","99 m²","Retail","Available",   850,430, 160,110),
  u("1f","120","50 m²","Retail","Available",   850,550, 130,70),
  u("1f","121","55 m²","Retail","Available",   850,630, 130,75),
  u("1f","122","57 m²","Retail","Available",   850,715, 130,75),
  u("1f","123","48 m²","Retail","Available",   720,715, 120,70),
  u("1f","124","52 m²","Retail","Available",   590,715, 120,70),
  u("1f","125","117 m²","Retail","Available",  500,715, 150,100),
  u("1f","126","49 m²","Retail","Available",   600,830, 100,65),
  u("1f","127","54 m²","Retail","Available",   600,905, 100,70),
  u("1f","128","49 m²","Retail","Available",   600,985, 100,65),
  u("1f","129","52 m²","Retail","Available",   600,1060, 100,70),
  u("1f","130","88 m²","Retail","Available",   600,1140, 100,85),
  u("1f","131","250 m²","Retail","Available",  350,930, 230,200),
  u("1f","132","276 m²","Retail","Available",  600,1280, 280,200),
];

/* ========================================================================
   SECOND FLOOR — 1443 × 1586 — 36 units (Medical + Administrative)
   ======================================================================== */
const f2Units: FloorUnit[] = [
  u("2f","201","46 m²","Medical","Available",      1280,240, 100,100),
  u("2f","202","122 m²","Medical","Available",     1100,170, 170,150),
  u("2f","203","36 m²","Medical","Available",      1100,350, 90,70),
  u("2f","204","37 m²","Medical","Available",      1100,430, 90,70),
  u("2f","205","37 m²","Medical","Available",      1100,510, 90,70),
  u("2f","206","37 m²","Administrative","Available",1100,590, 90,70),
  u("2f","207","37 m²","Administrative","Available",1100,670, 90,70),
  u("2f","208","39 m²","Administrative","Available",1100,750, 90,70),
  u("2f","209","66 m²","Medical","Available",      1280,530, 110,80),
  u("2f","210","49 m²","Medical","Available",      1280,620, 110,60),
  u("2f","211","49 m²","Medical","Available",      1280,690, 110,60),
  u("2f","212","49 m²","Medical","Available",      1280,760, 110,60),
  u("2f","213","49 m²","Medical","Available",      1280,830, 110,60),
  u("2f","214","49 m²","Medical","Available",      1280,900, 110,60),
  u("2f","215","49 m²","Administrative","Available",1280,970, 110,60),
  u("2f","216","69 m²","Administrative","Available",1280,1040, 110,75),
  u("2f","219","80 m²","Administrative","Available",780,250, 130,120),
  u("2f","220","46 m²","Administrative","Available",780,380, 130,90),
  u("2f","221","38 m²","Administrative","Available",780,480, 130,70),
  u("2f","222","78 m²","Administrative","Available",780,560, 130,110),
  u("2f","223","99 m²","Medical","Available",      830,350, 150,110),
  u("2f","224","70 m²","Medical","Available",      830,470, 140,100),
  u("2f","225","86 m²","Medical","Available",      830,580, 150,110),
  u("2f","226","121 m²","Medical","Available",     700,700, 170,120),
  u("2f","227","63 m²","Medical","Available",      600,650, 100,100),
  u("2f","228","63 m²","Medical","Available",      490,650, 100,100),
  u("2f","229","38 m²","Medical","Available",      380,600, 95,85),
  u("2f","230","38 m²","Medical","Available",      380,760, 95,85),
  u("2f","231","40 m²","Administrative","Available",380,855, 95,85),
  u("2f","232","43 m²","Administrative","Available",480,1020, 110,90),
  u("2f","233","104 m²","Administrative","Available",480,1120, 150,130),
  u("2f","234","109 m²","Administrative","Available",260,950, 150,130),
  u("2f","235","74 m²","Administrative","Available",230,830, 110,110),
  u("2f","236","54 m²","Administrative","Available",350,830, 100,110),
];

/* ========================================================================
   THIRD FLOOR — 1569 × 1723 — 36 units (Medical + Administrative)
   ======================================================================== */
const f3Units: FloorUnit[] = [
  u("3f","301","46 m²","Medical","Available",      1330,250, 100,100),
  u("3f","302","122 m²","Medical","Available",     1150,180, 170,150),
  u("3f","303","36 m²","Medical","Available",      1150,360, 90,70),
  u("3f","304","37 m²","Administrative","Available",1150,440, 90,70),
  u("3f","305","37 m²","Administrative","Available",1150,520, 90,70),
  u("3f","306","37 m²","Administrative","Available",1150,600, 90,70),
  u("3f","307","37 m²","Administrative","Available",1150,680, 90,70),
  u("3f","308","39 m²","Administrative","Available",1150,760, 90,70),
  u("3f","309","66 m²","Medical","Available",      1330,540, 110,80),
  u("3f","310","49 m²","Administrative","Available",1330,630, 110,60),
  u("3f","311","49 m²","Administrative","Available",1330,700, 110,60),
  u("3f","312","49 m²","Administrative","Available",1330,770, 110,60),
  u("3f","313","49 m²","Administrative","Available",1330,840, 110,60),
  u("3f","314","49 m²","Administrative","Available",1330,910, 110,60),
  u("3f","315","49 m²","Administrative","Available",1330,980, 110,60),
  u("3f","316","69 m²","Administrative","Available",1330,1050, 110,75),
  u("3f","317","55 m²","Administrative","Available",1330,1135, 110,70),
  u("3f","319","80 m²","Medical","Available",      830,260, 130,120),
  u("3f","320","46 m²","Medical","Available",      830,390, 130,90),
  u("3f","321","38 m²","Medical","Available",      830,490, 130,70),
  u("3f","322","78 m²","Medical","Available",      830,570, 130,110),
  u("3f","323","99 m²","Medical","Available",      880,360, 150,110),
  u("3f","324","70 m²","Medical","Available",      880,480, 140,100),
  u("3f","325","86 m²","Medical","Available",      880,590, 150,110),
  u("3f","326","121 m²","Medical","Available",     750,710, 170,120),
  u("3f","327","63 m²","Medical","Available",      650,660, 100,100),
  u("3f","328","63 m²","Medical","Available",      540,660, 100,100),
  u("3f","329","38 m²","Medical","Available",      430,610, 95,85),
  u("3f","330","38 m²","Medical","Available",      430,770, 95,85),
  u("3f","331","40 m²","Medical","Available",      430,865, 95,85),
  u("3f","332","43 m²","Administrative","Available",630,1030, 110,90),
  u("3f","333","104 m²","Administrative","Available",630,1130, 150,130),
  u("3f","334","109 m²","Administrative","Available",350,1000, 170,140),
  u("3f","335","74 m²","Administrative","Available",260,830, 120,120),
  u("3f","336","54 m²","Administrative","Available",390,830, 110,120),
];

/* ========================================================================
   ROOF FLOOR — 1508 × 1650 — 3 F&B units
   ======================================================================== */
const rfUnits: FloorUnit[] = [
  u("rf","R1","148.46 m²","F&B","Available", 680,440, 230,260),
  u("rf","R2","59.34 m²","F&B","Available",  470,830, 120,160),
  u("rf","R3","28.00 m²","F&B","Available",  350,440, 80,100),
];

/* ─── Compatibility aliases ─── */
export const floorLabelsAr: Record<string, { label: string; shortLabel: string; description: string }> = {
  gf: { label: "الطابق الأرضي", shortLabel: "أرضي", description: "66 وحدة تجارية" },
  "1f": { label: "الطابق الأول", shortLabel: "أول", description: "32 وحدة تجارية" },
  "2f": { label: "الطابق الثاني", shortLabel: "ثاني", description: "36 وحدة طبية وإدارية" },
  "3f": { label: "الطابق الثالث", shortLabel: "ثالث", description: "36 وحدة طبية وإدارية" },
  rf: { label: "الروف", shortLabel: "روف", description: "3 وحدات مطاعم" },
};

export const statusColors: Record<UnitStatus, string> = {
  Available: "#22c55e",
  Reserved: "#eab308",
  Sold: "#ef4444",
};

export const statusFills: Record<UnitStatus, { base: string; hover: string; stroke: string }> = {
  Available: { base: "rgba(34,197,94,0.18)", hover: "rgba(34,197,94,0.45)", stroke: "#22c55e" },
  Reserved: { base: "rgba(234,179,8,0.18)", hover: "rgba(234,179,8,0.45)", stroke: "#eab308" },
  Sold: { base: "rgba(239,68,68,0.18)", hover: "rgba(239,68,68,0.45)", stroke: "#ef4444" },
};

/* ─── Floor Definitions ─── */
import gfImg from "@/assets/floorplans/GF_clean.png";
import f1Img from "@/assets/floorplans/1F_clean.png";
import f2Img from "@/assets/floorplans/2F_clean.png";
import f3Img from "@/assets/floorplans/3F_clean.png";
import rfImg from "@/assets/floorplans/RF_clean.png";

export const floors: FloorData[] = [
  {
    id: "gf", label: "Ground Floor", shortLabel: "GF",
    description: "66 Retail units — Shops, restaurants, and commercial spaces",
    image: gfImg, viewBoxW: 1648, viewBoxH: 1809, units: gfUnits,
  },
  {
    id: "1f", label: "First Floor", shortLabel: "1F",
    description: "32 Retail units — Shops and anchor stores",
    image: f1Img, viewBoxW: 1595, viewBoxH: 1754, units: f1Units,
  },
  {
    id: "2f", label: "Second Floor", shortLabel: "2F",
    description: "36 units — Medical clinics and Administrative offices",
    image: f2Img, viewBoxW: 1443, viewBoxH: 1586, units: f2Units,
  },
  {
    id: "3f", label: "Third Floor", shortLabel: "3F",
    description: "36 units — Medical clinics and Administrative offices",
    image: f3Img, viewBoxW: 1569, viewBoxH: 1723, units: f3Units,
  },
  {
    id: "rf", label: "Roof Floor", shortLabel: "RF",
    description: "3 F&B units — Restaurants and cafés with rooftop views",
    image: rfImg, viewBoxW: 1508, viewBoxH: 1650, units: rfUnits,
  },
];

export const floorsData = floors;
