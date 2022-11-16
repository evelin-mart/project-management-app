interface RequestError {
  response?: string;
  request?: string;
}

interface ResponseError {
  status: string;
  data: string;
}

export interface ErrorInfo {
  code: string;
  message: string;
}

export const errorBoundary = (err: unknown) => {
  const info = {} as ErrorInfo;
  if ((err as RequestError).response) {
    const { status, data } = (err as RequestError).response as unknown as ResponseError;
    info.code = `${status} error`;
    info.message = data;
  } else if ((err as RequestError).request) {
    info.code = 'Request error';
    info.message = 'Check your internet connection or try again later';
  } else {
    info.code = 'Unknown error';
    info.message = 'We are working on it. Please, try again later';
  }

  return info;
};
