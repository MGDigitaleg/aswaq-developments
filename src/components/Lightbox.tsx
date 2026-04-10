import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface LightboxProps {
  images: string[];
  open: boolean;
  startIndex?: number;
  onClose: () => void;
}

const Lightbox = ({ images, open, startIndex = 0, onClose }: LightboxProps) => {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose, prev, next]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Swipe gesture support
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (absDx > 50 && absDx > absDy) {
      if (dx > 0) prev();
      else next();
    }
    touchStart.current = null;
  }, [prev, next]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "hsl(var(--primary) / 0.92)", backdropFilter: "blur(20px)" }}
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/15 text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground md:right-6 md:top-6"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <span className="absolute left-4 top-5 text-[11px] font-body font-semibold tracking-[0.2em] text-primary-foreground/40 md:left-6 md:top-6">
            {index + 1} / {images.length}
          </span>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary-foreground/15 text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground md:left-6"
              aria-label="Previous"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary-foreground/15 text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground md:right-6"
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={images[index]}
              alt=""
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
              style={{ boxShadow: "0 30px 80px -20px hsl(0 0% 0% / 0.6)" }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              draggable={false}
            />
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
