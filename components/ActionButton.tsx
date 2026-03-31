// Global action button — change style here to update every button in the app
export default function ActionButton({
  onClick,
  children,
  className = "",
  type = "button",
}: {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-neutral-900 text-white font-semibold rounded-2xl active:opacity-70 transition-opacity touch-manipulation min-h-[44px] min-w-[44px] ${className}`}
    >
      {children}
    </button>
  );
}
