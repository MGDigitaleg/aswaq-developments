/**
 * Solaria Mall — Floor Plan Data Model
 *
 * Each floor has its own architectural plan image and a set of units.
 * Unit overlay coordinates are in the image's native pixel space
 * (viewBox matches the image dimensions) for precise alignment.
 *
 * The single source of truth is:  unit number → shape on map → detail panel
 */

/* ─── Types ─── */
export type UnitType = "Retail" | "Medical" | "Administrative" | "F&B" | "Service";
export type UnitStatus = "Available" | "Reserved" | "Sold";

export interface FloorUnit {
  id: string;          // e.g. "gf-01"
  number: string;      // e.g. "01"
  area: string;        // e.g. "73 m²"
  type: UnitType;
  status: UnitStatus;
  /** Pixel coordinates in native image space */
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
  /** Native image dimensions — used as SVG viewBox */
  viewBoxW: number;
  viewBoxH: number;
  units: FloorUnit[];
}

/* ─── Helper ─── */
const u = (
  floor: string,
  number: string,
  area: string,
  type: UnitType,
  status: UnitStatus,
  x: number,
  y: number,
  w: number,
  h: number,
): FloorUnit => ({
  id: `${floor}-${number}`,
  number,
  area,
  type,
  status,
  x, y, w, h,
});

/* ─── Floor images (imported at build time) ─── */
import floorGF from "@/assets/floorplans/GF.png";
import floor1F from "@/assets/floorplans/1F.png";
import floor2F from "@/assets/floorplans/2F.png";
import floor3F from "@/assets/floorplans/3F.png";
import floorRF from "@/assets/floorplans/RF.png";

/* ═══════════════════════════════════════════════════════════════
   GROUND FLOOR — 1920 × 1860  •  66 Retail units
   ═══════════════════════════════════════════════════════════════ */
