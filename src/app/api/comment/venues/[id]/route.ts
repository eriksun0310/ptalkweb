// Next.js API Route - 代理店家評論列表請求，解決 CORS 問題

import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_API_URL } from '@/shared/config';

/**
 * GET /api/comment/venues/[id]
 * 代理店家評論列表請求到後端 API
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 取得查詢參數
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '10';
    const sortBy = searchParams.get('sortBy') || 'updateTime';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // 建立完整的 API URL（使用統一配置的後端 API URL）
    const apiUrl = `${BACKEND_API_URL}/comment/venues/${id}?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

    console.log('代理請求（店家評論）:', apiUrl);

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

    // 解開 API 回傳的包裝結構，保留完整分頁資訊
    // API 回傳: { success: true, data: { items: [...], totalCount, pageCount, currentPage, pageSize } }
    const data = apiResponse.data || {
      items: [],
      totalCount: 0,
      pageCount: null,
      currentPage: 1,
      pageSize: parseInt(pageSize),
    };

    console.log('返回店家評論資料:', {
      venueId: id,
      itemsCount: data.items.length,
      totalCount: data.totalCount,
      currentPage: data.currentPage,
    });

    // 返回資料，並設定 CORS 標頭
    return NextResponse.json(data, {
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
 * OPTIONS /api/comment/venues/[id]
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
