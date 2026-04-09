/**
 * Solaria Mall — Floor Plan Data Model
 *
 * Each floor has its own architectural plan image and a set of units.
 * Unit overlay coordinates are percentage-based (0-100) relative to image dimensions.
 * This allows responsive mapping regardless of rendered size.
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
  /** Percentage coordinates relative to image (0-100) */
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

/* ========================================================================
   GROUND FLOOR  — Image: 1648 × 1809  — 66 Retail units (01–66)
   ======================================================================== */
const gfUnits: FloorUnit[] = [
  // ── Right wing top row (01–03) ──
  u("gf", "01", "73 m²", "Retail", "Available",   83.5, 20.5, 7.5, 6.5),
  u("gf", "02", "49 m²", "Retail", "Available",   75.5, 20.5, 6.5, 6.5),
  u("gf", "03", "47 m²", "Retail", "Available",   68.5, 20.5, 6.0, 6.5),

  // ── Right wing center (04) ──
  u("gf", "04", "79 m²", "Retail", "Available",   72.0, 28.0, 10.0, 8.0),

  // ── Right wing row (05–09) ──
  u("gf", "05", "49 m²", "Retail", "Available",   72.0, 37.0, 7.0, 5.5),
  u("gf", "06", "50 m²", "Retail", "Available",   72.0, 43.0, 7.0, 5.5),
  u("gf", "07", "56 m²", "Retail", "Available",   84.0, 37.0, 7.0, 5.5),
  u("gf", "08", "49 m²", "Retail", "Available",   72.0, 49.0, 7.0, 5.5),
  u("gf", "09", "40 m²", "Retail", "Available",   84.0, 43.0, 7.0, 5.5),

  // ── Right strip (10–21) ──
  u("gf", "10", "51 m²", "Retail", "Available",   72.0, 55.0, 7.0, 5.0),
  u("gf", "11", "40 m²", "Retail", "Available",   84.0, 49.5, 7.0, 5.0),
  u("gf", "12", "45 m²", "Retail", "Available",   72.0, 60.5, 5.5, 4.5),
  u("gf", "13", "28 m²", "Retail", "Available",   84.0, 55.0, 7.0, 5.0),
  u("gf", "14", "47 m²", "Retail", "Available",   72.0, 65.5, 5.5, 4.5),
  u("gf", "15", "29 m²", "Retail", "Available",   84.0, 60.5, 5.5, 4.5),
  u("gf", "16", "47 m²", "Retail", "Available",   72.0, 70.0, 5.5, 4.5),
  u("gf", "17", "29 m²", "Retail", "Available",   84.0, 65.0, 5.5, 4.5),
  u("gf", "18", "47 m²", "Retail", "Available",   72.0, 74.5, 5.5, 4.5),
  u("gf", "19", "29 m²", "Retail", "Available",   84.0, 70.0, 5.5, 4.5),
  u("gf", "20", "47 m²", "Retail", "Available",   72.0, 79.0, 5.5, 4.5),
  u("gf", "21", "29 m²", "Retail", "Available",   84.0, 74.5, 5.5, 4.5),

  // ── Right bottom (22–28) ──
  u("gf", "22", "68 m²", "Retail", "Available",   72.0, 84.0, 6.5, 5.0),
  u("gf", "23", "43 m²", "Retail", "Available",   84.0, 79.5, 6.5, 5.0),
  u("gf", "24", "64 m²", "Retail", "Available",   72.0, 89.5, 10.0, 6.0),
  u("gf", "25", "77 m²", "Retail", "Available",   78.0, 96.5, 7.5, 5.0),  // not visible – adjusted est.
  u("gf", "26", "75 m²", "Retail", "Available",   78.0, 102.0, 7.5, 5.0), // partially visible
  u("gf", "27", "79 m²", "Retail", "Reserved",    72.0, 96.0, 7.0, 6.0),  // not visible – adjusted est.
  u("gf", "28", "75 m²", "Retail", "Reserved",    80.0, 96.0, 7.0, 6.0),  // not visible – adjusted est.

  // ── Left wing top (29–36) ──
  u("gf", "29", "43 m²", "Retail", "Available",   57.0, 20.5, 6.0, 5.5),
  u("gf", "30", "40 m²", "Retail", "Available",   50.0, 20.5, 6.0, 5.5),
  u("gf", "31", "32 m²", "Retail", "Available",   57.0, 27.0, 5.5, 6.0),
  u("gf", "32", "57 m²", "Retail", "Available",   50.0, 27.0, 5.5, 7.0),
  u("gf", "33", "33 m²", "Retail", "Available",   57.0, 34.0, 5.5, 5.5),
  u("gf", "34", "41 m²", "Retail", "Available",   50.0, 34.5, 5.5, 5.5),
  u("gf", "35", "34 m²", "Retail", "Available",   57.0, 40.0, 5.5, 5.5),
  u("gf", "36", "42 m²", "Retail", "Available",   50.0, 40.5, 5.5, 5.5),

  // ── Left wing mid (37–39) ──
  u("gf", "37", "67 m²", "Retail", "Available",   50.0, 47.0, 11.0, 7.0),
  u("gf", "38", "60 m²", "Retail", "Available",   57.0, 55.0, 5.5, 5.5),
  u("gf", "39", "62 m²", "Retail", "Available",   50.0, 55.0, 5.5, 5.5),

  // ── Center units (40–45) ──
  u("gf", "40", "39 m²", "Retail", "Available",   56.0, 16.5, 6.0, 5.5),
  u("gf", "41", "39 m²", "Retail", "Available",   49.0, 22.0, 6.0, 5.5),
  u("gf", "42", "58 m²", "Retail", "Available",   49.0, 29.0, 6.5, 6.0),
  u("gf", "43", "52 m²", "Retail", "Available",   56.0, 35.5, 6.0, 5.0),
  u("gf", "44", "48 m²", "Retail", "Available",   42.0, 41.5, 6.5, 5.5),
  u("gf", "45", "50 m²", "Retail", "Available",   49.5, 41.5, 6.5, 5.5),

  // ── Left center row (46–56) ──
  u("gf", "46", "49 m²", "Retail", "Available",   56.0, 49.0, 6.5, 5.5),
  u("gf", "47", "51 m²", "Retail", "Available",   49.0, 49.0, 6.0, 5.5),
  u("gf", "48", "46 m²", "Retail", "Available",   43.0, 49.0, 5.5, 5.5),
  u("gf", "49", "49 m²", "Retail", "Available",   36.0, 49.0, 6.0, 5.5),
  u("gf", "50", "49 m²", "Retail", "Available",   42.0, 41.5, 5.5, 5.5),
  u("gf", "51", "51 m²", "Retail", "Available",   35.5, 41.5, 5.5, 5.5),
  u("gf", "52", "49 m²", "Retail", "Available",   28.5, 41.5, 5.5, 5.5),
  u("gf", "53", "45 m²", "Retail", "Available",   22.0, 44.0, 5.5, 5.0),
  u("gf", "54", "48 m²", "Retail", "Available",   22.0, 50.0, 5.5, 5.5),
  u("gf", "55", "102 m²", "Retail", "Available",  35.0, 55.5, 9.0, 8.0),
  u("gf", "56", "51 m²", "Retail", "Available",   28.0, 55.5, 5.5, 5.5),

  // ── Center bottom (57–60) ──
  u("gf", "57", "44 m²", "Retail", "Available",   42.0, 63.5, 6.5, 5.5),
  u("gf", "58", "77 m²", "Retail", "Available",   38.0, 73.0, 7.0, 6.5),
  u("gf", "59", "73 m²", "Retail", "Available",   31.0, 73.0, 6.5, 6.5),
  u("gf", "60", "75 m²", "Retail", "Available",   24.0, 73.0, 6.5, 6.5),

  // ── Far left bottom (61–63) ──
  u("gf", "61", "79 m²", "Retail", "Available",   28.0, 63.0, 7.0, 7.0),
  u("gf", "62", "125 m²", "Retail", "Available",  20.0, 63.0, 7.0, 7.0),
  u("gf", "63", "47 m²", "Retail", "Available",   20.0, 57.5, 6.5, 5.0),

  // ── Bottom wing (64–66) ──
  u("gf", "64", "83 m²", "Retail", "Available",   52.0, 80.0, 10.0, 6.0),
  u("gf", "65", "87 m²", "Retail", "Available",   52.0, 86.5, 10.0, 6.0),
  u("gf", "66", "107 m²", "Retail", "Available",  52.0, 93.0, 10.0, 6.5),
];

