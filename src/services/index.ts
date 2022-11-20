export const getHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  authorization: `Bearer ${token}`,
});

export * from './Auth';
export * from './Users';
export * from './Boards';
export * from './Columns';
export * from './Files';
export * from './Points';
export * from './Tasks';
