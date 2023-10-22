import { DataItem } from "./interfaces";

export const columnsMapping: Record<string, keyof DataItem> = {
    'День': 'Day',
    'Трафик': 'Traffic',
    'Просмотры': 'Views',
    'Статус "принято"': 'Status "Accepted"',
    'Статус "холд"': 'Status "Hold"',
    'Статус "в обработке"': 'Status "In Process"',
    'Статус "отклонено"': 'Status "Rejected"',
    'CR': 'CR',
    'ERC': 'ERC',
    'ECPM': 'ECPM',
    'Всего': 'Total',
};

export const subColumnsMapper: Record<string, string> = {
    'Count': 'Количество',
    'Zero Conversions': 'Нулевые конверсии',
    'Income': 'Доход',
    'Hosts': 'Хосты',
    'Clicks': 'Клики',
};