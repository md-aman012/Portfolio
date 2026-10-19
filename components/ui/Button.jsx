import { forwardRef } from "react";

export const Button = forwardRef(({ children, className = "", variant = "default", ...props }, ref) => {
  const variantStyles = {
    default: "bg-[var(--accent)] text-[var(--bg-page)] hover:bg-[var(--text-primary)]",
    secondary: "border border-[var(--border)] bg-transparent hover:bg-[var(--border)]",
    ghost: "bg-transparent hover:bg-[var(--border)]",
  };

  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";