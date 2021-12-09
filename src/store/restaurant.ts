import { defineStore } from 'pinia';
import axios from 'axios';

import { useUserStore } from '@/store/user';
import { Restaurant } from '@/interfaces/restaurant';

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
      const { data: restaurantData } = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/restaurant`,
        { headers: { Authorization: `Bearer ${userStore.token}` } },
      );
      this.restaurant = restaurantData.data;
    },
    async updateInfo() {
      const userStore = useUserStore();
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/restaurant`,
        {
          name: this.restaurant.name,
          address: this.restaurant.address,
          description: this.restaurant.description,
          opening_hours: this.restaurant.opening_hours,
          telephone_number: this.restaurant.telephone_number,
          reservation_advance_hours: this.restaurant.reservation_advance_hours,
          type: this.restaurant.type,
          primary_table_view: this.restaurant.primary_table_view,
        },
        { headers: { Authorization: `Bearer ${userStore.token}` } },
      );
    },
    async saveLayout(
      { name, tables, id }: {name: string; tables: Record<string, any>[], id?: number},
    ) {
      const userStore = useUserStore();
      if (!id) {
        const { data: response } = await axios.post(
          `${import.meta.env.VITE_API_URL}/tableviews`,
          { name, tables },
          { headers: { Authorization: `Bearer ${userStore.token}` } },
        );
        this.restaurant.table_views.push(response.data);
      } else {
        const { data: response } = await axios.put(
          `${import.meta.env.VITE_API_URL}/tableviews/${id}`,
          { name, tables },
          { headers: { Authorization: `Bearer ${userStore.token}` } },
        );
        const index = this.restaurant.table_views
          .findIndex((tableView) => tableView.id === response.data.id);
        this.restaurant.table_views[index] = response.data;
      }
    },
    async deleteLayout(id: number) {
      const userStore = useUserStore();
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/tableviews/${id}`,
        { headers: { Authorization: `Bearer ${userStore.token}` } },
      );
      this.restaurant.table_views = this.restaurant.table_views
        .filter((tableView) => tableView.id !== id);
    },
  },
});
