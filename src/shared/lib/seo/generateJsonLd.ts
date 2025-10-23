/**
 * JSON-LD 結構化資料生成工具
 * 用於 SEO 優化，生成符合 Schema.org 標準的結構化資料
 */

import type {
  Venue,
  Comment,
  User,
  VenueDetail,
} from '@/shared/types';

import type {
  LocalBusinessSchema,
  ReviewSchema,
  BreadcrumbListSchema,
  WebSiteSchema,
  ProfilePageSchema,
  ItemListSchema,
} from './schema-types';

import { getCategoryText, getDayOfWeekSchema } from './schema-types';

/**
 * 生成 LocalBusiness JSON-LD（店家資訊）
 */
export function generateLocalBusinessSchema(
  venue: VenueDetail,
  siteUrl: string = 'https://ptalk.app'
): LocalBusinessSchema {
  // 計算平均評分（使用可選鏈運算子防止 undefined 錯誤）
  const positiveRating = venue.ratingSummary?.positive?.rating ?? 0;
  const positiveCount = venue.ratingSummary?.positive?.count ?? 0;
  const negativeRating = venue.ratingSummary?.negative?.rating ?? 0;
  const negativeCount = venue.ratingSummary?.negative?.count ?? 0;

  const totalCount = positiveCount + negativeCount;
  const averageRating = totalCount > 0
    ? ((positiveRating * positiveCount + negativeRating * negativeCount) / totalCount)
    : 0;

  // 處理營業時間
  const openingHours = venue.openingHours?.map((hour) => ({
    '@type': 'OpeningHoursSpecification' as const,
    dayOfWeek: [getDayOfWeekSchema(hour.dayType)],
    opens: hour.periods[0]?.open || '00:00',
    closes: hour.periods[0]?.close || '23:59',
  }));

  const schema: LocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: venue.name,
    description: `${venue.name} - ${getCategoryText(venue.categoryType)}寵物友善店家`,
    image: venue.images?.length > 0 ? venue.images : undefined,
    url: `${siteUrl}/venue/${venue.id}`,
    telephone: venue.phone || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.address,
      addressCountry: 'TW',
    },
    geo: venue.location ? {
      '@type': 'GeoCoordinates',
      latitude: venue.location.lat,
      longitude: venue.location.lng,
    } : undefined,
    aggregateRating: totalCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: Number(averageRating.toFixed(1)),
      reviewCount: totalCount,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    openingHoursSpecification: openingHours && openingHours.length > 0 ? openingHours : undefined,
  };

  return schema;
}

/**
 * 生成 Review JSON-LD（評論）
 */
export function generateReviewSchema(
  comment: Comment,
  siteUrl: string = 'https://ptalk.app'
): ReviewSchema {
  // 計算評分（正面評價 = 5 分，負面評價 = 1 分的簡化邏輯）
  const ratingValue = comment.petFriendlyLevel === 1 ? 5 :
                      comment.petFriendlyLevel === 2 ? 3 : 1;

  const schema: ReviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: comment.reviewer?.name || '匿名使用者',
      image: comment.reviewer?.genderType && comment.reviewer?.partnerType
        ? `${siteUrl}/avatars/${comment.reviewer.genderType}-${comment.reviewer.partnerType}.png`
        : undefined,
    },
    datePublished: comment.updateTime || new Date().toISOString(),
    reviewBody: comment.content || '',
    reviewRating: {
      '@type': 'Rating',
      ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: comment.venue?.name || '店家',
      image: comment.venue?.images?.[0],
      address: comment.venue?.address,
    },
    image: comment.files
      ?.filter((f) => !f.isDeleted)
      .map((f) => f.url),
  };

  return schema;
}

/**
 * 生成 BreadcrumbList JSON-LD（麵包屑導航）
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>,
  siteUrl: string = 'https://ptalk.app'
): BreadcrumbListSchema {
  const schema: BreadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${siteUrl}${item.url}` : undefined,
    })),
  };

  return schema;
}

/**
 * 生成 WebSite JSON-LD（網站資訊）
 */
export function generateWebSiteSchema(
  siteUrl: string = 'https://ptalk.app'
): WebSiteSchema {
  const schema: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PTalk',
    url: siteUrl,
    description: '發現最適合你和毛小孩的友善店家，查看真實評價，分享你的寵物體驗',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return schema;
}

/**
 * 生成 ProfilePage JSON-LD（使用者檔案）
 */
export function generateProfilePageSchema(
  user: User,
  siteUrl: string = 'https://ptalk.app'
): ProfilePageSchema {
  const schema: ProfilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: user.name || '使用者',
      image: user.genderType && user.partnerType
        ? `${siteUrl}/avatars/${user.genderType}-${user.partnerType}.png`
        : undefined,
      description: `${user.name} 的 PTalk 個人檔案`,
      url: `${siteUrl}/user/${user.userId}`,
    },
    dateCreated: user.createdAt,
    dateModified: user.updatedAt,
  };

  return schema;
}

/**
 * 生成 ItemList JSON-LD（評論列表）
 */
export function generateItemListSchema(
  items: Array<{ name: string; url: string }>,
  siteUrl: string = 'https://ptalk.app'
): ItemListSchema {
  const schema: ItemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: `${siteUrl}${item.url}`,
    })),
  };

  return schema;
}

/**
 * 將 JSON-LD schema 轉換為 script 標籤字串
 */
export function jsonLdScriptProps(schema: any) {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(schema),
    },
  };
}
