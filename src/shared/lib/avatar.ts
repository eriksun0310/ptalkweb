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