/* ========================================================================
   FIRST FLOOR  — Image: 1595 × 1754  — 32 Retail units (101–132)
   ======================================================================== */
const f1Units: FloorUnit[] = [
  // ── Right wing top (101–102) ──
  u("1f", "101", "95 m²", "Retail", "Available",  80.0, 22.0, 8.0, 7.0),
  u("1f", "102", "75 m²", "Retail", "Available",  70.5, 22.0, 8.0, 7.0),

  // ── Right strip (103–110) ──
  u("1f", "103", "57 m²", "Retail", "Available",  85.0, 36.0, 7.0, 5.5),
  u("1f", "104", "53 m²", "Retail", "Available",  85.0, 42.0, 7.0, 5.0),
  u("1f", "105", "53 m²", "Retail", "Available",  85.0, 47.5, 7.0, 5.0),
  u("1f", "106", "53 m²", "Retail", "Available",  85.0, 53.0, 7.0, 5.0),
  u("1f", "107", "53 m²", "Retail", "Available",  85.0, 58.5, 7.0, 5.0),
  u("1f", "108", "53 m²", "Retail", "Available",  85.0, 64.0, 7.0, 5.0),
  u("1f", "109", "53 m²", "Retail", "Available",  85.0, 69.5, 7.0, 5.0),
  u("1f", "110", "77 m²", "Retail", "Available",  85.0, 75.0, 7.0, 5.5),

  // ── Right bottom (111–112) ──
  u("1f", "111", "91 m²", "Retail", "Available",  80.0, 84.0, 8.0, 6.0),
  u("1f", "112", "187 m²", "Retail", "Available", 74.0, 90.0, 10.0, 7.0),

  // ── Left wing upper (113–116) ──
  u("1f", "113", "75 m²", "Retail", "Available",  58.0, 22.0, 8.0, 7.0),
  u("1f", "114", "82 m²", "Retail", "Available",  58.0, 29.5, 8.0, 6.5),
  u("1f", "115", "51 m²", "Retail", "Available",  58.0, 36.5, 8.0, 5.5),
  u("1f", "116", "52 m²", "Retail", "Available",  58.0, 42.5, 8.0, 5.5),

  // ── Left wing mid (117–118) ──
  u("1f", "117", "43 m²", "Retail", "Available",  58.0, 48.5, 6.5, 5.0),
  u("1f", "118", "40 m²", "Retail", "Available",  58.0, 54.0, 6.5, 5.0),

  // ── Center block (119–125) ──
  u("1f", "119", "99 m²", "Retail", "Available",  55.0, 30.0, 9.0, 7.0),
  u("1f", "120", "50 m²", "Retail", "Available",  55.0, 37.5, 7.0, 5.5),
  u("1f", "121", "55 m²", "Retail", "Available",  55.0, 43.5, 7.0, 6.0),
  u("1f", "122", "57 m²", "Retail", "Available",  55.0, 50.0, 7.0, 6.0),
  u("1f", "123", "48 m²", "Retail", "Available",  47.5, 50.0, 6.0, 5.5),
  u("1f", "124", "52 m²", "Retail", "Available",  41.0, 50.0, 6.0, 5.5),
  u("1f", "125", "117 m²", "Retail", "Available", 35.0, 50.0, 8.0, 7.0),

  // ── Bottom left (126–130) ──
  u("1f", "126", "49 m²", "Retail", "Available",  40.0, 58.5, 6.0, 5.0),
  u("1f", "127", "54 m²", "Retail", "Available",  40.0, 64.0, 6.0, 5.5),
  u("1f", "128", "49 m²", "Retail", "Available",  40.0, 70.0, 6.0, 5.0),
  u("1f", "129", "52 m²", "Retail", "Available",  40.0, 75.5, 6.0, 5.5),
  u("1f", "130", "88 m²", "Retail", "Available",  40.0, 81.0, 6.0, 6.0),

  // ── Large anchors (131–132) ──
  u("1f", "131", "250 m²", "Retail", "Available", 25.0, 63.0, 14.0, 12.0),
  u("1f", "132", "276 m²", "Retail", "Available", 42.0, 82.0, 16.0, 12.0),
];

