'use client';

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const sliderImages = [
  { src: "/hero-building.jpg", alt: "Sickingerhof Außenansicht" },
  { src: "/sickingerhof-sued.png", alt: "Gebäudeansicht Süd" },
  { src: "/ansicht-nord.png", alt: "Ansicht Nord" },
  { src: "/sickingerhof.png", alt: "Sickingerhof Perspektive" },
  { src: "/erdgeschoss.png", alt: "Erdgeschoss Visualisierung" },
  { src: "/grundriss-eg.png", alt: "Grundriss Erdgeschoss" },
  { src: "/grundriss-og.png", alt: "Grundriss Obergeschoss" },
  { src: "/grundriss-kg.png", alt: "Grundriss Kellergeschoss" },

  { src: "/og-wohnen.png", alt: "Wohnbereich Obergeschoss" },
  { src: "/og-schlafzimmer.png", alt: "Schlafzimmer Obergeschoss" },
  { src: "/lageplan.png", alt: "Lageplan" },
];

// Duplicate for seamless loop
const images = [...sliderImages, ...sliderImages];

const ImageSliderSection = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);
  const speedRef = useRef(0.35);

  // Touch/drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const dragDelta = useRef(0);
  const lastDragTime = useRef(0);
  const velocityRef = useRef(0);

  const animate = useCallback(() => {
    if (!trackRef.current) return;
    if (!isPaused && !lightboxSrc && !isDragging.current) {
      // Apply velocity decay from drag release
      if (Math.abs(velocityRef.current) > 0.1) {
        posRef.current += velocityRef.current;
        velocityRef.current *= 0.95;
      } else {
        velocityRef.current = 0;
        posRef.current -= speedRef.current;
      }
      const halfWidth = trackRef.current.scrollWidth / 2;
      if (Math.abs(posRef.current) >= halfWidth) {
        posRef.current = posRef.current % halfWidth;
      }
      if (posRef.current > 0) {
        posRef.current -= halfWidth;
      }
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
    }
    animRef.current = requestAnimationFrame(animate);
  }, [isPaused, lightboxSrc]);

  const handleDragStart = useCallback((clientX: number) => {
    isDragging.current = true;
    dragStartX.current = clientX;
    dragStartPos.current = posRef.current;
    dragDelta.current = 0;
    lastDragTime.current = Date.now();
    velocityRef.current = 0;
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging.current || !trackRef.current) return;
    const delta = clientX - dragStartX.current;
    dragDelta.current = delta;
    const now = Date.now();
    const dt = now - lastDragTime.current;
    if (dt > 0) {
      velocityRef.current = (delta - (posRef.current - dragStartPos.current)) / dt * 16;
    }
    lastDragTime.current = now;
    posRef.current = dragStartPos.current + delta;
    const halfWidth = trackRef.current.scrollWidth / 2;
    if (posRef.current > 0) posRef.current -= halfWidth;
    if (Math.abs(posRef.current) >= halfWidth) posRef.current = posRef.current % halfWidth;
    trackRef.current.style.transform = `translateX(${posRef.current}px)`;
  }, []);

  const handleDragEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Mouse drag
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  }, [handleDragStart]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleDragMove(e.clientX);
    const onMouseUp = () => handleDragEnd();
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [handleDragMove, handleDragEnd]);

  // Touch drag
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  }, [handleDragStart]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  }, [handleDragMove]);

  const onTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  useEffect(() => {
    if (lightboxSrc) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxSrc]);

  return (
    <>
      <section
        className="w-full overflow-hidden py-[clamp(2rem,1.5rem+2vw,4rem)] touch-pan-y"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); handleDragEnd(); }}
      >
        <div
          ref={trackRef}
          className="flex gap-4 will-change-transform select-none"
          style={{ width: "max-content" }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              className="h-[280px] md:h-[360px] lg:h-[420px] flex-shrink-0 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing group"
              onClick={() => {
                // Only open lightbox if not dragged
                if (Math.abs(dragDelta.current) < 5) {
                  setLightboxSrc(img.src);
                }
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-auto object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center cursor-pointer"
            onClick={() => setLightboxSrc(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
              onClick={() => setLightboxSrc(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={lightboxSrc}
              alt="Vollbild"
              className="max-w-[92vw] max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageSliderSection;
