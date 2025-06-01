export const log = ({ module = 'LOGGER', type = 'log', message }: {
  module?: string;
  type?: 'warn' | 'error' | 'log';
  message: unknown;
}) => {
  (console[type])(`[${module}]:`, ...(Array.isArray(message) ? message : [message]));
};
