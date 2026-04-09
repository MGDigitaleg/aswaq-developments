import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, VolumeX } from "lucide-react";

const SOLARIA_VIDEO = "/videos/solaria-showcase.mp4";
const SOLARIA_POSTER = "/videos/solaria-poster.jpg";

const easeOut = [0.22, 1, 0.36, 1] as const;

const SolariaVideoLightbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const openLightbox = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
  }, []);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((m) => !m);
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !modalVideoRef.current.muted;
    }
  }, []);

  return (
    <>
      {/* ── Preview Card ── */}
      <div
        className="relative overflow-hidden rounded-2xl cursor-pointer group"
        style={{
          aspectRatio: "2.4 / 1",
          boxShadow:
            "0 32px 80px -16px hsl(232 78% 8% / 0.18), 0 12px 28px -8px hsl(232 78% 8% / 0.08)",
        }}
        onClick={openLightbox}
        role="button"
        tabIndex={0}
        aria-label="Play Solaria Mall showcase video"
        onKeyDown={(e) => e.key === "Enter" && openLightbox()}
      >
        {/* Poster image */}
        <img
          src={SOLARIA_POSTER}
          alt="Solaria Mall showcase"
          className="w-full h-full object-cover transition-transform duration-[1.8s] group-hover:scale-[1.04]"
          style={{ willChange: "transform" }}
          loading="lazy"
        />

        {/* Cinematic overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
          style={{
            background: `
              linear-gradient(to right, hsl(232 78% 8% / 0.92) 0%, hsl(232 78% 10% / 0.65) 35%, hsl(232 78% 10% / 0.15) 65%, transparent 100%),
              linear-gradient(to top, hsl(232 78% 8% / 0.4) 0%, transparent 50%)
            `,
          }}
        />

        {/* Play button — centered, architectural */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div
            className="relative flex items-center justify-center"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            <div
              className="w-[72px] h-[72px] md:w-[88px] md:h-[88px] rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-105"
              style={{
                background: "hsl(0 0% 100% / 0.12)",
                backdropFilter: "blur(20px) saturate(1.4)",
                WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                border: "1px solid hsl(0 0% 100% / 0.18)",
                boxShadow:
                  "0 8px 40px hsl(0 0% 0% / 0.25), inset 0 1px 0 hsl(0 0% 100% / 0.08)",
              }}
            >
              <Play
                size={24}
                className="text-white/90 ml-1 transition-transform duration-300 group-hover:scale-110"
                fill="currentColor"
              />
            </div>
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ boxShadow: "0 0 0 12px hsl(0 0% 100% / 0.06)" }}
            />
          </motion.div>
        </div>

        {/* "Watch Showcase" label */}
        <div className="absolute bottom-5 right-5 md:bottom-6 md:right-7 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <span
            className="text-[10px] font-body font-semibold tracking-[0.2em] uppercase text-white/70 px-3 py-1.5 rounded-md"
            style={{
              background: "hsl(0 0% 0% / 0.3)",
              backdropFilter: "blur(12px)",
            }}
          >
            Watch Showcase
          </span>
        </div>
      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            onClick={closeLightbox}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ background: "hsl(232 78% 4% / 0.94)" }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="relative z-10 w-[94vw] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative rounded-xl overflow-hidden"
                style={{
                  aspectRatio: "16 / 9",
                  boxShadow:
                    "0 40px 100px -20px hsl(0 0% 0% / 0.5), 0 0 0 1px hsl(0 0% 100% / 0.06)",
                }}
              >
                <video
                  ref={modalVideoRef}
                  src={SOLARIA_VIDEO}
                  poster={SOLARIA_POSTER}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  controls
                  muted={isMuted}
                  style={{ background: "hsl(232 78% 4%)" }}
                />
              </div>

              <div className="flex items-center justify-between mt-4 px-1">
                <span className="text-[11px] font-body font-medium tracking-[0.1em] uppercase text-white/40">
                  Solaria Mall — Showcase
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white/80 transition-colors duration-200"
                    style={{ background: "hsl(0 0% 100% / 0.06)" }}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                  <button
                    onClick={closeLightbox}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white/80 transition-colors duration-200"
                    style={{ background: "hsl(0 0% 100% / 0.06)" }}
                    aria-label="Close video"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            </motion.div>

            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 md:top-8 md:right-8 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all duration-200"
              style={{
                background: "hsl(0 0% 100% / 0.08)",
                backdropFilter: "blur(12px)",
              }}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SolariaVideoLightbox;
