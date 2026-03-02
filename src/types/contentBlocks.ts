export type ContentBlockType = "text" | "media" | "text_with_media";

export interface TextBlock {
  type: "text";
  text: string;
}

export interface MediaBlock {
  type: "media";
  mediaUrl: string;
  mediaType: "image" | "youtube";
  caption?: string;
}

export interface TextWithMediaBlock {
  type: "text_with_media";
  text: string;
  mediaUrl: string;
  mediaType: "image" | "youtube";
  mediaPosition: "left" | "right";
}

export type ContentBlock = TextBlock | MediaBlock | TextWithMediaBlock;

/** Convert legacy string[] content to ContentBlock[] */
export function normalizeContent(raw: unknown): ContentBlock[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => {
    if (typeof item === "string") {
      return { type: "text", text: item } as TextBlock;
    }
    if (item && typeof item === "object" && "type" in item) {
      return item as ContentBlock;
    }
    return { type: "text", text: String(item) } as TextBlock;
  });
}

/** Convert ContentBlock[] back to legacy string[] for backward compat in hooks */
export function blocksToStringArray(blocks: ContentBlock[]): string[] {
  return blocks
    .filter((b) => b.type === "text")
    .map((b) => (b as TextBlock).text);
}
