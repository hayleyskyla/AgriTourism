import React, { useState } from 'react';
import {
  Role,
  ScreenId,
  Farm,
  Product,
  CartItem,
  Booking,
} from './types';
import {
  INITIAL_FARMS,
  INITIAL_PRODUCTS,
  INITIAL_TOURIST_BOOKINGS,
  INITIAL_FARMER_BOOKINGS,
} from './data/mockData';
import { Sidebar } from './components/common/Sidebar';
import { ScreenSwitcher } from './components/common/ScreenSwitcher';
import { LandingPage } from './components/screens/LandingPage';
import { SignUpPage } from './components/screens/SignUpPage';
import { LoginPage } from './components/screens/LoginPage';
import { TouristDashboard } from './components/screens/TouristDashboard';
import { ExploreFarms } from './components/screens/ExploreFarms';
import { FarmDetailPage } from './components/screens/FarmDetailPage';
import { ActivityBookingPage } from './components/screens/ActivityBookingPage';
import { MarketplacePage } from './components/screens/MarketplacePage';
import { CartCheckoutPage } from './components/screens/CartCheckoutPage';
import { FarmerDashboard } from './components/screens/FarmerDashboard';
import { MyBookingsPage } from './components/screens/MyBookingsPage';
import { AdminDashboard } from './components/screens/AdminDashboard';

