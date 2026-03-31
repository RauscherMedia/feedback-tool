"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  supabase,
  getProjectBySlug,
  getPages,
  getFeedbacks,
  updateFeedbackStatus,
  type Project,
  type Page,
  type Feedback,
} from "@/lib/supabase";
import { Logo } from "@/components/Logo";

const STATUS_OPTIONS: { value: Feedback["status"]; label: string; color: string; bg: string }[] = [
  { value: "open", label: "OFFEN", color: "text-status-fail", bg: "bg-red-50" },
  { value: "in_progress", label: "IN ARBEIT", color: "text-status-warning", bg: "bg-amber-50" },
  { value: "done", label: "ERLEDIGT", color: "text-status-pass", bg: "bg-green-50" },
];

const CATEGORY_LABELS: Record<string, string> = {
  text: "✎ TEXT",
  design: "◐ DESIGN",
  funktion: "⚡ FUNKTION",
  sonstiges: "… SONSTIGES",
};

export default function AdminProjectPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [project, setProject] = useState<Project | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPage, setFilterPage] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const proj = await getProjectBySlug(slug);
      setProject(proj);
      const pgs = await getPages(proj.id);
      setPages(pgs);
      const fbs = await getFeedbacks(proj.id);
      setFeedbacks(fbs);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Fehler");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [slug]);

  // Realtime
  useEffect(() => {
    if (!project) return;
    const channel = supabase
      .channel("admin-feedbacks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "feedbacks", filter: `project_id=eq.${project.id}` },
        () => getFeedbacks(project.id).then(setFeedbacks)
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [project]);

  const handleStatusChange = async (feedbackId: string, newStatus: Feedback["status"]) => {
    await updateFeedbackStatus(feedbackId, newStatus);
    // Realtime will update, but also update locally for instant UI
    setFeedbacks((prev) =>
      prev.map((f) => (f.id === feedbackId ? { ...f, status: newStatus } : f))
    );
  };

  const filteredFeedbacks = feedbacks.filter((f) => {
    if (filterStatus !== "all" && f.status !== filterStatus) return false;
    if (filterPage !== "all" && f.page_id !== filterPage) return false;
    return true;
  });

  const stats = {
    total: feedbacks.length,
    open: feedbacks.filter((f) => f.status === "open").length,
    inProgress: feedbacks.filter((f) => f.status === "in_progress").length,
    done: feedbacks.filter((f) => f.status === "done").length,
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse text-content-muted font-mono text-sm uppercase tracking-widest">
          Laden...
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-headline text-2xl uppercase mb-2">Fehler</h1>
          <p className="text-content-secondary">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Header */}
      <header className="h-14 border-b border-surface-tertiary flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Logo />
          <div className="h-5 w-px bg-surface-tertiary" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
            Admin
          </span>
          <div className="h-5 w-px bg-surface-tertiary" />
          <span className="text-sm text-content-secondary">{project.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/projekt/${project.slug}`}
            target="_blank"
            className="text-sm text-accent hover:text-accent-dark"
          >
            Client-View ↗
          </Link>
          <Link
            href="/admin"
            className="text-sm text-content-muted hover:text-content-primary"
          >
            ← Alle Projekte
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-10 px-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Gesamt", value: stats.total, color: "text-content-primary" },
            { label: "Offen", value: stats.open, color: "text-status-fail" },
            { label: "In Arbeit", value: stats.inProgress, color: "text-status-warning" },
            { label: "Erledigt", value: stats.done, color: "text-status-pass" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-surface-tertiary rounded-lg p-4 text-center"
            >
              <div className={`text-3xl font-headline ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-content-muted mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-content-muted">
            Filter:
          </span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-sm border border-surface-tertiary rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="all">Alle Status</option>
            <option value="open">Offen</option>
            <option value="in_progress">In Arbeit</option>
            <option value="done">Erledigt</option>
          </select>
          <select
            value={filterPage}
            onChange={(e) => setFilterPage(e.target.value)}
            className="text-sm border border-surface-tertiary rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="all">Alle Seiten</option>
            {pages.map((page) => (
              <option key={page.id} value={page.id}>
                {page.label}
              </option>
            ))}
          </select>
          <span className="text-xs text-content-muted ml-auto">
            {filteredFeedbacks.length} von {feedbacks.length} Eintraegen
          </span>
        </div>

        {/* Feedback Table */}
        {filteredFeedbacks.length === 0 ? (
          <div className="text-center py-16 text-content-muted text-sm">
            Keine Feedbacks mit diesen Filtern.
          </div>
        ) : (
          <div className="border border-surface-tertiary rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[1fr_120px_100px_140px] gap-4 px-5 py-3 bg-surface-secondary text-[10px] font-mono uppercase tracking-wider text-content-muted border-b border-surface-tertiary">
              <span>Feedback</span>
              <span>Seite</span>
              <span>Kategorie</span>
              <span>Status</span>
            </div>

            {/* Rows */}
            {filteredFeedbacks.map((fb) => {
              const page = pages.find((p) => p.id === fb.page_id);
              const date = new Date(fb.created_at).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              });

              return (
                <div
                  key={fb.id}
                  className="grid grid-cols-[1fr_120px_100px_140px] gap-4 px-5 py-4 border-b border-surface-tertiary last:border-b-0 hover:bg-surface-card transition-colors items-center"
                >
                  {/* Comment + Author */}
                  <div>
                    <p className="text-sm text-content-primary leading-relaxed">
                      {fb.comment}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-content-secondary">
                        {fb.author}
                      </span>
                      <span className="text-xs text-content-muted">{date}</span>
                      {fb.pin_x && (
                        <span className="text-[10px] font-mono text-content-muted">
                          📍 {Math.round(fb.pin_x)}%, {Math.round(fb.pin_y!)}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Page */}
                  <span className="text-xs text-content-muted">
                    {page?.label || "—"}
                  </span>

                  {/* Category */}
                  <span className="text-[10px] font-mono uppercase tracking-wider text-content-muted bg-surface-secondary px-2 py-1 rounded w-fit">
                    {CATEGORY_LABELS[fb.category] || fb.category}
                  </span>

                  {/* Status Selector */}
                  <div className="flex gap-1">
                    {STATUS_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleStatusChange(fb.id, opt.value)}
                        className={`text-[9px] font-mono uppercase tracking-wider px-2 py-1 rounded transition-colors ${
                          fb.status === opt.value
                            ? `${opt.bg} ${opt.color} font-bold`
                            : "bg-surface-secondary text-content-muted hover:bg-surface-tertiary"
                        }`}
                      >
                        {opt.value === "open"
                          ? "○"
                          : opt.value === "in_progress"
                          ? "◐"
                          : "●"}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pages Management */}
        <div className="mt-12">
          <h2 className="font-headline text-xl uppercase mb-4">Seiten</h2>
          <div className="border border-surface-tertiary rounded-lg overflow-hidden">
            {pages.map((page, i) => (
              <div
                key={page.id}
                className="flex items-center justify-between px-5 py-3 border-b border-surface-tertiary last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-accent font-mono text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium">{page.label}</span>
                  <span className="text-xs text-content-muted font-mono">
                    {page.path}
                  </span>
                </div>
                <span className="text-xs text-content-muted">
                  {feedbacks.filter((f) => f.page_id === page.id).length}{" "}
                  Feedbacks
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Share Link */}
        <div className="mt-12 p-5 border border-accent/20 rounded-lg bg-orange-50/20">
          <h3 className="font-headline text-sm uppercase tracking-wider text-accent mb-2">
            Feedback-Link fuer den Kunden
          </h3>
          <div className="flex items-center gap-3">
            <code className="flex-1 bg-surface-secondary px-4 py-2 rounded text-sm font-mono text-content-primary">
              {typeof window !== "undefined"
                ? `${window.location.origin}/projekt/${project.slug}`
                : `/projekt/${project.slug}`}
            </code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/projekt/${project.slug}`
                );
              }}
              className="bg-accent text-white font-headline text-xs uppercase tracking-wider px-4 py-2 rounded-md hover:bg-accent-dark transition-colors"
            >
              Kopieren
            </button>
          </div>
          <p className="text-xs text-content-muted mt-2">
            Diesen Link an den Kunden schicken — kein Login noetig.
          </p>
        </div>
      </main>
    </div>
  );
}
