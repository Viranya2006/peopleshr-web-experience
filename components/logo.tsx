// Text wordmark, not the official PeoplesHR logo file.
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2 text-[19px] font-extrabold tracking-tight">
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        <rect width="26" height="26" rx="7" fill="#2563eb" />
        <circle cx="9.5" cy="9.5" r="3" fill="#fff" />
        <circle cx="16.5" cy="9.5" r="3" fill="#fff" opacity="0.65" />
        <path d="M4.5 20c0-3 2.2-5 5-5s5 2 5 5M11.5 20c0-3 2.2-5 5-5s5 2 5 5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className={inverted ? "text-white" : "text-navy"}>
        Peoples<span className={inverted ? "text-blue-100" : "text-blue"}>HR</span>
      </span>
    </span>
  );
}
