export function AnnouncementBar() {
  return (
    <div
      className="fixed inset-x-0 top-0 z-[55] hidden h-8 items-center justify-between bg-[#1A1714] px-6 md:flex"
      role="region"
      aria-label="Announcement"
    >
      <span
        aria-hidden="true"
        className="text-[12px] text-[#F6F3EE] opacity-30 select-none"
      >
        ←
      </span>

      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#F6F3EE] whitespace-nowrap">
        Sale live now. Up to 50% off
      </p>

      <span
        aria-hidden="true"
        className="text-[12px] text-[#F6F3EE] opacity-30 select-none"
      >
        →
      </span>
    </div>
  )
}
