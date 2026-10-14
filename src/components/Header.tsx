import React from 'react';
import { LOGO_URL, USER_AVATAR_URL } from '../data/mockData';
import { ViewType } from '../types';

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onOpenAddress?: () => void;
  selectedAddress?: string;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenAddress,
  selectedAddress = "4th Lane, Brodipet, Guntur",
  onBack
}) => {
  // Screens with dedicated top bar (Customizer, Cart, Tracking)
  if (currentView === 'customize') {
    return (
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(61,35,20,0.06)] pt-safe">
        <div className="h-16 px-margin flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <button
              aria-label="Go back"
              className="w-11 h-11 -ml-2 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
              onClick={onBack || (() => onNavigate('home'))}
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
            <img alt="Cake Box Logo" className="h-7 w-auto object-contain flex-shrink-0" src={LOGO_URL} />
            <h1 className="font-headline-sm text-headline-sm text-primary truncate">Item Customization</h1>
          </div>
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => onNavigate('account')}
              className="rounded-full ring-2 ring-primary-fixed hover:opacity-90 transition-opacity cursor-pointer"
            >
              <img alt="Profile" className="w-8 h-8 rounded-full object-cover" src={USER_AVATAR_URL} />
            </button>
          </div>
        </div>
      </header>
    );
  }

  if (currentView === 'cart') {
    return (
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(61,35,20,0.06)] pt-safe">
        <div className="h-16 px-margin flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <button
              aria-label="Go back"
              className="w-11 h-11 -ml-2 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
              onClick={onBack || (() => onNavigate('home'))}
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
            <img alt="Cake Box Logo" className="h-7 w-auto object-contain flex-shrink-0" src={LOGO_URL} />
            <h1 className="font-headline-sm text-headline-sm text-primary truncate">Cart Checkout</h1>
          </div>
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => onNavigate('account')}
              className="rounded-full ring-2 ring-primary-fixed hover:opacity-90 transition-opacity cursor-pointer"
            >
              <img alt="Profile" className="w-8 h-8 rounded-full object-cover" src={USER_AVATAR_URL} />
            </button>
          </div>
        </div>
      </header>
    );
  }

  if (currentView === 'tracking') {
    return (
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(61,35,20,0.06)] pt-safe">
        <div className="h-16 px-margin flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <button
              aria-label="Go back"
              className="w-11 h-11 -ml-2 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
              onClick={onBack || (() => onNavigate('orders'))}
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
            <div className="flex flex-col min-w-0">
              <span className="font-label-tag text-label-tag text-on-surface-variant uppercase tracking-wider">Live Tracking</span>
              <div className="flex items-center gap-1.5">
                <h1 className="font-headline-sm text-headline-sm text-primary truncate">Order</h1>
                <span className="font-label-md text-label-md bg-surface-container-high text-primary px-2 py-0.5 rounded-full font-bold">#CB-84920</span>
              </div>
            </div>
          </div>
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => onNavigate('support')}
              aria-label="Help and Support"
              className="h-9 px-3 rounded-full bg-surface-container hover:bg-surface-container-high active:scale-95 transition-all flex items-center gap-1.5 text-primary cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg text-secondary">support_agent</span>
              <span className="font-label-md text-label-md font-semibold">Help</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  if (currentView === 'support') {
    return (
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/95 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(61,35,20,0.06)] pt-safe">
        <div className="h-16 px-margin flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <button
              aria-label="Go back"
              className="w-11 h-11 -ml-2 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all flex-shrink-0 cursor-pointer"
              onClick={onBack || (() => onNavigate('home'))}
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-headline-sm ring-2 ring-primary-fixed">
                <span className="material-symbols-outlined text-xl text-primary-fixed">support_agent</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-surface" title="Online"></span>
            </div>
            <div className="flex flex-col min-w-0 leading-tight">
              <div className="flex items-center gap-1">
                <h1 className="font-headline-sm text-headline-sm text-primary truncate leading-tight">Cake Box Assistant</h1>
                <span className="material-symbols-outlined text-[15px] text-secondary font-bold">verified</span>
              </div>
              <p className="font-label-md text-label-md text-on-surface-variant truncate">Cake Box Brodipet Kitchen Support</p>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => onNavigate('tracking')}
              aria-label="Order Details"
              className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
              title="Order Info"
            >
              <span className="material-symbols-outlined text-xl text-primary-container">receipt_long</span>
            </button>
            <a
              aria-label="Call Kitchen"
              className="w-10 h-10 rounded-full bg-secondary/10 hover:bg-secondary/15 text-secondary flex items-center justify-center active:scale-95 transition-all"
              href="tel:+918632220199"
              title="Call Escalation"
            >
              <span className="material-symbols-outlined text-xl text-secondary">call</span>
            </a>
          </div>
        </div>
      </header>
    );
  }

  // Standard Storefront Header for Home, Menu, Orders, Account
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(61,35,20,0.06)] pt-safe">
      <div className="h-20 px-margin flex items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm min-w-0 flex-1">
          <img alt="Cake Box Logo" className="h-8 w-auto object-contain flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')} src={LOGO_URL} />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-space-xs">
              <span className="font-label-tag text-label-tag uppercase text-secondary font-bold tracking-wider">Cake Box Guntur</span>
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-tag text-label-tag font-bold">
                <span className="material-symbols-outlined text-[10px] leading-none">schedule</span>
                30-35 mins
              </span>
            </div>
            <button
              onClick={onOpenAddress}
              className="flex items-center gap-1 text-left min-w-0 group cursor-pointer"
            >
              <span className="material-symbols-outlined text-secondary text-sm flex-shrink-0">location_on</span>
              <span className="font-headline-sm text-headline-sm text-primary truncate group-hover:text-secondary transition-colors">
                {selectedAddress}
              </span>
              <span className="material-symbols-outlined text-outline text-base flex-shrink-0">expand_more</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-space-xs flex-shrink-0">
          <button
            onClick={() => onNavigate('orders')}
            aria-label="Notifications"
            className="w-11 h-11 relative rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-secondary"></span>
          </button>
          <button
            onClick={() => onNavigate('account')}
            className="w-11 h-11 flex items-center justify-center rounded-full ring-2 ring-primary-fixed hover:opacity-90 transition-opacity cursor-pointer"
            aria-label="Profile Account"
          >
            <img alt="Profile" className="w-8 h-8 rounded-full object-cover" src={USER_AVATAR_URL} />
          </button>
        </div>
      </div>
    </header>
  );
};
