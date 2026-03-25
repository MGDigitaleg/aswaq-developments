import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ImageIcon, Film } from "lucide-react";
import heroImg from "@/assets/hero-building.jpg";
import solaria1 from "@/assets/gallery/solaria-1.jpg";
import solaria2 from "@/assets/gallery/solaria-2.jpg";
import solaria3 from "@/assets/gallery/solaria-3.jpg";
import solaria4 from "@/assets/gallery/solaria-4.jpg";
import arena1 from "@/assets/gallery/arena-1.jpg";
import arena2 from "@/assets/gallery/arena-2.jpg";
import mercado1 from "@/assets/gallery/mercado-1.jpg";
import cityhub1 from "@/assets/gallery/cityhub-1.jpg";
import cityhub2 from "@/assets/gallery/cityhub-2.jpg";
import cityhub3 from "@/assets/gallery/cityhub-3.jpg";
import cityhub4 from "@/assets/gallery/cityhub-4.jpg";

const projectTabs = [
  { id: "solaria", label: "Solaria Mall" },
  { id: "arena", label: "Arena Mall" },
  { id: "mercado", label: "Mercado Mall" },
  { id: "cityhub", label: "City Hub Mall" },
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

const Gallery = () => {
  const [activeProject, setActiveProject] = useState("solaria");
  const [activeMedia, setActiveMedia] = useState("images");

  useEffect(() => {
    document.title = "Gallery | ASWAQ Developments";
    const metaDesc = document.querySelector('meta[name="description"]');
    const content = "Explore photos and videos of ASWAQ Developments projects in Shorouk City including Solaria Mall, Arena Mall, Mercado Mall, and City Hub Mall.";
    if (metaDesc) {
      metaDesc.setAttribute("content", content);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, []);

  const currentData = galleryData[activeProject];

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-[260px] md:h-[340px] flex items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="ASWAQ Developments Gallery"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center px-4"
        >
          <p className="text-accent font-body font-semibold tracking-[0.25em] uppercase text-xs mb-4">Our Portfolio</p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
            Gallery
          </h1>
        </motion.div>
      </section>

      {/* Gallery Content */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Project Tabs */}
          <Tabs value={activeProject} onValueChange={(v) => { setActiveProject(v); setActiveMedia("images"); }}>
            <div className="flex justify-center mb-12">
              <TabsList className="bg-cream p-1.5 rounded-xl gap-1.5 flex-wrap h-auto border border-border/50">
                {projectTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="rounded-lg px-6 py-2.5 text-sm font-semibold font-body transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-foreground/70 data-[state=inactive]:hover:text-foreground"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {projectTabs.map((project) => (
              <TabsContent key={project.id} value={project.id}>
                {/* Images / Videos Sub-tabs */}
                <Tabs value={activeMedia} onValueChange={setActiveMedia}>
                  <div className="flex justify-center mb-10">
                    <TabsList className="bg-cream p-1.5 rounded-xl gap-1.5 h-auto border border-border/50">
                      <TabsTrigger
                        value="images"
                        className="rounded-lg px-6 py-2.5 text-sm font-medium font-body flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                      >
                        <ImageIcon size={16} />
                        Images
                      </TabsTrigger>
                      <TabsTrigger
                        value="videos"
                        className="rounded-lg px-6 py-2.5 text-sm font-medium font-body flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                      >
                        <Film size={16} />
                        Videos
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="images">
                    {currentData.images.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {currentData.images.map((src, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.4 }}
                            className="rounded-xl overflow-hidden aspect-[4/3] border border-border/30"
                            style={{ boxShadow: 'var(--shadow-md)' }}
                          >
                            <img
                              src={src}
                              alt={`${project.label} image ${i + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                              loading="lazy"
                            />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20">
                        <ImageIcon size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                        <p className="text-muted-foreground font-body">Images coming soon for {project.label}</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="videos">
                    {currentData.videos.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentData.videos.map((videoId, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.4 }}
                            className="rounded-xl overflow-hidden aspect-video border border-border/30"
                            style={{ boxShadow: 'var(--shadow-md)' }}
                          >
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}`}
                              title={`${project.label} video ${i + 1}`}
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
                        <p className="text-muted-foreground font-body">Videos coming soon for {project.label}</p>
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

export default Gallery;
