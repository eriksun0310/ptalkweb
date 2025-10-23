import { ImageResponse } from 'next/og';

// 圖標大小配置
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

/**
 * 生成 favicon (32x32)
 * 使用 PTalk 品牌色和簡潔的設計
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#10b981',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '20%',
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
