/**
 * Mercado Mall — Floor Plan Data Model
 * Coordinates are in native image pixel space.
 * Unit hotspots can be added incrementally as SVG polygon points.
 */

export type MercadoUnitType = "Retail" | "Medical" | "Administrative" | "F&B" | "Service";
export type MercadoUnitStatus = "Available" | "Reserved" | "Sold";

export interface MercadoFloorUnit {
  id: string;
  number: string;
  area: string;
  type: MercadoUnitType;
  status: MercadoUnitStatus;
  cx: number;
  cy: number;
  points: string;
}

export interface MercadoFloorData {
  id: string;
  label: string;
  shortLabel: string;
  labelAr: string;
  shortLabelAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  viewBoxW: number;
  viewBoxH: number;
  units: MercadoFloorUnit[];
}

import gfImg from "@/assets/floorplans/mercado/GF.png";
import f1Img from "@/assets/floorplans/mercado/1F.png";
import f2Img from "@/assets/floorplans/mercado/2F.png";
import f3Img from "@/assets/floorplans/mercado/3F.png";
import rfImg from "@/assets/floorplans/mercado/RF.png";

/**
 * Floors — images + dimensions.
 * Unit arrays are empty; hotspot polygons will be traced and added later.
 */
export const mercadoFloors: MercadoFloorData[] = [
  {
    id: "gf",
    label: "Ground Floor",
    shortLabel: "GF",
    labelAr: "الطابق الأرضي",
    shortLabelAr: "أرضي",
    description: "Commercial retail units across the ground level.",
    descriptionAr: "وحدات تجارية في الطابق الأرضي.",
    image: gfImg,
    viewBoxW: 1648,
    viewBoxH: 1809,
    units: [],
  },
  {
    id: "1f",
    label: "First Floor",
    shortLabel: "1F",
    labelAr: "الطابق الأول",
    shortLabelAr: "أول",
    description: "Retail and commercial units on the first level.",
    descriptionAr: "وحدات تجارية في الطابق الأول.",
    image: f1Img,
    viewBoxW: 1595,
    viewBoxH: 1754,
    units: [],
  },
  {
    id: "2f",
    label: "Second Floor",
    shortLabel: "2F",
    labelAr: "الطابق الثاني",
    shortLabelAr: "ثاني",
    description: "Medical and administrative units on the second level.",
    descriptionAr: "وحدات طبية وإدارية في الطابق الثاني.",
    image: f2Img,
    viewBoxW: 1443,
    viewBoxH: 1586,
    units: [],
  },
  {
    id: "3f",
    label: "Third Floor",
    shortLabel: "3F",
    labelAr: "الطابق الثالث",
    shortLabelAr: "ثالث",
    description: "Medical and administrative units on the third level.",
    descriptionAr: "وحدات طبية وإدارية في الطابق الثالث.",
    image: f3Img,
    viewBoxW: 1569,
    viewBoxH: 1723,
    units: [],
  },
  {
    id: "rf",
    label: "Roof Floor",
    shortLabel: "RF",
    labelAr: "الروف",
    shortLabelAr: "روف",
    description: "F&B and rooftop spaces.",
    descriptionAr: "وحدات مطاعم ومساحات سطحية.",
    image: rfImg,
    viewBoxW: 1508,
    viewBoxH: 1650,
    units: [],
  },
];
