// Deep Link 處理工具

export type DeviceType = 'ios' | 'android' | 'desktop';

// 🔧 手動控制：測試版 or 正式版
// false = 測試版（TestFlight）
// true = 正式版（App Store）
const IS_PRODUCTION = false;

// TestFlight 下載連結
const TESTFLIGHT_URL = 'https://testflight.apple.com/join/S8e3MFwj';

// App Store 下載連結
const APP_STORE_URL = 'https://apps.apple.com/app/ptalk/id6749347348';

/**
 * 偵測裝置類型
 * @returns DeviceType
 */
export function detectDevice(): DeviceType {
  if (typeof window === 'undefined') return 'desktop';

  const userAgent = window.navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  } else if (/android/.test(userAgent)) {
    return 'android';
  }

  return 'desktop';
}

/**
 * 取得下載連結（根據測試版/正式版）
 * @param device - 裝置類型
 * @returns Store URL
 */
export function getStoreUrl(device: DeviceType): string {
  const iosUrl = IS_PRODUCTION ? APP_STORE_URL : TESTFLIGHT_URL;
  const androidUrl =
    process.env.NEXT_PUBLIC_ANDROID_APP_URL ||
    'https://play.google.com/store/apps/details?id=com.ptalk';

  if (device === 'ios') {
    return iosUrl;
  } else if (device === 'android') {
    return androidUrl;
  }

  // 桌面版也導向 iOS 下載連結（可掃 QR Code 或傳到手機）
  return iosUrl;
}

/**
 * 取得按鈕文字（根據設備和版本）
 * @param device - 裝置類型
 * @param variant - 按鈕樣式 ('header' | 'cta')
 * @returns 按鈕文字
 */
export function getButtonText(device: DeviceType, variant: 'header' | 'cta' = 'header'): string {
  if (device === 'android') {
    return '即將推出';
  }

  if (IS_PRODUCTION) {
    // 正式版
    if (device === 'ios') {
      return variant === 'header' ? '下載 App' : '下載 PTalk';
    } else {
      return variant === 'header' ? 'iOS 版下載' : 'iOS 版下載';
    }
  } else {
    // 測試版
    if (device === 'ios') {
      return variant === 'header' ? '下載測試版' : '下載測試版';
    } else {
      return variant === 'header' ? 'iOS 測試版' : 'iOS 測試版';
    }
  }
}

/**
 * 開啟 App (Deep Link)
 * @param path - App 內部路徑 (例如: 'r/comment123')
 */
export function openApp(path?: string): void {
  const device = detectDevice();
  const appScheme = process.env.NEXT_PUBLIC_APP_SCHEME || 'ptalk://';
  const fullPath = path ? `${appScheme}${path}` : appScheme;

  // 桌面版直接導向商店
  if (device === 'desktop') {
    window.location.href = getStoreUrl(device);
    return;
  }

  // 嘗試開啟 App
  window.location.href = fullPath;

  // 如果 2 秒後還在網頁，表示沒有安裝 App，導向商店
  setTimeout(() => {
    // 檢查頁面是否還可見（如果已經開啟 App，頁面會被隱藏）
    if (!document.hidden) {
      window.location.href = getStoreUrl(device);
    }
  }, 2000);
}

/**
 * 產生 Deep Link URL
 * @param path - App 內部路徑
 * @returns Deep Link URL
 */
export function generateDeepLink(path: string): string {
  const appScheme = process.env.NEXT_PUBLIC_APP_SCHEME || 'ptalk://';
  return `${appScheme}${path}`;
}
