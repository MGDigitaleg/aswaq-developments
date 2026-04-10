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
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const pinchRef = useRef<{ dist: number; scale: number } | null>(null);
  const panRef = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (open) {
      setIndex(startIndex);
      setScale(1);
      setTranslate({ x: 0, y: 0 });
    }
  }, [open, startIndex]);

  // Reset zoom when changing images
  useEffect(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, [index]);

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

  const getTouchDist = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch start
      e.preventDefault();
      pinchRef.current = { dist: getTouchDist(e.touches), scale };
      touchStart.current = null; // cancel swipe
    } else if (e.touches.length === 1) {
      if (scale > 1) {
        // Pan start when zoomed
        panRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          tx: translate.x,
          ty: translate.y,
        };
      } else {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }
  }, [scale, translate]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault();
      const newDist = getTouchDist(e.touches);
      const ratio = newDist / pinchRef.current.dist;
      const newScale = Math.min(Math.max(pinchRef.current.scale * ratio, 1), 4);
      setScale(newScale);
      if (newScale === 1) setTranslate({ x: 0, y: 0 });
    } else if (e.touches.length === 1 && panRef.current && scale > 1) {
      const dx = e.touches[0].clientX - panRef.current.x;
      const dy = e.touches[0].clientY - panRef.current.y;
      setTranslate({ x: panRef.current.tx + dx, y: panRef.current.ty + dy });
    }
  }, [scale]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (pinchRef.current) {
      pinchRef.current = null;
      return;
    }
    if (panRef.current) {
      panRef.current = null;
      return;
    }
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (absDx > 50 && absDx > absDy && scale <= 1) {
      if (dx > 0) prev();
      else next();
    }
    touchStart.current = null;
  }, [prev, next, scale]);

  // Double-tap to zoom
  const lastTap = useRef(0);
  const handleDoubleTap = useCallback((e: React.TouchEvent) => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      e.preventDefault();
      if (scale > 1) {
        setScale(1);
        setTranslate({ x: 0, y: 0 });
      } else {
        setScale(2.5);
      }
    }
    lastTap.current = now;
  }, [scale]);

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
              ref={imgRef}
              key={index}
              src={images[index]}
              alt=""
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain touch-none"
              style={{
                boxShadow: "0 30px 80px -20px hsl(0 0% 0% / 0.6)",
                transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
                transition: pinchRef.current || panRef.current ? "none" : "transform 0.2s ease-out",
              }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => { handleDoubleTap(e); handleTouchStart(e); }}
              onTouchMove={handleTouchMove}
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
