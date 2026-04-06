"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getProjects,
  createProject,
  supabase,
  type Project,
  type Feedback,
} from "@/lib/supabase";
import { Logo } from "@/components/Logo";
import { AdminAuth } from "@/components/AdminAuth";

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [feedbackCounts, setFeedbackCounts] = useState<
    Record<string, { total: number; open: number }>
  >({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const loadData = async () => {
    const projs = await getProjects();
    setProjects(projs);

    // Get feedback counts per project
    const counts: Record<string, { total: number; open: number }> = {};
    for (const p of projs) {
      const { data } = await supabase
        .from("feedbacks")
        .select("id, status")
        .eq("project_id", p.id);
      const fbs = (data || []) as Pick<Feedback, "id" | "status">[];
      counts[p.id] = {
        total: fbs.length,
        open: fbs.filter((f) => f.status === "open").length,
      };
    }
    setFeedbackCounts(counts);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
<AdminAuth>
        <div className="min-h-screen bg-surface-primary">
      {/* Header */}
      <header className="h-14 border-b border-surface-tertiary flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Logo />
          <div className="h-5 w-px bg-surface-tertiary" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
            Admin
          </span>
        </div>
        <Link
          href="/"
          className="text-sm text-content-muted hover:text-content-primary"
        >
          ← Zurueck
        </Link>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-headline text-3xl uppercase">Projekte</h1>
            <p className="text-content-secondary text-sm mt-1">
              Alle Kundenprojekte verwalten
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-accent text-white font-headline text-sm uppercase tracking-wider px-5 py-2 rounded-md hover:bg-accent-dark transition-colors"
          >
            + Neues Projekt
          </button>
        </div>

        {/* New Project Form */}
        {showForm && (
          <NewProjectForm
            onCreated={() => {
              setShowForm(false);
              loadData();
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Projects List */}
        {loading ? (
          <div className="text-content-muted font-mono text-sm uppercase tracking-widest animate-pulse">
            Laden...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 text-content-muted">
            Noch keine Projekte. Lege dein erstes Projekt an.
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => {
              const counts = feedbackCounts[project.id] || {
                total: 0,
                open: 0,
              };
              return (
                <Link
                  key={project.id}
                  href={`/admin/projekt/${project.slug}`}
                  className="block border border-surface-tertiary rounded-lg p-5 hover:border-accent/40 hover:bg-orange-50/20 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="font-headline text-lg uppercase group-hover:text-accent transition-colors">
                          {project.name}
                        </h2>
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                            project.status === "active"
                              ? "bg-green-50 text-status-pass"
                              : "bg-gray-100 text-content-muted"
                          }`}
                        >
                          {project.status === "active"
                            ? "AKTIV"
                            : "ARCHIVIERT"}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1.5">
                        {project.client_name && (
                          <span className="text-sm text-content-muted">
                            {project.client_name}
                          </span>
                        )}
                        <span className="text-xs text-content-muted font-mono">
                          /{project.slug}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-2xl font-headline text-content-primary">
                          {counts.total}
                        </div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-content-muted">
                          Feedbacks
                        </div>
                      </div>
                      {counts.open > 0 && (
                        <div className="text-right">
                          <div className="text-2xl font-headline text-status-fail">
                            {counts.open}
                          </div>
                          <div className="text-[10px] font-mono uppercase tracking-wider text-status-fail">
                            Offen
                          </div>
                        </div>
                      )}
                      <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity text-lg">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
    </AdminAuth>
  );
}

function NewProjectForm({
  onCreated,
  onCancel,
}: {
  onCreated: () => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [clientName, setClientName] = useState("");
  const [saving, setSaving] = useState(false);

  const autoSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug || !previewUrl) return;
    setSaving(true);
    try {
      await createProject({
        name,
        slug,
        preview_url: previewUrl,
        client_name: clientName || undefined,
      });
      onCreated();
    } catch (err) {
      alert("Fehler: " + (err instanceof Error ? err.message : "Unbekannt"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-accent/30 rounded-lg p-6 mb-8 bg-orange-50/30"
    >
      <h3 className="font-headline text-sm uppercase tracking-wider text-accent mb-4">
        Neues Projekt anlegen
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-content-muted mb-1">
            Projektname
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slug || slug === autoSlug(name))
                setSlug(autoSlug(e.target.value));
            }}
            placeholder="z.B. Burger Inneneinrichtung"
            className="w-full border border-surface-tertiary rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-content-muted mb-1">
            Slug (URL)
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="z.B. burger-v1"
            className="w-full border border-surface-tertiary rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-content-muted mb-1">
            Preview URL
          </label>
          <input
            type="url"
            value={previewUrl}
            onChange={(e) => setPreviewUrl(e.target.value)}
            placeholder="https://preview.vercel.app"
            className="w-full border border-surface-tertiary rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-content-muted mb-1">
            Kundenname (optional)
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="z.B. Thomas Burger"
            className="w-full border border-surface-tertiary rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-content-muted hover:text-content-primary px-4 py-2"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          disabled={!name || !slug || !previewUrl || saving}
          className="bg-accent text-white font-headline text-sm uppercase tracking-wider px-5 py-2 rounded-md hover:bg-accent-dark transition-colors disabled:opacity-40"
        >
          {saving ? "Speichern..." : "Projekt anlegen"}
        </button>
      </div>
    </form>
  );
}