const gfUnits: FloorUnit[] = [
  // Top-right row: 01–03
  u("gf","01","73 m²","Retail","Available",   1498,130, 173,93),
  u("gf","02","49 m²","Retail","Available",   1325,130, 154,93),
  u("gf","03","47 m²","Retail","Available",   1206,149, 125,84),
  // Right upper large: 04
  u("gf","04","79 m²","Retail","Available",   1248,242, 288,112),
  // Right column pairs: 05–13
  u("gf","05","49 m²","Retail","Available",   1210,391, 154,93),
  u("gf","06","50 m²","Retail","Available",   1210,502, 134,84),
  u("gf","07","56 m²","Retail","Available",   1440,372, 173,130),
  u("gf","08","49 m²","Retail","Available",   1210,595, 154,84),
  u("gf","09","40 m²","Retail","Available",   1440,595, 173,84),
  u("gf","10","51 m²","Retail","Available",   1210,688, 154,84),
  u("gf","11","40 m²","Retail","Available",   1440,688, 173,84),
  u("gf","12","45 m²","Retail","Available",   1210,781, 154,84),
  u("gf","13","28 m²","Retail","Available",   1440,781, 173,84),
  // Right strip: 14–21 (dual column)
  u("gf","14","47 m²","Retail","Reserved",    1210,874, 154,84),
  u("gf","15","29 m²","Retail","Available",   1440,874, 173,84),
  u("gf","16","47 m²","Retail","Available",   1210,967, 154,84),
  u("gf","17","29 m²","Retail","Available",   1440,967, 173,84),
  u("gf","18","47 m²","Retail","Available",   1210,1060, 154,84),
  u("gf","19","29 m²","Retail","Available",   1440,1060, 173,84),
  u("gf","20","47 m²","Retail","Available",   1210,1153, 154,84),
  u("gf","21","29 m²","Retail","Available",   1440,1153, 173,84),
  // Right lower: 22–24
  u("gf","22","68 m²","Retail","Available",   1210,1246, 192,93),
  u("gf","23","43 m²","Retail","Available",   1402,1246, 211,93),
  u("gf","24","64 m²","Retail","Available",   1210,1358, 288,93),
  // Bottom-right: 25–28
  u("gf","25","77 m²","Retail","Available",   1210,1507, 326,102),
  u("gf","26","75 m²","Retail","Reserved",    1210,1618, 326,93),
  u("gf","27","79 m²","Retail","Available",   1210,1730, 173,93),
  u("gf","28","75 m²","Retail","Available",   1382,1730, 173,93),
  // Center-top: 29–36 (paired rows)
  u("gf","29","43 m²","Retail","Available",   998,260, 115,93),
  u("gf","30","40 m²","Retail","Available",   845,260, 134,93),
  u("gf","31","32 m²","Retail","Available",   1018,372, 134,93),
  u("gf","32","57 m²","Retail","Available",   845,372, 154,93),
  u("gf","33","33 m²","Retail","Available",   1018,484, 134,93),
  u("gf","34","41 m²","Retail","Available",   845,484, 154,93),
  u("gf","35","34 m²","Retail","Available",   1018,595, 134,93),
  u("gf","36","42 m²","Retail","Available",   845,595, 154,93),
  // Center: 37–39
  u("gf","37","67 m²","Retail","Available",   979,688, 173,93),
  u("gf","38","60 m²","Retail","Available",   1094,725, 154,93),
  u("gf","39","62 m²","Retail","Available",   1056,725, 115,93),
  // Upper-left: 40–42
  u("gf","40","39 m²","Retail","Available",   749,428, 96,93),
  u("gf","41","39 m²","Retail","Available",   730,539, 106,93),
  u("gf","42","58 m²","Retail","Available",   691,651, 134,112),
  // Center grid: 43–48
  u("gf","43","52 m²","Retail","Available",   960,800, 106,84),
  u("gf","44","48 m²","Retail","Available",   749,818, 115,93),
  u("gf","45","50 m²","Retail","Available",   883,818, 115,93),
  u("gf","46","49 m²","Retail","Available",   1018,874, 106,84),
  u("gf","47","51 m²","Retail","Available",   902,874, 115,84),
  u("gf","48","46 m²","Retail","Available",   806,874, 96,84),
  // Left-center: 49–56
  u("gf","49","49 m²","Retail","Available",   691,949, 115,93),
  u("gf","50","49 m²","Retail","Available",   576,856, 115,93),
  u("gf","51","51 m²","Retail","Available",   499,856, 115,93),
  u("gf","52","49 m²","Retail","Available",   403,818, 125,93),
  u("gf","53","45 m²","Retail","Sold",        499,930, 115,93),
  u("gf","54","48 m²","Retail","Available",   518,986, 115,93),
  u("gf","55","102 m²","Retail","Available",  634,967, 192,130),
  u("gf","56","51 m²","Retail","Available",   518,1042, 115,93),
  // Center-lower: 57
  u("gf","57","44 m²","Retail","Available",   806,1079, 134,93),
  // Bottom-left: 58–63
  u("gf","58","77 m²","Retail","Available",   691,1302, 154,130),
  u("gf","59","73 m²","Retail","Available",   576,1265, 154,130),
  u("gf","60","75 m²","Retail","Available",   461,1321, 154,112),
  u("gf","61","79 m²","Retail","Available",   499,1172, 154,130),
  u("gf","62","125 m²","Retail","Available",  269,1116, 211,205),
  u("gf","63","47 m²","Retail","Available",   442,1023, 115,112),
  // Bottom-center/right: 64–66
  u("gf","64","83 m²","Retail","Available",   922,1321, 192,130),
  u("gf","65","87 m²","Retail","Available",   922,1451, 192,130),
  u("gf","66","107 m²","Retail","Available",  883,1581, 230,149),
];

/* ═══════════════════════════════════════════════════════════════
   FIRST FLOOR — 1920 × 1733  •  32 units
   ═══════════════════════════════════════════════════════════════ */
