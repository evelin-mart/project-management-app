export const getHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  authorization: `Bearer ${token}`,
});

export * from './Auth';
export * from './Users';
export * from './Board';
export * from './Columns';
export * from './File';
export * from './Tasks';
