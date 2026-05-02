import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [], // Initial empty cart
      
      // Add item to cart or increase quantity if it already exists
      addToCart: (product) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find(item => item.id === product.id);
        
        if (existingItem) {
          set({
            cart: currentCart.map(item => 
              item.id === product.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            )
          });
          toast.info(`Increased quantity for ${product.name}`);
        } else {
          set({ cart: [...currentCart, { ...product, quantity: 1 }] });
          toast.success(`${product.name} added to cart!`);
        }
      },

      // Remove item completely
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.id !== productId) });
        toast.error('Item removed from cart');
      },

      // Update specific quantity (for the Cart page)
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return; // Prevent negative quantity
        set({
          cart: get().cart.map(item => 
            item.id === productId ? { ...item, quantity } : item
          )
        });
      },

      // Clear entire cart (after checkout)
      clearCart: () => {
        set({ cart: [] });
      },
      
      // Calculate total price dynamically
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
      },

      // Calculate total number of items
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'biltek-cart-storage', // Ye naam local storage me save hoga
    }
  )
);

export default useCartStore;