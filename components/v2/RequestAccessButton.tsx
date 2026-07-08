"use client";

export const ACCESS_DIALOG_ID = "v2-access-dialog";

/** Opens the native <dialog> lead form. The only JS this button ships is showModal(). */
export function RequestAccessButton({
  className = "",
  label = "Agendar Piloto de Preventa",
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
      className={`inline-flex items-center rounded-full bg-[#D4AF37] px-6 text-[16px] font-medium text-black shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition-opacity duration-200 [transition-timing-function:cubic-bezier(0.625,0.05,0,1)] hover:opacity-90 ${className}`}
    >
      {label}
    </button>
  );
}
