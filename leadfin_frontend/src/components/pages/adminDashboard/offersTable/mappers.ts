import { dataFromDatabase } from "./mockData";

export const columnsMapping: Record<string, keyof typeof dataFromDatabase[0]> = {
    'ID': 'id',
    'Название': 'name',
    'Категории': 'categories',
    'Рекламодатель': 'client',
    'Статус': 'status',
    'Уровень приватности': 'privateLevel',
    'CR за неделю': 'weekCr',
    'Дневной лимит': 'dailyLimit',
    'Общий лимит': 'totalLimit',
    'За сегодня': 'today',
    'Выплата': 'payment',
    'Доход': 'income',
    'Заметки': 'notes'
  };