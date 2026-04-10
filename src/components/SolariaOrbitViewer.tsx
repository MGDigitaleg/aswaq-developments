import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

const TOTAL_FRAMES = 36;
const FRAME_BASE = "/solaria-orbit/frame-";

const frameSrcs = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return `${FRAME_BASE}${num}.jpg`;
});

interface SolariaOrbitViewerProps {
  className?: string;
  onFrameChange?: (frame: number, isDragging: boolean) => void;
}

const SolariaOrbitViewer = ({ className = "" }: SolariaOrbitViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasAutoRotated, setHasAutoRotated] = useState(false);

  // Refs for drag logic
  const frameRef = useRef(0);
  const dragStartXRef = useRef(0);
  const dragStartFrameRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const autoRotateRef = useRef<number>(0);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    frameSrcs.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        setLoadProgress(loadedCount / TOTAL_FRAMES);
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true);
          drawFrame(0, images);
        }
      };
      images[i] = img;
    });

    imagesRef.current = images;
  }, []);

  const drawFrame = useCallback((index: number, imgs?: HTMLImageElement[]) => {
    const canvas = canvasRef.current;
    const images = imgs || imagesRef.current;
    if (!canvas || !images[index]) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];

    // Set canvas to image dimensions
    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    ctx.drawImage(img, 0, 0);
  }, []);

  const setFrame = useCallback((f: number) => {
    const frame = ((f % TOTAL_FRAMES) + TOTAL_FRAMES) % TOTAL_FRAMES;
    frameRef.current = frame;
    setCurrentFrame(frame);
    drawFrame(frame);
  }, [drawFrame]);

  // Auto-rotate on first load — slow sweep through ~12 frames then stop
  useEffect(() => {
    if (!loaded || hasAutoRotated || isDragging) return;

    const totalSteps = TOTAL_FRAMES;
    let step = 0;

    // Ease-in with very dramatic deceleration at end
    const getInterval = (s: number) => {
      const t = s / totalSteps; // 0→1
      // Quick ramp up, then long cinematic deceleration
      const fast = 50;
      if (t < 0.2) return fast + t / 0.2 * 20; // 50→70ms: fast spin-up
      if (t < 0.5) return 70 + ((t - 0.2) / 0.3) * 80; // 70→150ms: cruising
      // Final 50%: exponential slowdown — building gently settles
      const tail = (t - 0.5) / 0.5; // 0→1 over last half
      const eased = Math.pow(tail, 3); // cubic ease for dramatic drag
      return 150 + eased * 600; // 150ms → 750ms at the very end
    };

    const tick = () => {
      step++;
      setFrame(step);
      if (step >= totalSteps) {
        setHasAutoRotated(true);
        return;
      }
      autoRotateRef.current = window.setTimeout(tick, getInterval(step));
    };

    // Small delay before starting
    autoRotateRef.current = window.setTimeout(tick, 800);

    return () => {
      clearTimeout(autoRotateRef.current);
    };
  }, [loaded, hasAutoRotated, isDragging, setFrame]);

  // Inertia animation — gentle, premium deceleration
  useEffect(() => {
    let running = true;
    const decay = 0.92;
    const minVelocity = 0.04;
    let accum = 0;

    const tick = () => {
      if (!running) return;

      if (!isDragging && Math.abs(velocityRef.current) > minVelocity) {
        velocityRef.current *= decay;
        accum += velocityRef.current;
        const steps = Math.trunc(accum);
        if (steps !== 0) {
          accum -= steps;
          setFrame(frameRef.current + steps);
        }
      } else if (!isDragging) {
        velocityRef.current = 0;
        accum = 0;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [isDragging, setFrame]);

  // Pointer handlers — reduced sensitivity for comfort
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setHasAutoRotated(true); // Stop auto-rotate on interaction
    clearTimeout(autoRotateRef.current);
    velocityRef.current = 0;
    dragStartXRef.current = e.clientX;
    dragStartFrameRef.current = frameRef.current;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const container = containerRef.current;
    if (!container) return;

    const dx = e.clientX - dragStartXRef.current;
    // Lower sensitivity — 0.4 instead of 0.65 for more comfortable feel
    const sensitivity = (TOTAL_FRAMES / container.offsetWidth) * 0.4;
    const newFrame = dragStartFrameRef.current + Math.round(dx * sensitivity);
    setFrame(newFrame);

    // Track velocity for inertia
    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      const moveDx = e.clientX - lastXRef.current;
      velocityRef.current = (moveDx * sensitivity) * (16 / dt);
      // Clamp velocity for comfort
      velocityRef.current = Math.max(-1.5, Math.min(1.5, velocityRef.current));
    }
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
  }, [isDragging, setFrame]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none ${className}`}
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Canvas — object-contain ensures full building is visible */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          display: loaded ? "block" : "none",
          objectFit: "contain",
          imageRendering: "auto",
        }}
      />

      {/* Loading state */}
      {!loaded && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: "hsl(232 30% 12%)" }}
        >
          <div
            className="w-48 h-0.5 rounded-full overflow-hidden"
            style={{ background: "hsl(0 0% 100% / 0.08)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: "hsl(0 0% 100% / 0.4)" }}
              initial={{ width: "0%" }}
              animate={{ width: `${loadProgress * 100}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <p className="text-[10px] font-body tracking-[0.2em] uppercase text-white/25 mt-3">
            Loading Experience
          </p>
        </div>
      )}

      {/* Drag hint — subtle, always visible when loaded */}
      {loaded && !isDragging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        >
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: "hsl(0 0% 0% / 0.3)",
              backdropFilter: "blur(12px)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/50">
              <path d="M2 8h12M2 8l3-3M2 8l3 3M14 8l-3-3M14 8l-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[9px] font-body tracking-[0.18em] uppercase text-white/50 font-medium">
              Drag to Explore
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SolariaOrbitViewer;
