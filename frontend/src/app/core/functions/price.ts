export const getHandledCurrencyValue = (value: number): number => +(String(value).slice(0, -2) + '.' + String(value).slice(-2));
