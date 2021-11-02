import { defineStore } from 'pinia';
import axios from 'axios';

import { useUserStore } from '@/store/user';
import { Restaurant } from '@/interfaces/restaurant';

// eslint-disable-next-line import/prefer-default-export
export const useRestaurantStore = defineStore('restaurant', {
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
  },
});
