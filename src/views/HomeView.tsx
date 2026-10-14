import React, { useState } from 'react';
import { ViewType, Product, CartItem } from '../types';
import { CATEGORIES } from '../data/mockData';

interface HomeViewProps {
  onNavigate: (view: ViewType) => void;
  onOpenAddress: () => void;
  selectedAddress: string;
  cart: CartItem[];
  onAddToCart: (product: Product, options?: any) => void;
  onUpdateCartQuantity: (cartItemId: string, delta: number) => void;
  onSelectProductForCustomize: (product: Product) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenAddress,
  selectedAddress,
  cart,
  onAddToCart,
  onUpdateCartQuantity,
  onSelectProductForCustomize,
  onShowToast
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'veg' | 'cakes' | 'combos'>('all');
  const [searchVal, setSearchVal] = useState('');

  // Cart totals
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Helper to find quantity in cart
  const getItemQuantity = (productId: string) => {
    const item = cart.find((c) => c.productId === productId);
    return item ? item.quantity : 0;
  };

  const getCartItemId = (productId: string) => {
    const item = cart.find((c) => c.productId === productId);
    return item ? item.id : null;
  };

  // Celebration cakes list
  const celebrationCakes: Product[] = [
    {
      id: 'prod-truffle',
      name: 'Chocolate Truffle Cake',
      category: 'cakes',
      price: 499,
      originalPrice: 599,
      rating: 4.9,
      reviewsCount: 340,
      description: 'Pure Belgian dark chocolate ganache with moist cocoa sponge',
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmrgfkgnWKbbii7UdCvWzHY16_0FlbMoilyTkp2OpPonC3aNUYGcXHfys7cLCHNRemLWxyJvL3UVDr74az6ekC65YP01jsEHsPvBINtgXR6SR2ybG_NbnRDFeuvtS6Od0sxZ1fM1EGiPZKaoNW0f8nYsrwdaamS9GY87YVuRW_bsM5pToah3Pfn1MQftrTN53lphz5imVpyJJxUVL8PZnBFQiJ1rJJ-99y6_E7arwzBlFD0nM8dnsF",
      diet: 'eggless',
      badge: '500g / 1 Kg',
      isCustomizable: true
    },
    {
      id: 'prod-red-velvet',
      name: 'Royal Red Velvet',
      category: 'cakes',
      price: 599,
      originalPrice: 699,
      rating: 4.9,
      reviewsCount: 185,
      description: 'Velvety crumb with Philadelphia cheese cream frosting',
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzzgaczgslBmgcgx0PNma9zuavGTn91l7koYS47OIwNyw-Q2mNY3Q7znNSwulSiggMGwNl8y1o6ZTmR3P2LN5BUHtoAfc49MozC252x5vHRABS_k4Ge5Tvl5drGzhnAKZdhjE8Rdzl0FmrMfqLwj526DmDznTqL7N1LmgiRwV_M6lfho3xc-L7ZRLoVhdsHuvppsQZRLm_pzdKhfCp3KvkIGJ9oAfAMODxA3Z7WUTS1XroyioWqtEj",
      diet: 'veg',
      badge: '500g',
      isCustomizable: true
    },
    {
      id: 'prod-black-forest',
      name: 'Classic Black Forest',
      category: 'cakes',
      price: 449,
      originalPrice: 549,
      rating: 4.8,
      reviewsCount: 210,
      description: 'Maraschino cherries, dark cocoa sponge & shaved flakes',
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPod6a01k9fVyUTeT8zDC94QEIWzMKSnHneY15hk8ewuNf3IqhQNa1yRrRd0TdIxy5CSKcbqfkR7HyLn_YKp7NFaeFQIDfcWCYo5dvGVY3u94imqrwfhnevyR4pM347lJ-CjtGHcG1EQdeGrsvjqf29aEw_tP5E4R8CXnT6zoXmGVH_ycMT3lWlvNE3vNbZPEy8mPuR5hIurmWCCsMK66nzkRNuDwkJbvnW61n9Sm-1OJyPVtCra3n",
      diet: 'veg',
      badge: '500g / 1 Kg',
      isCustomizable: true
    }
  ];

