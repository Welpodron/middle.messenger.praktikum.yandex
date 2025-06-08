export const isAbortError = (error: unknown) => {
  if (error instanceof Error) {
    return error.name === 'AbortError';
  }

  if (error instanceof ProgressEvent) {
    return error.type === 'abort';
  }

  return false;
};
