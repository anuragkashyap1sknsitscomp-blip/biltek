import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],
      
      // Toggle logic: Agar pehle se hai toh hata do, nahi hai toh add kardo
      toggleWishlist: (product) => {
        const currentWishlist = get().wishlist;
        const exists = currentWishlist.find(item => item.id === product.id);
        
        if (exists) {
          set({ wishlist: currentWishlist.filter(item => item.id !== product.id) });
          toast.info('Item removed from Wishlist', { icon: '💔' });
        } else {
          set({ wishlist: [...currentWishlist, product] });
          toast.success('Added to Wishlist!', { icon: '❤️' });
        }
      },

      // Check karne ke liye ki item wishlist me hai ya nahi (Heart ko red karne ke liye)
      isInWishlist: (productId) => {
        return get().wishlist.some(item => item.id === productId);
      },

      // Header icon ke count ke liye
      getWishlistCount: () => {
        return get().wishlist.length;
      }
    }),
    {
      name: 'biltek-wishlist-storage',
    }
  )
);

export default useWishlistStore;