export const log = ({ module = 'LOGGER', type = 'log', message }: {
  module?: string;
  type?: 'warn' | 'error' | 'log';
  message: unknown;
}) => {
  if (!import.meta?.env?.DEV) {
    return;
  }

  (console[type])(`[${module}]:`, ...(Array.isArray(message) ? message : [message]));
};
