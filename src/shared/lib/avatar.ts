// Avatar utility functions - 與 React Native App 同步

import { GenderType, PartnerType } from '@/shared/types';

const avatarMap: Record<number, Record<number, string>> = {
  [PartnerType.Dog]: {
    [GenderType.Male]: '/images/gender/狗狗男.png',
    [GenderType.Female]: '/images/gender/狗狗女.png',
    [GenderType.Secret]: '/images/gender/狗狗秘密.png',
  },
  [PartnerType.Cat]: {
    [GenderType.Male]: '/images/gender/貓貓男.png',
    [GenderType.Female]: '/images/gender/貓貓女.png',
    [GenderType.Secret]: '/images/gender/貓貓秘密.png',
  },
};

export const getAvatarSource = ({
  genderType,
  partnerType,
}: {
  genderType: GenderType;
  partnerType: PartnerType;
}): string => {
  return (
    avatarMap[partnerType]?.[genderType] || '/images/gender/狗狗秘密.png'
  );
};

// 獲取用戶等級（根據評論數量計算爪子數量）
export const getUserLevel = (commentCount: number): number => {
  if (commentCount >= 100) return 5;
  if (commentCount >= 50) return 4;
  if (commentCount >= 20) return 3;
  if (commentCount >= 5) return 2;
  return 1;
};
