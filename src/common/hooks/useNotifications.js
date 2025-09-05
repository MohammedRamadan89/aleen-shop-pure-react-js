// src/hooks/useNotification.js
import { toast, Zoom } from 'react-toastify';

const validTypes = ['success', 'error', 'info', 'warn'];

const useNotifications = () => {
  const notify = (status, msg, options = {}) => {
    const toastFn = validTypes.includes(status) ? toast[status] : toast;

    toastFn(msg, {
      icon: options.icon || "🛒",
      autoClose: options.autoClose ?? 2000,
      hideProgressBar: options.hideProgressBar ?? true,
      transition: options.transition || Zoom,
      style: {
        fontWeight: 'bold',
        fontSize: '0.9rem',
        opacity: 0.95,
        transition: 'all 0.9s ease-in-out',
        ...options.style,
      },
      ...options,
    });
  };

  return notify;
};

export default useNotifications;
