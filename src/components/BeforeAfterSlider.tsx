import { useState, useRef, useCallback, useEffect } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}: BeforeAfterSliderProps) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging.current) handleMove(e.clientX);
  }, [handleMove]);
  const handleTouchMove = useCallback((e: TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl select-none ${className}`}
      style={{ boxShadow: "var(--shadow-lg)" }}
      onTouchMove={(e) => handleTouchMove(e.nativeEvent)}
    >
      {/* After image (full) */}
      <img src={afterImage} alt={afterLabel} className="w-full h-full object-cover" draggable={false} />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="w-full h-full object-cover"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%" }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-primary-foreground/80 z-10"
        style={{ left: `${position}%` }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full bg-primary-foreground border-2 border-accent flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ left: `${position}%`, boxShadow: "var(--shadow-lg)" }}
        onMouseDown={handleMouseDown}
        onTouchStart={() => {}}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 8L1 5M4 8L1 11M4 8H12M12 8L15 5M12 8L15 11" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 text-xs font-body font-semibold text-primary-foreground bg-primary/60 backdrop-blur-sm px-3 py-1 rounded-full z-10">
        {beforeLabel}
      </span>
      <span className="absolute top-4 right-4 text-xs font-body font-semibold text-primary-foreground bg-primary/60 backdrop-blur-sm px-3 py-1 rounded-full z-10">
        {afterLabel}
      </span>
    </div>
  );
};

export default BeforeAfterSlider;
