import { defineStore } from 'pinia';
import axios from 'axios';

import { useUserStore } from '@/store/user';
import { Layout, LayoutNew, Restaurant } from '@/interfaces/restaurant';

// eslint-disable-next-line import/prefer-default-export
export const useRestaurantStore = defineStore({
  id: 'restaurant',
  state: () => ({
    restaurant: {} as Restaurant,
  }),
  getters: {
  },
  actions: {
    async fetchRestaurantInfo() {
      const userStore = useUserStore();
      const { data: restaurantData } = await axios.get(`${import.meta.env.VITE_API_URL}/auth/restaurant`, { headers: { Authorization: `Bearer ${userStore.token}` } });
      this.restaurant = restaurantData.data;
    },
    async updateInfo() {
      const userStore = useUserStore();
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/restaurant`, {
        name: this.restaurant.name,
        address: this.restaurant.address,
        description: this.restaurant.description,
        opening_hours: this.restaurant.opening_hours,
        telephone_number: this.restaurant.telephone_number,
        reservation_advance_hours: this.restaurant.reservation_advance_hours,
        type: this.restaurant.type,
      }, { headers: { Authorization: `Bearer ${userStore.token}` } });
    },
    async saveLayout(layout: Layout) {
      console.log(layout);
      const userStore = useUserStore();
      await axios.post(`${import.meta.env.VITE_API_URL}/tableviews`, { name: layout.name, tables: layout.tables }, { headers: { Authorization: `Bearer ${userStore.token}` } });
    },
  },
});
