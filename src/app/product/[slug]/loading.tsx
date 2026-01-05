export default function Loading() {
  return (
    <article className="base-container">
      <div className="bg-bg-surface border border-border-primary rounded-2xl p-5 mt-4 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-7">
          {/* Images column */}
          <div className="col-span-1">
            <div className="border border-border-primary rounded-md overflow-hidden bg-white">
              <div className="aspect-4/5 bg-muted" />
            </div>

            <div className="grid grid-cols-4 gap-1 mt-2">
              <div className="h-20 bg-muted rounded-md" />
              <div className="h-20 bg-muted rounded-md" />
              <div className="h-20 bg-muted rounded-md" />
              <div className="col-span-1 flex items-center justify-center border border-border-primary rounded-md">
                <span className="text-sm text-text-secondary">+2</span>
              </div>
            </div>
          </div>

          {/* Product information placeholder (spans 2 cols) */}
          <div className="col-span-2 space-y-4 py-2">
            <div className="h-6 w-48 bg-muted rounded" />
            <div className="h-8 w-full bg-muted rounded" />
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-32 bg-muted rounded-xl" />
            <div className="h-10 bg-muted rounded" />
            <div className="h-40 bg-muted rounded-xl" />
          </div>

          {/* Purchase aside */}
          <aside className="col-span-1" aria-label="loading-purchase">
            <div className="rounded-2xl bg-bg-body px-4 py-6 space-y-4">
              <div className="h-6 w-32 bg-muted rounded" />
              <div className="h-12 bg-muted rounded" />
              <div className="h-8 bg-muted rounded" />
              <div className="h-12 bg-muted rounded" />
              <div className="h-10 bg-muted rounded" />
            </div>
          </aside>
        </div>
      </div>

      {/* Store list / Bought together / Recommended placeholders */}
      <div className="mt-6 space-y-6">
        <div className="bg-bg-surface border border-border-primary rounded-2xl p-4 animate-pulse">
          <div className="h-6 w-40 bg-muted rounded" />
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="h-28 bg-muted rounded" />
            <div className="h-28 bg-muted rounded" />
          </div>
        </div>

        <div className="bg-bg-surface border border-border-primary rounded-2xl p-4 animate-pulse">
          <div className="h-6 w-48 bg-muted rounded" />
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="h-28 bg-muted rounded" />
            <div className="h-28 bg-muted rounded" />
            <div className="h-28 bg-muted rounded" />
          </div>
        </div>

        <div className="bg-bg-surface border border-border-primary rounded-2xl p-4 animate-pulse">
          <div className="h-6 w-48 bg-muted rounded" />
          <div className="mt-4 h-24 bg-muted rounded" />
        </div>
      </div>
    </article>
  );
}