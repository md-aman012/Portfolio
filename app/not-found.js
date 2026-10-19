import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Page not found | Md Aman",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-lg">
        <p
          className="text-xs font-mono tracking-[0.3em] uppercase mb-6"
          style={{ color: "var(--accent)" }}
        >
          ERROR 404
        </p>

        <h1
          className="font-serif text-6xl sm:text-8xl tracking-tight leading-[0.95] mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          This page went <em className="accent-italic">missing.</em>
        </h1>

        <p
          className="text-base leading-relaxed mb-10"
          style={{ color: "var(--text-muted)" }}
        >
          The link may be broken, or the page may have been moved. The good news:
          everything worth seeing is one click away.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-colors duration-200"
            style={{
              background: "var(--accent)",
              color: "var(--bg-page)",
            }}
          >
            Back home
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 px-7 py-3 rounded-full border text-xs font-mono uppercase tracking-wider transition-colors duration-200"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
          >
            See the work
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </main>
  );
}
