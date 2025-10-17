import React from 'react';
import {
  Utensils,
  Scissors,
  Hospital,
  BedDouble,
  MessageCircleWarning,
  Trash2,
  Pencil,
  AlertTriangle,
  Ban,
} from 'lucide-react-native';
import {
  ActionCategory,
  PetFriendlyLevel,
  PartnerType,
  PetType,
} from '../types';
import HandWithHeartsIconMedium from '@/components/ui/svg/HandWithHeartsIconMedium';
import HandWithHeartsIconLow from '@/components/ui/svg/HandWithHeartsIconLow';
import HandWithHeartsIconHight from '@/components/ui/svg/HandWithHeartsIconHight';
import SmallDogIcon from '@/components/ui/svg/SmallDogIcon';
import SmallCatIcon from '@/components/ui/svg/SmallCatIcon';

export const strokeWidth = 1.5;
export const iconSize = 24;

// 根據類型選擇對應的圖示（統一處理夥伴類型和寵物類型）
const getPartnerTypeIcon = (type: PartnerType | PetType) => {
  // PartnerType: HonestDog=1, HonestCat=2
  // PetType: Dog=1, Cat=2
  // 兩個 enum 的值對應相同，可以統一處理
  switch (type) {
    case 1: // PartnerType.HonestDog 或 PetType.Dog
      return <SmallDogIcon />;
    case 2: // PartnerType.HonestCat 或 PetType.Cat
      return <SmallCatIcon />;
    default:
      return <SmallDogIcon />;
  }
};

// 實際使用的函數名稱
export const getPartnerIcon = getPartnerTypeIcon;
export const getPetIcon = getPartnerTypeIcon;

export const getCategoryIcon = ({
  category,
  color = '#007AFF',
  size = iconSize,
}: {
  category: ActionCategory;
  color?: string;
  size?: number;
}) => {
  switch (category) {
    case ActionCategory.Restaurant:
      return <Utensils size={size} color={color} strokeWidth={strokeWidth} />;
    case ActionCategory.Hospital:
      return <Hospital size={size} color={color} strokeWidth={strokeWidth} />;
    case ActionCategory.Salon:
      return <Scissors size={size} color={color} strokeWidth={strokeWidth} />;
    case ActionCategory.Hotel:
      return <BedDouble size={size} color={color} strokeWidth={strokeWidth} />;
    case ActionCategory.Comment:
      return (
        <MessageCircleWarning
          size={size}
          color={color}
          strokeWidth={strokeWidth}
        />
      );
    case ActionCategory.Edit:
      return <Pencil size={size} color={color} strokeWidth={strokeWidth} />;
    case ActionCategory.Delete:
      return <Trash2 size={size} color={color} strokeWidth={strokeWidth} />;
    case ActionCategory.Report:
      return <AlertTriangle size={size} color={color} strokeWidth={strokeWidth} />;
    case ActionCategory.Block:
      return <Ban size={size} color={color} strokeWidth={strokeWidth} />;
    default:
      return null;
  }
};

export const getPetFriendlyIcon = (petFriendlyLevel: PetFriendlyLevel) => {
  switch (petFriendlyLevel) {
    case PetFriendlyLevel.Low:
      return <HandWithHeartsIconLow />; // Red
    case PetFriendlyLevel.Medium:
      return <HandWithHeartsIconMedium />; // Orange
    case PetFriendlyLevel.High:
      return <HandWithHeartsIconHight />; // Green
    default:
      return '#000000'; // Default color
  }
};

const avatarMap = {
  1: {
    // HonestDog
    1: require('@/assets/images/gender/狗狗男.png'),
    2: require('@/assets/images/gender/狗狗女.png'),
    3: require('@/assets/images/gender/狗狗秘密.png'),
  },
  2: {
    // HonestCat
    1: require('@/assets/images/gender/貓貓男.png'),
    2: require('@/assets/images/gender/貓貓女.png'),
    3: require('@/assets/images/gender/貓貓秘密.png'),
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
    require('@/assets/images/gender/狗狗秘密.png')
  );
};