const f1Units: FloorUnit[] = [
  // Top-right corner: 101–102
  u("1f","101","95 m²","Retail","Available",   1574,173, 115,191),
  u("1f","102","75 m²","Retail","Available",   1306,173, 230,191),
  // Right strip: 103–110
  u("1f","103","57 m²","Retail","Available",   1536,537, 115,104),
  u("1f","104","53 m²","Retail","Available",   1536,650, 115,95),
  u("1f","105","53 m²","Retail","Available",   1536,754, 115,95),
  u("1f","106","53 m²","Retail","Reserved",    1536,858, 115,95),
  u("1f","107","53 m²","Retail","Available",   1536,962, 115,95),
  u("1f","108","53 m²","Retail","Available",   1536,1066, 115,95),
  u("1f","109","53 m²","Retail","Available",   1536,1170, 115,95),
  u("1f","110","77 m²","Retail","Available",   1536,1282, 115,121),
  // Center-left column: 113–118
  u("1f","113","75 m²","Retail","Available",   1018,191, 192,139),
  u("1f","114","82 m²","Retail","Available",   979,347, 211,156),
  u("1f","115","51 m²","Retail","Available",   979,520, 134,104),
  u("1f","116","52 m²","Retail","Available",   979,641, 134,104),
  u("1f","117","43 m²","Retail","Available",   1056,763, 115,87),
  u("1f","118","40 m²","Retail","Sold",        1056,867, 115,87),
  // Center block: 119–121
  u("1f","119","99 m²","Retail","Available",   730,728, 250,173),
  u("1f","120","50 m²","Retail","Available",   710,953, 173,104),
  u("1f","121","55 m²","Retail","Available",   730,815, 154,87),
  // Mid-height row: 122–125
  u("1f","122","57 m²","Retail","Available",   1037,971, 134,87),
  u("1f","123","48 m²","Retail","Available",   902,971, 115,87),
  u("1f","124","52 m²","Retail","Available",   787,971, 115,87),
  u("1f","125","117 m²","Retail","Available",  614,901, 173,121),
  // Left column: 126–130
  u("1f","126","49 m²","Retail","Available",   576,971, 134,104),
  u("1f","127","54 m²","Retail","Available",   595,1092, 134,104),
  u("1f","128","49 m²","Retail","Available",   576,1248, 134,104),
  u("1f","129","52 m²","Retail","Available",   576,1369, 134,104),
  u("1f","130","88 m²","Retail","Available",   595,1491, 173,121),
  // Large units
  u("1f","131","250 m²","Retail","Available",  192,1005, 346,312),
  u("1f","132","276 m²","Retail","Available",  826,1421, 346,225),
  // Bottom-right: 111–112
  u("1f","111","91 m²","Retail","Available",   1536,1421, 154,121),
  u("1f","112","187 m²","Retail","Available",  1382,1560, 250,139),
];

/* ═══════════════════════════════════════════════════════════════
   SECOND FLOOR — 1920 × 1587  •  26 units
   ═══════════════════════════════════════════════════════════════ */
const f2Units: FloorUnit[] = [
  // Top block: 202, 201
  u("2f","202","122 m²","Administrative","Available",  1229,111, 269,190),
  u("2f","201","46 m²","Administrative","Available",   1517,190, 134,127),
  // Center-right strip: 203–208
  u("2f","203","36 m²","Medical","Available",    1286,349, 134,95),
  u("2f","204","37 m²","Medical","Available",    1286,460, 134,95),
  u("2f","205","37 m²","Medical","Available",    1286,571, 134,95),
  u("2f","206","37 m²","Medical","Reserved",     1286,682, 134,87),
  u("2f","207","37 m²","Medical","Available",    1286,778, 134,87),
  u("2f","208","39 m²","Medical","Available",    1286,873, 134,95),
  u("2f","209","66 m²","Administrative","Available",  1459,603, 173,175),
  // Far-right strip: 210–215
  u("2f","210","49 m²","Administrative","Available",  1594,794, 134,79),
  u("2f","211","49 m²","Administrative","Available",  1594,881, 134,79),
  u("2f","212","49 m²","Medical","Available",         1594,968, 134,79),
  u("2f","213","49 m²","Administrative","Available",  1594,1055, 134,79),
  u("2f","214","49 m²","Administrative","Sold",       1594,1143, 134,79),
  u("2f","215","49 m²","Medical","Available",         1594,1230, 134,79),
  // Right lower: 216–218
  u("2f","216","69 m²","Administrative","Available",  1555,1317, 173,95),
  u("2f","217","55 m²","Administrative","Available",  1555,1413, 154,95),
  u("2f","218","221 m²","Medical","Available",        1498,1508, 230,79),
  // Left upper column: 219–222
  u("2f","219","80 m²","Administrative","Available",  960,254, 192,143),
  u("2f","220","46 m²","Administrative","Available",  1018,413, 134,111),
  u("2f","221","38 m²","Medical","Available",         1018,540, 134,95),
  u("2f","222","78 m²","Medical","Available",         1018,651, 154,159),
  // Center block: 223–224
  u("2f","223","39 m²","Administrative","Available",  768,635, 173,143),
  u("2f","224","70 m²","Administrative","Available",  768,794, 173,127),
  // Center-lower block: 225–228
  u("2f","225","86 m²","Administrative","Available",  922,921, 192,127),
  u("2f","226","121 m²","Medical","Available",        922,1063, 230,159),
  u("2f","227","63 m²","Administrative","Reserved",   787,1063, 134,127),
  u("2f","228","63 m²","Administrative","Available",  653,1016, 154,143),
  // Left lower: 229–233
  u("2f","229","38 m²","Medical","Available",         538,968, 115,111),
  u("2f","230","38 m²","Administrative","Available",  672,1159, 115,95),
  u("2f","231","40 m²","Administrative","Available",  730,1254, 125,95),
  u("2f","232","43 m²","Administrative","Available",  730,1349, 134,95),
  u("2f","233","104 m²","Administrative","Available", 691,1444, 173,127),
  // Far left: 234–236
  u("2f","234","108 m²","Administrative","Available", 230,1111, 250,159),
  u("2f","235","74 m²","Medical","Available",         269,921, 230,159),
  u("2f","236","54 m²","Administrative","Available",  384,921, 134,95),
];

