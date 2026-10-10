import React, { useState } from 'react';
import { CartItem } from '../../types';
import { TopHeader } from '../common/TopHeader';
import { Minus, Plus, Trash2, CheckCircle2, Truck, CreditCard, ShoppingBag, ArrowLeft } from 'lucide-react';

interface CartCheckoutPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onContinueShopping: () => void;
  onClearCart: () => void;
}

export const CartCheckoutPage: React.FC<CartCheckoutPageProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onContinueShopping,
  onClearCart,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [deliveryInfo, setDeliveryInfo] = useState({
    recipient: 'Maria Santos',
    phone: '+63 917 555 4321',
    address: 'Unit 402, Acacia Residences, Brgy. Kumintang Ilaya',
    city: 'Batangas City',
    province: 'Batangas',
    postalCode: '4200',
    notes: 'Please call upon arrival at the gate',
  });
  const [paymentMethod, setPaymentMethod] = useState<'gcash' | 'maya' | 'card' | 'cod'>('gcash');
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('ORD-2026-8841');

  // Calculate pricing
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const deliveryFee = cartItems.length > 0 ? 70 : 0;
  const total = subtotal + deliveryFee;

  const handleProceed = () => {
    if (currentStep === 1) setCurrentStep(2);
    else if (currentStep === 2) setCurrentStep(3);
    else if (currentStep === 3) {
      setConfirmedOrderId(`ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`);
      setCurrentStep(4);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <TopHeader title="Your cart" role="tourist" />

      {/* 4-Step Stepper Navigation matching Page 9 */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setCurrentStep(1)}
          className={`py-2.5 rounded-xl transition-all cursor-pointer ${
            currentStep === 1
              ? 'bg-[#154e2d] text-white shadow-xs'
              : 'bg-[#edf3ee] text-slate-600 hover:bg-[#e4ece6]'
          }`}
        >
          1 Cart
        </button>

        <button
          onClick={() => cartItems.length > 0 && setCurrentStep(2)}
          disabled={cartItems.length === 0}
          className={`py-2.5 rounded-xl transition-all ${
            currentStep === 2
              ? 'bg-[#154e2d] text-white shadow-xs'
              : 'bg-[#edf3ee] text-slate-600 hover:bg-[#e4ece6]'
          }`}
        >
          2 Delivery
        </button>

        <button
          onClick={() => cartItems.length > 0 && setCurrentStep(3)}
          disabled={cartItems.length === 0}
          className={`py-2.5 rounded-xl transition-all ${
            currentStep === 3
              ? 'bg-[#154e2d] text-white shadow-xs'
              : 'bg-[#edf3ee] text-slate-600 hover:bg-[#e4ece6]'
          }`}
        >
          3 Payment
        </button>

        <button
          onClick={() => {}}
          disabled={currentStep !== 4}
          className={`py-2.5 rounded-xl transition-all ${
            currentStep === 4
              ? 'bg-[#154e2d] text-white shadow-xs'
              : 'bg-[#edf3ee] text-slate-400'
          }`}
        >
          4 Confirmation
        </button>
      </div>

      {/* STEP 1: CART VIEW (Matches Screenshot Page 9 exactly) */}
      {currentStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List matching Page 9 */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <p className="text-slate-500 mb-4">Your cart is currently empty.</p>
                <button
                  onClick={onContinueShopping}
                  className="bg-[#154e2d] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold"
                >
                  Start shopping fresh produce
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex items-center justify-between gap-4"
                >
                  {/* Thumbnail & Title */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.product.bgColor} flex items-center justify-center shrink-0 text-2xl shadow-2xs`}
                    >
                      {item.product.iconEmoji}
                    </div>

                    <div>
                      <h4 className="font-serif-title font-bold text-sm sm:text-base text-slate-900">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        ₱{item.product.price} /{item.product.unit}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Counter (- 2 +) matching Page 9 */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-[#f7faf8]">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="px-2.5 py-1.5 hover:bg-slate-200 text-slate-700 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="px-2.5 py-1.5 hover:bg-slate-200 text-slate-700 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total item price */}
                    <div className="text-right min-w-[70px]">
                      <span className="font-serif-title font-bold text-base text-slate-900">
                        ₱{item.product.price * item.quantity}
                      </span>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary matching Page 9 */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-serif-title font-bold text-lg text-slate-900">
              Order summary
            </h3>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">₱{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery fee</span>
                <span className="font-semibold text-slate-800">₱{deliveryFee}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-100 text-base font-serif-title font-bold text-slate-900">
                <span>Total</span>
                <span>₱{total}</span>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button
                onClick={handleProceed}
                disabled={cartItems.length === 0}
                className="w-full bg-[#154e2d] hover:bg-[#0c381c] disabled:opacity-50 text-white py-3 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-xs cursor-pointer"
              >
                Proceed to checkout
              </button>

              <button
                onClick={onContinueShopping}
                className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Continue shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: DELIVERY ADDRESS */}
      {currentStep === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Truck className="w-5 h-5 text-emerald-800" />
              <h3 className="font-serif-title font-bold text-lg text-slate-900">
                Delivery Details
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Recipient Name</label>
                <input
                  type="text"
                  value={deliveryInfo.recipient}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, recipient: e.target.value })}
                  className="w-full bg-[#f1f5f2] border border-slate-200 rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Mobile Contact</label>
                <input
                  type="text"
                  value={deliveryInfo.phone}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                  className="w-full bg-[#f1f5f2] border border-slate-200 rounded-lg p-3"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-600 font-medium mb-1">Street Address</label>
                <input
                  type="text"
                  value={deliveryInfo.address}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                  className="w-full bg-[#f1f5f2] border border-slate-200 rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">City / Municipality</label>
                <input
                  type="text"
                  value={deliveryInfo.city}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                  className="w-full bg-[#f1f5f2] border border-slate-200 rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Province</label>
                <input
                  type="text"
                  value={deliveryInfo.province}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, province: e.target.value })}
                  className="w-full bg-[#f1f5f2] border border-slate-200 rounded-lg p-3"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                ← Back to Cart
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="bg-[#154e2d] hover:bg-[#0c381c] text-white px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm"
              >
                Continue to Payment →
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
            <h4 className="font-serif-title font-bold text-base text-slate-900">Summary</h4>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Items in cart: {cartItems.reduce((s, i) => s + i.quantity, 0)}</p>
              <p>Subtotal: ₱{subtotal}</p>
              <p>Delivery: ₱{deliveryFee}</p>
              <p className="font-bold text-slate-900 text-sm pt-2">Total: ₱{total}</p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: PAYMENT METHOD */}
      {currentStep === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <CreditCard className="w-5 h-5 text-emerald-800" />
              <h3 className="font-serif-title font-bold text-lg text-slate-900">
                Choose Payment Method
              </h3>
            </div>

            <div className="space-y-3">
              <label
                onClick={() => setPaymentMethod('gcash')}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'gcash'
                    ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    G
                  </div>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-800">GCash E-Wallet</h5>
                    <p className="text-[11px] text-slate-500">Instant direct QR payment</p>
                  </div>
                </div>
                <input type="radio" checked={paymentMethod === 'gcash'} readOnly className="accent-emerald-700" />
              </label>

              <label
                onClick={() => setPaymentMethod('maya')}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'maya'
                    ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                    M
                  </div>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-800">Maya E-Wallet</h5>
                    <p className="text-[11px] text-slate-500">Scan or mobile number checkout</p>
                  </div>
                </div>
                <input type="radio" checked={paymentMethod === 'maya'} readOnly className="accent-emerald-700" />
              </label>

              <label
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center">
                    ₱
                  </div>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-800">Cash on Delivery (COD)</h5>
                    <p className="text-[11px] text-slate-500">Pay when fresh produce arrives at your doorstep</p>
                  </div>
                </div>
                <input type="radio" checked={paymentMethod === 'cod'} readOnly className="accent-emerald-700" />
              </label>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                ← Back to Delivery
              </button>
              <button
                onClick={handleProceed}
                className="bg-[#154e2d] hover:bg-[#0c381c] text-white px-8 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs"
              >
                Confirm Order (₱{total})
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
            <h4 className="font-serif-title font-bold text-base text-slate-900">Order Total</h4>
            <div className="text-2xl font-serif-title font-bold text-emerald-900">₱{total}</div>
            <p className="text-xs text-slate-500">Delivering to: {deliveryInfo.recipient}, {deliveryInfo.city}</p>
          </div>
        </div>
      )}

      {/* STEP 4: ORDER CONFIRMED */}
      {currentStep === 4 && (
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 text-center max-w-2xl mx-auto space-y-5">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#143d26]">
            Mabuhay! Order Confirmed
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Your fresh local farm products have been ordered! The farmers have been notified to harvest and prepare your package.
          </p>

          <div className="bg-[#f2f7f3] p-4 rounded-xl text-left max-w-md mx-auto text-xs space-y-2 border border-emerald-100">
            <div className="flex justify-between font-semibold text-slate-800">
              <span>Order Reference:</span>
              <span className="font-mono text-emerald-900">{confirmedOrderId}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Payment:</span>
              <span className="uppercase font-medium">{paymentMethod}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Estimated Delivery:</span>
              <span>Within 24–48 hours fresh</span>
            </div>
            <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Paid:</span>
              <span>₱{total}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                onClearCart();
                onContinueShopping();
              }}
              className="bg-[#154e2d] text-white px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm hover:bg-[#0c381c]"
            >
              Back to Marketplace
            </button>
            <button
              onClick={() => {
                onClearCart();
                setCurrentStep(1);
              }}
              className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm hover:bg-slate-50"
            >
              Track Order Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
