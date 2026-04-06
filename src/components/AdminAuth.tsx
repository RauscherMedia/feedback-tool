"use client";

import { useState, useEffect, type ReactNode } from "react";
import { Logo } from "@/components/Logo";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "rauscher2024";

export function AdminAuth({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem("rm-admin-auth");
    if (saved === "true") {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("rm-admin-auth", "true");
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (checking) {
    return (
      <div className="h-screen flex items-center justify-center bg-surface-primary">
        <div className="animate-pulse text-content-muted font-mono text-sm uppercase tracking-widest">
          Laden...
        </div>
      </div>
    );
  }

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen flex items-center justify-center bg-surface-primary">
      <div className="w-full max-w-sm px-6">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <div className="border border-surface-tertiary rounded-lg p-6">
          <h2 className="font-headline text-lg uppercase text-center mb-1">
            Admin-Bereich
          </h2>
          <p className="text-sm text-content-muted text-center mb-6">
            Bitte Passwort eingeben
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Passwort"
              autoFocus
              className={`w-full border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent ${
                error
                  ? "border-status-fail bg-red-50/50"
                  : "border-surface-tertiary"
              }`}
            />
            {error && (
              <p className="text-xs text-status-fail mt-2">
                Falsches Passwort. Bitte erneut versuchen.
              </p>
            )}
            <button
              type="submit"
              className="w-full mt-4 bg-accent text-white font-headline text-sm uppercase tracking-wider py-2.5 rounded-md hover:bg-accent-dark transition-colors"
            >
              Anmelden
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
