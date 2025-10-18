export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* 店家資訊骨架屏 */}
      <div className="bg-white overflow-hidden mb-6">
        <div className="w-full h-64 bg-gray-200" />
        <div className="p-4 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-2/3" />
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
      </div>

      {/* 評論列表骨架屏 */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white p-5 mb-4 border-b border-gray-100">
          <div className="flex gap-3 mb-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}
