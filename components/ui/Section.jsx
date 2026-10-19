export default function Section({ id, className = "", children }) {
  return (
    <section
      id={id}
      className={`section-padding section-border ${className}`}
    >
      <div className="container-main">
        {children}
      </div>
    </section>
  );
}
