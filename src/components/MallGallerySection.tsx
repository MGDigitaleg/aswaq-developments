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
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-divider mb-6" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            {isAr ? `معرض ${mallName}` : `${mallName} Gallery`}
          </h2>
        </div>

        <Tabs value={activeMedia} onValueChange={setActiveMedia}>
          <div className="flex justify-center mb-10">
            <TabsList className="bg-cream p-1.5 rounded-xl gap-1.5 h-auto border border-border/50">
              <TabsTrigger
                value="images"
                className="rounded-lg px-6 py-2.5 text-sm font-medium font-body flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                <ImageIcon size={16} />
                {isAr ? "صور" : "Images"}
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="rounded-lg px-6 py-2.5 text-sm font-medium font-body flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                <Film size={16} />
                {isAr ? "فيديوهات" : "Videos"}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="images">
            {images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {images.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="rounded-xl overflow-hidden aspect-[4/3] border border-border/30"
                    style={{ boxShadow: 'var(--shadow-md)' }}
                  >
                    <img
                      src={src}
                      alt={`${mallName} image ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
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
                    className="rounded-xl overflow-hidden aspect-video border border-border/30"
                    style={{ boxShadow: 'var(--shadow-md)' }}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`${mallName} video ${i + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      loading="lazy"
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
