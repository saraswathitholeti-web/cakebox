import React, { useState } from 'react';
import { Product, CartItem, ViewType } from '../types';

interface CustomizerViewProps {
  product: Product | null;
  onNavigate: (view: ViewType) => void;
  onAddToCart: (customizedItem: CartItem) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const CustomizerView: React.FC<CustomizerViewProps> = ({
  product,
  onNavigate,
  onAddToCart,
  onShowToast
}) => {
  // Fallback product if directly visited
  const currentProduct: Product = product || {
    id: 'prod-truffle',
    name: 'Signature Chocolate Truffle Cake',
    category: 'cakes',
    price: 499,
    originalPrice: 599,
    rating: 4.9,
    reviewsCount: 1240,
    description:
      'Velvety Belgian dark chocolate ganache draped over ultra-soft cocoa sponge layers, infused with pure Madagascar vanilla syrup. Handcrafted fresh to order by Cake Box master patissiers.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBaBu-RicFSHxWKrJkbfq8hRhq0-kWlVuoBuPozlqm1lRp2GUWCwjSq9OQ7l-1lguIbjgI32_BULw6RfGSr_b7jHqZRYDeSRMjOpR-gv_Yvv_6-A3g_Ebis8ctjThpYaM1-1WJ4g_3hRPr_9CC2jK06Fngy5C-wrXpVozG7NBNL5UldAe_EvYQv_HoqvW35wkXC7-ILYHuWn9o-btw9DgJCEtbs5W15f8vMIuS6oGOjYwfRissOk_Ft',
    diet: 'eggless',
    badge: 'Bestseller'
  };

  const [selectedWeight, setSelectedWeight] = useState<'500g' | '1kg' | '2kg'>('500g');
  const [selectedDiet, setSelectedDiet] = useState<'eggless' | 'egg'>('eggless');
  const [pipedMessage, setPipedMessage] = useState<string>('Happy Birthday Rahul ❤️');
  const [addons, setAddons] = useState<{ [key: string]: boolean }>({
    sparkler: false,
    topper: false,
    cutlery: true,
    card: false
  });
  const [deliveryDay, setDeliveryDay] = useState<'today' | 'tomorrow'>('today');
  const [deliverySlot, setDeliverySlot] = useState<string>('Today Evening 6:00 PM – 8:00 PM');
  const [kitchenNotes, setKitchenNotes] = useState<string>('Please keep chilled and handle with care');
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Pricing calculation
  const weightPrices = {
    '500g': 499,
    '1kg': 899,
    '2kg': 1599
  };

  const addonPrices = {
    sparkler: 40,
    topper: 60,
    cutlery: 0,
    card: 20
  };

  const basePrice = weightPrices[selectedWeight];
  const addonsTotal = Object.entries(addons).reduce((sum, [key, active]) => {
    return active ? sum + (addonPrices[key as keyof typeof addonPrices] || 0) : sum;
  }, 0);

  const grandTotal = basePrice + addonsTotal;

  const handleAddonToggle = (key: string) => {
    setAddons((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);

      const activeAddonNames: string[] = [];
      if (addons.sparkler) activeAddonNames.push('+1 Sparkler Candle');
      if (addons.topper) activeAddonNames.push('+1 Gold Acrylic Topper');
      if (addons.cutlery) activeAddonNames.push('Eco Knife & Spoons');
      if (addons.card) activeAddonNames.push('+1 Artisanal Card');

      const cartItem: CartItem = {
        id: `cart-custom-${Date.now()}`,
        productId: currentProduct.id,
        name: currentProduct.name,
        price: grandTotal,
        quantity: 1,
        image: currentProduct.image,
        weight: selectedWeight === '500g' ? '500 g' : selectedWeight === '1kg' ? '1 kg' : '2 kg',
        diet: selectedDiet === 'eggless' ? 'eggless' : 'veg',
        customPlaque: pipedMessage,
        addons: activeAddonNames,
        subOptions: [
          `${deliveryDay === 'today' ? 'Today' : 'Tomorrow'} Slot`,
          kitchenNotes ? `Note: "${kitchenNotes}"` : ''
        ].filter(Boolean)
      };

      onAddToCart(cartItem);
      onShowToast(`Added ${currentProduct.name} (${selectedWeight}) to cart!`, 'shopping_bag');

      setTimeout(() => {
        setIsAdded(false);
        onNavigate('cart');
      }, 1200);
    }, 600);
  };

