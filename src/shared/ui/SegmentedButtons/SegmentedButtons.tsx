'use client';

import React from 'react';
import { SegmentedButtonsProps } from './SegmentedButtons.types';

/**
 * 分段按鈕選擇器組件（iOS Segmented Control 風格）
 * 用於單選情境，顯示多個選項並允許使用者選擇其中一個
 */
export function SegmentedButtons<T = any>({
  options,
  value,
  onChange,
  className = '',
  vertical = false,
}: SegmentedButtonsProps<T>) {
  return (
    <div className={`flex bg-gray-100 rounded-lg p-1 ${className}`}>
      {options.map((option, index) => {
        const isSelected = option.value === value;
        const isFirst = index === 0;
        const isLast = index === options.length - 1;

        // 決定顯示的文字：如果選中且有 selectedTitle，則顯示 selectedTitle；否則顯示 label
        const displayText = isSelected && option.selectedTitle ? option.selectedTitle : option.label;

        return (
          <button
            key={index}
            onClick={() => onChange(option.value)}
            className={`
              flex-1 ${vertical ? 'py-3 px-2' : 'px-4 py-2'} text-sm font-medium
              transition-all duration-200
              ${isFirst ? 'rounded-l-md' : ''}
              ${isLast ? 'rounded-r-md' : ''}
              ${
                isSelected
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'bg-transparent text-gray-600 hover:text-gray-900'
              }
            `}
          >
            <div className={`flex items-center justify-center ${vertical ? 'flex-col gap-1' : 'gap-1.5'}`}>
              {option.icon && (
                <span className={`flex items-center ${isSelected ? '' : 'opacity-70'}`}>
                  {option.icon}
                </span>
              )}
              {displayText && <span className="text-xs">{displayText}</span>}
            </div>
          </button>
        );
      })}
    </div>
  );
}
