import { motion } from "framer-motion";
import { normalizeContent, type ContentBlock } from "@/types/contentBlocks";

interface Props {
  content: unknown;
  fontClass?: string;
}

const ContentBlockRenderer = ({ content, fontClass = "font-body" }: Props) => {
  const blocks = normalizeContent(content);

  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "text") {
          return (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`${fontClass} text-foreground/80 leading-relaxed mb-6 text-base md:text-lg`}
            >
              {block.text}
            </motion.p>
          );
        }

        if (block.type === "media") {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="mb-8"
            >
              {block.mediaType === "youtube" ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${block.mediaUrl}`}
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ) : (
                <img
                  src={block.mediaUrl}
                  alt={block.caption || ""}
                  className="w-full rounded-xl shadow-lg object-cover"
                  loading="lazy"
                />
              )}
              {block.caption && (
                <p className={`${fontClass} text-muted-foreground text-sm mt-2 text-center`}>
                  {block.caption}
                </p>
              )}
            </motion.div>
          );
        }

        if (block.type === "text_with_media") {
          const mediaFirst = block.mediaPosition === "left";
          const mediaEl = block.mediaType === "youtube" ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${block.mediaUrl}`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ) : (
            <img
              src={block.mediaUrl}
              alt=""
              className="w-full rounded-xl shadow-lg object-cover"
              loading="lazy"
            />
          );

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-8"
            >
              {mediaFirst ? (
                <>
                  <div>{mediaEl}</div>
                  <p className={`${fontClass} text-foreground/80 leading-relaxed text-base md:text-lg`}>
                    {block.text}
                  </p>
                </>
              ) : (
                <>
                  <p className={`${fontClass} text-foreground/80 leading-relaxed text-base md:text-lg`}>
                    {block.text}
                  </p>
                  <div>{mediaEl}</div>
                </>
              )}
            </motion.div>
          );
        }

        return null;
      })}
    </>
  );
};

export default ContentBlockRenderer;
