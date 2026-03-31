"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects, type Project } from "@/lib/supabase";
import { Logo } from "@/components/Logo";

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  const activeProjects = projects.filter((p) => p.status === "active");

  return (
    <div className="min-h-screen bg-surface-primary">
      <header className="h-14 border-b border-surface-tertiary flex items-center px-6">
        <Logo />
      </header>

      <main className="max-w-2xl mx-auto py-16 px-6">
        <h1 className="font-headline text-3xl uppercase mb-2">Projekte</h1>
        <p className="text-content-secondary mb-8">
          Waehle ein Projekt um Feedback zur Website-Preview zu geben.
        </p>

        {loading ? (
          <div className="text-content-muted font-mono text-sm uppercase tracking-widest animate-pulse">
            Laden...
          </div>
        ) : activeProjects.length === 0 ? (
          <div className="text-content-muted text-sm">
            Noch keine Projekte vorhanden.
          </div>
        ) : (
          <div className="space-y-3">
            {activeProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projekt/${project.slug}`}
                className="block p-4 border border-surface-tertiary rounded-lg hover:border-accent hover:bg-orange-50/30 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-headline text-lg uppercase group-hover:text-accent transition-colors">
                      {project.name}
                    </h2>
                    {project.client_name && (
                      <p className="text-sm text-content-muted mt-0.5">
                        {project.client_name}
                      </p>
                    )}
                  </div>
                  <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
