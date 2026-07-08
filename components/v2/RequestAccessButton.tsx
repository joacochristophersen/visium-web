"use client";

export const ACCESS_DIALOG_ID = "v2-access-dialog";

/** Opens the native <dialog> lead form. The only JS this button ships is showModal(). */
export function RequestAccessButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        const dialog = document.getElementById(ACCESS_DIALOG_ID);
        if (dialog instanceof HTMLDialogElement) dialog.showModal();
      }}
      className={`inline-flex items-center rounded-full bg-gradient-to-b from-[#F0CB65] to-[#D4AF37] px-6 text-[16px] font-medium text-black shadow-[0_0_40px_-8px_rgba(212,175,55,0.5)] transition-opacity duration-200 [transition-timing-function:cubic-bezier(0.625,0.05,0,1)] hover:opacity-90 ${className}`}
    >
      Agendar Piloto de Preventa
    </button>
  );
}
