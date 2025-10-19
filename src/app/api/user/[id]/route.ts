// Next.js API Route - 代理使用者請求，解決 CORS 問題

import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://dev.api.pettalk.moushih.com/api';

/**
 * GET /api/user/[id]
 * 代理使用者資料請求到後端 API
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 建立完整的 API URL
    const apiUrl = `${API_BASE_URL}/user/${id}`;

    console.log('代理請求（使用者資料）:', apiUrl);

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
    // API 回傳: { success: true, data: {...} }
    // 前端期待: {...}
    const userData = apiResponse.data || null;

    if (!userData) {
      return NextResponse.json(
        { error: '找不到使用者資料' },
        { status: 404 }
      );
    }

    // 直接返回後端資料，不做任何轉換
    console.log('返回使用者資料:', {
      id: userData.id,
      name: userData.name,
      hasPetInfo: !!userData.petInfo,
    });

    // 返回資料，並設定 CORS 標頭
    return NextResponse.json(userData, {
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
 * OPTIONS /api/user/[id]
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
