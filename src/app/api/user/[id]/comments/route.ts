// Next.js API Route - 代理使用者評論請求，解決 CORS 問題

import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://dev.api.pettalk.moushih.com/api';

/**
 * GET /api/user/[id]/comments
 * 代理使用者評論列表請求到後端 API
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);

    // 取得查詢參數
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '15';
    const sortBy = searchParams.get('sortBy') || 'updateTime';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // 建立完整的 API URL（使用 /api/comment?UserId={id}）
    const apiUrl = `${API_BASE_URL}/comment?UserId=${id}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

    console.log('代理請求（使用者評論）:', apiUrl);

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
    // API 回傳: { success: true, data: { items: [...], totalCount, ... } }
    // 前端期待: { items: [...], totalCount, ... }
    const commentsData = apiResponse.data || { items: [], totalCount: 0 };

    console.log('返回使用者評論:', {
      userId: id,
      count: commentsData.items?.length || 0,
      totalCount: commentsData.totalCount || 0,
    });

    // 直接返回後端資料，不做任何轉換
    return NextResponse.json(commentsData, {
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
 * OPTIONS /api/user/[id]/comments
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
