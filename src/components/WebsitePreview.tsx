"use client";

import { useRef } from "react";
import { type Feedback } from "@/lib/supabase";

type Props = {
  previewUrl: string;
  feedbacks: Feedback[];
  commentMode: boolean;
  newPin: { x: number; y: number } | null;
  activePin: string | null;
  onPreviewClick: (x: number, y: number) => void;
  onPinClick: (id: string) => void;
};

const STATUS_COLORS = {
  open: "#EF4444",
  in_progress: "#F59E0B",
  done: "#22C55E",
};

// Tall enough for most websites — pins are stored as % of this height
const PAGE_HEIGHT = 8000;

export function WebsitePreview({
  previewUrl,
  feedbacks,
  commentMode,
  newPin,
  activePin,
  onPreviewClick,
  onPinClick,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!commentMode) return;
    const inner = e.currentTarget;
    const rect = inner.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / inner.clientWidth) * 100;
    const scrollTop = scrollRef.current?.scrollTop || 0;
    const y = ((e.clientY - rect.top + scrollTop) / PAGE_HEIGHT) * 100;
    onPreviewClick(x, y);
  };

  const pinsWithNumbers = feedbacks.filter((f) => f.pin_x && f.pin_y);

  return (
    <div
      ref={scrollRef}
      className="w-full h-full bg-surface-secondary overflow-auto"
    >
      <div
        className="relative"
        style={{ height: `${PAGE_HEIGHT}px`, width: "100%" }}
      >
        {/* iFrame — no internal scrolling, pointer-events disabled */}
        <iframe
          src={previewUrl}
          className="w-full border-0 pointer-events-none"
          style={{ height: `${PAGE_HEIGHT}px` }}
          scrolling="no"
          title="Website Preview"
        />

        {/* Clickable overlay in comment mode */}
        {commentMode && (
          <div
            className="absolute inset-0 cursor-crosshair z-10"
            onClick={handleOverlayClick}
          />
        )}

        {/* Existing Pins — scroll with content */}
        {pinsWithNumbers.map((fb, i) => (
          <PinMarker
            key={fb.id}
            x={fb.pin_x!}
            y={fb.pin_y!}
            number={i + 1}
            status={fb.status}
            isActive={activePin === fb.id}
            onClick={() => onPinClick(fb.id)}
          />
        ))}

        {/* New Pin (being placed) */}
        {newPin && (
          <div
            className="absolute z-20 pointer-events-none"
            style={{
              left: `${newPin.x}%`,
              top: `${newPin.y}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="w-6 h-6 rounded-full bg-accent border-2 border-white shadow-lg flex items-center justify-center animate-bounce">
              <span className="text-white text-[10px] font-bold">+</span>
            </div>
          </div>
        )}

        {/* Comment Mode Indicator */}
        {commentMode && (
          <div className="sticky top-3 z-20 flex justify-center pointer-events-none">
            <div className="bg-accent text-white px-4 py-1.5 rounded-full text-xs font-headline uppercase tracking-wider shadow-lg">
              Klicke auf die Stelle, die du kommentieren willst
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PinMarker({
  x,
  y,
  number,
  status,
  isActive,
  onClick,
}: {
  x: number;
  y: number;
  number: number;
  status: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const color = STATUS_COLORS[status as keyof typeof STATUS_COLORS] || "#FF5C00";

  return (
    <div
      className="absolute z-10 cursor-pointer transition-transform"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -100%) scale(${isActive ? 1.2 : 1})`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div
        className="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <span className="text-white text-[10px] font-bold">{number}</span>
      </div>
    </div>
  );
}
