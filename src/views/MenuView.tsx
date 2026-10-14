import React, { useState, useMemo } from 'react';
import { ViewType, Product, CartItem } from '../types';
import { PRODUCTS } from '../data/mockData';

interface MenuViewProps {
  onNavigate: (view: ViewType) => void;
  cart: CartItem[];
  onAddToCart: (product: Product, options?: any) => void;
  onUpdateCartQuantity: (cartItemId: string, delta: number) => void;
  onSelectProductForCustomize: (product: Product) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const MenuView: React.FC<MenuViewProps> = ({
  onNavigate,
  cart,
  onAddToCart,
  onUpdateCartQuantity,
  onSelectProductForCustomize,
  onShowToast
}) => {
  const [activeDiet, setActiveDiet] = useState<'all' | 'veg' | 'eggless' | 'non-veg'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price-asc' | 'price-desc'>('popular');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('cakes');

  // Cart totals
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const getItemQuantity = (productId: string) => {
    const item = cart.find((c) => c.productId === productId);
    return item ? item.quantity : 0;
  };

  const getCartItemId = (productId: string) => {
    const item = cart.find((c) => c.productId === productId);
    return item ? item.id : null;
  };

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDiet =
        activeDiet === 'all' ||
        (activeDiet === 'veg' && product.diet === 'veg') ||
        (activeDiet === 'eggless' && (product.diet === 'eggless' || product.diet === 'veg')) ||
        (activeDiet === 'non-veg' && product.diet === 'non-veg');

      return matchesSearch && matchesDiet;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [searchQuery, activeDiet, sortBy]);

  const categorySections = [
    { id: 'cakes', name: 'Signature Cakes', subtitle: 'Handcrafted layered sponge, silky ganache, and seasonal fruits' },
    { id: 'pastries', name: 'Pastries & Oven Warmers', subtitle: 'Single-serve indulgence freshly sliced from the display counter' },
    { id: 'pizza', name: 'Gourmet Pizza & Fast Food', subtitle: 'Stone-baked bases, toasted brioche buns, and savory snacks' },
    { id: 'burgers', name: 'Burgers & Fries', subtitle: 'Double cheese patties and spiced crunchy sides' },
    { id: 'puffs', name: 'Hot Bakery Puffs', subtitle: 'Flaky, golden, 64-layer buttery puff pastries straight from the oven' },
    { id: 'chocolates', name: 'Artisanal Chocolates', subtitle: 'Handmade truffles, single-origin dark bars & festive gift boxes' },
    { id: 'beverages', name: 'Chilled Shakes & Brews', subtitle: 'Thick ice-cream milkshakes and artisanal cold pressed coffee' }
  ];

  const getCategoryCount = (catId: string) => {
    if (catId === 'burgers') {
      return filteredProducts.filter((p) => p.category === 'burgers' || p.category === 'fries').length;
    }
    return filteredProducts.filter((p) => p.category === catId).length;
  };

  const sortLabels = {
    popular: 'Popular',
    rating: 'Rating: High to Low',
    'price-asc': 'Price: Low to High',
    'price-desc': 'Price: High to Low'
  };

