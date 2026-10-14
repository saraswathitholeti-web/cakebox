import React, { useState } from 'react';
import { ViewType } from '../types';
import { RIDER_AVATAR_URL } from '../data/mockData';

interface TrackingViewProps {
  onNavigate: (view: ViewType) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const TrackingView: React.FC<TrackingViewProps> = ({ onNavigate, onShowToast }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [driverPos, setDriverPos] = useState({ x: 205, y: 158 });
  const [quickReplyFeedback, setQuickReplyFeedback] = useState<string | null>(null);

  const handleQuickReply = (text: string) => {
    onShowToast(`Instruction sent: "${text}"`, 'send');
    setQuickReplyFeedback(`✓ Sent to Ramesh: "${text}"`);
    setTimeout(() => {
      setQuickReplyFeedback(null);
    }, 4000);
  };

  const handleRecenter = () => {
    onShowToast('Centered on Ramesh (1.2 km away)', 'my_location');
    setDriverPos((prev) => ({ ...prev, x: 205 + (Math.random() * 4 - 2), y: 158 + (Math.random() * 4 - 2) }));
  };

  const handleShareTracking = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Cake Box Guntur - Live Tracking',
          text: 'Track my birthday cake delivery on Ather EV #CB-84920',
          url: window.location.href
        })
        .catch(() => {
          onShowToast('Tracking link copied to clipboard!', 'content_copy');
        });
    } else {
      navigator.clipboard?.writeText(window.location.href);
      onShowToast('Tracking link copied to clipboard!', 'content_copy');
    }
  };

  return (
    <div className="flex flex-col relative w-full pt-16 pb-safe bg-surface">
      <div className="flex flex-col w-full pb-12 space-y-4">
        {/* 1. TOP STATUS & ETA BANNER */}
        <section className="px-margin pt-2">
          <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm space-y-3 relative overflow-hidden">
            {/* Ambient celebratory glow */}
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-label-md text-label-md text-on-surface-variant font-semibold">
                  On Time • Est. 8:42 PM
                </span>
              </div>
              <span className="font-label-tag text-label-tag bg-surface-container text-primary px-2.5 py-0.5 rounded-full font-bold">
                Placed 8:15 PM
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight font-extrabold">
                  Arriving in 18–22 mins
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                Ramesh is cruising on 4th Lane with your fresh bake
              </p>
            </div>

            {/* Segmented Track Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden flex p-0.5">
                <div
                  className="bg-gradient-to-r from-secondary to-secondary-container h-full rounded-full transition-all duration-700 shadow-sm"
                  style={{ width: '78%' }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant font-label-tag text-label-tag">
                <span>Order Placed</span>
                <span>Baking &amp; Pack</span>
                <span className="text-secondary font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                  On the way
                </span>
                <span>Delivered</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. LIVE ROUTE MAP SECTION */}
        <section className="px-margin">
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm relative">
            {/* Street Map Container */}
            <div className="relative w-full h-80 bg-[#f4ede6] overflow-hidden select-none">
              {/* SVG Vector Map Representation of Brodipet Guntur */}
              <svg
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 420 320"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="routeGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#ad2c50" />
                    <stop offset="100%" stopColor="#fd698b" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#ad2c50" floodOpacity="0.45" />
                  </filter>
                </defs>

                {/* Blocks & Parks */}
                <rect fill="#e9e2db" height="70" opacity="0.8" rx="8" width="90" x="18" y="22" />
                <rect fill="#e9e2db" height="68" opacity="0.8" rx="8" width="130" x="130" y="24" />
                <rect fill="#dfe5d8" height="90" opacity="0.85" rx="8" width="120" x="280" y="20" />
                <rect fill="#e9e2db" height="110" opacity="0.8" rx="8" width="85" x="20" y="115" />
                <rect fill="#e9e2db" height="85" opacity="0.8" rx="8" width="140" x="125" y="115" />
                <rect fill="#e9e2db" height="150" opacity="0.8" rx="8" width="115" x="285" y="130" />
                <rect fill="#e9e2db" height="60" opacity="0.8" rx="8" width="245" x="20" y="245" />

                {/* Brodipet Street Grid */}
                <line stroke="#ffffff" strokeLinecap="round" strokeWidth="16" x1="0" x2="420" y1="104" y2="104" />
                <line stroke="#ded8d0" strokeDasharray="6 6" strokeWidth="1.5" x1="0" x2="420" y1="104" y2="104" />

                <line stroke="#ffffff" strokeLinecap="round" strokeWidth="14" x1="116" x2="116" y1="0" y2="320" />
                <line stroke="#ffffff" strokeLinecap="round" strokeWidth="12" x1="274" x2="274" y1="0" y2="320" />

                <line stroke="#ffffff" strokeWidth="11" x1="0" x2="420" y1="235" y2="235" />
                <line stroke="#ffffff" strokeLinecap="round" strokeWidth="14" x1="116" x2="274" y1="104" y2="235" />

                {/* Street Names */}
                <text fill="#82746e" fontFamily="Plus Jakarta Sans" fontSize="8" fontWeight="700" letterSpacing="1" x="32" y="100">
                  MAIN ROAD BRODIPET
                </text>
                <text fill="#82746e" fontFamily="Plus Jakarta Sans" fontSize="7.5" fontWeight="700" x="124" y="55">
                  ARUNDELPET ROAD
                </text>
                <text
                  fill="#82746e"
                  fontFamily="Plus Jakarta Sans"
                  fontSize="8"
                  fontWeight="700"
                  transform="rotate(39 180 180)"
                  x="180"
                  y="180"
                >
                  4TH LANE CONNECTOR
                </text>
                <text fill="#587458" fontFamily="Plus Jakarta Sans" fontSize="7.5" fontWeight="700" x="290" y="90">
                  GUNTUR PARADE GROUNDS
                </text>
                <text fill="#82746e" fontFamily="Plus Jakarta Sans" fontSize="7.5" fontWeight="700" x="135" y="230">
                  ICICI BANK JUNCTION
                </text>

                {/* Delivery Route Active Path */}
                <path
                  d="M 62 104 L 116 104 Q 140 104 154 118 L 225 188 Q 240 202 260 216 L 330 235"
                  fill="none"
                  stroke="#ffd9de"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="7"
                />
                <path
                  d="M 62 104 L 116 104 Q 140 104 154 118 L 225 188 Q 240 202 260 216 L 330 235"
                  fill="none"
                  filter="url(#glow)"
                  stroke="url(#routeGrad)"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  strokeWidth="4.5"
                >
                  <animate attributeName="stroke-dashoffset" dur="2s" from="56" repeatCount="indefinite" to="0" />
                </path>
              </svg>

              {/* Top Telemetry Tag Overlay */}
              <div className="absolute top-3 left-3 bg-primary/85 backdrop-blur-md text-on-primary font-label-tag text-label-tag px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Simulated Live GPS • Brodipet Zone</span>
              </div>

              {/* Floating Map Utility Buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                <button
                  onClick={handleRecenter}
                  aria-label="Recenter Map"
                  className="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary flex items-center justify-center shadow-md active:scale-90 transition-all hover:bg-surface-container cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">my_location</span>
                </button>
                <button
                  onClick={() => onShowToast('Full GPS street grid active in Brodipet', 'fullscreen')}
                  aria-label="View Fullscreen"
                  className="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary flex items-center justify-center shadow-md active:scale-90 transition-all hover:bg-surface-container cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">fullscreen</span>
                </button>
              </div>

              {/* Marker 1: Cake Box Bakery */}
              <div className="absolute" style={{ left: '48px', top: '68px' }}>
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="bg-surface-container-lowest text-primary px-2 py-0.5 rounded shadow font-label-tag text-label-tag font-bold whitespace-nowrap mb-1">
                    Cake Box Guntur
                  </div>
                  <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-lg ring-4 ring-white">
                    <span className="material-symbols-outlined text-lg text-tertiary-fixed">bakery_dining</span>
                  </div>
                </div>
              </div>

              {/* Marker 2: Delivery Partner (Live Pulse) */}
              <div
                className="absolute transition-all duration-1000 ease-out"
                style={{ left: `${driverPos.x}px`, top: `${driverPos.y}px` }}
              >
                <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute w-14 h-14 rounded-full bg-secondary/20 animate-ping"></span>
                  <span className="absolute w-10 h-10 rounded-full bg-secondary/30 animate-pulse"></span>
                  <div className="relative z-10 w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-xl ring-2 ring-white">
                    <span className="material-symbols-outlined text-xl">two_wheeler</span>
                  </div>
                  <div className="absolute top-10 whitespace-nowrap bg-primary-container text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                    <span>Ramesh • 1.2 km</span>
                  </div>
                </div>
              </div>

              {/* Marker 3: Customer Home */}
              <div className="absolute" style={{ left: '310px', top: '205px' }}>
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="bg-surface-container-lowest text-primary px-2 py-0.5 rounded shadow font-label-tag text-label-tag font-bold whitespace-nowrap mb-1">
                    Flat 402, Sri Sai Nivas
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg ring-2 ring-white">
                    <span className="material-symbols-outlined text-base">home</span>
                  </div>
                </div>
              </div>

              {/* Live Telemetry Bottom Dock inside Map */}
              <div className="absolute bottom-3 inset-x-3 bg-surface-container-lowest/95 backdrop-blur-md px-3 py-2 rounded-xl flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-base">speed</span>
                  </div>
                  <div>
                    <p className="font-label-tag text-label-tag text-on-surface-variant uppercase tracking-wider">Speed</p>
                    <p className="font-label-md text-label-md text-primary font-bold">24 km/h • Smooth</p>
                  </div>
                </div>
                <div className="h-6 w-px bg-surface-container-high"></div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-base">near_me</span>
                  </div>
                  <div>
                    <p className="font-label-tag text-label-tag text-on-surface-variant uppercase tracking-wider">Remaining</p>
                    <p className="font-label-md text-label-md text-primary font-bold">1.2 km (8 mins)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. DELIVERY PARTNER PROFILE CARD */}
        <section className="px-margin">
          <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm space-y-3.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img
                    className="w-14 h-14 rounded-2xl object-cover shadow-sm"
                    alt="Ramesh Varma"
                    src={RIDER_AVATAR_URL}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full px-1.5 py-0.2 flex items-center gap-0.5 text-[10px] font-bold shadow">
                    <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span>4.9</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-headline-sm text-headline-sm text-primary truncate font-bold">Ramesh Varma</h3>
                    <span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider flex items-center gap-0.5 shrink-0">
                      <span className="material-symbols-outlined text-xs">verified</span>
                      Fresh Bakes Specialist
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant truncate">
                    Ather 450X EV • AP 07 BK 4920
                  </p>
                  <p className="font-label-tag text-label-tag text-primary-container font-semibold mt-0.5">
                    1,840+ deliveries completed
                  </p>
                </div>
              </div>
            </div>

            {/* Safety & Cake Integrity Badge */}
            <div className="bg-surface-container-low p-2.5 rounded-xl flex items-center gap-2.5">
              <span className="material-symbols-outlined text-emerald-600 text-xl shrink-0">health_and_safety</span>
              <div className="font-label-tag text-label-tag text-on-surface-variant leading-snug">
                <span className="font-bold text-primary">Temp 98.2°F</span> • Sanitized insulated cake carrier box with level suspension
              </div>
            </div>

            {/* Partner Action CTAs */}
            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <a
                className="h-11 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 active:scale-98 transition-transform shadow-sm"
                href="tel:+919876543210"
              >
                <span className="material-symbols-outlined text-lg">call</span>
                Call Partner
              </a>
              <button
                onClick={() => onNavigate('support')}
                className="h-11 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 active:scale-98 transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg text-secondary">chat</span>
                Message
              </button>
            </div>

            {/* Quick Message Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 -mx-1 px-1 no-scrollbar">
              <button
                onClick={() => handleQuickReply('🔔 Ring doorbell')}
                className="shrink-0 bg-surface-container-low hover:bg-surface-container active:scale-95 text-primary text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer"
              >
                🔔 Ring doorbell
              </button>
              <button
                onClick={() => handleQuickReply('📞 Call upon arrival')}
                className="shrink-0 bg-surface-container-low hover:bg-surface-container active:scale-95 text-primary text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer"
              >
                📞 Call upon arrival
              </button>
              <button
                onClick={() => handleQuickReply('🚪 Leave at door')}
                className="shrink-0 bg-surface-container-low hover:bg-surface-container active:scale-95 text-primary text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer"
              >
                🚪 Leave at door
              </button>
            </div>

            {quickReplyFeedback && (
              <p className="text-center font-label-tag text-label-tag text-emerald-700 font-bold transition-all animate-in fade-in">
                {quickReplyFeedback}
              </p>
            )}
          </div>
        </section>

        {/* 4. INTERACTIVE STEP TIMELINE (Order Lifecycle) */}
        <section className="px-margin">
          <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Live Preparation &amp; Transit</h3>
              <span className="font-label-tag text-label-tag uppercase text-secondary font-extrabold tracking-wider bg-secondary-fixed/50 px-2 py-0.5 rounded-full">
                Stage 4 of 5
              </span>
            </div>

            <div className="relative pl-7 space-y-5">
              {/* Connecting Vertical Rail */}
              <div className="absolute left-3 top-2 bottom-3 w-0.5 bg-surface-container-high"></div>
              <div className="absolute left-3 top-2 h-[75%] w-0.5 bg-emerald-600 transition-all duration-500"></div>

              {/* Step 1: Placed */}
              <div className="relative flex items-start gap-3">
                <div className="absolute -left-7 top-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-surface-container-lowest shadow-sm">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-label-lg text-label-lg text-primary font-bold">Order Confirmed</p>
                    <span className="font-label-tag text-label-tag text-on-surface-variant font-medium">8:15 PM</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant">Bakery accepted &amp; queued your fresh order</p>
                </div>
              </div>

              {/* Step 2: Baking */}
              <div className="relative flex items-start gap-3">
                <div className="absolute -left-7 top-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-surface-container-lowest shadow-sm">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-label-lg text-label-lg text-primary font-bold">Fresh Baking &amp; Packaging</p>
                    <span className="font-label-tag text-label-tag text-on-surface-variant font-medium">8:18 PM</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Signature Chocolate Truffle freshly iced, cooled &amp; packed in rigid thermocol protective cradle
                  </p>
                </div>
              </div>

              {/* Step 3: Picked Up */}
              <div className="relative flex items-start gap-3">
                <div className="absolute -left-7 top-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-surface-container-lowest shadow-sm">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-label-lg text-label-lg text-primary font-bold">Picked Up from Cake Box</p>
                    <span className="font-label-tag text-label-tag text-on-surface-variant font-medium">8:30 PM</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Handed over to delivery partner Ramesh at 4th Lane outlet
                  </p>
                </div>
              </div>

              {/* Step 4: Active Transit (Pulsing) */}
              <div className="relative flex items-start gap-3">
                <div className="absolute -left-7 top-0 w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center ring-4 ring-secondary-container/40 shadow-md animate-pulse">
                  <span className="material-symbols-outlined text-sm">local_shipping</span>
                </div>
                <div className="flex-1 bg-surface-container-low p-3 rounded-xl">
                  <div className="flex items-center justify-between">
                    <p className="font-label-lg text-label-lg text-secondary font-extrabold flex items-center gap-1.5">
                      Out for Delivery
                      <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                    </p>
                    <span className="font-label-tag text-label-tag font-bold text-secondary">In Progress</span>
                  </div>
                  <p className="font-body-md text-body-md text-primary mt-0.5">
                    Ramesh is 1.2 km away, crossing Arundelpet flyover towards your doorstep
                  </p>
                </div>
              </div>

              {/* Step 5: Doorstep (Pending) */}
              <div className="relative flex items-start gap-3 opacity-60">
                <div className="absolute -left-7 top-0 w-6 h-6 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center ring-4 ring-surface-container-lowest">
                  <span className="material-symbols-outlined text-sm">home_pin</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-label-lg text-label-lg text-primary font-semibold">Doorstep Delivery</p>
                    <span className="font-label-tag text-label-tag text-on-surface-variant font-medium">Est. 8:42 PM</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Flat 402, Sri Sai Nivas, 4th Lane Brodipet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. DELIVERY DETAILS & INSTRUCTIONS CARD */}
        <section className="px-margin">
          <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm space-y-3">
            <h3 className="font-headline-sm text-headline-sm text-primary flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined text-secondary">location_on</span>
              Delivery Location &amp; Instructions
            </h3>
            <div className="bg-surface-container-low p-3 rounded-xl space-y-2">
              <div>
                <span className="font-label-tag text-label-tag text-on-surface-variant uppercase font-bold tracking-wider">
                  Delivering to
                </span>
                <p className="font-headline-sm text-headline-sm text-primary font-bold">Home (Flat 402, Sri Sai Nivas)</p>
                <p className="font-body-md text-body-md text-on-surface-variant">4th Lane, Brodipet, Guntur, AP - 522002</p>
              </div>
              <div className="h-px w-full bg-surface-container-high"></div>
              <div className="flex items-start gap-2 pt-0.5">
                <span className="material-symbols-outlined text-tertiary-container text-base mt-0.5">sticky_note_2</span>
                <div>
                  <span className="font-label-tag text-label-tag text-on-surface-variant uppercase font-bold">
                    Kitchen &amp; Handling Request
                  </span>
                  <p className="font-body-md text-body-md text-primary font-semibold">
                    "Please pack pizza in heat-sealed box, keep cake upright and chill during transit."
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1 text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-lg">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span className="font-label-tag text-label-tag font-bold">Contactless Doorstep Delivery Enabled</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. ORDER SUMMARY ACCORDION CARD */}
        <section className="px-margin">
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden">
            {/* Accordion Header */}
            <button
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              className="w-full p-space-lg flex items-center justify-between text-left hover:bg-surface-container-low/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-lg">receipt_long</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Order Items (3 items)</h3>
                  <p className="font-label-tag text-label-tag text-on-surface-variant">Tap to inspect item customization &amp; bill</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-primary">
                <span className="font-title-currency text-title-currency text-primary font-extrabold">₹1,441.65</span>
                <span
                  className={`material-symbols-outlined transition-transform duration-300 ${
                    isAccordionOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                >
                  expand_more
                </span>
              </div>
            </button>

            {/* Accordion Body */}
            {isAccordionOpen && (
              <div className="px-space-lg pb-space-lg space-y-4">
                <div className="h-px w-full bg-surface-container"></div>

                {/* Item 1: Truffle Cake */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-3.5 h-3.5 bg-surface-container-lowest border border-emerald-600 rounded flex items-center justify-center shrink-0 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                    </div>
                    <div className="min-w-0">
                      <p className="font-label-lg text-label-lg text-primary font-bold">Signature Chocolate Truffle Cake</p>
                      <p className="font-body-md text-body-md text-on-surface-variant">1 kg • 100% Eggless</p>
                      <div className="inline-block bg-surface-container px-2 py-0.5 rounded text-[10px] font-semibold text-primary mt-1">
                        Plaque: "Happy Birthday Rahul"
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-label-md text-label-md text-on-surface-variant">1 ×</span>
                    <p className="font-title-currency text-title-currency text-primary font-bold">₹850.00</p>
                  </div>
                </div>

                {/* Item 2: Pizza */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-3.5 h-3.5 bg-surface-container-lowest border border-emerald-600 rounded flex items-center justify-center shrink-0 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                    </div>
                    <div className="min-w-0">
                      <p className="font-label-lg text-label-lg text-primary font-bold">Paneer Tikka Pizza</p>
                      <p className="font-body-md text-body-md text-on-surface-variant">Medium 10" • Crispy Thin Crust</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-label-md text-label-md text-on-surface-variant">1 ×</span>
                    <p className="font-title-currency text-title-currency text-primary font-bold">₹380.00</p>
                  </div>
                </div>

                {/* Item 3: Cold Coffee */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-3.5 h-3.5 bg-surface-container-lowest border border-emerald-600 rounded flex items-center justify-center shrink-0 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                    </div>
                    <div className="min-w-0">
                      <p className="font-label-lg text-label-lg text-primary font-bold">Cold Coffee (Thick Shake)</p>
                      <p className="font-body-md text-body-md text-on-surface-variant">Chilled 350ml glass bottles</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-label-md text-label-md text-on-surface-variant">2 ×</span>
                    <p className="font-title-currency text-title-currency text-primary font-bold">₹180.00</p>
                  </div>
                </div>

                {/* Bill Breakdown */}
                <div className="bg-surface-container-low p-3 rounded-xl space-y-1.5 text-on-surface-variant font-body-md text-body-md">
                  <div className="flex justify-between">
                    <span>Item Total</span>
                    <span className="text-primary font-semibold">₹1,410.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Packaging Charges (Insulated Cake Cradle)</span>
                    <span className="text-primary font-semibold">₹35.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes &amp; GST (5%)</span>
                    <span className="text-primary font-semibold">₹71.65</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discounts (FIRSTBAKE coupon)</span>
                    <span>- ₹75.00</span>
                  </div>
                  <div className="h-px bg-surface-container-high my-1"></div>
                  <div className="flex justify-between items-center text-primary font-headline-sm text-headline-sm font-extrabold pt-1">
                    <span>Grand Total</span>
                    <span className="font-title-currency text-title-currency">₹1,441.65</span>
                  </div>
                </div>

                {/* Payment Meta & Invoice CTA */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
                    <div className="font-label-tag text-label-tag text-on-surface-variant">
                      <span>Paid via UPI (Google Pay)</span>
                      <br />
                      <span className="font-mono text-primary font-bold">ID: UPI-8392104</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onShowToast('Downloaded Tax Invoice #CB-84920.pdf', 'file_download')}
                    className="h-9 px-3 rounded-full bg-surface-container hover:bg-surface-container-high active:scale-95 text-primary text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    Invoice
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 7. SUPPORT & UTILITY ACTIONS */}
        <section className="px-margin space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2">
            {/* Assistant Bot */}
            <button
              onClick={() => onNavigate('support')}
              className="p-3 rounded-2xl bg-surface-container-lowest hover:bg-surface-container-low active:scale-98 transition-all flex flex-col items-start text-left shadow-sm cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-lg text-secondary">smart_toy</span>
              </div>
              <span className="font-label-lg text-label-lg text-primary font-bold">Cake Box Assistant</span>
              <span className="font-label-tag text-label-tag text-on-surface-variant">Modify notes or add cutlery</span>
            </button>

            {/* Share Live Tracking */}
            <button
              onClick={handleShareTracking}
              className="p-3 rounded-2xl bg-surface-container-lowest hover:bg-surface-container-low active:scale-98 transition-all flex flex-col items-start text-left shadow-sm cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-lg text-emerald-600">share</span>
              </div>
              <span className="font-label-lg text-label-lg text-primary font-bold">Share Tracking</span>
              <span className="font-label-tag text-label-tag text-on-surface-variant">Send live link on WhatsApp</span>
            </button>
          </div>

          {/* Emergency / Help banner */}
          <div className="bg-surface-container-low px-4 py-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-error text-xl">contact_support</span>
              <div>
                <p className="font-label-md text-label-md text-primary font-bold">
                  Need emergency order cancellation or address fix?
                </p>
                <p className="font-label-tag text-label-tag text-on-surface-variant">
                  Direct line to Brodipet Kitchen Support Desk
                </p>
              </div>
            </div>
            <a
              className="shrink-0 text-error font-label-md text-label-md font-extrabold hover:underline"
              href="tel:+918632224455"
            >
              Get Help
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
