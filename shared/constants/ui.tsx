import React from 'react';
import { ActionButtonType, BusinessCategory, PartnerType } from '@/shared/types';
import InfoContent from '@/components/ui/home/info/InfoContent';
import CommentActions from '@/components/comment/CommentActions';
import PetDetails from '@/components/petInfo/PetDetails';

// strokeWidth 和 iconSize 已在 icons.tsx 中定義

// 定義參數介面
export interface ShowBottomSheetContentParams {
  type?: ActionButtonType;
  onClose?: () => void;
  petInfo?: any;
  selectedComment?: any;
  isCurrentUser?: boolean;
}

export const showBottomSheetContent = (params?: ShowBottomSheetContentParams) => {
  // 解構參數，提供預設值
  const { type, onClose, petInfo, selectedComment, isCurrentUser } = params || {};

  // 如果沒有 type，返回 null
  if (!type) return null;

  switch (type) {
    case 'info':
      return <InfoContent />;
    case 'edit':
      return <CommentActions onClose={onClose} selectedComment={selectedComment} isCurrentUser={isCurrentUser} />;
    case 'petInfo':
      return <PetDetails defaultPetInfo={petInfo} />;
    default:
      return null;
  }
};

export const getBottomSheetTitle = (partnerType: PartnerType) => {
  const partnerText =
    partnerType === PartnerType.HonestDog ? '老實說狗狗' : '老實說貓貓';

  return {
    info: `${partnerText}的小提醒`,
    add: '新增',
    edit: '評論',
    petInfo: '寵物資訊',
  };
};

// 向後相容的靜態版本（預設為狗狗）
export const bottomSheetTitle = {
  info: '老實說狗狗的小提醒',
  add: '新增',
  edit: '評論',
  petInfo: '寵物資訊',
};

export const showPetFriendly = (businessCategory: BusinessCategory) =>
  businessCategory === BusinessCategory.Restaurant ||
  businessCategory === BusinessCategory.Hotel;