/* ========================================================================
   SECOND FLOOR  — Image: 1443 × 1586  — 36 units
   Admin (orange): 219–222, 231–236  |  Medical (blue): 201–218, 223–230
   ======================================================================== */
const f2Units: FloorUnit[] = [
  // ── Medical right wing top (201–205) ──
  u("2f", "201", "46 m²", "Medical", "Available",    85.0, 20.0, 6.5, 6.0),
  u("2f", "202", "122 m²", "Medical", "Available",   74.0, 14.0, 10.0, 9.0),
  u("2f", "203", "36 m²", "Medical", "Available",    74.0, 28.0, 5.5, 5.0),
  u("2f", "204", "37 m²", "Medical", "Available",    74.0, 33.5, 5.5, 5.0),
  u("2f", "205", "37 m²", "Medical", "Available",    74.0, 39.0, 5.5, 5.0),

  // ── Admin/Medical strip right (206–209) ──
  u("2f", "206", "37 m²", "Administrative", "Available", 74.0, 44.5, 5.5, 5.0),
  u("2f", "207", "37 m²", "Administrative", "Available", 74.0, 50.0, 5.5, 5.0),
  u("2f", "208", "39 m²", "Administrative", "Available", 74.0, 55.5, 5.5, 5.0),
  u("2f", "209", "66 m²", "Medical", "Available",    85.0, 41.0, 7.0, 5.5),

  // ── Medical right strip (210–216) ──
  u("2f", "210", "49 m²", "Medical", "Available",    85.0, 47.0, 7.0, 5.0),
  u("2f", "211", "49 m²", "Medical", "Available",    85.0, 52.5, 7.0, 5.0),
  u("2f", "212", "49 m²", "Medical", "Available",    85.0, 57.5, 7.0, 5.0),
  u("2f", "213", "49 m²", "Medical", "Available",    85.0, 63.0, 7.0, 5.0),
  u("2f", "214", "49 m²", "Medical", "Available",    85.0, 68.5, 7.0, 5.0),
  u("2f", "215", "49 m²", "Administrative", "Available", 85.0, 74.0, 7.0, 5.0),
  u("2f", "216", "69 m²", "Administrative", "Available", 85.0, 79.5, 7.0, 5.5),

  // ── Admin left wing (219–222) ──
  u("2f", "219", "80 m²", "Administrative", "Available", 55.0, 20.0, 8.0, 7.5),
  u("2f", "220", "46 m²", "Administrative", "Available", 55.0, 28.5, 8.0, 6.0),
  u("2f", "221", "38 m²", "Administrative", "Available", 55.0, 35.0, 8.0, 5.5),
  u("2f", "222", "78 m²", "Administrative", "Available", 55.0, 41.0, 8.0, 7.0),

  // ── Medical center block (223–226) ──
  u("2f", "223", "99 m²", "Medical", "Available",    56.0, 26.0, 9.0, 7.0),
  u("2f", "224", "70 m²", "Medical", "Available",    56.0, 34.0, 8.0, 6.5),
  u("2f", "225", "86 m²", "Medical", "Available",    56.0, 41.5, 9.0, 7.0),
  u("2f", "226", "121 m²", "Medical", "Available",   48.0, 49.0, 10.0, 7.5),

  // ── Medical left (227–231) ──
  u("2f", "227", "63 m²", "Medical", "Available",    42.0, 47.5, 6.5, 6.5),
  u("2f", "228", "63 m²", "Medical", "Available",    35.5, 47.5, 6.5, 6.5),
  u("2f", "229", "38 m²", "Medical", "Available",    28.5, 44.5, 6.0, 5.5),
  u("2f", "230", "38 m²", "Medical", "Available",    28.5, 55.5, 6.0, 5.5),
  u("2f", "231", "40 m²", "Administrative", "Available", 28.5, 61.5, 6.0, 5.5),

  // ── Admin bottom (232–236) ──
  u("2f", "232", "43 m²", "Administrative", "Available", 35.0, 73.0, 7.0, 6.0),
  u("2f", "233", "104 m²", "Administrative", "Available", 35.0, 80.0, 9.0, 8.0),
  u("2f", "234", "109 m²", "Administrative", "Available", 20.0, 68.0, 9.0, 8.0),
  u("2f", "235", "74 m²", "Administrative", "Available",  18.0, 60.0, 7.0, 7.0),
  u("2f", "236", "54 m²", "Administrative", "Available",  26.0, 60.0, 6.5, 7.0),
];

