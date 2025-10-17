import { Colors } from '@/constants/style';
import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const HandWithHeartsIconHight = ({ size = 24, color = Colors.greenText }) => {
  return (
    <Svg
      width={40}
      height={size}
      viewBox="0 -9 30 30"
      stroke={color}
      fill="none"
      strokeWidth="2.5"
    >
      {/* 主要手掌圖示 - 先繪製在底層 */}
      <G>
        <Path
          d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="m2 13 6 6"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>

      {/* 第一顆心-右 */}
      <G transform="translate(15, -2)">
        <Path
          d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          scale="0.45"
        />
      </G>

      {/* 第二顆心-左  */}
      <G transform="translate(5, -1.5)">
        <Path
          d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          scale="0.45"
        />
      </G>

      {/* 第三顆心  */}
      <G transform="translate(10, -9)">
        <Path
          d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          scale="0.45"
          fill="none"
        />
      </G>
    </Svg>
  );
};

export default HandWithHeartsIconHight;
