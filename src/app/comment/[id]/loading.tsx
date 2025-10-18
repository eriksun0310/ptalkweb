export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* 店家資訊 Skeleton */}
      <div className="mb-6">
        <div className="relative w-full aspect-[16/9] bg-gray-200 mb-4" />
        <div className="px-4 space-y-2">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="h-5 bg-gray-200 rounded w-2/3" />
        </div>
      </div>

      {/* 評論卡片 Skeleton */}
      <div className="border-t border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-3 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="aspect-square bg-gray-200 rounded-lg" />
          <div className="aspect-square bg-gray-200 rounded-lg" />
          <div className="aspect-square bg-gray-200 rounded-lg" />
        </div>
      </div>

      {/* CTA Skeleton */}
      <div className="px-4">
        <div className="h-32 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}
