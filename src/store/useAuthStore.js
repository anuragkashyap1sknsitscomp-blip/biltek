import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (email && password.length >= 6) {
              set({ user: { name: email.split('@')[0], email }, isAuthenticated: true });
              toast.success(`Welcome back, ${email.split('@')[0]}!`);
              resolve(true);
            } else {
              toast.error('Invalid credentials or password too short.');
              reject(new Error('Login Failed'));
            }
          }, 1500); 
        });
      },

      register: async (name, email, password) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (name && email && password.length >= 6) {
              set({ user: { name, email }, isAuthenticated: true });
              toast.success('Account created successfully!');
              resolve(true);
            } else {
              toast.error('Please fill all fields properly.');
              reject(new Error('Registration Failed'));
            }
          }, 1500);
        });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
        toast.info('Logged out successfully.');
      }
    }),
    {
      name: 'biltek-auth-storage', 
    }
  )
);

export default useAuthStore;