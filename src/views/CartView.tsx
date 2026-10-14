import React, { useState } from 'react';
import { ViewType, CartItem } from '../types';

interface CartViewProps {
  cart: CartItem[];
  onNavigate: (view: ViewType) => void;
  onUpdateCartQuantity: (id: string, delta: number) => void;
  onOpenAddress: () => void;
  onOpenCoupons: () => void;
  appliedCoupon: string | null;
  selectedAddress: string;
  onOrderPlaced: (orderId: string) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cart,
  onNavigate,
  onUpdateCartQuantity,
  onOpenAddress,
  onOpenCoupons,
  appliedCoupon,
  selectedAddress,
  onOrderPlaced,
  onShowToast
}) => {
  const [cookingInstructions, setCookingInstructions] = useState(
    'Please pack pizza in heat-sealed box, keep cake upright'
  );
  const [deliveryType, setDeliveryType] = useState<'standard' | 'schedule'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cards' | 'netbanking' | 'cod'>('upi');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Billing calculations
  const rawItemTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemTotal = rawItemTotal > 0 ? rawItemTotal : 1486; // default fallback if empty
  const couponDiscount = appliedCoupon === 'WELCOME10' ? 148 : appliedCoupon === 'CAKEMAGIC' ? 100 : appliedCoupon === 'SWEET50' ? 50 : appliedCoupon === 'CAKECOMBO' ? 180 : 0;
  const packagingFee = 35;
  const taxes = Math.round((itemTotal - couponDiscount) * 0.05 * 100) / 100;
  const totalPayable = Math.max(0, itemTotal - couponDiscount + packagingFee + taxes);
  const totalSavings = couponDiscount + 40; // 40 free delivery savings

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    setTimeout(() => {
      setIsPlacingOrder(false);
      setOrderConfirmed(true);
      onShowToast('Payment Successful! Order #CB-84920 Confirmed.', 'check_circle');

      setTimeout(() => {
        onOrderPlaced('CB-84920');
        onNavigate('tracking');
      }, 1200);
    }, 1500);
  };

  return (
    <div className="flex flex-col relative w-full pt-16 pb-safe bg-surface">
      <div className="flex flex-col w-full pb-32">
        {/* Delivery Address Strip */}
        <section className="px-margin pt-space-md pb-space-sm">
          <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm flex items-start justify-between gap-space-sm">
            <div className="flex items-start gap-space-sm min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                  location_on
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-lg text-label-lg text-primary">Delivering to</span>
                  <span className="bg-secondary-container/20 text-secondary font-label-tag text-label-tag px-1.5 py-0.5 rounded-full uppercase font-bold">
                    Home
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant truncate mt-0.5">
                  {selectedAddress}
                </p>
                <span className="font-label-md text-label-md text-on-tertiary-container flex items-center gap-1 mt-1 font-semibold">
                  <span className="material-symbols-outlined text-sm">schedule</span> 30-35 mins to doorstep
                </span>
              </div>
            </div>
            <button
              onClick={onOpenAddress}
              className="px-3 py-1.5 rounded-full bg-surface-container-highest text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors flex-shrink-0 shadow-sm active:scale-95 cursor-pointer font-bold"
              type="button"
            >
              Change
            </button>
          </div>
        </section>

        {/* Cart Header Summary */}
        <div className="px-margin flex items-center justify-between mt-space-sm mb-space-xs">
          <div className="flex items-center gap-2">
            <h2 className="font-headline-md text-headline-md text-primary">My Cart</h2>
            <span className="bg-primary text-on-primary font-label-md text-label-md px-2 py-0.5 rounded-full">
              {cart.length} Items
            </span>
          </div>
          <button
            onClick={() => onNavigate('menu')}
            className="text-secondary font-label-md text-label-md flex items-center gap-1 hover:underline cursor-pointer font-bold"
            type="button"
          >
            <span className="material-symbols-outlined text-base">add_circle</span> Add more
          </button>
        </div>

        {/* Cart Items List */}
        <section className="px-margin flex flex-col gap-space-md mt-space-xs">
          {cart.map((item) => (
            <article
              key={item.id}
              className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm relative overflow-hidden"
            >
              <div className="flex gap-space-md">
                {/* FSSAI Veg Badge + Product Image */}
                <div className="relative flex-shrink-0">
                  <img className="w-20 h-20 rounded-lg object-cover" alt={item.name} src={item.image} />
                  <span
                    className="absolute top-1 left-1 w-4 h-4 rounded-sm bg-surface-container-lowest shadow-sm flex items-center justify-center p-0.5"
                    title={item.diet === 'non-veg' ? 'Non-Veg' : 'Vegetarian'}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        item.diet === 'non-veg' ? 'bg-[#C42B1C]' : 'bg-[#0F8A43]'
                      }`}
                    ></span>
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-space-xs">
                    <h3 className="font-headline-sm text-headline-sm text-primary leading-tight font-bold">
                      {item.name}
                    </h3>
                    <span className="font-title-currency text-title-currency text-primary">₹{item.price}</span>
                  </div>

                  {/* Customizations Tags */}
                  <div className="mt-1 flex flex-wrap gap-1">
                    {item.weight && (
                      <span className="bg-surface-container text-on-surface-variant font-label-tag text-label-tag px-1.5 py-0.5 rounded font-bold">
                        {item.weight}
                      </span>
                    )}
                    {item.diet === 'eggless' && (
                      <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-tag text-label-tag px-1.5 py-0.5 rounded font-bold">
                        Eggless
                      </span>
                    )}
                    {item.addons?.map((addon, idx) => (
                      <span
                        key={idx}
                        className="bg-secondary-fixed text-on-secondary-fixed-variant font-label-tag text-label-tag px-1.5 py-0.5 rounded font-bold"
                      >
                        {addon}
                      </span>
                    ))}
                    {item.subOptions?.map((sub, idx) => (
                      <span
                        key={idx}
                        className="bg-surface-container text-on-surface-variant font-label-tag text-label-tag px-1.5 py-0.5 rounded"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>

                  {/* Message Inscription if present */}
                  {item.customPlaque && (
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1.5 italic flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-on-tertiary-container">edit_note</span>
                      <span className="truncate">"{item.customPlaque}"</span>
                    </p>
                  )}

                  {/* Stepper & Actions */}
                  <div className="flex items-center justify-between mt-3 pt-2">
                    <button
                      onClick={() => onNavigate('customize')}
                      className="font-label-md text-label-md text-on-surface-variant hover:text-secondary flex items-center gap-1 cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">tune</span> Customize
                    </button>

                    <div className="flex items-center bg-surface-container rounded-full px-1 py-0.5 shadow-sm">
                      <button
                        onClick={() => onUpdateCartQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                        className="w-7 h-7 rounded-full flex items-center justify-center text-primary hover:bg-surface-container-highest active:scale-90 transition-transform cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-base">remove</span>
                      </button>
                      <span className="w-7 text-center font-label-lg text-label-lg text-primary font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateCartQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                        className="w-7 h-7 rounded-full flex items-center justify-center text-primary hover:bg-surface-container-highest active:scale-90 transition-transform cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-base">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Cooking & Packaging Instructions */}
        <section className="px-margin mt-space-lg">
          <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm">
            <div className="flex items-center gap-2 mb-space-xs">
              <span className="material-symbols-outlined text-on-tertiary-container text-lg">skillet</span>
              <label className="font-label-lg text-label-lg text-primary font-bold" htmlFor="instructions">
                Cooking &amp; Packaging Instructions
              </label>
            </div>
            <div className="relative bg-surface-container-lowest rounded-lg p-space-sm shadow-sm ring-1 ring-outline-variant/30">
              <textarea
                id="instructions"
                rows={2}
                maxLength={120}
                value={cookingInstructions}
                onChange={(e) => setCookingInstructions(e.target.value)}
                className="w-full bg-transparent font-body-md text-body-md text-on-surface focus:outline-none resize-none placeholder-on-surface-variant"
                placeholder="e.g. Please pack pizza in heat-sealed box, keep cake upright"
              />
              <div className="flex items-center justify-between pt-1">
                <span className="font-label-tag text-label-tag text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-[#0F8A43]">verified</span> Handled with food-grade temperature care
                </span>
                <span className="font-label-tag text-label-tag text-on-surface-variant">
                  {cookingInstructions.length}/120
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery Slot Options */}
        <section className="px-margin mt-space-lg">
          <h3 className="font-headline-sm text-headline-sm text-primary mb-space-xs flex items-center gap-1.5 font-bold">
            <span className="material-symbols-outlined text-lg text-secondary">moped</span> Delivery Preference
          </h3>
          <div className="grid grid-cols-2 gap-space-sm">
            {/* Standard Active Option */}
            <label
              onClick={() => setDeliveryType('standard')}
              className={`cursor-pointer p-space-md rounded-xl shadow-sm relative flex flex-col justify-between transition-all ${
                deliveryType === 'standard'
                  ? 'bg-surface-container-lowest ring-2 ring-secondary'
                  : 'bg-surface-container-low'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-7 h-7 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-base">bolt</span>
                </div>
                <input
                  type="radio"
                  name="delivery_type"
                  checked={deliveryType === 'standard'}
                  onChange={() => setDeliveryType('standard')}
                  className="w-4 h-4 accent-secondary cursor-pointer"
                />
              </div>
              <div className="mt-2">
                <span className="font-label-lg text-label-lg text-primary block font-bold">Standard Delivery</span>
                <span className="font-label-md text-label-md text-on-tertiary-container font-semibold">30-35 mins</span>
                <p className="font-label-tag text-label-tag text-on-surface-variant mt-0.5">Express dispatch from Brodipet</p>
              </div>
            </label>

            {/* Scheduled Option */}
            <label
              onClick={() => setDeliveryType('schedule')}
              className={`cursor-pointer p-space-md rounded-xl shadow-sm relative flex flex-col justify-between transition-all ${
                deliveryType === 'schedule'
                  ? 'bg-surface-container-lowest ring-2 ring-secondary'
                  : 'bg-surface-container-low'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-base">event_upcoming</span>
                </div>
                <input
                  type="radio"
                  name="delivery_type"
                  checked={deliveryType === 'schedule'}
                  onChange={() => setDeliveryType('schedule')}
                  className="w-4 h-4 accent-secondary cursor-pointer"
                />
              </div>
              <div className="mt-2">
                <span className="font-label-lg text-label-lg text-primary block font-bold">Schedule for Later</span>
                <span className="font-label-md text-label-md text-on-surface-variant">Pick date &amp; slot</span>
                <p className="font-label-tag text-label-tag text-on-surface-variant mt-0.5">Perfect for surprise parties</p>
              </div>
            </label>
          </div>
        </section>

        {/* Coupons & Offers Section */}
        <section className="px-margin mt-space-lg">
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-lg text-label-lg text-primary flex items-center gap-1.5 font-bold">
                <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                  redeem
                </span>
                Offers &amp; Benefits
              </span>
              <span className="bg-secondary-fixed text-on-secondary-fixed-variant font-label-tag text-label-tag px-2 py-0.5 rounded-full uppercase font-bold">
                {appliedCoupon ? '1 Applied' : 'Offers Available'}
              </span>
            </div>

            {/* Applied Coupon Card */}
            {appliedCoupon ? (
              <div className="bg-secondary-container/10 rounded-lg p-space-sm flex items-center justify-between">
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-secondary text-on-secondary flex items-center justify-center flex-shrink-0 font-headline-sm text-headline-sm">
                    %
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-lg text-label-lg text-primary uppercase tracking-wider font-bold">
                        {appliedCoupon}
                      </span>
                      <span className="bg-[#0F8A43]/15 text-[#0F8A43] font-label-tag text-label-tag px-1.5 py-0.2 rounded font-bold">
                        ₹{couponDiscount} saved!
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant truncate mt-0.5">
                      Discount applied on your sweet treat
                    </p>
                  </div>
                </div>
                <button
                  onClick={onOpenCoupons}
                  className="text-error font-label-md text-label-md font-semibold px-2 py-1 rounded hover:bg-error-container/20 transition-colors flex-shrink-0 cursor-pointer"
                  type="button"
                >
                  Change
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenCoupons}
                className="w-full bg-secondary-fixed/30 hover:bg-secondary-fixed/50 p-2.5 rounded-lg flex items-center justify-between text-secondary font-label-md cursor-pointer transition-colors"
              >
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="material-symbols-outlined text-base">local_offer</span>
                  Apply Coupon to save up to ₹180
                </span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            )}

            {/* Tap to View More Offers Button */}
            <button
              onClick={onOpenCoupons}
              className="w-full mt-space-sm pt-2 flex items-center justify-between font-label-md text-label-md text-secondary hover:text-on-secondary-container transition-colors cursor-pointer"
              type="button"
            >
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">local_offer</span>
                <span>Tap to view more offers (SWEET50, CAKECOMBO)</span>
              </span>
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </button>
          </div>
        </section>

        {/* Bill Details Breakdown */}
        <section className="px-margin mt-space-lg">
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-3 font-bold">Bill Details</h3>
            <div className="flex flex-col gap-2.5 font-body-md text-body-md text-on-surface">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Item Total</span>
                <span className="font-medium text-primary font-bold">₹{itemTotal.toFixed(2)}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between items-center text-[#0F8A43]">
                  <span className="flex items-center gap-1">
                    <span>Coupon Discount ({appliedCoupon})</span>
                    <span className="material-symbols-outlined text-xs">check_circle</span>
                  </span>
                  <span className="font-bold">-₹{couponDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span className="text-on-surface-variant">Delivery Fee (within 4km Brodipet)</span>
                  <span className="material-symbols-outlined text-xs text-on-surface-variant" title="Free delivery for orders above ₹499">
                    info
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="line-through text-on-surface-variant font-label-tag text-label-tag">₹40.00</span>
                  <span className="text-[#0F8A43] font-label-md text-label-md font-semibold uppercase">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Restaurant Packaging &amp; Cake Box Handling</span>
                <span className="font-medium text-primary">₹{packagingFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">GST &amp; Restaurant Taxes (5%)</span>
                <span className="font-medium text-primary">₹{taxes.toFixed(2)}</span>
              </div>

              <div className="bg-surface-container-high h-[1px] my-1"></div>

              <div className="flex justify-between items-center pt-1">
                <div>
                  <span className="font-headline-sm text-headline-sm text-primary block font-extrabold">To Pay</span>
                  <span className="font-label-tag text-label-tag text-[#0F8A43] font-bold">
                    Total savings ₹{totalSavings.toFixed(2)} on this order
                  </span>
                </div>
                <span className="font-title-currency text-title-currency text-primary font-extrabold">
                  ₹{totalPayable.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Method Selection */}
        <section className="px-margin mt-space-lg">
          <div className="flex items-center justify-between mb-space-xs">
            <h3 className="font-headline-sm text-headline-sm text-primary flex items-center gap-1.5 font-bold">
              <span className="material-symbols-outlined text-lg text-primary">payments</span> Select Payment Method
            </h3>
            <span className="font-label-tag text-label-tag text-[#0F8A43] flex items-center gap-0.5 font-bold">
              <span className="material-symbols-outlined text-xs">lock</span> 100% Encrypted
            </span>
          </div>

          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
            {/* Option 1: UPI */}
            <label
              onClick={() => setPaymentMethod('upi')}
              className={`p-space-md flex items-start justify-between cursor-pointer transition-colors ${
                paymentMethod === 'upi' ? 'bg-surface-container-low/60 ring-1 ring-primary' : 'hover:bg-surface-container-low'
              }`}
            >
              <div className="flex items-start gap-space-sm">
                <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-xl">qr_code_2</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-lg text-label-lg text-primary font-bold">UPI Instant Payment</span>
                    <span className="bg-[#0F8A43]/15 text-[#0F8A43] font-label-tag text-label-tag px-1.5 py-0.2 rounded font-bold">
                      Recommended
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                    Google Pay, PhonePe, Paytm, BHIM UPI
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-surface-container px-2 py-0.5 rounded text-[10px] font-bold text-on-surface-variant">
                      GPay
                    </span>
                    <span className="bg-surface-container px-2 py-0.5 rounded text-[10px] font-bold text-on-surface-variant">
                      PhonePe
                    </span>
                    <span className="bg-surface-container px-2 py-0.5 rounded text-[10px] font-bold text-on-surface-variant">
                      Paytm
                    </span>
                  </div>
                </div>
              </div>
              <input
                type="radio"
                name="payment_method"
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
                className="w-4 h-4 mt-1 accent-primary cursor-pointer"
              />
            </label>

            <div className="h-[1px] bg-surface-container-high mx-space-md"></div>

            {/* Option 2: Cards */}
            <label
              onClick={() => setPaymentMethod('cards')}
              className={`p-space-md flex items-start justify-between cursor-pointer transition-colors ${
                paymentMethod === 'cards' ? 'bg-surface-container-low/60 ring-1 ring-primary' : 'hover:bg-surface-container-low'
              }`}
            >
              <div className="flex items-start gap-space-sm">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-xl">credit_card</span>
                </div>
                <div>
                  <span className="font-label-lg text-label-lg text-primary block font-bold">Credit / Debit Cards</span>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                    Visa, Mastercard, RuPay, Maestro
                  </p>
                </div>
              </div>
              <input
                type="radio"
                name="payment_method"
                checked={paymentMethod === 'cards'}
                onChange={() => setPaymentMethod('cards')}
                className="w-4 h-4 mt-1 accent-primary cursor-pointer"
              />
            </label>

            <div className="h-[1px] bg-surface-container-high mx-space-md"></div>

            {/* Option 3: Net Banking */}
            <label
              onClick={() => setPaymentMethod('netbanking')}
              className={`p-space-md flex items-start justify-between cursor-pointer transition-colors ${
                paymentMethod === 'netbanking' ? 'bg-surface-container-low/60 ring-1 ring-primary' : 'hover:bg-surface-container-low'
              }`}
            >
              <div className="flex items-start gap-space-sm">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-xl">account_balance</span>
                </div>
                <div>
                  <span className="font-label-lg text-label-lg text-primary block font-bold">Net Banking</span>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                    SBI, HDFC, ICICI, Axis &amp; 40+ banks
                  </p>
                </div>
              </div>
              <input
                type="radio"
                name="payment_method"
                checked={paymentMethod === 'netbanking'}
                onChange={() => setPaymentMethod('netbanking')}
                className="w-4 h-4 mt-1 accent-primary cursor-pointer"
              />
            </label>

            <div className="h-[1px] bg-surface-container-high mx-space-md"></div>

            {/* Option 4: COD */}
            <label
              onClick={() => setPaymentMethod('cod')}
              className={`p-space-md flex items-start justify-between cursor-pointer transition-colors ${
                paymentMethod === 'cod' ? 'bg-surface-container-low/60 ring-1 ring-primary' : 'hover:bg-surface-container-low'
              }`}
            >
              <div className="flex items-start gap-space-sm">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-xl">local_atm</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-label-lg text-label-lg text-primary font-bold">Cash / UPI on Delivery</span>
                    <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-tag text-label-tag px-1.5 py-0.2 rounded font-bold">
                      Verified
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                    Pay via cash or dynamic UPI QR upon arrival
                  </p>
                </div>
              </div>
              <input
                type="radio"
                name="payment_method"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="w-4 h-4 mt-1 accent-primary cursor-pointer"
              />
            </label>
          </div>
        </section>

        {/* Safety & Trust Assurance Strip */}
        <section className="px-margin mt-space-md mb-2">
          <div className="bg-surface-container-low rounded-lg p-space-sm flex items-center justify-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-base text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
              security
            </span>
            <span className="font-label-tag text-label-tag uppercase tracking-wide">
              Cake Box Freshness Promise &amp; 100% Safe Contactless Delivery
            </span>
          </div>
        </section>

        {/* Sticky Bottom Checkout Action */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-xl shadow-[0_-4px_24px_-2px_rgba(43,24,16,0.12)] pb-safe pt-space-sm px-margin">
          <div className="max-w-md mx-auto flex items-center justify-between gap-space-md">
            <div className="min-w-0">
              <span className="font-label-tag text-label-tag uppercase tracking-wider text-on-surface-variant block">
                Total Payable
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-title-currency text-title-currency text-primary font-extrabold">
                  ₹{totalPayable.toFixed(2)}
                </span>
                <span className="line-through font-label-md text-label-md text-on-surface-variant">
                  ₹{(totalPayable + totalSavings).toFixed(0)}
                </span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              className={`flex-1 h-12 text-on-primary rounded-full px-space-md flex items-center justify-center gap-2 shadow-lg transition-all font-label-lg text-label-lg font-bold cursor-pointer ${
                orderConfirmed
                  ? 'bg-[#0F8A43]'
                  : isPlacingOrder
                  ? 'bg-primary opacity-80'
                  : 'bg-primary hover:bg-primary-container active:scale-[0.98]'
              }`}
              type="button"
            >
              {isPlacingOrder ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                  <span>Processing with Bank...</span>
                </>
              ) : orderConfirmed ? (
                <>
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  <span>Order Confirmed!</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                    lock
                  </span>
                  <span>Place Order • ₹{totalPayable.toFixed(2)}</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
