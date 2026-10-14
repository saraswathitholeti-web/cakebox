import React, { useState, useRef, useEffect } from 'react';
import { ViewType, ChatMessage, Product } from '../types';
import { INITIAL_CHAT } from '../data/mockData';

interface SupportViewProps {
  onNavigate: (view: ViewType) => void;
  onAddToCart: (product: Product) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const SupportView: React.FC<SupportViewProps> = ({ onNavigate, onAddToCart, onShowToast }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Contextual bot response generator
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "I've relayed your message to the master patissier at our Brodipet kitchen. Is there anything else I can arrange for your celebration?";
      let cardType: ChatMessage['cardType'] = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('where') || lower.includes('status') || lower.includes('track')) {
        replyText = "Ramesh is currently on 4th Lane Connector, approximately 1.2 km away. He is traveling smoothly at 24 km/h with your temperature-controlled cake box!";
      } else if (lower.includes('candle') || lower.includes('sparkler')) {
        replyText = "I've added 1 set of complimentary golden sparkler candles to your active delivery notes. Our kitchen has attached them to box #CB-84920!";
        onShowToast('Sparkler candles added to order!', 'celebration');
      } else if (lower.includes('invoice') || lower.includes('bill')) {
        replyText = "Here is your GST invoice for Order #CB-84920 (₹1,441.65). You can download the PDF copy anytime.";
        onShowToast('Invoice generated for download', 'download');
      } else if (lower.includes('eggless') || lower.includes('pure veg')) {
        replyText = "100% of our celebration cakes and pastry counters in Brodipet use certified vegetarian ingredients, prepared in separate sanitised stations!";
      } else if (lower.includes('call') || lower.includes('agent') || lower.includes('manager')) {
        replyText = "Connecting you directly with the Brodipet Kitchen Duty Manager. Expected response time is under 1 minute.";
        cardType = 'escalation';
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cardType
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 900);
  };

  const handlePreOrderRedVelvet = () => {
    onAddToCart({
      id: 'prod-red-velvet',
      name: 'Red Velvet Cream Cheese Cake',
      category: 'cakes',
      price: 599,
      rating: 4.9,
      reviewsCount: 185,
      description: '1 kg • Crafted with Dutch cocoa & cream cheese',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCkCLcfutYQyOE6YVEXJEV-HIzwrub32auIFJtdMggDcyHQ4aGhnD_7M1dlL4ZMOBW_l_NWU7c8mFM6ukvZ5iwCt1zdIYA6bUIo2o7uYqeNghWcvVYK2YeFtqqfQv1eDQK_rHRyfLD827P9dQ0XToQZEt1EU_uY4Sr5IQeRDtfEX_Yg6FIcckS_0_RtMp_LtO_ZW7UNoy7CFxs9YVHkxNT2DDUPGCNBTjMySjUvxlvyxFHDgiNJjUCE',
      diet: 'veg',
      badge: '100% Eggless'
    });
    onShowToast('Red Velvet Cream Cheese Cake added for tomorrow!', 'cake');
  };

  return (
    <div className="flex flex-col relative w-full pt-16 pb-28 bg-surface flex-1 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col w-full">
        {/* Pinned Order Tracking Widget */}
        <section className="px-margin mb-space-md pt-2">
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
            <div className="flex items-center justify-between gap-space-xs mb-space-xs">
              <div className="flex items-center gap-space-xs min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
                <span className="font-label-lg text-label-lg text-primary truncate font-bold">Order #CB-84920</span>
                <span className="px-1.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-tag text-label-tag flex-shrink-0 font-bold">
                  Out for Delivery
                </span>
              </div>
              <span className="font-label-tag text-label-tag text-secondary flex-shrink-0 font-bold tracking-tight">
                18-22 mins away
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant truncate mb-space-sm">
              Signature Chocolate Truffle Cake (1kg) + 2 items
            </p>
            <div className="bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded-full bg-primary-container text-primary-fixed flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-lg">two_wheeler</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface truncate font-bold">
                    Ramesh Varma (Rider)
                  </span>
                  <span className="font-label-tag text-label-tag text-on-surface-variant truncate">
                    Arriving at Flat 402, Sri Sai Nivas
                  </span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('tracking')}
                className="px-space-md py-1.5 rounded-full bg-surface-container text-primary hover:bg-surface-container-high active:scale-95 transition-all flex items-center gap-1 font-label-md text-label-md flex-shrink-0 cursor-pointer font-bold"
              >
                <span className="material-symbols-outlined text-sm text-secondary">near_me</span>
                <span>Live Map</span>
              </button>
            </div>
          </div>
        </section>

        {/* Chat History Stream */}
        <div className="flex flex-col px-margin space-y-space-lg mb-space-xl">
          {/* Timestamp Divider */}
          <div className="flex items-center justify-center my-space-xs">
            <span className="px-space-md py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-tag text-label-tag tracking-wider uppercase font-semibold">
              Today, 8:32 PM • Brodipet Kitchen
            </span>
          </div>

          {/* Quick Action Prompts Slider */}
          <div className="flex gap-space-xs overflow-x-auto pb-1 -mx-margin px-margin no-scrollbar">
            <button
              onClick={() => handleSendMessage('Where is my order?')}
              className="flex-shrink-0 px-space-md py-2 rounded-full bg-surface-container-lowest text-primary hover:bg-surface-container-high font-label-md text-label-md shadow-sm active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer font-semibold"
            >
              <span className="material-symbols-outlined text-sm text-secondary">explore</span>
              <span>Where is my order?</span>
            </button>
            <button
              onClick={() => handleSendMessage('Can I get a custom cake inquiry for 3 tier wedding?')}
              className="flex-shrink-0 px-space-md py-2 rounded-full bg-surface-container-lowest text-primary hover:bg-surface-container-high font-label-md text-label-md shadow-sm active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer font-semibold"
            >
              <span className="material-symbols-outlined text-sm text-on-tertiary-container">cake</span>
              <span>Custom Cake Inquiry</span>
            </button>
            <button
              onClick={() => handleSendMessage('Tell me about your eggless baking process')}
              className="flex-shrink-0 px-space-md py-2 rounded-full bg-surface-container-lowest text-primary hover:bg-surface-container-high font-label-md text-label-md shadow-sm active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer font-semibold"
            >
              <span className="material-symbols-outlined text-sm text-secondary">eco</span>
              <span>Eggless &amp; Dietary FAQ</span>
            </button>
            <button
              onClick={() => handleSendMessage('Need assistance with order or address change')}
              className="flex-shrink-0 px-space-md py-2 rounded-full bg-surface-container-lowest text-primary hover:bg-surface-container-high font-label-md text-label-md shadow-sm active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer font-semibold"
            >
              <span className="material-symbols-outlined text-sm text-error">cancel</span>
              <span>Cancellation &amp; Help</span>
            </button>
          </div>

          {/* Render Messages */}
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            if (isUser) {
              return (
                <div key={msg.id} className="flex flex-col items-end gap-space-xs self-end max-w-[85%]">
                  <div className="bg-primary-container text-on-primary rounded-2xl rounded-tr-sm p-space-md shadow-sm font-body-md text-body-md leading-relaxed">
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1 pr-1">
                    <span className="font-label-tag text-label-tag text-on-surface-variant/70">{msg.time}</span>
                    <span className="material-symbols-outlined text-[14px] text-secondary">done_all</span>
                  </div>
                </div>
              );
            }

            return (
              <div key={msg.id} className="flex items-start gap-space-sm max-w-[95%]">
                <div className="w-8 h-8 rounded-full bg-primary-container text-primary-fixed flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                  <span className="material-symbols-outlined text-base">bakery_dining</span>
                </div>
                <div className="flex flex-col gap-space-xs w-full">
                  <div className="bg-surface-container-lowest rounded-2xl rounded-tl-sm p-space-md text-on-surface shadow-sm leading-relaxed font-body-md text-body-md flex flex-col gap-space-sm">
                    {msg.text.includes('Namaste') ? (
                      <div>
                        <p className="mb-1 font-headline-sm text-headline-sm text-primary font-bold">Namaste Rahul! 👋</p>
                        <p>
                          Welcome to Cake Box Brodipet Support. I can see your active order{' '}
                          <strong className="text-primary font-semibold">#CB-84920</strong> is currently out for delivery
                          with Ramesh. How can I assist you right now?
                        </p>
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}

                    {/* Delivery Note Relayed Card */}
                    {msg.cardType === 'note_relayed' && (
                      <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between gap-space-sm">
                        <div className="flex items-center gap-space-sm min-w-0">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-base">task_alt</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-md text-label-md text-primary font-bold truncate">
                              Delivery Note Relayed
                            </span>
                            <span className="font-label-tag text-label-tag text-on-surface-variant truncate">
                              "Ring bell &amp; keep upright chill"
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => onShowToast('Handling note updated for rider', 'edit')}
                          className="px-space-sm py-1 rounded bg-surface-container-highest text-primary font-label-tag text-label-tag hover:bg-surface-dim active:scale-95 transition-all flex-shrink-0 cursor-pointer font-bold"
                        >
                          Edit Note
                        </button>
                      </div>
                    )}

                    {/* Product Recommendation Card (Red Velvet) */}
                    {msg.cardType === 'product_card' && (
                      <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-sm flex flex-col">
                        <div className="relative w-full h-36 bg-surface-container">
                          <img
                            className="w-full h-full object-cover"
                            alt="Red Velvet Cream Cheese Cake"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkCLcfutYQyOE6YVEXJEV-HIzwrub32auIFJtdMggDcyHQ4aGhnD_7M1dlL4ZMOBW_l_NWU7c8mFM6ukvZ5iwCt1zdIYA6bUIo2o7uYqeNghWcvVYK2YeFtqqfQv1eDQK_rHRyfLD827P9dQ0XToQZEt1EU_uY4Sr5IQeRDtfEX_Yg6FIcckS_0_RtMp_LtO_ZW7UNoy7CFxs9YVHkxNT2DDUPGCNBTjMySjUvxlvyxFHDgiNJjUCE"
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-surface-container-lowest/95 backdrop-blur-md flex items-center gap-1 shadow-sm">
                            <div className="w-3.5 h-3.5 bg-surface-container-lowest flex items-center justify-center rounded-[2px] shadow-xs">
                              <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                            </div>
                            <span className="font-label-tag text-label-tag text-primary font-bold">100% Eggless</span>
                          </div>
                          <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-primary-container/90 text-primary-fixed backdrop-blur-md font-label-tag text-label-tag font-bold">
                            Brodipet Fresh Bake
                          </div>
                        </div>
                        <div className="p-space-md flex flex-col gap-space-xs">
                          <div className="flex items-start justify-between gap-space-xs">
                            <div>
                              <h4 className="font-headline-sm text-headline-sm text-primary leading-tight font-bold">
                                Red Velvet Cream Cheese Cake
                              </h4>
                              <p className="font-label-tag text-label-tag text-on-surface-variant">
                                1 kg • Crafted with Dutch cocoa &amp; cream cheese
                              </p>
                            </div>
                            <span className="font-title-currency text-title-currency text-primary font-extrabold">₹599</span>
                          </div>
                          <div className="flex items-center gap-1.5 py-1 text-on-tertiary-container font-label-md text-label-md font-semibold">
                            <span className="material-symbols-outlined text-base">schedule</span>
                            <span>Earliest Slot: Tomorrow by 6:00 PM</span>
                          </div>
                          <div className="grid grid-cols-2 gap-space-xs mt-space-xs pt-space-xs">
                            <button
                              onClick={() => {
                                onNavigate('customize');
                                onShowToast('Customizing Red Velvet Cake plaque...', 'edit_note');
                              }}
                              className="w-full py-2 px-space-xs rounded-full bg-surface-container text-primary hover:bg-surface-container-high font-label-md text-label-md transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer font-bold"
                            >
                              <span className="material-symbols-outlined text-sm">edit_note</span>
                              <span>Custom Plaque</span>
                            </button>
                            <button
                              onClick={handlePreOrderRedVelvet}
                              className="w-full py-2 px-space-xs rounded-full bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container font-label-md text-label-md shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer font-bold"
                            >
                              <span className="material-symbols-outlined text-sm">shopping_bag</span>
                              <span>Pre-Order Now</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Escalation Card */}
                    {msg.cardType === 'escalation' && (
                      <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-space-sm">
                            <div className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold">
                              <span className="material-symbols-outlined text-lg">headset_mic</span>
                            </div>
                            <div>
                              <div className="font-label-md text-label-md text-primary font-bold">
                                Kitchen Escalation Desk
                              </div>
                              <div className="font-label-tag text-label-tag text-emerald-700 flex items-center gap-1 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                <span>Wait time: &lt; 1 min</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-space-sm pt-space-xs">
                          <a
                            className="flex-1 py-2 px-space-md rounded-full bg-primary-container text-on-primary hover:bg-tertiary font-label-md text-label-md text-center transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-sm font-bold"
                            href="tel:+918632220199"
                          >
                            <span className="material-symbols-outlined text-sm text-primary-fixed">call</span>
                            <span>Request Call Back</span>
                          </a>
                          <button
                            onClick={() => onShowToast('Store Manager connected in priority queue', 'support_agent')}
                            className="py-2 px-space-md rounded-full bg-surface-container text-primary hover:bg-surface-container-high font-label-md text-label-md transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer font-bold"
                          >
                            <span className="material-symbols-outlined text-sm text-secondary">chat</span>
                            <span>Live Agent</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="font-label-tag text-label-tag text-on-surface-variant/70 pl-1">{msg.time}</span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 pl-2 text-on-surface-variant text-xs italic">
              <span className="w-2 h-2 rounded-full bg-secondary animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-secondary animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-secondary animate-bounce [animation-delay:0.4s]"></span>
              <span>Cake Box Assistant is replying...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Persistent Contextual Bottom Suggestions */}
        <div className="px-margin mb-space-sm">
          <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar py-1">
            <span className="font-label-tag text-label-tag text-on-surface-variant uppercase tracking-wider flex-shrink-0 mr-1 font-bold">
              Suggestions:
            </span>
            <button
              onClick={() => handleSendMessage('Please add extra birthday candles to my box')}
              className="flex-shrink-0 px-space-md py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-primary font-label-md text-label-md active:scale-95 transition-all cursor-pointer font-medium"
            >
              🍰 Add Extra Birthday Candles
            </button>
            <button
              onClick={() => handleSendMessage('Download invoice #CB-84920')}
              className="flex-shrink-0 px-space-md py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-primary font-label-md text-label-md active:scale-95 transition-all cursor-pointer font-medium"
            >
              🧾 Download Invoice #CB-84920
            </button>
            <button
              onClick={() => handleSendMessage('Can I change my drop address?')}
              className="flex-shrink-0 px-space-md py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-primary font-label-md text-label-md active:scale-95 transition-all cursor-pointer font-medium"
            >
              📍 Change Drop Address
            </button>
          </div>
        </div>

        {/* Footer Micro Disclaimer */}
        <div className="px-margin pb-space-lg text-center">
          <p className="font-label-tag text-label-tag text-on-surface-variant/60 flex items-center justify-center gap-1 font-medium">
            <span className="material-symbols-outlined text-[13px] text-secondary">verified_user</span>
            <span>Powered by Cake Box AI • Real-time Brodipet kitchen &amp; delivery synchronization</span>
          </p>
        </div>
      </div>

      {/* Floating Chat Input Dock */}
      <footer className="fixed bottom-16 inset-x-0 z-40 bg-surface/95 backdrop-blur-xl shadow-[0_-4px_24px_-2px_rgba(43,24,16,0.08)] pb-safe">
        <div className="px-margin py-space-sm flex items-center gap-space-sm max-w-lg mx-auto">
          <button
            onClick={() => onShowToast('Attaching photo of custom cake or reference...', 'add_circle')}
            aria-label="Attachments & Quick Actions"
            className="w-11 h-11 rounded-full bg-surface-container text-on-surface-variant hover:text-primary flex items-center justify-center active:scale-95 transition-all flex-shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">add_circle</span>
          </button>
          <div className="flex-1 min-w-0 bg-surface-container-low rounded-full px-space-md py-1.5 flex items-center gap-space-xs ring-1 ring-outline-variant/30 focus-within:ring-2 focus-within:ring-secondary">
            <input
              aria-label="Message input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              className="w-full bg-transparent text-on-surface placeholder:text-on-surface-variant/70 font-body-md text-body-md focus:outline-none py-1"
              placeholder="Ask about your order, custom cakes..."
              type="text"
            />
            <button
              onClick={() => onShowToast('Listening for audio query...', 'mic')}
              aria-label="Voice message"
              className="w-8 h-8 rounded-full text-on-surface-variant hover:text-primary flex items-center justify-center active:scale-90 transition-all flex-shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">mic</span>
            </button>
          </div>
          <button
            onClick={() => handleSendMessage()}
            aria-label="Send message"
            className="w-11 h-11 rounded-full bg-primary-container text-on-primary hover:bg-tertiary flex items-center justify-center active:scale-95 transition-all shadow-[0_4px_12px_rgba(61,35,20,0.18)] flex-shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl text-primary-fixed">send</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