/* ========================================================================
   THIRD FLOOR  — Image: 1569 × 1723  — 36 units
   Admin (orange): 304–308, 310–317, 332–336
   Medical (blue): 301–303, 309, 319–322, 323–331
   ======================================================================== */
const f3Units: FloorUnit[] = [
  // ── Medical right wing top (301–303) ──
  u("3f", "301", "46 m²", "Medical", "Available",    85.0, 20.0, 6.5, 6.0),
  u("3f", "302", "122 m²", "Medical", "Available",   74.0, 14.0, 10.0, 9.0),
  u("3f", "303", "36 m²", "Medical", "Available",    74.0, 28.0, 5.5, 5.0),

  // ── Admin strip (304–308) ──
  u("3f", "304", "37 m²", "Administrative", "Available", 74.0, 33.5, 5.5, 5.0),
  u("3f", "305", "37 m²", "Administrative", "Available", 74.0, 39.0, 5.5, 5.0),
  u("3f", "306", "37 m²", "Administrative", "Available", 74.0, 44.5, 5.5, 5.0),
  u("3f", "307", "37 m²", "Administrative", "Available", 74.0, 50.0, 5.5, 5.0),
  u("3f", "308", "39 m²", "Administrative", "Available", 74.0, 55.5, 5.5, 5.0),

  // ── Medical (309) ──
  u("3f", "309", "66 m²", "Medical", "Available",    85.0, 41.0, 7.0, 5.5),

  // ── Admin right strip (310–317) ──
  u("3f", "310", "49 m²", "Administrative", "Available", 85.0, 47.0, 7.0, 5.0),
  u("3f", "311", "49 m²", "Administrative", "Available", 85.0, 52.5, 7.0, 5.0),
  u("3f", "312", "49 m²", "Administrative", "Available", 85.0, 57.5, 7.0, 5.0),
  u("3f", "313", "49 m²", "Administrative", "Available", 85.0, 63.0, 7.0, 5.0),
  u("3f", "314", "49 m²", "Administrative", "Available", 85.0, 68.5, 7.0, 5.0),
  u("3f", "315", "49 m²", "Administrative", "Available", 85.0, 74.0, 7.0, 5.0),
  u("3f", "316", "69 m²", "Administrative", "Available", 85.0, 79.5, 7.0, 5.5),
  u("3f", "317", "55 m²", "Administrative", "Available", 85.0, 85.5, 7.0, 5.0),

  // ── Medical left wing (319–322) ──
  u("3f", "319", "80 m²", "Medical", "Available",    55.0, 20.0, 8.0, 7.5),
  u("3f", "320", "46 m²", "Medical", "Available",    55.0, 28.5, 8.0, 6.0),
  u("3f", "321", "38 m²", "Medical", "Available",    55.0, 35.0, 8.0, 5.5),
  u("3f", "322", "78 m²", "Medical", "Available",    55.0, 41.0, 8.0, 7.0),

  // ── Medical center (323–326) ──
  u("3f", "323", "99 m²", "Medical", "Available",    56.0, 26.0, 9.0, 7.0),
  u("3f", "324", "70 m²", "Medical", "Available",    56.0, 34.0, 8.0, 6.5),
  u("3f", "325", "86 m²", "Medical", "Available",    56.0, 41.5, 9.0, 7.0),
  u("3f", "326", "121 m²", "Medical", "Available",   48.0, 49.0, 10.0, 7.5),

  // ── Medical left (327–331) ──
  u("3f", "327", "63 m²", "Medical", "Available",    42.0, 47.5, 6.5, 6.5),
  u("3f", "328", "63 m²", "Medical", "Available",    35.5, 47.5, 6.5, 6.5),
  u("3f", "329", "38 m²", "Medical", "Available",    28.5, 44.5, 6.0, 5.5),
  u("3f", "330", "38 m²", "Medical", "Available",    28.5, 55.5, 6.0, 5.5),
  u("3f", "331", "40 m²", "Medical", "Available",    28.5, 61.5, 6.0, 5.5),

  // ── Admin bottom (332–336) ──
  u("3f", "332", "43 m²", "Administrative", "Available", 42.0, 73.0, 7.0, 6.0),
  u("3f", "333", "104 m²", "Administrative", "Available", 42.0, 80.0, 9.0, 8.0),
  u("3f", "334", "109 m²", "Administrative", "Available", 25.0, 73.0, 10.0, 8.0),
  u("3f", "335", "74 m²", "Administrative", "Available",  18.0, 60.0, 7.0, 7.0),
  u("3f", "336", "54 m²", "Administrative", "Available",  26.0, 60.0, 6.5, 7.0),
];

