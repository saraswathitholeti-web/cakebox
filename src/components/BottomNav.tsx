import React from 'react';
import { ViewType } from '../types';

interface BottomNavProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  hasActiveOrder?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate, hasActiveOrder = true }) => {
  // Do not show 5-item bottom tab bar on standalone checkout/customization flow
  if (currentView === 'customize' || currentView === 'cart') {
    return null;
  }

  const navItems = [
    { id: 'home' as ViewType, label: 'Home', icon: 'storefront' },
    { id: 'menu' as ViewType, label: 'Menu', icon: 'bakery_dining' },
    { id: 'orders' as ViewType, label: 'Orders', icon: 'receipt_long', hasBadge: hasActiveOrder },
    { id: 'support' as ViewType, label: 'Support', icon: 'forum' },
    { id: 'account' as ViewType, label: 'Account', icon: 'account_circle' }
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/95 backdrop-blur-xl shadow-[0_-4px_24px_-2px_rgba(43,24,16,0.08)]">
      <div className="flex justify-around items-center h-16 px-space-xs max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1 w-16 h-12 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-primary font-bold bg-primary-fixed/40'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                {item.hasBadge && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-secondary-container ring-2 ring-surface animate-pulse"></span>
                )}
              </div>
              <span className="font-label-md text-label-md">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
