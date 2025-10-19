'use client';

import { useParams } from 'next/navigation';
import { UserProfileView } from '@/widgets/user-profile/ui';
import { useUser, useUserComments } from '@/shared/hooks';

export default function UserProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const { user, isLoading: isLoadingUser, isError: isErrorUser, error: userError } = useUser(id);
  const { comments, total, isLoading: isLoadingComments } = useUserComments(id, 15);

  // 載入中狀態
  if (isLoadingUser || isLoadingComments) {
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
  if (isErrorUser || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            載入失敗
          </h2>
          <p className="text-gray-600 mb-4">
            {userError instanceof Error ? userError.message : '找不到此使用者'}
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
    <UserProfileView
      user={user}
      comments={comments}
      total={total}
    />
  );
}