/* ========================================================================
   ROOF FLOOR  — Image: 1508 × 1650  — 3 F&B units
   ======================================================================== */
const rfUnits: FloorUnit[] = [
  u("rf", "R1", "148.46 m²", "F&B", "Available", 42.0, 32.0, 14.0, 16.0),
  u("rf", "R2", "59.34 m²", "F&B", "Available",  30.0, 53.0, 7.0, 10.0),
  u("rf", "R3", "28.00 m²", "F&B", "Available",  22.0, 32.0, 5.0, 6.0),
];

/* ─── Floor Definitions ─── */
import gfImg from "@/assets/floorplans/GF_clean.png";
import f1Img from "@/assets/floorplans/1F_clean.png";
import f2Img from "@/assets/floorplans/2F_clean.png";
import f3Img from "@/assets/floorplans/3F_clean.png";
import rfImg from "@/assets/floorplans/RF_clean.png";

export const floors: FloorData[] = [
  {
    id: "gf",
    label: "Ground Floor",
    shortLabel: "GF",
    description: "66 Retail units — Shops, restaurants, and commercial spaces",
    image: gfImg,
    viewBoxW: 1648,
    viewBoxH: 1809,
    units: gfUnits,
  },
  {
    id: "1f",
    label: "First Floor",
    shortLabel: "1F",
    description: "32 Retail units — Shops and anchor stores",
    image: f1Img,
    viewBoxW: 1595,
    viewBoxH: 1754,
    units: f1Units,
  },
  {
    id: "2f",
    label: "Second Floor",
    shortLabel: "2F",
    description: "36 units — Medical clinics and Administrative offices",
    image: f2Img,
    viewBoxW: 1443,
    viewBoxH: 1586,
    units: f2Units,
  },
  {
    id: "3f",
    label: "Third Floor",
    shortLabel: "3F",
    description: "36 units — Medical clinics and Administrative offices",
    image: f3Img,
    viewBoxW: 1569,
    viewBoxH: 1723,
    units: f3Units,
  },
  {
    id: "rf",
    label: "Roof Floor",
    shortLabel: "RF",
    description: "3 F&B units — Restaurants and cafés with rooftop views",
    image: rfImg,
    viewBoxW: 1508,
    viewBoxH: 1650,
    units: rfUnits,
  },
];
