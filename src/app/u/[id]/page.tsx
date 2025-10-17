import { Metadata } from 'next';
import { UserProfileView } from '@/widgets/user-profile/ui';
import { getMockUser, getMockUserComments } from '@/shared/lib/mockData';

type Props = {
  params: { id: string };
};

// 產生 Metadata（Open Graph）
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 使用 Mock 資料
  const user = getMockUser(params.id);

  const title = `${user.name} 的評論 | PTalk`;
  const description = `查看 ${user.name} 的 ${user.commentCount} 則寵物友善店家評論`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: user.avatar,
          width: 400,
          height: 400,
          alt: user.name,
        },
      ],
      type: 'profile',
      url: `https://ptalk.app/u/${params.id}`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [user.avatar],
    },
  };
}

// Server Component - 使用 Mock 資料
export default async function UserProfilePage({ params }: Props) {
  // 使用 Mock 資料替代 API 請求
  const user = getMockUser(params.id);
  const comments = getMockUserComments(params.id, 10);

  return <UserProfileView user={user} comments={comments} />;
}
