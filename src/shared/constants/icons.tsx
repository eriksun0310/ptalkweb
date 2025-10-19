import React from 'react';
import { PetFriendlyLevel } from '../types';
import HandWithHeartsIconLow from '@/shared/ui/svg/HandWithHeartsIconLow';
import HandWithHeartsIconMedium from '@/shared/ui/svg/HandWithHeartsIconMedium';
import HandWithHeartsIconHight from '@/shared/ui/svg/HandWithHeartsIconHight';

export const getPetFriendlyIcon = (petFriendlyLevel: PetFriendlyLevel | null) => {
  if (petFriendlyLevel === null) {
    return null; // 如果沒有評級，不顯示圖示
  }

  switch (petFriendlyLevel) {
    case PetFriendlyLevel.Low:
      return <HandWithHeartsIconLow />; // Red
    case PetFriendlyLevel.Medium:
      return <HandWithHeartsIconMedium />; // Orange
    case PetFriendlyLevel.High:
      return <HandWithHeartsIconHight />; // Green
    default:
      return <HandWithHeartsIconMedium />;
  }
};

const avatarMap = {
  1: {
    // HonestDog
    1: '/images/gender/狗狗男.png',
    2: '/images/gender/狗狗女.png',
    3: '/images/gender/狗狗秘密.png',
  },
  2: {
    // HonestCat
    1: '/images/gender/貓貓男.png',
    2: '/images/gender/貓貓女.png',
    3: '/images/gender/貓貓秘密.png',
  },
};

export const getAvatarSource = ({
  genderType,
  partnerType,
}: {
  genderType: number;
  partnerType: number;
}) => {
  return (
    (avatarMap as any)[partnerType]?.[genderType] ||
    '/images/gender/狗狗秘密.png'
  );
};
