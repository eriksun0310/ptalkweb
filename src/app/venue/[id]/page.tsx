'use client';

import { useParams } from 'next/navigation';
import { VenueDetailView } from '@/widgets/venue-detail/ui';
import { useVenue, useVenueComments } from '@/shared/hooks';

export default function VenueDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { venue, isLoading: isLoadingVenue, isError: isErrorVenue, error: venueError } = useVenue(id);
  const { comments, total, isLoading: isLoadingComments } = useVenueComments(id, 20);

  // 載入中狀態
  if (isLoadingVenue || isLoadingComments) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  // 錯誤狀態
  if (isErrorVenue || !venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            載入失敗
          </h2>
          <p className="text-gray-600 mb-4">
            {venueError instanceof Error ? venueError.message : '找不到此店家'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full transition-colors"
          >
            重新載入
          </button>
        </div>
      </div>
    );
  }

  return (
    <VenueDetailView
      venue={venue}
      comments={comments}
      total={total}
    />
  );
}
