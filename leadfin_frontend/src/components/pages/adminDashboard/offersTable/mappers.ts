import { OfferData } from "./interfaces";

export const columnsMapping: Record<string, keyof OfferData> = {
    'ID': 'id',
    'Название': 'name',
    'Категории': 'categories',
    'Рекламодатель': 'client',
    'Статус': 'status',
    'Уровень приватности': 'privacyLevel',
    'CR за неделю': 'weekCr',
    'Дневной лимит': 'dailyLimit',
    'Общий лимит': 'totalLimit',
    'За сегодня': 'today',
    'Выплата': 'payment',
    'Доход': 'income',
    'Заметки': 'notes'
  };