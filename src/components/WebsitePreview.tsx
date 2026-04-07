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

export function WebsitePreview({
  previewUrl,
  feedbacks,
  commentMode,
  newPin,
  activePin,
  onPreviewClick,
  onPinClick,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!commentMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onPreviewClick(x, y);
  };

  const pinsWithNumbers = feedbacks.filter(
    (f) => f.pin_x != null && f.pin_y != null
  );

  return (
    <div ref={containerRef} className="w-full h-full bg-surface-secondary relative">
      {/* iframe — scrolls internally; pointer-events disabled in comment mode */}
      <iframe
        src={previewUrl}
        className="w-full h-full border-0"
        style={{ pointerEvents: commentMode ? "none" : "auto" }}
        title="Website Preview"
      />

      {/* Clickable overlay — only active in comment mode */}
      {commentMode && (
        <div
          className="absolute inset-0 cursor-crosshair z-10"
          onClick={handleOverlayClick}
        />
      )}

      {/* Existing Pins — positioned relative to the viewport */}
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
        <div className="absolute top-3 left-0 right-0 z-20 flex justify-center pointer-events-none">
          <div className="bg-accent text-white px-4 py-1.5 rounded-full text-xs font-headline uppercase tracking-wider shadow-lg">
            Scrolle zum Bereich und klicke auf die Stelle
          </div>
        </div>
      )}
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
  const color =
    STATUS_COLORS[status as keyof typeof STATUS_COLORS] || "#FF5C00";

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
