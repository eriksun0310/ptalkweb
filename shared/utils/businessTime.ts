// 營業時間判斷工具函數

// 型別定義
interface Period {
  open: string;
  close: string | null;  // null 代表24小時營業
}

interface OpeningHour {
  dayType: number;
  periods: Period[];
}

// 取得今天的 dayType (1=星期一, 2=星期二, ..., 7=星期日)
const getTodayIndex = () => {
  // JS: 0=Sunday, 1=Monday,... 6=Saturday
  // API 資料: 1=星期一, 2=星期二, ..., 7=星期日
  const jsDay = new Date().getDay();
  // 將 JS day 轉換為 API dayType
  return jsDay === 0 ? 7 : jsDay; // 星期日是 7，其他直接對應
};

// 轉換時間字串為分鐘
const timeToMinutes = (time: string): number => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

/**
 * 根據營業時間資料判斷現在是否營業中
 * @param openingHours 營業時間陣列
 * @returns 是否營業中
 */
export const isBusinessOpenNow = (openingHours?: OpeningHour[]): boolean => {
  if (!openingHours || openingHours.length === 0) {
    return false; // 沒有營業時間資料
  }
  
  const now = new Date();
  const currentDay = getTodayIndex();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  // 找今天的營業時間
  const todayHours = openingHours.find(h => h.dayType === currentDay);
  if (!todayHours?.periods || todayHours.periods.length === 0) {
    return false; // 今天休息
  }
  
  // 檢查是否在任一營業時段內
  return todayHours.periods.some(period => {
    // 24小時營業的嚴格判斷：
    // 只有 dayType:7（星期日）且 periods:[{open: "00:00", close: null}] 才是24小時營業
    // 注意：這裡我們檢查當天的營業時間，如果當天符合24小時條件就判斷為24小時營業
    if (currentDay === 7 && 
        todayHours.periods.length === 1 && 
        todayHours.periods[0].open === '00:00' && 
        (todayHours.periods[0].close === null || todayHours.periods[0].close === 'null')) {
      return true;
    }
    
    // 如果不是24小時營業，但 close 為 null，跳過這個 period
    if (period.close === null || period.close === 'null') {
      return false;
    }
    
    const openMinutes = timeToMinutes(period.open);
    const closeMinutes = timeToMinutes(period.close);
    
    // 處理跨日情況（如 22:00-02:00）
    if (closeMinutes < openMinutes) {
      return currentMinutes >= openMinutes || currentMinutes <= closeMinutes;
    }
    
    // 正常情況（如 15:00-22:00）
    return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
  });
};

/**
 * 檢查店家是否為24小時營業
 * 只有 dayType:7（星期日）且 periods:[{open: "00:00", close: null}] 才算24小時營業
 * @param openingHours 營業時間陣列
 * @returns 是否為24小時營業
 */
export const is24HoursBusiness = (openingHours?: OpeningHour[]): boolean => {
  if (!openingHours || openingHours.length === 0) {
    return false;
  }
  
  // 找到星期日（dayType: 7）的營業時間
  const sundayHours = openingHours.find(h => h.dayType === 7);
  
  if (!sundayHours?.periods || sundayHours.periods.length !== 1) {
    return false;
  }
  
  // 檢查是否符合24小時營業的條件
  const period = sundayHours.periods[0];
  return period.open === '00:00' && 
         (period.close === null || period.close === 'null');
};

// 導出型別定義供其他地方使用
export type { Period, OpeningHour };