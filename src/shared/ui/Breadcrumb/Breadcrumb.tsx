/**
 * Breadcrumb 麵包屑導航元件
 * 用於顯示當前頁面在網站結構中的位置
 */

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbProps } from './Breadcrumb.types';

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav
      aria-label="麵包屑導航"
      className={`bg-white border-b border-gray-200 ${className}`}
    >
      <div className="w-full max-w-[600px] mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li
                key={index}
                className="flex items-center"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {/* 如果有連結且不是最後一項，顯示為連結 */}
                {item.href && !isLast ? (
                  <>
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-primary transition-colors"
                      itemProp="item"
                    >
                      <span itemProp="name">{item.name}</span>
                    </Link>
                    <meta itemProp="position" content={String(index + 1)} />
                  </>
                ) : (
                  <>
                    {/* 當前頁面（最後一項）不顯示連結 */}
                    <span
                      className={isLast ? 'text-gray-900 font-medium' : 'text-gray-600'}
                      itemProp="name"
                    >
                      {item.name}
                    </span>
                    <meta itemProp="position" content={String(index + 1)} />
                  </>
                )}

                {/* 分隔符號（最後一項不顯示） */}
                {!isLast && (
                  <ChevronRight
                    className="w-4 h-4 mx-2 text-gray-400"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
