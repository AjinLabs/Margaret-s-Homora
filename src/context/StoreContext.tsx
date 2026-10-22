'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  CartItem,
  Coupon,
  Order,
  OrderStatus,
  StoreSettings,
} from '@/types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  INITIAL_SETTINGS,
} from '@/lib/data';

interface StoreContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;

  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (coupon: Coupon) => void;
  toggleCoupon: (code: string) => void;
  deleteCoupon: (code: string) => void;

  discountAmount: number;
  shippingFee: number;
  finalTotal: number;

  orders: Order[];
  createOrder: (orderInput: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'timeline'>) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
  updateOrderStatus: (
    orderId: string,
    status: OrderStatus,
    note?: string,
    trackingNumber?: string,
    courierName?: string
  ) => void;

  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Products
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  // Categories
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  // Orders
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  // Settings
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Admin auth
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('mh_products');
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedCategories = localStorage.getItem('mh_categories');
      if (savedCategories) setCategories(JSON.parse(savedCategories));

      const savedCart = localStorage.getItem('mh_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('mh_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedCoupons = localStorage.getItem('mh_coupons');
      if (savedCoupons) setCoupons(JSON.parse(savedCoupons));

      const savedOrders = localStorage.getItem('mh_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedSettings = localStorage.getItem('mh_settings');
      if (savedSettings) setSettings(JSON.parse(savedSettings));

      const savedAdmin = localStorage.getItem('mh_admin_auth');
      if (savedAdmin === 'true') setIsAdminAuthenticated(true);
    } catch (e) {
      console.warn('Storage restore error:', e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mh_products', JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('mh_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('mh_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('mh_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('mh_coupons', JSON.stringify(coupons));
    } catch (e) {}
  }, [coupons]);

  useEffect(() => {
    try {
      localStorage.setItem('mh_settings', JSON.stringify(settings));
    } catch (e) {}
  }, [settings]);

  // Product CRUD
  const addProduct = (productInput: Omit<Product, 'id'>): Product => {
    const newProduct: Product = {
      ...productInput,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  // Category CRUD
  const addCategory = (categoryInput: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryInput,
      id: `cat-${Date.now()}`,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, color?: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedColor === color
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor: color }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Coupon calculations
  let discountAmount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'percentage') {
      const calculated = (cartSubtotal * appliedCoupon.discountValue) / 100;
      discountAmount = appliedCoupon.maxDiscount
        ? Math.min(calculated, appliedCoupon.maxDiscount)
        : calculated;
    } else {
      discountAmount = appliedCoupon.discountValue;
    }
  }

  const shippingFee =
    cartSubtotal === 0 || cartSubtotal >= settings.freeShippingThreshold
      ? 0
      : settings.standardShippingFee;

  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode);

    if (!found) {
      return { success: false, message: 'Invalid coupon code.' };
    }
    if (!found.isActive) {
      return { success: false, message: 'This coupon is no longer active.' };
    }
    if (new Date(found.expiryDate) < new Date()) {
      return { success: false, message: 'This coupon has expired.' };
    }
    if (cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Add ₹${(found.minOrderValue - cartSubtotal).toLocaleString(
          'en-IN'
        )} more to unlock this coupon.`,
      };
    }

    setAppliedCoupon(found);
    return {
      success: true,
      message: `Coupon "${found.code}" applied! You saved on this order.`,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
  };

  const toggleCoupon = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const createOrder = (
    orderInput: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'timeline'>
  ): Order => {
    const orderNum = `MH-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
    const now = new Date().toISOString();
    const newOrder: Order = {
      ...orderInput,
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: now,
      timeline: [
        {
          status: 'confirmed',
          timestamp: now,
          note:
            orderInput.paymentMethod === 'razorpay'
              ? 'Order placed with online payment verification.'
              : 'Order placed under Cash on Delivery.',
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Decrease stock for ordered items
    setProducts((prev) =>
      prev.map((prod) => {
        const itemOrdered = orderInput.items.find(
          (item) => item.productId === prod.id
        );
        if (itemOrdered) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - itemOrdered.quantity),
          };
        }
        return prod;
      })
    );

    // Clear cart after order creation
    clearCart();

    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId);
  };

  const getOrderByNumber = (orderNumber: string) => {
    return orders.find(
      (o) => o.orderNumber.toLowerCase() === orderNumber.toLowerCase().trim()
    );
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    note?: string,
    trackingNumber?: string,
    courierName?: string
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const now = new Date().toISOString();
        const updatedTimeline = [
          ...order.timeline,
          {
            status,
            timestamp: now,
            note: note || `Order status updated to ${status}.`,
          },
        ];
        return {
          ...order,
          orderStatus: status,
          paymentStatus:
            status === 'delivered' && order.paymentMethod === 'cod'
              ? 'paid'
              : order.paymentStatus,
          trackingNumber: trackingNumber || order.trackingNumber,
          courierName: courierName || order.courierName,
          timeline: updatedTimeline,
        };
      })
    );
  };

  // Settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Admin login
  const loginAdmin = (password: string) => {
    // Demo password 'homora2026' or 'admin123'
    if (password === 'homora2026' || password === 'admin123' || password === 'admin') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('mh_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('mh_admin_auth');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductBySlug,
        getProductById,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addCoupon,
        toggleCoupon,
        deleteCoupon,
        discountAmount,
        shippingFee,
        finalTotal,
        orders,
        createOrder,
        getOrderById,
        getOrderByNumber,
        updateOrderStatus,
        settings,
        updateSettings,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