export default function App() {
  // Main screen routing state
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('page_1_landing');
  const [userRole, setUserRole] = useState<Role>('tourist');

  // Application data state
  const [farms, setFarms] = useState<Farm[]>(INITIAL_FARMS);
  const [selectedFarm, setSelectedFarm] = useState<Farm>(
    INITIAL_FARMS.find((f) => f.id === 'sunnyvale-farm') || INITIAL_FARMS[0]
  );
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  // Cart initialized with items from Page 9 mockup:
  // Fresh mangoes (qty 2 @ ₱120), Local honey (qty 1 @ ₱250), Banana chips (qty 1 @ ₱60)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      product: INITIAL_PRODUCTS.find((p) => p.id === 'mangoes') || INITIAL_PRODUCTS[0],
      quantity: 2,
    },
    {
      id: 'cart-2',
      product: INITIAL_PRODUCTS.find((p) => p.id === 'local-honey') || INITIAL_PRODUCTS[3],
      quantity: 1,
    },
    {
      id: 'cart-3',
      product: INITIAL_PRODUCTS.find((p) => p.id === 'banana-chips') || INITIAL_PRODUCTS[4],
      quantity: 1,
    },
  ]);

  const [touristBookings, setTouristBookings] = useState<Booking[]>(INITIAL_TOURIST_BOOKINGS);
  const [farmerBookings, setFarmerBookings] = useState<Booking[]>(INITIAL_FARMER_BOOKINGS);

  // Search filter passed from landing page to explore
  const [exploreSearchQuery, setExploreSearchQuery] = useState('');

  // Wishlist toggle handler
  const handleToggleWishlist = (farmId: string) => {
    setFarms((prev) =>
      prev.map((f) =>
        f.id === farmId ? { ...f, isWishlisted: !f.isWishlisted } : f
      )
    );
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: `cart-${Date.now()}`, product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Farmer operations
  const handleConfirmFarmerBooking = (bookingId: string) => {
    setFarmerBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Confirmed' } : b))
    );
  };

  const handleCancelFarmerBooking = (bookingId: string) => {
    setFarmerBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
  };

  const handleAddProduct = (newProd: Partial<Product>) => {
    setProducts((prev) => [newProd as Product, ...prev]);
  };

  // Tourist booking creation
  const handleCreateTouristBooking = (newBookingData: Partial<Booking>) => {
    const newBooking: Booking = {
      id: `BK-${Math.floor(100 + Math.random() * 900)}`,
      farmId: newBookingData.farmId || 'sunnyvale-farm',
      farmName: newBookingData.farmName || 'Sunnyvale Farm',
      activity: newBookingData.activity || 'Fruit picking experience',
      date: newBookingData.date || 'Oct 20, 2026',
      guests: newBookingData.guests || 2,
      priceTotal: newBookingData.priceTotal || 400,
      status: 'Confirmed',
      customerName: 'Maria Santos',
      customerEmail: 'maria.santos@example.com',
      imageEmoji: newBookingData.imageEmoji || '🍊',
    };

    setTouristBookings((prev) => [newBooking, ...prev]);
    setCurrentScreen('page_11_my_bookings');
  };

  // Sidebar navigation handler
  const handleSidebarNavigate = (navId: string) => {
    switch (navId) {
      case 'tourist_dashboard':
        setUserRole('tourist');
        setCurrentScreen('page_4_tourist_dashboard');
        break;
      case 'explore_farms':
        setUserRole('tourist');
        setCurrentScreen('page_5_explore_farms');
        break;
      case 'my_bookings':
        setUserRole('tourist');
        setCurrentScreen('page_11_my_bookings');
        break;
      case 'my_orders':
        setUserRole('tourist');
        setCurrentScreen('page_9_cart');
        break;
      case 'saved_farms':
        setUserRole('tourist');
        setCurrentScreen('page_5_explore_farms');
        break;
      case 'farmer_dashboard':
      case 'farmer_profile':
      case 'farmer_products':
      case 'farmer_bookings':
      case 'farmer_schedule':
      case 'farmer_inquiries':
      case 'farmer_earnings':
      case 'farmer_reports':
      case 'farmer_messages':
      case 'farmer_settings':
        setUserRole('farmer');
        setCurrentScreen('page_10_farmer_dashboard');
        break;
      case 'admin_dashboard':
      case 'admin_users':
      case 'admin_farms':
      case 'admin_products':
      case 'admin_bookings':
      case 'admin_reports':
      case 'admin_reviews':
      case 'admin_settings':
        setUserRole('admin');
        setCurrentScreen('page_12_admin_dashboard');
        break;
      case 'landing':
        setCurrentScreen('page_1_landing');
        break;
      default:
        break;
    }
  };

  // Logout handler
  const handleLogout = () => {
    setUserRole('guest');
    setCurrentScreen('page_1_landing');
  };

  // Check if current screen uses the sidebar shell
  const isDashboardLayout = ![
    'page_1_landing',
    'page_2_signup',
    'page_3_login',
  ].includes(currentScreen);

  // Map screen to active sidebar item ID
  const getActiveSidebarItem = () => {
    switch (currentScreen) {
      case 'page_4_tourist_dashboard':
        return 'tourist_dashboard';
      case 'page_5_explore_farms':
      case 'page_6_farm_detail':
      case 'page_7_booking':
        return 'explore_farms';
      case 'page_8_marketplace':
      case 'page_9_cart':
        return 'my_orders';
      case 'page_10_farmer_dashboard':
        return 'farmer_dashboard';
      case 'page_11_my_bookings':
        return 'my_bookings';
      case 'page_12_admin_dashboard':
        return 'admin_dashboard';
      default:
        return 'tourist_dashboard';
    }
  };

  // Determine role for sidebar based on screen
  const effectiveRole: Role =
    currentScreen === 'page_10_farmer_dashboard'
      ? 'farmer'
      : currentScreen === 'page_12_admin_dashboard'
      ? 'admin'
      : 'tourist';

  return (
    <div className="min-h-screen bg-[#f5f8f5] flex flex-col antialiased text-[#172f1e]">
      {/* 1. Public Standalone Screens (No Sidebar) */}
      {currentScreen === 'page_1_landing' && (
        <LandingPage
          onNavigateToFarms={(query) => {
            setExploreSearchQuery(query || '');
            setUserRole('tourist');
            setCurrentScreen('page_5_explore_farms');
          }}
          onNavigateToMarketplace={() => {
            setUserRole('tourist');
            setCurrentScreen('page_8_marketplace');
          }}
          onNavigateToLogin={() => setCurrentScreen('page_3_login')}
          onNavigateToSignUp={() => setCurrentScreen('page_2_signup')}
          onNavigateToAbout={() => {
            setUserRole('tourist');
            setCurrentScreen('page_4_tourist_dashboard');
          }}
        />
      )}

      {currentScreen === 'page_2_signup' && (
        <SignUpPage
          onSignUpSuccess={(newRole) => {
            setUserRole(newRole);
            if (newRole === 'farmer') {
              setCurrentScreen('page_10_farmer_dashboard');
            } else if (newRole === 'admin') {
              setCurrentScreen('page_12_admin_dashboard');
            } else {
              setCurrentScreen('page_4_tourist_dashboard');
            }
          }}
          onNavigateToLogin={() => setCurrentScreen('page_3_login')}
        />
      )}

      {currentScreen === 'page_3_login' && (
        <LoginPage
          onLoginSuccess={(role) => {
            setUserRole(role);
            if (role === 'farmer') {
              setCurrentScreen('page_10_farmer_dashboard');
            } else if (role === 'admin') {
              setCurrentScreen('page_12_admin_dashboard');
            } else {
              setCurrentScreen('page_4_tourist_dashboard');
            }
          }}
          onNavigateToSignUp={() => setCurrentScreen('page_2_signup')}
          onBackToHome={() => setCurrentScreen('page_1_landing')}
        />
      )}

      {/* 2. Portal & Dashboard Screens with persistent Dark Forest Green Sidebar */}
      {isDashboardLayout && (
        <div className="flex flex-1 min-h-screen">
          <Sidebar
            role={effectiveRole}
            activeItem={getActiveSidebarItem()}
            onNavigate={handleSidebarNavigate}
            onLogout={handleLogout}
            cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
          />

          <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
            {currentScreen === 'page_4_tourist_dashboard' && (
              <TouristDashboard
                farms={farms}
                onExploreFarms={() => setCurrentScreen('page_5_explore_farms')}
                onSelectFarm={(farm) => {
                  setSelectedFarm(farm);
                  setCurrentScreen('page_6_farm_detail');
                }}
                onNavigateToBookings={() => setCurrentScreen('page_11_my_bookings')}
                onNavigateToReviews={() => setCurrentScreen('page_5_explore_farms')}
                onNavigateToSavedFarms={() => setCurrentScreen('page_5_explore_farms')}
              />
            )}

            {currentScreen === 'page_5_explore_farms' && (
              <ExploreFarms
                farms={farms}
                initialSearch={exploreSearchQuery}
                onSelectFarm={(farm) => {
                  setSelectedFarm(farm);
                  setCurrentScreen('page_6_farm_detail');
                }}
                onToggleWishlist={handleToggleWishlist}
              />
            )}

            {currentScreen === 'page_6_farm_detail' && (
              <FarmDetailPage
                farm={selectedFarm}
                onBookNow={() => setCurrentScreen('page_7_booking')}
                onToggleWishlist={handleToggleWishlist}
                onBack={() => setCurrentScreen('page_5_explore_farms')}
              />
            )}

            {currentScreen === 'page_7_booking' && (
              <ActivityBookingPage
                onProceedToCheckout={handleCreateTouristBooking}
                onBack={() => setCurrentScreen('page_6_farm_detail')}
              />
            )}

            {currentScreen === 'page_8_marketplace' && (
              <MarketplacePage
                products={products}
                cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                onAddToCart={handleAddToCart}
                onViewCart={() => setCurrentScreen('page_9_cart')}
              />
            )}

            {currentScreen === 'page_9_cart' && (
              <CartCheckoutPage
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveCartItem}
                onContinueShopping={() => setCurrentScreen('page_8_marketplace')}
                onClearCart={handleClearCart}
              />
            )}

            {currentScreen === 'page_10_farmer_dashboard' && (
              <FarmerDashboard
                farmerBookings={farmerBookings}
                products={products}
                onConfirmBooking={handleConfirmFarmerBooking}
                onCancelBooking={handleCancelFarmerBooking}
                onAddProduct={handleAddProduct}
              />
            )}

            {currentScreen === 'page_11_my_bookings' && (
              <MyBookingsPage
                bookings={touristBookings}
                onCancelBooking={(id) => {
                  setTouristBookings((prev) =>
                    prev.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b))
                  );
                }}
              />
            )}

            {currentScreen === 'page_12_admin_dashboard' && (
              <AdminDashboard />
            )}
          </main>
        </div>
      )}

      {/* Floating 12-Screen Navigator matching the user's PDF */}
      <ScreenSwitcher
        currentScreen={currentScreen}
        onSelectScreen={(screenId) => {
          setCurrentScreen(screenId);
          if (screenId === 'page_10_farmer_dashboard') {
            setUserRole('farmer');
          } else if (screenId === 'page_12_admin_dashboard') {
            setUserRole('admin');
          } else if (['page_1_landing', 'page_2_signup', 'page_3_login'].includes(screenId)) {
            setUserRole('guest');
          } else {
            setUserRole('tourist');
          }
        }}
      />
    </div>
  );
}