/* ═══════════════════════════════════════════════════════════════
   THIRD FLOOR — 1920 × 1727  •  36 units
   ═══════════════════════════════════════════════════════════════ */
const f3Units: FloorUnit[] = [
  // Top-right: 302, 301
  u("3f","302","122 m²","Administrative","Available",  1229,121, 269,207),
  u("3f","301","46 m²","Administrative","Available",   1517,207, 134,138),
  // Right strip: 303–308
  u("3f","303","36 m²","Medical","Available",    1286,380, 134,104),
  u("3f","304","37 m²","Medical","Available",    1286,501, 134,104),
  u("3f","305","37 m²","Medical","Available",    1286,622, 134,104),
  u("3f","306","37 m²","Medical","Reserved",     1286,743, 134,95),
  u("3f","307","37 m²","Medical","Available",    1286,847, 134,95),
  u("3f","308","39 m²","Medical","Available",    1286,950, 134,104),
  u("3f","309","66 m²","Administrative","Available",  1459,657, 173,190),
  // Right column: 310–316
  u("3f","310","49 m²","Administrative","Available",  1594,864, 134,86),
  u("3f","311","49 m²","Administrative","Available",  1594,959, 134,86),
  u("3f","312","49 m²","Medical","Available",         1594,1054, 134,86),
  u("3f","313","49 m²","Administrative","Sold",       1594,1149, 134,86),
  u("3f","314","49 m²","Administrative","Available",  1594,1244, 134,86),
  u("3f","315","49 m²","Medical","Available",         1594,1339, 134,86),
  u("3f","316","89 m²","Administrative","Available",  1555,1434, 173,104),
  // Upper center: 319–322
  u("3f","319","80 m²","Administrative","Available",  960,276, 192,156),
  u("3f","320","46 m²","Administrative","Available",  1018,449, 134,121),
  u("3f","321","38 m²","Medical","Available",         1018,588, 134,104),
  u("3f","322","78 m²","Medical","Available",         1018,709, 154,173),
  // Center: 323–329
  u("3f","323","99 m²","Administrative","Reserved",   768,691, 173,156),
  u("3f","324","70 m²","Administrative","Available",  768,864, 173,138),
  u("3f","325","86 m²","Administrative","Available",  922,1002, 192,138),
  u("3f","326","121 m²","Administrative","Available", 922,1158, 230,173),
  u("3f","327","63 m²","Administrative","Available",  787,1158, 134,138),
  u("3f","328","83 m²","Administrative","Available",  653,1106, 154,156),
  u("3f","329","38 m²","Medical","Available",         538,1054, 115,121),
  // Left-bottom: 330–336
  u("3f","330","38 m²","Administrative","Available",  672,1262, 115,104),
  u("3f","331","40 m²","Administrative","Available",  730,1365, 125,104),
  u("3f","332","43 m²","Administrative","Available",  730,1469, 134,104),
  u("3f","333","104 m²","Administrative","Available", 691,1573, 173,138),
  u("3f","334","108 m²","Administrative","Available", 230,1210, 250,173),
  u("3f","335","34 m²","Medical","Sold",              269,1002, 115,104),
  u("3f","336","54 m²","Administrative","Available",  384,1002, 134,104),
  // Bottom-right: 317–318
  u("3f","317","55 m²","Medical","Available",         1555,1538, 154,104),
  u("3f","318","221 m²","Medical","Available",        1498,1642, 230,86),
];

