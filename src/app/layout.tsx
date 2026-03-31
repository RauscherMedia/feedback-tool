import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eigentumswohnung kaufen Stutensee-Spöck | Neubau am Sickingerhof – glp designbau",
  description: "5 Neubau-Eigentumswohnungen in Stutensee-Spöck bei Bruchsal kaufen – 79 bis 134 m², ab 418.700 €. 3-Zimmer-Wohnungen mit Wärmepumpe, PV-Anlage & Aufzug. Jetzt Beratungstermin vereinbaren!",
  authors: [{ name: "glp designbau GmbH" }],
  robots: "index, follow",
  keywords: "Eigentumswohnung, Stutensee, Neubau, Sickingerhof, kaufen",
  openGraph: {
    title: "Eigentumswohnung kaufen in Stutensee-Spöck | Neubau am Sickingerhof",
    description: "5 Neubau-Eigentumswohnungen in Stutensee-Spöck bei Bruchsal – 79 bis 134 m², ab 418.700 €. Wärmepumpe, PV-Anlage & altersgerechtes Wohnen.",
    type: "website",
    url: "https://www.eigentumswohnungen-stutensee.de",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "google-site-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": "Wohnen am Sickingerhof – Eigentumswohnungen in Stutensee-Spöck",
      "description": "5 Neubau-Eigentumswohnungen in Stutensee-Spöck bei Bruchsal. 3-Zimmer-Wohnungen von 79 bis 134 m², teilweise altersgerecht, mit Wärmepumpe und PV-Anlage.",
      "url": "https://www.eigentumswohnungen-stutensee.de",
      "datePosted": "2025-01-01",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Am Sickingerhof 10",
        "addressLocality": "Stutensee",
        "addressRegion": "Baden-Württemberg",
        "postalCode": "76297",
        "addressCountry": "DE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "49.0633",
        "longitude": "8.4861"
      },
      "offers": [
        {
          "@type": "Offer",
          "name": "WE1 – Erdgeschoss (ca. 85 m²)",
          "price": "467500",
          "priceCurrency": "EUR",
          "description": "Altersgerechte 3-Zimmer-Eigentumswohnung mit Terrasse und privatem Garten"
        },
        {
          "@type": "Offer",
          "name": "WE2 – Erdgeschoss (ca. 85 m²)",
          "price": "467500",
          "priceCurrency": "EUR",
          "description": "Altersgerechte 3-Zimmer-Eigentumswohnung mit Terrasse und privatem Garten"
        },
        {
          "@type": "Offer",
          "name": "WE3 – Obergeschoss (ca. 79 m²)",
          "price": "418700",
          "priceCurrency": "EUR",
          "description": "3-Zimmer-Eigentumswohnung mit Loggia und Fahrstuhlzugang"
        },
        {
          "@type": "Offer",
          "name": "WE4 – Obergeschoss (ca. 79 m²)",
          "price": "418700",
          "priceCurrency": "EUR",
          "description": "3-Zimmer-Eigentumswohnung mit Loggia und Fahrstuhlzugang"
        },
        {
          "@type": "Offer",
          "name": "WE5 – Penthouse Dachgeschoss",
          "description": "Großzügige Penthouse-Wohnung mit Pultdach, hohen Räumen und zwei Dachterrassen"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "glp designbau GmbH",
      "description": "Projektentwicklung, Architektur und Bauingenieurwesen",
      "url": "https://www.eigentumswohnungen-stutensee.de",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Stutensee",
        "addressRegion": "Baden-Württemberg",
        "postalCode": "76297",
        "addressCountry": "DE"
      },
      "founder": [
        {"@type": "Person", "name": "Dennis Geißler"},
        {"@type": "Person", "name": "Nicole LaCroix"}
      ],
      "foundingDate": "2025-01-09"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Was kosten die Eigentumswohnungen am Sickingerhof in Stutensee-Spöck?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Die Kaufpreise beginnen bei 418.700 € für eine 3-Zimmer-Wohnung im Obergeschoss mit ca. 79 m². Die Erdgeschosswohnungen mit ca. 85 m² und privatem Garten sind ab 467.500 € erhältlich. Die Penthouse-Wohnung ist auf Anfrage verfügbar."
          }
        },
        {
          "@type": "Question",
          "name": "Wann sind die Neubauwohnungen in Stutensee-Spöck bezugsfertig?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Die Realisierung des Neubauprojekts Wohnen am Sickingerhof ist für 2025/2026 geplant."
          }
        },
        {
          "@type": "Question",
          "name": "Sind die Wohnungen am Sickingerhof altersgerecht?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja. Die Erdgeschosswohnungen sind altersgerecht konzipiert mit bodengleichen Duschen, Tageslichtbädern und ebenerdiger Terrasse. Alle Etagen sind über einen Aufzug erreichbar."
          }
        },
        {
          "@type": "Question",
          "name": "Wie ist die Anbindung von Stutensee-Spöck an Karlsruhe und Bruchsal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Eine Straßenbahnhaltestelle ist fußläufig erreichbar und verbindet Spöck direkt mit der Karlsruher Innenstadt. Die A5-Auffahrt Bruchsal liegt ca. 3 km entfernt."
          }
        },
        {
          "@type": "Question",
          "name": "Welche Ausstattung haben die Neubauwohnungen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Alle Wohnungen verfügen über Fußbodenheizung, Echtholzparkett, Tageslichtbäder und bodengleiche Duschen. Das Gebäude wird mit Wärmepumpe beheizt und besitzt eine Photovoltaikanlage."
          }
        },
        {
          "@type": "Question",
          "name": "Wie viele Zimmer haben die Wohnungen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Alle fünf Wohneinheiten sind als 3-Zimmer-Wohnungen konzipiert mit Schlafzimmer, Kinder-/Gästezimmer und offenem Wohn-/Essbereich. Die Wohnflächen reichen von ca. 79 m² bis zur Penthouse-Wohnung."
          }
        }
      ]
    }
  ];

  return (
    <html
      lang="de"
      className=""
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="glp designbau GmbH" />
        <meta name="geo.region" content="DE-BW" />
        <meta name="geo.placename" content="Stutensee-Spöck" />
        <meta name="geo.position" content="49.0633;8.4861" />
        <link rel="canonical" href="https://www.eigentumswohnungen-stutensee.de" />
        {structuredData.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="min-h-full flex flex-col font-body">
        {children}
      </body>
    </html>
  );
}
