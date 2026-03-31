import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ImageIcon, Film } from "lucide-react";
import heroImg from "@/assets/hero-building.webp";
import solaria1 from "@/assets/gallery/solaria-1.webp";
import solaria2 from "@/assets/gallery/solaria-2.webp";
import solaria3 from "@/assets/gallery/solaria-3.webp";
import solaria4 from "@/assets/gallery/solaria-4.webp";
import arena1 from "@/assets/gallery/arena-1.webp";
import arena2 from "@/assets/gallery/arena-2.webp";
import mercado1 from "@/assets/gallery/mercado-1.webp";
import cityhub1 from "@/assets/gallery/cityhub-1.webp";
import cityhub2 from "@/assets/gallery/cityhub-2.webp";
import cityhub3 from "@/assets/gallery/cityhub-3.webp";
import cityhub4 from "@/assets/gallery/cityhub-4.webp";

const projectTabs = [
  { id: "solaria", label: "سولاريا مول" },
  { id: "arena", label: "أرينا مول" },
  { id: "mercado", label: "ميركادو مول" },
  { id: "cityhub", label: "سيتي هب مول" },
];

const galleryData: Record<string, { images: string[]; videos: string[] }> = {
  solaria: {
    images: [solaria1, solaria2, solaria3, solaria4],
    videos: [
      "pnchRd-AAwg", "5zo6Nh69DoU", "21h59Aidbss", "lDb2srq3prQ", "9xWD4rjaFz4",
      "PtXQ7ekGibo", "NjbdYDPeErM", "IFGQuVc1Qh4", "boE6pqIItFE", "Xf8AUcMltIQ",
      "Yq2XDpp2UNU", "7_I97gYQrho", "Hqv9KliWT1s", "BrDGv2SxZXI", "Y4lN13Cas5c",
      "vDInqD_HcKU", "cepHBQGE7J0", "9ejGoFF4Jrk", "urvheJNfRdQ", "Z2s5k9hBR5s",
      "lIwPvTA4kl8", "5Vg0nxFPN2s", "giAo0wIirns", "bWMNLhNUWic", "l6kA_Ya2tW8",
      "-vQ52O22iwM", "0SPxL2rY3Dc", "ntpGQTMyq3Q",
    ],
  },
  arena: {
    images: [arena1, arena2],
    videos: ["buh9BJmWn9A", "unR4JKFXAXE", "6YWp0lGYC3Q", "JFqUABOPOk8", "kVdnKIBWN2A"],
  },
  mercado: {
    images: [mercado1],
    videos: ["fHgVO2698Jw", "_QHKwyMozZw", "hUGvrHMnmoY"],
  },
  cityhub: {
    images: [cityhub1, cityhub2, cityhub3, cityhub4],
    videos: ["9pl-SiE0VVk", "868YMiO0LJc", "82mVbp9nB6U", "VIvmPBqrLnk"],
  },
};

const GalleryAr = () => {
  const [activeProject, setActiveProject] = useState("solaria");
  const [activeMedia, setActiveMedia] = useState("images");

  useEffect(() => {
    document.title = "معرض الصور | أسواق للتطوير العقاري";
    const metaDesc = document.querySelector('meta[name="description"]');
    const content = "استكشف صور وفيديوهات مشاريع أسواق للتطوير العقاري في مدينة الشروق بما في ذلك سولاريا مول وأرينا مول وميركادو مول وسيتي هب مول.";
    if (metaDesc) metaDesc.setAttribute("content", content);
  }, []);

  const currentData = galleryData[activeProject];

  return (
    <Layout>
      <section className="relative h-[320px] md:h-[380px] flex items-center justify-center pt-[120px] overflow-hidden">
        <img src={heroImg} alt="معرض صور أسواق" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/70" />
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground text-center px-4">
          معرض الصور
        </motion.h1>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeProject} onValueChange={(v) => { setActiveProject(v); setActiveMedia("images"); }}>
            <div className="flex justify-center mb-10">
              <TabsList className="bg-primary/10 p-1.5 rounded-full gap-1 flex-wrap h-auto">
                {projectTabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} className="rounded-full px-6 py-2.5 text-sm font-semibold font-arabic transition-all data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md data-[state=inactive]:text-foreground/70 data-[state=inactive]:hover:text-foreground">
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {projectTabs.map((project) => (
              <TabsContent key={project.id} value={project.id}>
                <Tabs value={activeMedia} onValueChange={setActiveMedia}>
                  <div className="flex justify-center mb-8">
                    <TabsList className="bg-muted p-1 rounded-lg gap-1 h-auto">
                      <TabsTrigger value="images" className="rounded-md px-5 py-2 text-sm font-medium font-arabic flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <ImageIcon size={16} /> صور
                      </TabsTrigger>
                      <TabsTrigger value="videos" className="rounded-md px-5 py-2 text-sm font-medium font-arabic flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <Film size={16} /> فيديوهات
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="images">
                    {currentData.images.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentData.images.map((src, i) => (
                          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.4 }} className="rounded-xl overflow-hidden shadow-md aspect-[4/3]">
                            <img src={src} alt={`${project.label} صورة ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20">
                        <ImageIcon size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                        <p className="text-muted-foreground font-arabic">الصور قريبًا لـ {project.label}</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="videos">
                    {currentData.videos.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentData.videos.map((videoId, i) => (
                          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.4 }} className="rounded-xl overflow-hidden shadow-md aspect-video">
                            <iframe src={`https://www.youtube.com/embed/${videoId}`} title={`${project.label} فيديو ${i + 1}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20">
                        <Film size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                        <p className="text-muted-foreground font-arabic">الفيديوهات قريبًا لـ {project.label}</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default GalleryAr;