/* ═══════════════════════════════════════════════════════════════
   ROOF FLOOR — 1920 × 1659  •  4 F&B units
   ═══════════════════════════════════════════════════════════════ */
const rfUnits: FloorUnit[] = [
  u("rf","R-01","29 m²","F&B","Available",   1037,448, 134,100),
  u("rf","R-02","148 m²","F&B","Available",  902,647, 326,282),
  u("rf","R-03","59 m²","F&B","Available",   614,962, 115,232),
  u("rf","R-04","39 m²","F&B","Available",   595,1228, 173,116),
];

/* ═══════════════════════════════════════════════════════════════
   ALL FLOORS
   ═══════════════════════════════════════════════════════════════ */
export const floorsData: FloorData[] = [
  {
    id: "gf",
    label: "Ground Floor",
    shortLabel: "GF",
    description: "Prime retail frontage with direct street access and maximum commercial visibility. 66 units from 26 m² to 125 m².",
    image: floorGF,
    viewBoxW: 1920,
    viewBoxH: 1860,
    units: gfUnits,
  },
  {
    id: "1f",
    label: "First Floor",
    shortLabel: "1F",
    description: "Versatile commercial spaces with dedicated access. Clinics and professional offices. 32 units from 40 m² to 276 m².",
    image: floor1F,
    viewBoxW: 1920,
    viewBoxH: 1733,
    units: f1Units,
  },
  {
    id: "2f",
    label: "Second Floor",
    shortLabel: "2F",
    description: "Mixed-use medical and administrative zone with professional atmosphere and natural light. Units from 12 m² to 108 m².",
    image: floor2F,
    viewBoxW: 1920,
    viewBoxH: 1587,
    units: f2Units,
  },
  {
    id: "3f",
    label: "Third Floor",
    shortLabel: "3F",
    description: "Upper-level administrative and medical suites with panoramic views and premium finishes. Units from 37 m² to 121 m².",
    image: floor3F,
    viewBoxW: 1920,
    viewBoxH: 1727,
    units: f3Units,
  },
  {
    id: "rf",
    label: "Roof Floor",
    shortLabel: "RF",
    description: "Exclusive rooftop spaces with open-air potential — ideal for restaurants, lounges, and premium F&B concepts.",
    image: floorRF,
    viewBoxW: 1920,
    viewBoxH: 1659,
    units: rfUnits,
  },
];

/* ─── Arabic labels ─── */
export const floorLabelsAr: Record<string, { label: string; shortLabel: string; description: string }> = {
  gf:  { label: "الدور الأرضي", shortLabel: "أرضي", description: "واجهات تجارية رئيسية بوصول مباشر من الشارع ورؤية تجارية قصوى. 66 وحدة من 26 م² إلى 125 م²." },
  "1f": { label: "الدور الأول", shortLabel: "أول", description: "مساحات تجارية متعددة الاستخدامات. عيادات ومكاتب مهنية. 32 وحدة من 40 م² إلى 276 م²." },
  "2f": { label: "الدور الثاني", shortLabel: "ثاني", description: "منطقة طبية وإدارية مختلطة بأجواء مهنية وإضاءة طبيعية. وحدات من 12 م² إلى 108 م²." },
  "3f": { label: "الدور الثالث", shortLabel: "ثالث", description: "مكاتب إدارية متميزة وعيادات تخصصية ذات إطلالة بانورامية. وحدات من 28 م² إلى 198 م²." },
  rf:  { label: "الروف", shortLabel: "روف", description: "مساحات حصرية بإطلالات بانورامية وتهوية طبيعية. وحدات من 42 م² إلى 167 م²." },
};

/* ─── Visual config ─── */
export const statusColors: Record<UnitStatus, string> = {
  Available: "hsl(152 55% 40%)",
  Reserved:  "hsl(38 75% 50%)",
  Sold:      "hsl(0 0% 58%)",
};

export const statusFills: Record<UnitStatus, { base: string; hover: string; stroke: string }> = {
  Available: { base: "rgba(46,139,87,0.06)", hover: "rgba(46,139,87,0.22)", stroke: "rgba(46,139,87,0.5)" },
  Reserved:  { base: "rgba(200,165,50,0.06)", hover: "rgba(200,165,50,0.22)", stroke: "rgba(200,165,50,0.5)" },
  Sold:      { base: "rgba(140,140,140,0.06)", hover: "rgba(140,140,140,0.22)", stroke: "rgba(140,140,140,0.5)" },
};
