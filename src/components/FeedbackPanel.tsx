"use client";

import { useState } from "react";
import { type Feedback } from "@/lib/supabase";

const CATEGORIES = [
  { id: "text", label: "TEXT", icon: "✎" },
  { id: "design", label: "DESIGN", icon: "◐" },
  { id: "funktion", label: "FUNKTION", icon: "⚡" },
  { id: "sonstiges", label: "SONSTIGES", icon: "…" },
];

const STATUS_CONFIG = {
  open: { label: "OFFEN", color: "text-status-fail", bg: "bg-red-50" },
  in_progress: { label: "IN ARBEIT", color: "text-status-warning", bg: "bg-amber-50" },
  done: { label: "ERLEDIGT", color: "text-status-pass", bg: "bg-green-50" },
};

type Props = {
  feedbacks: Feedback[];
  activePin: string | null;
  newPin: { x: number; y: number } | null;
  onPinClick: (id: string | null) => void;
  onSubmitFeedback: (data: {
    author: string;
    comment: string;
    category: string;
  }) => void;
  onCancelNewPin: () => void;
};

export function FeedbackPanel({
  feedbacks,
  activePin,
  newPin,
  onPinClick,
  onSubmitFeedback,
  onCancelNewPin,
}: Props) {
  const pinsWithNumbers = feedbacks.filter((f) => f.pin_x && f.pin_y);
  const feedbacksWithoutPins = feedbacks.filter((f) => !f.pin_x || !f.pin_y);

  return (
    <div className="w-[360px] border-l border-surface-tertiary bg-surface-primary flex flex-col shrink-0">
      {/* Panel Header */}
      <div className="h-12 border-b border-surface-tertiary flex items-center px-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-content-muted">
          Feedback ({feedbacks.length})
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* New Feedback Form */}
        {newPin && (
          <NewFeedbackForm
            onSubmit={onSubmitFeedback}
            onCancel={onCancelNewPin}
          />
        )}

        {/* Pinned Feedbacks */}
        {pinsWithNumbers.map((fb, i) => (
          <FeedbackCard
            key={fb.id}
            feedback={fb}
            number={i + 1}
            isActive={activePin === fb.id}
            onClick={() => onPinClick(activePin === fb.id ? null : fb.id)}
          />
        ))}

        {/* Feedbacks without pins */}
        {feedbacksWithoutPins.map((fb) => (
          <FeedbackCard
            key={fb.id}
            feedback={fb}
            isActive={activePin === fb.id}
            onClick={() => onPinClick(activePin === fb.id ? null : fb.id)}
          />
        ))}

        {/* Empty State */}
        {feedbacks.length === 0 && !newPin && (
          <div className="p-8 text-center">
            <p className="text-content-muted text-sm">
              Noch kein Feedback fuer diese Seite.
            </p>
            <p className="text-content-muted text-xs mt-2">
              Klicke &quot;+ Kommentar&quot; um Feedback zu geben.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function FeedbackCard({
  feedback,
  number,
  isActive,
  onClick,
}: {
  feedback: Feedback;
  number?: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const status = STATUS_CONFIG[feedback.status];
  const cat = CATEGORIES.find((c) => c.id === feedback.category);
  const date = new Date(feedback.created_at).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
  });

  return (
    <div
      className={`p-4 border-b border-surface-tertiary cursor-pointer transition-colors ${
        isActive ? "bg-orange-50 border-l-2 border-l-accent" : "hover:bg-surface-card"
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {number && (
            <span className="w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              {number}
            </span>
          )}
          <span className="font-body font-semibold text-sm text-content-primary">
            {feedback.author}
          </span>
          <span className="text-content-muted text-xs">{date}</span>
        </div>
        <span
          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${status.bg} ${status.color}`}
        >
          {status.label}
        </span>
      </div>

      <p className="text-sm text-content-secondary leading-relaxed mb-2">
        {feedback.comment}
      </p>

      {cat && (
        <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-content-muted bg-surface-secondary px-2 py-0.5 rounded">
          <span>{cat.icon}</span>
          {cat.label}
        </span>
      )}

      {/* Admin Reply */}
      {feedback.admin_reply && (
        <div className="mt-3 pl-3 border-l-2 border-accent/30 bg-orange-50/30 rounded-r-md py-2 pr-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold">
            Rauscher Media
          </span>
          <p className="text-sm text-content-secondary leading-relaxed mt-1">
            {feedback.admin_reply}
          </p>
        </div>
      )}
    </div>
  );
}

function NewFeedbackForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: { author: string; comment: string; category: string }) => void;
  onCancel: () => void;
}) {
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState("sonstiges");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;
    onSubmit({ author: author.trim(), comment: comment.trim(), category });
    setAuthor("");
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-b-2 border-accent bg-orange-50"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-headline text-xs uppercase tracking-wider text-accent">
          Neues Feedback
        </span>
        <button
          type="button"
          onClick={onCancel}
          className="text-content-muted hover:text-content-primary text-sm"
        >
          ✕
        </button>
      </div>

      <input
        type="text"
        placeholder="Dein Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border border-surface-tertiary rounded-md px-3 py-2 text-sm mb-2 bg-white focus:outline-none focus:ring-1 focus:ring-accent"
        autoFocus
      />

      <textarea
        placeholder="Was moechtest du anmerken?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        className="w-full border border-surface-tertiary rounded-md px-3 py-2 text-sm mb-2 bg-white resize-none focus:outline-none focus:ring-1 focus:ring-accent"
      />

      {/* Category Selector */}
      <div className="flex gap-1 mb-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategory(cat.id)}
            className={`flex-1 text-[10px] font-mono uppercase tracking-wider py-1.5 rounded transition-colors ${
              category === cat.id
                ? "bg-accent text-white"
                : "bg-surface-secondary text-content-muted hover:bg-surface-tertiary"
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      <button
        type="submit"
        disabled={!author.trim() || !comment.trim()}
        className="w-full bg-accent text-white font-headline text-sm uppercase tracking-wider py-2 rounded-md hover:bg-accent-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Absenden
      </button>
    </form>
  );
}
