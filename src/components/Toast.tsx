import React from 'react';

interface ToastProps {
  message: string | null;
  icon?: string;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'info', visible }) => {
  if (!visible || !message) return null;

  return (
    <div className="fixed bottom-24 inset-x-margin max-w-sm mx-auto bg-primary text-on-primary py-2.5 px-4 rounded-full shadow-2xl flex items-center justify-center gap-2 text-center text-xs font-semibold z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-none">
      <span className="material-symbols-outlined text-base text-tertiary-fixed">{icon}</span>
      <span>{message}</span>
    </div>
  );
};
