// Deep Link 處理工具

export type DeviceType = 'ios' | 'android' | 'desktop';

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
 * 取得 App Store 下載連結
 * @param device - 裝置類型
 * @returns Store URL
 */
export function getStoreUrl(device: DeviceType): string {
  const iosUrl = process.env.NEXT_PUBLIC_IOS_APP_URL || 'https://apps.apple.com/app/ptalk/id6749347348';
  const androidUrl =
    process.env.NEXT_PUBLIC_ANDROID_APP_URL ||
    'https://play.google.com/store/apps/details?id=com.ptalk';

  if (device === 'ios') {
    return iosUrl;
  } else if (device === 'android') {
    return androidUrl;
  }

  // 桌面版也導向 iOS App Store（可掃 QR Code 或傳到手機）
  return iosUrl;
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
