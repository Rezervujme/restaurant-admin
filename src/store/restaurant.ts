/* eslint-disable camelcase */
import { defineStore } from 'pinia';
import axios from 'axios';

import { useUserStore } from '@/store/user';
import { Reservation, Restaurant } from '@/interfaces/restaurant';

// eslint-disable-next-line import/prefer-default-export
export const useRestaurantStore = defineStore({
  id: 'restaurant',
  state: () => ({
    restaurant: {} as Restaurant,
    reservations: [] as Reservation[],
  }),
  getters: {
  },
  actions: {
    async fetchReservations() {
      const userStore = useUserStore();
      const { data: restaurantData } = await axios.get(
        `${import.meta.env.VITE_API_URL}/reservations`,
        { headers: { Authorization: `Bearer ${userStore.token}` } },
      );
      this.reservations = restaurantData.data;
    },
    async fetchRestaurantInfo() {
      const userStore = useUserStore();
      const { data: restaurantData } = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/restaurant`,
        { headers: { Authorization: `Bearer ${userStore.token}` } },
      );
      this.restaurant = restaurantData.data;
      // @ts-expect-error typing
      this.restaurant.primary_table_view = this.restaurant.primary_table_view.id;
    },
    async updateInfo({
      name, address, description, opening_hours,
      telephone_number, reservation_advance_hours,
      type, primary_table_view,
    }: Restaurant) {
      const userStore = useUserStore();
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/restaurant`,
        {
          name,
          address,
          description,
          opening_hours,
          telephone_number,
          reservation_advance_hours,
          type,
          primary_table_view,
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
