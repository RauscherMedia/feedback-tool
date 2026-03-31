'use client';

import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import { Building2, Globe, Send } from "lucide-react";
import { toast } from "sonner";

const KontaktSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;

    if (!data.firstName || !data.lastName || !data.email) {
      toast.error("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }
    if (!data.privacy) {
      toast.error("Bitte stimmen Sie der Datenschutzerklärung zu.");
      return;
    }

    const subject = encodeURIComponent(`Anfrage – Wohnen am Sickingerhof – ${data.apartment || "Allgemein"}`);
    const body = encodeURIComponent(
      `Name: ${data.firstName} ${data.lastName}\nE-Mail: ${data.email}\nTelefon: ${data.phone || "–"}\nInteresse an: ${data.apartment || "–"}\n\nNachricht:\n${data.message || "–"}`
    );
    window.location.href = `mailto:info@glp-designbau.de?subject=${subject}&body=${body}`;

    setSending(true);
    setTimeout(() => setSending(false), 3000);
  };

  return (
    <section className="py-[clamp(4rem,3rem+5vw,8rem)] bg-bg-alt" id="kontakt">
      <div className="container">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.p initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-4">
              Kontakt
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="font-heading text-[clamp(2rem,1.5rem+2.5vw,3.2rem)] font-medium leading-[1.2] text-primary mb-6">
              Sprechen Sie{" "}<br />mit uns
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-base text-muted-foreground leading-[1.8] mb-10">
              Wir beraten Sie gerne persönlich zu allen Wohneinheiten und beantworten Ihre Fragen rund um das Projekt „Wohnen am Sickingerhof".
            </motion.p>

            <div className="flex flex-col gap-6">
              <motion.div initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }} className="flex gap-4 items-start">
                <Building2 size={20} className="text-accent mt-0.5 min-w-[20px]" />
                <div>
                  <strong className="block font-semibold text-primary">glp designbau GmbH</strong>
                  <span className="text-sm text-muted-foreground">Projektentwicklung · Architektur · Bauingenieurwesen</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }} className="flex gap-4 items-start">
                <Globe size={20} className="text-accent mt-0.5 min-w-[20px]" />
                <div>
                  <strong className="block font-semibold text-primary">www.glp-designbau.de</strong>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 35 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-background p-8 rounded-xl shadow-lg"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Vorname *</label>
                <input type="text" name="firstName" required className="w-full px-3 py-2.5 text-sm border-[1.5px] border-border rounded-md bg-background text-foreground focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Nachname *</label>
                <input type="text" name="lastName" required className="w-full px-3 py-2.5 text-sm border-[1.5px] border-border rounded-md bg-background text-foreground focus:outline-none focus:border-accent transition-colors" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1">E-Mail *</label>
                <input type="email" name="email" required className="w-full px-3 py-2.5 text-sm border-[1.5px] border-border rounded-md bg-background text-foreground focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Telefon</label>
                <input type="tel" name="phone" className="w-full px-3 py-2.5 text-sm border-[1.5px] border-border rounded-md bg-background text-foreground focus:outline-none focus:border-accent transition-colors" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-primary mb-1">Interesse an</label>
              <select name="apartment" className="w-full px-3 py-2.5 text-sm border-[1.5px] border-border rounded-md bg-background text-foreground focus:outline-none focus:border-accent transition-colors">
                <option value="">Bitte wählen</option>
                <option value="WE1 – Erdgeschoss (85m²)">WE1 – Erdgeschoss (ca. 85 m²)</option>
                <option value="WE2 – Erdgeschoss (85m²)">WE2 – Erdgeschoss (ca. 85 m²)</option>
                <option value="WE3 – Obergeschoss (79m²)">WE3 – Obergeschoss (ca. 79 m²)</option>
                <option value="WE4 – Obergeschoss (79m²)">WE4 – Obergeschoss (ca. 79 m²)</option>
                <option value="WE5 – Penthouse (DG)">WE5 – Penthouse (Dachgeschoss)</option>
                <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-primary mb-1">Nachricht</label>
              <textarea name="message" rows={4} placeholder="Ihre Nachricht an uns..." className="w-full px-3 py-2.5 text-sm border-[1.5px] border-border rounded-md bg-background text-foreground focus:outline-none focus:border-accent transition-colors resize-y" />
            </div>
            <div className="flex items-start gap-2 mb-6">
              <input type="checkbox" name="privacy" id="privacy" required className="mt-1 accent-accent" />
              <label htmlFor="privacy" className="text-xs text-muted-foreground">
                Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu. *
              </label>
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full px-7 py-3.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md inline-flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Send size={16} />
              {sending ? "Wird vorbereitet..." : "Anfrage senden"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default KontaktSection;
