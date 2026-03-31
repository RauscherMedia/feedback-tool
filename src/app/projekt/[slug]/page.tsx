"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  supabase,
  getProjectBySlug,
  getPages,
  getFeedbacks,
  createFeedback,
  type Project,
  type Page,
  type Feedback,
} from "@/lib/supabase";
import { Logo } from "@/components/Logo";
import { FeedbackPanel } from "@/components/FeedbackPanel";
import { WebsitePreview } from "@/components/WebsitePreview";

export default function ProjektPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [project, setProject] = useState<Project | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [activePage, setActivePage] = useState<Page | null>(null);
  const [commentMode, setCommentMode] = useState(false);
  const [newPin, setNewPin] = useState<{ x: number; y: number } | null>(null);
  const [activePin, setActivePin] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load project data
  useEffect(() => {
    async function load() {
      try {
        const proj = await getProjectBySlug(slug);
        setProject(proj);
        const pgs = await getPages(proj.id);
        setPages(pgs);
        if (pgs.length > 0) setActivePage(pgs[0]);
        const fbs = await getFeedbacks(proj.id);
        setFeedbacks(fbs);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Projekt nicht gefunden");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  // Realtime subscription for new feedbacks
  useEffect(() => {
    if (!project) return;
    const channel = supabase
      .channel("feedbacks")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "feedbacks",
          filter: `project_id=eq.${project.id}`,
        },
        () => {
          // Reload feedbacks on any change
          getFeedbacks(project.id).then(setFeedbacks);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [project]);

  const pageFeedbacks = feedbacks.filter(
    (f) => f.page_id === activePage?.id
  );

  const handlePreviewClick = (x: number, y: number) => {
    if (!commentMode) return;
    setNewPin({ x, y });
    setPanelOpen(true);
  };

  const handleSubmitFeedback = async (data: {
    author: string;
    comment: string;
    category: string;
  }) => {
    if (!project || !activePage) return;
    await createFeedback({
      project_id: project.id,
      page_id: activePage.id,
      author: data.author,
      comment: data.comment,
      category: data.category,
      pin_x: newPin?.x,
      pin_y: newPin?.y,
    });
    setNewPin(null);
    setCommentMode(false);
    // Feedbacks refresh via realtime subscription
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
          <h1 className="font-headline text-2xl uppercase mb-2">
            Projekt nicht gefunden
          </h1>
          <p className="text-content-secondary">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-surface-tertiary flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Logo />
          <div className="h-5 w-px bg-surface-tertiary" />
          <span className="font-body text-sm text-content-secondary">
            {project.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Page Selector */}
          <select
            value={activePage?.id || ""}
            onChange={(e) => {
              const page = pages.find((p) => p.id === e.target.value);
              if (page) {
                setActivePage(page);
                setNewPin(null);
                setActivePin(null);
              }
            }}
            className="text-sm border border-surface-tertiary rounded-md px-3 py-1.5 bg-surface-primary text-content-primary focus:outline-none focus:ring-1 focus:ring-accent"
          >
            {pages.map((page) => (
              <option key={page.id} value={page.id}>
                {page.label}
              </option>
            ))}
          </select>

          {/* Comment Mode Toggle */}
          <button
            onClick={() => {
              setCommentMode(!commentMode);
              if (commentMode) setNewPin(null);
            }}
            className={`text-sm font-headline uppercase tracking-wider px-4 py-1.5 rounded-md transition-colors ${
              commentMode
                ? "bg-accent text-white"
                : "bg-surface-secondary text-content-primary hover:bg-surface-tertiary"
            }`}
          >
            {commentMode ? "✕ Abbrechen" : "+ Kommentar"}
          </button>

          {/* Toggle Panel */}
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            className="text-sm text-content-muted hover:text-content-primary px-2 py-1.5"
          >
            {panelOpen ? "Panel ▸" : "◂ Panel"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Preview Area */}
        <div className="flex-1 relative">
          <WebsitePreview
            previewUrl={`${project.preview_url}${activePage?.path || "/"}`}
            feedbacks={pageFeedbacks}
            commentMode={commentMode}
            newPin={newPin}
            activePin={activePin}
            onPreviewClick={handlePreviewClick}
            onPinClick={(id) => {
              setActivePin(id);
              setPanelOpen(true);
            }}
          />
        </div>

        {/* Feedback Panel */}
        {panelOpen && (
          <FeedbackPanel
            feedbacks={pageFeedbacks}
            activePin={activePin}
            newPin={newPin}
            onPinClick={setActivePin}
            onSubmitFeedback={handleSubmitFeedback}
            onCancelNewPin={() => {
              setNewPin(null);
              setCommentMode(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
