import { ImageResponse } from 'next/og';

// Apple Touch Icon 尺寸 (180x180)
export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

/**
 * 生成 Apple Touch Icon (180x180)
 * 用於 iOS 裝置新增至主畫面時的圖示
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 90,
          background: '#10b981',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '22%',
        }}
      >
        P
      </div>
    ),
    {
      ...size,
    }
  );
}
