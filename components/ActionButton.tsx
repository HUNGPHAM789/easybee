// Global action button — change style here to update every button in the app
export default function ActionButton({
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-neutral-900 text-white font-semibold rounded-2xl active:opacity-70 transition-opacity touch-manipulation min-h-[44px] min-w-[44px] disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}