  // Savouries
  const savouriesList: Product[] = [
    {
      id: 'prod-paneer-pizza',
      name: 'Paneer Tikka Pizza (8")',
      category: 'pizza',
      price: 249,
      rating: 4.9,
      reviewsCount: 410,
      description: 'Smokey tandoori paneer, crunchy capsicum, red paprika & double mozzarella.',
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZnSHGgSTlULU88b7RRphL5wCzSU4Du5tnUklK0WfAJz5SreLb4D0C_8pP9fR5y-Mi17Obrf9yafyJAnsiQk9qkfIipN_vBj3d8n7GbvyuP7iVUcx5V4Nx6PKjk88Y-AkZ7_Ah7Pustqt99hq--m2IVT_ZAWnydWZvKeKlrmk_tH6gQuUipfHPTniJkk9gPnNV1uDPvlx8U2KQOCc1N4JFf-leHAOftupB7axJM7i2cNNBfKooeCnm",
      diet: 'veg',
      badge: 'Bestseller'
    },
    {
      id: 'prod-cheese-burger',
      name: 'Double Cheese Burger',
      category: 'burgers',
      price: 149,
      rating: 4.8,
      reviewsCount: 290,
      description: 'Crispy spiced vegetable patty, dual melted cheese slices, caramelized onions & secret house sauce.',
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAtNDf2Pe9VtcTJEeO9_uVUYErFZcpQnOC0C5ZRMwLs-9e9T8_jlUwjoERgp6jEE9NybQ7sDVMwM2sTmDLQXJY6x3hebyA2_bcUJTPykc-9KjobXCkDr7ae8cbADOijb3iVaEE2El3BNC7RaB1YrnWKno6rzdCLhweR73b8-RtHRB99lkALlzJwrnfecLjLynzbKtAtOYAjhR6CgvmdAvJ74hBxsuhA2PcUoGuyHxWi2Vk_UERQ1Bq",
      diet: 'veg',
      badge: "Chef's Pick"
    },
    {
      id: 'prod-peri-fries',
      name: 'Peri-Peri Masala Fries',
      category: 'fries',
      price: 99,
      rating: 4.8,
      reviewsCount: 780,
      description: 'Golden crunchy fries generously tossed in spicy African bird\'s eye chili seasoning.',
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7zBNEm2NWD4jHN9BXEyZDCbjKsgsNIYFi9LUvfkitnAhdWlORAaTcjYEFmuaTxtRVt9IDQ-S0Q3nfVazRnp0gr7ad9dHJenPencHzfalMnvoSflh1W17bxu3KhVkAWpr-4trKaSg7Tc2emKs7A_k2Lw5AmEUMGP-eDGJg8L4w3yTDjc1pGtjSWWURKcLtyYfC2R9yrfM05sElRZd7BiyOzUmef9LzKeT3wS3GaxNL29b-EIC8pImA",
      diet: 'veg',
      badge: 'Spicy'
    },
    {
      id: 'prod-veg-puff',
      name: 'Crispy Veg Puff',
      category: 'puffs',
      price: 25,
      rating: 4.7,
      reviewsCount: 520,
      description: 'Multi-layered flaky butter crust stuffed with spiced potato and pea masala.',
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXFEl5r8VFS_uinVJajMJREUYQtrvLGEfeamVH54aATYECEnSmciQbVE4eKkUKqlhd5BbQia7WVheqnnrzifRiEXxZq2Diw3eh_U2IFEa7GzFaoPGsvZa45M38o6Fb0AE0RX03x4Ee3TBx3pfyuE-9Jzp6PsZl4kJY8qq7i4O8eABja3K5ioJFH3ZoD1JD-qQFDUvjv_vkAbbGFfWswAc83OKSdOEGSnuPJDpwplVUFyjkfiRNGH2Y",
      diet: 'veg',
      badge: 'Classic Guntur Special'
    }
  ];

