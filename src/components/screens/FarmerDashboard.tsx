import React, { useState } from 'react';
import { TopHeader } from '../common/TopHeader';
import { Booking, Product } from '../../types';
import { Plus, Check, X, Eye } from 'lucide-react';

interface FarmerDashboardProps {
  farmerBookings: Booking[];
  products: Product[];
  onConfirmBooking: (bookingId: string) => void;
  onCancelBooking: (bookingId: string) => void;
  onAddProduct: (newProduct: Partial<Product>) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  farmerBookings,
  products,
  onConfirmBooking,
  onCancelBooking,
  onAddProduct,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(150);
  const [newProdUnit, setNewProdUnit] = useState('kg');
  const [newProdCategory, setNewProdCategory] = useState<'fruits_vegetables' | 'dairy_eggs' | 'meat_poultry' | 'handicrafts' | 'others'>('fruits_vegetables');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName) return;

    onAddProduct({
      id: `prod-${Date.now()}`,
      name: newProdName,
      price: newProdPrice,
      unit: newProdUnit,
      category: newProdCategory,
      categoryLabel: newProdCategory === 'fruits_vegetables' ? 'Fruits & vegetables' : 'Specialty Produce',
      farmName: 'Sunnyvale Farm',
      iconEmoji: newProdCategory === 'fruits_vegetables' ? '🥑' : '📦',
      bgColor: 'from-emerald-200 to-green-300',
      inStock: true,
    });

    setNewProdName('');
    setShowAddModal(false);
  };

  const displayedProducts = products.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Top Header matching Page 10 */}
      <TopHeader
        title="Welcome, Juan Dela Cruz"
        subtitle="Farmer"
        role="farmer"
      />

      {/* 3 Metric Cards matching Page 10 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total products */}
        <div className="bg-[#e2f1f5] p-5 rounded-2xl border border-sky-100 shadow-2xs">
          <div className="text-3xl font-serif-title font-bold text-slate-800">12</div>
          <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Total products</div>
        </div>

        {/* New orders */}
        <div className="bg-[#e9eff7] p-5 rounded-2xl border border-blue-100 shadow-2xs">
          <div className="text-3xl font-serif-title font-bold text-slate-800">8</div>
          <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">New orders</div>
        </div>

        {/* Active bookings */}
        <div className="bg-[#ecebf7] p-5 rounded-2xl border border-indigo-100 shadow-2xs">
          <div className="text-3xl font-serif-title font-bold text-slate-800">15</div>
          <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Active bookings</div>
        </div>
      </div>

      {/* Recent bookings Section matching Page 10 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif-title font-bold text-base sm:text-lg text-slate-900">
            Recent bookings
          </h3>
          <button className="text-xs font-semibold text-slate-500 hover:text-emerald-800 transition-colors">
            View all
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="text-slate-400 text-xs font-medium border-b border-slate-100 pb-3">
                <th className="pb-3 font-normal">Date</th>
                <th className="pb-3 font-normal">Customer</th>
                <th className="pb-3 font-normal">Activity</th>
                <th className="pb-3 font-normal">Status</th>
                <th className="pb-3 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {farmerBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 font-medium text-slate-800 whitespace-nowrap">{b.date}</td>
                  <td className="py-3.5 text-slate-700 whitespace-nowrap">{b.customerName}</td>
                  <td className="py-3.5 text-slate-600 whitespace-nowrap">{b.activity}</td>
                  <td className="py-3.5 whitespace-nowrap">
                    <span
                      className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold ${
                        b.status === 'Confirmed'
                          ? 'bg-[#d8eedd] text-[#14532d]'
                          : b.status === 'Pending'
                          ? 'bg-[#fef3c7] text-[#92400e]'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right whitespace-nowrap">
                    {b.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onConfirmBooking(b.id)}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => onCancelBooking(b.id)}
                          className="bg-slate-100 hover:bg-rose-100 hover:text-rose-700 text-slate-600 text-[11px] font-semibold px-2 py-1 rounded-md transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* My products Section matching Page 10 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="font-serif-title font-bold text-base sm:text-lg text-slate-900">
              My products
            </h3>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-xs bg-[#124d29] hover:bg-[#0c381c] text-white px-3 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add product</span>
            </button>
          </div>
          <button className="text-xs font-semibold text-slate-500 hover:text-emerald-800 transition-colors">
            View all
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {displayedProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow flex flex-col"
            >
              <div
                className={`h-32 bg-gradient-to-br ${prod.bgColor} flex items-center justify-center text-5xl`}
              >
                {prod.iconEmoji}
              </div>
              <div className="p-3.5 text-center">
                <h4 className="font-serif-title font-bold text-xs sm:text-sm text-slate-800">
                  {prod.name}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  ₱{prod.price} /{prod.unit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h4 className="font-serif-title font-bold text-lg text-slate-900">Add New Farm Product</h4>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="mt-4 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. Carabao Mangoes, Fresh Duck Eggs"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full bg-[#f1f5f2] border border-slate-200 rounded-lg p-2.5"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Price (₱)</label>
                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full bg-[#f1f5f2] border border-slate-200 rounded-lg p-2.5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Unit</label>
                  <input
                    type="text"
                    value={newProdUnit}
                    onChange={(e) => setNewProdUnit(e.target.value)}
                    className="w-full bg-[#f1f5f2] border border-slate-200 rounded-lg p-2.5"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category</label>
                <select
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value as any)}
                  className="w-full bg-[#f1f5f2] border border-slate-200 rounded-lg p-2.5"
                >
                  <option value="fruits_vegetables">Fruits & vegetables</option>
                  <option value="dairy_eggs">Dairy & eggs</option>
                  <option value="meat_poultry">Meat & poultry</option>
                  <option value="handicrafts">Handicrafts</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#124d29] hover:bg-[#0c381c] text-white px-5 py-2 rounded-lg text-xs font-semibold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
