import React, { useState } from 'react';
import { Product } from '../../types';
import { TopHeader } from '../common/TopHeader';
import { Search, ShoppingBag, Check } from 'lucide-react';

interface MarketplacePageProps {
  products: Product[];
  cartCount: number;
  onAddToCart: (product: Product) => void;
  onViewCart: () => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  products,
  cartCount,
  onAddToCart,
  onViewCart,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All products' },
    { id: 'fruits_vegetables', label: 'Fruits & vegetables' },
    { id: 'dairy_eggs', label: 'Dairy & eggs' },
    { id: 'meat_poultry', label: 'Meat & poultry' },
    { id: 'handicrafts', label: 'Handicrafts' },
    { id: 'others', label: 'Others' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.farmName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2">
        <TopHeader title="Fresh local products" role="tourist" />
      </div>

      {/* Search Input matching Page 8 */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search local products..."
          className="w-full bg-[#edf3ef] hover:bg-[#e4ece6] focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 pl-11 pr-4 py-3 rounded-xl border border-transparent focus:border-emerald-600 focus:outline-hidden transition-all shadow-2xs"
        />
      </div>

      {/* Category Pills matching Page 8 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#154e2d] text-white shadow-xs font-semibold'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Products Grid matching Page 8 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const isJustAdded = addedProductId === product.id;

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Product Visual Box matching Page 8 */}
              <div
                className={`h-44 w-full bg-gradient-to-br ${product.bgColor} flex items-center justify-center relative overflow-hidden`}
              >
                <span className="text-6xl sm:text-7xl filter drop-shadow-md group-hover:scale-110 transition-transform duration-200">
                  {product.iconEmoji}
                </span>

                <div className="absolute bottom-2 left-3 bg-black/20 text-white text-[10px] font-medium px-2 py-0.5 rounded-md backdrop-blur-xs">
                  {product.farmName}
                </div>
              </div>

              {/* Product Info & Action matching Page 8 */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif-title font-bold text-base text-slate-900">
                    {product.name}
                  </h4>
                  <div className="text-sm font-bold text-slate-800 mt-1">
                    ₱{product.price}{' '}
                    <span className="text-xs text-slate-500 font-normal">/{product.unit}</span>
                  </div>
                </div>

                <div className="mt-4 pt-2">
                  <button
                    onClick={() => handleAdd(product)}
                    className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer ${
                      isJustAdded
                        ? 'bg-emerald-800 text-white'
                        : 'bg-[#154e2d] hover:bg-[#0c381c] text-white'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[2.5]" />
                        <span>Added to cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Green Bottom Banner matching Page 8 */}
      <div className="bg-[#124b29] text-white rounded-2xl p-6 sm:p-7 shadow-xs mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-serif-title font-bold text-lg sm:text-xl text-white">
            Support local farmers. Buy fresh, buy local.
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">
            Every peso goes directly to sustainable agricultural growers across Luzon and Visayas.
          </p>
        </div>

        {cartCount > 0 && (
          <button
            onClick={onViewCart}
            className="bg-white hover:bg-slate-100 text-[#124b29] px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-colors shrink-0"
          >
            View cart ({cartCount} items) →
          </button>
        )}
      </div>
    </div>
  );
};
