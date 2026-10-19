export default function Eyebrow({ number, label }) {
  return (
    <p
      className="text-xs font-mono tracking-[0.2em] uppercase mb-6"
      style={{ color: "var(--text-muted)" }}
    >
      {number ? `${number} / ` : ""}
      {label}
    </p>
  );
}
