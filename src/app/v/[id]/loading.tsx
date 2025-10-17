export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-2xl mx-auto px-4 pt-20">
        <div className="animate-pulse">
          {/* 店家資訊骨架屏 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6">
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
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm mb-4">
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
      </div>
    </div>
  );
}
