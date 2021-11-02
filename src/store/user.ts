import { defineStore } from 'pinia';
import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    user: {},
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    init() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        this.token = JSON.parse(token);
        this.user = JSON.parse(user);
      }
    },

    async login(login: string, password: string) {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { login, password });

      this.token = data.data.token;
      this.user = data.data.user;
      localStorage.setItem('token', JSON.stringify(this.token));
      localStorage.setItem('user', JSON.stringify(this.user));
    },

    async logout() {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/invalidate`, undefined, { headers: { Authorization: `Bearer ${this.token}` } });
      } catch (err) {
        console.log(err);
      }

      this.token = '';
      this.user = {};
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});
