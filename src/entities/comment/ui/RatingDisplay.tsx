import React from 'react';
import clsx from 'clsx';
import { FaPaw, FaPoop } from 'react-icons/fa';

export interface RatingDisplayProps {
  rating: number; // 1-5
  feedbackType: 1 | 2; // 1: 抓抓 (好評), 2: 便便 (負評)
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  feedbackType,
  size = 'md',
  showLabel = true,
}) => {
  const isPaw = feedbackType === 1;

  const sizeStyles = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const paddingStyles = {
    sm: 'px-2 py-1',
    md: 'px-3 py-1.5',
    lg: 'px-4 py-2',
  };

  const bgColor = isPaw ? 'bg-[#FFB800]' : 'bg-[#8B5E3C]';
  const textColor = 'text-white';
  const label = isPaw ? '抓抓' : '便便';

  const Icon = isPaw ? FaPaw : FaPoop;

  return (
    <div className="inline-flex items-center gap-2">
      {/* 評分徽章 - 圓角黃色/棕色背景 */}
      <div
        className={clsx(
          'inline-flex items-center gap-1.5 rounded-lg',
          bgColor,
          paddingStyles[size],
          sizeStyles[size]
        )}
      >
        <Icon className={clsx(iconSizes[size], textColor)} />
        <span className={clsx('font-bold', textColor)}>{rating.toFixed(1)}</span>
      </div>

      {/* 標籤文字 */}
      {showLabel && (
        <span className={clsx('font-medium', isPaw ? 'text-[#FFB800]' : 'text-[#8B5E3C]', sizeStyles[size])}>
          {label}
        </span>
      )}
    </div>
  );
};