  return (
    <div className="flex flex-col w-full relative pt-20 pb-28">
      {/* Search, Micro-Filter & Sort Strip */}
      <div className="px-margin pt-space-sm flex flex-col gap-space-sm">
        <div className="flex items-center gap-space-xs">
          <div className="relative flex-1 flex items-center bg-surface-container-low rounded-xl px-space-md py-space-sm shadow-sm transition-all focus-within:bg-surface-container-lowest">
            <span className="material-symbols-outlined text-outline text-xl mr-space-xs">search</span>
            <input
              autoComplete="off"
              className="w-full bg-transparent font-body-md text-on-surface placeholder:text-outline focus:outline-none"
              placeholder="Search truffle, pizza, eggless cakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="search"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-outline hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="h-11 px-space-md flex items-center gap-1 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-base text-secondary">swap_vert</span>
              <span className="truncate max-w-[80px]">{sortLabels[sortBy]}</span>
            </button>

            {isSortOpen && (
              <div className="absolute right-0 mt-space-xs w-48 rounded-2xl bg-surface-container-lowest shadow-xl z-30 p-space-xs flex flex-col gap-0.5 border border-outline-variant/30">
                {(Object.keys(sortLabels) as (keyof typeof sortLabels)[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSortBy(key);
                      setIsSortOpen(false);
                      onShowToast(`Sorted by ${sortLabels[key]}`, 'sort');
                    }}
                    className="w-full px-space-md py-2 text-left rounded-xl font-label-md text-label-md text-on-surface hover:bg-surface-container flex items-center justify-between cursor-pointer"
                  >
                    <span>{sortLabels[key]}</span>
                    {sortBy === key && <span className="material-symbols-outlined text-xs text-secondary">check</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dietary Filter Chips */}
        <div className="flex items-center gap-space-xs overflow-x-auto py-1 -mx-margin px-margin no-scrollbar">
          <button
            onClick={() => setActiveDiet('all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-md text-label-md shadow-sm active:scale-95 transition-all flex-shrink-0 cursor-pointer ${
              activeDiet === 'all'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span>All Items</span>
            <span className="px-1.5 py-0.2 rounded-full bg-surface/20 text-[10px] font-bold">50</span>
          </button>
          <button
            onClick={() => setActiveDiet('veg')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-md text-label-md shadow-sm active:scale-95 transition-all flex-shrink-0 cursor-pointer ${
              activeDiet === 'veg'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="w-3.5 h-3.5 rounded-[3px] bg-surface flex items-center justify-center p-0.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F8A43]"></span>
            </span>
            <span>Pure Veg</span>
          </button>
          <button
            onClick={() => setActiveDiet('eggless')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-md text-label-md shadow-sm active:scale-95 transition-all flex-shrink-0 cursor-pointer ${
              activeDiet === 'eggless'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="w-3.5 h-3.5 rounded-[3px] bg-surface flex items-center justify-center p-0.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-xs bg-[#C8811A]"></span>
            </span>
            <span>Eggless Only</span>
          </button>
          <button
            onClick={() => setActiveDiet('non-veg')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-md text-label-md shadow-sm active:scale-95 transition-all flex-shrink-0 cursor-pointer ${
              activeDiet === 'non-veg'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="w-3.5 h-3.5 rounded-[3px] bg-surface flex items-center justify-center p-0.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-[1px] bg-[#C42B1C] rotate-45"></span>
            </span>
            <span>Non-Veg</span>
          </button>
        </div>
      </div>

      {/* Sticky Categories Sub-Navigation */}
      <div className="sticky top-20 z-30 bg-surface/95 backdrop-blur-md pt-space-xs pb-space-xs mt-space-xs shadow-[0_2px_12px_rgba(43,24,16,0.04)]">
        <div className="flex items-center gap-2 overflow-x-auto px-margin no-scrollbar">
          {categorySections.map((sec) => {
            const count = getCategoryCount(sec.id);
            const isSelected = activeCategory === sec.id;
            return (
              <a
                key={sec.id}
                href={`#cat-${sec.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveCategory(sec.id);
                  const el = document.getElementById(`cat-${sec.id}`);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-secondary text-on-secondary shadow-sm'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span>{sec.name.split(' ')[0]}</span>
                <span className={`text-[10px] font-bold ${isSelected ? 'opacity-90' : 'text-outline'}`}>
                  {count}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Special Baker's Pick Banner */}
      <div className="px-margin mt-space-sm">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-container via-[#4e2d19] to-primary p-space-md text-on-primary shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex flex-col z-10 max-w-[70%]">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="material-symbols-outlined text-tertiary-fixed text-sm">stars</span>
                <span className="font-label-tag text-label-tag tracking-wider uppercase text-tertiary-fixed font-bold">
                  Freshly Baked Today
                </span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-surface font-extrabold leading-tight">
                Same-Hour Delivery in Guntur
              </h2>
              <p className="font-body-md text-body-md text-primary-fixed-dim mt-0.5">
                Custom eggless photo cakes &amp; oven-hot savory snacks prepared to order.
              </p>
            </div>
            <div className="w-16 h-16 rounded-xl bg-surface/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 z-10">
              <span className="material-symbols-outlined text-secondary-fixed text-3xl">cake</span>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-secondary-container/20 blur-xl"></div>
        </div>
      </div>

      {/* Menu Feed Sections */}
      <div className="flex flex-col gap-space-lg px-margin mt-space-md">
        {categorySections.map((sec) => {
          let items = filteredProducts.filter((p) => p.category === sec.id);
          if (sec.id === 'burgers') {
            items = filteredProducts.filter((p) => p.category === 'burgers' || p.category === 'fries');
          }
          if (items.length === 0) return null;

          return (
            <div key={sec.id} id={`cat-${sec.id}`} className="flex flex-col gap-space-sm pt-space-xs scroll-mt-36">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">{sec.name}</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">{sec.subtitle}</p>
                </div>
                <span className="font-label-md text-label-md text-secondary font-bold bg-secondary-fixed px-2.5 py-0.5 rounded-full">
                  {items.length} Items
                </span>
              </div>

              {items.map((product) => {
                const qty = getItemQuantity(product.id);
                const cartItemId = getCartItemId(product.id);

                return (
                  <div
                    key={product.id}
                    className="rounded-2xl bg-surface-container-lowest p-space-md shadow-sm flex gap-space-md relative overflow-hidden"
                  >
                    <div className="flex flex-col flex-1 justify-between min-w-0">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          {product.diet === 'veg' && (
                            <span className="w-3.5 h-3.5 rounded-[3px] bg-surface flex items-center justify-center p-0.5 shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0F8A43]"></span>
                            </span>
                          )}
                          {product.diet === 'eggless' && (
                            <span className="w-3.5 h-3.5 rounded-[3px] bg-surface flex items-center justify-center p-0.5 shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-xs bg-[#C8811A]"></span>
                            </span>
                          )}
                          {product.diet === 'non-veg' && (
                            <span className="w-3.5 h-3.5 rounded-[3px] bg-surface flex items-center justify-center p-0.5 shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-[1px] bg-[#C42B1C] rotate-45"></span>
                            </span>
                          )}
                          {product.badge && (
                            <span
                              className={`px-1.5 py-0.5 rounded-md font-label-tag text-label-tag uppercase font-bold ${
                                product.badge === 'Hot Special'
                                  ? 'bg-[#ffdad6] text-[#93000a]'
                                  : 'bg-secondary-fixed text-on-secondary-fixed'
                              }`}
                            >
                              {product.badge}
                            </span>
                          )}
                        </div>

                        <h3
                          onClick={() => {
                            if (product.isCustomizable) {
                              onSelectProductForCustomize(product);
                              onNavigate('customize');
                            }
                          }}
                          className={`font-headline-sm text-headline-sm text-on-surface mt-1 font-bold truncate ${
                            product.isCustomizable ? 'cursor-pointer hover:text-secondary' : ''
                          }`}
                        >
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-secondary text-sm">star</span>
                          <span className="font-label-md text-label-md font-bold text-on-surface">{product.rating}</span>
                          <span className="font-body-md text-body-md text-outline">({product.reviewsCount}+)</span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-1 line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-title-currency text-title-currency text-primary">₹{product.price}</span>
                        {product.isCustomizable && (
                          <button
                            onClick={() => {
                              onSelectProductForCustomize(product);
                              onNavigate('customize');
                            }}
                            className="px-1.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-tag text-label-tag font-semibold hover:bg-secondary hover:text-on-secondary transition-colors cursor-pointer"
                          >
                            Customizable
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="relative w-28 h-28 flex-shrink-0 flex flex-col items-center">
                      <img
                        alt={product.name}
                        className="w-28 h-24 rounded-xl object-cover shadow-inner"
                        src={product.image}
                      />

                      {qty > 0 && cartItemId ? (
                        <div className="absolute -bottom-1 flex items-center bg-primary text-on-primary rounded-full px-2 py-1 shadow-md">
                          <button
                            onClick={() => onUpdateCartQuantity(cartItemId, -1)}
                            className="w-5 h-5 flex items-center justify-center active:scale-75 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-sm">remove</span>
                          </button>
                          <span className="px-2 font-label-md text-label-md font-bold">{qty}</span>
                          <button
                            onClick={() => onUpdateCartQuantity(cartItemId, 1)}
                            className="w-5 h-5 flex items-center justify-center active:scale-75 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-sm">add</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            if (product.isCustomizable) {
                              onSelectProductForCustomize(product);
                              onNavigate('customize');
                            } else {
                              onAddToCart(product);
                              onShowToast(`Added ${product.name} to box!`, 'check_circle');
                            }
                          }}
                          className="absolute -bottom-1 px-4 py-1.5 rounded-full bg-surface-container-lowest text-secondary font-label-lg text-label-lg font-extrabold shadow-md hover:bg-secondary hover:text-on-secondary active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>ADD</span>
                          <span className="material-symbols-outlined text-sm font-bold">add</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-margin text-center">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-3">
              <span className="material-symbols-outlined text-3xl">cookie</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">No sweet matches found!</h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mt-1">
              Try searching for other cravings like 'Truffle', 'Pizza', 'Burger', or reset the dietary filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveDiet('all');
              }}
              className="mt-4 px-5 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-md active:scale-95 transition-transform cursor-pointer"
            >
              Show Full 50-Item Menu
            </button>
          </div>
        )}
      </div>

      {/* Floating Sticky Mini Cart Bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-20 inset-x-margin z-40 transition-all duration-300">
          <div className="max-w-md mx-auto rounded-2xl bg-gradient-to-r from-primary-container via-[#33170a] to-secondary p-space-sm shadow-[0_8px_30px_rgba(43,24,16,0.35)] flex items-center justify-between text-on-primary border-none">
            <div className="flex items-center gap-3 pl-space-xs">
              <div className="relative w-10 h-10 rounded-xl bg-surface/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-secondary-fixed text-xl">shopping_bag</span>
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container font-label-tag text-[10px] font-extrabold flex items-center justify-center shadow-md animate-bounce">
                  {totalItems}
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-label-md text-secondary-fixed font-bold tracking-wide">
                    {totalItems} ITEMS
                  </span>
                  <span className="w-1 h-1 rounded-full bg-secondary-fixed/50"></span>
                  <span className="font-label-tag text-[10px] text-surface/80 uppercase">Delivery in 30m</span>
                </div>
                <span className="font-title-currency text-title-currency text-surface font-extrabold">
                  ₹{cartTotal}
                </span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('cart')}
              className="h-11 px-space-lg rounded-xl bg-secondary-container text-on-secondary-container font-label-lg text-label-lg font-extrabold shadow-md hover:opacity-90 active:scale-95 transition-transform flex items-center gap-1.5 cursor-pointer"
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