  return (
    <div className="flex flex-col w-full relative pt-20 pb-28">
      {/* Top Ambient Glow Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 bg-gradient-to-b from-primary-fixed/30 via-secondary-fixed/20 to-transparent blur-3xl pointer-events-none -z-10"></div>

      {/* 1. Header Location & Delivery Context Strip */}
      <section className="px-margin pt-space-xs pb-space-sm">
        <div className="bg-surface-container-low rounded-2xl p-space-sm shadow-sm flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-9 h-9 rounded-xl bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                moped
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-label-tag text-label-tag uppercase tracking-wider text-on-surface-variant font-bold">
                  Delivering To
                </span>
                <span className="inline-flex items-center px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-tag text-label-tag font-bold">
                  30-35 mins
                </span>
              </div>
              <button onClick={onOpenAddress} className="flex items-center gap-1 text-left group cursor-pointer">
                <span className="font-headline-sm text-headline-sm text-primary font-bold truncate group-hover:text-secondary transition-colors">
                  {selectedAddress}
                </span>
                <span className="material-symbols-outlined text-outline text-base flex-shrink-0">keyboard_arrow_down</span>
              </button>
            </div>
          </div>
          <button
            onClick={onOpenAddress}
            className="px-2.5 py-1.5 rounded-full bg-surface-container-highest text-primary font-label-md text-label-md font-bold flex-shrink-0 hover:bg-primary-fixed transition-colors cursor-pointer"
          >
            Change
          </button>
        </div>
      </section>

      {/* 2. Search Bar with Voice & Filter Actions */}
      <section className="px-margin py-space-xs">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-xl pointer-events-none">
            search
          </span>
          <input
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onNavigate('menu');
              }
            }}
            className="w-full h-12 pl-11 pr-24 rounded-2xl bg-surface-container text-on-surface placeholder:text-on-surface-variant/70 font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all duration-200"
            placeholder="Search cakes, burgers, chocolates, pastries..."
            type="text"
          />
          <div className="absolute right-2 flex items-center gap-1">
            <button
              onClick={() => onShowToast('Listening for your bakery cravings in Guntur...', 'mic')}
              aria-label="Voice search"
              className="w-8 h-8 rounded-xl flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">mic</span>
            </button>
            <button
              onClick={() => onNavigate('menu')}
              aria-label="Filters"
              className="w-8 h-8 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-sm hover:bg-secondary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">tune</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Hero Promotional Banner Carousel */}
      <section className="px-margin pt-space-sm pb-space-md">
        <div className="relative overflow-hidden rounded-3xl bg-primary-container text-on-primary shadow-md">
          {/* Background Bakery Imagery with Warm Vignette Scrim */}
          <div
            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmd2IjnaoUbrB-xTemtwW6BlMzcJur4PfPWzugJOyEYkTQOKqkWU5CpHRICFSlJXn50wl8Ra0i5Ws6LGhHspCouRXjigw6DP1dbrYGoY0IliYyZbUCEM7wDEyaYuLCUtzIzO2cHHgHQ-d9X8LWJEf9_QWfT-f80mO-kvxjL6jixQGotZAsejLEYn5PwVQs16B6mpJ4YGNSd-b22nsCVhrWrNLoIV08FmV6SGlZitiWaMwKTSjvGclj')`
            }}
          ></div>
          <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-secondary/35 blur-2xl pointer-events-none"></div>
          <div className="relative p-space-lg flex flex-col gap-space-sm z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-on-secondary font-label-tag text-label-tag uppercase tracking-wider self-start shadow-sm font-bold">
              <span className="material-symbols-outlined text-xs">local_fire_department</span>
              Guntur Special Offer
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-primary font-extrabold tracking-tight">
                Your Favourite Treats, Delivered Fresh!
              </h2>
              <p className="font-body-md text-body-md text-primary-fixed-dim line-clamp-2">
                From decadent celebration cakes to cheesy loaded pizzas &amp; handcrafted Belgian chocolates in Guntur.
              </p>
            </div>

            {/* Coupon Card Badge */}
            <div className="p-space-sm rounded-2xl bg-primary/60 backdrop-blur-md flex items-center justify-between gap-space-sm shadow-inner">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-secondary-fixed text-2xl flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                  confirmation_number
                </span>
                <div className="min-w-0">
                  <p className="font-label-lg text-label-lg text-tertiary-fixed font-bold leading-tight">Flat ₹100 OFF above ₹499</p>
                  <p className="font-label-md text-label-md text-outline-variant font-mono">
                    Use code: <span className="text-on-primary font-bold tracking-widest">CAKEMAGIC</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  onShowToast('Coupon CAKEMAGIC copied! Apply in cart.', 'confirmation_number');
                  onNavigate('menu');
                }}
                className="px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container font-label-lg text-label-lg font-bold shadow-md hover:bg-secondary-fixed transition-colors flex-shrink-0 flex items-center gap-1 cursor-pointer"
              >
                Order Now
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              <span className="w-5 h-1.5 rounded-full bg-secondary-container"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-on-primary/30"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-on-primary/30"></span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quick Category Story Circles & Pills */}
      <section className="py-space-xs flex flex-col gap-space-sm">
        <div className="px-margin flex items-center justify-between">
          <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Craving Something Delicious?</h3>
          <span className="font-label-md text-label-md text-secondary font-bold">12 Categories</span>
        </div>

        {/* Category Circular Items Scroll */}
        <div className="flex gap-3 overflow-x-auto px-margin no-scrollbar pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate('menu')}
              className="flex flex-col items-center gap-1.5 min-w-[70px] group focus:outline-none cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-secondary to-primary-fixed group-hover:scale-105 transition-transform shadow-sm">
                <div className="w-full h-full rounded-full overflow-hidden bg-surface-container-lowest">
                  <img className="w-full h-full object-cover" alt={cat.name} src={cat.image} />
                </div>
              </div>
              <span className="font-label-md text-label-md text-on-surface text-center font-bold leading-tight">
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        {/* Filter Pill Buttons Horizontal */}
        <div className="flex gap-2 overflow-x-auto px-margin no-scrollbar pt-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md font-bold flex items-center gap-1 shadow-sm flex-shrink-0 transition-colors cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-sm">stars</span>
            All Specials
          </button>
          <button
            onClick={() => {
              setActiveFilter('veg');
              onShowToast('Showing pure vegetarian and eggless creations', 'eco');
            }}
            className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md font-bold flex items-center gap-1.5 flex-shrink-0 transition-colors cursor-pointer ${
              activeFilter === 'veg'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F8A43]"></span>
            Pure Veg Only
          </button>
          <button
            onClick={() => {
              setActiveFilter('cakes');
              onNavigate('menu');
            }}
            className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md font-bold flex items-center gap-1 flex-shrink-0 hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-secondary">cake</span>
            Bestselling Cakes
          </button>
          <button
            onClick={() => {
              setActiveFilter('combos');
              onNavigate('menu');
            }}
            className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md font-bold flex items-center gap-1 flex-shrink-0 hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-tertiary-container">local_pizza</span>
            Snacks &amp; Combos
          </button>
        </div>
      </section>

      {/* 5. Best Sellers & Celebration Cakes (Horizontal Scroll Cards) */}
      <section className="py-space-md flex flex-col gap-space-sm">
        <div className="px-margin flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-xl">workspace_premium</span>
              <h3 className="font-headline-md text-headline-md text-primary font-bold">Celebration Cakes</h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">Freshly whipped to order with eggless options</p>
          </div>
          <button
            onClick={() => onNavigate('menu')}
            className="font-label-lg text-label-lg text-secondary font-bold hover:underline flex items-center cursor-pointer"
          >
            See All
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

        {/* Cards Scroll Container */}
        <div className="flex gap-4 overflow-x-auto px-margin no-scrollbar pb-2 pt-1">
          {celebrationCakes.map((cake) => {
            const qty = getItemQuantity(cake.id);
            const cartItemId = getCartItemId(cake.id);

            return (
              <div
                key={cake.id}
                className="w-64 flex-shrink-0 bg-surface-container-lowest rounded-3xl p-3 shadow-md flex flex-col justify-between relative"
              >
                <div
                  className="relative w-full h-36 rounded-2xl overflow-hidden bg-surface-container-high mb-2 cursor-pointer group"
                  onClick={() => {
                    onSelectProductForCustomize(cake);
                    onNavigate('customize');
                  }}
                >
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={cake.name}
                    src={cake.image}
                  />
                  {/* Weight badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-primary-container/85 text-on-primary font-label-tag text-label-tag font-bold backdrop-blur-sm">
                    {cake.badge}
                  </div>
                  {/* Dietary FSSAI Veg Badge */}
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-md bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center p-0.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0F8A43]"></span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span
                      onClick={() => {
                        onSelectProductForCustomize(cake);
                        onNavigate('customize');
                      }}
                      className="font-headline-sm text-headline-sm text-primary font-bold truncate cursor-pointer hover:text-secondary"
                    >
                      {cake.name}
                    </span>
                    <div className="flex items-center gap-0.5 text-on-surface font-label-md text-label-md font-bold bg-surface-container-high px-1.5 py-0.5 rounded-full">
                      <span className="material-symbols-outlined text-xs text-on-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      {cake.rating}
                    </div>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-1">{cake.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="font-title-currency text-title-currency text-primary font-extrabold">₹{cake.price}</span>
                      {cake.originalPrice && (
                        <span className="font-label-tag text-label-tag text-on-surface-variant line-through">
                          ₹{cake.originalPrice}
                        </span>
                      )}
                    </div>

                    {qty > 0 && cartItemId ? (
                      <div className="flex items-center bg-secondary text-on-secondary rounded-full shadow-sm p-0.5">
                        <button
                          onClick={() => onUpdateCartQuantity(cartItemId, -1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-secondary-container transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="px-2 font-label-lg text-label-lg font-bold">{qty}</span>
                        <button
                          onClick={() => onUpdateCartQuantity(cartItemId, 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-secondary-container transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          onSelectProductForCustomize(cake);
                          onNavigate('customize');
                        }}
                        className="px-4 py-1.5 rounded-full bg-surface-container-highest text-primary font-label-lg text-label-lg font-bold shadow-sm hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                        ADD
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Fast Food & Savouries Section */}
      <section className="px-margin py-space-sm flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-xl">lunch_dining</span>
              <h3 className="font-headline-md text-headline-md text-primary font-bold">Fast Food &amp; Savouries</h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">Hot, crispy &amp; baked to perfection in Brodipet</p>
          </div>
          <span className="font-label-tag text-label-tag uppercase font-bold text-secondary bg-secondary-fixed px-2 py-0.5 rounded-full">
            Hot &amp; Fresh
          </span>
        </div>

        {/* Vertical List of Savoury Items */}
        <div className="flex flex-col gap-3">
          {savouriesList.map((item) => {
            const qty = getItemQuantity(item.id);
            const cartItemId = getCartItemId(item.id);

            return (
              <div
                key={item.id}
                className="bg-surface-container-lowest rounded-2xl p-space-sm shadow-sm flex items-center justify-between gap-3"
              >
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0F8A43] flex-shrink-0"></span>
                    <span className="font-label-tag text-label-tag uppercase text-secondary font-bold">
                      {item.badge || 'Bestseller'}
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-primary font-bold truncate">{item.name}</h4>
                  <span className="font-title-currency text-title-currency text-primary font-extrabold">₹{item.price}</span>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">{item.description}</p>
                  <span className="font-label-tag text-label-tag text-secondary font-bold mt-0.5">Customisable</span>
                </div>

                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-surface-container-high flex-shrink-0">
                  <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
                  {qty > 0 && cartItemId ? (
                    <div className="absolute bottom-1 right-1 flex items-center bg-secondary text-on-secondary rounded-full shadow-md p-0.5">
                      <button
                        onClick={() => onUpdateCartQuantity(cartItemId, -1)}
                        aria-label="Decrease quantity"
                        className="w-5 h-5 flex items-center justify-center rounded-full cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-xs">remove</span>
                      </button>
                      <span className="px-1.5 font-label-md text-label-md font-bold">{qty}</span>
                      <button
                        onClick={() => onUpdateCartQuantity(cartItemId, 1)}
                        aria-label="Increase quantity"
                        className="w-5 h-5 flex items-center justify-center rounded-full cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-xs">add</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        onAddToCart(item);
                        onShowToast(`Added ${item.name} to box!`, 'check_circle');
                      }}
                      className="absolute bottom-1 right-1 px-3 py-1 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md font-bold shadow-md hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                    >
                      + ADD
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Today's Sweet Deals & Value Combos */}
      <section className="px-margin py-space-sm flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-xl">celebration</span>
              <h3 className="font-headline-md text-headline-md text-primary font-bold">Party Combos &amp; Hampers</h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">Save up to 35% on curated celebration packs</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-space-sm">
          {/* Combo 1: Birthday Bash */}
          <div className="bg-gradient-to-r from-primary-fixed/40 via-surface-container-lowest to-surface-container-lowest rounded-3xl p-space-sm shadow-md flex items-center gap-space-sm">
            <div className="w-28 h-28 rounded-2xl overflow-hidden bg-surface-container-high flex-shrink-0 relative">
              <img
                className="w-full h-full object-cover"
                alt="Birthday Party Combo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeo0oQ_n437PM871G-JcveUjfMIkShBfduP0iuwYOCe95zlXyOsA_4wk45FdNmO0gTwquS5X0gmee7yLKPV1LZ6NqVW0pXOQYN5mxSqeO4H5bELp3R04fSJvudfb5wmoK2GD_pL4ZKKu2dtxvx9nP-iHp_7dvOuF2reE-q92QGsW4lc3QtmGFIrkDr51rsyMBfl5CsBKQfWiu9iwSqd5mjOO1rJJBcV1X_b9mv5IcVhiI5TMXZvOEy"
              />
              <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-secondary text-on-secondary font-label-tag text-label-tag font-bold">
                SAVE ₹180
              </span>
            </div>
            <div className="flex flex-col justify-between flex-1 min-w-0">
              <div>
                <h4 className="font-headline-sm text-headline-sm text-primary font-bold">Birthday Party Combo</h4>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                  1/2 Kg Choco Truffle + 2 Farmhouse Pizzas + Peri-Peri Fries + Dip
                </p>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-title-currency text-title-currency text-primary font-extrabold">₹799</span>
                  <span className="font-label-md text-label-md text-on-surface-variant line-through">₹979</span>
                </div>
                <button
                  onClick={() => {
                    onAddToCart({
                      id: 'combo-birthday',
                      name: 'Birthday Party Combo',
                      category: 'cakes',
                      price: 799,
                      rating: 4.9,
                      reviewsCount: 300,
                      description: '1/2 Kg Choco Truffle + 2 Farmhouse Pizzas + Peri-Peri Fries',
                      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeo0oQ_n437PM871G-JcveUjfMIkShBfduP0iuwYOCe95zlXyOsA_4wk45FdNmO0gTwquS5X0gmee7yLKPV1LZ6NqVW0pXOQYN5mxSqeO4H5bELp3R04fSJvudfb5wmoK2GD_pL4ZKKu2dtxvx9nP-iHp_7dvOuF2reE-q92QGsW4lc3QtmGFIrkDr51rsyMBfl5CsBKQfWiu9iwSqd5mjOO1rJJBcV1X_b9mv5IcVhiI5TMXZvOEy",
                      diet: 'veg'
                    });
                    onShowToast('Birthday Party Combo added with ₹180 savings!', 'celebration');
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-sm hover:bg-secondary transition-colors cursor-pointer"
                >
                  + ADD COMBO
                </button>
              </div>
            </div>
          </div>

          {/* Combo 2: Chocolate Hamper */}
          <div className="bg-gradient-to-r from-secondary-fixed/40 via-surface-container-lowest to-surface-container-lowest rounded-3xl p-space-sm shadow-md flex items-center gap-space-sm">
            <div className="w-28 h-28 rounded-2xl overflow-hidden bg-surface-container-high flex-shrink-0 relative">
              <img
                className="w-full h-full object-cover"
                alt="Chocolate Lovers Hamper"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC503Eu5vEODT4NqSrFB3E1UWXLUqVLQBwjbLgoQvezndzzX54QN3RQL1tqHoV8nVxQ2TVVypm0MdSG1GJmOnOwLwYvT_gyyLZfsB_lU4pnbLTQ__ByS3nQFMYjytPdwRZyqg70N9DzHUAFuKagJe1YRVHCNPNAexSpnU4dkLy-KIQnFo-dYAPO7xDrXW9fZ93mDA0hjr9t43pdn_KAL059GBWM2QZrrCBkQ5CF7POm3jUMmvm03MV_"
              />
              <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-secondary text-on-secondary font-label-tag text-label-tag font-bold">
                GIFT READY
              </span>
            </div>
            <div className="flex flex-col justify-between flex-1 min-w-0">
              <div>
                <h4 className="font-headline-sm text-headline-sm text-primary font-bold">Chocolate Lovers Hamper</h4>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                  6 Artisanal Truffles + 2 Walnut Brownies + Belgian Chocolate Bar
                </p>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-title-currency text-title-currency text-primary font-extrabold">₹449</span>
                  <span className="font-label-md text-label-md text-on-surface-variant line-through">₹549</span>
                </div>
                <button
                  onClick={() => {
                    onAddToCart({
                      id: 'combo-hamper',
                      name: 'Chocolate Lovers Hamper',
                      category: 'chocolates',
                      price: 449,
                      rating: 5.0,
                      reviewsCount: 150,
                      description: '6 Artisanal Truffles + 2 Walnut Brownies + Belgian Chocolate Bar',
                      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC503Eu5vEODT4NqSrFB3E1UWXLUqVLQBwjbLgoQvezndzzX54QN3RQL1tqHoV8nVxQ2TVVypm0MdSG1GJmOnOwLwYvT_gyyLZfsB_lU4pnbLTQ__ByS3nQFMYjytPdwRZyqg70N9DzHUAFuKagJe1YRVHCNPNAexSpnU4dkLy-KIQnFo-dYAPO7xDrXW9fZ93mDA0hjr9t43pdn_KAL059GBWM2QZrrCBkQ5CF7POm3jUMmvm03MV_",
                      diet: 'veg'
                    });
                    onShowToast('Chocolate Lovers Hamper added!', 'card_giftcard');
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-sm hover:bg-secondary transition-colors cursor-pointer"
                >
                  + ADD COMBO
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Verified Guntur Customer Love Snippet */}
      <section className="px-margin py-space-sm">
        <div className="rounded-3xl bg-surface-container-low p-space-md shadow-sm flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-secondary-fixed flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  favorite
                </span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-primary font-bold">Loved by Guntur Foodies</h4>
                <p className="font-label-md text-label-md text-on-surface-variant">Over 15,000+ happy celebrations in Brodipet &amp; Arundelpet</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-surface-container-lowest px-2.5 py-1 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-sm text-on-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span className="font-label-lg text-label-lg text-primary font-bold">4.9</span>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="bg-surface-container-lowest p-space-sm rounded-2xl shadow-sm flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-label-lg text-label-lg text-primary font-bold">Sireesha K.</span>
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                <span className="font-label-tag text-label-tag text-on-surface-variant">Brodipet 4th Lane</span>
              </div>
              <span className="font-label-tag text-label-tag text-outline">Yesterday</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant italic">
              "Ordered the Chocolate Truffle cake for my brother's birthday. Arrived in just 28 mins perfectly chilled and not a scratch on the cream! The peri peri fries are legendary."
            </p>
          </div>
        </div>
      </section>

      {/* 9. Sticky Floating Mini Cart Pill Docked Above App Navigation */}
      {totalItems > 0 && (
        <div className="fixed bottom-20 inset-x-0 px-margin z-40 mb-1">
          <div className="bg-primary text-on-primary rounded-2xl p-space-sm shadow-xl flex items-center justify-between gap-space-sm max-w-lg mx-auto">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-10 h-10 rounded-xl bg-secondary text-on-secondary flex items-center justify-center font-bold flex-shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-xl">shopping_bag</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-tag text-label-tag uppercase tracking-wider text-secondary-fixed font-bold">
                  {totalItems} Items in Box
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-title-currency text-title-currency text-on-primary font-extrabold">₹{cartTotal}</span>
                  <span className="font-label-tag text-label-tag text-primary-fixed-dim">plus taxes</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('cart')}
              className="px-5 py-2.5 rounded-xl bg-secondary-container text-on-secondary-container font-label-lg text-label-lg font-bold flex items-center gap-1.5 hover:bg-secondary-fixed transition-colors shadow-sm flex-shrink-0 cursor-pointer"
            >
              <span>View Cart</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
