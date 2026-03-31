// Global icon button — change style here to update every icon button in the app
export default function IconButton({
  onClick,
  children,
  active = false,
  className = "",
  ariaLabel,
}: {
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center w-11 h-11 rounded-full transition-colors shrink-0 ${
        active ? "bg-neutral-100" : "bg-white active:bg-neutral-50"
      } ${className}`}
    >
      {children}
    </button>
  );
}
