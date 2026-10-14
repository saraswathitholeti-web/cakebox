import React, { useState } from 'react';
import { ViewType, Order } from '../types';
import { PROFILE_HERO_AVATAR, PAST_ORDERS } from '../data/mockData';

interface AccountViewProps {
  onNavigate: (view: ViewType) => void;
  onOpenAddress: () => void;
  onOpenCoupons: () => void;
  onShowToast: (msg: string, icon?: string) => void;
  isEgglessOnly: boolean;
  onToggleEggless: (val: boolean) => void;
  orders: Order[];
}

export const AccountView: React.FC<AccountViewProps> = ({
  onNavigate,
  onOpenAddress,
  onOpenCoupons,
  onShowToast,
  isEgglessOnly,
  onToggleEggless,
  orders
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'past' | 'cancelled'>('all');
  const [userRatings, setUserRatings] = useState<{ [orderId: string]: number }>({
    'CB-79104': 5
  });

  const handleRate = (orderId: string, star: number) => {
    setUserRatings((prev) => ({ ...prev, [orderId]: star }));
    onShowToast(`Rated ${star} stars for order #${orderId}!`, 'star');
  };

  const handleReorder = (orderId: string) => {
    onShowToast(`Items from #${orderId} added to your cart!`, 'replay');
    onNavigate('cart');
  };

  return (
    <div className="flex flex-col relative w-full pt-20 pb-28 bg-surface">
      <div className="flex flex-col w-full pb-10">
        {/* Profile & Rewards Header Bento */}
        <section className="px-margin pt-1 pb-3">
          <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-md flex flex-col gap-space-md">
            {/* Top Row: Avatar, Identity, Edit Action */}
            <div className="flex items-start justify-between gap-space-sm">
              <div className="flex items-center gap-space-md min-w-0">
                <div className="relative flex-shrink-0">
                  <img
                    className="w-14 h-14 rounded-full object-cover shadow-sm"
                    alt="Rahul Sharma"
                    src={PROFILE_HERO_AVATAR}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-secondary text-on-secondary w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm">
                    <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      workspace_premium
                    </span>
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h1 className="font-headline-sm text-headline-sm text-primary font-bold truncate">Rahul Sharma</h1>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-tag text-label-tag font-extrabold uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[11px] text-on-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                        stars
                      </span>
                      Gold Tier
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant truncate">+91 98480 22338</p>
                  <p className="font-label-md text-label-md text-on-surface-variant/80 truncate">rahul.sharma@example.com</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onShowToast('Account settings opened', 'tune')}
                  className="w-9 h-9 rounded-full bg-surface-container-low text-primary flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer"
                  title="Settings"
                >
                  <span className="material-symbols-outlined text-lg">tune</span>
                </button>
                <button
                  onClick={() => onShowToast('Editing Rahul Sharma profile', 'edit')}
                  className="w-9 h-9 rounded-full bg-surface-container-low text-primary flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer"
                  title="Edit Profile"
                >
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Ribbon */}
            <div className="grid grid-cols-3 gap-2 bg-surface-container-low p-2.5 rounded-xl">
              <div className="flex flex-col items-center justify-center text-center px-1">
                <span className="font-title-currency text-title-currency text-primary font-extrabold">14</span>
                <span className="font-label-tag text-label-tag text-on-surface-variant font-medium mt-0.5">Orders Placed</span>
              </div>
              <div
                onClick={onOpenCoupons}
                className="flex flex-col items-center justify-center text-center px-1 border-x-0 bg-surface-container-lowest/80 rounded-lg py-1 shadow-sm cursor-pointer hover:bg-surface-container-lowest"
              >
                <div className="flex items-center gap-0.5 text-secondary">
                  <span className="font-title-currency text-title-currency font-extrabold">₹240</span>
                </div>
                <span className="font-label-tag text-label-tag text-secondary font-bold uppercase tracking-wider mt-0.5">
                  SweetCash
                </span>
              </div>
              <div
                onClick={onOpenAddress}
                className="flex flex-col items-center justify-center text-center px-1 cursor-pointer hover:opacity-80"
              >
                <span className="font-title-currency text-title-currency text-primary font-extrabold">3</span>
                <span className="font-label-tag text-label-tag text-on-surface-variant font-medium mt-0.5">Saved Places</span>
              </div>
            </div>
          </div>
        </section>

        {/* Segmented Order Category Tabs */}
        <section className="px-margin py-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-label-lg text-label-lg shadow-sm flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-primary-container text-on-primary font-bold'
                  : 'bg-surface-container-low text-on-surface'
              }`}
            >
              <span>All Orders</span>
              <span className="w-4 h-4 rounded-full bg-white/20 text-white font-label-tag text-label-tag flex items-center justify-center font-bold">
                14
              </span>
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-label-lg text-label-lg shadow-sm flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer ${
                activeTab === 'active'
                  ? 'bg-secondary-container text-on-secondary-container font-bold'
                  : 'bg-surface-container-low text-on-surface'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
              <span>Active (1)</span>
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-label-lg text-label-lg transition-colors cursor-pointer ${
                activeTab === 'past'
                  ? 'bg-primary text-on-primary font-bold'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              Past Orders
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-label-lg text-label-lg transition-colors cursor-pointer ${
                activeTab === 'cancelled'
                  ? 'bg-primary text-on-primary font-bold'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              Cancelled
            </button>
          </div>
        </section>

        {/* Section: Live Order Spotlight */}
        {(activeTab === 'all' || activeTab === 'active') && (
          <section className="px-margin pt-2 pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
                <h2 className="font-headline-sm text-headline-sm text-primary font-bold">Active Delivery</h2>
              </div>
              <span className="font-label-tag text-label-tag uppercase font-extrabold text-secondary tracking-widest">
                Live GPS
              </span>
            </div>

            {/* Spotlight Live Card */}
            <div className="relative bg-surface-container-lowest rounded-2xl p-4 shadow-md overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary-container via-secondary to-tertiary-fixed"></div>

              {/* Order ID & Dynamic Time Status */}
              <div className="flex items-start justify-between gap-2 pt-1 pb-3">
                <div>
                  <span className="font-label-tag text-label-tag uppercase text-on-surface-variant font-bold tracking-wider">
                    Order Reference
                  </span>
                  <p className="font-headline-sm text-headline-sm text-primary font-extrabold tracking-tight">#CB-84920</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-bold shadow-sm">
                    <span className="material-symbols-outlined text-sm leading-none animate-spin">moped</span>
                    Arriving in 18-22 mins
                  </span>
                  <span className="font-label-tag text-label-tag text-on-surface-variant mt-1">
                    Ramesh Varma is on the way
                  </span>
                </div>
              </div>

              {/* Live Order Items Preview */}
              <div className="py-2.5 px-3 bg-surface-container-low rounded-xl flex flex-col gap-1.5 mb-3.5">
                <div className="flex items-center justify-between text-left">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-3.5 h-3.5 rounded-sm bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#0F8A43]"></span>
                    </span>
                    <span className="font-body-md text-body-md text-primary font-semibold truncate">
                      Signature Chocolate Truffle Cake (1kg)
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface-variant flex-shrink-0">1x</span>
                </div>

                <div className="flex items-center justify-between text-left">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-3.5 h-3.5 rounded-sm bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#0F8A43]"></span>
                    </span>
                    <span className="font-body-md text-body-md text-primary font-semibold truncate">
                      Paneer Tikka Artisan Pizza
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface-variant flex-shrink-0">1x</span>
                </div>

                <div className="flex items-center justify-between text-left">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-3.5 h-3.5 rounded-sm bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#0F8A43]"></span>
                    </span>
                    <span className="font-body-md text-body-md text-primary font-semibold truncate">
                      Creamy Cold Coffee (350ml)
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface-variant flex-shrink-0">2x</span>
                </div>

                <div className="pt-2 mt-1 flex items-center justify-between text-xs text-on-surface-variant">
                  <span>Paid via Google Pay UPI</span>
                  <span className="font-title-currency text-title-currency text-primary font-extrabold">₹1,441.65</span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => onNavigate('tracking')}
                  className="h-11 rounded-full bg-secondary text-on-secondary font-label-lg text-label-lg font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform hover:opacity-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">near_me</span>
                  Track on Map
                </button>
                <button
                  onClick={() => onNavigate('support')}
                  className="h-11 rounded-full bg-surface-container-high text-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-1.5 hover:bg-surface-container-highest transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">support_agent</span>
                  Get Help
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Section: Delivered Past Orders */}
        {(activeTab === 'all' || activeTab === 'past') && (
          <section className="px-margin pt-1 pb-3 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-headline-sm text-primary font-bold">Past Delivered Bakes</h2>
              <button
                onClick={() => onShowToast('Showing recent receipts and invoices', 'receipt')}
                className="font-label-md text-label-md text-secondary font-bold hover:underline cursor-pointer"
              >
                View Receipts
              </button>
            </div>

            {/* Past Order Card 1: Red Velvet Birthday Cake */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">cake</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-lg text-label-lg font-extrabold text-primary">#CB-79104</span>
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-surface-container text-on-surface-variant font-label-tag text-label-tag font-semibold">
                        Delivered
                      </span>
                    </div>
                    <p className="font-label-md text-label-md text-on-surface-variant">
                      14 Oct, 7:15 PM • Brodipet 4th Lane
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-title-currency text-title-currency text-primary font-extrabold">₹798.00</span>
                  <span className="block font-label-tag text-label-tag text-on-surface-variant">Paid via GPay</span>
                </div>
              </div>

              {/* Itemized Details */}
              <div className="flex flex-col gap-1 text-sm bg-surface-container-low/60 p-2.5 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-3 h-3 rounded-sm bg-white flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0F8A43]"></span>
                    </span>
                    <span className="font-body-md text-body-md text-on-surface font-medium truncate">
                      Red Velvet Cream Cheese Cake (500g)
                    </span>
                  </div>
                  <span className="font-label-tag text-label-tag text-on-surface-variant">1x</span>
                </div>
                <div className="pl-4.5 text-xs text-on-secondary-fixed-variant italic">
                  Message tag: "Happy Birthday Mom ❤️"
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-3 h-3 rounded-sm bg-white flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0F8A43]"></span>
                    </span>
                    <span className="font-body-md text-body-md text-on-surface font-medium truncate">
                      Crispy Peri-Peri Fries (Jumbo)
                    </span>
                  </div>
                  <span className="font-label-tag text-label-tag text-on-surface-variant">2x</span>
                </div>
              </div>

              {/* Feedback rating row */}
              <div className="flex items-center justify-between pt-0.5">
                <div className="flex items-center gap-1">
                  <span className="font-label-tag text-label-tag text-on-surface-variant">Your Rating:</span>
                  <div className="flex items-center text-on-tertiary-container">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRate('CB-79104', star)}
                        className="cursor-pointer"
                      >
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{
                            fontVariationSettings: (userRatings['CB-79104'] || 5) >= star ? "'FILL' 1" : "'FILL' 0"
                          }}
                        >
                          star
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onShowToast('Downloaded Tax Invoice #CB-79104.pdf', 'file_download')}
                    className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <span className="material-symbols-outlined text-sm">receipt</span>
                    Bill
                  </button>
                  <button
                    onClick={() => handleReorder('CB-79104')}
                    className="px-4 py-1.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-sm hover:bg-primary transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">replay</span>
                    Reorder
                  </button>
                </div>
              </div>
            </div>

            {/* Past Order Card 2: Pizza & Molten Lava */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">local_pizza</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-lg text-label-lg font-extrabold text-primary">#CB-72481</span>
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-surface-container text-on-surface-variant font-label-tag text-label-tag font-semibold">
                        Delivered
                      </span>
                    </div>
                    <p className="font-label-md text-label-md text-on-surface-variant">
                      28 Sep, 8:40 PM • Arundelpet Office
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-title-currency text-title-currency text-primary font-extrabold">₹448.00</span>
                  <span className="block font-label-tag text-label-tag text-on-surface-variant">Cash on Delivery</span>
                </div>
              </div>

              <div className="bg-surface-container-low/60 p-2.5 rounded-xl flex flex-col gap-1">
                <p className="font-body-md text-body-md text-on-surface truncate">• 1x Farmhouse Supreme Pan Pizza (10")</p>
                <p className="font-body-md text-body-md text-on-surface truncate">• 1x Crispy Veg Gourmet Burger</p>
                <p className="font-body-md text-body-md text-on-surface truncate">• 1x Choco Molten Lava Cup</p>
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <button
                  onClick={() => onShowToast('Thank you for rating order #CB-72481!', 'rate_review')}
                  className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary font-bold hover:underline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">rate_review</span>
                  Rate this Order
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onShowToast('Downloaded Tax Invoice #CB-72481.pdf', 'file_download')}
                    className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <span className="material-symbols-outlined text-sm">receipt</span>
                    Bill
                  </button>
                  <button
                    onClick={() => handleReorder('CB-72481')}
                    className="px-4 py-1.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-sm hover:bg-primary transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">replay</span>
                    Reorder
                  </button>
                </div>
              </div>
            </div>

            {/* Past Order Card 3: Assorted Pastry Box */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">cookie</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-lg text-label-lg font-extrabold text-primary">#CB-66219</span>
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-surface-container text-on-surface-variant font-label-tag text-label-tag font-semibold">
                        Delivered
                      </span>
                    </div>
                    <p className="font-label-md text-label-md text-on-surface-variant">12 Sep, 4:20 PM • Brodipet</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-title-currency text-title-currency text-primary font-extrabold">₹329.00</span>
                  <span className="block font-label-tag text-label-tag text-on-surface-variant">Paid Online</span>
                </div>
              </div>

              <div className="bg-surface-container-low/60 p-2.5 rounded-xl text-on-surface text-body-md font-body-md">
                <span>Assorted Handmade Chocolate Box (12 pcs) + Pineapple Fresh Cream Pastry</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-0.5">
                <button
                  onClick={() => onShowToast('Downloaded Tax Invoice #CB-66219.pdf', 'file_download')}
                  className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors cursor-pointer font-semibold"
                >
                  View Receipt
                </button>
                <button
                  onClick={() => handleReorder('CB-66219')}
                  className="px-4 py-1.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-sm hover:bg-primary transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">replay</span>
                  Reorder
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Section: Account Settings & Preferences Hub */}
        <section className="px-margin pt-3 pb-2 flex flex-col gap-3">
          <h2 className="font-headline-sm text-headline-sm text-primary font-bold">Preferences &amp; Hub</h2>
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col">
            {/* Saved Addresses Item */}
            <div
              onClick={onOpenAddress}
              className="flex items-center justify-between p-3.5 hover:bg-surface-container-low/70 transition-colors group cursor-pointer border-b border-surface-container-low"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-fixed transition-colors flex-shrink-0">
                  <span className="material-symbols-outlined text-xl">home_pin</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg font-bold text-primary">Saved Addresses</span>
                  <span className="font-body-md text-body-md text-on-surface-variant truncate">
                    Flat 402 Sri Sai Nivas, Brodipet • Arundelpet Office
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0 pl-2">
                <span className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center font-label-tag text-label-tag text-primary font-bold">
                  3
                </span>
                <span className="material-symbols-outlined text-outline text-lg">chevron_right</span>
              </div>
            </div>

            {/* SweetCash & Coupons */}
            <div
              onClick={onOpenCoupons}
              className="flex items-center justify-between p-3.5 hover:bg-surface-container-low/70 transition-colors group cursor-pointer border-b border-surface-container-low"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary group-hover:bg-secondary-fixed transition-colors flex-shrink-0">
                  <span className="material-symbols-outlined text-xl">savings</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg font-bold text-primary">SweetCash &amp; Vouchers</span>
                  <span className="font-body-md text-body-md text-on-surface-variant truncate">
                    ₹240 Balance available • 2 Active coupons
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0 pl-2">
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-tag text-label-tag font-bold">
                  2 Free
                </span>
                <span className="material-symbols-outlined text-outline text-lg">chevron_right</span>
              </div>
            </div>

            {/* Dietary Preference Toggle Row */}
            <div className="flex items-center justify-between p-3.5 hover:bg-surface-container-low/70 transition-colors border-b border-surface-container-low">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-[#0F8A43] flex-shrink-0">
                  <span className="material-symbols-outlined text-xl">eco</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg font-bold text-primary">Strictly 100% Eggless</span>
                  <span className="font-body-md text-body-md text-on-surface-variant truncate">
                    Filter menu items to purely vegetarian bakes
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 pl-2">
                <input
                  type="checkbox"
                  checked={isEgglessOnly}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    onToggleEggless(checked);
                    onShowToast(
                      checked
                        ? 'Eggless filter enabled for all bakes'
                        : 'All culinary options displayed',
                      'eco'
                    );
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[10px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F8A43]"></div>
              </label>
            </div>

            {/* Support & Helpdesk Tickets */}
            <div
              onClick={() => onNavigate('support')}
              className="flex items-center justify-between p-3.5 hover:bg-surface-container-low/70 transition-colors group cursor-pointer border-b border-surface-container-low"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-fixed transition-colors flex-shrink-0">
                  <span className="material-symbols-outlined text-xl">contact_support</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg font-bold text-primary">Help &amp; Past Tickets</span>
                  <span className="font-body-md text-body-md text-on-surface-variant truncate">
                    Ticket #TK-1092 Resolved (Sparkler candle)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0 pl-2">
                <span className="material-symbols-outlined text-outline text-lg">chevron_right</span>
              </div>
            </div>

            {/* Guntur Outlet Info & Hours */}
            <div
              onClick={() => onShowToast('Cake Box Flagship: 4th Lane Brodipet. Open 9:00 AM - 10:30 PM', 'store')}
              className="flex items-center justify-between p-3.5 hover:bg-surface-container-low/70 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-fixed transition-colors flex-shrink-0">
                  <span className="material-symbols-outlined text-xl">store</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg font-bold text-primary">Cake Box Guntur Flagship</span>
                  <span className="font-body-md text-body-md text-on-surface-variant truncate">
                    4th Lane, Brodipet • Open 9:00 AM – 10:30 PM
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0 pl-2">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface font-label-tag text-label-tag font-bold">
                  Open
                </span>
                <span className="material-symbols-outlined text-outline text-lg">chevron_right</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sweet Guarantee Notice & Footer Actions */}
        <section className="px-margin pt-3 pb-6 flex flex-col items-center text-center gap-3">
          {/* Artisanal Stamp */}
          <div className="w-full bg-surface-container-low p-3.5 rounded-2xl flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md font-bold text-primary">Fresh Bake Promise</span>
              <span className="font-label-tag text-label-tag text-on-surface-variant">
                Every order is freshly whipped and baked at our Brodipet kitchen on order receipt.
              </span>
            </div>
          </div>

          {/* Log Out Action & App Version Details */}
          <div className="flex flex-col items-center gap-1.5 pt-2">
            <button
              onClick={() => onShowToast('Signed out successfully from Cake Box device', 'logout')}
              className="font-label-lg text-label-lg text-secondary font-bold hover:underline flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              Log Out from Device
            </button>
            <span className="font-label-tag text-label-tag text-on-surface-variant/70 tracking-wider uppercase font-semibold">
              Cake Box App v2.4.0 • Guntur Fresh Bakes Ltd.
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};
