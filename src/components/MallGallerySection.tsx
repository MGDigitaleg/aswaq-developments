import { useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon, Film } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface MallGallerySectionProps {
  mallName: string;
  images: string[];
  videos: string[];
  lang?: "en" | "ar";
}

const MallGallerySection = ({ mallName, images, videos, lang = "en" }: MallGallerySectionProps) => {
  const [activeMedia, setActiveMedia] = useState("images");
  const isAr = lang === "ar";

  if (images.length === 0 && videos.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground text-center mb-12">
          {isAr ? `معرض ${mallName}` : `${mallName} Gallery`}
        </h2>

        <Tabs value={activeMedia} onValueChange={setActiveMedia}>
          <div className="flex justify-center mb-8">
            <TabsList className="bg-muted p-1 rounded-lg gap-1 h-auto">
              <TabsTrigger
                value="images"
                className="rounded-md px-5 py-2 text-sm font-medium font-body flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <ImageIcon size={16} />
                {isAr ? "صور" : "Images"}
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="rounded-md px-5 py-2 text-sm font-medium font-body flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Film size={16} />
                {isAr ? "فيديوهات" : "Videos"}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="images">
            {images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="rounded-2xl overflow-hidden border border-border/30 aspect-[4/3]"
                    style={{ boxShadow: 'var(--shadow-sm)' }}
                  >
                    <img
                      src={src}
                      alt={`${mallName} image ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <ImageIcon size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                <p className="text-muted-foreground font-body">{isAr ? "الصور قريباً" : "Images coming soon"}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="videos">
            {videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((videoId, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="rounded-2xl overflow-hidden border border-border/30 aspect-video"
                    style={{ boxShadow: 'var(--shadow-sm)' }}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`${mallName} video ${i + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Film size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                <p className="text-muted-foreground font-body">{isAr ? "الفيديوهات قريباً" : "Videos coming soon"}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default MallGallerySection;
