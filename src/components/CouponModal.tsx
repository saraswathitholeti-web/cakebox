import React from 'react';
import { COUPONS } from '../data/mockData';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const CouponModal: React.FC<CouponModalProps> = ({
  isOpen,
  onClose,
  appliedCoupon,
  onApplyCoupon,
  onShowToast
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-primary-container/60 backdrop-blur-sm flex items-end justify-center p-0 transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-t-3xl w-full max-w-lg p-space-lg flex flex-col gap-space-md shadow-2xl animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-2xl">redeem</span>
            <h3 className="font-headline-md text-headline-md text-primary font-bold">Offers &amp; Benefits</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface cursor-pointer hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto no-scrollbar">
          {COUPONS.map((coupon) => {
            const isApplied = appliedCoupon === coupon.code;
            return (
              <div
                key={coupon.code}
                className={`p-3.5 rounded-2xl flex items-center justify-between gap-3 transition-all ${
                  isApplied
                    ? 'bg-secondary-fixed/40 ring-1 ring-secondary'
                    : 'bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-secondary text-on-secondary flex items-center justify-center font-bold text-lg shrink-0">
                    %
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-label-lg text-label-lg text-primary font-mono tracking-wider font-extrabold">
                        {coupon.code}
                      </span>
                      <span className="bg-[#0F8A43]/15 text-[#0F8A43] font-label-tag text-label-tag px-2 py-0.5 rounded font-bold">
                        Save ₹{coupon.discount}
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">{coupon.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (isApplied) {
                      onApplyCoupon('');
                      onShowToast(`Removed coupon ${coupon.code}`, 'remove_circle_outline');
                    } else {
                      onApplyCoupon(coupon.code);
                      onShowToast(`Applied coupon ${coupon.code} (-₹${coupon.discount})!`, 'check_circle');
                    }
                    onClose();
                  }}
                  className={`px-4 py-1.5 rounded-full font-label-md text-label-md font-bold transition-all shrink-0 cursor-pointer ${
                    isApplied
                      ? 'bg-error-container text-error hover:bg-error/20'
                      : 'bg-secondary text-on-secondary hover:bg-secondary-container active:scale-95 shadow-sm'
                  }`}
                >
                  {isApplied ? 'Remove' : 'Apply'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
