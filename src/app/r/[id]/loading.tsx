export default function Loading() {
  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="max-w-2xl mx-auto px-4 pt-20">
        {/* 店家資訊 Skeleton */}
        <div className="mb-6">
          <div className="relative w-full aspect-[16/9] rounded-xl bg-gray-200 animate-shimmer mb-4" />
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded animate-shimmer w-3/4" />
            <div className="h-5 bg-gray-200 rounded animate-shimmer w-1/2" />
            <div className="h-5 bg-gray-200 rounded animate-shimmer w-2/3" />
          </div>
        </div>

        {/* 評論卡片 Skeleton */}
        <div className="bg-surface rounded-xl p-4 shadow border border-border mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 animate-shimmer" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-shimmer w-1/3" />
              <div className="h-3 bg-gray-200 rounded animate-shimmer w-1/4" />
            </div>
          </div>
          <div className="space-y-2 mb-3">
            <div className="h-4 bg-gray-200 rounded animate-shimmer w-full" />
            <div className="h-4 bg-gray-200 rounded animate-shimmer w-full" />
            <div className="h-4 bg-gray-200 rounded animate-shimmer w-3/4" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-square bg-gray-200 rounded-lg animate-shimmer" />
            <div className="aspect-square bg-gray-200 rounded-lg animate-shimmer" />
            <div className="aspect-square bg-gray-200 rounded-lg animate-shimmer" />
          </div>
        </div>

        {/* CTA Skeleton */}
        <div className="h-48 bg-gray-200 rounded-xl animate-shimmer mb-8" />
      </div>
    </div>
  );
}
