export default function Pill({ children, className = "" }) {
  return (
    <span
      className={`inline-block text-xs font-medium px-3 py-1.5 rounded-full border transition-colors duration-200 ${className}`}
      style={{
        color: "var(--text-muted)",
        borderColor: "var(--border)",
        background: "var(--bg-surface)",
      }}
    >
      {children}
    </span>
  );
}
