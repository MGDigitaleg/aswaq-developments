import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import cityhubImg from "@/assets/cityhub-mall.jpg";
import mercadoImg from "@/assets/mercado-mall.jpg";
import arenaImg from "@/assets/arena-mall.jpg";
import solariaImg from "@/assets/solaria-mall.jpg";
import heroImg from "@/assets/hero-building.jpg";

const projects = [
  { name: "City Hub Mall", image: cityhubImg, href: "/projects/city-hub-mall" },
  { name: "Mercado Mall", image: mercadoImg, href: "/projects/mercado-mall" },
  { name: "Arena Mall", image: arenaImg, href: "/projects/arena-mall" },
  { name: "Solaria Mall", image: solariaImg, href: "/projects/solaria-mall" },
];

const Projects = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-[200px] md:h-[260px] flex items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Our Projects"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 font-display text-3xl md:text-4xl font-bold text-primary-foreground"
        >
          Our Projects
        </motion.h1>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Top row: 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {projects.slice(0, 3).map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={project.href}
                  className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <div className="relative aspect-[4/3]">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                    <h3 className="absolute bottom-4 left-0 right-0 text-center font-display text-lg md:text-xl font-bold text-primary-foreground">
                      {project.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom row: 1 centered card */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="w-full sm:w-1/2 lg:w-1/3"
            >
              <Link
                to={projects[3].href}
                className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="relative aspect-[4/3]">
                  <img
                    src={projects[3].image}
                    alt={projects[3].name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                  <h3 className="absolute bottom-4 left-0 right-0 text-center font-display text-lg md:text-xl font-bold text-primary-foreground">
                    {projects[3].name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
