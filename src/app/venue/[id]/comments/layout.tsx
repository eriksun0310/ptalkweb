import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '店家評論',
};

export default function CommentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 此 layout 不包含 AppHeader，因為評論列表頁面有自己的 header
  return <>{children}</>;
}
