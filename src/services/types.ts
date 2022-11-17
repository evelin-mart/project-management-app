export interface Result<T> {
  originalArgs?: unknown;
  data?: T;
  error?: unknown;
  endpointName?: string;
  fulfilledTimestamp?: number;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  startedTimeStamp?: number;
}

export interface BadRequestAnswer {
  statusCode: string;
  message: string;
}

export interface Response<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  config: unknown;
  request?: unknown;
}
