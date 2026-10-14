import { useState } from 'react';
import { ViewType, Product, CartItem, Order } from './types';
import { INITIAL_CART, PAST_ORDERS, PRODUCTS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { AddressModal } from './components/AddressModal';
import { CouponModal } from './components/CouponModal';
import { Toast } from './components/Toast';
import { HomeView } from './views/HomeView';
import { MenuView } from './views/MenuView';
import { CustomizerView } from './views/CustomizerView';
import { CartView } from './views/CartView';
import { TrackingView } from './views/TrackingView';
import { SupportView } from './views/SupportView';
import { AccountView } from './views/AccountView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [previousView, setPreviousView] = useState<ViewType>('home');
  const [selectedAddress, setSelectedAddress] = useState<string>(
    'Flat 402, Sri Sai Nivas, 4th Lane Brodipet, Guntur'
  );
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('WELCOME10');
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [orders, setOrders] = useState<Order[]>(PAST_ORDERS);
  const [productForCustomize, setProductForCustomize] = useState<Product | null>(PRODUCTS[0]);
  const [isEgglessOnly, setIsEgglessOnly] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ message: string | null; icon?: string; visible: boolean }>({
    message: null,
    icon: 'info',
    visible: false
  });

  const showToast = (message: string, icon: string = 'check_circle') => {
    setToast({ message, icon, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  const handleNavigate = (view: ViewType) => {
    setPreviousView(currentView);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (currentView === 'customize' || currentView === 'cart') {
      setCurrentView(previousView || 'home');
    } else if (currentView === 'tracking') {
      setCurrentView('orders');
    } else {
      setCurrentView('home');
    }
  };

  const handleAddToCart = (productOrItem: Product | CartItem) => {
    setCart((prev) => {
      // Check if item already exists by productId or id
      const existingIdx = prev.findIndex((item) => item.productId === productOrItem.id || item.id === productOrItem.id);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + 1
        };
        return next;
      }

      // Add fresh item
      const newItem: CartItem = 'productId' in productOrItem
        ? (productOrItem as CartItem)
        : {
            id: `cart-${Date.now()}`,
            productId: productOrItem.id,
            name: productOrItem.name,
            price: productOrItem.price,
            quantity: 1,
            image: productOrItem.image,
            diet: productOrItem.diet
          };
      return [...prev, newItem];
    });
  };

  const handleUpdateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleOrderPlaced = (orderId: string) => {
    const newOrder: Order = {
      id: orderId,
      date: 'Just Now • 4th Lane Brodipet',
      status: 'active',
      total: 1441.65,
      paymentMethod: 'Paid via Google Pay UPI',
      address: selectedAddress,
      eta: '18–22 mins',
      riderName: 'Ramesh Varma',
      items: cart.map((c) => ({
        name: c.name,
        quantity: c.quantity,
        price: c.price,
        weight: c.weight,
        diet: c.diet
      }))
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col max-w-lg mx-auto shadow-2xl relative">
      {/* Shared Adaptive Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAddress={() => setIsAddressModalOpen(true)}
        selectedAddress={selectedAddress}
        onBack={handleBack}
      />

      {/* Main View Display */}
      <main className="flex-1 w-full bg-surface">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenAddress={() => setIsAddressModalOpen(true)}
            selectedAddress={selectedAddress}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onSelectProductForCustomize={(prod) => setProductForCustomize(prod)}
            onShowToast={showToast}
          />
        )}

        {currentView === 'menu' && (
          <MenuView
            onNavigate={handleNavigate}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onSelectProductForCustomize={(prod) => setProductForCustomize(prod)}
            onShowToast={showToast}
          />
        )}

        {currentView === 'customize' && (
          <CustomizerView
            product={productForCustomize}
            onNavigate={handleNavigate}
            onAddToCart={(customItem) => handleAddToCart(customItem)}
            onShowToast={showToast}
          />
        )}

        {currentView === 'cart' && (
          <CartView
            cart={cart}
            onNavigate={handleNavigate}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onOpenAddress={() => setIsAddressModalOpen(true)}
            onOpenCoupons={() => setIsCouponModalOpen(true)}
            appliedCoupon={appliedCoupon}
            selectedAddress={selectedAddress}
            onOrderPlaced={handleOrderPlaced}
            onShowToast={showToast}
          />
        )}

        {currentView === 'tracking' && (
          <TrackingView onNavigate={handleNavigate} onShowToast={showToast} />
        )}

        {currentView === 'support' && (
          <SupportView
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onShowToast={showToast}
          />
        )}

        {(currentView === 'orders' || currentView === 'account') && (
          <AccountView
            onNavigate={handleNavigate}
            onOpenAddress={() => setIsAddressModalOpen(true)}
            onOpenCoupons={() => setIsCouponModalOpen(true)}
            onShowToast={showToast}
            isEgglessOnly={isEgglessOnly}
            onToggleEggless={(val) => setIsEgglessOnly(val)}
            orders={orders}
          />
        )}
      </main>

      {/* Shared Bottom Tab Bar */}
      <BottomNav currentView={currentView} onNavigate={handleNavigate} hasActiveOrder={true} />

      {/* Modals & Toasts */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        selectedAddress={selectedAddress}
        onSelectAddress={(addr) => setSelectedAddress(addr)}
        onShowToast={showToast}
      />

      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={(code) => setAppliedCoupon(code || null)}
        onShowToast={showToast}
      />

      <Toast message={toast.message} icon={toast.icon} visible={toast.visible} />
    </div>
  );
}