  return (
    <div className="flex flex-col relative w-full pt-16 pb-safe bg-surface">
      <div className="flex flex-col w-full pb-28">
        {/* Hero Banner with Cake Visual & Ambient Overlay */}
        <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-primary-container">
          <img
            className="w-full h-full object-cover object-center"
            alt={currentProduct.name}
            src={currentProduct.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>

          {/* Floating Top Bar Overlay Controls */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-space-xs bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md">
              <span className="w-3.5 h-3.5 rounded-full bg-surface-container flex items-center justify-center p-0.5">
                <span className="w-2 h-2 rounded-full bg-[#0F8A43]"></span>
              </span>
              <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider">
                100% Veg Option
              </span>
            </div>
            <div className="flex items-center gap-space-xs bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md text-primary">
              <span className="material-symbols-outlined text-sm text-[#E05375]" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
              <span className="font-label-md text-label-md text-on-surface">Chef's Special</span>
            </div>
          </div>

          {/* Bottom Image Badges & Rating */}
          <div className="absolute bottom-4 inset-x-4 flex items-end justify-between">
            <div className="flex items-center gap-2 bg-surface/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
              <div className="flex items-center text-amber-500">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              </div>
              <span className="font-label-lg text-label-lg text-on-surface">{currentProduct.rating}</span>
              <span className="font-label-md text-label-md text-on-surface-variant">
                ({currentProduct.reviewsCount.toLocaleString()}+ reviews)
              </span>
            </div>
            <span className="bg-primary/80 backdrop-blur-md text-on-primary font-label-md text-label-md px-3 py-1 rounded-full shadow-sm">
              Guntur Fresh Bake
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-margin flex flex-col gap-5 pt-4">
          {/* Header Title & Description */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">
                {currentProduct.name}
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {currentProduct.description}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-on-surface-variant font-label-md text-label-md">Starts at</span>
              <span className="font-title-currency text-title-currency text-primary">₹499</span>
              <span className="font-label-md text-label-md text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded-full font-semibold">
                Bestseller
              </span>
            </div>
          </div>

          {/* Section 1: Weight Selection (Mandatory) */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm text-primary">Select Weight</span>
                  <span className="text-secondary font-label-tag text-label-tag uppercase tracking-wide bg-secondary-fixed/40 px-2 py-0.5 rounded-full">
                    Required
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">Choose the perfect portion for your party</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {/* 500g */}
              <label
                onClick={() => setSelectedWeight('500g')}
                className={`cursor-pointer relative flex flex-col items-center justify-center p-3 rounded-xl transition-all shadow-sm text-center ${
                  selectedWeight === '500g'
                    ? 'bg-surface-container-high ring-2 ring-primary'
                    : 'bg-surface-container-low hover:bg-surface-container-high'
                }`}
              >
                <input
                  type="radio"
                  name="cake-weight"
                  checked={selectedWeight === '500g'}
                  onChange={() => setSelectedWeight('500g')}
                  className="sr-only"
                />
                <span className="font-headline-sm text-headline-sm text-primary">500 g</span>
                <span className="font-label-md text-label-md text-on-surface-variant mt-0.5">3-5 Servings</span>
                <span className="font-label-lg text-label-lg text-primary font-bold mt-2">₹499</span>
              </label>

              {/* 1 kg */}
              <label
                onClick={() => setSelectedWeight('1kg')}
                className={`cursor-pointer relative flex flex-col items-center justify-center p-3 rounded-xl transition-all shadow-sm text-center ${
                  selectedWeight === '1kg'
                    ? 'bg-surface-container-high ring-2 ring-primary'
                    : 'bg-surface-container-low hover:bg-surface-container-high'
                }`}
              >
                <input
                  type="radio"
                  name="cake-weight"
                  checked={selectedWeight === '1kg'}
                  onChange={() => setSelectedWeight('1kg')}
                  className="sr-only"
                />
                <span className="font-headline-sm text-headline-sm text-primary">1 kg</span>
                <span className="font-label-md text-label-md text-on-surface-variant mt-0.5">8-10 Servings</span>
                <span className="font-label-lg text-label-lg text-primary font-bold mt-2">₹899</span>
              </label>

              {/* 2 kg */}
              <label
                onClick={() => setSelectedWeight('2kg')}
                className={`cursor-pointer relative flex flex-col items-center justify-center p-3 rounded-xl transition-all shadow-sm text-center ${
                  selectedWeight === '2kg'
                    ? 'bg-surface-container-high ring-2 ring-primary'
                    : 'bg-surface-container-low hover:bg-surface-container-high'
                }`}
              >
                <input
                  type="radio"
                  name="cake-weight"
                  checked={selectedWeight === '2kg'}
                  onChange={() => setSelectedWeight('2kg')}
                  className="sr-only"
                />
                <span className="font-headline-sm text-headline-sm text-primary">2 kg</span>
                <span className="font-label-md text-label-md text-on-surface-variant mt-0.5">16-20 Servings</span>
                <span className="font-label-lg text-label-lg text-primary font-bold mt-2">₹1,599</span>
              </label>
            </div>
          </div>

          {/* Section 2: Dietary Preference */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col gap-3">
            <div>
              <span className="font-headline-sm text-headline-sm text-primary">Dietary Choice</span>
              <p className="font-body-md text-body-md text-on-surface-variant">Prepared in certified separated baking stations</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {/* Eggless */}
              <label
                onClick={() => setSelectedDiet('eggless')}
                className={`cursor-pointer flex items-center gap-3 p-3 rounded-xl shadow-sm transition-all ${
                  selectedDiet === 'eggless'
                    ? 'bg-surface-container-high ring-2 ring-[#0F8A43]'
                    : 'bg-surface-container-low hover:bg-surface-container-high'
                }`}
              >
                <input
                  type="radio"
                  name="dietary"
                  checked={selectedDiet === 'eggless'}
                  onChange={() => setSelectedDiet('eggless')}
                  className="sr-only"
                />
                <span className="w-4 h-4 rounded-sm bg-surface-container flex items-center justify-center p-0.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0F8A43]"></span>
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg text-primary truncate">100% Eggless</span>
                  <span className="font-label-md text-label-md text-[#0F8A43] font-semibold">Free &amp; Recommended</span>
                </div>
              </label>

              {/* With Egg */}
              <label
                onClick={() => setSelectedDiet('egg')}
                className={`cursor-pointer flex items-center gap-3 p-3 rounded-xl shadow-sm transition-all ${
                  selectedDiet === 'egg'
                    ? 'bg-surface-container-high ring-2 ring-[#C42B1C]'
                    : 'bg-surface-container-low hover:bg-surface-container-high'
                }`}
              >
                <input
                  type="radio"
                  name="dietary"
                  checked={selectedDiet === 'egg'}
                  onChange={() => setSelectedDiet('egg')}
                  className="sr-only"
                />
                <span className="w-4 h-4 rounded-sm bg-surface-container flex items-center justify-center p-0.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C42B1C]"></span>
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg text-primary truncate">Contains Egg</span>
                  <span className="font-label-md text-label-md text-on-surface-variant">Classic crumb</span>
                </div>
              </label>
            </div>
          </div>

          {/* Section 3: Personalized Cake Message */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <label className="font-headline-sm text-headline-sm text-primary flex items-center gap-1.5" htmlFor="cake-msg">
                <span className="material-symbols-outlined text-secondary text-lg">draw</span>
                Piped Message on Cake
              </label>
              <span className="font-label-md text-label-md text-on-surface-variant">
                {pipedMessage.length} / 30
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Handcrafted in rich white ganache on an edible chocolate plaque.
            </p>
            <div className="relative mt-1">
              <input
                id="cake-msg"
                maxLength={30}
                value={pipedMessage}
                onChange={(e) => setPipedMessage(e.target.value)}
                placeholder="e.g., Happy Birthday Ananya! ❤️"
                className="w-full bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-lg text-body-lg px-3.5 py-3 rounded-xl outline-none transition-all placeholder:text-outline-variant ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-secondary"
                type="text"
              />
            </div>
          </div>

          {/* Section 4: Complimentary & Celebration Add-ons */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-headline-sm text-headline-sm text-primary">Party Essentials &amp; Add-ons</span>
                <p className="font-body-md text-body-md text-on-surface-variant">Elevate your celebration moment</p>
              </div>
              <span className="font-label-md text-label-md text-secondary font-semibold">Optional</span>
            </div>

            <div className="flex flex-col gap-2">
              {/* Sparkler Candle */}
              <label
                onClick={() => handleAddonToggle('sparkler')}
                className="cursor-pointer flex items-center justify-between p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      addons.sparkler ? 'bg-primary text-on-primary' : 'bg-surface-container text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-primary">Sparkler Candle</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">Golden indoor sparkle fountain</span>
                  </div>
                </div>
                <span className="font-label-lg text-label-lg text-primary font-bold">+₹40</span>
              </label>

              {/* Gold Acrylic Topper */}
              <label
                onClick={() => handleAddonToggle('topper')}
                className="cursor-pointer flex items-center justify-between p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      addons.topper ? 'bg-primary text-on-primary' : 'bg-surface-container text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-primary">Gold Acrylic 'HBD' Topper</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">Reusable mirror-gold keepsake</span>
                  </div>
                </div>
                <span className="font-label-lg text-label-lg text-primary font-bold">+₹60</span>
              </label>

              {/* Extra Party Knife & Spoons */}
              <label
                onClick={() => handleAddonToggle('cutlery')}
                className="cursor-pointer flex items-center justify-between p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      addons.cutlery ? 'bg-primary text-on-primary' : 'bg-surface-container text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-primary">Extra Party Knife &amp; Spoons</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">Birchwood eco-friendly cutleries</span>
                  </div>
                </div>
                <span className="font-label-lg text-label-lg text-[#0F8A43] font-bold">FREE</span>
              </label>

              {/* Artisanal Greeting Card */}
              <label
                onClick={() => handleAddonToggle('card')}
                className="cursor-pointer flex items-center justify-between p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      addons.card ? 'bg-primary text-on-primary' : 'bg-surface-container text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-primary">Artisanal Greeting Card</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">Sealed with wax stamp envelope</span>
                  </div>
                </div>
                <span className="font-label-lg text-label-lg text-primary font-bold">+₹20</span>
              </label>
            </div>
          </div>

          {/* Section 5: Delivery Date & Slot Selector */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col gap-3">
            <div>
              <span className="font-headline-sm text-headline-sm text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-lg">local_shipping</span>
                Guntur City Delivery Schedule
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant">Baked fresh 2 hours prior to dispatch slot</p>
            </div>

            {/* Date selector tabs */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setDeliveryDay('today');
                  setDeliverySlot('Today Evening (6:00 PM – 8:00 PM)');
                }}
                className={`flex-1 py-2 px-3 rounded-full font-label-lg text-label-lg text-center transition-all cursor-pointer ${
                  deliveryDay === 'today'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-low text-primary hover:bg-surface-container-high'
                }`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeliveryDay('tomorrow');
                  setDeliverySlot('Tomorrow Morning (10:00 AM – 12:00 PM)');
                }}
                className={`flex-1 py-2 px-3 rounded-full font-label-lg text-label-lg text-center transition-all cursor-pointer ${
                  deliveryDay === 'tomorrow'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-low text-primary hover:bg-surface-container-high'
                }`}
              >
                Tomorrow
              </button>
            </div>

            {/* Slot Pills: Today */}
            {deliveryDay === 'today' ? (
              <div className="flex flex-col gap-2">
                <span className="font-label-tag text-label-tag text-on-surface-variant uppercase">Available Slots for Today</span>
                <label className="cursor-pointer flex items-center justify-between p-3 rounded-xl bg-surface-container-high ring-1 ring-primary">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-base">schedule</span>
                    <span className="font-label-lg text-label-lg text-primary">Evening (6:00 PM – 8:00 PM)</span>
                  </div>
                  <span className="font-label-md text-label-md text-[#0F8A43] font-semibold bg-[#0F8A43]/10 px-2.5 py-0.5 rounded-full">
                    Slots Open
                  </span>
                </label>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <span className="font-label-tag text-label-tag text-on-surface-variant uppercase">Available Slots for Tomorrow</span>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { label: 'Morning (10:00 AM – 12:00 PM)', tag: 'Standard' },
                    { label: 'Evening (4:00 PM – 6:00 PM)', tag: 'Standard' },
                    { label: 'Night (7:00 PM – 9:00 PM)', tag: 'Prime Time' }
                  ].map((s) => (
                    <label
                      key={s.label}
                      onClick={() => setDeliverySlot(`Tomorrow ${s.label}`)}
                      className={`cursor-pointer flex items-center justify-between p-3 rounded-xl transition-all ${
                        deliverySlot.includes(s.label)
                          ? 'bg-surface-container-high ring-1 ring-primary'
                          : 'bg-surface-container-low hover:bg-surface-container-high'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-secondary text-base">schedule</span>
                        <span className="font-label-lg text-label-lg text-primary">{s.label}</span>
                      </div>
                      <span className="font-label-md text-label-md text-on-surface-variant">{s.tag}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 6: Special Instructions */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="font-headline-sm text-headline-sm text-primary flex items-center gap-1.5" htmlFor="baking-notes">
                <span className="material-symbols-outlined text-secondary text-lg">notes</span>
                Kitchen &amp; Delivery Instructions
              </label>
              <span className="font-label-tag text-label-tag text-on-surface-variant uppercase">Optional</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              E.g., "Less sugar please", "Call on gate arrival", "Pack with extra ice gel pads".
            </p>
            <textarea
              id="baking-notes"
              rows={2}
              value={kitchenNotes}
              onChange={(e) => setKitchenNotes(e.target.value)}
              placeholder="Write your note to the Cake Box chef..."
              className="w-full bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md p-3 rounded-xl outline-none transition-all placeholder:text-outline-variant resize-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-secondary"
            />
          </div>

          {/* Guarantee & Quality Badge */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-tertiary-fixed/30 text-on-tertiary-container">
            <span className="material-symbols-outlined text-2xl text-on-tertiary-container shrink-0">verified</span>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-tertiary-fixed font-bold">Cake Box Freshness Promise</span>
              <span className="font-body-md text-body-md text-on-tertiary-fixed-variant">
                Temperature-controlled Guntur delivery in insulated artisan boxes.
              </span>
            </div>
          </div>
        </div>

        {/* Persistent Docked Bottom Bar */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-xl shadow-2xl p-4 flex items-center justify-between gap-4 max-w-lg mx-auto">
          <div className="flex flex-col min-w-0">
            <span className="font-label-tag text-label-tag uppercase text-on-surface-variant tracking-wider">Total Price</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-title-currency text-title-currency text-primary">₹{grandTotal}</span>
              <span className="font-label-md text-label-md text-on-surface-variant">({selectedWeight})</span>
            </div>
          </div>

          {/* Add to Cart CTA with Strawberry Pink Accent */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex-1 max-w-xs h-12 text-on-secondary rounded-full flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
              isAdded
                ? 'bg-[#0F8A43]'
                : isAdding
                ? 'bg-secondary opacity-90'
                : 'bg-secondary hover:bg-on-secondary-container active:scale-95'
            }`}
          >
            {isAdding ? (
              <>
                <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
                <span className="font-headline-sm text-headline-sm">Adding Delight...</span>
              </>
            ) : isAdded ? (
              <>
                <span className="material-symbols-outlined text-xl">check_circle</span>
                <span className="font-headline-sm text-headline-sm">Added to Box!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl">shopping_bag</span>
                <span className="font-headline-sm text-headline-sm tracking-wide">Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
