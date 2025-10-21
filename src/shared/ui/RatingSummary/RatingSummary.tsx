import React from 'react';
import { FaPaw, FaPoop } from 'react-icons/fa';
import clsx from 'clsx';

export interface RatingDistribution {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export interface RatingSummaryProps {
  pawRating: number;
  pawCount: number;
  pawDistribution: RatingDistribution;
  poopRating: number;
  poopCount: number;
  poopDistribution: RatingDistribution;
  className?: string;
}

export const RatingSummary: React.FC<RatingSummaryProps> = ({
  pawRating,
  pawCount,
  pawDistribution,
  poopRating,
  poopCount,
  poopDistribution,
  className,
}) => {
  // 渲染評分條形圖（採用 App 版本的計算邏輯）
  const renderRatingBars = (distribution: RatingDistribution, type: 'paw' | 'poop') => {
    const barColor = type === 'paw' ? 'bg-[#FFB800]' : 'bg-[#8B5E3C]';

    // 計算總評論數（與 App 版本一致）
    const totalReviews = distribution
      ? Object.values(distribution).reduce((sum, count) => sum + count, 0)
      : 0;

    // 計算每個評分的百分比（與 App 版本一致）
    const getPercentage = (rating: number) => {
      // 如果總評論數為 0，所有進度條都應該是 0%
      if (totalReviews === 0) {
        return 0;
      }

      const count = distribution[rating as keyof RatingDistribution];
      const percentage = (count / totalReviews) * 100;
      return percentage;
    };

    return (
      <div className="flex-1 space-y-1">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = distribution[rating as keyof RatingDistribution];
          const percentage = getPercentage(rating);

          return (
            <div key={rating} className="flex items-center gap-2 text-xs">
              <span className="w-3 text-gray-600">{rating}</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={clsx('h-full transition-all', barColor)}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 text-right text-gray-500">({count})</span>
            </div>
          );
        })}
      </div>
    );
  };

  // 渲染評分圖示
  const renderRatingIcons = (rating: number, type: 'paw' | 'poop') => {
    const fullStars = Math.floor(rating);
    const icons = [];
    const Icon = type === 'paw' ? FaPaw : FaPoop;
    const colorClass = type === 'paw' ? 'text-[#FFB800]' : 'text-[#8B5E3C]';

    for (let i = 0; i < 5; i++) {
      icons.push(
        <Icon
          key={i}
          className={clsx('w-4 h-4', i < fullStars ? colorClass : 'text-gray-200')}
        />
      );
    }
    return icons;
  };

  return (
    <div className={clsx('py-4', className)}>
      {/* 爪子評分區塊 */}
      <div className="mb-6">
        <div className="flex items-start gap-4">
          {/* 左側：評分數字 */}
          <div className="flex flex-col items-center min-w-[80px]">
            <div className="text-5xl font-bold text-gray-900">{pawRating.toFixed(0)}</div>
            <div className="flex gap-0.5 mt-1">
              {renderRatingIcons(pawRating, 'paw')}
            </div>
            <div className="text-sm text-gray-500 mt-1">({pawCount})</div>
          </div>

          {/* 右側：評分條形圖 */}
          {renderRatingBars(pawDistribution, 'paw')}
        </div>
      </div>

      {/* 便便評分區塊 */}
      <div>
        <div className="flex items-start gap-4">
          {/* 左側：評分數字 */}
          <div className="flex flex-col items-center min-w-[80px]">
            <div className="text-5xl font-bold text-gray-900">{poopRating.toFixed(0)}</div>
            <div className="flex gap-0.5 mt-1">
              {renderRatingIcons(poopRating, 'poop')}
            </div>
            <div className="text-sm text-gray-500 mt-1">({poopCount})</div>
          </div>

          {/* 右側：評分條形圖 */}
          {renderRatingBars(poopDistribution, 'poop')}
        </div>
      </div>
    </div>
  );
};
