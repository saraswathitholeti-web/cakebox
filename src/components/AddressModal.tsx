import React from 'react';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAddress: string;
  onSelectAddress: (address: string) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  selectedAddress,
  onSelectAddress,
  onShowToast
}) => {
  if (!isOpen) return null;

  const addresses = [
    {
      id: 'addr-home',
      tag: 'Home (Brodipet)',
      label: '4th Lane, Beside ICICI Bank, Brodipet, Guntur - 522002',
      eta: 'Estimated 30 mins delivery'
    },
    {
      id: 'addr-flat',
      tag: 'Home (Flat 402)',
      label: 'Flat 402, Sri Sai Nivas, 4th Lane Brodipet, Guntur - 522002',
      eta: 'Estimated 30 mins delivery'
    },
    {
      id: 'addr-office',
      tag: 'Office (Arundelpet)',
      label: '6/1 Arundelpet, Main Road, Guntur - 522002',
      eta: 'Estimated 35 mins delivery'
    }
  ];

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
            <span className="material-symbols-outlined text-secondary text-2xl">location_on</span>
            <h3 className="font-headline-md text-headline-md text-primary font-bold">Select Delivery Address</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface cursor-pointer hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-space-sm">
          {addresses.map((addr) => {
            const isChecked = selectedAddress.includes(addr.label.substring(0, 20));
            return (
              <label
                key={addr.id}
                onClick={() => {
                  onSelectAddress(addr.label);
                  onShowToast(`Delivery address changed to ${addr.tag}`, 'location_on');
                  onClose();
                }}
                className={`p-space-sm rounded-2xl flex items-start gap-space-sm cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-primary-fixed/30 ring-1 ring-secondary shadow-sm'
                    : 'bg-surface-container hover:bg-surface-container-high'
                }`}
              >
                <input
                  type="radio"
                  name="delivery-loc"
                  checked={isChecked}
                  onChange={() => {}}
                  className="mt-1 accent-primary"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg text-primary font-bold">{addr.tag}</span>
                  <span className="font-body-md text-body-md text-on-surface-variant truncate">{addr.label}</span>
                  <span className="font-label-tag text-label-tag text-secondary font-bold mt-1">{addr.eta}</span>
                </div>
              </label>
            );
          })}
        </div>

        <button
          onClick={() => {
            onShowToast('Address form opened for Guntur locations', 'add_location_alt');
            onClose();
          }}
          className="w-full py-3 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-secondary active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">add_location_alt</span>
          Add New Address in Guntur
        </button>
      </div>
    </div>
  );
};
