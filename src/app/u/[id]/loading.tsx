export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* 用戶資訊 Skeleton */}
      <div className="p-6 border-b border-gray-200 mb-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
          <div className="h-8 bg-gray-200 rounded w-48 mb-2" />
          <div className="h-5 bg-gray-200 rounded w-32" />
        </div>
      </div>

      {/* 評論列表標題 */}
      <div className="px-4 mb-4">
        <div className="h-8 bg-gray-200 rounded w-32" />
      </div>

      {/* 評論列表 Skeleton */}
      <div className="space-y-4 px-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border-b border-gray-200 pb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
