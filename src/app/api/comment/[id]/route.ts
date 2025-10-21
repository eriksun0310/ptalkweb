// Next.js API Route - 代理單則評論請求，解決 CORS 問題

import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_API_URL } from '@/shared/config';

/**
 * GET /api/comment/[id]
 * 代理單則評論請求到後端 API
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 建立完整的 API URL（使用統一配置的後端 API URL）
    const apiUrl = `${BACKEND_API_URL}/comment/${id}`;

    console.log('代理請求（評論詳情）:', apiUrl);

    // 向後端 API 發送請求
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // 設定快取策略
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
    // API 回傳: { success: true, data: {...} }
    // 前端期待: {...}
    const data = apiResponse.data || apiResponse;

    console.log('返回評論資料:', {
      id: data.id,
      venue: data.venue?.name,
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
 * OPTIONS /api/comment/[id]
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
