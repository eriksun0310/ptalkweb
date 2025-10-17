export default function Loading() {
  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="max-w-2xl mx-auto px-4 pt-20">
        {/* 用戶資訊 Skeleton */}
        <div className="bg-surface rounded-xl p-6 shadow border border-border mb-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 animate-shimmer mb-4" />
            <div className="h-8 bg-gray-200 rounded animate-shimmer w-48 mb-2" />
            <div className="h-5 bg-gray-200 rounded animate-shimmer w-32" />
          </div>
        </div>

        {/* 分隔線 */}
        <div className="border-t border-border my-6" />

        {/* 評論列表 Skeleton */}
        <div>
          <div className="h-8 bg-gray-200 rounded animate-shimmer w-32 mb-4" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-surface rounded-xl p-4 shadow border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 animate-shimmer" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-shimmer w-1/3" />
                    <div className="h-3 bg-gray-200 rounded animate-shimmer w-1/4" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-shimmer w-full" />
                  <div className="h-4 bg-gray-200 rounded animate-shimmer w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
