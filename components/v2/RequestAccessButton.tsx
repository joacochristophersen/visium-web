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
      className={`inline-flex items-center rounded-full bg-[#f5f5f0] px-6 text-[16px] font-medium text-black shadow-[rgba(0,0,0,0.15)_0px_4px_20px_0px] transition-opacity duration-200 [transition-timing-function:cubic-bezier(0.625,0.05,0,1)] hover:opacity-85 ${className}`}
    >
      Request Access
    </button>
  );
}
