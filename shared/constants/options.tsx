import React from 'react';
import { Text, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {
  BusinessCategory,
  FeedbackType,
  NeuteredType,
  PetFriendlyLevel,
  PetGenderType,
  PetType,
  TaiwanCities,
  UserGenderType,
  GrowthStatus,
  PartnerType,
  MapWarningIcon,
  FeedbackTypeAll,
} from '@/shared/types';
import HandWithHeartsIconMedium from '@/components/ui/svg/HandWithHeartsIconMedium';
import HandWithHeartsIconLow from '@/components/ui/svg/HandWithHeartsIconLow';
import HandWithHeartsIconHight from '@/components/ui/svg/HandWithHeartsIconHight';
import SmallDogIcon from '@/components/ui/svg/SmallDogIcon';
import SmallCatIcon from '@/components/ui/svg/SmallCatIcon';
import { Colors } from '@/constants/style';
import { iconSize } from './icons';

export const honestGuideOptions = [
  {
    value: FeedbackTypeAll.All,
    option: <Text style={{ fontSize: 14, fontWeight: '500' }}>全部</Text>,
    selectedTitle: '',
    description: '',
  },
  {
    value: FeedbackTypeAll.Paw,
    option: <FontAwesome5 name="paw" size={18} color="#ffd207" />,
    selectedTitle: '',
    description: '',
  },
  {
    value: FeedbackTypeAll.Poop,
    option: <FontAwesome5 name="poop" size={18} color={Colors.poop} />,
    selectedTitle: '',
    description: '',
  },
];

// 匯出 FeedbackTypeAll 供其他檔案使用
export { FeedbackTypeAll };

export const feedbackCommentOptions = [
  {
    value: FeedbackType.Paw,
    option: (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            marginRight: 5,
          }}
        >
          我要推薦
        </Text>
        <FontAwesome5 name="paw" size={iconSize} color={Colors.paw} />
      </View>
    ),
    selectedTitle: '',
    description: '',
  },

  {
    value: FeedbackType.Poop,
    option: (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            marginRight: 5,
          }}
        >
          我要警示
        </Text>
        <FontAwesome5 name="poop" size={iconSize} color={Colors.poop} />
      </View>
    ),
    selectedTitle: '',
    description: '',
  },
];

export const petFriendlyOptions = [
  {
    value: PetFriendlyLevel.Low,
    option: <HandWithHeartsIconLow />,
    selectedTitle: '低',
    description: {
      [BusinessCategory.Restaurant]: '僅可待指定區域，如櫃檯或門口空間',
      [BusinessCategory.Hotel]: '僅可留在指定區域，不可與飼主同住',
    },
  },

  {
    value: PetFriendlyLevel.Medium,
    option: <HandWithHeartsIconMedium />,
    selectedTitle: '中',
    description: {
      [BusinessCategory.Restaurant]: '可同行但需籠推車，不可露頭外出',
      [BusinessCategory.Hotel]:
        '可與飼主同住，但禁止上床，許多公共設施不得進入',
    },
  },

  {
    value: PetFriendlyLevel.High,
    option: <HandWithHeartsIconHight />,
    selectedTitle: '高',
    description: {
      [BusinessCategory.Restaurant]: '寵物可自由陪同，不受空間限制',
      [BusinessCategory.Hotel]: '可自由陪同飼主入住，空間與設施皆開放使用',
    },
  },
];

export const infoOptions = [
  {
    value: 'honestGuide',
    option: <Text>抓抓便便怎麼看？</Text>,
    selectedTitle: '',
    description: '說明每一顆抓抓與便便的意義，讓評分更準確',
  },
  {
    value: 'petFriendly',
    option: <Text>寵物友善程度</Text>,
    selectedTitle: '',
    description: '根據場所對寵物的接待規範分為三個等級。',
  },
];

export const taiwanCities = [
  { label: '台北', value: TaiwanCities.Taipei },
  { label: '新北', value: TaiwanCities.NewTaipei },
  { label: '桃園', value: TaiwanCities.Taoyuan },
  { label: '新竹', value: TaiwanCities.Hsinchu },
  { label: '苗栗', value: TaiwanCities.Miaoli },
  { label: '台中', value: TaiwanCities.Taichung },
  { label: '彰化', value: TaiwanCities.Changhua },
  { label: '南投', value: TaiwanCities.Nantou },
  { label: '雲林', value: TaiwanCities.Yunlin },
  { label: '嘉義', value: TaiwanCities.Chiayi },
  { label: '台南', value: TaiwanCities.Tainan },
  { label: '高雄', value: TaiwanCities.Kaohsiung },
  { label: '屏東', value: TaiwanCities.Pingtung },
  { label: '宜蘭', value: TaiwanCities.Yilan },
  { label: '花蓮', value: TaiwanCities.Hualien },
  { label: '台東', value: TaiwanCities.Taitung },
  { label: '澎湖', value: TaiwanCities.Penghu },
  { label: '金門', value: TaiwanCities.Kinmen },
  { label: '馬祖', value: TaiwanCities.Matsu },
];

export const PetTypeOptions = [
  {
    value: PetType.Dog,
    option: <SmallDogIcon />,
    selectedTitle: '狗狗',
    description: '',
  },
  {
    value: PetType.Cat,
    option: <SmallCatIcon />,
    selectedTitle: '貓貓',
    description: '',
  },
];

