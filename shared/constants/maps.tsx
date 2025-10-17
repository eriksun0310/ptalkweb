import {
  BusinessCategory,
  FeedbackType,
  GrowthStatus,
  MapWarningIcon,
  NeuteredType,
  PartnerType,
  PetGenderType,
} from '@/shared/types';

export const BusinessCategoryTitle = {
  [BusinessCategory.Restaurant]: '餐廳',
  [BusinessCategory.Hospital]: '醫院',
  [BusinessCategory.Salon]: '美容院',
  [BusinessCategory.Hotel]: '飯店',
};

export const PetGenderMap = {
  [PetGenderType.Male]: '男生',
  [PetGenderType.Female]: '女生',
  [PetGenderType.Unknown]: '不清楚',
};

export const PetNeuteredMap = {
  [NeuteredType.Neutered]: '已結紮',
  [NeuteredType.NotNeutered]: '未結紮',
  [NeuteredType.Unknown]: '不清楚',
};

export const GrowthStatusMap = {
  [GrowthStatus.Baby]: '小寶包',
  [GrowthStatus.Teen]: '小搗蛋',
  [GrowthStatus.Adult]: '黏黏寶',
  [GrowthStatus.Senior]: '想陪你很久',
};

export const PartnerMap = {
  [PartnerType.HonestDog]: '老實說狗狗',
  [PartnerType.HonestCat]: '老實說貓貓',
};

export const MapWarningIconMap = {
  [MapWarningIcon.AngryPoop]: '怒怒屎',
  [MapWarningIcon.GrumpyPoop]: '氣氣屎',
};

export const FeedbackTypeDisplayMap = {
  [FeedbackType.Paw]: '抓抓',
  [FeedbackType.Poop]: '便便',
} as const;
