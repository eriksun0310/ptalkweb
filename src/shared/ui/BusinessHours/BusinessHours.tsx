'use client';

import React, { useState } from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';

export interface BusinessHoursData {
  day: string;
  hours: string;
  isToday?: boolean;
}

export interface BusinessHoursProps {
  isOpen: boolean;
  currentHours?: string;
  weeklyHours: BusinessHoursData[];
  className?: string;
}

export const BusinessHours: React.FC<BusinessHoursProps> = ({
  isOpen,
  currentHours = '11:00',
  weeklyHours,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={clsx('border-b border-gray-200 py-3', className)}>
      {/* 可點擊的標題列 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-700" />
          <span className={clsx('font-medium', isOpen ? 'text-green-600' : 'text-red-600')}>
            {isOpen ? '營業中' : '已打烊'}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {/* 展開的營業時間列表 */}
      {isExpanded && (
        <div className="mt-3 space-y-2 pl-7">
          {weeklyHours.map((item, index) => (
            <div
              key={index}
              className={clsx(
                'flex justify-between text-sm',
                item.isToday ? 'text-green-600 font-medium' : 'text-gray-700'
              )}
            >
              <span className="w-16">{item.day}</span>
              <span className="flex-1">{item.hours}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
