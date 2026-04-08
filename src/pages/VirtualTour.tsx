import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Building2, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import useSEO from "@/hooks/useSEO";

const mallTours = [
  {
    id: "solaria",
    name: "Solaria Mall",
    link: "/projects/solaria-mall",
    description: "An architectural gem covering 6,400 m² with upscale retail and medical facilities. Take a virtual walkthrough of Solaria Mall's modern design and premium finishes.",
    featured: "pnchRd-AAwg",
    videos: ["5zo6Nh69DoU", "21h59Aidbss", "lDb2srq3prQ", "9xWD4rjaFz4", "PtXQ7ekGibo"],
  },
  {
    id: "arena",
    name: "Arena Mall",
    link: "/projects/arena-mall",
    description: "A modern, mixed-use service mall offering commercial, administrative, and medical units. Explore Arena Mall's strategic location and versatile spaces.",
    featured: "buh9BJmWn9A",
    videos: ["unR4JKFXAXE", "6YWp0lGYC3Q", "JFqUABOPOk8", "kVdnKIBWN2A"],
  },
  {
    id: "mercado",
    name: "Mercado Mall",
    link: "/projects/mercado-mall",
    description: "The largest fully-serviced commercial mall in El Shorouk, spanning three floors. See the scale and potential of Mercado Mall through our video tours.",
    featured: "fHgVO2698Jw",
    videos: ["_QHKwyMozZw", "hUGvrHMnmoY"],
  },
  {
    id: "cityhub",
    name: "City Hub Mall",
    link: "/projects/city-hub-mall",
    description: "A premier commercial development strategically located in front of City Club in Shorouk City. Discover City Hub Mall's prime positioning and modern infrastructure.",
    featured: "9pl-SiE0VVk",
    videos: ["868YMiO0LJc", "82mVbp9nB6U", "VIvmPBqrLnk"],
  },
];

const VirtualTour = () => {
  useSEO(
    "Virtual Tours | Explore ASWAQ Mall Projects in 360°",
    "Take a virtual walkthrough of ASWAQ Developments' mall projects in Shorouk City. Explore Solaria, Arena, Mercado, and City Hub malls through immersive video tours."
  );

  const [activeMall, setActiveMall] = useState("solaria");
  const activeTour = mallTours.find((m) => m.id === activeMall)!;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary pt-40 pb-16 min-h-[450px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary-foreground/60 font-body font-medium tracking-widest uppercase text-sm mb-3">Virtual Tours</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-6">
              Explore Our Malls Virtually
            </h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto">
              Can't visit in person? Take an immersive virtual walkthrough of ASWAQ Developments' four premier mall projects. Experience the scale, design, and potential of each development from anywhere.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mall Selector */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mall tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-primary/10 p-1.5 rounded-full gap-1 flex flex-wrap justify-center">
              {mallTours.map((mall) => (
                <button
                  key={mall.id}
                  onClick={() => setActiveMall(mall.id)}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold font-body transition-all duration-300 ${
                    activeMall === mall.id
                      ? "bg-accent text-accent-foreground shadow-md"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {mall.name}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Video */}
          <motion.div
            key={activeTour.featured}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg border border-border/30 aspect-video max-w-5xl mx-auto">
              <iframe
                src={`https://www.youtube.com/embed/${activeTour.featured}?rel=0`}
                title={`${activeTour.name} Virtual Tour`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>

          {/* Mall description */}
          <motion.div
            key={activeTour.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{activeTour.name}</h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-4">{activeTour.description}</p>
            <Link
              to={activeTour.link}
              className="inline-flex items-center gap-2 text-primary font-body font-semibold text-sm hover:gap-3 transition-all duration-300"
            >
              View Project Details <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* More Videos Grid */}
          {activeTour.videos.length > 0 && (
            <div>
              <h3 className="font-display text-xl font-bold text-foreground text-center mb-8">More Walkthroughs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {activeTour.videos.map((videoId, i) => (
                  <motion.div
                    key={videoId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="rounded-xl overflow-hidden shadow-sm border border-border/30 aspect-video hover:shadow-md transition-shadow duration-300"
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                      title={`${activeTour.name} walkthrough ${i + 2}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* All Malls Overview */}
      <section className="py-12 md:py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-6 w-[60px] h-[2px] bg-foreground" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">All Mall Projects</h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto mb-12">
            Each mall is developed to serve high-density residential areas, ensuring continuous demand for commercial spaces.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mallTours.map((mall, i) => (
              <motion.div
                key={mall.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <button
                  onClick={() => { setActiveMall(mall.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`block w-full p-6 rounded-xl transition-all duration-300 text-center border ${
                    activeMall === mall.id
                      ? "bg-primary text-primary-foreground border-primary shadow-lg"
                      : "bg-background border-border/30 hover:border-secondary/30 hover:shadow-md"
                  }`}
                >
                  <Building2 size={28} className={`mx-auto mb-3 ${activeMall === mall.id ? "text-primary-foreground" : "text-primary"}`} />
                  <p className={`font-display font-bold ${activeMall === mall.id ? "text-primary-foreground" : "text-foreground"}`}>{mall.name}</p>
                  <p className={`text-xs mt-1 font-body ${activeMall === mall.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {mall.videos.length + 1} videos
                  </p>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Visit in Person?"
        subtitle="Schedule a site visit to experience ASWAQ's premium developments firsthand."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </Layout>
  );
};

export default VirtualTour;
