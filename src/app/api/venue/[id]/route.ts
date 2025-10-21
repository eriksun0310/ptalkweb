// Next.js API Route - 代理店家詳情請求，解決 CORS 問題

import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_API_URL } from '@/shared/config';

/**
 * GET /api/venue/[id]
 * 代理店家詳情請求到後端 API
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 建立完整的 API URL（使用統一配置的後端 API URL）
    const apiUrl = `${BACKEND_API_URL}/venue/${id}`;

    console.log('代理請求（店家詳情）:', apiUrl);

    // 向後端 API 發送請求
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('API 請求失敗:', response.status, response.statusText);
      return NextResponse.json(
        { error: `API 請求失敗: ${response.statusText}` },
        { status: response.status }
      );
    }

    const apiResponse = await response.json();

    // 解開 API 回傳的包裝結構
    // API 回傳: { success: true, data: { items: [{...}] } }
    // 前端期待: {...}
    const venueData = apiResponse.data?.items?.[0] || null;

    if (!venueData) {
      return NextResponse.json(
        { error: '找不到店家資料' },
        { status: 404 }
      );
    }

    // 直接返回後端資料，不做任何轉換
    console.log('返回店家資料:', {
      id: venueData.id,
      name: venueData.name,
      hasImages: venueData.images?.length > 0,
      hasRatingSummary: !!venueData.ratingSummary,
    });

    // 返回資料，並設定 CORS 標頭
    return NextResponse.json(venueData, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('代理請求錯誤:', error);
    return NextResponse.json(
      { error: '代理請求失敗' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/venue/[id]
 * 處理 CORS preflight 請求
 */
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
