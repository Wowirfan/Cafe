import React from "react";

/**
 * Full-viewport loading state — used while settings/critical data load
 * on first paint so the site never flashes empty/unstyled content.
 */
const Loader = () => (
  <div className="flex min-h-screen items-center justify-center bg-surface">
    <div className="flex flex-col items-center gap-3">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <p className="text-sm tracking-wide text-stone-500">Brewing things up…</p>
    </div>
  </div>
);

export default Loader;
