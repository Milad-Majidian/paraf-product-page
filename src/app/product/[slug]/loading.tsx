export default function Loading() {
  return (
    <div className="base-container py-6">
      <div className="bg-bg-surface border border-border-primary rounded-xl p-6 shadow-card">
        <div className="h-6 w-48 bg-muted rounded" />
        <div className="mt-3 h-4 w-80 bg-muted rounded" />
        <div className="mt-6 grid gap-4 md:grid-cols-[280px_1fr]">
          <div className="aspect-square bg-muted rounded-xl" />
          <div className="space-y-3">
            <div className="h-16 bg-muted rounded-xl" />
            <div className="h-24 bg-muted rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
