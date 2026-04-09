import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

const TOTAL_FRAMES = 36;
const FRAME_BASE = "/solaria-orbit/frame-";

// Preload all frames
const frameSrcs = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return `${FRAME_BASE}${num}.jpg`;
});

interface SolariaOrbitViewerProps {
  className?: string;
}

const SolariaOrbitViewer = ({ className = "" }: SolariaOrbitViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  // Inertia state
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const dragStartXRef = useRef(0);
  const dragStartFrameRef = useRef(0);

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
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
  }, []);

  const setFrame = useCallback((f: number) => {
    const frame = ((f % TOTAL_FRAMES) + TOTAL_FRAMES) % TOTAL_FRAMES;
    frameRef.current = frame;
    setCurrentFrame(frame);
    drawFrame(frame);
  }, [drawFrame]);

  // Inertia animation loop — smoother decay for premium feel
  useEffect(() => {
    let running = true;
    const decay = 0.94;
    const minVelocity = 0.03;
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

  // Mouse handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    velocityRef.current = 0;
    dragStartXRef.current = e.clientX;
    dragStartFrameRef.current = frameRef.current;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    // Track glow position always
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      setGlowPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }

    if (!isDragging) return;
    if (!container) return;

    const dx = e.clientX - dragStartXRef.current;
    const sensitivity = TOTAL_FRAMES / container.offsetWidth * 0.65;
    const newFrame = dragStartFrameRef.current + Math.round(dx * sensitivity);
    setFrame(newFrame);

    // Track velocity
    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      const moveDx = e.clientX - lastXRef.current;
      velocityRef.current = (moveDx * sensitivity) * (16 / dt);
    }
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
  }, [isDragging, setFrame]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Subtle idle drift — very gentle rotation when not interacting
  useEffect(() => {
    if (!loaded || isDragging || isHovering) return;

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      if (frame % 120 === 0) {
        setFrame(frameRef.current + 1);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [loaded, isDragging, isHovering, setFrame]);

  return (
    <div
      ref={containerRef}
      data-hide-cursor
      className={`relative overflow-hidden select-none ${className}`}
      style={{
        cursor: "none",
        touchAction: "none",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { setIsHovering(false); setIsDragging(false); }}
    >
      {/* Radial glow following mouse */}
      {loaded && isHovering && (
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            opacity: isDragging ? 0.5 : 0.3,
            background: `radial-gradient(ellipse 320px 240px at ${glowPos.x}% ${glowPos.y}%, hsl(40 25% 92% / 0.14), transparent 70%)`,
            transition: 'opacity 0.4s ease',
          }}
        />
      )}
      {/* Canvas renderer */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{
          display: loaded ? "block" : "none",
          imageRendering: "auto",
        }}
      />

      {/* Loading state */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: "hsl(232 30% 12%)" }}>
          <div className="w-48 h-0.5 rounded-full overflow-hidden" style={{ background: "hsl(0 0% 100% / 0.08)" }}>
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

      {/* Drag hint */}
      {loaded && !isDragging && isHovering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        >
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: "hsl(0 0% 0% / 0.35)",
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

      {/* Mobile touch hint */}
      {loaded && !isHovering && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none md:hidden">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: "hsl(0 0% 0% / 0.35)",
              backdropFilter: "blur(12px)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-white/50">
              <path d="M2 8h12M2 8l3-3M2 8l3 3M14 8l-3-3M14 8l-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[9px] font-body tracking-[0.18em] uppercase text-white/50 font-medium">
              Swipe to Explore
            </span>
          </div>
        </div>
      )}

      {/* Frame indicator */}
      {loaded && (isDragging || isHovering) && (
        <div className="absolute top-4 right-4 z-10 pointer-events-none">
          <span
            className="text-[9px] font-['Montserrat'] font-semibold tabular-nums text-white/30 px-2 py-1 rounded"
            style={{ background: "hsl(0 0% 0% / 0.2)", backdropFilter: "blur(8px)" }}
          >
            {String(currentFrame + 1).padStart(2, "0")}/{TOTAL_FRAMES}
          </span>
        </div>
      )}
    </div>
  );
};

export default SolariaOrbitViewer;
