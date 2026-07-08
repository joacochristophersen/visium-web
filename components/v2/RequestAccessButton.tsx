"use client";

export const ACCESS_DIALOG_ID = "v2-access-dialog";

/** Opens the native <dialog> lead form. The only JS this button ships is showModal(). */
export function RequestAccessButton({
  className = "",
  label = "Agendar Revisión de Pipeline",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        const dialog = document.getElementById(ACCESS_DIALOG_ID);
        if (dialog instanceof HTMLDialogElement) dialog.showModal();
      }}
      className={`inline-flex items-center rounded-full bg-[#D4AF37] px-6 text-[16px] font-semibold tracking-[-0.01em] text-black shadow-[0_2px_14px_rgba(212,175,55,0.25)] transition-all duration-200 [transition-timing-function:cubic-bezier(0.625,0.05,0,1)] hover:scale-[1.02] hover:opacity-90 ${className}`}
    >
      {label}
    </button>
  );
}
