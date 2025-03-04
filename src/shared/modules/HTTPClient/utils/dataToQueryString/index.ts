import type { TDynamicObject } from '../../../../types/utils';

export const dataToQueryString = (data: TDynamicObject = {}, parentKey = '') => {
  if (data == null) {
    return '';
  }

  if (typeof data !== 'object') {
    throw new Error(`dataToQueryString ожидает объект, получено значение с типом ${typeof data} или null`);
  }

  const queryParams: string[] = [];

  Object.entries(data).forEach(([key, value]) => {
    // TODO: Глянуть как бэк принимает (если кончено такое есть) вложенные объекты
    const paramKey = parentKey ? `${parentKey}[${key}]` : key;

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        // TODO: Глянуть как бэк принимает (если кончено такое есть) поля с множественными значениями
        queryParams.push(`${paramKey}[${index}]=${encodeURIComponent(item)}`);
      });
    }
    else if (typeof value === 'object' && value !== null) {
      const nestedQueryParams = dataToQueryString(value as TDynamicObject, paramKey);

      if (nestedQueryParams !== '') {
        queryParams.push(nestedQueryParams);
      }
    }
    else {
      queryParams.push(`${paramKey}=${value}`);
    }
  });

  return queryParams.length ? `?${queryParams.join('&')}` : '';
};
