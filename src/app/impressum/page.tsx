'use client';

import Link from 'next/link';

export default function Impressum() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-20 max-w-[700px]">
        <Link href="/" className="text-sm text-accent hover:underline mb-8 inline-block">
          ← Zurück zur Startseite
        </Link>
        <h1 className="font-heading text-3xl font-medium text-primary mb-8">Impressum</h1>
        <div className="prose prose-neutral max-w-none text-muted-foreground">
          <p>
            <strong>glp designbau GmbH</strong>
          </p>
          <p>Geschäftsführer: Dennis Geißler &amp; Nicole LaCroix</p>
          <p>
            [Adresse einfügen]
            <br />
            [PLZ Ort]
          </p>
          <p>
            Telefon: [Telefonnummer einfügen]
            <br />
            E-Mail: [E-Mail einfügen]
          </p>
          <p>
            Registergericht: [Registergericht einfügen]
            <br />
            Registernummer: [HRB-Nummer einfügen]
          </p>
          <p>Umsatzsteuer-Identifikationsnummer: [USt-IdNr. einfügen]</p>
          <h2 className="font-heading text-xl font-medium text-primary mt-8">Haftungsausschluss</h2>
          <p>[Platzhaltertext – bitte durch rechtskonformen Text ersetzen.]</p>
        </div>
      </div>
    </div>
  );
}
