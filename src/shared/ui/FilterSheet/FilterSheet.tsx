'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { FaPaw, FaPoop } from 'react-icons/fa';
import { FeedbackType, PetFriendlyLevel, CategoryType } from '@/shared/types';
import { SegmentedButtons } from '../SegmentedButtons';
import type { SegmentedButtonOption } from '../SegmentedButtons';
import type { FilterSheetProps, FilterState } from './FilterSheet.types';
import HandWithHeartsIconLow from '@/shared/ui/svg/HandWithHeartsIconLow';
import HandWithHeartsIconMedium from '@/shared/ui/svg/HandWithHeartsIconMedium';
import HandWithHeartsIconHight from '@/shared/ui/svg/HandWithHeartsIconHight';

/**
 * 篩選面板組件
 * 底部彈出的篩選視窗，用於篩選評論
 */
export function FilterSheet({ isOpen, filters, categoryType, onClose, onApply }: FilterSheetProps) {
  // 本地篩選狀態（用於暫存使用者選擇，點擊「套用」時才真正應用）
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  // 當外部 filters 改變時，同步到本地狀態
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // 評價選項
  const feedbackOptions: SegmentedButtonOption<FeedbackType | null>[] = [
    { value: null, label: '全部' },
    { value: FeedbackType.Positive, icon: <FaPaw className="text-[#ffc107c8]" /> },
    { value: FeedbackType.Negative, icon: <FaPoop className="text-[#8B5E3C]" /> },
  ];

  // 寵物友善程度選項
  const petFriendlyOptions: SegmentedButtonOption<PetFriendlyLevel | null>[] = [
    { value: null, label: '全部' },
    {
      value: PetFriendlyLevel.Low,
      icon: <HandWithHeartsIconLow size={20} />,
      selectedTitle: '低',
    },
    {
      value: PetFriendlyLevel.Medium,
      icon: <HandWithHeartsIconMedium size={20} />,
      selectedTitle: '中',
    },
    {
      value: PetFriendlyLevel.High,
      icon: <HandWithHeartsIconHight size={20} />,
      selectedTitle: '高',
    },
  ];

  // 判斷是否應該顯示寵物友善程度篩選（只有餐廳和飯店才顯示）
  const showPetFriendlyFilter = categoryType === CategoryType.Restaurant || categoryType === CategoryType.Hotel;

  // 獲取當前選中的寵物友善程度說明
  const petFriendlyDescription = useMemo(() => {
    if (localFilters.petFriendlyLevel === null) return null;

    const descriptions: Record<PetFriendlyLevel, Record<CategoryType, string>> = {
      [PetFriendlyLevel.Low]: {
        [CategoryType.Restaurant]: '僅可待指定區域，如櫃檯或門口空間',
        [CategoryType.Hotel]: '僅可留在指定區域，不可與飼主同住',
        [CategoryType.Cafe]: '',
        [CategoryType.Park]: '',
        [CategoryType.Other]: '',
      },
      [PetFriendlyLevel.Medium]: {
        [CategoryType.Restaurant]: '可同行但需籠推車，不可露頭外出',
        [CategoryType.Hotel]: '可與飼主同住，但禁止上床，許多公共設施不得進入',
        [CategoryType.Cafe]: '',
        [CategoryType.Park]: '',
        [CategoryType.Other]: '',
      },
      [PetFriendlyLevel.High]: {
        [CategoryType.Restaurant]: '寵物可自由陪同，不受空間限制',
        [CategoryType.Hotel]: '可自由陪同飼主入住，空間與設施皆開放使用',
        [CategoryType.Cafe]: '',
        [CategoryType.Park]: '',
        [CategoryType.Other]: '',
      },
    };

    return categoryType ? descriptions[localFilters.petFriendlyLevel][categoryType] : null;
  }, [localFilters.petFriendlyLevel, categoryType]);

  // 清空篩選
  const handleClear = () => {
    setLocalFilters({
      feedbackType: null,
      petFriendlyLevel: null,
    });
  };

  // 套用篩選
  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* 底部彈出面板 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 animate-slide-up">
        {/* 頂部拖曳指示條 */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* 頂部操作列 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <button
            onClick={handleClear}
            className="text-gray-600 hover:text-gray-800 text-sm font-medium"
          >
            清空
          </button>
          <h2 className="text-lg font-bold text-gray-900">篩選</h2>
          <button
            onClick={handleApply}
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            套用
          </button>
        </div>

        {/* 篩選內容 */}
        <div className="px-4 py-4 pb-8">
          <div className="space-y-5">
            {/* 評價篩選 */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-3">評價</h3>
              <SegmentedButtons
                options={feedbackOptions}
                value={localFilters.feedbackType}
                onChange={(value) =>
                  setLocalFilters((prev) => ({ ...prev, feedbackType: value }))
                }
                className="w-full"
              />
            </div>

            {/* 寵物友善程度篩選（僅餐廳和飯店顯示） */}
            {showPetFriendlyFilter && (
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-3">
                  寵物友善程度
                </h3>
                <SegmentedButtons
                  options={petFriendlyOptions}
                  value={localFilters.petFriendlyLevel}
                  onChange={(value) =>
                    setLocalFilters((prev) => ({ ...prev, petFriendlyLevel: value }))
                  }
                  className="w-full"
                  vertical
                />
              </div>
            )}
          </div>

          {/* 寵物友善程度說明（選中時顯示） */}
          {showPetFriendlyFilter && petFriendlyDescription && (
            <div className="mt-4 px-3 py-2.5 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 text-center">
                {petFriendlyDescription}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
