import { dataFromDatabase } from "./mockData";

export const columnsMapping: Record<string, keyof typeof dataFromDatabase[0]> = {
    'Имя компании': 'companyName',
    'email': 'email',
    'Контактное лицо': 'contactPerson',
    'Способ связи': 'commMethod',
    'Менеджер': 'manager',
    'Дата регистрации': 'created',
    'Офферы': 'offers',
    'Кэп': 'cap',
    'Дневной лимит': 'dailyLimit',
    'Общий лимит': 'totalLimit',
  };