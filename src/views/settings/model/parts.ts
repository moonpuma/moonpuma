export const VALID_PARTS = ['info', 'devices', 'subscriptions', 'payments'] as const;
export type Part = typeof VALID_PARTS[number];