export const petBreedOptions = {
  [PetType.Dog]: [
    { label: '拉布拉多犬', value: '拉布拉多犬' },
    { label: '黃金獵犬', value: '黃金獵犬' },
    { label: '德國牧羊犬', value: '德國牧羊犬' },
    { label: '法國鬥牛犬', value: '法國鬥牛犬' },
    { label: '柴犬', value: '柴犬' },
    { label: '貴賓犬', value: '貴賓犬' },
    { label: '哈士奇', value: '哈士奇' },
    { label: '柯基犬', value: '柯基犬' },
    { label: '比熊犬', value: '比熊犬' },
    { label: '杜賓犬', value: '杜賓犬' },
    { label: '巴哥犬', value: '巴哥犬' },
    { label: '邊境牧羊犬', value: '邊境牧羊犬' },
    { label: '秋田犬', value: '秋田犬' },
    { label: '大丹犬', value: '大丹犬' },
    { label: '博美犬', value: '博美犬' },
    { label: '西施犬', value: '西施犬' },
    { label: '米格魯', value: '米格魯' },
    { label: '羅威納犬', value: '羅威納犬' },
    { label: '雪納瑞', value: '雪納瑞' },
    { label: '馬爾濟斯', value: '馬爾濟斯' },
    { label: '米克斯犬', value: '米克斯犬' },
    { label: '虎斑犬', value: '虎斑犬' },
  ],
  [PetType.Cat]: [
    { label: '英國短毛貓', value: '英國短毛貓' },
    { label: '美國短毛貓', value: '美國短毛貓' },
    { label: '蘇格蘭摺耳貓', value: '蘇格蘭摺耳貓' },
    { label: '布偶貓', value: '布偶貓' },
    { label: '波斯貓', value: '波斯貓' },
    { label: '緬因貓', value: '緬因貓' },
    { label: '孟加拉貓', value: '孟加拉貓' },
    { label: '俄羅斯藍貓', value: '俄羅斯藍貓' },
    { label: '暹羅貓', value: '暹羅貓' },
    { label: '埃及貓', value: '埃及貓' },
    { label: '挪威森林貓', value: '挪威森林貓' },
    { label: '斯芬克斯貓', value: '斯芬克斯貓' },
    { label: '喜馬拉雅貓', value: '喜馬拉雅貓' },
    { label: '土耳其安哥拉貓', value: '土耳其安哥拉貓' },
    { label: '東方短毛貓', value: '東方短毛貓' },
    { label: '德文雷克斯貓', value: '德文雷克斯貓' },
    { label: '阿比西尼亞貓', value: '阿比西尼亞貓' },
    { label: '日本短尾貓', value: '日本短尾貓' },
    { label: '加菲貓', value: '加菲貓' },
    { label: '曼赤肯貓', value: '曼赤肯貓' },
    { label: '米克斯貓', value: '米克斯貓' },
    { label: '虎斑貓', value: '虎斑貓' },
    { label: '賓士貓', value: '賓士貓' },
  ],
};

export const petGenderOptions = [
  {
    value: PetGenderType.Male,
    option: <Text>男生</Text>,
    selectedTitle: '',
    description: '',
  },
  {
    value: PetGenderType.Female,
    option: <Text>女生</Text>,
    selectedTitle: '',
    description: '',
  },
  {
    value: PetGenderType.Unknown,
    option: <Text>不清楚</Text>,
    selectedTitle: '',
    description: '',
  },
];

export const petNeuteredOptions = [
  {
    value: NeuteredType.Neutered,
    option: <Text>已結紮</Text>,
    selectedTitle: '',
    description: '',
  },
  {
    value: NeuteredType.NotNeutered,
    option: <Text>未結紮</Text>,
    selectedTitle: '',
    description: '',
  },
  {
    value: NeuteredType.Unknown,
    option: <Text>不清楚</Text>,
    selectedTitle: '',
    description: '',
  },
];

export const genderOptions = [
  {
    value: UserGenderType.Male,
    option: <Text>男</Text>,
    selectedTitle: '',
    description: '',
  },
  {
    value: UserGenderType.Female,
    option: <Text>女</Text>,
    selectedTitle: '',
    description: '',
  },
  {
    value: UserGenderType.Secret,
    option: <Text>秘密</Text>,
    selectedTitle: '',
    description: '',
  },
];

export const petAgeOptions = [
  { label: '小寶包(0–6 個月)', value: GrowthStatus.Baby },
  { label: '小搗蛋(7 個月–1 歲)', value: GrowthStatus.Teen },
  { label: '黏黏寶(2–7 歲)', value: GrowthStatus.Adult },
  { label: '想陪你很久(8歲以上)', value: GrowthStatus.Senior },
];

export const partnerOptions = {
  [PartnerType.HonestDog]: {
    label: '老實說狗狗',
    description: '對的我會推薦，爛的我會直接吠！',
  },
  [PartnerType.HonestCat]: {
    label: '老實說貓貓',
    description: '我不多話，但我說的你最好聽清楚。',
  },
};

export const mapWarningIconOptions = {
  [MapWarningIcon.AngryPoop]: {
    label: '怒怒屎',
    description: '你還沒到我先到，爆氣之前先通報！',
  },
  [MapWarningIcon.GrumpyPoop]: {
    label: '氣氣屎',
    description: '我話不多，但這地點真的不太妥。',
  },
};
