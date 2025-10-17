import {
  FeedbackType,
  MapWarningIcon,
  PartnerType,
  PetFriendlyLevel,
  FeedbackTypeAll,
} from '../types';
import { Venue } from '../types/user';

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 評價文字定義 - 集中管理方便修改
export const ratingTexts = {
  [FeedbackType.Paw]: {
    1: '沒有明顯優點，不會特別想再來',
    2: '表現普通，可能勉強考慮一次',
    3: '整體尚可，有些不錯的地方',
    4: '表現良好，有不少值得肯定之處',
    5: '極具好感！強烈推薦給其他人',
  },
  [FeedbackType.Poop]: {
    1: '有些小細節讓人不安，值得提醒一下',
    2: '體驗有點不順，建議多加觀察',
    3: '整體感受偏負面，有些地方讓我不太安心',
    4: '我個人感到失望，不太會想再來',
    5: '曾經發生讓我難過或驚訝的情況，基於個人經驗不建議前往',
  },
} as const;

// 評價圖片定義 - 狗狗版本
const dogRatingImages = {
  [FeedbackType.Paw]: {
    1: require('@/assets/images/rating/dog/狗抓抓1.png'),
    2: require('@/assets/images/rating/dog/狗抓抓2.png'),
    3: require('@/assets/images/rating/dog/狗抓抓3.png'),
    4: require('@/assets/images/rating/dog/狗抓抓4.png'),
    5: require('@/assets/images/rating/dog/狗抓抓5.png'),
  },
  [FeedbackType.Poop]: {
    1: require('@/assets/images/rating/dog/狗大便1.png'),
    2: require('@/assets/images/rating/dog/狗大便2.png'),
    3: require('@/assets/images/rating/dog/狗大便3.png'),
    4: require('@/assets/images/rating/dog/狗大便4.png'),
    5: require('@/assets/images/rating/dog/狗大便5.png'),
  },
} as const;

// 評價圖片定義 - 貓貓版本
const catRatingImages = {
  [FeedbackType.Paw]: {
    1: require('@/assets/images/rating/cat/貓抓抓1.png'),
    2: require('@/assets/images/rating/cat/貓抓抓2.png'),
    3: require('@/assets/images/rating/cat/貓抓抓3.png'),
    4: require('@/assets/images/rating/cat/貓抓抓4.png'),
    5: require('@/assets/images/rating/cat/貓抓抓5.png'),
  },
  [FeedbackType.Poop]: {
    1: require('@/assets/images/rating/cat/貓大便1.png'),
    2: require('@/assets/images/rating/cat/貓大便2.png'),
    3: require('@/assets/images/rating/cat/貓大便3.png'),
    4: require('@/assets/images/rating/cat/貓大便4.png'),
    5: require('@/assets/images/rating/cat/貓大便5.png'),
  },
} as const;

export const generateRatingCards = (
  type: FeedbackType,
  partnerType?: PartnerType
) => {
  const cards = [];

  // 根據 partnerType 選擇對應的圖片集
  const ratingImages =
    partnerType === PartnerType.HonestCat ? catRatingImages : dogRatingImages;

  for (let i = 1; i <= 5; i++) {
    const rating = i as 1 | 2 | 3 | 4 | 5;

    cards.push({
      rating,
      image: ratingImages[type]?.[rating],
      text: ratingTexts[type]?.[rating] || '',
    });
  }

  return cards;
};

// 決定要顯示哪個地圖標記圖標
export const getMapMarker = (
  venue: Venue,
  userPartnerType?: PartnerType,
  userMapWarningIconType?: MapWarningIcon,
  isHighlighted?: boolean
) => {
  // 檢查是否沒有任何評論
  const positiveCount = venue.ratingSummary.positive.count;
  const negativeCount = venue.ratingSummary.negative.count;

  if (positiveCount === 0 && negativeCount === 0) {
    // 沒有任何評論，顯示無評論標記
    return isHighlighted
      ? require('@/assets/images/map/noReview-hightLight.png')
      : require('@/assets/images/map/noReview.png');
  }

  // 判斷是正面還是負面評價
  let isPositive = false;

  const positivePaw = venue.ratingSummary.positive.rating;
  const negativePoop = venue.ratingSummary.negative.rating;
  isPositive = positivePaw > negativePoop;

  // 根據評價和使用者設定選擇圖片
  if (isPositive) {
    // 正面評價：根據使用者的夥伴類型選擇
    if (userPartnerType === PartnerType.HonestCat) {
      return isHighlighted
        ? require('@/assets/images/map/mapCat-hightLight.png')
        : require('@/assets/images/map/mapCat.png');
    }
    return isHighlighted
      ? require('@/assets/images/map/mapDog-hightLight.png')
      : require('@/assets/images/map/mapDog.png'); // 預設或狗狗
  } else {
    // 負面評價：根據使用者的警告圖示類型選擇
    if (userMapWarningIconType === MapWarningIcon.GrumpyPoop) {
      return isHighlighted
        ? require('@/assets/images/map/氣氣屎-hightLight.png')
        : require('@/assets/images/map/氣氣屎.png');
    }
    return isHighlighted
      ? require('@/assets/images/map/怒怒屎-hightLight.png')
      : require('@/assets/images/map/怒怒屎.png'); // 預設或怒怒屎
  }
};

// 評論篩選函數
export const matchesHonestGuideFilter = (
  comment: any,
  activeTag: FeedbackTypeAll
): boolean => {
  if (activeTag === FeedbackTypeAll.All) return true;

  const feedbackType = comment.feedback?.type;
  return feedbackType === activeTag;
};

export const matchesPetFriendlyFilter = (
  comment: any,
  petFriendlyFilter: PetFriendlyLevel | FeedbackTypeAll.All,
  shouldShowPetFriendlyFilter: boolean
): boolean => {
  if (
    !shouldShowPetFriendlyFilter ||
    petFriendlyFilter === FeedbackTypeAll.All
  ) {
    return true;
  }

  const petFriendlyLevel = comment.petFriendlyLevel || PetFriendlyLevel.Medium;
  return petFriendlyLevel === petFriendlyFilter;
};
